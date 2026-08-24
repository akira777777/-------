'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIERCINGS, type PiercingType } from '../constants/piercings';
import { useCurrency } from '../constants/currency';
import { Sparkles, Layers, Trash2, CheckCircle2, Droplets } from 'lucide-react';
import type { BookingData } from './BookingModal';

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
        painLevel: Math.max(...selectedPiercings.map((p) => p.painLevel)),
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

  return (
    <section id="ear-curation" className="py-24 px-4 sm:px-6 bg-surface/25 border-t border-white/5 relative overflow-hidden">
      {/* Декоративное свечение */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E0A98B]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            Ear Curation Studio
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Соберите свой авторский сет проколов
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Комбинируйте несколько точек в один визит: Анастасия построит единую анатомическую композицию, а вы получите пакетную скидку до 15% и бесплатный набор ухода.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Левая колонка: Интерактивный выбор точек для сета (7 колонок) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <span>Точки на ушной раковине</span>
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

            {/* Сетка переключаемых точек */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {earPiercings.map((piercing) => {
                const isSelected = selectedPiercings.some((p) => p.id === piercing.id);

                return (
                  <button
                    key={piercing.id}
                    onClick={() => togglePiercing(piercing)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'border-[#E0A98B] bg-[#E0A98B]/15 shadow-[0_0_20px_rgba(224,169,139,0.2)]'
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-bold text-white block group-hover:text-gold-rose transition-colors">
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
