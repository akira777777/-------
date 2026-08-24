'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ZoneSelector from './components/ZoneSelector';
import AnatomyMap from './components/AnatomyMap';
import JewelryConfigurator from './components/JewelryConfigurator';
import SafetySection from './components/SafetySection';
import AftercareDownsize from './components/AftercareDownsize';
import { ZONES, type ZoneId, type PiercingType } from './constants/piercings';
import { Sparkles, Shield, Award, HeartHandshake } from 'lucide-react';

export default function Home() {
  const [activeZone, setActiveZone] = useState<ZoneId>(ZONES[0].id);
  const [selectedPiercing, setSelectedPiercing] = useState<PiercingType | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background text-white selection:bg-[#E0A98B] selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#E0A98B]/5 blur-[140px] rounded-full -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[100px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Премиальная студия модификаций
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight leading-tight">
              Искусство анатомического <br />
              <span className="text-gradient">пирсинга и ювелирной эстетики</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 mb-10 font-body leading-relaxed">
              Безупречная стерильность медицинского уровня, имплантационный титан ASTM F-136 и 
              авторский подбор украшений под индивидуальную анатомию.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
              <button 
                onClick={() => scrollToSection('map')}
                className="btn-premium bg-[#E0A98B] text-black hover:bg-white transition-all duration-300 font-bold w-full sm:w-auto shadow-[0_0_25px_rgba(224,169,139,0.3)]"
              >
                Записаться онлайн
              </button>
              <button 
                onClick={() => scrollToSection('map')}
                className="btn-premium border-[#D4AF37]/50 text-gold-rose hover:border-white transition-all w-full sm:w-auto"
              >
                Интерактивная карта проколов
              </button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-10 border-t border-white/5">
            <div className="flex flex-col items-center p-6 glass rounded-2xl border border-white/5 hover:border-[#E0A98B]/20 transition-colors">
              <Shield className="w-6 h-6 text-[#E0A98B] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Стерилизация</span>
              <p className="font-medium text-sm text-gray-200">Медицинские автоклавы класса B</p>
            </div>
            <div className="flex flex-col items-center p-6 glass rounded-2xl border border-white/5 hover:border-[#E0A98B]/20 transition-colors">
              <Award className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Биосовместимость</span>
              <p className="font-medium text-sm text-gray-200">Титан ASTM F-136 без никеля</p>
            </div>
            <div className="flex flex-col items-center p-6 glass rounded-2xl border border-white/5 hover:border-[#E0A98B]/20 transition-colors">
              <HeartHandshake className="w-6 h-6 text-[#E0A98B] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Сопровождение</span>
              <p className="font-medium text-sm text-gray-200">Бесплатный даунсайз и осмотры</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="py-24 px-6 bg-surface/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#E0A98B] font-bold">Навигатор по проколам</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2 mb-4">Интерактивная карта</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Выберите анатомическую зону, нажмите на интересующую точку и узнайте характеристики, сложность и стоимость процедуры.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-10">
          <ZoneSelector activeZone={activeZone} setActiveZone={setActiveZone} />
          
          <AnatomyMap 
            activeZone={activeZone} 
            onAddtoConfigurator={(piercing) => setSelectedPiercing(piercing)} 
          />

          {selectedPiercing && (
            <motion.div
              id="configurator"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16 border-t border-white/10"
            >
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Шаг 2</span>
                <h3 className="text-3xl font-heading font-bold mt-1 text-white">Калькулятор и Конструктор сетапа</h3>
                <p className="text-sm text-gray-400 mt-2">Кастомизируйте основу, пробу золота и инкрустацию камней под ваш стиль</p>
              </div>
              <JewelryConfigurator basePiercing={selectedPiercing} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety">
        <SafetySection />
      </section>

      {/* Aftercare & Downsize Section */}
      <section id="aftercare">
        <AftercareDownsize />
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-black/60 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <p className="text-lg font-heading font-bold text-gold-rose">AURA PIERCING STUDIO</p>
            <p className="text-xs text-gray-400 mt-1">Авторский пирсинг & ювелирное модифицирование</p>
          </div>
          <div className="flex gap-6 text-xs">
            <button onClick={() => scrollToSection('map')} className="hover:text-white transition-colors">Карта</button>
            <button onClick={() => scrollToSection('safety')} className="hover:text-white transition-colors">Безопасность</button>
            <button onClick={() => scrollToSection('aftercare')} className="hover:text-white transition-colors">Уход</button>
          </div>
          <p className="text-xs">© 2026 AURA STUDIO. Все права защищены.</p>
        </div>
      </footer>
    </main>
  );
}
