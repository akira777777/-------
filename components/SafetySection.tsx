'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Activity, Info, Sparkles, Lock, Building2 } from 'lucide-react';

export default function SafetySection() {
  const protocols = [
    {
      title: 'Медицинская автоклавация',
      subtitle: 'Класс B (134°C, фракционный вакуум)',
      description: 'Все инструменты проходят 4-ступенчатую дезинфекцию и стерилизуются в автоклаве EN 13060. Индивидуальный крафт-пакет вскрывается строго при вас.',
      icon: <ShieldCheck className="w-7 h-7 text-[#E0A98B]" />,
      stats: '100% стерильность'
    },
    {
      title: 'Имплантационный титан',
      subtitle: 'Стандарт ASTM F-136 / ISO 5832-3',
      description: 'Используем биосовместимый титан высокой чистоты Ti-6Al-4V ELI и золото 14K/18K. Без токсичного никеля, окисления и аллергических реакций.',
      icon: <Award className="w-7 h-7 text-[#D4AF37]" />,
      stats: '0% никеля'
    },
    {
      title: 'Лазерная заточка игл',
      subtitle: 'Одноразовые блейды и катетеры',
      description: 'Специальная трехгранная заточка бережно раздвигает волокна кожи, не вырывая ткани. Прокол заживает в 2 раза быстрее, чем после пистолета.',
      icon: <Activity className="w-7 h-7 text-[#00F2FE]" />,
      stats: 'Минимальный отек'
    },
  ];

  return (
    <section id="safety" className="py-24 px-4 sm:px-6 bg-surface/10 border-t border-white/5 relative overflow-hidden">
      {/* Фоновые градиенты */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#E0A98B]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge-luxury mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Медицинский регламент
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Безопасность и Хирургические Стандарты
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Ваше здоровье и спокойствие — абсолютный приоритет. Мы объединили ювелирное искусство с протоколами больничной стерильности.
          </p>
        </div>

        {/* Сетка двух визуальных фото: Лоток + Интерьер студии */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          
          {/* Фото 1: Стерильный лоток */}
          <div className="relative min-h-[300px] md:min-h-[380px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/images/sterile-procedure-tray.webp"
              alt="Стерильный хирургический лоток с крафт-пакетом, титановым украшением ASTM F-136 и одноразовой иглой лазерной заточки"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute left-6 right-6 bottom-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[#00F2FE]" />
                <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#00F2FE] font-mono">
                  Индивидуальный крафт-пакет
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                Вскрытие упаковки исключительно при вас
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Каждое украшение стерилизуется в пакете с термохимическим индикатором, меняющим цвет при 134°C.
              </p>
            </div>
          </div>

          {/* Фото 2: Интерьер процедурного кабинета */}
          <div className="relative min-h-[300px] md:min-h-[380px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/images/studio-luxury-interior.jpg"
              alt="Интерьер процедурного кабинета студии AURA в Праге: анатомическое кресло, медицинский автоклав и витрина золотых украшений"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute left-6 right-6 bottom-6">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-[#E0A98B]" />
                <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#E0A98B] font-mono">
                  AURA Boutique Prague
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                Атмосфера приватности и чистоты
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Кабинет оснащен эргономичным креслом, бестеневым хирургическим светом и автоклавом Melag класса B.
              </p>
            </div>
          </div>

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
              className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-[#E0A98B]/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                <span className="text-gray-500 font-mono">Контроль</span>
                <span className="text-white font-bold font-mono">{item.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Баннер подготовки */}
        <div className="mt-14 p-8 glass-card rounded-[2.5rem] border border-[#E0A98B]/20 bg-gradient-to-r from-[#E0A98B]/10 to-transparent shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E0A98B] text-black flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(224,169,139,0.4)]">
              <Info className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-1.5">
                Памятка перед визитом в студию
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-4xl">
                Рекомендуем плотно поесть за 1–2 часа до процедуры (для поддержания стабильного уровня сахара), воздержаться от алкоголя и кофеина накануне, а также надеть удобную свободную одежду, не сдавливающую зону будущего прокола.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
