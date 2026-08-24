'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ZoneSelector from '@/components/ZoneSelector';
import AnatomyMap from '@/components/AnatomyMap';
import EarProjectBuilder from '@/components/EarProjectBuilder';
import EditorialGallery from '@/components/EditorialGallery';
import JewelryShowcase from '@/components/JewelryShowcase';
import HealingCalculator from '@/components/HealingCalculator';
import MastersSection from '@/components/MastersSection';
import SafetySection from '@/components/SafetySection';
import AftercareDownsize from '@/components/AftercareDownsize';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import { type BookingData } from '@/components/BookingModal';
import { SOCIAL_LINKS } from '@/constants/content_files/content';
import { ZONES, type ZoneId, type PiercingType } from '@/constants/piercings';
import { CurrencyProvider, useCurrency } from '@/constants/currency';
import { Sparkles, Shield, Award, HeartHandshake, MessageCircle, MapPin, Clock, Layers, Instagram } from 'lucide-react';

const JewelryConfigurator = dynamic(() => import('@/components/JewelryConfigurator'), {
  loading: () => (
    <div className="glass rounded-[2.5rem] border border-white/10 p-10 text-center text-sm text-gray-400 font-mono" role="status">
      ✨ Загружаем ювелирный конфигуратор…
    </div>
  ),
});

const BookingModal = dynamic(() => import('@/components/BookingModal'), {
  ssr: false,
});

