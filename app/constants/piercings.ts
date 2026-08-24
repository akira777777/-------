export type ZoneId = 'face' | 'ear' | 'body';

export type PiercingType = {
  id: string;
  name: string;
  description: string;
  painLevel: number; // 1-5
  jewelryType: 'stud' | 'hoop' | 'barbell' | 'curved_bar';
  basePrice: number;
  zone: ZoneId;
};

export const PIERCINGS: PiercingType[] = [
  // Face Zone
  {
    id: 'f1',
    name: 'Носовое кольцо (Nostril)',
    description: 'Классический прокол в крыле носа. Идеально подходит для тонких колец или маленьких пусет.',
    painLevel: 2,
    jewelryType: 'hoop',
    basePrice: 1300,
    zone: 'face'
  },
  {
    id: 'f2',
    name: 'Септум (Septum)',
    description: 'Прокол в перегородке носа. Популярный выбор для крупных колец и декоративных элементов.',
    painLevel: 3,
    jewelryType: 'hoop',
    basePrice: 1500,
    zone: 'face'
  },
  {
    id: 'f3',
    name: 'Микродерма (Dermal)',
    description: 'Имплантационный прокол под кожей. Требует высокой квалификации мастера.',
    painLevel: 4,
    jewelryType: 'stud',
    basePrice: 1900,
    zone: 'face'
  },
  // Ear Zone
  {
    id: 'e1',
    name: 'Хеликс (Helix)',
    description: 'Прокол верхнего края ушной раковины. Популярно для создания каскадных композиций.',
    painLevel: 2,
    jewelryType: 'curved_bar',
    basePrice: 1200,
    zone: 'ear'
  },
  {
    id: 'e2',
    name: 'Трагус (Tragus)',
    description: 'Прокол передней части ушной раковины. Идеально для маленьких пусет.',
    painLevel: 3,
    jewelryType: 'stud',
    basePrice: 1200,
    zone: 'ear'
  },
  {
    id: 'e3',
    name: 'Конч (Conch)',
    description: 'Прокол центральной части ушной раковины. Подходит для крупных колец и пусет.',
    painLevel: 3,
    jewelryType: 'hoop',
    basePrice: 1400,
    zone: 'ear'
  },
  // Body Zone
  {
    id: 'b1',
    name: 'Пупок (Navel)',
    description: 'Классический прокол пупка. Подходит для длинных подвесок и колец.',
    painLevel: 3,
    jewelryType: 'barbell',
    basePrice: 1600,
    zone: 'body'
  },
  {
    id: 'b2',
    name: 'Микродерма (Body Dermal)',
    description: 'Имплантационный прокол на плече или ключице.',
    painLevel: 4,
    jewelryType: 'stud',
    basePrice: 2000,
    zone: 'body'
  }
];

export const ZONES: { id: ZoneId; name: string; icon: string }[] = [
  { id: 'face', name: 'Лицо', icon: '👤' },
  { id: 'ear', name: 'Уши', icon: '👂' },
  { id: 'body', name: 'Тело', icon: '✨' }
];
