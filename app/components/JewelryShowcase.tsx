'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gem, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { formatCzk } from '../constants/currency';

interface JewelryItem {
  id: string;
  name: string;
  category: 'clusters' | 'gold' | 'clickers' | 'opals';
  material: string;
  threading: 'Threadless (Push-Pin)' | 'Internally Threaded';
  price: number;
  badge?: string;
  gem: string;
  colorHex: string;
}

const JEWELRY_CATALOG: JewelryItem[] = [
  {
    id: 'j1',
    name: 'Marquise Diamond Cluster',
    category: 'gold',
    material: 'Золото 14K Yellow Gold',
    threading: 'Threadless (Push-Pin)',
    price: 5900,
    badge: 'Bestseller',
    gem: 'Бриллианты огранки Маркиз',
    colorHex: '#D4AF37'
  },
  {
    id: 'j2',
    name: 'AURA Opal Arc',
    category: 'opals',
    material: 'Имплантационный титан ASTM F-136',
    threading: 'Threadless (Push-Pin)',
    price: 1600,
    badge: 'New',
    gem: 'Синтетический белый опал кабошон',
    colorHex: '#E2E8F0'
  },
  {
    id: 'j3',
    name: 'Eternity Clicker Ring',
    category: 'clickers',
    material: 'Золото 14K Rose Gold',
    threading: 'Internally Threaded',
    price: 7200,
    badge: 'Luxury',
    gem: 'Кристаллы Swarovski по кругу',
    colorHex: '#E0A98B'
  },
  {
    id: 'j4',
    name: 'Trinity Zirconia Top',
    category: 'clusters',
    material: 'Титан ASTM F-136 (Анодирован)',
    threading: 'Threadless (Push-Pin)',
    price: 1400,
    gem: 'Тройной фианит в крапанах',
    colorHex: '#C0C0C0'
  },
  {
    id: 'j5',
    name: 'Emerald Cascade Cluster',
    category: 'gold',
    material: 'Золото 18K Solid Gold',
    threading: 'Threadless (Push-Pin)',
    price: 9200,
    badge: 'Exclusive',
    gem: 'Гидротермальный изумруд',
    colorHex: '#50C878'
  },
  {
    id: 'j6',
    name: 'Celestial Moon & Stars',
    category: 'opals',
    material: 'Титан F-136 (Deep Purple)',
    threading: 'Threadless (Push-Pin)',
    price: 1850,
    gem: 'Голубой опал Aurora Borealis',
    colorHex: '#8A2BE2'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Все украшения' },
  { id: 'gold', name: 'Золото 14K/18K' },
  { id: 'clusters', name: 'Кластеры' },
  { id: 'clickers', name: 'Кликеры & Кольца' },
  { id: 'opals', name: 'Опалы' },
];

export default function JewelryShowcase({ onSelectJewelry }: { onSelectJewelry: (item: JewelryItem) => void }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' 
    ? JEWELRY_CATALOG 
    : JEWELRY_CATALOG.filter(j => j.category === activeCategory);

  return (
    <section id="jewelry" className="py-24 px-6 bg-surface/30 border-t border-white/5 relative overflow-hidden">
      {/* Фоновый свет */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3">
            <Gem className="w-3.5 h-3.5" />
            Ювелирный лукбук
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Коллекция дизайнерских украшений
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Каждое изделие изготовлено из гипоаллергенных металлов высшей пробы: имплантационный титан ASTM F-136, золото 14k/18k и натуральные камни с ручной закрепкой.
          </p>
        </div>

        <div className="relative min-h-[220px] md:min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 mb-10">
          <Image
            src="/images/jewelry-editorial.webp"
            alt="Титановые и золотые украшения для пирсинга на металлическом подносе"
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
          <div className="relative z-10 max-w-md p-7 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#E0A98B] font-bold mb-3">Материалы, с которых начинается комфорт</p>
            <p className="text-lg md:text-2xl font-heading font-bold leading-snug">Только титан ASTM F-136 и проверенное золото для первичного заживления.</p>
          </div>
        </div>

        {/* Категории */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)] font-bold'
                  : 'glass text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Сетка товаров */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-[2rem] p-6 border border-white/5 hover:border-[#E0A98B]/40 transition-all duration-300 group flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(224,169,139,0.1)] relative"
              >
                {/* Бейдж */}
                {item.badge && (
                  <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#E0A98B]/20 text-[#E0A98B] border border-[#E0A98B]/30">
                    {item.badge}
                  </span>
                )}

                {/* Графический макет украшения */}
                <div className="relative w-full h-48 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-6 overflow-hidden group-hover:border-[#E0A98B]/20 transition-colors">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-2xl relative"
                    style={{ 
                      background: `radial-gradient(circle, ${item.colorHex}33 0%, rgba(0,0,0,0) 70%)` 
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center shadow-lg"
                      style={{ borderColor: item.colorHex }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: item.colorHex }} />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                    {item.threading}
                  </span>
                </div>

                {/* Инфо о товаре */}
                <div>
                  <h4 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-gold-rose transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 mb-1">{item.material}</p>
                  <p className="text-xs text-[#D4AF37] mb-6 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    {item.gem}
                  </p>
                </div>

                {/* Цена и CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block">Стоимость</span>
                    <span className="text-xl font-bold text-white">{formatCzk(item.price)}</span>
                  </div>
                  <button
                    onClick={() => onSelectJewelry(item)}
                    className="p-3 rounded-full bg-white/5 group-hover:bg-[#E0A98B] group-hover:text-black text-white transition-all duration-300"
                    aria-label="Примерить украшение"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
