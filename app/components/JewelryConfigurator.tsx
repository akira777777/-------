'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATERIALS, STONES } from '../constants/jewelry_types';
import { CheckCircle2, Sparkles, Shield, ChevronRight, ChevronLeft, Droplets } from 'lucide-react';

interface ConfiguratorProps {
  basePiercing: any;
  onBookSetup?: (config: {
    piercing: any;
    material: string;
    stone: string;
    anodization?: string;
    withCareKit: boolean;
    totalPrice: number;
  }) => void;
}

const ANODIZATION_OPTIONS = [
  { id: 'raw', name: 'Натуральный титан (Silver)', color: '#A9A9A9', price: 0 },
  { id: 'gold', name: 'Анодирование Gold (Золото)', color: '#D4AF37', price: 300 },
  { id: 'rose', name: 'Анодирование Rose Gold', color: '#E0A98B', price: 300 },
  { id: 'ice', name: 'Анодирование Ice Blue', color: '#00F2FE', price: 300 },
  { id: 'violet', name: 'Анодирование Deep Violet', color: '#8A2BE2', price: 300 },
];

export default function JewelryConfigurator({ basePiercing, onBookSetup }: ConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedStone, setSelectedStone] = useState(STONES[0]);
  const [selectedAnodization, setSelectedAnodization] = useState(ANODIZATION_OPTIONS[0]);
  const [withCareKit, setWithCareKit] = useState(false);

  // Расчет стоимости
  const careKitPrice = withCareKit ? 650 : 0;
  const baseMultiplied = Math.round(basePiercing.basePrice * selectedMaterial.basePriceMultiplier);
  const totalPrice = baseMultiplied + selectedStone.price + selectedAnodization.price + careKitPrice;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleBooking = () => {
    if (onBookSetup) {
      onBookSetup({
        piercing: basePiercing,
        material: selectedMaterial.name,
        stone: selectedStone.name,
        anodization: selectedAnodization.name,
        withCareKit,
        totalPrice,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 glass rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-2xl">
      {/* Прогресс-бар шагов */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {[
            { num: 1, label: 'Металл' },
            { num: 2, label: 'Камень' },
            { num: 3, label: 'Опции' },
            { num: 4, label: 'Итог' }
          ].map((s) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                    step >= s.num
                      ? 'bg-[#E0A98B] text-black shadow-[0_0_15px_rgba(224,169,139,0.4)]'
                      : 'bg-white/5 text-gray-500 border border-white/5'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`hidden sm:inline text-xs font-medium ${step >= s.num ? 'text-white' : 'text-gray-600'}`}>
                  {s.label}
                </span>
              </div>
              {s.num < 4 && (
                <div
                  className={`h-[2px] w-6 sm:w-10 transition-all duration-300 ${
                    step > s.num ? 'bg-[#E0A98B]' : 'bg-white/10'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Шаг 1: Металл */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#E0A98B] font-bold">Шаг 1 из 4</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">Выберите материал основы</h3>
              <p className="text-xs text-gray-400 mt-1">Все металлы проверены на гипоаллергенность и биосовместимость</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMaterial(m)}
                  className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                    selectedMaterial.id === m.id
                      ? 'border-[#E0A98B] bg-[#E0A98B]/10 shadow-[0_0_20px_rgba(224,169,139,0.15)]'
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: m.color }} />
                      <span className="font-bold text-base text-white">{m.name}</span>
                    </div>
                    {selectedMaterial.id === m.id && <CheckCircle2 className="w-5 h-5 text-[#E0A98B]" />}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{m.description}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={nextStep}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-xs sm:text-sm px-8 py-3 flex items-center gap-2"
              >
                Далее: Камни
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Шаг 2: Камень */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#E0A98B] font-bold">Шаг 2 из 4</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">Выберите инкрустацию камнем</h3>
              <p className="text-xs text-gray-400 mt-1">Натуральные и лабораторные камни с надежной крапановой закрепкой</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {STONES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStone(s)}
                  className={`p-5 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                    selectedStone.id === s.id
                      ? 'border-[#E0A98B] bg-[#E0A98B]/10 shadow-[0_0_20px_rgba(224,169,139,0.15)]'
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/20 mb-3 flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: s.color === 'transparent' ? '#14141A' : s.color }}
                  >
                    {s.id === 'none' ? <span className="text-xs text-gray-500">✕</span> : <Sparkles className="w-3.5 h-3.5 text-white/80" />}
                  </div>
                  <span className="font-bold text-sm text-white">{s.name}</span>
                  <p className="text-xs text-[#E0A98B] mt-1 font-semibold">
                    {s.price === 0 ? 'Без доплаты' : `+${s.price.toLocaleString('ru-RU')} ₽`}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="btn-premium border-white/20 text-white text-xs sm:text-sm px-6">
                Назад
              </button>
              <button
                onClick={nextStep}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-xs sm:text-sm px-8 flex items-center gap-2"
              >
                Далее: Опции
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Шаг 3: Анодирование и Уход */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#E0A98B] font-bold">Шаг 3 из 4</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">Цвет анодирования и уход</h3>
              <p className="text-xs text-gray-400 mt-1">Электрохимическое покрытие титана и профессиональный антисептик</p>
            </div>

            {/* Цвета анодирования */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">
                Оттенок титановой основы
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ANODIZATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedAnodization(opt)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      selectedAnodization.id === opt.id
                        ? 'border-[#E0A98B] bg-[#E0A98B]/10 shadow-[0_0_15px_rgba(224,169,139,0.15)]'
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: opt.color }} />
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">{opt.name}</p>
                      <p className="text-[10px] text-gray-400">{opt.price === 0 ? 'Включено' : `+${opt.price} ₽`}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Чекбокс ухода */}
            <div
              onClick={() => setWithCareKit(!withCareKit)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                withCareKit
                  ? 'border-[#00F2FE] bg-[#00F2FE]/10 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                  : 'border-white/5 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE]">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Набор ухода Brine Healer (Спрей 150ml)</h4>
                  <p className="text-xs text-gray-400">Стерильный изотонический спрей для заживления без корок</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#00F2FE]">+650 ₽</span>
                <span className="block text-[10px] text-gray-500">{withCareKit ? 'Выбрано' : 'Нажмите для выбора'}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="btn-premium border-white/20 text-white text-xs sm:text-sm px-6">
                Назад
              </button>
              <button
                onClick={nextStep}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-xs sm:text-sm px-8 flex items-center gap-2"
              >
                Итоговый расчет
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Шаг 4: Итоговый расчет */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Готовый сетап</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">Итоговая спецификация</h3>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-gray-400">Вид прокола:</span>
                <span className="text-sm font-bold text-white">{basePiercing.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-gray-400">Основа и металл:</span>
                <span className="text-sm font-bold text-white">{selectedMaterial.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-gray-400">Инкрустация:</span>
                <span className="text-sm font-bold text-white">{selectedStone.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-gray-400">Цвет анодирования:</span>
                <span className="text-sm font-bold text-white">{selectedAnodization.name}</span>
              </div>
              {withCareKit && (
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-xs text-gray-400">Уход Brine Healer:</span>
                  <span className="text-sm font-bold text-[#00F2FE]">+650 ₽</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <span className="text-base font-semibold text-gray-300">Итого «Всё включено»:</span>
                <span className="text-3xl sm:text-4xl font-bold text-gold-rose">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
              <button onClick={prevStep} className="btn-premium border-white/20 text-white text-xs sm:text-sm px-6">
                Назад к опциям
              </button>
              <button
                onClick={handleBooking}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-sm px-10 py-3.5 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(224,169,139,0.4)] hover:bg-white transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Забронировать этот сетап
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
