'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PIERCINGS, type ZoneId } from '../constants/piercings';
import { ZONE_PATHS } from '../constants/svg_assets';

interface AnatomyMapProps {
  activeZone: ZoneId;
  onAddtoConfigurator?: (piercing: any) => void;
}

export default function AnatomyMap({ activeZone, onAddtoConfigurator }: AnatomyMapProps) {
  const [selectedPiercing, setSelectedPiercing] = useState<any>(null);

  const filteredPiercings = PIERCINGS.filter(p => p.zone === activeZone);

  // Пример координат Hotspots (в реальном проекте эти координаты могут быть частью данных в piercings.ts)
  const hotspots: Record<string, { id: string; x: number; y: number }[]> = {
    face: [
      { id: 'f1', x: 45, y: 40 },
      { id: 'f2', x: 35, y: 65 },
      { id: 'f3', x: 70, y: 50 }
    ],
    ear: [
      { id: 'e1', x: 35, y: 25 },
      { id: 'e2', x: 75, y: 65 },
      { id: 'e3', x: 90, y: 45 }
    ],
    body: [
      { id: 'b1', x: 50, y: 55 },
      { id: 'b2', x: 50, y: 30 }
    ]
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[600px] flex flex-col items-center justify-center bg-surface/30 rounded-3xl border border-white/5 p-8">
      <motion.div 
        key={activeZone}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[450px] flex items-center justify-center"
      >
        {/* SVG Контур Зоны */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
          <path
            d={ZONE_PATHS[activeZone] || ZONE_PATHS.face}
            fill="none"
            stroke="#E0A98B"
            strokeWidth="0.5"
            className="transition-all duration-700"
          />
        </svg>

        {/* Hotspots */}
        <div className="absolute inset-0 flex items-center justify-center">
          {(hotspots[activeZone] || []).map((hp) => {
            const piercing = filteredPiercings.find(p => p.id === hp.id);
            if (!piercing) return null;

            return (
              <motion.button
                key={hp.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.6, backgroundColor: "#fff" }}
                onClick={() => setSelectedPiercing(piercing)}
                className="absolute w-3 h-3 rounded-full border border-[#E0A98B] bg-[#E0A98B] shadow-[0_0_15px_#E0A98B]"
                style={{ left: `${hp.x}%`, top: `${hp.y}%` }}
              />
            );
          })}
        </div>
      </motion.div>

      {!selectedPiercing ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <h3 className="text-xl font-heading mb-4">Выберите точку на карте</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
            {filteredPiercings.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPiercing(p)}
                className="glass p-4 rounded-xl text-left hover:border-[#E0A98B]/50 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold group-hover:text-gold-rose">{p.name}</span>
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-400">Боль: {p.painLevel}/5</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{p.description}</p>
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full glass p-8 rounded-3xl border-[#E0A98B]/30 mt-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-heading text-gold-rose">{selectedPiercing.name}</h2>
              <p className="text-sm text-gray-400 mt-1">Зона: {activeZone}</p>
            </div>
            <button 
              onClick={() => setSelectedPiercing(null)}
              className="text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {selectedPiercing.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <span className="block text-[10px] uppercase text-gray-500">Уровень боли</span>
              <span className="text-xl font-bold">{selectedPiercing.painLevel}/5</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <span className="block text-[10px] uppercase text-gray-500">Тип украшения</span>
              <span className="text-xl font-bold capitalize">{selectedPiercing.jewelryType}</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-white/10 pt-6">
            <div>
              <span className="block text-[10px] uppercase text-gray-500">Цена от</span>
              <span className="text-2xl font-bold">{selectedPiercing.basePrice} ₽</span>
            </div>
            <button 
              onClick={() => {
                setSelectedPiercing(null);
                if (onAddtoConfigurator) onAddtoConfigurator(selectedPiercing);
              }}
              className="btn-premium bg-[#E0A98B] text-black hover:bg-white transition-all duration-300 font-bold"
            >
              Добавить в конструктор
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
