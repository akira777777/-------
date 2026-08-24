'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Instagram, Sparkles, CheckCircle2 } from 'lucide-react';

interface MastersSectionProps {
  onBookWithMaster: (masterId: string) => void;
}

const MASTERS_DATA = [
  {
    id: 'anna',
    name: 'Анна Воронова',
    title: 'Top-Master & Шеф-стилист',
    experience: '8 лет практики',
    proceduresCount: '4 000+ проколов',
    specialties: ['Ear Curation (архитектура уха)', 'Сложные септумы', 'Анатомический дайт'],
    bio: 'Сертифицированный специалист международной ассоциации пирсеров (APP). Создает безупречные индивидуальные композиции с учетом анатомических особенностей хряща.',
    avatarColor: 'from-[#E0A98B] to-[#D4AF37]'
  },
  {
    id: 'mark',
    name: 'Марк Рейн',
    title: 'Ведущий мастер модификаций',
    experience: '6 лет практики',
    proceduresCount: '2 800+ проколов',
    specialties: ['Микродермалы и плоскостной пирсинг', 'Симметричный пирсинг лица', 'Анодирование титана'],
    bio: 'Ювелирная точность и владение техникой безболезненного прокола. Специализируется на надежной установке и заживлении микродермалов в сложных зонах.',
    avatarColor: 'from-[#00F2FE] to-[#4FACFE]'
  },
  {
    id: 'sofia',
    name: 'София Левина',
    title: 'Пирсер & Ювелирный консультант',
    experience: '4 года практики',
    proceduresCount: '1 700+ проколов',
    specialties: ['Золотые каскады хеликсов', 'Пирсинг носа и губ', 'Детский деликатный пирсинг мочек'],
    bio: 'Мастер тонкой эстетики и идеального подбора драгоценных камней. Обеспечивает максимально мягкое и комфортное заживление с первого дня.',
    avatarColor: 'from-[#F38181] to-[#FCE38A]'
  }
];

const PORTFOLIO_WORKS = [
  {
    id: 'p1',
    tag: 'Ear Curation',
    title: 'Золотой каскад Helix + Conch',
    master: 'Анна Воронова',
    healed: 'Заживший 6 мес.',
    metal: 'Золото 14K + Бриллианты'
  },
  {
    id: 'p2',
    tag: 'Microdermal',
    title: 'Микродермал в яремную впадину',
    master: 'Марк Рейн',
    healed: 'Свежий сетап',
    metal: 'Титан ASTM F-136 + Опал'
  },
  {
    id: 'p3',
    tag: 'Nose & Septum',
    title: 'Симметричный Nostril + Septum Clicker',
    master: 'София Левина',
    healed: 'Заживший 3 мес.',
    metal: 'Розовое золото 14K'
  },
  {
    id: 'p4',
    tag: 'Ear Curation',
    title: 'Daith Heart + Tragus Cluster',
    master: 'Анна Воронова',
    healed: 'Заживший 1 год',
    metal: 'Титан (Анодирование Gold)'
  }
];

export default function MastersSection({ onBookWithMaster }: MastersSectionProps) {
  const [activeTab, setActiveTab] = useState<'masters' | 'portfolio'>('masters');

  return (
    <section id="masters" className="py-24 px-6 bg-black/40 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            Эксперты своего дела
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Команда мастеров и галерея работ
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Каждый мастер имеет медицинское образование и сертификаты санитарно-эпидемиологической безопасности высшего уровня.
          </p>

          {/* Переключатель Мастера / Портфолио */}
          <div className="flex justify-center mt-8">
            <div className="p-1 bg-surface border border-white/10 rounded-full flex gap-1">
              <button
                onClick={() => setActiveTab('masters')}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'masters'
                    ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Мастера студии
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'portfolio'
                    ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Галерея работ
              </button>
            </div>
          </div>
        </div>

        {/* Секция мастеров */}
        <AnimatePresence mode="wait">
          {activeTab === 'masters' ? (
            <motion.div
              key="masters-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {MASTERS_DATA.map((master) => (
                <div
                  key={master.id}
                  className="glass rounded-[2.5rem] p-8 border border-white/5 hover:border-[#E0A98B]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(224,169,139,0.1)] group"
                >
                  <div>
                    {/* Аватар с градиентом */}
                    <div className="relative mb-6 flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${master.avatarColor} p-0.5 shadow-xl`}>
                        <div className="w-full h-full bg-[#14141A] rounded-2xl flex items-center justify-center font-heading font-bold text-xl text-white">
                          {master.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-heading font-bold text-white group-hover:text-gold-rose transition-colors">
                          {master.name}
                        </h4>
                        <p className="text-xs text-[#E0A98B] font-medium">{master.title}</p>
                        <span className="text-[11px] text-gray-500">{master.experience} • {master.proceduresCount}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed mb-6">
                      {master.bio}
                    </p>

                    <div className="mb-6 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">Специализация:</span>
                      {master.specialties.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E0A98B] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onBookWithMaster(master.id)}
                    className="w-full btn-premium bg-white/5 group-hover:bg-[#E0A98B] group-hover:text-black text-white font-bold py-2.5 text-xs text-center transition-all duration-300"
                  >
                    Записаться к мастеру
                  </button>
                </div>
              ))}
            </motion.div>
          ) : (
            /* Секция галереи портфолио */
            <motion.div
              key="portfolio-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {PORTFOLIO_WORKS.map((work) => (
                <div
                  key={work.id}
                  className="glass rounded-3xl p-6 border border-white/5 hover:border-[#E0A98B]/30 transition-all flex flex-col justify-between group"
                >
                  <div className="h-44 rounded-2xl bg-black/50 border border-white/5 flex flex-col items-center justify-center p-4 text-center mb-4 relative overflow-hidden">
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0A98B]/20 text-[#E0A98B]">
                      {work.healed}
                    </span>
                    <Sparkles className="w-8 h-8 text-[#E0A98B] mb-2 group-hover:scale-125 transition-transform duration-300" />
                    <p className="text-xs font-semibold text-gray-300">{work.metal}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#D4AF37] tracking-widest font-mono">{work.tag}</span>
                    <h5 className="text-sm font-bold text-white mt-1 mb-2">{work.title}</h5>
                    <p className="text-xs text-gray-500">Мастер: <span className="text-gray-300">{work.master}</span></p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
