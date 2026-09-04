import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Layers, Footprints, Sliders, Square } from 'lucide-react';
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

  const matchingProducts = trimmed
    ? products.filter((p) => {
        const matchName = p.name.toLowerCase().includes(trimmed);
        const matchCollection = p.collection.toLowerCase().includes(trimmed);
        const matchSubtitle = p.subtitle.toLowerCase().includes(trimmed);
        const matchThickness = p.specs.totalThickness?.toLowerCase().includes(trimmed);
        const matchWear = p.specs.wearLayer?.toLowerCase().includes(trimmed);
        const matchColor = p.colors.some(
          (c) => c.name.toLowerCase().includes(trimmed) || (c.code && c.code.toLowerCase().includes(trimmed))
        );
        return matchName || matchCollection || matchSubtitle || matchThickness || matchWear || matchColor;
      })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchingProducts.length === 1) {
      onSelectProduct(matchingProducts[0]);
      onClose();
    }
  };

  const getCategoryLabel = (category: CategoryId) => {
    switch (category) {
      case 'spc-vinyl':
        return isEn ? 'SPC Flooring' : 'Pisos SPC';
      case 'stair-steps':
        return isEn ? 'Stair Steps & Treads' : 'Gradas y Peldaños';
      case 'moldings':
        return isEn ? 'Moldings & Transitions' : 'Molduras y Transiciones';
      case 'baseboards':
        return isEn ? 'Baseboards & Trims' : 'Zócalos y Rodapiés';
      default:
        return category;
    }
  };

  const getCategoryFallbackIcon = (category: CategoryId) => {
    switch (category) {
      case 'stair-steps':
        return <Footprints size={18} className="text-[#6B6762]" />;
      case 'moldings':
        return <Sliders size={18} className="text-[#6B6762]" />;
      case 'baseboards':
        return <Square size={18} className="text-[#6B6762]" />;
      default:
        return <Layers size={18} className="text-[#6B6762]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-xl bg-white rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-[#D9D9D9] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative border-b border-[#D9D9D9] p-3.5 sm:p-4 flex items-center gap-3 bg-[#F5F5F5] shrink-0"
        >
          <Search size={20} className="text-[#0B0B0B] shrink-0 ml-1" />
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
                ? 'Search catalog (e.g. 5.5mm, Oak, Double Step, T-Molding)...'
                : 'Buscar catálogo (ej. 5.5mm, Roble, Grada Doble, T-Molding)...'
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
              className="p-1.5 rounded-full text-[#6B6762] hover:text-[#0B0B0B] hover:bg-[#D9D9D9] transition cursor-pointer"
              title="Clear text"
              aria-label="Clear text"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1.5 rounded-xl text-[#6B6762] hover:text-[#0B0B0B] hover:bg-[#D9D9D9] transition cursor-pointer text-xs font-bold"
          >
            {isEn ? 'Close' : 'Cerrar'}
          </button>
        </form>

        {/* Results Body */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {!trimmed ? (
            <div className="text-center py-16 px-4 text-[#6B6762]">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] border border-[#D9D9D9] flex items-center justify-center mx-auto mb-3 text-[#6B6762]">
                <Search size={22} />
              </div>
              <p className="text-sm font-bold text-[#0B0B0B]">
                {isEn ? 'Search Catalog' : 'Buscar en el Catálogo'}
              </p>
              <p className="text-xs text-[#6B6762] mt-1 max-w-xs mx-auto">
                {isEn
                  ? 'Type a collection name, thickness (5.5mm, 6.0mm, 8.0mm), stair profile, or molding.'
                  : 'Escribe el nombre de la colección, espesor (5.5mm, 6.0mm, 8.0mm), grada o moldura.'}
              </p>
            </div>
          ) : matchingProducts.length === 0 ? (
            <div className="text-center py-14 px-4 text-[#6B6762]">
              <p className="text-sm font-bold text-[#0B0B0B]">
                {isEn ? 'No products found' : 'No se encontraron productos'}
              </p>
              <p className="text-xs text-[#6B6762] mt-1">
                {isEn ? `No matching items for "${searchTerm}"` : `Sin coincidencias para "${searchTerm}"`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#EBEBEB]">
              {matchingProducts.map((prod) => {
                const img = prod.coverImage || prod.colors.find((c) => c.image)?.image;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="w-full px-4 py-3 sm:px-5 sm:py-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#F9F9F9] transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#F5F5F5] border border-[#D9D9D9] flex items-center justify-center">
                        {img ? (
                          <img
                            src={img}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          getCategoryFallbackIcon(prod.category)
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-[#0B0B0B] group-hover:text-[#0B0B0B] truncate">
                          {prod.name}
                        </div>
                        <div className="text-xs text-[#6B6762] mt-0.5 truncate">
                          {getCategoryLabel(prod.category)}
                          {prod.specs.totalThickness ? ` • ${prod.specs.totalThickness}` : ''}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#BCBAB4] group-hover:text-[#0B0B0B] transition shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Subtle Result Count Status */}
        {trimmed && matchingProducts.length > 0 && (
          <div className="px-4 py-2.5 bg-[#F5F5F5] border-t border-[#D9D9D9] flex items-center justify-between text-xs text-[#6B6762] shrink-0">
            <span>
              {matchingProducts.length}{' '}
              {isEn
                ? `${matchingProducts.length === 1 ? 'product' : 'products'} found`
                : `${matchingProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}`}
            </span>
            <span className="text-[11px] text-[#6B6762]">
              {isEn ? 'Tap to view specifications' : 'Toca para ver especificaciones'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
