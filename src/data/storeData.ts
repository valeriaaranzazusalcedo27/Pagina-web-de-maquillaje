export type ProductCategory = 'Todos' | 'Rostro' | 'Labios' | 'Ojos' | 'Brochas';

export interface ProductShade {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Exclude<ProductCategory, 'Todos'>;
  price: number;
  status: 'En stock' | 'Edición limitada';
  shortDescription: string;
  fullDescription: string;
  finish: string;
  volume: string;
  image: string;
  featuredInGallery: boolean;
  shades: ProductShade[];
}

export interface MakeupService {
  id: string;
  number: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  includes: string[];
}

export const STORE_INFO = {
  brandName: 'Atelier Velour',
  phoneDisplay: '+54 11 4829-3104',
  phoneHref: 'tel:+541148293104',
  whatsappNumber: '5491148293104',
  email: 'hola@ateliervelour.com',
  address: 'Av. Alvear 1640, Galería del Patio, Local 4',
  city: 'Buenos Aires',
  hours: 'Lunes a Sábado · 10:00 a 20:00 hs',
  instagram: '@ateliervelour',
};

export const HERO_IMAGE = '/src/assets/images/hero_cosmetics_atelier_1794920566592.jpg';
export const STUDIO_IMAGE = '/src/assets/images/service_makeup_atelier_1794920569607.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'velvet-rosewood-lipstick',
    name: 'Labial Velvet Rosewood',
    brand: 'Atelier Velour',
    category: 'Labios',
    price: 38500,
    status: 'En stock',
    shortDescription: 'Barra mate aterciopelada de alta pigmentación con aceites botánicos hidratantes.',
    fullDescription:
      'Formulado con manteca de karité y pigmentos minerales puros para ofrecer un color intenso en una sola pasada sin resecar los labios. Estuche recargable de latón cepillado.',
    finish: 'Mate aterciopelado · 8 hs de duración',
    volume: '3.5 g',
    image: '/src/assets/images/product_velvet_lipstick_1794920567826.jpg',
    featuredInGallery: true,
    shades: [
      { name: '01 Rosewood', hex: '#7D3A3E' },
      { name: '02 Terracota', hex: '#A55143' },
      { name: '03 Nude Cachemir', hex: '#B98779' },
      { name: '04 Burdeos', hex: '#582026' },
    ],
  },
  {
    id: 'paleta-sombra-obsidian',
    name: 'Paleta Mineral Nueve Tonos',
    brand: 'Luna Minerals',
    category: 'Ojos',
    price: 74900,
    status: 'Edición limitada',
    shortDescription: 'Nueve pigmentos prensados entre mates sedosos y destellos champán cálidos.',
    fullDescription:
      'Una curaduría cromática pensada para transiciones diurnas y ahumados nocturnos. Polvos micro-molidos libres de talco con adherencia superior y difuminado sin esfuerzo.',
    finish: 'Mate sedoso & Satinado metálico',
    volume: '12 g',
    image: '/src/assets/images/product_eyeshadow_palette_1794920567275.jpg',
    featuredInGallery: true,
    shades: [
      { name: 'Ámbar & Expreso', hex: '#6E4C3B' },
      { name: 'Rosa Ahumado', hex: '#9D6D63' },
      { name: 'Champán Puro', hex: '#D6BF9E' },
    ],
  },
  {
    id: 'base-suero-luminosa',
    name: 'Base Suero Efecto Seda',
    brand: 'Aurora Botanica',
    category: 'Rostro',
    price: 82000,
    status: 'En stock',
    shortDescription: 'Cobertura modulable con ácido hialurónico y acabado natural segunda piel.',
    fullDescription:
      'Unifica el tono y suaviza la textura con un velo luminoso no graso. Enriquecida con niacinamida y extracto de camelia para mantener la hidratación durante toda la jornada.',
    finish: 'Luminoso natural · Cobertura media',
    volume: '30 ml',
    image: '/src/assets/images/product_luminous_foundation_1794920568219.jpg',
    featuredInGallery: true,
    shades: [
      { name: '10 Porcelana', hex: '#EFE0CE' },
      { name: '20 Marfil Cálido', hex: '#E3C8AC' },
      { name: '30 Miel Suave', hex: '#CEAA84' },
      { name: '40 Canela', hex: '#A47855' },
    ],
  },
  {
    id: 'set-brochas-nogal',
    name: 'Set Cinco Brochas de Autor',
    brand: 'Atelier Velour',
    category: 'Brochas',
    price: 96000,
    status: 'En stock',
    shortDescription: 'Cinco herramientas esenciales con mango de nogal ahumado y fibra ultrasuave.',
    fullDescription:
      'Incluye brocha para polvos sueltos, rubor angular, base líquida, difuminado de párpados y precisión de detalles. Ensambladas a mano con fibras sintéticas veganas de alta densidad.',
    finish: 'Fibras veganas bicolores · Mango de nogal',
    volume: '5 unidades + estuche de lino',
    image: '/src/assets/images/product_brush_set_1794920568101.jpg',
    featuredInGallery: true,
    shades: [
      { name: 'Nogal Ahumado', hex: '#4A372B' },
    ],
  },
  {
    id: 'elixir-primer-iluminador',
    name: 'Elixir Primer Iluminador',
    brand: 'Aurora Botanica',
    category: 'Rostro',
    price: 58400,
    status: 'En stock',
    shortDescription: 'Prebase en gotero con escualano vegetal y microperlas doradas imperceptibles.',
    fullDescription:
      'Prepara el rostro antes de la base prolongando la fijación del maquillaje mientras aporta un brillo saludable desde el interior sin partículas de purpurina.',
    finish: 'Glow hidratante sin aceites pesados',
    volume: '30 ml',
    image: '/src/assets/images/product_luminous_foundation_1794920568219.jpg',
    featuredInGallery: false,
    shades: [
      { name: 'Ámbar Universal', hex: '#C79B6B' },
    ],
  },
  {
    id: 'delineador-labial-precision',
    name: 'Perfilador Cremoso Precisión',
    brand: 'Atelier Velour',
    category: 'Labios',
    price: 24500,
    status: 'En stock',
    shortDescription: 'Trazado suave de larga duración para definir y dar volumen natural al labio.',
    fullDescription:
      'Textura cera-crema que se desliza sin tironear y fija el labial evitando migraciones. Apto para usar solo con bálsamo o como base completa.',
    finish: 'Mate suave resistente al agua',
    volume: '1.2 g',
    image: '/src/assets/images/product_velvet_lipstick_1794920567826.jpg',
    featuredInGallery: false,
    shades: [
      { name: '01 Madera Rosa', hex: '#8F5857' },
      { name: '02 Espresso Suave', hex: '#5D3C36' },
      { name: '03 Pétalo', hex: '#BC847E' },
    ],
  },
  {
    id: 'cuarteto-sombras-bruma',
    name: 'Cuarteto Bruma Cálida',
    brand: 'Luna Minerals',
    category: 'Ojos',
    price: 54000,
    status: 'En stock',
    shortDescription: 'Cuatro tonos esenciales de cartera en acabado satinado y mate aterciopelado.',
    fullDescription:
      'Compacto con espejo amplio ideal para retoques y viajes. Combina vainilla mate, bronce tostado, rosa cuarzo y cacao profundo.',
    finish: 'Satinado fino & Mate',
    volume: '6 g',
    image: '/src/assets/images/hero_cosmetics_atelier_1794920566592.jpg',
    featuredInGallery: false,
    shades: [
      { name: 'Bruma Cálida', hex: '#8E6B59' },
    ],
  },
  {
    id: 'brocha-rostro-kabuki',
    name: 'Brocha Escultora Kabuki',
    brand: 'Atelier Velour',
    category: 'Brochas',
    price: 34900,
    status: 'En stock',
    shortDescription: 'Cabezal denso biselado para difuminar bronceadores y bases en crema sin marcas.',
    fullDescription:
      'Diseñada para pulir productos líquidos o en polvo sobre pómulos y contorno con acabado aerografiado en segundos.',
    finish: 'Cabezal angular compacto',
    volume: '1 unidad',
    image: '/src/assets/images/product_brush_set_1794920568101.jpg',
    featuredInGallery: false,
    shades: [
      { name: 'Nogal & Latón', hex: '#5A4538' },
    ],
  },
];

