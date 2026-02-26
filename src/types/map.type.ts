export type LocationType = [number, number];

export interface MapMarker {
  coordinates: LocationType;
  location: string;
}

export type LineStringGeometry = {
  type: "LineString";
  coordinates: [number, number][];
};
