'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/constants/testimonials';
import { Star, CheckCircle, Heart } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 bg-surface/15 border-t border-white/5 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[#E0A98B]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5" />
            Доверие & Результаты
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Истории клиентов & Зажившие проекты
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Реальный опыт гостей студии: от легкого первого прокола мочки до сложных архитектурных композиций из золота 18K.
          </p>

          {/* Статистика доверия */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 mt-8 pt-6 border-t border-white/5 max-w-3xl mx-auto">
            <div className="text-center">
              <span className="text-3xl font-heading font-bold text-white block">4.98 / 5.0</span>
              <div className="flex justify-center gap-0.5 text-[#D4AF37] my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] uppercase font-mono text-gray-400">Средняя оценка</span>
            </div>

            <div className="text-center border-l border-white/10 pl-6 sm:pl-12">
              <span className="text-3xl font-heading font-bold text-gold-rose block">4 500+</span>
              <span className="text-[10px] uppercase font-mono text-gray-400 mt-1 block">Заживших проколов</span>
            </div>

            <div className="text-center border-l border-white/10 pl-6 sm:pl-12">
              <span className="text-3xl font-heading font-bold text-white block">0%</span>
              <span className="text-[10px] uppercase font-mono text-gray-400 mt-1 block">Осложнений (ASTM F-136)</span>
            </div>
          </div>
        </div>

        {/* Сетка отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-between hover:border-[#E0A98B]/30 transition-all shadow-xl"
            >
              <div>
                {/* Шапка отзыва */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-bold text-white">{t.name}</h4>
                      {t.verified && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30 font-mono">
                          <CheckCircle className="w-3 h-3" />
                          Верифицирован
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{t.location} · {t.date}</p>
                  </div>

                  <div className="flex gap-0.5 text-[#D4AF37]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Сетап */}
                <div className="mb-4 p-3 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <p className="text-gray-300 font-semibold mb-0.5">
                    📍 {t.piercingType}
                  </p>
                  <p className="text-[#E0A98B] font-mono text-[11px]">
                    ✨ {t.jewelry}
                  </p>
                </div>

                {/* Текст */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  «{t.comment}»
                </p>
              </div>

              {/* Статус заживления */}
              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono">Результат:</span>
                <span className="text-[#00F2FE] font-bold font-mono">✓ {t.healedMonths}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
