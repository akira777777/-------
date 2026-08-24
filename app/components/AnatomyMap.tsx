'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIERCINGS, type ZoneId, type PiercingType } from '../constants/piercings';
import { ZONE_PATHS } from '../constants/svg_assets';
import { Sparkles, Eye } from 'lucide-react';
import { formatCzk } from '../constants/currency';

interface AnatomyMapProps {
  activeZone: ZoneId;
  onAddtoConfigurator?: (piercing: PiercingType) => void;
}

export default function AnatomyMap({ activeZone, onAddtoConfigurator }: AnatomyMapProps) {
  const [selectedPiercing, setSelectedPiercing] = useState<PiercingType | null>(null);
  const [hoveredPiercing, setHoveredPiercing] = useState<PiercingType | null>(null);

  const filteredPiercings = PIERCINGS.filter((p) => p.zone === activeZone);

  // Точные координаты точек на анатомической сетке 0..100
  const hotspots: Record<ZoneId, { id: string; x: number; y: number; label: string; anatomicalName: string }[]> = {
    face: [
      { id: 'f1', x: 58, y: 46, label: 'Nostril', anatomicalName: 'Крыло носа' },
      { id: 'f2', x: 49, y: 53, label: 'Septum', anatomicalName: 'Перегородка' },
      { id: 'f3', x: 70, y: 38, label: 'Dermal', anatomicalName: 'Скуловая зона' }
    ],
    ear: [
      { id: 'e1', x: 72, y: 20, label: 'Helix', anatomicalName: 'Верхний завиток' },
      { id: 'e2', x: 41, y: 52, label: 'Tragus', anatomicalName: 'Козелок' },
      { id: 'e3', x: 58, y: 42, label: 'Conch', anatomicalName: 'Центральная раковина' }
    ],
    body: [
      { id: 'b1', x: 50, y: 72, label: 'Navel', anatomicalName: 'Пупок' },
      { id: 'b2', x: 26, y: 30, label: 'Clavicle', anatomicalName: 'Ключица' }
    ]
  };

  const zoneData = ZONE_PATHS[activeZone] || ZONE_PATHS.ear;

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center glass-card rounded-[2.5rem] p-6 md:p-10">
      
      {/* Сетка разметки (7 колонок SVG + 5 колонок карточка) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
        
        {/* Интерактивная векторная карта */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] md:min-h-[460px] bg-black/40 rounded-3xl p-6 border border-white/5 overflow-hidden">
          
          {/* Декоративная фоновая сетка */}
          <div className="absolute inset-0 bg-[radial-gradient(#E0A98B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E0A98B]/10 via-transparent to-[#D4AF37]/5 pointer-events-none" />

          {/* Индикатор зоны */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0A98B] animate-pulse" />
            Зона: {activeZone.toUpperCase()}
          </div>

          <motion.div 
            key={activeZone}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-[340px] aspect-square flex items-center justify-center"
          >
            {/* SVG Контур */}
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(224,169,139,0.25)]">
              <defs>
                <linearGradient id="luxuryGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#E0A98B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Направляющие */}
              {zoneData.guides && (
                <path
                  d={zoneData.guides}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                  strokeDasharray="1 2"
                />
              )}

              {/* Главный анатомический контур */}
              <path
                d={zoneData.outline}
                fill="none"
                stroke="url(#luxuryGoldGrad)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80 transition-all duration-700"
              />

              {/* Внутренние анатомические детали */}
              {zoneData.inner && (
                <path
                  d={zoneData.inner}
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
              const piercing = filteredPiercings.find((p) => p.id === hp.id);
              if (!piercing) return null;

              const isSelected = selectedPiercing?.id === piercing.id;
              const isHovered = hoveredPiercing?.id === piercing.id;

              return (
                <div
                  key={hp.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${hp.x}%`, top: `${hp.y}%` }}
                >
                  {/* Пульсирующий ореол */}
                  <span className={`absolute -inset-2.5 rounded-full pointer-events-none transition-all duration-300 ${
                    isSelected ? 'bg-[#D4AF37]/40 animate-ping' : 'bg-[#E0A98B]/25 animate-ping'
                  }`} />

                  {/* Кнопка хотспота */}
                  <motion.button
                    whileHover={{ scale: 1.35 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPiercing(piercing)}
                    onMouseEnter={() => setHoveredPiercing(piercing)}
                    onMouseLeave={() => setHoveredPiercing(null)}
                    aria-label={piercing.name}
                    className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-white border-gold shadow-[0_0_25px_#D4AF37] scale-125'
                        : 'bg-[#E0A98B] border-[#08080B] shadow-[0_0_15px_#E0A98B]'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-black" />
                  </motion.button>

                  {/* Всплывающий бейдж с названием */}
                  <AnimatePresence>
                    {(isHovered || isSelected) && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.85 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 glass rounded-xl text-center pointer-events-none shadow-2xl z-30 whitespace-nowrap border border-[#E0A98B]/40"
                      >
                        <p className="text-[11px] font-bold text-white tracking-wide">{hp.label}</p>
                        <p className="text-[9px] text-[#E0A98B] font-mono">{hp.anatomicalName}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Правая карточка информации */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedPiercing ? (
              <motion.div
                key={selectedPiercing.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-6 md:p-8 rounded-3xl border-[#E0A98B]/30 relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="badge-luxury text-[10px] mb-2">
                      <Sparkles className="w-3 h-3" />
                      Анатомический выбор
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                      {selectedPiercing.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPiercing(null)}
                    aria-label="Закрыть описание прокола"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                  {selectedPiercing.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-center">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Болезненность</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-bold text-white">{selectedPiercing.painLevel}/5</span>
                      <span className="text-xs text-[#E0A98B]">{'★'.repeat(selectedPiercing.painLevel)}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-center">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Тип основы</span>
                    <span className="text-xs font-bold text-white capitalize">{selectedPiercing.jewelryType}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <span className="block text-[10px] uppercase text-gray-400">Стоимость от</span>
                    <span className="text-2xl font-bold text-gold-rose">
                      {formatCzk(selectedPiercing.basePrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (onAddtoConfigurator) {
                        onAddtoConfigurator(selectedPiercing);
                      }
                    }}
                    className="btn-premium bg-[#E0A98B] text-black hover:bg-white font-bold text-xs sm:text-sm px-6 py-2.5 flex items-center gap-2"
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
                className="text-center p-8 glass-card rounded-3xl border-dashed border-white/10"
              >
                <div className="w-14 h-14 rounded-full bg-[#E0A98B]/10 text-[#E0A98B] flex items-center justify-center mx-auto mb-4 border border-[#E0A98B]/20">
                  <Eye className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-heading font-bold text-white mb-2">
                  Кликните по светящейся точке
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 max-w-xs mx-auto">
                  Наведите на контур, чтобы увидеть анатомические ориентиры и подобрать украшение.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {filteredPiercings.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPiercing(p)}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#E0A98B] hover:text-black text-xs text-gray-300 font-medium border border-white/5 transition-all"
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
