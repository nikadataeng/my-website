import { NextResponse } from 'next/server';

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }).toString(),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Failed to get access token');
  return data.access_token;
}

// Get PT offset in minutes for a given UTC date (handles PST vs PDT)
function getPTOffsetMinutes(utcDate: Date): number {
  // sv-SE locale gives "YYYY-MM-DD HH:MM:SS" — treat that as UTC to find PT wall-clock time
  const ptStr = utcDate.toLocaleString('sv-SE', { timeZone: 'America/Los_Angeles' });
  const ptMs = new Date(ptStr.replace(' ', 'T') + 'Z').getTime();
  return (ptMs - utcDate.getTime()) / 60000; // -420 for PDT, -480 for PST
}

// Convert a PT date+time to a UTC Date
function ptToUTC(ptDateStr: string, hour: number, minute: number): Date {
  const [y, m, d] = ptDateStr.split('-').map(Number);
  const approxUTC = new Date(Date.UTC(y, m - 1, d, 12, 0, 0)); // noon UTC as DST reference
  const ptOffsetMinutes = getPTOffsetMinutes(approxUTC);
  const ptMs = Date.UTC(y, m - 1, d, hour, minute, 0);
  return new Date(ptMs - ptOffsetMinutes * 60000);
}

function overlaps(
  slotStart: Date,
  slotEnd: Date,
  busySlots: Array<{ start: string; end: string }>
): boolean {
  return busySlots.some((busy) => {
    const bStart = new Date(busy.start);
    const bEnd = new Date(busy.end);
    return slotStart < bEnd && slotEnd > bStart;
  });
}

export async function GET() {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    const accessToken = await getAccessToken();

    const now = new Date();
    const timeMax = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const freeBusyRes = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: now.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: 'America/Los_Angeles',
        items: [{ id: calendarId }],
      }),
    });

    const freeBusy = await freeBusyRes.json();
    const busySlots: Array<{ start: string; end: string }> =
      freeBusy.calendars?.[calendarId]?.busy || [];

    const slots: Array<{ start: string; end: string }> = [];

    for (let daysAhead = 1; daysAhead <= 14; daysAhead++) {
      const dayUTC = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
      const ptDateStr = dayUTC.toLocaleDateString('en-CA', {
        timeZone: 'America/Los_Angeles',
      }); // "YYYY-MM-DD"

      // Check weekday in PT — noon UTC is always within the same PT calendar day
      const [y, m, d] = ptDateStr.split('-').map(Number);
      const ptNoonUTC = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
      const dayName = ptNoonUTC.toLocaleDateString('en-US', {
        timeZone: 'America/Los_Angeles',
        weekday: 'short',
      });
      if (dayName === 'Sat' || dayName === 'Sun') continue;

      // 9 AM – 7 PM PT, 30-min slots
      for (let hour = 9; hour < 19; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotStart = ptToUTC(ptDateStr, hour, minute);
          const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);

          // Skip slots within the next 2 hours
          if (slotStart.getTime() < now.getTime() + 2 * 60 * 60 * 1000) continue;

          if (!overlaps(slotStart, slotEnd, busySlots)) {
            slots.push({
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
            });
          }
        }
      }
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Availability error:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
