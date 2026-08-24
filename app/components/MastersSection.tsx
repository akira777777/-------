'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';

interface MastersSectionProps {
  onBookWithMaster: () => void;
}

const PORTFOLIO_WORKS = [
  { id: 'p1', tag: 'Ear Curation', title: 'Золотой каскад Helix + Conch', healed: 'Заживший сетап', metal: 'Золото 14K + титан ASTM F-136' },
  { id: 'p2', tag: 'Microdermal', title: 'Акцентный микродермал', healed: 'Свежий сетап', metal: 'Титан ASTM F-136 + опал' },
  { id: 'p3', tag: 'Nose & Septum', title: 'Nostril + изящный clicker', healed: 'Заживший сетап', metal: 'Золото 14K' },
  { id: 'p4', tag: 'Ear Curation', title: 'Daith + Tragus cluster', healed: 'Индивидуальная анатомия', metal: 'Анодированный титан' },
];

export default function MastersSection({ onBookWithMaster }: MastersSectionProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'portfolio'>('profile');

  return (
    <section id="masters" className="py-24 px-6 bg-black/40 border-t border-white/5 relative overflow-hidden">
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#E0A98B]/5 blur-[130px]" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            Один мастер, личный подход
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Anastasya &amp; её работы</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Каждый проект начинается с консультации: Anastasya оценивает анатомию, предлагает безопасные варианты и сопровождает заживление.
          </p>

          <div className="flex justify-center mt-8">
            <div className="p-1 bg-surface border border-white/10 rounded-full flex gap-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'profile' ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)]' : 'text-gray-400 hover:text-white'
                }`}
              >
                О мастере
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'portfolio' ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)]' : 'text-gray-400 hover:text-white'
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
              className="glass-card overflow-hidden rounded-[2.5rem] border border-white/10 grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="relative min-h-[340px] lg:min-h-[480px]">
                <Image
                  src="/images/ear-curation-hero.png"
                  alt="Деликатный сетап из золотого хеликса и титанового конча"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute left-7 bottom-6 text-[10px] uppercase tracking-[0.24em] font-bold text-[#E0A98B]">Анатомия прежде трендов</p>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-3">Piercer &amp; jewelry curator</span>
                <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-5">Anastasya</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8">
                  Деликатный пирсинг и композиции, которые выглядят естественно именно на вашей анатомии. От первого выбора украшения до планового даунсайза — вы общаетесь с одним мастером.
                </p>
                <div className="space-y-3 mb-9">
                  {[
                    'Подбор прокола и украшения на очной консультации',
                    'Титан ASTM F-136 и проверенное золото',
                    'План ухода и контрольный визит после процедуры',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#E0A98B] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <button onClick={onBookWithMaster} className="btn-premium bg-[#E0A98B] text-black hover:bg-white font-bold w-full sm:w-fit">
                  Записаться к Anastasya
                </button>
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
              {PORTFOLIO_WORKS.map((work, index) => (
                <article key={work.id} className="glass rounded-3xl p-5 border border-white/5 hover:border-[#E0A98B]/30 transition-all group">
                  <div className="h-44 rounded-2xl mb-5 relative overflow-hidden border border-white/5 bg-black/50">
                    <Image
                      src={index % 2 === 0 ? '/images/ear-curation-hero.png' : '/images/jewelry-editorial.png'}
                      alt="Деталь украшения для пирсинга"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${index % 2 === 0 ? 'object-[74%_42%]' : 'object-center'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full bg-black/50 backdrop-blur text-[#E0A98B] border border-white/10">{work.healed}</span>
                  </div>
                  <span className="text-[10px] uppercase text-[#D4AF37] tracking-widest font-mono">{work.tag}</span>
                  <h4 className="text-base font-bold text-white mt-1.5 mb-2">{work.title}</h4>
                  <p className="text-xs text-gray-400">{work.metal}</p>
                  <p className="text-xs text-gray-500 mt-4">Мастер: <span className="text-gray-300">Anastasya</span></p>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
