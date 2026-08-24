'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-8 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold tracking-tighter text-gold-rose">
          AURA <span className="text-white">PIERCING</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="#map" className="hover:text-gold-rose transition-colors">Карта проколов</Link>
          <Link href="#configurator" className="hover:text-gold-rose transition-colors">Конструктор</Link>
          <Link href="#jewelry" className="hover:text-gold-rose transition-colors">Витрина</Link>
          <Link href="#safety" className="hover:text-gold-rose transition-colors">Безопасность</Link>
          <button className="btn-premium bg-white/5 text-white border-[#E0A98B]/30">Записаться онлайн</button>
        </div>
      </div>
    </nav>
  );
}
