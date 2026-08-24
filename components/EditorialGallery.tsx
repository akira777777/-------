'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Gem, Images, Sparkles } from 'lucide-react';

interface EditorialGalleryProps {
  onOpenBooking: () => void;
}

const EDITORIAL_FRAMES = [
  {
    id: 'ear-curation',
    src: '/images/editorial-healed-ear.webp',
    alt: 'Редакционный макрокадр анатомического сета с золотом и опалами',
    eyebrow: '01 · Ear curation',
    title: 'Композиция по анатомии',
    description: 'Ритм, масштаб и баланс каждой точки.',
    className: 'md:col-span-5 md:row-span-2 min-h-[520px] md:min-h-[720px]',
    imageClassName: 'object-cover object-center',
  },
  {
    id: 'jewelry-selection',
    src: '/images/editorial-jewelry-selection.webp',
    alt: 'Подбор миниатюрных украшений из золота, титана и опалов на тёмном подносе',
    eyebrow: '02 · Jewelry edit',
    title: 'Материалы и свет',
    description: 'Золото 14K, опал и имплантационный титан.',
    className: 'md:col-span-7 min-h-[320px] md:min-h-0',
    imageClassName: 'object-cover object-center',
  },
  {
    id: 'consultation',
    src: '/images/editorial-consultation.webp',
    alt: 'Примерка золотого украшения к уху во время спокойной консультации',
    eyebrow: '03 · Consultation',
    title: 'Сначала — примерка',
    description: 'Оцениваем пропорции до того, как принять решение.',
    className: 'md:col-span-7 min-h-[320px] md:min-h-0',
    imageClassName: 'object-cover object-[center_42%]',
  },
];

export default function EditorialGallery({ onOpenBooking }: EditorialGalleryProps) {
  return (
    <section id="editorial" className="relative overflow-hidden border-t border-white/5 bg-black/30 px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute left-1/3 top-0 h-[520px] w-[520px] rounded-full bg-[#E0A98B]/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="badge-luxury mb-4 font-mono">
              <Images className="h-3.5 w-3.5" />
              AURA editorial · visual concepts
            </span>
            <h2 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              Три кадра будущего сета
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              От макрокомпозиции до примерки — собираем не набор украшений, а цельный визуальный ритм.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="btn-premium flex w-full items-center justify-center gap-2 border-[#E0A98B]/35 text-white hover:bg-[#E0A98B] hover:text-black sm:w-fit"
          >
            Обсудить свой сет
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 md:h-[720px] md:grid-cols-12 md:grid-rows-2">
          {EDITORIAL_FRAMES.map((frame, index) => (
            <motion.article
              key={frame.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111116] shadow-2xl ${frame.className}`}
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes={index === 0 ? '(max-width: 768px) 100vw, 42vw' : '(max-width: 768px) 100vw, 58vw'}
                className={`${frame.imageClassName} transition-transform duration-1000 ease-out group-hover:scale-[1.035]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0A98B]">
                  {index === 1 ? <Gem className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                  {frame.eyebrow}
                </span>
                <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">{frame.title}</h3>
                <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-gray-300 sm:text-sm">{frame.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2.5 border-l border-[#E0A98B]/40 pl-4 text-[11px] leading-relaxed text-gray-500 sm:text-xs">
          <span className="font-mono uppercase tracking-wider text-[#E0A98B]">Редакционные визуализации</span>
          <span>·</span>
          <span>Финальный сет всегда адаптируется под вашу анатомию и бюджет.</span>
        </div>
      </div>
    </section>
  );
}
