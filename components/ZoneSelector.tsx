'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ZONES, type ZoneId } from '@/constants/piercings';

interface ZoneSelectorProps {
  activeZone: ZoneId;
  setActiveZone: (zoneId: ZoneId) => void;
}

export default function ZoneSelector({ activeZone, setActiveZone }: ZoneSelectorProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % ZONES.length;
      setActiveZone(ZONES[nextIndex].id);
      tabsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + ZONES.length) % ZONES.length;
      setActiveZone(ZONES[prevIndex].id);
      tabsRef.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Контейнер табов с доступностью ARIA */}
      <div 
        role="tablist" 
        aria-label="Анатомические зоны проколов"
        className="p-1 sm:p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-between gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {ZONES.map((zone, idx) => {
          const isActive = activeZone === zone.id;

          return (
            <button
              key={zone.id}
              ref={(el) => { tabsRef.current[idx] = el; }}
              role="tab"
              id={`zone-tab-${zone.id}`}
              aria-selected={isActive}
              aria-controls={`zone-panel-${zone.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveZone(zone.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative flex-1 py-2 sm:py-3 px-1.5 xs:px-2.5 sm:px-4 rounded-full transition-colors duration-200 text-[11px] xs:text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A98B] ${
                isActive ? 'text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Плавающий анимированный фон активного таба */}
              {isActive && (
                <motion.div
                  layoutId="activeZonePill"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFF] via-[#E0A98B] to-[#D4AF37] shadow-[0_0_25px_rgba(224,169,139,0.5)] -z-10"
                />
              )}

              {/* Иконка зоны */}
              <span className="text-sm sm:text-base select-none" aria-hidden="true">
                {zone.icon}
              </span>

              {/* Название зоны */}
              <span className="font-heading tracking-wide whitespace-nowrap">
                {zone.name.split(' (')[0]}
              </span>

              {/* Бейдж с количеством доступных проколов */}
              <span
                className={`hidden xs:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-black/20 text-black font-bold'
                    : 'bg-white/5 text-gray-400 border border-white/5'
                }`}
              >
                {zone.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Описание выбранной зоны */}
      <div className="text-center mt-3">
        <p className="text-xs text-gray-400 font-mono tracking-tight">
          {ZONES.find((z) => z.id === activeZone)?.desc}
        </p>
      </div>
    </div>
  );
}

