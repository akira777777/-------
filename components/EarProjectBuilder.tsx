'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIERCINGS, type PiercingType } from '@/constants/piercings';
import { ZONE_PATHS } from '@/constants/svg_assets';
import { useCurrency } from '@/constants/currency';
import { Sparkles, Layers, Trash2, CheckCircle2, Droplets, Info } from 'lucide-react';
import type { BookingData } from '@/components/BookingModal';

interface EarProjectBuilderProps {
  onBookProject: (data: BookingData) => void;
}

export default function EarProjectBuilder({ onBookProject }: EarProjectBuilderProps) {
  const { formatPrice } = useCurrency();
  const earPiercings = PIERCINGS.filter((p) => p.zone === 'ear');
  
  // По умолчанию выбираем классический дуэт: Мочка + Хеликс
  const [selectedPiercings, setSelectedPiercings] = useState<PiercingType[]>([
    earPiercings[0], // First Lobe
    earPiercings[2], // Helix
  ]);
  const [hoveredPiercing, setHoveredPiercing] = useState<PiercingType | null>(null);

  const togglePiercing = (piercing: PiercingType) => {
    if (selectedPiercings.some((p) => p.id === piercing.id)) {
      if (selectedPiercings.length > 1) {
        setSelectedPiercings(selectedPiercings.filter((p) => p.id !== piercing.id));
      }
    } else {
      if (selectedPiercings.length < 5) {
        setSelectedPiercings([...selectedPiercings, piercing]);
      }
    }
  };

  const applyEarPreset = (presetType: 'duo' | 'triple' | 'haute' | 'cascade') => {
    if (presetType === 'duo') {
      // First Lobe + Helix
      setSelectedPiercings([earPiercings[0], earPiercings[2]]);
    } else if (presetType === 'triple') {
      // First Lobe + Upper Lobe + Helix
      setSelectedPiercings([earPiercings[0], earPiercings[1], earPiercings[2]]);
    } else if (presetType === 'haute') {
      // Helix + Conch + Daith (e3, e5, e7)
      const p1 = earPiercings.find(p => p.id === 'e3') || earPiercings[2];
      const p2 = earPiercings.find(p => p.id === 'e5') || earPiercings[4];
      const p3 = earPiercings.find(p => p.id === 'e7') || earPiercings[6];
      setSelectedPiercings([p1, p2, p3]);
    } else if (presetType === 'cascade') {
      // First Lobe + Upper Lobe + Helix + Forward Helix + Conch
      const subset = earPiercings.slice(0, 5);
      setSelectedPiercings(subset);
    }
  };

  // Расчет стоимости и скидок
  const subtotal = selectedPiercings.reduce((sum, p) => sum + p.basePrice, 0);
  let discountPercent = 0;
  if (selectedPiercings.length === 2) discountPercent = 10;
  if (selectedPiercings.length >= 3) discountPercent = 15;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;
  const isFreeCareKit = selectedPiercings.length >= 3;

  const handleBook = () => {
    onBookProject({
      piercing: {
        id: 'ear_project',
        name: `Ear Curation Project (${selectedPiercings.map((p) => p.name.split(' (')[0]).join(' + ')})`,
        englishName: 'Custom Ear Curation Set',
        anatomicalLocation: 'Анатомический проект уха',
        description: `Комплексный проект из ${selectedPiercings.length} проколов со скидкой ${discountPercent}%`,
        painLevel: selectedPiercings.length > 0 ? Math.max(...selectedPiercings.map((p) => p.painLevel)) : 1,
        initialHealingWeeks: '3-4 недели',
        fullHealingMonths: '6-9 месяцев',
        downsizeRecommended: true,
        downsizeWeeks: 4,
        jewelryType: 'stud',
        recommendedGauge: '16G (1.2mm)',
        basePrice: total,
        zone: 'ear',
        hotspotCoords: { x: 50, y: 50 },
      },
      material: 'Имплантационный титан ASTM F-136 / Золото 14K',
      stone: 'Индивидуальный подбор камней на примерке',
      totalPrice: total,
    });
  };

  const earSvg = ZONE_PATHS.ear;

  return (
    <section id="ear-curation" className="py-24 px-4 sm:px-6 bg-surface/25 border-t border-white/5 relative overflow-hidden">
      {/* Декоративное свечение */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E0A98B]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
            <Layers className="w-3.5 h-3.5" />
            Ear Curation Studio
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Соберите свой авторский сет проколов
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Комбинируйте точки в один визит: Анастасия построит единую анатомическую композицию, а вы получите скидку до 15% и бесплатный набор ухода.
          </p>
        </div>

        {/* Быстрые шаблоны Ear Curation */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-8">
          <span className="text-xs text-gray-400 font-mono font-bold mr-1">
            Популярные сетапы:
          </span>
          <button
            onClick={() => applyEarPreset('duo')}
            className="px-3.5 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#E0A98B] text-gray-200 hover:text-white transition-all font-mono"
          >
            ✨ Классический Дуэт (-10%)
          </button>
          <button
            onClick={() => applyEarPreset('triple')}
            className="px-3.5 py-1.5 rounded-full text-xs bg-[#E0A98B]/10 hover:bg-[#E0A98B]/25 border border-[#E0A98B]/30 text-[#E0A98B] transition-all font-mono font-bold"
          >
            🌸 Каскадное Трио (-15%)
          </button>
          <button
            onClick={() => applyEarPreset('haute')}
            className="px-3.5 py-1.5 rounded-full text-xs bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/30 text-[#D4AF37] transition-all font-mono font-bold"
          >
            👑 Haute Conch & Daith (-15%)
          </button>
          <button
            onClick={() => applyEarPreset('cascade')}
            className="px-3.5 py-1.5 rounded-full text-xs bg-[#00F2FE]/10 hover:bg-[#00F2FE]/25 border border-[#00F2FE]/30 text-[#00F2FE] transition-all font-mono font-bold"
          >
            💎 Полный Сетап 5 точек (-15% + Бокс)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Левая колонка: Визуализатор анатомии уха + Сетка переключаемых точек (7 колонок) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <span>Интерактивная карта сетапа</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 font-normal">
                  {selectedPiercings.length} из 5 выбрано
                </span>
              </h3>
              {discountPercent > 0 && (
                <span className="badge-luxury text-xs animate-pulse">
                  Скидка {discountPercent}% применена!
                </span>
              )}
            </div>

            {/* Интерактивный холст ушной раковины */}
            <div className="relative w-full aspect-[4/3] max-h-[340px] bg-black/60 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden p-4 shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#E0A98B_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
              
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-gray-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0A98B] animate-pulse" />
                Live Geometry Preview
              </div>

              <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(224,169,139,0.25)]">
                  <defs>
                    <linearGradient id="earBuilderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#E0A98B" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Направляющие */}
                  <path d={earSvg.guides} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" strokeDasharray="1.5 2" />

                  {/* Главный контур */}
                  <path d={earSvg.outline} fill="rgba(224,169,139,0.03)" stroke="url(#earBuilderGrad)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Внутренние складки */}
                  <path d={earSvg.inner} fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" className="opacity-40" />

                  {/* Соединительные линии между выбранными проколами */}
                  {selectedPiercings.length > 1 && (
                    <path
                      d={selectedPiercings.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.hotspotCoords.x} ${p.hotspotCoords.y}`).join(' ')}
                      fill="none"
                      stroke="#E0A98B"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                      className="opacity-60 transition-all duration-500"
                    />
                  )}
                </svg>

                {/* Интерактивные точки на холсте */}
                {earPiercings.map((piercing) => {
                  const isSelected = selectedPiercings.some((p) => p.id === piercing.id);
                  const isHovered = hoveredPiercing?.id === piercing.id;

                  return (
                    <div
                      key={piercing.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ left: `${piercing.hotspotCoords.x}%`, top: `${piercing.hotspotCoords.y}%` }}
                    >
                      {/* Ореол */}
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-[#E0A98B]/40 animate-ping pointer-events-none" />
                      )}

                      <button
                        type="button"
                        onClick={() => togglePiercing(piercing)}
                        onMouseEnter={() => setHoveredPiercing(piercing)}
                        onMouseLeave={() => setHoveredPiercing(null)}
                        aria-label={`Переключить ${piercing.name}`}
                        className={`relative w-4 h-4 rounded-full border transition-all flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E0A98B] ${
                          isSelected
                            ? 'bg-[#E0A98B] border-white shadow-[0_0_15px_#E0A98B] scale-125'
                            : 'bg-black/80 border-white/30 hover:border-[#E0A98B] scale-90'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black font-bold' : 'bg-white/40'}`} />
                      </button>

                      {/* Тултип */}
                      <AnimatePresence>
                        {(isHovered || isSelected) && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.85 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 2, scale: 0.85 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg glass border border-white/20 text-[10px] text-white font-mono whitespace-nowrap shadow-xl pointer-events-none z-30"
                          >
                            {piercing.name.split(' (')[0]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Сетка переключаемых точек */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {earPiercings.map((piercing) => {
                const isSelected = selectedPiercings.some((p) => p.id === piercing.id);

                return (
                  <button
                    key={piercing.id}
                    onClick={() => togglePiercing(piercing)}
                    onMouseEnter={() => setHoveredPiercing(piercing)}
                    onMouseLeave={() => setHoveredPiercing(null)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'border-[#E0A98B] bg-[#E0A98B]/15 shadow-[0_0_20px_rgba(224,169,139,0.2)]'
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-gold-rose transition-colors">
                        {piercing.name.split(' (')[0]}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {piercing.englishName} · {formatPrice(piercing.basePrice)}
                      </span>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? 'bg-[#E0A98B] text-black font-bold text-xs' : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {isSelected ? '✓' : '+'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Пакетные бонусы */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#E0A98B] shrink-0" />
                <span>2 прокола: <strong>скидка -10%</strong></span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0" />
                <span>3+ прокола: <strong>скидка -15% + бокс ухода</strong></span>
              </div>
            </div>
          </div>

          {/* Правая колонка: Калькулятор сета и чекаут (5 колонок) */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-[2.5rem] border border-[#E0A98B]/30 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold font-mono">
                Итоговый пакет Ear Curation
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                Ваша персональная композиция
              </h3>
            </div>

            {/* Список выбранных позиций */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              <AnimatePresence>
                {selectedPiercings.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{p.anatomicalLocation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-200">{formatPrice(p.basePrice)}</span>
                      {selectedPiercings.length > 1 && (
                        <button
                          onClick={() => togglePiercing(p)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Удалить из сета"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Расчет цены */}
            <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Базовая сумма ({selectedPiercings.length} прокола):</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#E0A98B] font-semibold">
                  <span>Скидка за комплект ({discountPercent}%):</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {isFreeCareKit && (
                <div className="flex justify-between text-[#00F2FE] font-semibold">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5" />
                    Набор ухода Brine Healer (150ml):
                  </span>
                  <span>Бесплатно (Подарок)</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-base font-bold text-white">Итого со скидкой:</span>
                <span className="text-3xl font-bold text-gold-rose font-mono">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-[11px] text-gray-400">
              <Info className="w-3.5 h-3.5 text-[#E0A98B] shrink-0" />
              <span>Точный подбор накруток и примерка проводятся очно с Анастасией.</span>
            </div>

            <button
              onClick={handleBook}
              className="w-full btn-premium bg-[#E0A98B] text-black font-bold py-3.5 text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(224,169,139,0.35)] hover:bg-white transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Забронировать этот сет со скидкой
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
