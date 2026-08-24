'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, ArrowUpRight, Search } from 'lucide-react';
import Image from 'next/image';
import { useCurrency } from '../constants/currency';

interface JewelryItem {
  id: string;
  name: string;
  category: 'clusters' | 'gold' | 'clickers' | 'opals';
  material: string;
  threading: 'Threadless (Push-Pin)' | 'Internally Threaded';
  price: number;
  badge?: string;
  gem: string;
  image: string;
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
    image: '/images/marquise-diamond-cluster.jpg',
  },
  {
    id: 'j2',
    name: 'AURA Opal Arc Top',
    category: 'opals',
    material: 'Имплантационный титан ASTM F-136',
    threading: 'Threadless (Push-Pin)',
    price: 1600,
    badge: 'New',
    gem: 'Синтетический белый опал кабошон',
    image: '/images/opal-arc-jewelry.jpg',
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
    image: '/images/eternity-clicker-ring.jpg',
  },
  {
    id: 'j4',
    name: 'Trinity Zirconia Top',
    category: 'clusters',
    material: 'Титан ASTM F-136 (Анодирован)',
    threading: 'Threadless (Push-Pin)',
    price: 1400,
    gem: 'Тройной фианит в крапанах',
    image: '/images/trinity-titanium-top.jpg',
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
    image: '/images/emerald-cascade-cluster.jpg',
  },
  {
    id: 'j6',
    name: 'Celestial Moon & Stars',
    category: 'opals',
    material: 'Титан F-136 (Deep Purple)',
    threading: 'Threadless (Push-Pin)',
    price: 1850,
    gem: 'Голубой опал Aurora Borealis',
    image: '/images/celestial-moon-top.jpg',
  },
];

const CATEGORIES = [
  { id: 'all', name: 'Все украшения' },
  { id: 'gold', name: 'Золото 14K/18K' },
  { id: 'clusters', name: 'Кластеры & Топы' },
  { id: 'clickers', name: 'Кликеры & Кольца' },
  { id: 'opals', name: 'Опалы Aurora' },
];

export default function JewelryShowcase({ onSelectJewelry }: { onSelectJewelry: (item: JewelryItem) => void }) {
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = JEWELRY_CATALOG.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="jewelry" className="py-24 px-4 sm:px-6 bg-surface/30 border-t border-white/5 relative overflow-hidden">
      {/* Фоновый свет */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-[#E0A98B]/20 text-[#E0A98B] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
            <Gem className="w-3.5 h-3.5" />
            Ювелирный лукбук
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Коллекция дизайнерских украшений
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Каждое изделие изготовлено из гипоаллергенных металлов высшей пробы: имплантационный титан ASTM F-136, золото 14k/18k и натуральные камни с ручной крапановой закрепкой.
          </p>
        </div>

        {/* Editorial баннер */}
        <div className="relative min-h-[220px] md:min-h-[280px] overflow-hidden rounded-[2.5rem] border border-white/10 mb-10 shadow-2xl">
          <Image
            src="/images/jewelry-editorial.webp"
            alt="Титановые и золотые украшения для пирсинга на металлическом подносе"
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 max-w-lg p-6 sm:p-10 flex flex-col justify-center h-full">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E0A98B] font-bold mb-2 font-mono">
              Ювелирный стандарт ASTM F-136
            </span>
            <p className="text-xl sm:text-3xl font-heading font-bold leading-snug text-white">
              Безупречная зеркальная полировка без микропор и токсичного никеля.
            </p>
          </div>
        </div>

        {/* Панель фильтрации и поиска */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 max-w-6xl mx-auto">
          {/* Категории */}
          <div className="flex justify-center flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? JEWELRY_CATALOG.length 
                : JEWELRY_CATALOG.filter(j => j.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-[#E0A98B] text-black shadow-[0_0_20px_rgba(224,169,139,0.3)] font-bold'
                      : 'glass text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-gray-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Строка поиска */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск камня или металла..."
              className="w-full pl-10 pr-9 py-2 rounded-full bg-black/50 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E0A98B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Очистить поиск"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs w-4 h-4 rounded-full flex items-center justify-center bg-white/10"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Сетка товаров с реальными макро-фотографиями */}
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
                className="glass rounded-[2.5rem] p-6 border border-white/10 hover:border-[#E0A98B]/40 transition-all duration-300 group flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(224,169,139,0.15)] relative overflow-hidden"
              >
                {/* Бейдж */}
                {item.badge && (
                  <span className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#E0A98B] border border-[#E0A98B]/40 font-mono shadow-lg">
                    {item.badge}
                  </span>
                )}

                {/* Фото украшения */}
                <div className="relative w-full h-56 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center mb-6 overflow-hidden group-hover:border-[#E0A98B]/30 transition-all shadow-inner">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute bottom-3 left-3 text-[10px] text-gray-300 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-widest font-mono">
                    {item.threading}
                  </span>
                </div>

                {/* Инфо о товаре */}
                <div>
                  <h4 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-gold-rose transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 mb-1">{item.material}</p>
                  <p className="text-xs text-[#D4AF37] mb-6 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    {item.gem}
                  </p>
                </div>

                {/* Цена и CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block font-mono">Стоимость</span>
                    <span className="text-xl font-bold text-white font-mono">{formatPrice(item.price)}</span>
                  </div>
                  <button
                    onClick={() => onSelectJewelry(item)}
                    className="p-3 rounded-full bg-white/5 group-hover:bg-[#E0A98B] group-hover:text-black text-white transition-all duration-300 shadow-md flex items-center justify-center"
                    aria-label="Примерить и забронировать"
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
