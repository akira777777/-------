'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Sparkles, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import type { PiercingType } from '../constants/piercings';
import { formatCzk } from '../constants/currency';

export interface BookingData {
  piercing?: PiercingType | null;
  material?: string;
  stone?: string;
  totalPrice?: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BookingData | null;
}

const MASTER = { name: 'Anastasya', role: 'Piercer & Jewelry Curator' };

const TIME_SLOTS = [
  '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00'
];

export default function BookingModal({ isOpen, onClose, initialData }: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[2]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const piercingName = initialData?.piercing?.name || 'Консультация & Прокол';
  const finalPrice = initialData?.totalPrice || initialData?.piercing?.basePrice || 1200;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 600);
  };

  const getTelegramMessageUrl = () => {
    const text = encodeURIComponent(
      `👋 Здравствуйте, AURA Piercing!\n` +
      `Хочу записаться на процедуру:\n` +
      `• Услуга: ${piercingName}\n` +
      `${initialData?.material ? `• Металл: ${initialData.material}\n` : ''}` +
      `${initialData?.stone ? `• Камень: ${initialData.stone}\n` : ''}` +
      `• Мастер: ${MASTER.name}\n` +
      `• Дата и время: ${selectedDate || 'Ближайшая'} в ${selectedTime}\n` +
      `• Клиент: ${clientName || 'Без имени'} (${clientPhone || 'Не указан'})\n` +
      `• Ориентировочная стоимость: ${formatCzk(finalPrice)}`
    );
    return `https://t.me/share/url?url=&text=${text}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Затемнение фона */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Модальное окно */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl glass rounded-[2.5rem] p-6 sm:p-8 border border-white/10 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' ? (
            <div>
              {/* Заголовок */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0A98B]/10 text-[#E0A98B] text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Онлайн-запись
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Забронировать визит
                </h3>
              </div>

              {/* Плашка выбранного сетапа */}
              {initialData?.piercing && (
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400">Выбранная процедура</span>
                    <p className="text-sm font-bold text-white">{piercingName}</p>
                    {initialData.material && (
                      <p className="text-xs text-[#E0A98B]">
                        {initialData.material} • {initialData.stone || 'Без камня'}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-gray-400">Расчет</span>
                    <p className="text-lg font-bold text-gold-rose">{formatCzk(finalPrice)}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Имя и Телефон */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Ваше имя
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Анастасия"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#E0A98B] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Телефон / Telegram
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+420 123 456 789"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#E0A98B] text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Единственный мастер */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Мастер
                  </label>
                  <div className="p-3.5 rounded-xl border border-[#E0A98B]/40 bg-[#E0A98B]/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{MASTER.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{MASTER.role}</p>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E0A98B]">Выбрана</span>
                  </div>
                </div>

                {/* Выбор даты и времени */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Дата визита
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#E0A98B] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Слот времени
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#E0A98B] text-sm"
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
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Пожелания или фото анатомии
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: хочу совместить хеликс с кончем, высокий болевой порог..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#E0A98B] text-sm resize-none"
                  />
                </div>

                {/* Кнопки отправки */}
                <div className="pt-3 space-y-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-premium bg-[#E0A98B] text-black font-bold py-3 text-sm flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_25px_rgba(224,169,139,0.3)] transition-all"
                  >
                    {isSubmitting ? (
                      <span>Отправка заявки...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Подтвердить запись
                      </>
                    )}
                  </button>

                  <a
                    href={getTelegramMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-2.5 rounded-full border border-white/10 hover:border-[#00F2FE]/50 bg-white/5 hover:bg-[#00F2FE]/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-[#00F2FE]" />
                    Быстрая запись в Telegram с этим сетапом
                  </a>
                </div>
              </form>
            </div>
          ) : (
            /* Экран успешной записи */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E0A98B]/20 text-[#E0A98B] flex items-center justify-center mx-auto mb-2 border border-[#E0A98B]/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                Заявка принята!
              </h3>
              <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                Спасибо, <span className="text-white font-bold">{clientName}</span>! Администратор студии AURA свяжется с вами в течение 10 минут для подтверждения времени.
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 max-w-xs mx-auto text-left space-y-1">
                <p>• Процедура: <span className="text-white">{piercingName}</span></p>
                <p>• Мастер: <span className="text-white">{MASTER.name}</span></p>
                <p>• Время: <span className="text-white">{selectedTime}</span></p>
              </div>
              <button
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="btn-premium bg-[#E0A98B] text-black font-bold py-2.5 px-8 text-xs mt-4"
              >
                Отлично
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
