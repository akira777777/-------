'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: 'Больно ли делать пирсинг и используется ли анестезия?',
    answer: 'Большинство проколов длятся доли секунды и ощущаются как кратковременный укол. Мы используем одноразовые иглы с трехгранной лазерной заточкой, которые раздвигают ткани, а не рвут их. Местная анестезия обычно не требуется, так как сам укол анестетика болезненнее, чем быстрый прокол иглой.'
  },
  {
    question: 'Почему в студии категорически запрещены пистолеты для пирсинга?',
    answer: 'Пистолеты сделаны из пластика и не подлежат стерилизации в медицинском автоклаве (134°C), что создает риск перекрестного заражения. Кроме того, пистолет "пробивает" ухо тупым концом сережки, нанося тупую травму хрящу и вызывая микротрещины.'
  },
  {
    question: 'В чем разница между медицинской сталью и имплантационным титаном ASTM F-136?',
    answer: 'Так называемая "хирургическая/медицинская сталь" содержит до 12-14% никеля — главного аллергена, вызывающего зуд, воспаление и отторжение. Имплантационный титан ASTM F-136 полностью биосовместим с человеческим организмом, не окисляется и гарантирует спокойное заживление.'
  },
  {
    question: 'Что такое даунсайз (Downsize) и почему он обязателен?',
    answer: 'При первичном проколе мастер устанавливает удлиненную основу (лабрет или штангу), чтобы компенсировать неизбежный естественный отек первых 2-3 недель. После спада отека украшение становится слишком длинным и начинает цепляться за волосы и одежду, деформируя канал. Даунсайз — это замена длинной основы на анатомически точную короткую.'
  },
  {
    question: 'Можно ли прийти на процедуру со своим украшением?',
    answer: 'Мы заботимся о вашем здоровье, поэтому первичные проколы выполняются только с нашими украшениями, имеющими заводские сертификаты ASTM F-136 и прошедшими полный цикл автоклавирования непосредственно перед процедурой.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-surface/20 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            База знаний
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Всё, что нужно знать перед первым визитом в студию, чтобы процедура прошла легко и безопасно.
          </p>
        </div>

        {/* Список вопросов */}
        <div className="space-y-4">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-[#E0A98B]/30"
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 text-white font-medium"
                >
                  <span className="text-base sm:text-lg font-heading font-semibold text-gray-100">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#E0A98B] text-black' : 'text-gray-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-gray-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Плашка дополнительного вопроса в Telegram */}
        <div className="mt-12 p-6 glass rounded-2xl border border-[#E0A98B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-[#E0A98B]/5">
          <div>
            <h4 className="text-base font-heading font-bold text-white">Не нашли ответ на свой вопрос?</h4>
            <p className="text-xs text-gray-400 mt-1">Задайте его напрямую дежурному пирсеру студии в Telegram</p>
          </div>
          <a
            href="https://t.me/yacure0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium bg-[#E0A98B] text-black font-bold text-xs py-2.5 px-6 flex items-center gap-2 shrink-0 hover:bg-white transition-all shadow-[0_0_20px_rgba(224,169,139,0.2)]"
          >
            <MessageCircle className="w-4 h-4" />
            Задать вопрос в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
