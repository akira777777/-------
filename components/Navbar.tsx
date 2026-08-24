'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Globe, ChevronDown, Instagram } from 'lucide-react';
import { useCurrency, CURRENCIES, type CurrencyCode } from '@/constants/currency';
import { SOCIAL_LINKS } from '@/constants/content_files/content';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCurrencyDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currencyOptions: CurrencyCode[] = ['CZK', 'EUR', 'USD'];

  return (
    <nav className={`fixed top-0 w-full z-40 px-2.5 sm:px-6 py-2.5 sm:py-4 transition-all duration-300 ${scrolled ? 'bg-black/40 backdrop-blur-md' : ''}`}>
      <div className={`max-w-7xl mx-auto glass rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center border backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 ${scrolled ? 'border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.7)]' : 'border-white/10'}`}>
        {/* Логотип */}
        <Link href="/" className="text-base sm:text-2xl font-heading font-bold tracking-tight text-gold-rose flex items-center gap-1.5 sm:gap-2 group shrink-0">
          <span className="bg-gradient-to-r from-white via-[#E0A98B] to-[#D4AF37] bg-clip-text text-transparent group-hover:brightness-110 transition-all">
            AURA
          </span>
          <span className="text-white font-light text-[10px] sm:text-xs tracking-widest uppercase border-l border-white/20 pl-1.5 sm:pl-2">
            STUDIO
          </span>
        </Link>

        {/* Desktop Навигация */}
        <div className="hidden lg:flex space-x-3.5 xl:space-x-5 items-center text-[11px] xl:text-xs font-medium uppercase tracking-wider">
          <button onClick={() => scrollTo('map')} className="text-gray-300 hover:text-gold-rose transition-colors whitespace-nowrap">
            Карта проколов
          </button>
          <button onClick={() => scrollTo('ear-curation')} className="text-gray-300 hover:text-gold-rose transition-colors flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0A98B]" />
            Сет-билдер
          </button>
          <button onClick={() => scrollTo('jewelry')} className="text-gray-300 hover:text-gold-rose transition-colors whitespace-nowrap">
            Витрина
          </button>
          <button onClick={() => scrollTo('healing')} className="text-gray-300 hover:text-gold-rose transition-colors whitespace-nowrap">
            Заживление
          </button>
          <button onClick={() => scrollTo('masters')} className="text-gray-300 hover:text-gold-rose transition-colors whitespace-nowrap">
            Anastasya
          </button>
          <button onClick={() => scrollTo('safety')} className="text-gray-300 hover:text-gold-rose transition-colors whitespace-nowrap">
            Безопасность
          </button>
          <button onClick={() => scrollTo('testimonials')} className="text-gray-300 hover:text-gold-rose transition-colors whitespace-nowrap">
            Отзывы
          </button>
        </div>

        {/* Правый блок: Переключатель валют + Кнопка записи */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Переключатель валют (Desktop & Mobile) */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass border border-white/10 text-xs font-mono font-bold text-gray-200 hover:text-white hover:border-[#E0A98B]/40 transition-all"
              aria-label="Выбрать валюту"
            >
              <Globe className="w-3.5 h-3.5 text-[#E0A98B]" />
              <span>{currency}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 glass-card rounded-xl p-1.5 border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                {currencyOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-colors ${
                      currency === c
                        ? 'bg-[#E0A98B] text-black font-bold'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[10px] opacity-75">{CURRENCIES[c].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Кнопка записи */}
          <button
            onClick={onOpenBooking}
            className="btn-premium bg-[#E0A98B] text-black hover:bg-white py-2 px-3.5 sm:px-5 text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(224,169,139,0.3)] flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Записаться</span>
            <span className="sm:hidden">Запись</span>
          </button>

          {/* Гамбургер меню */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Меню"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Мобильное выпадающее меню */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-card rounded-2xl p-5 border border-white/10 space-y-2.5 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2">
          <button onClick={() => scrollTo('map')} className="block w-full text-left py-2 text-sm text-gray-200 hover:text-gold-rose border-b border-white/5">
            📍 Карта проколов
          </button>
          <button onClick={() => scrollTo('ear-curation')} className="block w-full text-left py-2 text-sm text-[#E0A98B] font-semibold hover:text-white border-b border-white/5">
            ✨ Сет-билдер уха (Скидки до -15%)
          </button>
          <button onClick={() => scrollTo('jewelry')} className="block w-full text-left py-2 text-sm text-gray-200 hover:text-gold-rose border-b border-white/5">
            💎 Витрина украшений
          </button>
          <button onClick={() => scrollTo('healing')} className="block w-full text-left py-2 text-sm text-gray-200 hover:text-gold-rose border-b border-white/5">
            📅 Календарь заживления & Даунсайз
          </button>
          <button onClick={() => scrollTo('masters')} className="block w-full text-left py-2 text-sm text-gray-200 hover:text-gold-rose border-b border-white/5">
            👑 Мастер Anastasya & Портфолио
          </button>
          <button onClick={() => scrollTo('safety')} className="block w-full text-left py-2 text-sm text-gray-200 hover:text-gold-rose border-b border-white/5">
            🛡️ Стандарты стерилизации
          </button>
          <button onClick={() => scrollTo('testimonials')} className="block w-full text-left py-2 text-sm text-gray-200 hover:text-gold-rose border-b border-white/5">
            💬 Отзывы клиентов
          </button>
          <button onClick={() => scrollTo('faq')} className="block w-full text-left py-2 text-sm text-gray-200 hover:text-gold-rose border-b border-white/5">
            ❓ Вопросы и ответы (FAQ)
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={SOCIAL_LINKS.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl glass border border-white/10 text-xs text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Telegram ({SOCIAL_LINKS.telegram.handle})</span>
            </a>
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl glass border border-white/10 text-xs text-[#E0A98B] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full btn-premium bg-[#E0A98B] text-black font-bold text-center py-3 text-sm mt-2 shadow-[0_0_20px_rgba(224,169,139,0.35)]"
          >
            Онлайн-запись к Anastasya
          </button>
        </div>
      )}
    </nav>
  );
}
