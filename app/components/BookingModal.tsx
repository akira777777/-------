'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Sparkles, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import type { PiercingType } from '../constants/piercings';
import { useCurrency } from '../constants/currency';

export interface BookingData {
  piercing?: PiercingType | null;
  material?: string;
  stone?: string;
  silhouette?: string;
  anodization?: string;
  totalPrice?: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BookingData | null;
}

const MASTER = { name: 'Anastasya', role: 'Piercer & Jewelry Curator (Prague)' };

const TIME_SLOTS = [
  '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'
];

export default function BookingModal({ isOpen, onClose, initialData }: BookingModalProps) {
  const { formatPrice, currency } = useCurrency();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[2]);
  const [comment, setComment] = useState('');
  const [minDate] = useState(() =>
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague' }).format(new Date())
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const dateId = useId();
  const timeId = useId();
  const commentId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const piercingName = initialData?.piercing?.name || 'Консультация & Анатомический подбор';
  const finalPriceInCzk = initialData?.totalPrice || initialData?.piercing?.basePrice || 1200;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(getTelegramMessageUrl(), '_blank', 'noopener,noreferrer');
    setStep('success');
  };

  const getTelegramMessageUrl = () => {
    const formattedPrice = formatPrice(finalPriceInCzk);
    const text = encodeURIComponent(
      `👋 Здравствуйте, AURA Piercing Studio!\n` +
      `Хочу забронировать визит к мастеру Anastasya:\n\n` +
      `📍 Услуга / Сет: ${piercingName}\n` +
      `${initialData?.material ? `💎 Металл: ${initialData.material}\n` : ''}` +
      `${initialData?.stone ? `✨ Камень: ${initialData.stone}\n` : ''}` +
      `${initialData?.silhouette ? `📐 Форма топа: ${initialData.silhouette}\n` : ''}` +
      `📅 Дата и время: ${selectedDate || 'Ближайшая свободная'} в ${selectedTime}\n` +
      `👤 Клиент: ${clientName || 'Не указано'} (${clientPhone || 'Не указан'})\n` +
      `${comment.trim() ? `💬 Пожелания: ${comment.trim()}\n` : ''}` +
      `💰 Ориентир: ${formattedPrice} (${currency})`
    );
    return `https://t.me/share/url?url=&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Затемнение фона */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/85 backdrop-blur-lg"
      />

      {/* Модальное окно */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-xl glass rounded-[2.5rem] p-6 sm:p-8 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)] z-10 my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Кнопка закрытия */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно записи"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Заголовок */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0A98B]/15 text-[#E0A98B] text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Онлайн-запись в студию
              </span>
              <h3 id={titleId} className="text-2xl sm:text-3xl font-heading font-bold text-white">
                Забронировать визит
              </h3>
            </div>

            {/* Плашка выбранного сетапа */}
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-mono">Выбранный сетап</span>
                <p className="text-sm font-bold text-white">{piercingName}</p>
                {initialData?.material && (
                  <p className="text-xs text-[#E0A98B] font-mono mt-0.5">
                    {initialData.material} • {initialData.stone || 'Индивидуальный подбор'}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase text-gray-400 font-mono">Расчет ({currency})</span>
                <p className="text-lg font-bold text-gold-rose font-mono">{formatPrice(finalPriceInCzk)}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Имя и Телефон */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={nameId} className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium font-mono">
                    Ваше имя
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      id={nameId}
                      name="name"
                      autoComplete="name"
                      maxLength={80}
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Анастасия"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-[#E0A98B] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={phoneId} className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium font-mono">
                    Телефон / Telegram
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      id={phoneId}
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={40}
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+420 123 456 789"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-[#E0A98B] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Мастер */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium font-mono">
                  Ведущий мастер
                </label>
                <div className="p-3.5 rounded-xl border border-[#E0A98B]/40 bg-[#E0A98B]/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{MASTER.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{MASTER.role}</p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E0A98B] font-mono">
                    Персонально
                  </span>
                </div>
              </div>

              {/* Выбор даты и времени */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={dateId} className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium font-mono">
                    Желаемая дата
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="date"
                      id={dateId}
                      name="date"
                      min={minDate}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#E0A98B] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={timeId} className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium font-mono">
                    Слот времени (Прага)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      id={timeId}
                      name="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#E0A98B] text-sm"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t} className="bg-[#14141A] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Комментарий */}
              <div>
                <label htmlFor={commentId} className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium font-mono">
                  Пожелания или анатомические нюансы
                </label>
                <textarea
                  rows={2}
                  id={commentId}
                  name="comment"
                  maxLength={300}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: хочу совместить хеликс с кончем, тонкий хрящ..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-[#E0A98B] text-sm resize-none"
                />
              </div>

              {/* Кнопки отправки */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="submit"
                  className="w-full btn-premium bg-[#E0A98B] text-black font-bold py-3.5 text-sm flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_25px_rgba(224,169,139,0.35)] transition-all"
                >
                  <Send className="w-4 h-4" />
                  Подтвердить запись в Telegram
                </button>

                <a
                  href={getTelegramMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-2.5 rounded-full border border-white/10 hover:border-[#00F2FE]/50 bg-white/5 hover:bg-[#00F2FE]/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#00F2FE]" />
                  Быстрый чат с Anastasya в Telegram
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Экран успешной заявки */
          <div className="text-center py-8 space-y-4" aria-live="polite">
            <div className="w-16 h-16 rounded-full bg-[#E0A98B]/20 text-[#E0A98B] flex items-center justify-center mx-auto mb-2 border border-[#E0A98B]/40 shadow-xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Заявка готова к отправке
            </h3>
            <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
              Вкладка Telegram открыта. Отправьте подготовленное сообщение, и Анастасия подтвердит точный адрес и бронь слота.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 max-w-xs mx-auto text-left space-y-1 font-mono">
              <p>• Процедура: <span className="text-white font-bold">{piercingName}</span></p>
              <p>• Мастер: <span className="text-white font-bold">{MASTER.name}</span></p>
              <p>• Время: <span className="text-white font-bold">{selectedTime}</span></p>
              <p>• Расчет: <span className="text-[#E0A98B] font-bold">{formatPrice(finalPriceInCzk)}</span></p>
            </div>
            <a
              href={getTelegramMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium bg-[#E0A98B] text-black font-bold py-3 px-8 text-xs inline-flex items-center gap-2 shadow-[0_0_20px_rgba(224,169,139,0.3)]"
            >
              <MessageSquare className="w-4 h-4" />
              Открыть Telegram ещё раз
            </a>
            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="block mx-auto text-xs text-gray-400 hover:text-white transition-colors pt-2"
            >
              Вернуться на сайт
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