export const MAKEUP_SERVICES: MakeupService[] = [
  {
    id: 'social-eventos',
    number: '01.',
    title: 'Maquillaje Social & Eventos',
    duration: '60 min',
    price: 68000,
    description:
      'Diseñado a medida según tu vestuario, iluminación del evento y morfología facial, priorizando una piel luminosa y de alta duración.',
    includes: [
      'Preparación facial hidratante personalizada',
      'Pestañas postizas individuales o en tira de seda',
      'Kit de retoque labial de cortesía',
    ],
  },
  {
    id: 'novias-madrinas',
    number: '02.',
    title: 'Novias & Ceremonias Atelier',
    duration: '90 min + Prueba previa',
    price: 165000,
    description:
      'Acompañamiento integral con prueba en estudio para definir la paleta exacta y aplicación el día de la boda resistente a emociones y fotografía.',
    includes: [
      'Sesión de prueba completa de 90 minutos',
      'Fijación blindada a prueba de agua y flash',
      'Opción de asistencia en locación o domicilio',
    ],
  },
  {
    id: 'automaquillaje',
    number: '03.',
    title: 'Clase de Automaquillaje Privada',
    duration: '120 min',
    price: 89000,
    description:
      'Sesión práctica uno a uno para aprender a sacar partido a tus propios cosméticos, elegir tonos ideales y dominar técnicas de día y noche.',
    includes: [
      'Diagnóstico y depuración de tu neceser actual',
      'Guía impresa paso a paso con tu mapa facial',
      '15% de beneficio en productos del catálogo ese día',
    ],
  },
  {
    id: 'editorial-moda',
    number: '04.',
    title: 'Producciones & Editorial',
    duration: 'Media jornada (4 hs)',
    price: 195000,
    description:
      'Servicio profesional para campañas de marca, retratos corporativos, pasarela y sesiones fotográficas con cambios de look en set.',
    includes: [
      'Hasta 3 cambios de estilismo en maquillaje',
      'Corrección de brillos y retoques continuos frente a cámara',
      'Maletín profesional hipoalergénico completo',
    ],
  },
];

export function formatARS(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
