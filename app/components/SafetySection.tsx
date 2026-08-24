'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Activity, Info, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SafetySection() {
  const protocols = [
    {
      title: 'Медицинская автоклавация',
      subtitle: 'Класс B (134°C, фракционный вакуум)',
      description: 'Все многоразовые инструменты проходят 4-ступенчатую обработку и вскрываются из индивидуальных крафт-пакетов строго в вашем присутствии.',
      icon: <ShieldCheck className="w-8 h-8 text-[#E0A98B]" />,
      stats: '100% стерильность'
    },
    {
      title: 'Имплантационный титан',
      subtitle: 'Стандарт ASTM F-136 / ISO 5832-3',
      description: 'Мы не используем опасную хирургическую сталь. Только биосовместимый титан высокой очистки без примесей аллергенного никеля.',
      icon: <Award className="w-8 h-8 text-[#D4AF37]" />,
      stats: '0% никеля'
    },
    {
      title: 'Лазерная заточка игл',
      subtitle: 'Одноразовые катетеры и лезвия',
      description: 'Трехгранная микро-заточка раздвигает волокна кожи без разрыва тканей. Никаких пистолетов — минимальный отек и быстрое заживление.',
      icon: <Activity className="w-8 h-8 text-[#00F2FE]" />,
      stats: 'Без травматизма'
    },
  ];

  return (
    <section id="safety" className="py-24 px-6 bg-surface/10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge-luxury mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Медицинский регламент
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Безопасность и Стандарты
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Ваше здоровье и спокойствие — абсолютный приоритет. Мы объединили ювелирное искусство с протоколами хирургической стерильности.
          </p>
        </div>

        {/* 3 карточки стандартов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {protocols.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-[#E0A98B]/40 transition-all duration-300"
            >
              <div>
                <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E0A98B] font-bold block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-heading font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono">Стандарт безопасности</span>
                <span className="text-white font-bold font-mono">{item.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Баннер подготовки */}
        <div className="mt-14 p-8 glass-card rounded-[2.5rem] border border-[#E0A98B]/20 bg-gradient-to-r from-[#E0A98B]/10 to-transparent">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E0A98B] text-black flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(224,169,139,0.4)]">
              <Info className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-1.5">
                Памятка перед визитом в студию
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-4xl">
                Рекомендуем плотно поесть за 1–2 часа до процедуры (для стабильного уровня сахара), воздержаться от алкоголя и кофеина накануне, а также надеть удобную одежду, не сдавливающую зону будущего прокола.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
