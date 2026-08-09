"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { REAL_BASEMAP } from "@/lib/content/map-layout";
import "leaflet/dist/leaflet.css";

/** Live street tiles (Lower Manhattan) under the painted poster. */
export function RealBasemap() {
  return (
    <MapContainer
      center={REAL_BASEMAP.center}
      zoom={REAL_BASEMAP.zoom}
      className="hybrid-leaflet"
      zoomControl={false}
      attributionControl={true}
      scrollWheelZoom={false}
      dragging={true}
      doubleClickZoom={false}
    >
      <TileLayer
        attribution={REAL_BASEMAP.attribution}
        url={REAL_BASEMAP.tileUrl}
        subdomains="abcd"
      />
    </MapContainer>
  );
}
