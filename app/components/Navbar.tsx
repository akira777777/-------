'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3.5 flex justify-between items-center border border-white/10 backdrop-blur-xl shadow-2xl">
        <Link href="/" className="text-xl md:text-2xl font-heading font-bold tracking-tighter text-gold-rose flex items-center gap-2">
          <span>AURA</span> <span className="text-white font-normal">PIERCING</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-7 items-center text-sm font-medium">
          <button onClick={() => scrollTo('map')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Карта проколов
          </button>
          <button onClick={() => scrollTo('jewelry')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Витрина украшений
          </button>
          <button onClick={() => scrollTo('masters')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Anastasya & Портфолио
          </button>
          <button onClick={() => scrollTo('safety')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Безопасность
          </button>
          <button onClick={() => scrollTo('aftercare')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Уход & Даунсайз
          </button>
          <button onClick={() => scrollTo('faq')} className="text-gray-300 hover:text-gold-rose transition-colors">
            FAQ
          </button>
          <button 
            onClick={onOpenBooking}
            className="btn-premium bg-[#E0A98B] text-black hover:bg-white py-2 px-5 text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(224,169,139,0.3)] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Записаться
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button 
            onClick={onOpenBooking}
            className="btn-premium bg-[#E0A98B] text-black font-bold py-1.5 px-4 text-xs"
          >
            Запись
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass rounded-2xl p-6 border border-white/10 space-y-3 backdrop-blur-2xl shadow-2xl">
          <button onClick={() => scrollTo('map')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Карта проколов
          </button>
          <button onClick={() => scrollTo('jewelry')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Витрина украшений
          </button>
          <button onClick={() => scrollTo('masters')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Anastasya & Портфолио
          </button>
          <button onClick={() => scrollTo('safety')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Безопасность
          </button>
          <button onClick={() => scrollTo('aftercare')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Уход & Даунсайз
          </button>
          <button onClick={() => scrollTo('faq')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            FAQ
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full btn-premium bg-[#E0A98B] text-black font-bold text-center py-3 text-sm mt-2"
          >
            Онлайн-запись
          </button>
        </div>
      )}
    </nav>
  );
}
