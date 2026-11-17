import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Product, ProductShade, formatARS } from '../data/storeData';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, shade: ProductShade) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedShade, setSelectedShade] = useState<ProductShade | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedShade(product.shades[0]);
      setJustAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const activeShade = selectedShade ?? product.shades[0];

  const handleAdd = () => {
    onAddToCart(product, activeShade);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1A1715]/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${product.name}`}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xl overflow-hidden shadow-2xl border border-[#1A1715]/10 grid grid-cols-1 md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle de producto"
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-[#1A1715] hover:bg-white shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Image */}
        <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#EFEAE2]">
          <SafeImage
            src={product.image}
            alt={product.name}
            fallbackLabel={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#6B5D54]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{product.status}</span>
            </div>

            <div>
              <h3 className="font-serif text-3xl font-semibold text-[#1A1715] leading-tight">
                {product.name}
              </h3>
              <p className="text-xl font-semibold text-[#1A1715] tabular-nums mt-2">
                {formatARS(product.price)}
              </p>
            </div>

            <p className="text-sm text-[#544B45] leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-[#5C524B]">
              <p>
                <span className="font-medium text-[#1A1715]">Acabado:</span> {product.finish}
              </p>
              <p>
                <span className="font-medium text-[#1A1715]">Contenido:</span> {product.volume}
              </p>
            </div>

            {/* Shades */}
            <div className="pt-2">
              <p className="text-xs font-medium text-[#1A1715] mb-2.5">
                Tono seleccionado: <span className="text-[#7D3A3E]">{activeShade.name}</span>
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.shades.map((shade) => {
                  const isActive = shade.name === activeShade.name;
                  return (
                    <button
                      key={shade.name}
                      type="button"
                      onClick={() => setSelectedShade(shade)}
                      aria-label={`Tono ${shade.name}`}
                      title={shade.name}
                      className={`w-7 h-7 rounded-full border transition-transform cursor-pointer ${
                        isActive
                          ? 'ring-2 ring-[#7D3A3E] ring-offset-2 scale-110 border-white'
                          : 'border-[#1A1715]/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: shade.hex }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-3 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#7D3A3E] hover:bg-[#662D31] rounded-md transition-colors min-h-[44px] cursor-pointer"
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                Agregado a tu selección
              </>
            ) : (
              'Agregar a mi selección'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
