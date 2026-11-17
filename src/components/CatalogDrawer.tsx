import { useState, useMemo } from 'react';
import { X, Search, ShoppingBag, Plus, Minus, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';
import {
  PRODUCTS,
  Product,
  ProductCategory,
  ProductShade,
  formatARS,
  STORE_INFO,
} from '../data/storeData';
import { SafeImage } from './SafeImage';

export interface CartItem {
  product: Product;
  shade: ProductShade;
  quantity: number;
}

interface CatalogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (product: Product, shade: ProductShade) => void;
  onUpdateQty: (productId: string, shadeName: string, delta: number) => void;
  onRemoveFromCart: (productId: string, shadeName: string) => void;
  onClearCart: () => void;
  onSelectProduct: (product: Product) => void;
}

const CATEGORIES: ProductCategory[] = ['Todos', 'Rostro', 'Labios', 'Ojos', 'Brochas'];

export function CatalogDrawer({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onUpdateQty,
  onRemoveFromCart,
  onClearCart,
  onSelectProduct,
}: CatalogDrawerProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'bag'>('catalog');
  const [selectedShades, setSelectedShades] = useState<Record<string, ProductShade>>({});
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'retiro' | 'envio'>('retiro');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'Todos' || product.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  const getActiveShade = (product: Product): ProductShade => {
    return selectedShades[product.id] ?? product.shades[0];
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    setOrderSubmitted(true);
    onClearCart();
  };

  const resetOrderView = () => {
    setOrderSubmitted(false);
    setCustomerName('');
    setCustomerPhone('');
    setActiveTab('catalog');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1A1715]/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Catálogo completo de productos"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#FAF8F5] h-full flex flex-col shadow-2xl border-l border-[#1A1715]/10">
        {/* Top drawer header */}
        <div className="px-6 py-5 border-b border-[#1A1715]/10 bg-white flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#7D3A3E]">
              {STORE_INFO.brandName} · Catálogo oficial
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1715]">
              {activeTab === 'catalog' ? 'Todo lo que vendemos en el local' : 'Tu selección de pedido'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-[#F2EDE5] rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('catalog');
                  setOrderSubmitted(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'catalog'
                    ? 'bg-white text-[#1A1715] shadow-sm'
                    : 'text-[#5C524B] hover:text-[#1A1715]'
                }`}
              >
                Catálogo ({PRODUCTS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bag')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'bag'
                    ? 'bg-white text-[#1A1715] shadow-sm'
                    : 'text-[#5C524B] hover:text-[#1A1715]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Mi pedido ({totalItems})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar catálogo"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#544B45] hover:text-[#1A1715] hover:bg-[#F2EDE5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        {activeTab === 'catalog' ? (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Search and Category Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#1A1715]/10">
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFEAE2] rounded-lg">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeCategory === category
                        ? 'bg-white text-[#1A1715] shadow-sm'
                        : 'text-[#5C524B] hover:text-[#1A1715]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  className="w-4 h-4 text-[#786D65] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar producto o marca..."
                  aria-label="Buscar producto en el catálogo"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#1A1715]/15 rounded-md text-[#1A1715] placeholder:text-[#8A7F77] focus:outline-none focus:border-[#7D3A3E]"
                />
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-xl text-[#2D2723] mb-2">
                  No encontramos cosméticos con esa búsqueda
                </p>
                <p className="text-sm text-[#6B5D54] mb-4">
                  Prueba limpiando el filtro o explorando todas las categorías del local.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('Todos');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-[#1A1715] rounded-md hover:bg-[#322C28] transition-colors cursor-pointer"
                >
                  Ver todo el catálogo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => {
                  const activeShade = getActiveShade(product);
                  return (
                    <article
                      key={product.id}
                      className="bg-white border border-[#1A1715]/10 rounded-lg overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="aspect-[4/3] w-full bg-[#F4F0EA] overflow-hidden text-left cursor-pointer"
                      >
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          fallbackLabel={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        />
                      </button>

                      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#6B5D54] mb-1">
                            <span>{product.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.brand}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.status}</span>
                          </div>

                          <div className="flex items-start justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => onSelectProduct(product)}
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

                          <p className="text-xs text-[#5C524B] mt-1.5 leading-relaxed">
                            {product.shortDescription}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#1A1715]/8 space-y-3">
                          {/* Shade Swatches */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-[#5C524B] truncate">
                              Tono: <strong className="font-medium text-[#1A1715]">{activeShade.name}</strong>
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
                                    aria-label={`Seleccionar tono ${shade.name}`}
                                    className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
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

                          <button
                            type="button"
                            onClick={() => onAddToCart(product, activeShade)}
                            className="w-full py-2.5 px-4 text-xs font-medium text-white bg-[#1A1715] hover:bg-[#7D3A3E] rounded-md transition-colors min-h-[40px] cursor-pointer"
                          >
                            Agregar al pedido
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {orderSubmitted ? (
              <div className="max-w-md mx-auto py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#3B6E4C] mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-semibold text-[#1A1715] mb-2">
                  Reserva recibida en {STORE_INFO.brandName}
                </h3>
                <p className="text-sm text-[#5C524B] mb-6 leading-relaxed">
                  Preparamos tu selección y te contactaremos a la brevedad para confirmar disponibilidad y retiro por {STORE_INFO.address} o envío.
                </p>
                <button
                  type="button"
                  onClick={resetOrderView}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#7D3A3E] hover:bg-[#662D31] rounded-md transition-colors cursor-pointer"
                >
                  Seguir viendo el catálogo
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="w-10 h-10 text-[#9B8E85] mx-auto mb-3" aria-hidden="true" />
                <p className="font-serif text-xl text-[#2D2723] mb-2">
                  Tu selección está vacía
                </p>
                <p className="text-sm text-[#6B5D54] mb-5">
                  Elige labiales, bases, paletas o brochas del catálogo para reservar tu compra.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('catalog')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1A1715] hover:bg-[#322C28] rounded-md transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  Explorar productos
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <ul className="divide-y divide-[#1A1715]/10 bg-white border border-[#1A1715]/10 rounded-lg px-4">
                  {cart.map((item) => (
                    <li
                      key={`${item.product.id}-${item.shade.name}`}
                      className="py-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-[#F4F0EA] shrink-0">
                          <SafeImage
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-[#1A1715] truncate">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-[#6B5D54] mt-0.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-[#1A1715]/20"
                              style={{ backgroundColor: item.shade.hex }}
                            />
                            <span>{item.shade.name}</span>
                          </div>
                          <p className="text-xs font-medium text-[#1A1715] tabular-nums mt-1">
                            {formatARS(item.product.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center border border-[#1A1715]/15 rounded-md">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.shade.name, -1)}
                            aria-label="Disminuir cantidad"
                            className="w-8 h-8 inline-flex items-center justify-center text-[#544B45] hover:text-[#1A1715] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, item.shade.name, 1)}
                            aria-label="Aumentar cantidad"
                            className="w-8 h-8 inline-flex items-center justify-center text-[#544B45] hover:text-[#1A1715] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveFromCart(item.product.id, item.shade.name)}
                          aria-label={`Quitar ${item.product.name}`}
                          className="p-2 text-[#8A7F77] hover:text-[#7D3A3E] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Order confirmation form */}
                <form
                  onSubmit={handleOrderSubmit}
                  className="bg-white border border-[#1A1715]/10 rounded-lg p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#1A1715]/10">
                    <span className="text-sm text-[#5C524B]">Total estimado de tu selección</span>
                    <span className="text-xl font-semibold text-[#1A1715] tabular-nums">
                      {formatARS(subtotal)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('retiro')}
                      className={`py-2 px-3 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                        deliveryMode === 'retiro'
                          ? 'bg-[#1A1715] text-white border-[#1A1715]'
                          : 'bg-[#FAF8F5] text-[#544B45] border-[#1A1715]/15'
                      }`}
                    >
                      Retiro en el local (Sin cargo)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('envio')}
                      className={`py-2 px-3 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                        deliveryMode === 'envio'
                          ? 'bg-[#1A1715] text-white border-[#1A1715]'
                          : 'bg-[#FAF8F5] text-[#544B45] border-[#1A1715]/15'
                      }`}
                    >
                      Envío a domicilio
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="catalog-name" className="block text-xs font-medium text-[#544B45] mb-1">
                        Nombre completo
                      </label>
                      <input
                        id="catalog-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#1A1715]/15 rounded-md focus:outline-none focus:border-[#7D3A3E]"
                      />
                    </div>
                    <div>
                      <label htmlFor="catalog-phone" className="block text-xs font-medium text-[#544B45] mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="catalog-phone"
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+54 11 ..."
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#1A1715]/15 rounded-md focus:outline-none focus:border-[#7D3A3E]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm font-medium text-white bg-[#7D3A3E] hover:bg-[#662D31] rounded-md transition-colors cursor-pointer"
                  >
                    Confirmar reserva en el local
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
