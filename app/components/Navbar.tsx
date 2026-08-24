'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3.5 flex justify-between items-center border border-white/10 backdrop-blur-xl">
        <Link href="/" className="text-xl md:text-2xl font-heading font-bold tracking-tighter text-gold-rose flex items-center gap-2">
          <span>AURA</span> <span className="text-white font-normal">PIERCING</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
          <button onClick={() => scrollTo('map')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Карта проколов
          </button>
          <button onClick={() => scrollTo('safety')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Безопасность
          </button>
          <button onClick={() => scrollTo('aftercare')} className="text-gray-300 hover:text-gold-rose transition-colors">
            Уход & Даунсайз
          </button>
          <button 
            onClick={() => scrollTo('map')} 
            className="btn-premium bg-white/5 text-white border-[#E0A98B]/40 hover:bg-[#E0A98B] hover:text-black py-2 px-6 text-xs uppercase tracking-wider font-semibold transition-all"
          >
            Записаться
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
          aria-label="Меню"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass rounded-2xl p-6 border border-white/10 space-y-4 backdrop-blur-2xl">
          <button onClick={() => scrollTo('map')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Карта проколов
          </button>
          <button onClick={() => scrollTo('safety')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Безопасность
          </button>
          <button onClick={() => scrollTo('aftercare')} className="block w-full text-left py-2 text-gray-200 hover:text-gold-rose">
            Уход & Даунсайз
          </button>
          <button 
            onClick={() => scrollTo('map')} 
            className="w-full btn-premium bg-[#E0A98B] text-black font-bold text-center py-3 text-sm mt-2"
          >
            Записаться онлайн
          </button>
        </div>
      )}
    </nav>
  );
}
