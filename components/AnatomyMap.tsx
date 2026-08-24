'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIERCINGS, type ZoneId, type PiercingType } from '@/constants/piercings';
import { ZONE_PATHS } from '@/constants/svg_assets';
import { Sparkles, Eye, HeartPulse, Layers } from 'lucide-react';
import { useCurrency } from '@/constants/currency';

interface AnatomyMapProps {
  activeZone: ZoneId;
  onAddtoConfigurator?: (piercing: PiercingType) => void;
  onSelectForEarSet?: (piercing: PiercingType) => void;
}

type PainFilterType = 'all' | 'low' | 'medium' | 'high';

export default function AnatomyMap({ activeZone, onAddtoConfigurator, onSelectForEarSet }: AnatomyMapProps) {
  const { formatPrice } = useCurrency();
  const [selectedPiercingId, setSelectedPiercingId] = useState<string | null>(null);
  const [hoveredPiercing, setHoveredPiercing] = useState<PiercingType | null>(null);
  const [painFilter, setPainFilter] = useState<PainFilterType>('all');

  const zonePiercings = PIERCINGS.filter((p) => p.zone === activeZone);

  // Вычисляемый выбранный прокол: если выбранный ID принадлежит текущей зоне, берем его, иначе берем первый прокол зоны
  const selectedPiercing = (selectedPiercingId ? zonePiercings.find((p) => p.id === selectedPiercingId) : null) ?? zonePiercings[0] ?? null;
  const setSelectedPiercing = (p: PiercingType | null) => setSelectedPiercingId(p ? p.id : null);
  
  const filteredPiercings = zonePiercings.filter((p) => {
    if (painFilter === 'low') return p.painLevel <= 2;
    if (painFilter === 'medium') return p.painLevel === 3;
    if (painFilter === 'high') return p.painLevel >= 4;
    return true;
  });

  const zoneData = ZONE_PATHS[activeZone] || ZONE_PATHS.ear;

  return (
    <div 
      id={`zone-panel-${activeZone}`}
      role="tabpanel"
      aria-labelledby={`zone-tab-${activeZone}`}
      className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center glass-card rounded-[2.5rem] p-5 sm:p-8 md:p-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    >
      
      {/* Фильтр по болезненности / уровню комфорта */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-[#E0A98B]" />
          <span className="text-xs uppercase tracking-wider text-gray-400 font-bold font-mono">
            Фильтр чувствительности:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all' as PainFilterType, label: 'Все проколы' },
            { id: 'low' as PainFilterType, label: 'Минимум ощущений (1-2★)' },
            { id: 'medium' as PainFilterType, label: 'Умеренно (3★)' },
            { id: 'high' as PainFilterType, label: 'Для опытных (4★)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setPainFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                painFilter === f.id
                  ? 'bg-[#E0A98B] text-black font-bold shadow-[0_0_15px_rgba(224,169,139,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка: Векторный холст (7 колонок) + Карточка информации (5 колонок) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
        
        {/* Интерактивная векторная карта */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[520px] bg-black/60 rounded-[2rem] p-6 border border-white/10 overflow-hidden shadow-inner group">
          
          {/* Декоративная фоновая сетка */}
          <div className="absolute inset-0 bg-[radial-gradient(#E0A98B_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E0A98B]/10 via-transparent to-[#D4AF37]/10 pointer-events-none" />

          {/* Индикатор активной зоны */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 text-[11px] uppercase tracking-widest text-gray-300 font-mono backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E0A98B] animate-pulse" />
            Зона: <strong className="text-white">{activeZone.toUpperCase()}</strong> ({filteredPiercings.length} точек)
          </div>

          <div className="absolute top-4 right-4 z-10 text-[10px] text-gray-400 font-mono hidden sm:block">
            Кликните по маркеру на контуре
          </div>

          <motion.div 
            key={activeZone}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-[360px] aspect-square flex items-center justify-center"
          >
            {/* SVG Контур */}
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(224,169,139,0.3)]">
              <defs>
                <linearGradient id="luxuryGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#E0A98B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Направляющие анатомии */}
              {zoneData.guides && (
                <path
                  d={zoneData.guides}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.6"
                  strokeDasharray="1.5 2"
                />
              )}

              {/* Главный анатомический контур */}
              <path
                d={zoneData.outline}
                fill="rgba(224,169,139,0.03)"
                stroke="url(#luxuryGoldGrad)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-90 transition-all duration-700"
              />

              {/* Внутренние анатомические складки */}
              {zoneData.inner && (
                <path
                  d={zoneData.inner}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  className="opacity-50"
                />
              )}
            </svg>

            {/* Интерактивные точки (Hotspots) */}
            {filteredPiercings.map((piercing) => {
              const isSelected = selectedPiercing?.id === piercing.id;
              const isHovered = hoveredPiercing?.id === piercing.id;

              return (
                <div
                  key={piercing.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${piercing.hotspotCoords.x}%`, top: `${piercing.hotspotCoords.y}%` }}
                >
                  {/* Пульсирующий ореол */}
                  <span className={`absolute -inset-2.5 rounded-full pointer-events-none transition-all duration-300 ${
                    isSelected ? 'bg-[#D4AF37]/50 animate-ping' : 'bg-[#E0A98B]/30 animate-pulse'
                  }`} />

                  {/* Кнопка хотспота с расширенной тач-зоной для мобильных (min 44x44) */}
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPiercing(piercing)}
                    onMouseEnter={() => setHoveredPiercing(piercing)}
                    onMouseLeave={() => setHoveredPiercing(null)}
                    aria-label={`Выбрать прокол ${piercing.name}`}
                    className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A98B] before:absolute before:-inset-3 before:content-[''] ${
                      isSelected
                        ? 'bg-white border-[#D4AF37] shadow-[0_0_25px_#D4AF37] scale-125'
                        : 'bg-[#E0A98B] border-[#08080B] shadow-[0_0_15px_#E0A98B]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-black/80'}`} />
                  </motion.button>

                  {/* Всплывающий бейдж с названием */}
                  <AnimatePresence>
                    {(isHovered || isSelected) && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.85 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 glass rounded-xl text-center pointer-events-none shadow-2xl z-30 whitespace-nowrap border border-[#E0A98B]/50 backdrop-blur-md"
                      >
                        <p className="text-[11px] font-bold text-white tracking-wide">{piercing.name.split(' (')[0]}</p>
                        <p className="text-[9px] text-[#E0A98B] font-mono">{piercing.englishName} · {formatPrice(piercing.basePrice)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Быстрые чипсы точек для мгновенного выбора (особенно на тачскринах) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filteredPiercings.map((p) => {
              const isSelected = selectedPiercing?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPiercing(p)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-[#E0A98B] text-black border-[#E0A98B] font-bold shadow-[0_0_10px_rgba(224,169,139,0.4)]'
                      : 'bg-black/70 text-gray-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  {p.name.split(' (')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Правая карточка детальной информации */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedPiercing ? (
              <motion.div
                key={selectedPiercing.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border-[#E0A98B]/40 relative shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="badge-luxury text-[10px]">
                        <Sparkles className="w-3 h-3" />
                        {selectedPiercing.englishName}
                      </span>
                      {selectedPiercing.popular && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                      {selectedPiercing.name}
                    </h3>
                    <p className="text-[11px] text-[#E0A98B] font-mono mt-0.5">
                      {selectedPiercing.anatomicalLocation}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPiercing(null)}
                    aria-label="Закрыть описание"
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                  {selectedPiercing.description}
                </p>

                {/* 4 параметра: Боль, Даунсайз, Заживление, Калибр */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Болезненность</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-white">{selectedPiercing.painLevel}/5</span>
                      <span className="text-xs text-[#E0A98B]">{'★'.repeat(selectedPiercing.painLevel)}{'☆'.repeat(5 - selectedPiercing.painLevel)}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Даунсайз</span>
                    <span className="text-xs font-bold text-[#00F2FE]">
                      {selectedPiercing.downsizeRecommended ? `${selectedPiercing.downsizeWeeks} нед. (Обязателен)` : 'Не требуется'}
                    </span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Созревание канала</span>
                    <span className="text-xs font-bold text-gray-200">{selectedPiercing.fullHealingMonths}</span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <span className="block text-[10px] uppercase text-gray-400 mb-1">Рекомендуемый калибр</span>
                    <span className="text-xs font-bold text-[#D4AF37]">{selectedPiercing.recommendedGauge}</span>
                  </div>
                </div>

                {/* Нижний блок: Стоимость + Действия */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-white/10 pt-5 gap-3">
                  <div>
                    <span className="block text-[10px] uppercase text-gray-400">Стоимость процедуры</span>
                    <span className="text-2xl font-bold text-gold-rose font-mono">
                      {formatPrice(selectedPiercing.basePrice)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {activeZone === 'ear' && onSelectForEarSet && (
                      <button
                        onClick={() => onSelectForEarSet(selectedPiercing)}
                        className="btn-premium border-white/20 text-white hover:border-[#E0A98B] hover:text-[#E0A98B] text-xs px-3.5 py-2.5 flex items-center gap-1.5"
                        title="Добавить в проект уха со скидкой"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        В сет
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (onAddtoConfigurator) {
                          onAddtoConfigurator(selectedPiercing);
                        }
                      }}
                      className="btn-premium bg-[#E0A98B] text-black hover:bg-white font-bold text-xs sm:text-sm px-5 py-2.5 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(224,169,139,0.35)]"
                    >
                      <Sparkles className="w-4 h-4" />
                      Собрать украшение
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 glass-card rounded-3xl border-dashed border-white/15"
              >
                <div className="w-14 h-14 rounded-full bg-[#E0A98B]/10 text-[#E0A98B] flex items-center justify-center mx-auto mb-4 border border-[#E0A98B]/25 shadow-lg">
                  <Eye className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-heading font-bold text-white mb-2">
                  Выберите точку на анатомической карте
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 max-w-xs mx-auto">
                  Нажмите на светящийся маркер, чтобы изучить болевую шкалу, сроки заживления и кастомизировать украшение.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {zonePiercings.slice(0, 6).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPiercing(p)}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#E0A98B] hover:text-black text-xs text-gray-300 font-medium border border-white/5 transition-all"
                    >
                      {p.name.split(' (')[0]}
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
