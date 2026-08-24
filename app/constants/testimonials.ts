export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  piercingType: string;
  jewelry: string;
  comment: string;
  healedMonths: string;
  verified: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Екатерина В.',
    location: 'Praha 2, Vinohrady',
    rating: 5,
    date: 'Февраль 2026',
    piercingType: 'Ear Curation (Helix + Conch + 2 Lobes)',
    jewelry: '14K Rose Gold + White Opal Cluster',
    comment: 'Собрали с Анастасией целый проект уха с нуля! Прокол прошел моментально, почти без боли. Очень понравилось, что через 4 недели мне сами написали с напоминанием про даунсайз. Канал зажил идеально ровно, никаких шишек и проблем.',
    healedMonths: '6 месяцев (полное заживление)',
    verified: true,
  },
  {
    id: 't2',
    name: 'Markus Weber',
    location: 'Vienna · Client',
    rating: 5,
    date: 'Январь 2026',
    piercingType: 'Septum & Nostril',
    jewelry: 'Titanium ASTM F-136 Anodized Gold',
    comment: 'I came from Vienna specifically for Anastasya’s anatomical placement skills. The septum was done through the sweet spot in under a second — zero pain, no tears. Truly hospital-grade sterile environment.',
    healedMonths: '3 months (fully healed)',
    verified: true,
  },
  {
    id: 't3',
    name: 'Алена Смирнова',
    location: 'Praha 1, Staré Město',
    rating: 5,
    date: 'Декабрь 2025',
    piercingType: 'Daith & Flat',
    jewelry: '18K Solid Gold Clicker with Diamonds',
    comment: 'У меня сложная анатомия хряща, в других студиях отказывались делать дэйс. Анастасия внимательно подобрала диаметр кликера и угол прокола. Выглядит просто как шедевр ювелирного искусства!',
    healedMonths: '5 месяцев (заживление)',
    verified: true,
  },
  {
    id: 't4',
    name: 'София Л.',
    location: 'Berlin / Prague',
    rating: 5,
    date: 'Ноябрь 2025',
    piercingType: 'Ключичный микродермал',
    jewelry: 'Titanium Ti-6Al-4V + Swarovski Drop',
    comment: 'Дермал стоит уже полгода, держится монолитно. Огромная благодарность за подробную памятку и набор Brine Healer — зажило без малейшего дискомфорта.',
    healedMonths: '7 месяцев (стабилен)',
    verified: true,
  }
];
