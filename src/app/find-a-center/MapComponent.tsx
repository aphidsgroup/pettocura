'use client';

import { StoreLocation } from '@/data/defaults';

interface MapComponentProps {
  stores: StoreLocation[];
  selectedStore: StoreLocation | null;
  onSelectStore: (store: StoreLocation) => void;
}

export default function MapComponent({ stores, selectedStore }: MapComponentProps) {
  // If a store is selected, center on it. Otherwise show the Petto Cura GMB listing.
  const selectedLat = selectedStore?.lat || 13.0685386;
  const selectedLng = selectedStore?.lng || 80.1624786;

  const embedUrl = selectedStore
    ? `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000!2d${selectedLng}!3d${selectedLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4822.680233509927!2d80.1624786!3d13.0685386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261766e81904f%3A0xbfeb16eccc904ae!2sPetto%20Cura%20-%20Pet%20Grooming%20Studio%20%7C%20Pet%20Boarding%20%7C%20Pet%20Taxi%20%7C%20Pet%20Sitter%20%7C%20Pet%20Accessories%20%7C%20Pet%20Walking!5e1!3m2!1sen!2sin!4v1774698456395!5m2!1sen!2sin`;

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="500"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={selectedStore ? `${selectedStore.title} Location` : 'Petto Cura Locations'}
    />
  );
}
