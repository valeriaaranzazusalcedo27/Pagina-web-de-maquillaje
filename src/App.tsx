import { useState, useMemo } from 'react';
import {
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  Mail,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import {
  PRODUCTS,
  MAKEUP_SERVICES,
  HERO_IMAGE,
  STUDIO_IMAGE,
  STORE_INFO,
  Product,
  ProductCategory,
  ProductShade,
  formatARS,
} from './data/storeData';
import { Navbar } from './components/Navbar';
import { SafeImage } from './components/SafeImage';
import { CatalogDrawer, CartItem } from './components/CatalogDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';

type ContactTopic = 'servicio' | 'asesoramiento' | 'catalogo';

const GALLERY_CATEGORIES: ProductCategory[] = ['Todos', 'Labios', 'Ojos', 'Rostro', 'Brochas'];

export default function App() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<ProductCategory>('Todos');
  const [selectedShades, setSelectedShades] = useState<Record<string, ProductShade>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);

  // Personalized Contact Form State
  const [contactTopic, setContactTopic] = useState<ContactTopic>('servicio');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(MAKEUP_SERVICES[0].id);
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [skinUndertone, setSkinUndertone] = useState<string>('Neutro');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactNotes, setContactNotes] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const visibleGalleryProducts = useMemo(() => {
    if (galleryFilter === 'Todos') {
      return PRODUCTS.slice(0, 6);
    }
    return PRODUCTS.filter((p) => p.category === galleryFilter);
  }, [galleryFilter]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, shade: ProductShade) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.shade.name === shade.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, shade, quantity: 1 }];
    });
    setAddedFeedback(`${product.name} (${shade.name})`);
    setTimeout(() => setAddedFeedback(null), 3200);
  };

  const handleUpdateQty = (productId: string, shadeName: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.shade.name === shadeName) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string, shadeName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.shade.name === shadeName)
      )
    );
  };

  const handleRequestService = (serviceId: string) => {
    setContactTopic('servicio');
    setSelectedServiceId(serviceId);
    setContactSubmitted(false);
    const contactEl = document.getElementById('contacto');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contacto');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;
    setContactSubmitted(true);
  };

  const resetContactForm = () => {
    setContactSubmitted(false);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactNotes('');
    setPreferredDate('');
  };

  const selectedServiceObj =
    MAKEUP_SERVICES.find((s) => s.id === selectedServiceId) ?? MAKEUP_SERVICES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1715]">
      <Navbar
        onOpenCatalog={() => setIsCatalogOpen(true)}
        cartCount={totalCartItems}
        onNavigateToContact={scrollToContact}
      />

      <main className="flex-1">
        {/* ============================================================
            ESPACIO 1: PÁGINA PRINCIPAL (HERO CON IMAGEN DE COSMÉTICOS)
           ============================================================ */}
        <section
          id="principal"
          aria-labelledby="hero-heading"
          className="border-b border-[#1A1715]/10"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Editorial Copy */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  <p className="text-xs font-medium tracking-wide text-[#7D3A3E]">
                    Local de maquillaje &amp; estudio · {STORE_INFO.city}
                  </p>

                  <h1
                    id="hero-heading"
                    className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#1A1715] leading-[1.08] tracking-tight"
                  >
                    Cosmética de autor y maquillaje diseñado para tu piel
                  </h1>

                  <p className="text-base text-[#544B45] leading-relaxed max-w-md">
                    Descubre nuestra colección curada de labiales aterciopelados, bases en suero y pigmentos minerales, junto a sesiones de maquillaje profesional en nuestro estudio.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCatalogOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#7D3A3E] hover:bg-[#662D31] rounded-md transition-colors min-h-[44px] cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <span>Ver Catálogo Completo</span>
                    </button>

                    <a
                      href="#servicios"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1A1715] bg-[#EFEAE2] hover:bg-[#E4DDD2] rounded-md transition-colors min-h-[44px]"
                    >
                      <span>Servicios de maquillaje</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Quiet studio location note */}
                <div className="mt-10 pt-6 border-t border-[#1A1715]/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6B5D54]">
                  <span>{STORE_INFO.address}</span>
                  <span aria-hidden="true">·</span>
                  <span>{STORE_INFO.hours}</span>
                </div>
              </div>

              {/* Right Dominant Cosmetics Photograph */}
              <div className="lg:col-span-7">
                <div className="relative h-full min-h-[300px] sm:min-h-[420px] rounded-xl overflow-hidden bg-[#EAE3D8] border border-[#1A1715]/8">
                  <SafeImage
                    src={HERO_IMAGE}
                    alt="Colección de cosméticos de Atelier Velour sobre piedra travertino: labiales mate, paleta de sombras, base en suero y brochas"
                    fallbackLabel="Colección Atelier Velour"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 3-Column Studio Highlights Strip */}
            <div className="mt-10 pt-8 border-t border-[#1A1715]/10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div>
                <h2 className="font-serif text-lg font-semibold text-[#1A1715]">
                  Curaduría de pigmentos puros
                </h2>
                <p className="text-sm text-[#5C524B] mt-1 leading-relaxed">
                  Fórmulas dermatológicamente testeadas con acabados ligeros y larga duración real.
                </p>
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-[#1A1715]">
                  Prueba de subtono en el local
                </h2>
                <p className="text-sm text-[#5C524B] mt-1 leading-relaxed">
                  Te asesoramos frente a luz natural para encontrar tu tono exacto de base y labial.
                </p>
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-[#1A1715]">
                  Estudio y atención por turno
                </h2>
                <p className="text-sm text-[#5C524B] mt-1 leading-relaxed">
                  Maquillaje social, novias y clases personalizadas en un espacio íntimo y luminoso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ESPACIO 2: GALERÍA DE PRODUCTOS
           ============================================================ */}
        <section
          id="galeria"
          aria-labelledby="galeria-heading"
          className="py-16 md:py-24 border-b border-[#1A1715]/10"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl">
                <p className="text-xs font-medium text-[#7D3A3E] mb-2">
                  Galería de productos
                </p>
                <h2
                  id="galeria-heading"
                  className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1715] leading-tight"
                >
                  Esenciales de nuestra boutique
                </h2>
                <p className="text-sm sm:text-base text-[#544B45] mt-2 leading-relaxed">
                  Explora los tonos y texturas más elegidos del local o abre el catálogo completo para ver todo nuestro inventario.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="tablist"
                  aria-label="Filtrar galería por categoría"
                  className="flex flex-wrap items-center gap-1 p-1 bg-[#EFEAE2] rounded-lg"
                >
                  {GALLERY_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={galleryFilter === category}
                      onClick={() => setGalleryFilter(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        galleryFilter === category
                          ? 'bg-white text-[#1A1715] shadow-sm'
                          : 'text-[#5C524B] hover:text-[#1A1715]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3-Column Uniform Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {visibleGalleryProducts.map((product) => {
                const activeShade = selectedShades[product.id] ?? product.shades[0];
                return (
                  <article
                    key={product.id}
                    className="group bg-white border border-[#1A1715]/10 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="aspect-[4/3] w-full bg-[#F3EEE7] overflow-hidden cursor-pointer text-left"
                    >
                      <SafeImage
                        src={product.image}
                        alt={product.name}
                        fallbackLabel={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>

                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#6B5D54] mb-1.5">
                          <span>{product.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.brand}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.status}</span>
                        </div>

                        <div className="flex items-baseline justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className="text-left cursor-pointer hover:text-[#7D3A3E] transition-colors"
                          >
                            <h3 className="text-base font-semibold text-[#1A1715]">
                              {product.name}
                            </h3>
                          </button>
                          <span className="text-[15px] font-semibold text-[#1A1715] tabular-nums whitespace-nowrap shrink-0">
                            {formatARS(product.price)}
                          </span>
                        </div>

                        <p className="text-xs text-[#5C524B] mt-2 leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#1A1715]/8 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-[#5C524B] truncate">
                            {activeShade.name}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {product.shades.map((shade) => {
                              const isSelected = shade.name === activeShade.name;
                              return (
                                <button
                                  key={shade.name}
                                  type="button"
                                  onClick={() =>
                                    setSelectedShades((prev) => ({
                                      ...prev,
                                      [product.id]: shade,
                                    }))
                                  }
                                  title={shade.name}
                                  aria-label={`Elegir tono ${shade.name}`}
                                  className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                                    isSelected
                                      ? 'ring-2 ring-[#7D3A3E] ring-offset-2 scale-110 border-white'
                                      : 'border-[#1A1715]/20 hover:scale-105'
                                  }`}
                                  style={{ backgroundColor: shade.hex }}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className="py-2 px-3 text-xs font-medium text-[#1A1715] bg-[#F4F0EA] hover:bg-[#EAE3D8] rounded-md transition-colors min-h-[40px] cursor-pointer"
                          >
                            Ver detalle
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product, activeShade)}
                            className="py-2 px-3 text-xs font-medium text-white bg-[#1A1715] hover:bg-[#7D3A3E] rounded-md transition-colors min-h-[40px] cursor-pointer"
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setIsCatalogOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#1A1715] bg-white border border-[#1A1715]/20 hover:border-[#7D3A3E] hover:text-[#7D3A3E] rounded-md transition-colors min-h-[44px] cursor-pointer"
              >
                <span>Abrir catálogo completo ({PRODUCTS.length} productos)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            ESPACIO 3: SERVICIOS DE MAQUILLAJE
           ============================================================ */}
        <section
          id="servicios"
          aria-labelledby="servicios-heading"
          className="py-16 md:py-24 bg-[#F4EFE8] border-b border-[#1A1715]/10"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              {/* Left Studio Image Column */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs font-medium text-[#7D3A3E] mb-2">
                    Servicios de maquillaje
                  </p>
                  <h2
                    id="servicios-heading"
                    className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1715] leading-tight"
                  >
                    Sesiones en nuestro estudio y asesoramiento privado
                  </h2>
                  <p className="text-sm sm:text-base text-[#544B45] mt-3 leading-relaxed">
                    Trabajamos con luz natural calibrada, higiene hospitalaria en cada pincel y una preparación de piel previa pensada para que el maquillaje se mantenga impecable.
                  </p>
                </div>

                <div className="flex-1 min-h-[280px] rounded-xl overflow-hidden bg-[#EAE3D8] border border-[#1A1715]/10">
                  <SafeImage
                    src={STUDIO_IMAGE}
                    alt="Tocador de mármol y espejo dorado en el estudio de maquillaje Atelier Velour"
                    fallbackLabel="Estudio Atelier Velour"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Numbered Service List */}
              <div className="lg:col-span-7 divide-y divide-[#1A1715]/12 bg-white border border-[#1A1715]/10 rounded-xl px-6 sm:px-8">
                {MAKEUP_SERVICES.map((service) => (
                  <div key={service.id} className="py-7 first:pt-8 last:pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-serif text-2xl font-semibold text-[#1A1715]">
                        <span className="text-[#7D3A3E] mr-2">{service.number}</span>
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm shrink-0">
                        <span className="text-[#6B5D54]">{service.duration}</span>
                        <span aria-hidden="true" className="text-[#C9BFB5]">·</span>
                        <span className="font-semibold text-[#1A1715] tabular-nums">
                          {formatARS(service.price)}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#544B45] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <ul className="space-y-1 text-xs text-[#5C524B]">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="text-[#7D3A3E]" aria-hidden="true">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => handleRequestService(service.id)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#1A1715] hover:bg-[#7D3A3E] rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Solicitar turno</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            ESPACIO 4: SECCIÓN DE CONTACTO PERSONALIZADA
           ============================================================ */}
        <section
          id="contacto"
          aria-labelledby="contacto-heading"
          className="py-16 md:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Direct Store Information */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-xs font-medium text-[#7D3A3E] mb-2">
                    Atención personalizada
                  </p>
                  <h2
                    id="contacto-heading"
                    className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1715] leading-tight"
                  >
                    Hablemos sobre tu turno o tu tono ideal
                  </h2>
                  <p className="text-sm sm:text-base text-[#544B45] mt-3 leading-relaxed">
                    Cuéntanos si buscas reservar una sesión de maquillaje, recibir recomendaciones según tu tipo de piel o encargar productos de nuestro catálogo.
                  </p>
                </div>

                <div className="bg-white border border-[#1A1715]/10 rounded-xl p-6 space-y-5">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-4 h-4 text-[#7D3A3E] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium text-[#6B5D54]">Teléfono y WhatsApp</p>
                      <a
                        href={STORE_INFO.phoneHref}
                        className="text-base font-semibold text-[#1A1715] hover:text-[#7D3A3E] transition-colors tabular-nums"
                      >
                        {STORE_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-[#1A1715]/8">
                    <MapPin className="w-4 h-4 text-[#7D3A3E] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium text-[#6B5D54]">Local y Estudio</p>
                      <p className="text-sm font-medium text-[#1A1715]">
                        {STORE_INFO.address}
                      </p>
                      <p className="text-xs text-[#6B5D54]">{STORE_INFO.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-[#1A1715]/8">
                    <Clock className="w-4 h-4 text-[#7D3A3E] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium text-[#6B5D54]">Horarios de atención</p>
                      <p className="text-sm font-medium text-[#1A1715]">{STORE_INFO.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-[#1A1715]/8">
                    <Mail className="w-4 h-4 text-[#7D3A3E] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium text-[#6B5D54]">Correo directo</p>
                      <a
                        href={`mailto:${STORE_INFO.email}`}
                        className="text-sm font-medium text-[#1A1715] hover:text-[#7D3A3E] transition-colors"
                      >
                        {STORE_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Personalized Interactive Consultation Form */}
              <div className="lg:col-span-7 bg-white border border-[#1A1715]/10 rounded-xl p-6 sm:p-8">
                {contactSubmitted ? (
                  <div className="py-10 text-center max-w-md mx-auto">
                    <CheckCircle2
                      className="w-12 h-12 text-[#3B6E4C] mx-auto mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-2xl font-semibold text-[#1A1715] mb-2">
                      Gracias, {contactName}
                    </h3>
                    <p className="text-sm text-[#544B45] leading-relaxed mb-5">
                      {contactTopic === 'servicio'
                        ? `Recibimos tu solicitud de turno para "${selectedServiceObj.title}". Nos comunicaremos al ${contactPhone} para confirmar el horario.`
                        : contactTopic === 'asesoramiento'
                        ? `Nuestras maquilladoras analizarán tu consulta (subtono ${skinUndertone}) y te responderán al ${contactPhone} con recomendaciones del local.`
                        : `Recibimos tu consulta sobre nuestro catálogo y te contactaremos al ${contactPhone} a la brevedad.`}
                    </p>
                    <button
                      type="button"
                      onClick={resetContactForm}
                      className="px-5 py-2.5 text-xs font-medium text-white bg-[#1A1715] hover:bg-[#7D3A3E] rounded-md transition-colors cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <p className="text-xs font-medium text-[#544B45] mb-2.5">
                        1. ¿En qué podemos ayudarte hoy?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setContactTopic('servicio')}
                          className={`py-2.5 px-3 text-xs font-medium rounded-md border text-left transition-colors cursor-pointer ${
                            contactTopic === 'servicio'
                              ? 'bg-[#7D3A3E] text-white border-[#7D3A3E]'
                              : 'bg-[#FAF8F5] text-[#453E39] border-[#1A1715]/15 hover:border-[#7D3A3E]/50'
                          }`}
                        >
                          Reservar maquillaje
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactTopic('asesoramiento')}
                          className={`py-2.5 px-3 text-xs font-medium rounded-md border text-left transition-colors cursor-pointer ${
                            contactTopic === 'asesoramiento'
                              ? 'bg-[#7D3A3E] text-white border-[#7D3A3E]'
                              : 'bg-[#FAF8F5] text-[#453E39] border-[#1A1715]/15 hover:border-[#7D3A3E]/50'
                          }`}
                        >
                          Asesoramiento de tonos
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactTopic('catalogo')}
                          className={`py-2.5 px-3 text-xs font-medium rounded-md border text-left transition-colors cursor-pointer ${
                            contactTopic === 'catalogo'
                              ? 'bg-[#7D3A3E] text-white border-[#7D3A3E]'
                              : 'bg-[#FAF8F5] text-[#453E39] border-[#1A1715]/15 hover:border-[#7D3A3E]/50'
                          }`}
                        >
                          Encargo de catálogo
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Personalized Fields based on selected topic */}
                    {contactTopic === 'servicio' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF8F5] border border-[#1A1715]/10 rounded-lg">
                        <div>
                          <label
                            htmlFor="service-select"
                            className="block text-xs font-medium text-[#544B45] mb-1.5"
                          >
                            Servicio de interés
                          </label>
                          <select
                            id="service-select"
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#1A1715]/15 rounded-md text-[#1A1715] focus:outline-none focus:border-[#7D3A3E]"
                          >
                            {MAKEUP_SERVICES.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.title} ({formatARS(service.price)})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="preferred-date"
                            className="block text-xs font-medium text-[#544B45] mb-1.5"
                          >
                            Fecha estimada del evento o turno
                          </label>
                          <input
                            id="preferred-date"
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#1A1715]/15 rounded-md text-[#1A1715] focus:outline-none focus:border-[#7D3A3E]"
                          />
                        </div>
                      </div>
                    )}

                    {contactTopic === 'asesoramiento' && (
                      <div className="p-4 bg-[#FAF8F5] border border-[#1A1715]/10 rounded-lg space-y-2.5">
                        <p className="text-xs font-medium text-[#544B45]">
                          ¿Cómo describirías el subtono o necesidad principal de tu piel?
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Frío / Rosado', 'Cálido / Dorado', 'Neutro', 'No estoy segura'].map(
                            (tone) => (
                              <button
                                key={tone}
                                type="button"
                                onClick={() => setSkinUndertone(tone)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                                  skinUndertone === tone
                                    ? 'bg-[#1A1715] text-white border-[#1A1715]'
                                    : 'bg-white text-[#544B45] border-[#1A1715]/15'
                                }`}
                              >
                                {tone}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-[#544B45] mb-1.5"
                        >
                          Nombre y apellido
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ej. Camila Fernández"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#1A1715]/15 rounded-md text-[#1A1715] focus:outline-none focus:border-[#7D3A3E]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-medium text-[#544B45] mb-1.5"
                        >
                          Teléfono / WhatsApp
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+54 11 ..."
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#1A1715]/15 rounded-md text-[#1A1715] focus:outline-none focus:border-[#7D3A3E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#544B45] mb-1.5"
                      >
                        Correo electrónico (opcional)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#1A1715]/15 rounded-md text-[#1A1715] focus:outline-none focus:border-[#7D3A3E]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-notes"
                        className="block text-xs font-medium text-[#544B45] mb-1.5"
                      >
                        Detalles de tu consulta o preferencia de horario
                      </label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        value={contactNotes}
                        onChange={(e) => setContactNotes(e.target.value)}
                        placeholder="Cuéntanos sobre el estilo de maquillaje que buscas, productos de interés o dudas..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#1A1715]/15 rounded-md text-[#1A1715] focus:outline-none focus:border-[#7D3A3E]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 text-sm font-medium text-white bg-[#7D3A3E] hover:bg-[#662D31] rounded-md transition-colors min-h-[44px] cursor-pointer"
                    >
                      Enviar consulta personalizada
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#1A1715] text-[#FAF8F5] py-12 border-t border-[#1A1715]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-serif text-2xl font-semibold tracking-tight">
              {STORE_INFO.brandName}
            </span>
            <p className="text-xs text-[#C7BEB5] mt-1.5">
              {STORE_INFO.address} · {STORE_INFO.city} · {STORE_INFO.phoneDisplay}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#D8D0C8]">
            <a href="#principal" className="hover:text-white transition-colors">
              Página principal
            </a>
            <a href="#galeria" className="hover:text-white transition-colors">
              Galería
            </a>
            <a href="#servicios" className="hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              Contacto
            </a>
            <button
              type="button"
              onClick={() => setIsCatalogOpen(true)}
              className="text-white underline underline-offset-4 hover:text-[#E8C5C7] transition-colors cursor-pointer"
            >
              Catálogo completo
            </button>
          </div>
        </div>
      </footer>

      {/* Subtle Floating Cart Feedback Toast */}
      {addedFeedback && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 bg-[#1A1715] text-white px-4 py-3 rounded-lg shadow-lg border border-white/10 flex items-center gap-3 max-w-sm"
        >
          <Sparkles className="w-4 h-4 text-[#E3B2B5] shrink-0" aria-hidden="true" />
          <div className="text-xs min-w-0">
            <p className="font-medium truncate">Agregado: {addedFeedback}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsCatalogOpen(true)}
            className="text-xs font-semibold text-[#E3B2B5] hover:text-white underline underline-offset-2 shrink-0 cursor-pointer"
          >
            Ver pedido
          </button>
        </div>
      )}

      {/* Interactive Store Catalog Drawer */}
      <CatalogDrawer
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQty={handleUpdateQty}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
