'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Activity, Info } from 'lucide-react';

export default function SafetySection() {
  const protocols = [
    {
      title: "Медицинская стерилизация",
      description: "Мы используем автоклавы класса B для полной стерилизации инструментов. Каждая процедура проводится в одноразовых перчатках и масках.",
      icon: <ShieldCheck className="w-8 h-8 text-[#E0A98B]" />,
    },
    {
      title: "Сертифицированные материалы",
      description: "Используем только имплантационный титан ASTM F-136 и золото высокой пробы. Все украшения проходят проверку на биосовместимость.",
      icon: <Award className="w-8 h-8 text-[#E0A98B]" />,
    },
    {
      title: "Протоколы безопасности",
      description: "Каждая процедура начинается с оценки анатомии и подготовки кожи. Мы строго соблюдаем протоколы минимизации травматизма.",
      icon: <Activity className="w-8 h-8 text-[#E0A98B]" />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Безопасность и Стандарты</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Ваше здоровье — наш приоритет. Мы объединяем эстетику с медицинскими стандартами высшего уровня.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {protocols.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[2rem] border border-white/5 hover:border-[#E0A98B]/30 transition-all duration-300"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-heading font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 glass rounded-[2rem] border border-[#E0A98B]/10 bg-[#E0A98B]/5">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-[#E0A98B] p-4 rounded-full">
              <Info className="text-black w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold mb-2">Подготовка к процедуре</h3>
              <p className="text-gray-400 text-sm max-w-3xl">
                Перед визитом в студию мы рекомендуем ознакомиться с нашими рекомендациями по подготовке кожи и выбору украшений. 
                Наши мастера предоставят вам подробную инструкцию после записи.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
