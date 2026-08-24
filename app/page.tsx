'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ZoneSelector from './components/ZoneSelector';
import AnatomyMap from './components/AnatomyMap';
import JewelryConfigurator from './components/JewelryConfigurator';
import SafetySection from './components/SafetySection';
import { ZONES } from './constants/piercings';

export default function Home() {
  const [activeZone, setActiveZone] = useState(ZONES[0].id);
  const [selectedPiercing, setSelectedPiercing] = useState<any>(null);

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#E0A98B]/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6 tracking-tight leading-none">
            Искусство анатомического <br />
            <span className="text-gradient">пирсинга и ювелирной эстетики</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 font-body leading-relaxed">
            Премиальная студия модификации тела, где безупречная стерильность встречается с 
            высоким ювелирным искусством. Индивидуальный подход к каждой анатомической детали.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <button className="btn-premium bg-[#E0A98B] text-black hover:bg-white transition-all duration-300 font-bold">
              Записаться онлайн
            </button>
            <button className="btn-premium border-[#D4AF37]/50 text-gold-rose">
              Интерактивная карта проколов
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-10 border-t border-white/5">
            <div className="flex flex-col items-center p-4 glass rounded-xl">
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Стерилизация</span>
              <p className="font-medium">Медицинские автоклавы класса B</p>
            </div>
            <div className="flex flex-col items-center p-4 glass rounded-xl">
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Материалы</span>
              <p className="font-medium">Имплантационный титан ASTM F-136</p>
            </div>
            <div className="flex flex-col items-center p-4 glass rounded-xl">
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Гарантия</span>
              <p className="font-medium">100% стерильность и безопасность</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="py-24 px-6 bg-surface/20">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Интерактивная карта</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Выберите зону, чтобы изучить доступные варианты проколов и их характеристики.</p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-12">
          <ZoneSelector activeZone={activeZone} setActiveZone={setActiveZone} />
          <AnatomyMap 
            activeZone={activeZone} 
            onAddtoConfigurator={(piercing) => setSelectedPiercing(piercing)} 
          />

          {selectedPiercing && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-12 border-t border-white/10"
            >
              <h3 className="text-2xl font-heading mb-8 text-center">Конструктор украшений</h3>
              <JewelryConfigurator basePiercing={selectedPiercing} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Safety Section */}
      <SafetySection />

      {/* Footer Placeholder */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        © 2026 AURA PIERCING STUDIO. Все права защищены.
      </footer>
    </main>
  );
}
