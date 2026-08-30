import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Layers, Footprints, Sliders, Square, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Product, ProductColor, CategoryId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product, color?: ProductColor) => void;
  onSelectCategory: (cat: CategoryId | 'all') => void;
  currentSearchQuery: string;
  onSetSearchQuery: (query: string) => void;
}

export const SearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
  currentSearchQuery,
  onSetSearchQuery,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(currentSearchQuery);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm(currentSearchQuery);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, currentSearchQuery]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = searchTerm.trim().toLowerCase();

  const matchingProducts = products.filter((p) => {
    if (!trimmed) return true;
    const matchName = p.name.toLowerCase().includes(trimmed);
    const matchCollection = p.collection.toLowerCase().includes(trimmed);
    const matchSubtitle = p.subtitle.toLowerCase().includes(trimmed);
    const matchThickness = p.specs.totalThickness?.toLowerCase().includes(trimmed);
    const matchWear = p.specs.wearLayer?.toLowerCase().includes(trimmed);
    const matchColor = p.colors.some(
      (c) => c.name.toLowerCase().includes(trimmed) || (c.code && c.code.toLowerCase().includes(trimmed))
    );
    return matchName || matchCollection || matchSubtitle || matchThickness || matchWear || matchColor;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetSearchQuery(searchTerm);
    onClose();
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchTerm(tag);
    onSetSearchQuery(tag);
  };

  const getCategoryIcon = (category: CategoryId) => {
    switch (category) {
      case 'spc-vinyl':
        return <Layers size={14} className="text-[#0B0B0B]" />;
      case 'stair-steps':
        return <Footprints size={14} className="text-[#0B0B0B]" />;
      case 'moldings':
        return <Sliders size={14} className="text-[#0B0B0B]" />;
      case 'baseboards':
        return <Square size={14} className="text-[#0B0B0B]" />;
      default:
        return <Layers size={14} className="text-[#0B0B0B]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D9D9D9] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-[#D9D9D9] p-4 sm:p-5 flex items-center gap-3 bg-[#F5F5F5]">
          <Search size={20} className="text-[#0B0B0B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSetSearchQuery(e.target.value);
            }}
            placeholder={
              isEn
                ? 'Search thickness (5.5mm, 6.0mm, 8.0mm), color codes (05, 02), stairs, moldings...'
                : 'Buscar espesores (5.5mm, 6.0mm, 8.0mm), códigos de color (05, 02), gradas, molduras...'
            }
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#0B0B0B] placeholder-[#6B6762] outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSetSearchQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-[#6B6762] hover:text-[#0B0B0B] hover:bg-[#D9D9D9] transition cursor-pointer"
              title="Clear text"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B6762] hover:text-[#0B0B0B] hover:bg-[#D9D9D9] transition cursor-pointer text-xs font-semibold"
          >
            ESC
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2.5 bg-white border-b border-[#D9D9D9] flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-[#6B6762] shrink-0 uppercase tracking-wider">
            {isEn ? 'Quick Filters:' : 'Filtros rápidos:'}
          </span>
          {['5.5 mm', '6.0 mm', '8.0 mm', 'Double Rounded', 'Square Step', 'T-Molding', 'Reducer', 'BB1x6', 'EPS'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleQuickTagClick(tag)}
              className="px-2.5 py-1 rounded-full bg-[#F5F5F5] hover:bg-[#0B0B0B] hover:text-white text-[#0B0B0B] text-[11px] font-medium border border-[#D9D9D9] transition shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {matchingProducts.length === 0 ? (
            <div className="text-center py-12 text-[#6B6762]">
              <p className="text-sm font-semibold text-[#0B0B0B]">
                {isEn ? 'No products found' : 'No se encontraron productos'}
              </p>
              <p className="text-xs mt-1">
                {isEn
                  ? 'Try searching by thickness (e.g. 5.5 mm, 8.0 mm) or color code.'
                  : 'Prueba buscando por espesor (ej. 5.5 mm, 8.0 mm) o código de color.'}
              </p>
            </div>
          ) : (
            matchingProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="p-3.5 rounded-2xl border border-[#D9D9D9] hover:border-[#0B0B0B] hover:bg-[#F5F5F5] transition flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] border border-[#D9D9D9] flex items-center justify-center shrink-0 group-hover:bg-white transition">
                    {getCategoryIcon(prod.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0B0B0B] group-hover:text-[#0B0B0B]">
                        {prod.name}
                      </span>
                      {prod.specs.totalThickness && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#0B0B0B] font-bold border border-[#D9D9D9]">
                          {prod.specs.totalThickness}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B6762] line-clamp-1">{prod.subtitle}</p>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-[#6B6762] font-semibold">
                        {isEn ? 'Codes:' : 'Códigos:'}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {prod.colors.slice(0, 8).map((c, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-[#F5F5F5] border border-[#D9D9D9] text-[#0B0B0B] font-mono"
                          >
                            <span
                              className="w-2 h-2 rounded-full border border-black/20"
                              style={{ backgroundColor: c.hexColor }}
                            ></span>
                            {c.code || c.name}
                          </span>
                        ))}
                        {prod.colors.length > 8 && (
                          <span className="text-[10px] text-[#6B6762] self-center">
                            +{prod.colors.length - 8}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-[#0B0B0B] opacity-0 group-hover:opacity-100 transition">
                  <span>{isEn ? 'View' : 'Ver'}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#F5F5F5] border-t border-[#D9D9D9] flex items-center justify-between text-xs text-[#6B6762]">
          <div className="flex items-center gap-1.5">
            <CornerDownLeft size={13} />
            <span>{isEn ? 'Press Enter to apply filter or click a product' : 'Presiona Enter para filtrar o haz clic en un producto'}</span>
          </div>
          <button
            onClick={() => {
              onSetSearchQuery(searchTerm);
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white font-bold text-xs transition cursor-pointer"
          >
            {isEn ? 'Apply Search' : 'Aplicar Búsqueda'}
          </button>
        </div>
      </div>
    </div>
  );
};
