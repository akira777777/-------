'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ZoneSelector from './components/ZoneSelector';
import AnatomyMap from './components/AnatomyMap';
import JewelryConfigurator from './components/JewelryConfigurator';
import JewelryShowcase from './components/JewelryShowcase';
import MastersSection from './components/MastersSection';
import SafetySection from './components/SafetySection';
import AftercareDownsize from './components/AftercareDownsize';
import FAQSection from './components/FAQSection';
import BookingModal, { type BookingData } from './components/BookingModal';
import { ZONES, type ZoneId, type PiercingType } from './constants/piercings';
import { Sparkles, Shield, Award, HeartHandshake, MessageCircle, MapPin, Phone, Clock } from 'lucide-react';

export default function Home() {
  const [activeZone, setActiveZone] = useState<ZoneId>(ZONES[0].id);
  const [selectedPiercing, setSelectedPiercing] = useState<PiercingType | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (customData?: BookingData) => {
    setBookingData(customData || (selectedPiercing ? { piercing: selectedPiercing } : null));
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-white selection:bg-[#E0A98B] selection:text-black">
      {/* Навигационная панель */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[#E0A98B]/5 blur-[150px] rounded-full -z-10" />
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#D4AF37]/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(224,169,139,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              Премиальная студия пирсинга & ювелирного модифицирования
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight leading-tight">
              Искусство анатомического <br />
              <span className="text-gradient">пирсинга и ювелирной эстетики</span>
            </h1>
            
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-gray-400 mb-10 font-body leading-relaxed">
              Безупречная стерильность медицинского уровня, сертифицированный титан ASTM F-136, золото 14k/18k и 
              авторский подбор украшений под индивидуальную геометрию ушей и лица.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <button 
                onClick={() => handleOpenBooking()}
                className="btn-premium bg-[#E0A98B] text-black hover:bg-white transition-all duration-300 font-bold w-full sm:w-auto shadow-[0_0_25px_rgba(224,169,139,0.35)]"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[520px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.6)] group"
          >
            <Image
              src="/images/curated-ear-styling.jpg"
              alt="Анатомический сетап с золотым хеликсом Marquise и титановым кончем от мастера Anastasya"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            
            {/* Верхний плавающий бейдж */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E0A98B] animate-ping" />
                <span className="text-[11px] font-semibold text-white">Anastasya Studio</span>
              </div>
              <span className="shrink-0 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-[11px] text-[#D4AF37] font-mono backdrop-blur-md">
                Prague · 2026
              </span>
            </div>

            {/* Нижний информационный оверлей */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E0A98B]">Ear Curation Project</p>
                <p className="text-base font-heading font-bold text-white mt-1">Marquise 14K Gold &amp; Opal Cluster</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Анатомия</span>
                <span className="text-xs font-bold text-white">100% Custom</span>
              </div>
            </div>
          </motion.div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-10 border-t border-white/5 text-center">
            <div className="flex flex-col items-center p-6 glass rounded-2xl border border-white/5 hover:border-[#E0A98B]/20 transition-colors">
              <Shield className="w-6 h-6 text-[#E0A98B] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Стерилизация</span>
              <p className="font-medium text-sm text-gray-200">Автоклавы класса B (134°C, 3 фазы)</p>
            </div>
            <div className="flex flex-col items-center p-6 glass rounded-2xl border border-white/5 hover:border-[#E0A98B]/20 transition-colors">
              <Award className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Биосовместимость</span>
              <p className="font-medium text-sm text-gray-200">Имплантационный титан без никеля</p>
            </div>
            <div className="flex flex-col items-center p-6 glass rounded-2xl border border-white/5 hover:border-[#E0A98B]/20 transition-colors">
              <HeartHandshake className="w-6 h-6 text-[#00F2FE] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">LTV Забота</span>
              <p className="font-medium text-sm text-gray-200">Бесплатный даунсайз и осмотры</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="py-24 px-6 bg-surface/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#E0A98B] font-bold">Анатомический навигатор</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2 mb-4">Интерактивная карта проколов</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Выберите зону, нажмите на интересующую точку и узнайте шкалу болезненности, сроки заживления и базовую стоимость.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-10">
          <ZoneSelector activeZone={activeZone} setActiveZone={setActiveZone} />
          
          <AnatomyMap 
            activeZone={activeZone} 
            onAddtoConfigurator={(piercing) => {
              setSelectedPiercing(piercing);
              const configuratorEl = document.getElementById('configurator');
              if (configuratorEl) {
                configuratorEl.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
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
                <h3 className="text-3xl font-heading font-bold mt-1 text-white">Конструктор и калькулятор сетапа</h3>
                <p className="text-sm text-gray-400 mt-2">Кастомизируйте металл, камни и цвет анодирования под ваш образ</p>
              </div>
              <JewelryConfigurator 
                basePiercing={selectedPiercing} 
                onBookSetup={(config) => {
                  handleOpenBooking({
                    piercing: config.piercing,
                    material: config.material,
                    stone: config.stone,
                    totalPrice: config.totalPrice
                  });
                }}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Jewelry Showcase Section */}
      <JewelryShowcase 
        onSelectJewelry={(item) => {
          handleOpenBooking({
            material: item.material,
            stone: item.gem,
            totalPrice: item.price
          });
        }} 
      />

      {/* Masters & Portfolio Section */}
      <MastersSection onBookWithMaster={() => handleOpenBooking()} />

      {/* Safety Section */}
      <SafetySection />

      {/* Aftercare & Downsize Section */}
      <AftercareDownsize />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer & Contacts */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black/70 text-gray-400 text-sm relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold text-gold-rose mb-3">AURA PIERCING STUDIO</h3>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed mb-6">
              Флагманская студия анатомического пирсинга, Ear Curation и дизайнерских украшений. Медицинская стерилизация, проверенные сплавы и пожизненная поддержка клиентов.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => handleOpenBooking()}
                className="btn-premium bg-[#E0A98B] text-black font-bold py-2 px-6 text-xs"
              >
                Онлайн-запись
              </button>
              <a 
                href="https://t.me/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-premium border-white/20 text-white hover:border-[#00F2FE] hover:text-[#00F2FE] py-2 px-5 text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Telegram
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Навигация</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => scrollToSection('map')} className="hover:text-gold-rose transition-colors">Карта проколов</button></li>
              <li><button onClick={() => scrollToSection('jewelry')} className="hover:text-gold-rose transition-colors">Витрина украшений</button></li>
              <li><button onClick={() => scrollToSection('masters')} className="hover:text-gold-rose transition-colors">Anastasya и портфолио</button></li>
              <li><button onClick={() => scrollToSection('safety')} className="hover:text-gold-rose transition-colors">Стандарты безопасности</button></li>
              <li><button onClick={() => scrollToSection('aftercare')} className="hover:text-gold-rose transition-colors">Памятка и даунсайз</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-gold-rose transition-colors">Вопросы и ответы</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Контакты & Локация</h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#E0A98B] shrink-0" />
                <span>Praha · точный адрес после подтверждения записи</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E0A98B] shrink-0" />
                <span>Ежедневно с 11:00 до 22:00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E0A98B] shrink-0" />
                <span>Связь через Telegram после записи</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 AURA PIERCING STUDIO. Все права защищены.</p>
          <p>Цены указаны в Kč · Финальная стоимость подтверждается до визита</p>
        </div>
      </footer>

      {/* Floating Quick Telegram Action Button */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <button
          onClick={() => handleOpenBooking()}
          className="group flex items-center gap-2 bg-[#E0A98B] hover:bg-white text-black font-bold p-3.5 rounded-full shadow-[0_0_25px_rgba(224,169,139,0.4)] transition-all duration-300 hover:scale-105"
          aria-label="Записаться"
        >
          <Sparkles className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold uppercase tracking-wider pr-1">
            Записаться
          </span>
        </button>
      </div>

      {/* Модальное окно онлайн-записи */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingData}
      />
    </main>
  );
}
