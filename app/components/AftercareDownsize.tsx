'use client';

import React from 'react';
import { ShieldCheck, Droplets, Clock, RefreshCw, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AftercareDownsize() {
  const careSteps = [
    {
      title: 'Изотонический уход',
      description: 'Орошайте прокол 2 раза в день стерильным физраствором или спреем Brine Healer. Аккуратно просушивайте нетканой салфеткой.',
      icon: <Droplets className="w-6 h-6 text-[#00F2FE]" />,
      badge: 'Ежедневно'
    },
    {
      title: 'Режим сна и ткани',
      description: 'Не спите на стороне свежего прокола (используйте подушку-бублик). Выбирайте натуральные гладкие ткани без выступающих петель.',
      icon: <Clock className="w-6 h-6 text-[#E0A98B]" />,
      badge: 'Первые 14 дней'
    },
    {
      title: 'Что под запретом',
      description: 'Категорически запрещены: спирт, перекись водорода, мази, прокручивание сережки, посещение бань, саун и открытых водоемов.',
      icon: <AlertTriangle className="w-6 h-6 text-[#F38181]" />,
      badge: 'Строгий запрет'
    },
  ];

  return (
    <section id="aftercare" className="py-24 px-6 bg-black/40 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge-luxury mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Забота и Сопровождение
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Гайд по заживлению & Даунсайз
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Мы ведем каждого клиента до полного формирования канала. Правильный уход гарантирует идеальный эстетический результат.
          </p>
        </div>

        {/* 3 карточки ухода */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {careSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Большой интерактивный блок Downsizing */}
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-[#E0A98B]/30 bg-gradient-to-br from-[#E0A98B]/10 via-transparent to-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
                Ключевой этап заживления
              </span>
              <h3 className="text-2xl sm:text-4xl font-heading font-bold mb-4 text-white">
                Зачем нужен Downsize (Даунсайз)?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                При первичном проколе мастер устанавливает удлиненную основу (лабрет) с запасом под естественный отек. 
                Через 3–4 недели отек спадает, и сережка становится длинной. Если вовремя не заменить её на короткую, 
                украшение наклонится под весом или одеждой, что приведет к кривому заживлению и образованию гранулем.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E0A98B] shrink-0" />
                  <span>Бесплатная замена основы в студии для всех клиентов AURA</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E0A98B] shrink-0" />
                  <span>Ультразвуковая чистка украшений и антисептический осмотр</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 text-[#E0A98B]">
                <RefreshCw className="w-5 h-5 animate-spin [animation-duration:8s]" />
                <span className="font-heading font-bold text-sm text-white">График планового обслуживания</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { time: '3–4 недели', title: 'Обязательный Даунсайз', desc: 'Замена длинного лабрета на анатомический размер' },
                  { time: '3–6 месяцев', title: 'Первичная стабилизация', desc: 'Формирование канала, возможность смены накрутки' },
                  { time: '12 месяцев', title: 'Полное созревание', desc: 'Установка колец, кликеров и тяжелых золотых сетапов' }
                ].map((item, i) => (
                  <div key={i} className="border-b border-white/5 pb-3 last:border-none last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[11px] font-mono text-[#E0A98B] font-bold">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
