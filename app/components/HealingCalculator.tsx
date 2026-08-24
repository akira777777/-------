'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PIERCINGS, type PiercingType } from '../constants/piercings';
import { Clock, RefreshCw, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, CalendarPlus, Activity } from 'lucide-react';

interface HealingCalculatorProps {
  onBookDownsize?: () => void;
}

export default function HealingCalculator({ onBookDownsize }: HealingCalculatorProps) {
  const [selectedPiercing, setSelectedPiercing] = useState<PiercingType>(PIERCINGS[2]); // Default Helix
  const [procedureDate, setProcedureDate] = useState<string>(() => {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague' }).format(new Date());
  });

  // Безопасный расчет дат
  const parsedDate = procedureDate ? new Date(procedureDate) : new Date();
  const baseDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  const now = new Date();
  
  // Дата даунсайза (+4 недели или 0 если не требуется)
  const downsizeDays = (selectedPiercing.downsizeWeeks || 4) * 7;
  const downsizeDate = new Date(baseDate.getTime() + downsizeDays * 24 * 60 * 60 * 1000);
  
  // Дата смены накрутки (+3 месяца)
  const topSwapDate = new Date(baseDate.getTime() + 90 * 24 * 60 * 60 * 1000);
  
  // Дата полного заживления (+6-9 месяцев)
  const fullHealingDays = 210;
  const fullHealedDate = new Date(baseDate.getTime() + fullHealingDays * 24 * 60 * 60 * 1000);

  // Расчет прогресса если дата в прошлом
  const daysPassed = Math.max(0, Math.floor((now.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)));
  const progressPercent = Math.min(100, Math.round((daysPassed / fullHealingDays) * 100));
  const daysUntilDownsize = Math.ceil((downsizeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const formatDate = (d: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
  };

  const setRelativeDays = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() - offsetDays);
    setProcedureDate(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague' }).format(d));
  };

  // Google Calendar URL для Даунсайза
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`AURA Studio: Плановый даунсайз (${selectedPiercing.name})`);
    const details = encodeURIComponent(
      `Бесплатный плановый даунсайз и осмотр прокола ${selectedPiercing.name} в AURA Piercing Studio Praha.\nМастер: Anastasya\nСтудия: Прага.`
    );
    const dateStr = downsizeDate.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 8);
    const dates = `${dateStr}T110000Z/${dateStr}T120000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}&location=Prague`;
  };

  return (
    <section id="healing" className="py-24 px-4 sm:px-6 bg-black/50 border-t border-white/5 relative overflow-hidden">
      {/* Мягкий фон */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#00F2FE]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5" />
            Индивидуальный трекинг
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Калькулятор заживления &amp; График даунсайза
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Выберите вид прокола и предполагаемую дату, чтобы узнать персональный таймлайн восстановления и дату обязательной замены лабрета.
          </p>
        </div>

        {/* Панель управления */}
        <div className="glass-card p-6 sm:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl mb-10 max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-bold font-mono">
                1. Выберите прокол:
              </label>
              <select
                value={selectedPiercing.id}
                onChange={(e) => {
                  const found = PIERCINGS.find((p) => p.id === e.target.value);
                  if (found) setSelectedPiercing(found);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 text-white font-medium focus:outline-none focus:border-[#E0A98B] text-sm"
              >
                {PIERCINGS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#14141A] text-white">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-bold font-mono">
                2. Дата процедуры:
              </label>
              <input
                type="date"
                value={procedureDate}
                onChange={(e) => setProcedureDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 text-white font-medium focus:outline-none focus:border-[#E0A98B] text-sm mb-2"
              />
              {/* Быстрые пресеты дат */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setRelativeDays(0)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/5 transition-all"
                >
                  Сегодня
                </button>
                <button
                  onClick={() => setRelativeDays(7)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/5 transition-all"
                >
                  1 нед. назад
                </button>
                <button
                  onClick={() => setRelativeDays(14)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/5 transition-all"
                >
                  2 нед. назад
                </button>
                <button
                  onClick={() => setRelativeDays(28)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/5 transition-all"
                >
                  4 нед. (Даунсайз)
                </button>
              </div>
            </div>
          </div>

          {/* Индикатор текущего прогресса если дата в прошлом */}
          {daysPassed > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="flex items-center gap-1.5 text-gray-300 font-mono">
                  <Activity className="w-3.5 h-3.5 text-[#00F2FE]" />
                  Прогресс регенерации: <strong>{daysPassed} дн. с момента прокола</strong>
                </span>
                <span className="text-gold-rose font-bold font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#E0A98B] via-[#D4AF37] to-[#00F2FE]"
                />
              </div>
              {selectedPiercing.downsizeRecommended && (
                <p className="text-[11px] text-gray-400 mt-2 font-mono">
                  {daysUntilDownsize > 0 
                    ? `⏳ До планового даунсайза осталось ~${daysUntilDownsize} дн.`
                    : '⚡ Время для даунсайза наступило! Запишитесь на бесплатную замену.'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Таймлайн карточек */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          
          {/* Этап 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-2">
                Фаза 1 · Дни 1–14
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#E0A98B]/15 text-[#E0A98B] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Острая регенерация</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Естественный отек и спад воспаления. Обработка физраствором 2 раза в день. Не спать на стороне прокола!
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-gray-400 font-mono">
              Период: <strong>Первые 2 недели</strong>
            </div>
          </motion.div>

          {/* Этап 2 - Даунсайз */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-3xl border border-[#00F2FE]/40 bg-[#00F2FE]/5 flex flex-col justify-between shadow-[0_0_25px_rgba(0,242,254,0.1)]"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#00F2FE] font-bold block mb-2">
                Фаза 2 · Ключевой шаг
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Плановый Даунсайз</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedPiercing.downsizeRecommended
                  ? 'Отек спал! Замена длинного лабрета на короткий размер для предотвращения деформации канала.'
                  : 'Для данного прокола даунсайз не требуется при отсутствии жалоб.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#00F2FE]/20 text-[11px] text-[#00F2FE] font-mono font-bold">
              Дата визита: {selectedPiercing.downsizeRecommended ? formatDate(downsizeDate) : 'По ощущениям'}
            </div>
          </motion.div>

          {/* Этап 3 - Смена накруток */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-2">
                Фаза 3 · Месяц 3–4
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Смена декораций</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Стенки канала окрепли. Можно безболезненно менять декоративные верхушки, топы и кристаллы.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-gray-400 font-mono">
              Ориентир: <strong>{formatDate(topSwapDate)}</strong>
            </div>
          </motion.div>

          {/* Этап 4 - Полное созревание */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-2">
                Фаза 4 · Финал
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#E0A98B]/20 text-[#E0A98B] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Полное созревание</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Канал полностью сформирован. Разрешены тяжелые золотые кликеры, кольца, цепочки и плавание.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-gold-rose font-mono font-bold">
              Полный финиш: <strong>{formatDate(fullHealedDate)}</strong>
            </div>
          </motion.div>

        </div>

        {/* Информационный баннер */}
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-3xl border border-[#E0A98B]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-[#E0A98B] shrink-0" />
            <p className="text-xs sm:text-sm text-gray-300">
              Помните: даунсайз в студии AURA проводится <strong className="text-white">бесплатно</strong> в рамках пожизненного сопровождения каждого прокола.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {selectedPiercing.downsizeRecommended && (
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium border-white/20 text-gray-200 hover:border-[#00F2FE] hover:text-[#00F2FE] text-xs py-2 px-4 flex items-center gap-1.5"
                title="Добавить дату даунсайза в Google Календарь"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                В календарь
              </a>
            )}
            {onBookDownsize && (
              <button
                onClick={onBookDownsize}
                className="btn-premium bg-[#E0A98B] text-black font-bold text-xs py-2 px-5 hover:bg-white"
              >
                Записаться на осмотр
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
