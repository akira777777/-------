import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIERCINGS, ZONES } from '../constants/piercings';

interface AnatomyMapProps {
  activeZone: string;
  onAddtoConfigurator?: (piercing: any) => void;
}

export default function AnatomyMap({ activeZone, onAddtoConfigurator }: AnatomyMapProps) {
  const [selectedPiercing, setSelectedPiercing] = useState<any>(null);

  const filteredPiercings = PIERCINGS.filter(p => p.zone === activeZone);

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[600px] flex flex-col items-center justify-center bg-surface/30 rounded-3xl border border-white/5 p-8">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        {/* Placeholder for SVG Map */}
        <div className="text-[20rem] font-heading text-white/20">MAP</div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {!selectedPiercing ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
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
            className="max-w-md w-full glass p-8 rounded-3xl border-[#E0A98B]/30"
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
    </div>
  );
}
