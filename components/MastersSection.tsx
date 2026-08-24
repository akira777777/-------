'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, Sparkles, Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/content_files/content';

interface MastersSectionProps {
  onBookWithMaster: () => void;
}

const PORTFOLIO_WORKS = [
  {
    id: 'p1',
    tag: 'Ear Curation',
    title: 'Каскадный сетап: Marquise Helix & Daith',
    healed: 'Полностью заживший',
    metal: 'Золото 14K + Бриллианты + Опал',
    image: '/images/curated-ear-styling.webp',
  },
  {
    id: 'p2',
    tag: 'Face & Dermal',
    title: 'Nostril Ring & Ключичный микродермал',
    healed: 'Свежий сетап',
    metal: 'Золото 14K + Swarovski Crystal',
    image: '/images/facial-piercing-editorial.webp',
  },
  {
    id: 'p3',
    tag: 'Custom Jewelry',
    title: 'Сет кликеров и кластеров ручной закрепки',
    healed: 'Ювелирный подбор',
    metal: 'Титан ASTM F-136 + Натуральные камни',
    image: '/images/jewelry-editorial.webp',
  },
  {
    id: 'p4',
    tag: 'Anatomy Project',
    title: 'Анатомический золотой сетап Helix + Conch',
    healed: 'Заживший проект',
    metal: 'Титановый банан + 14K Gold Tops',
    image: '/images/ear-curation-hero.webp',
  },
];

export default function MastersSection({ onBookWithMaster }: MastersSectionProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'portfolio'>('profile');

  return (
    <section id="masters" className="py-24 px-6 bg-black/40 border-t border-white/5 relative overflow-hidden">
      {/* Мягкое фоновое свечение */}
      <div className="absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-[#E0A98B]/5 blur-[140px] pointer-events-none" />
      <div className="absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            Один мастер · Персональное кураторство
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Anastasya & авторские работы
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            От первой очной консультации и примерки до финального даунсайза — с вами работает один эксперт с медицинским бэкграундом.
          </p>

          <div className="flex justify-center mt-8">
            <div className="p-1 bg-surface border border-white/10 rounded-full flex gap-1 shadow-xl">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'profile'
                    ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)] font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                О мастере
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'portfolio'
                    ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)] font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Галерея работ
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card overflow-hidden rounded-[2.5rem] border border-white/10 grid grid-cols-1 lg:grid-cols-2 shadow-2xl"
            >
              <div className="relative min-h-[420px] lg:min-h-[560px]">
                <Image
                  src="/images/anastasya-portrait.webp"
                  alt="Anastasya — ведущий мастер пирсинга и ювелирный куратор AURA Piercing Prague"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute left-6 right-6 bottom-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#E0A98B]">AURA Studio · Prague</span>
                    <p className="text-sm font-heading font-bold text-white mt-0.5">Индивидуальный анатомический подход</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[11px] text-[#D4AF37] font-mono backdrop-blur">
                    APP Member
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                    Top Piercer & Jewelry Curator
                  </span>
                </div>
                <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                  Anastasya
                </h3>

                {/* Статистические плашки */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-xl font-bold text-white">7+ лет</span>
                    <span className="text-[10px] text-gray-400 uppercase">Практики</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-xl font-bold text-gold-rose">4 500+</span>
                    <span className="text-[10px] text-gray-400 uppercase">Проколов</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-xl font-bold text-white">100%</span>
                    <span className="text-[10px] text-gray-400 uppercase">Стерильно</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  Специализируется на создании гармоничных анатомических сетапов (Ear Curation) и микродермальной имплантации. Каждый прокол рассчитывается с точностью до миллиметра с учетом строения хряща и толщины тканей.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    'Консультация с моделированием композиции украшений до прокола',
                    'Использование только имплантационного титана ASTM F-136 и золота 14K/18K',
                    'Бесплатное сопровождение заживления и плановый даунсайз',
                    'Сертифицированное медицинское автоклавирование (EN 13060 Class B)',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#E0A98B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={onBookWithMaster}
                    className="btn-premium bg-[#E0A98B] text-black hover:bg-white font-bold w-full sm:w-fit py-3.5 px-8 shadow-[0_0_25px_rgba(224,169,139,0.35)] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Записаться на сеанс к Anastasya
                  </button>
                  <a
                    href={SOCIAL_LINKS.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium border-white/20 text-white hover:border-[#E0A98B] hover:text-[#E0A98B] py-3.5 px-6 flex items-center justify-center gap-2 text-xs"
                    title="Instagram @b00tleg._"
                  >
                    <Instagram className="w-4 h-4 text-[#E0A98B]" />
                    <span>Instagram: {SOCIAL_LINKS.instagram.handle}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {PORTFOLIO_WORKS.map((work) => (
                <article
                  key={work.id}
                  className="glass rounded-3xl p-4 sm:p-5 border border-white/5 hover:border-[#E0A98B]/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
                >
                  <div className="h-56 rounded-2xl mb-4 relative overflow-hidden border border-white/10 bg-black/60">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[#E0A98B] border border-white/10">
                      {work.healed}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase text-[#D4AF37] tracking-widest font-mono font-bold">
                    {work.tag}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1.5 mb-2 group-hover:text-gold-rose transition-colors">
                    {work.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{work.metal}</p>
                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-gray-500">Мастер: <strong className="text-gray-200">Anastasya</strong></span>
                    <button
                      onClick={onBookWithMaster}
                      className="text-[#E0A98B] hover:text-white font-medium text-[11px]"
                    >
                      Повторить сетап →
                    </button>
                  </div>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
