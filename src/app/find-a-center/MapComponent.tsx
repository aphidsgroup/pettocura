'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { StoreLocation } from '@/data/defaults';

// Fix for default markers in Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const activeIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  shadowSize: [49, 49],
  className: 'hue-rotate-[140deg] brightness-110',
});

interface MapComponentProps {
  stores: StoreLocation[];
  selectedStore: StoreLocation | null;
  onSelectStore: (store: StoreLocation) => void;
}

export default function MapComponent({ stores, selectedStore, onSelectStore }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [13.075, 80.170],
      zoom: 14,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    stores.forEach((store) => {
      const marker = L.marker([store.lat, store.lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: Inter, sans-serif; padding: 4px;">
            <strong style="font-size: 14px;">${store.title}</strong>
            <p style="font-size: 12px; color: #57534e; margin: 4px 0;">${store.address}</p>
            <p style="font-size: 12px; color: #14B8A6;">${store.phone}</p>
            <span style="font-size: 11px; padding: 2px 8px; border-radius: 12px; background: ${store.status === 'open' ? '#d1fae5' : '#fee2e2'}; color: ${store.status === 'open' ? '#065f46' : '#991b1b'};">${store.status === 'open' ? 'Open' : 'Closed'}</span>
          </div>
        `);

      marker.on('click', () => onSelectStore(store));
      markersRef.current.push(marker);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selectedStore) return;

    mapRef.current.flyTo([selectedStore.lat, selectedStore.lng], 16, { duration: 0.8 });

    markersRef.current.forEach((marker, i) => {
      const store = stores[i];
      marker.setIcon(store.id === selectedStore.id ? activeIcon : defaultIcon);
      if (store.id === selectedStore.id) {
        marker.openPopup();
      }
    });
  }, [selectedStore, stores]);

  return <div ref={mapContainerRef} className="w-full h-[500px]" />;
}
