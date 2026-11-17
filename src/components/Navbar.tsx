import { useState, useRef, useEffect } from 'react';
import { Phone, BookOpen, Menu, X, Copy, Check, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface NavbarProps {
  onOpenCatalog: () => void;
  cartCount: number;
  onNavigateToContact: () => void;
}

const NAV_LINKS = [
  { label: 'Página principal', href: '#principal' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar({ onOpenCatalog, cartCount, onNavigateToContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phonePopoverOpen, setPhonePopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPhonePopoverOpen(false);
      }
    }
    if (phonePopoverOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [phonePopoverOpen]);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(STORE_INFO.phoneDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#1A1715]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no descriptor tags) */}
        <a
          href="#principal"
          className="font-serif text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1A1715] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D3A3E]"
        >
          {STORE_INFO.brandName}
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#544B45]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#1A1715] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#7D3A3E] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D3A3E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Top-bar explicit actions ("Catálogo" + Contact Phone Button) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Phone contact button */}
          <div className="relative" ref={popoverRef}>
            <button
              type="button"
              onClick={() => setPhonePopoverOpen((prev) => !prev)}
              aria-expanded={phonePopoverOpen}
              aria-label={`Teléfono de contacto ${STORE_INFO.phoneDisplay}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1A1715] bg-[#F1ECE4] hover:bg-[#E6DFD3] rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D3A3E]"
            >
              <Phone className="w-3.5 h-3.5 text-[#7D3A3E]" aria-hidden="true" />
              <span className="tabular-nums">{STORE_INFO.phoneDisplay}</span>
            </button>

            {phonePopoverOpen && (
              <div
                role="dialog"
                aria-label="Opciones de contacto telefónico"
                className="absolute right-0 mt-2 w-72 bg-white border border-[#1A1715]/10 rounded-lg shadow-lg p-4 z-50"
              >
                <p className="text-xs font-medium text-[#6B5D54] mb-1">
                  Atención directa en el local
                </p>
                <p className="text-base font-semibold text-[#1A1715] tabular-nums mb-3">
                  {STORE_INFO.phoneDisplay}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={STORE_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-white bg-[#1A1715] hover:bg-[#322C28] rounded-md transition-colors min-h-[40px]"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    Llamar ahora
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-[#1A1715] bg-[#F4F0EA] hover:bg-[#EAE3D8] rounded-md transition-colors min-h-[40px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#3B6E4C]" aria-hidden="true" />
                        Número copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        Copiar número
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhonePopoverOpen(false);
                      onNavigateToContact();
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-[#7D3A3E] hover:bg-[#7D3A3E]/5 rounded-md transition-colors min-h-[40px]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    Ir al formulario personalizado
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action: Catalogo button */}
          <button
            type="button"
            onClick={onOpenCatalog}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#7D3A3E] hover:bg-[#662D31] rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D3A3E]"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Catálogo</span>
            {cartCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-semibold bg-white text-[#7D3A3E] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#1A1715] rounded-md hover:bg-[#EFEAE2] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#1A1715]/10 px-5 py-4 space-y-3">
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[#2D2723] hover:text-[#7D3A3E] border-b border-[#1A1715]/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col sm:hidden gap-2">
            <a
              href={STORE_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-medium text-[#1A1715] bg-[#F1ECE4] rounded-md min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#7D3A3E]" aria-hidden="true" />
              <span className="tabular-nums">{STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
