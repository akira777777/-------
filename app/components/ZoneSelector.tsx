import React from 'react';

interface ZoneSelectorProps {
  activeZone: string;
  setActiveZone: (zoneId: string) => void;
}

export default function ZoneSelector({ activeZone, setActiveZone }: ZoneSelectorProps) {
  const zones = [
    { id: 'face', name: 'Лицо' },
    { id: 'ear', name: 'Уши' },
    { id: 'body', name: 'Тело' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => setActiveZone(zone.id)}
          className={`px-6 py-3 rounded-full border transition-all duration-300 text-lg font-heading ${
            activeZone === zone.id 
              ? 'bg-[#E0A98B] border-[#E0A98B] text-black' 
              : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
        >
          {zone.name}
        </button>
      ))}
    </div>
  );
}
