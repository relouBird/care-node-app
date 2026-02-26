import type {
  LineStringGeometry,
  LocationType,
  MapMarker,
} from "@/types/map.type";
import maplibregl from "maplibre-gl";

// Fonction pour créer un pin personnalisé avec une couleur spécifique
export const MapPinByColor = (color: string) => {
  // Pin personnalisé style Maps
  const pinEl = document.createElement("div");
  pinEl.innerHTML = `
  <svg width="32" height="40" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
    <!-- Ombre -->
    <ellipse cx="20" cy="48" rx="8" ry="2" fill="rgba(0,0,0,0.2)"/>
    <!-- Pin -->
    <path d="M20 0 C9 0 0 9 0 20 C0 35 20 50 20 50 C20 50 40 35 40 20 C40 9 31 0 20 0 Z"
          fill="${color}" stroke="white" stroke-width="2"/>
    <!-- Point central blanc -->
    <circle cx="20" cy="20" r="8" fill="white"/>
    <!-- Icône -->
    <circle cx="20" cy="20" r="5" fill="${color}"/>
  </svg>
  `;

  pinEl.style.width = "40px";
  pinEl.style.height = "50px";
  pinEl.style.cursor = "pointer";

  return pinEl;
};

// Fonction pour générer les coordonnées formatées
export const MapGenerateCoordinates = ([lat, lng]: LocationType): MapMarker => {
  if (isNaN(lat) || isNaN(lng)) {
    return { coordinates: [0, 0], location: "0°N, 0°E" };
  }
  if (lat && lng) {
    return {
      coordinates: [lat, lng],
      location: `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`,
    };
  }

  return { coordinates: [0, 0], location: "0°N, 0°E" };
};

// Fonction pour créer un marker avec un pin personnalisé et une popup
export const MarkerPinCreator = (
  pin: HTMLDivElement,
  location: MapMarker,
  message?: string,
  color?: string,
) => {
  const marker = new maplibregl.Marker({ element: pin, anchor: "bottom" })
    .setLngLat(location.coordinates)
    .setPopup(
      new maplibregl.Popup({
        offset: 30,
        closeButton: false,
      }).setHTML(`
        <div style="padding: 12px; min-width: 150px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: ${color ?? "#13875d"}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #2c3e50;">${message ?? "Patient"}</div>
              <div style="font-size: 11px; color: #7f8c8d;">Douala, Cameroun</div>
            </div>
          </div>
          <div style="font-size: 12px; color: #7f8c8d; padding-left: 40px;">
            ${location.location}
          </div>
        </div>
      `),
    );

  return marker;
};

// Fonction qui permet de calculer la distance entre deux points géographiques en utilisant la formule de Haversine
export const calculateMapDistance = (
  coord1: LocationType,
  coord2: LocationType,
): number => {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return 0;
  }
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Fonction pour dessiner la route entre deux points sur la carte
export const drawRouteOnMap = (
  geometry: LineStringGeometry,
  color: string = "#13875dbb",
) => {
  const source = {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: geometry,
    },
  };

  const layer = {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": color,
      "line-width": 4,
    },
  };

  return {
    source,
    layer,
  };
};
