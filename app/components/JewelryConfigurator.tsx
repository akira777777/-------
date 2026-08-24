'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATERIALS, STONES } from '../constants/jewelry_types';
import { CheckCircle2 } from 'lucide-react';

interface ConfiguratorProps {
  basePiercing: any; // Data from AnatomyMap
}

export default function JewelryConfigurator({ basePiercing }: ConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedStone, setSelectedStone] = useState(STONES[0]);

  // Calculation logic
  const totalPrice = Math.round((basePiercing.basePrice * selectedMaterial.basePriceMultiplier) + selectedStone.price);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 glass rounded-[3rem] border border-white/10 shadow-2xl">
      {/* Progress Bar */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-[#E0A98B] text-black' : 'bg-white/5 text-gray-500'}`}>
                {s}
              </div>
              {s < 3 && <div className={`h-[2px] w-12 ${step > s ? 'bg-[#E0A98B]' : 'bg-white/10'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-heading mb-4">Выберите материал</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMaterial(m)}
                  className={`p-6 rounded-2xl border transition-all text-left ${
                    selectedMaterial.id === m.id ? 'border-[#E0A98B] bg-[#E0A98B]/10' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{m.name}</span>
                    {selectedMaterial.id === m.id && <CheckCircle2 className="text-[#E0A98B]" />}
                  </div>
                  <p className="text-sm text-gray-400">{m.description}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-6">
              <button onClick={nextStep} className="btn-premium bg-[#E0A98B] text-black font-bold">Далее</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-heading mb-4">Выберите камень</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {STONES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStone(s)}
                  className={`p-6 rounded-2xl border transition-all text-center ${
                    selectedStone.id === s.id ? 'border-[#E0A98B] bg-[#E0A98B]/10' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: s.color }} />
                  <span className="font-bold">{s.name}</span>
                  <p className="text-xs text-gray-500 mt-1">+{s.price} ₽</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="btn-premium border-white/20 text-white">Назад</button>
              <button onClick={nextStep} className="btn-premium bg-[#E0A98B] text-black font-bold">Далее</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 text-center"
          >
            <h2 className="text-3xl font-heading mb-4">Итоговая конфигурация</h2>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4">
              <p className="text-gray-400">Прокол: <span className="text-white font-bold">{basePiercing.name}</span></p>
              <p className="text-gray-400">Материал: <span className="text-white font-bold">{selectedMaterial.name}</span></p>
              <p className="text-gray-400">Камень: <span className="text-white font-bold">{selectedStone.name}</span></p>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-xl">Итоговая стоимость:</span>
                <span className="text-4xl font-bold text-gold-rose">{totalPrice} ₽</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 pt-6">
              <button onClick={prevStep} className="btn-premium border-white/20 text-white">Назад</button>
              <button className="btn-premium bg-[#E0A98B] text-black font-bold px-12">Забронировать</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
