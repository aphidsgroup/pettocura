'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [13.068643, 80.162437],
      zoom: 15,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([13.068643, 80.162437], { icon: defaultIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: Inter, sans-serif;">
          <strong>Petto Cura — Nolambur</strong><br/>
          <span style="color: #57534e; font-size: 12px;">Plot.No.6, Door.No.4, M.C.K Layout, Nolambur</span><br/>
          <span style="color: #0591AD; font-size: 12px;">+91 95662 42236</span>
        </div>
      `)
      .openPopup();

    return () => { map.remove(); };
  }, []);

  return <div ref={mapRef} className="w-full h-[400px]" />;
}
