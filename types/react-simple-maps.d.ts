declare module "react-simple-maps" {
  import { ComponentType, ReactNode } from "react";

  export interface ComposableMapProps {
    projectionConfig?: Record<string, unknown>;
    style?: React.CSSProperties;
    children?: ReactNode;
    [key: string]: unknown;
  }

  export interface GeographiesProps {
    geography: string;
    children: (args: { geographies: GeoFeature[] }) => ReactNode;
  }

  export interface GeoFeature {
    rsmKey: string;
    id?: string | number;
    properties?: Record<string, unknown>;
    [key: string]: unknown;
  }

  export interface GeographyProps {
    geography: GeoFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    [key: string]: unknown;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<Record<string, unknown>>;
  export const Sphere: ComponentType<Record<string, unknown>>;
  export const Graticule: ComponentType<Record<string, unknown>>;
  export const ZoomableGroup: ComponentType<Record<string, unknown>>;
}
