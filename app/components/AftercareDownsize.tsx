import React from 'react';
import { ShieldCheck, Droplets, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AftercareDownsize() {
  const careSteps = [
    {
      title: "Гигиена",
      description: "Очищайте прокол 2 раза в день с использованием физиологического раствора. Избегайте агрессивных антисептиков, которые могут повредить ткани.",
      icon: <Droplets className="w-6 h-6 text-[#E0A98B]" />,
    },
    {
      title: "Сон и одежда",
      description: "Старайтесь не спать на стороне прокола в первые 2 недели. Выбирайте свободную одежду из натуральных тканей, чтобы избежать трения.",
      icon: <Clock className="w-6 h-6 text-[#E0A98B]" />,
    },
    {
      title: "Питание",
      description: "В первые дни после процедуры рекомендуется избегать продуктов с высоким содержанием соли и острого, чтобы минимизировать отек.",
      icon: <ShieldCheck className="w-6 h-6 text-[#E0A98B]" />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Уход и Обслуживание</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Ваш комфорт и красота — наш приоритет. Правильный уход гарантирует быстрое заживление и идеальный результат.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {careSteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[2rem] border border-white/5"
            >
              <div className="mb-4 bg-[#E0A98B]/10 w-fit p-3 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="glass p-12 rounded-[3rem] border border-[#E0A98B]/20 bg-[#E0A98B]/5">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-heading font-bold mb-6 text-[#E0A98B]">Downsizing (Снижение размера)</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                По мере заживления прокола украшение необходимо менять на более маленькое. 
                Это критически важно для предотвращения травматизации канала и обеспечения комфорта при ношении пирсинга в повседневной жизни.
              </p>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#E0A98B] rounded-full" /> 
                  Плановое обслуживание каждые 4-6 месяцев
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#E0A98B] rounded-full" /> 
                  Профессиональная замена украшения в студии
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <div className="flex items-center gap-4 mb-6 text-[#E0A98B]">
                <RefreshCw className="w-6 h-6" />
                <span className="font-heading font-bold">График обслуживания</span>
              </div>
              <div className="space-y-3">
                {[
                  { month: "1 Месяц", action: "Проверка заживления и первая смена размера" },
                  { month: "6 Месяцев", action: "Регулярное обслуживание и чистка канала" },
                  { month: "12 Месяцев", action: "Полная ревизия украшений и стерилизации" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">{item.month}</span>
                    <span className="font-medium">{item.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
