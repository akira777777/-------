'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIERCINGS, type ZoneId, type PiercingType } from '../constants/piercings';
import { ZONE_PATHS } from '../constants/svg_assets';
import { Sparkles, Shield, AlertCircle } from 'lucide-react';

interface AnatomyMapProps {
  activeZone: ZoneId;
  onAddtoConfigurator?: (piercing: PiercingType) => void;
}

export default function AnatomyMap({ activeZone, onAddtoConfigurator }: AnatomyMapProps) {
  const [selectedPiercing, setSelectedPiercing] = useState<PiercingType | null>(null);
  const [hoveredPiercing, setHoveredPiercing] = useState<PiercingType | null>(null);

  const filteredPiercings = PIERCINGS.filter(p => p.zone === activeZone);

  // Точные координаты точек на анатомической сетке 0..100
  const hotspots: Record<ZoneId, { id: string; x: number; y: number; label: string }[]> = {
    face: [
      { id: 'f1', x: 55, y: 46, label: 'Нострил' },
      { id: 'f2', x: 50, y: 52, label: 'Септум' },
      { id: 'f3', x: 68, y: 38, label: 'Микродермал' }
    ],
    ear: [
      { id: 'e1', x: 68, y: 22, label: 'Хеликс' },
      { id: 'e2', x: 43, y: 50, label: 'Трагус' },
      { id: 'e3', x: 56, y: 42, label: 'Конч' }
    ],
    body: [
      { id: 'b1', x: 50, y: 72, label: 'Пупок' },
      { id: 'b2', x: 30, y: 28, label: 'Ключица' }
    ]
  };

  const zoneData = ZONE_PATHS[activeZone] || ZONE_PATHS.ear;

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[620px] flex flex-col items-center justify-center bg-surface/30 rounded-[2.5rem] border border-white/5 p-6 md:p-10 backdrop-blur-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
        
        {/* Интерактивная анатомическая SVG-карта (7 колонок) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] md:min-h-[440px] glass rounded-3xl p-6 overflow-hidden">
          {/* Фоновый радиальный свет */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E0A98B]/10 via-transparent to-[#D4AF37]/5 pointer-events-none" />
          
          <motion.div 
            key={activeZone}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-[340px] aspect-square flex items-center justify-center"
          >
            {/* SVG контур анатомической зоны */}
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(224,169,139,0.2)]">
              <path
                d={zoneData.outline}
                fill="none"
                stroke="#E0A98B"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70 transition-all duration-500"
              />
              {zoneData.details && (
                <path
                  d={zoneData.details}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="1.5 1.5"
                  className="opacity-40"
                />
              )}
            </svg>

            {/* Интерактивные точки (Hotspots) */}
            {(hotspots[activeZone] || []).map((hp) => {
              const piercing = filteredPiercings.find(p => p.id === hp.id);
              if (!piercing) return null;

              const isSelected = selectedPiercing?.id === piercing.id;
              const isHovered = hoveredPiercing?.id === piercing.id;

              return (
                <div
                  key={hp.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  style={{ left: `${hp.x}%`, top: `${hp.y}%` }}
                >
                  {/* Пульсирующий внешний ореол */}
                  <span className="absolute -inset-2 rounded-full bg-[#E0A98B]/30 animate-ping opacity-60 pointer-events-none" />
                  
                  {/* Кнопка точки */}
                  <motion.button
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPiercing(piercing)}
                    onMouseEnter={() => setHoveredPiercing(piercing)}
                    onMouseLeave={() => setHoveredPiercing(null)}
                    aria-label={piercing.name}
                    className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-white border-gold shadow-[0_0_20px_#D4AF37]' 
                        : 'bg-[#E0A98B] border-[#0B0B0E] shadow-[0_0_12px_#E0A98B]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/70" />
                  </motion.button>

                  {/* Всплывающий бейдж названия при наведении */}
                  <AnimatePresence>
                    {(isHovered || isSelected) && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.85 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black/90 border border-[#E0A98B]/40 rounded-lg text-[11px] font-medium tracking-wide text-white whitespace-nowrap pointer-events-none shadow-xl backdrop-blur-md"
                      >
                        {hp.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Информационная панель выбранного прокола (5 колонок) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedPiercing ? (
              <motion.div 
                key={selectedPiercing.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass p-6 md:p-8 rounded-3xl border-[#E0A98B]/30 shadow-2xl relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#E0A98B] font-bold">Анатомический выбор</span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">{selectedPiercing.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedPiercing(null)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  {selectedPiercing.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Болезненность</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-bold text-white">{selectedPiercing.painLevel}/5</span>
                      <span className="text-xs text-[#E0A98B]">{'★'.repeat(selectedPiercing.painLevel)}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Тип основы</span>
                    <span className="text-sm font-bold text-white capitalize">{selectedPiercing.jewelryType}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <span className="block text-[10px] uppercase text-gray-400">Стоимость от</span>
                    <span className="text-2xl font-bold text-gold-rose">{selectedPiercing.basePrice} ₽</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (onAddtoConfigurator) {
                        onAddtoConfigurator(selectedPiercing);
                        const configuratorEl = document.getElementById('configurator');
                        if (configuratorEl) {
                          configuratorEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="btn-premium bg-[#E0A98B] text-black hover:bg-white transition-all duration-300 font-bold text-xs md:text-sm px-6 py-2.5 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    В конструктор
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 glass rounded-3xl border-dashed border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-[#E0A98B]/10 text-[#E0A98B] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-heading font-bold mb-2">Нажмите на точку на карте</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Изучите анатомические зоны, уровень болезненности и подберите идеальное украшение.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {filteredPiercings.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPiercing(p)}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#E0A98B]/20 text-xs text-gray-300 hover:text-white border border-white/5 transition-all"
                    >
                      {p.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
