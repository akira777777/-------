'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATERIALS, STONES, SILHOUETTES, ANODIZATION_PRESETS, type Material, type Stone, type SilhouetteConfig } from '@/constants/jewelry_types';
import { useCurrency } from '@/constants/currency';
import type { PiercingType } from '@/constants/piercings';
import { Sparkles, ChevronRight, Droplets, RotateCw, Wand2 } from 'lucide-react';

interface ConfiguratorProps {
  basePiercing: PiercingType;
  onBookSetup?: (config: {
    piercing: PiercingType;
    material: string;
    stone: string;
    silhouette: string;
    anodization?: string;
    withCareKit: boolean;
    totalPrice: number;
  }) => void;
}

const CARE_KIT_PRICE_CZK = 390;

export default function JewelryConfigurator({ basePiercing, onBookSetup }: ConfiguratorProps) {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(MATERIALS[0]);
  const [selectedStone, setSelectedStone] = useState<Stone>(STONES[1]); // Default to Diamond
  const [userSilhouetteId, setUserSilhouetteId] = useState<string | null>(null);
  const [selectedAnodization, setSelectedAnodization] = useState(ANODIZATION_PRESETS[0]);
  const [withCareKit, setWithCareKit] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Вычисляемый совместимый силуэт: если выбранный пользователем силуэт совместим с типом пирсинга, используем его, иначе берем дефолтный совместимый
  const defaultCompatibleSilhouette = SILHOUETTES.find(s => s.compatibleWith.includes(basePiercing.jewelryType)) || SILHOUETTES[0];
  const userSelected = userSilhouetteId ? SILHOUETTES.find(s => s.id === userSilhouetteId) : null;
  const selectedSilhouette = (userSelected && userSelected.compatibleWith.includes(basePiercing.jewelryType))
    ? userSelected
    : defaultCompatibleSilhouette;

  const setSelectedSilhouette = (sil: SilhouetteConfig) => setUserSilhouetteId(sil.id);

  // Быстрые пресеты стиля
  const applyPreset = (presetName: 'classic_titanium' | 'rose_opal' | 'royal_gold' | 'ice_blue') => {
    if (presetName === 'classic_titanium') {
      setSelectedMaterial(MATERIALS[0]);
      setSelectedAnodization(ANODIZATION_PRESETS[0]);
      setSelectedStone(STONES[1]);
      const sil = SILHOUETTES.find(s => s.id === 'labret_stud' && s.compatibleWith.includes(basePiercing.jewelryType)) || SILHOUETTES[0];
      setSelectedSilhouette(sil);
    } else if (presetName === 'rose_opal') {
      setSelectedMaterial(MATERIALS[1]); // Rose Gold
      setSelectedStone(STONES[3]); // Opal
      const sil = SILHOUETTES.find(s => (s.id === 'cluster_trio' || s.id === 'marquise_fan') && s.compatibleWith.includes(basePiercing.jewelryType)) || SILHOUETTES[0];
      setSelectedSilhouette(sil);
    } else if (presetName === 'royal_gold') {
      setSelectedMaterial(MATERIALS[2]); // Yellow Gold 18K
      setSelectedStone(STONES[1]); // Diamond
      const sil = SILHOUETTES.find(s => (s.id === 'marquise_fan' || s.id === 'eternity_hoop') && s.compatibleWith.includes(basePiercing.jewelryType)) || SILHOUETTES[0];
      setSelectedSilhouette(sil);
    } else if (presetName === 'ice_blue') {
      setSelectedMaterial(MATERIALS[0]); // Titanium
      const iceAnod = ANODIZATION_PRESETS.find(a => a.id === 'ice_blue') || ANODIZATION_PRESETS[0];
      setSelectedAnodization(iceAnod);
      setSelectedStone(STONES[1]);
    }
  };

  // Расчет стоимости
  const careKitPrice = withCareKit ? CARE_KIT_PRICE_CZK : 0;
  const baseMultiplied = Math.round(basePiercing.basePrice * selectedMaterial.basePriceMultiplier);
  const anodizationPrice = selectedMaterial.id === 'titanium' ? selectedAnodization.price : 0;
  const totalPriceInCzk = baseMultiplied + selectedStone.price + anodizationPrice + careKitPrice;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleBooking = () => {
    if (onBookSetup) {
      onBookSetup({
        piercing: basePiercing,
        material: selectedMaterial.name,
        stone: selectedStone.name,
        silhouette: selectedSilhouette.name,
        anodization: selectedMaterial.id === 'titanium' ? selectedAnodization.name : 'Натуральный цвет металла',
        withCareKit,
        totalPrice: totalPriceInCzk,
      });
    }
  };

  // Эффективный цвет металла с учетом анодирования
  const effectiveMetalColor = selectedMaterial.id === 'titanium' && selectedAnodization.id !== 'raw'
    ? selectedAnodization.colorHex
    : selectedMaterial.color;

  return (
    <div className="max-w-5xl mx-auto p-5 sm:p-8 md:p-10 glass rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-2xl">
      
      {/* Шапка конструктора с живым превью */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 pb-8 border-b border-white/10">
        
        {/* Живой визуализатор украшения (Dynamic Real-time Preview) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-6 rounded-3xl bg-black/60 border border-white/10 shadow-inner overflow-hidden min-h-[260px]">
          <div className="absolute inset-0 bg-[radial-gradient(#E0A98B_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
          
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-[#E0A98B] font-mono">
            <Sparkles className="w-3 h-3" />
            Live Preview
          </div>

          <button
            onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
            aria-label="Повернуть украшение"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
            title="Повернуть на 45°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* SVG/CSS Модель украшения */}
          <motion.div
            animate={{ rotate: rotationAngle }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative w-36 h-36 flex items-center justify-center filter drop-shadow-[0_0_25px_rgba(224,169,139,0.3)] my-2"
          >
            {/* Отрисовка в зависимости от силуэта */}
            {selectedSilhouette.id === 'eternity_hoop' ? (
              // Кольцо кликер
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke={effectiveMetalColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Камни по контуру */}
                {selectedStone.id !== 'none' && [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const x = 60 + 45 * Math.cos(rad);
                  const y = 60 + 45 * Math.sin(rad);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3.5"
                      fill={selectedStone.color === 'transparent' ? '#FFF' : selectedStone.color}
                      stroke="#000"
                      strokeWidth="0.8"
                    />
                  );
                })}
              </svg>
            ) : selectedSilhouette.id === 'marquise_fan' ? (
              // Веер Маркиз
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <g transform="translate(60, 70)">
                  {[-40, -20, 0, 20, 40].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle})`}>
                      {/* Оправа лепестка */}
                      <path
                        d="M 0 0 C -8 -15, -8 -30, 0 -42 C 8 -30, 8 -15, 0 0 Z"
                        fill={effectiveMetalColor}
                        stroke="#000"
                        strokeWidth="0.5"
                      />
                      {/* Камень Маркиз */}
                      {selectedStone.id !== 'none' && (
                        <path
                          d="M 0 -3 C -5 -15, -5 -27, 0 -39 C 5 -27, 5 -15, 0 -3 Z"
                          fill={selectedStone.color === 'transparent' ? '#FFF' : selectedStone.color}
                          className={selectedStone.isIridescent ? 'animate-shimmer' : ''}
                        />
                      )}
                    </g>
                  ))}
                  <circle cx="0" cy="0" r="5" fill={effectiveMetalColor} />
                </g>
              </svg>
            ) : selectedSilhouette.id === 'cluster_trio' ? (
              // Тринити кластер
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <g transform="translate(60, 60)">
                  {[
                    { x: 0, y: -16 },
                    { x: -14, y: 10 },
                    { x: 14, y: 10 },
                  ].map((pos, i) => (
                    <g key={i}>
                      <circle cx={pos.x} cy={pos.y} r="14" fill={effectiveMetalColor} stroke="#000" strokeWidth="0.8" />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="10"
                        fill={selectedStone.color === 'transparent' ? '#FFF' : selectedStone.color}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="0.5"
                        className={selectedStone.isIridescent ? 'animate-shimmer' : ''}
                      />
                      <circle cx={pos.x - 3} cy={pos.y - 3} r="2.5" fill="rgba(255,255,255,0.7)" />
                    </g>
                  ))}
                  <circle cx="0" cy="0" r="6" fill={effectiveMetalColor} />
                </g>
              </svg>
            ) : selectedSilhouette.id === 'curved_bar' ? (
              // Изогнутый микро-банан
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <path
                  d="M 60 20 Q 85 60 60 100"
                  fill="none"
                  stroke={effectiveMetalColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="20" r="10" fill={effectiveMetalColor} />
                <circle cx="60" cy="20" r="6" fill={selectedStone.color === 'transparent' ? effectiveMetalColor : selectedStone.color} />
                <circle cx="60" cy="100" r="14" fill={effectiveMetalColor} />
                <circle cx="60" cy="100" r="9" fill={selectedStone.color === 'transparent' ? effectiveMetalColor : selectedStone.color} />
              </svg>
            ) : (
              // Классический Labret топ
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="32" fill={effectiveMetalColor} stroke="#000" strokeWidth="1" />
                {selectedStone.id !== 'none' ? (
                  <>
                    <circle
                      cx="60"
                      cy="60"
                      r="24"
                      fill={selectedStone.color === 'transparent' ? '#FFF' : selectedStone.color}
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth="1"
                      className={selectedStone.isIridescent ? 'animate-shimmer' : ''}
                    />
                    <circle cx="50" cy="50" r="6" fill="rgba(255,255,255,0.6)" />
                  </>
                ) : (
                  <circle cx="60" cy="60" r="18" fill="rgba(255,255,255,0.15)" />
                )}
                {/* 4 крапана */}
                <circle cx="36" cy="60" r="3" fill={effectiveMetalColor} />
                <circle cx="84" cy="60" r="3" fill={effectiveMetalColor} />
                <circle cx="60" cy="36" r="3" fill={effectiveMetalColor} />
                <circle cx="60" cy="84" r="3" fill={effectiveMetalColor} />
              </svg>
            )}
          </motion.div>

          <div className="text-center mt-2">
            <span className="text-xs font-bold text-white block">{selectedSilhouette.name}</span>
            <span className="text-[10px] text-[#E0A98B] font-mono">
              {selectedMaterial.shortName} · {selectedStone.name.split(' (')[0]}
            </span>
          </div>
        </div>

        {/* Правая часть: Заголовок и быстрый счетчик */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-luxury text-[10px]">
              {basePiercing.name}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Калибр: {basePiercing.recommendedGauge}
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-3">
            Ювелирный конфигуратор сетапа
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
            Соберите индивидуальное украшение: от металла первичной имплантации до формы верхушки и цвета инкрустации.
          </p>

          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-mono">Текущий расчет сетапа:</span>
              <span className="text-2xl sm:text-3xl font-bold text-gold-rose font-mono">
                {formatPrice(totalPriceInCzk)}
              </span>
            </div>
            <span className="text-[11px] text-gray-400 ml-auto">
              Включает процедуру, украшение {withCareKit && '+ уход'}
            </span>
          </div>
        </div>

      </div>

      {/* Прогресс-бар шагов */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {[
            { num: 1, label: '1. Металл' },
            { num: 2, label: '2. Форма & Камень' },
            { num: 3, label: '3. Анод & Уход' },
            { num: 4, label: '4. Итог' },
          ].map((s) => (
            <React.Fragment key={s.num}>
              <button
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  step >= s.num ? 'text-white' : 'text-gray-600'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                    step >= s.num
                      ? 'bg-[#E0A98B] text-black shadow-[0_0_15px_rgba(224,169,139,0.4)]'
                      : 'bg-white/5 text-gray-500 border border-white/5'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="hidden sm:inline text-xs font-semibold">
                  {s.label}
                </span>
              </button>
              {s.num < 4 && (
                <div
                  className={`h-[2px] w-5 sm:w-8 transition-all duration-300 ${
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
              <span className="text-[10px] uppercase tracking-widest text-[#E0A98B] font-bold font-mono">Шаг 1 из 4</span>
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">Выберите благородный сплав</h4>
              <p className="text-xs text-gray-400 mt-1">Все металлы имеют гипоаллергенный сертификат и пригодны для первичного заживления</p>
            </div>

            {/* Быстрые пресеты стиля */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center gap-1.5 mb-2.5 text-[11px] uppercase tracking-wider text-gray-400 font-mono font-bold">
                <Wand2 className="w-3.5 h-3.5 text-[#E0A98B]" />
                Готовые ювелирные сеты в 1 клик:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => applyPreset('classic_titanium')}
                  className="px-3 py-2 rounded-xl text-xs bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#E0A98B] text-gray-200 hover:text-white transition-all text-left font-mono"
                >
                  ✨ Титан F-136
                </button>
                <button
                  onClick={() => applyPreset('rose_opal')}
                  className="px-3 py-2 rounded-xl text-xs bg-[#E0A98B]/10 hover:bg-[#E0A98B]/20 border border-[#E0A98B]/30 text-[#E0A98B] transition-all text-left font-mono font-bold"
                >
                  🌸 Rose Gold + Опал
                </button>
                <button
                  onClick={() => applyPreset('royal_gold')}
                  className="px-3 py-2 rounded-xl text-xs bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] transition-all text-left font-mono font-bold"
                >
                  👑 Золото 18K + Бриллиант
                </button>
                <button
                  onClick={() => applyPreset('ice_blue')}
                  className="px-3 py-2 rounded-xl text-xs bg-[#00F2FE]/10 hover:bg-[#00F2FE]/20 border border-[#00F2FE]/30 text-[#00F2FE] transition-all text-left font-mono"
                >
                  ❄️ Ice Blue Titanium
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMaterial(m)}
                  className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between relative overflow-hidden group ${
                    selectedMaterial.id === m.id
                      ? 'border-[#E0A98B] bg-[#E0A98B]/10 shadow-[0_0_20px_rgba(224,169,139,0.15)]'
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full border border-white/30 shrink-0" style={{ backgroundColor: m.color }} />
                      <span className="font-bold text-sm sm:text-base text-white">{m.name}</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 border border-white/10 text-gray-300">
                      {m.purityBadge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{m.description}</p>
                  <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-white/5">
                    <span className="text-gray-500">Коэффициент:</span>
                    <span className="text-[#E0A98B] font-bold">
                      {m.basePriceMultiplier === 1 ? 'Базовая цена' : `×${m.basePriceMultiplier}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={nextStep}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-xs sm:text-sm px-8 py-3 flex items-center gap-2 shadow-[0_0_20px_rgba(224,169,139,0.3)]"
              >
                Далее: Форма и Камни
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Шаг 2: Форма топа и Камни */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#E0A98B] font-bold font-mono">Шаг 2 из 4</span>
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">Форма накрутки и инкрустация</h4>
              <p className="text-xs text-gray-400 mt-1">Выберите архитектурную форму верхушки и натуральный либо выращенный камень</p>
            </div>

            {/* Выбор формы */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold font-mono">
                1. Силуэт ювелирного топа
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SILHOUETTES.map((sil) => (
                  <button
                    key={sil.id}
                    onClick={() => setSelectedSilhouette(sil)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedSilhouette.id === sil.id
                        ? 'border-[#E0A98B] bg-[#E0A98B]/10 shadow-[0_0_15px_rgba(224,169,139,0.15)]'
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{sil.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{sil.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор камня */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold font-mono">
                2. Камень инкрустации
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {STONES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStone(s)}
                    className={`p-3.5 rounded-xl border transition-all text-center flex flex-col items-center justify-between ${
                      selectedStone.id === s.id
                        ? 'border-[#E0A98B] bg-[#E0A98B]/10 shadow-[0_0_15px_rgba(224,169,139,0.15)]'
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border border-white/30 mb-2 flex items-center justify-center shadow-md"
                      style={{ backgroundColor: s.color === 'transparent' ? '#1E293B' : s.color }}
                    >
                      {s.id === 'none' ? (
                        <span className="text-[10px] text-gray-400">✕</span>
                      ) : (
                        <Sparkles className="w-3 h-3 text-white/80" />
                      )}
                    </div>
                    <span className="font-bold text-xs text-white line-clamp-1">{s.name.split(' (')[0]}</span>
                    <span className="text-[10px] text-[#E0A98B] mt-1 font-mono font-semibold">
                      {s.price === 0 ? 'Включено' : `+${formatPrice(s.price)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="btn-premium border-white/20 text-white text-xs sm:text-sm px-6">
                Назад
              </button>
              <button
                onClick={nextStep}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-xs sm:text-sm px-8 flex items-center gap-2 shadow-[0_0_20px_rgba(224,169,139,0.3)]"
              >
                Далее: Анодирование & Уход
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
              <span className="text-[10px] uppercase tracking-widest text-[#E0A98B] font-bold font-mono">Шаг 3 из 4</span>
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">Цвет анодирования и набор ухода</h4>
              <p className="text-xs text-gray-400 mt-1">Электрохимическое окрашивание оксидного слоя титана без красителей и аллергенов</p>
            </div>

            {/* Цвета анодирования */}
            {selectedMaterial.id === 'titanium' ? (
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold font-mono">
                  Оттенок титана (Электрохимическое анодирование)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ANODIZATION_PRESETS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedAnodization(opt)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        selectedAnodization.id === opt.id
                          ? 'border-[#E0A98B] bg-[#E0A98B]/10 shadow-[0_0_15px_rgba(224,169,139,0.15)]'
                          : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: opt.colorHex }} />
                      <div className="truncate">
                        <p className="text-xs font-bold text-white truncate">{opt.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">
                          {opt.price === 0 ? 'Включено' : `+${formatPrice(opt.price)}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                ✨ Вы выбрали <strong className="text-white">{selectedMaterial.name}</strong>. Для благородного золота и платины сохраняется аутентичный природный оттенок металла.
              </div>
            )}

            {/* Набор ухода Brine Healer */}
            <button
              type="button"
              aria-pressed={withCareKit}
              onClick={() => setWithCareKit((current) => !current)}
              className={`w-full p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-left ${
                withCareKit
                  ? 'border-[#00F2FE] bg-[#00F2FE]/10 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                  : 'border-white/5 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE] shrink-0">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Премиум-бокс ухода Brine Healer (150ml)</h5>
                  <p className="text-xs text-gray-400">Стерильный изотонический спрей + ваучер на бесплатный плановый даунсайз</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-[#00F2FE] font-mono">+{formatPrice(CARE_KIT_PRICE_CZK)}</span>
                <span className="block text-[10px] text-gray-400">{withCareKit ? 'Включено в сетап ✓' : 'Нажмите чтобы добавить'}</span>
              </div>
            </button>

            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="btn-premium border-white/20 text-white text-xs sm:text-sm px-6">
                Назад
              </button>
              <button
                onClick={nextStep}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-xs sm:text-sm px-8 flex items-center gap-2 shadow-[0_0_20px_rgba(224,169,139,0.3)]"
              >
                Итоговая спецификация
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Шаг 4: Итоговая спецификация */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold font-mono">Готовый сетап</span>
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">Итоговая спецификация визита</h4>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3.5">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-xs text-gray-400">Анатомический прокол:</span>
                <span className="text-sm font-bold text-white">{basePiercing.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-xs text-gray-400">Металл основы:</span>
                <span className="text-sm font-bold text-white">{selectedMaterial.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-xs text-gray-400">Силуэт и форма:</span>
                <span className="text-sm font-bold text-white">{selectedSilhouette.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-xs text-gray-400">Инкрустация камнем:</span>
                <span className="text-sm font-bold text-white">{selectedStone.name}</span>
              </div>
              {selectedMaterial.id === 'titanium' && (
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-xs text-gray-400">Оттенок титана:</span>
                  <span className="text-sm font-bold text-white">{selectedAnodization.name}</span>
                </div>
              )}
              {withCareKit && (
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-xs text-gray-400">Набор Brine Healer + Даунсайз:</span>
                  <span className="text-sm font-bold text-[#00F2FE] font-mono">+{formatPrice(CARE_KIT_PRICE_CZK)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3">
                <span className="text-base font-semibold text-gray-300">Итого «Всё включено»:</span>
                <span className="text-3xl sm:text-4xl font-bold text-gold-rose font-mono">
                  {formatPrice(totalPriceInCzk)}
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
