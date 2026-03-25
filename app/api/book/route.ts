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

export async function POST(request: Request) {
  try {
    const { name, email, startTime, endTime, notes } = await request.json();

    if (!name || !email || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    const accessToken = await getAccessToken();

    const event = {
      summary: `30 min with ${name}`,
      description: notes
        ? `Notes from ${name}:\n\n${notes}`
        : `30-minute meeting booked via ayonika.dev`,
      start: { dateTime: startTime, timeZone: 'America/Los_Angeles' },
      end: { dateTime: endTime, timeZone: 'America/Los_Angeles' },
      attendees: [{ email: calendarId }, { email }],
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const createRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    const createdEvent = await createRes.json();

    if (!createRes.ok) {
      console.error('Calendar API error:', createdEvent);
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      eventId: createdEvent.id,
      meetLink: createdEvent.hangoutLink ?? null,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