function HomeContent() {
  const [activeZone, setActiveZone] = useState<ZoneId>(ZONES[0].id);
  const [selectedPiercing, setSelectedPiercing] = useState<PiercingType | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { currency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenBooking = useCallback((customData?: BookingData) => {
    setBookingData(customData || (selectedPiercing ? { piercing: selectedPiercing } : null));
    setIsBookingOpen(true);
  }, [selectedPiercing]);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  return (
    <main className="min-h-screen bg-[#08080B] text-white selection:bg-[#E0A98B] selection:text-black">
      {/* Навигационная панель */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 px-4 sm:px-6 overflow-hidden">
        {/* Фоновые градиентные сферы */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[#E0A98B]/6 blur-[160px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#D4AF37]/5 blur-[130px] rounded-full -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-center mb-16">
            
            {/* Текстовая колонка */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/25 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_0_25px_rgba(224,169,139,0.15)] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                AURA Studio Praha · Ear Curation & Fine Jewelry
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 tracking-tight leading-[1.08]">
                Искусство анатомического <br />
                <span className="text-gradient">пирсинга и ювелирной эстетики</span>
              </h1>
              
              <p className="max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-gray-300 mb-8 font-body leading-relaxed">
                Безупречная стерильность медицинского уровня (EN 13060 Class B), сертифицированный титан ASTM F-136, золото 14k/18k и 
                авторский подбор украшений под индивидуальную геометрию ушей и лица.
              </p>
              
              {/* Кнопки CTA */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3.5 mb-10">
                <button 
                  onClick={() => handleOpenBooking()}
                  className="btn-premium bg-[#E0A98B] text-black hover:bg-white transition-all duration-300 font-bold w-full sm:w-auto shadow-[0_0_25px_rgba(224,169,139,0.35)] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Записаться онлайн
                </button>
                <button 
                  onClick={() => scrollToSection('ear-curation')}
                  className="btn-premium border-[#E0A98B]/40 text-white hover:border-white transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4 text-[#E0A98B]" />
                  Сет-билдер уха (-15%)
                </button>
                <button 
                  onClick={() => scrollToSection('map')}
                  className="btn-premium border-white/15 text-gray-300 hover:border-white hover:text-white transition-all w-full sm:w-auto"
                >
                  Карта проколов
                </button>
              </div>

              {/* Мягкие теги доверия */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0A98B]" />
                  Один мастер: Anastasya
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  Бесплатный даунсайз
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                  0% никеля (Ti-6Al-4V ELI)
                </span>
              </div>
            </motion.div>

            {/* Медиа-колонка Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto w-full max-w-[500px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.7)] group"
            >
              <Image
                src="/images/curated-ear-styling.webp"
                alt="Анатомический сетап с золотым хеликсом Marquise и титановым кончем от мастера Anastasya"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              
              {/* Верхний плавающий бейдж */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E0A98B] animate-ping" />
                  <span className="text-[11px] font-semibold text-white font-mono">AURA · Prague</span>
                </div>
                <span className="shrink-0 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-[11px] text-[#D4AF37] font-mono backdrop-blur-md">
                  APP Certified · 2026
                </span>
              </div>

              {/* Нижний информационный оверлей */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E0A98B] font-mono">
                    Ear Curation Project
                  </p>
                  <p className="text-base font-heading font-bold text-white mt-1">
                    Marquise 14K Gold & Opal Cluster
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">Анатомия</span>
                  <span className="text-xs font-bold text-white font-mono">100% Custom</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-10 border-t border-white/5 text-center">
            <div className="flex flex-col items-center p-6 glass rounded-3xl border border-white/5 hover:border-[#E0A98B]/30 transition-all shadow-lg">
              <Shield className="w-6 h-6 text-[#E0A98B] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold font-mono">Стерилизация</span>
              <p className="font-semibold text-sm text-gray-200">Автоклавы класса B (134°C, 3 фазы)</p>
            </div>
            <div className="flex flex-col items-center p-6 glass rounded-3xl border border-white/5 hover:border-[#E0A98B]/30 transition-all shadow-lg">
              <Award className="w-6 h-6 text-[#D4AF37] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold font-mono">Биосовместимость</span>
              <p className="font-semibold text-sm text-gray-200">Имплантационный титан без никеля</p>
            </div>
            <div className="flex flex-col items-center p-6 glass rounded-3xl border border-white/5 hover:border-[#E0A98B]/30 transition-all shadow-lg">
              <HeartHandshake className="w-6 h-6 text-[#00F2FE] mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold font-mono">LTV Сопровождение</span>
              <p className="font-semibold text-sm text-gray-200">Бесплатный даунсайз и осмотры</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Anatomy Map Section */}
      <section id="map" className="py-24 px-4 sm:px-6 bg-surface/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#E0A98B] font-bold font-mono">Анатомический навигатор</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2 mb-4">Интерактивная карта проколов</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Выберите зону, нажмите на интересующую точку и изучите шкалу болезненности, сроки заживления и базовую стоимость.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-10">
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
            onSelectForEarSet={() => {
              const earEl = document.getElementById('ear-curation');
              if (earEl) {
                earEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />

          {/* Dynamic Configurator */}
          {selectedPiercing && (
            <motion.div
              id="configurator"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16 border-t border-white/10"
            >
              <JewelryConfigurator 
                basePiercing={selectedPiercing} 
                onBookSetup={(config) => {
                  handleOpenBooking({
                    piercing: config.piercing,
                    material: config.material,
                    stone: config.stone,
                    silhouette: config.silhouette,
                    anodization: config.anodization,
                    totalPrice: config.totalPrice
                  });
                }}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Ear Curation Set Builder Section */}
      <EarProjectBuilder 
        onBookProject={(projectData) => handleOpenBooking(projectData)} 
      />

      {/* Editorial Inspiration Gallery */}
      <EditorialGallery onOpenBooking={() => handleOpenBooking()} />

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

      {/* Interactive Healing & Downsize Roadmap Calculator */}
      <HealingCalculator 
        onBookDownsize={() => handleOpenBooking({
          piercing: {
            id: 'downsize_visit',
            name: 'Плановый Даунсайз (Замена лабрета)',
            englishName: 'Downsize Session',
            anatomicalLocation: 'Любой ранее выполненный прокол',
            description: 'Бесплатная замена первичной удлиненной основы на анатомический размер + антисептический осмотр.',
            painLevel: 1,
            initialHealingWeeks: 'Завершено',
            fullHealingMonths: 'В процессе',
            downsizeRecommended: true,
            downsizeWeeks: 4,
            jewelryType: 'stud',
            recommendedGauge: '16G (1.2mm)',
            basePrice: 0,
            zone: 'ear',
            hotspotCoords: { x: 50, y: 50 }
          },
          material: 'Имплантационный титан ASTM F-136',
          totalPrice: 0
        })}
      />

      {/* Masters & Portfolio Section */}
      <MastersSection onBookWithMaster={() => handleOpenBooking()} />

      {/* Safety Section */}
      <SafetySection />

      {/* Aftercare & Downsize Section */}
      <AftercareDownsize />

      {/* Verified Client Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer & Contacts */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black/80 text-gray-400 text-sm relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold text-gold-rose mb-3">AURA PIERCING STUDIO</h3>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed mb-6">
              Флагманская студия анатомического пирсинга, Ear Curation и дизайнерских украшений в Праге. Медицинская стерилизация, проверенные сплавы ASTM F-136 и пожизненная поддержка клиентов.
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => handleOpenBooking()}
                className="btn-premium bg-[#E0A98B] text-black font-bold py-2.5 px-6 text-xs shadow-[0_0_15px_rgba(224,169,139,0.3)]"
              >
                Онлайн-запись
              </button>
              <a 
                href={SOCIAL_LINKS.telegram.url}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-premium border-white/20 text-white hover:border-[#00F2FE] hover:text-[#00F2FE] py-2.5 px-4 text-xs flex items-center gap-1.5"
                title="Telegram @yacure0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00F2FE]" />
                <span>Telegram: {SOCIAL_LINKS.telegram.handle}</span>
              </a>
              <a 
                href={SOCIAL_LINKS.instagram.url}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-premium border-white/20 text-white hover:border-[#E0A98B] hover:text-[#E0A98B] py-2.5 px-4 text-xs flex items-center gap-1.5"
                title="Instagram @b00tleg._"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E0A98B]" />
                <span>Instagram: {SOCIAL_LINKS.instagram.handle}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Навигация</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => scrollToSection('map')} className="hover:text-gold-rose transition-colors">Карта проколов</button></li>
              <li><button onClick={() => scrollToSection('ear-curation')} className="hover:text-gold-rose transition-colors">Сет-билдер уха</button></li>
              <li><button onClick={() => scrollToSection('editorial')} className="hover:text-gold-rose transition-colors">Визуальное вдохновение</button></li>
              <li><button onClick={() => scrollToSection('jewelry')} className="hover:text-gold-rose transition-colors">Витрина украшений</button></li>
              <li><button onClick={() => scrollToSection('healing')} className="hover:text-gold-rose transition-colors">Календарь заживления</button></li>
              <li><button onClick={() => scrollToSection('masters')} className="hover:text-gold-rose transition-colors">Anastasya & Портфолио</button></li>
              <li><button onClick={() => scrollToSection('safety')} className="hover:text-gold-rose transition-colors">Безопасность</button></li>
              <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-gold-rose transition-colors">Отзывы гостей</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-gold-rose transition-colors">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">Контакты & Локация</h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#E0A98B] shrink-0" />
                <span>Praha · Точный адрес отправляется после подтверждения</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E0A98B] shrink-0" />
                <span>Ежедневно с 11:00 до 21:30 (по записи)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#00F2FE] shrink-0" />
                <a 
                  href={SOCIAL_LINKS.telegram.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#00F2FE] transition-colors"
                >
                  Telegram: <strong className="text-white">{SOCIAL_LINKS.telegram.handle}</strong>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#E0A98B] shrink-0" />
                <a 
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#E0A98B] transition-colors"
                >
                  Instagram: <strong className="text-white">{SOCIAL_LINKS.instagram.handle}</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
          <p>© 2026 AURA PIERCING STUDIO PRAHA. Все права защищены.</p>
          <p>Цены отображаются в {currency} · Финальная стоимость фиксируется до процедуры</p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg"
            aria-label="Наверх"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
        )}
        {/* Quick Booking FAB */}
        <button
          onClick={() => handleOpenBooking()}
          className="group flex items-center gap-2 bg-[#E0A98B] hover:bg-white text-black font-bold p-3.5 rounded-full shadow-[0_0_25px_rgba(224,169,139,0.4)] transition-all duration-300 hover:scale-105"
          aria-label="Записаться онлайн"
        >
          <Sparkles className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold uppercase tracking-wider pr-1">
            Записаться
          </span>
        </button>
      </div>

      {/* Модальное окно онлайн-записи */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          initialData={bookingData}
        />
      )}
    </main>
  );
}

export default function Home() {
  return (
    <CurrencyProvider>
      <HomeContent />
    </CurrencyProvider>
  );
}
