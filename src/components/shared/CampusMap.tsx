'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SITE_CONFIG } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function CampusMap() {
  const { lat, lng } = SITE_CONFIG.coordinates;

  return (
    <div className="relative">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-80 md:h-96 w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <div className="text-sm font-sans">
              <strong className="font-heading block mb-1">{SITE_CONFIG.name}</strong>
              <span className="text-stone text-xs block mb-2">{SITE_CONFIG.address}</span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-ember font-medium hover:underline"
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Map overlay info */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-stone-lighter/50 max-w-xs hidden md:block">
        <div className="font-heading font-semibold text-ink text-sm">{SITE_CONFIG.name}</div>
        <p className="text-xs text-stone mt-1">{SITE_CONFIG.address}</p>
        <div className="flex gap-2 mt-3">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-heading font-medium text-ember hover:text-ember-deep transition-colors"
          >
            Directions <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-stone-lighter">·</span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-heading font-medium text-teal hover:text-teal-deep transition-colors"
          >
            Open in Maps <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
