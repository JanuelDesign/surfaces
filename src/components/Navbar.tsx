import React from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { CategoryId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  searchQuery: string;
  onOpenSearch: () => void;
  onClearSearch: () => void;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  orderItemCount: number;
  sampleItemCount: number;
  onOpenOrderDrawer: () => void;
  onOpenDatabaseSync?: () => void;
  onNavigateToGuides?: () => void;
}

export const Navbar: React.FC<Props> = ({
  searchQuery,
  onOpenSearch,
  onClearSearch,
  selectedCategory,
  onSelectCategory,
  orderItemCount,
  sampleItemCount,
  onOpenOrderDrawer,
  onNavigateToGuides,
}) => {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItems = orderItemCount + sampleItemCount;

  // Visual cart bump animation when item is added
  const [isCartBumping, setIsCartBumping] = React.useState(false);
  const prevTotalRef = React.useRef(totalItems);

  React.useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setIsCartBumping(true);
      const timer = setTimeout(() => setIsCartBumping(false), 900);
      return () => clearTimeout(timer);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D9D9D9] shadow-xs">
      {/* Micro top utility bar */}
      <div className="bg-[#0B0B0B] text-[#BCBAB4] text-[11px] font-medium py-1 px-3 sm:px-6 lg:px-8 flex justify-between items-center border-b border-[#262626] overflow-x-hidden">
        <div className="flex items-center gap-2 truncate">
          <span className="flex items-center gap-1.5 text-white font-bold uppercase tracking-wider text-[10px] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            SURFACES
          </span>
          <span className="hidden sm:inline text-[#6B6762]">|</span>
          <span className="hidden sm:inline text-[#BCBAB4] text-[10px] truncate">
            {language === 'en' ? 'SPC Flooring • Steps • Moldings • Baseboards' : 'Pisos SPC • Gradas • Molduras • Zócalos'}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Top Bar Language Selector */}
          <div className="flex items-center bg-[#262626] rounded-full p-0.5 border border-[#383838]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-[#0B0B0B] shadow-xs'
                  : 'text-[#BCBAB4] hover:text-white'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                language === 'es'
                  ? 'bg-white text-[#0B0B0B] shadow-xs'
                  : 'text-[#BCBAB4] hover:text-white'
              }`}
              title="Cambiar a Español"
            >
              ES
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-[60px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#0B0B0B] rounded-lg flex items-center justify-center text-white shadow-xs group-hover:bg-[#262626] transition-colors">
            <span className="font-black text-xs sm:text-sm tracking-wider text-white">S</span>
          </div>
          <span className="font-black tracking-wider text-base sm:text-xl text-[#0B0B0B]">
            SURFACES
          </span>
        </div>

        {/* Center Desktop Category Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-6 shrink-0">
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'text-[#0B0B0B] border-b-2 border-[#0B0B0B]'
                : 'text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            {language === 'en' ? 'All Products' : 'Todos'}
          </button>
          <button
            onClick={() => onSelectCategory('spc-vinyl')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              selectedCategory === 'spc-vinyl'
                ? 'text-[#0B0B0B] border-b-2 border-[#0B0B0B]'
                : 'text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            SPC Flooring
          </button>
          <button
            onClick={() => onSelectCategory('stair-steps')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              selectedCategory === 'stair-steps'
                ? 'text-[#0B0B0B] border-b-2 border-[#0B0B0B]'
                : 'text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            {language === 'en' ? 'Stairs' : 'Gradas'}
          </button>
          <button
            onClick={() => onSelectCategory('moldings')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              selectedCategory === 'moldings'
                ? 'text-[#0B0B0B] border-b-2 border-[#0B0B0B]'
                : 'text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            {language === 'en' ? 'Moldings' : 'Molduras'}
          </button>
          <button
            onClick={() => onSelectCategory('baseboards')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              selectedCategory === 'baseboards'
                ? 'text-[#0B0B0B] border-b-2 border-[#0B0B0B]'
                : 'text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            {language === 'en' ? 'Baseboards' : 'Zócalos'}
          </button>
          <button
            onClick={() => {
              if (onNavigateToGuides) {
                onNavigateToGuides();
              } else {
                const el = document.getElementById('guides-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-xs font-bold uppercase tracking-wider pb-1 text-[#FF7A00] hover:text-[#E06900] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{language === 'en' ? 'PDF Guides' : 'Guías PDF'}</span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 sm:gap-2 p-2 sm:px-3 sm:py-1.5 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#0B0B0B] rounded-full border border-[#D9D9D9] hover:border-[#0B0B0B] transition-all text-xs font-medium cursor-pointer shadow-2xs"
            title={language === 'en' ? 'Search catalog (Ctrl+K)' : 'Buscar en catálogo (Ctrl+K)'}
            aria-label="Search catalog"
          >
            <Search size={15} className="text-[#0B0B0B]" />
            <span className="hidden sm:inline text-[#6B6762] max-w-[120px] truncate">
              {searchQuery ? `"${searchQuery}"` : language === 'en' ? 'Search...' : 'Buscar...'}
            </span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-white border border-[#D9D9D9] rounded text-[#6B6762]">
              ⌘K
            </kbd>
          </button>

          {/* Active Search Clear Button */}
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="p-1.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#262626] transition cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}

          {/* Quote / Cart Button */}
          <button
            onClick={onOpenOrderDrawer}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 sm:gap-2 shadow-xs cursor-pointer min-h-[38px] ${
              isCartBumping
                ? 'bg-[#0B0B0B] text-white ring-2 ring-emerald-400 scale-105 border border-emerald-400'
                : 'bg-[#0B0B0B] hover:bg-[#262626] text-white border border-[#0B0B0B]'
            }`}
            aria-label="Open quote summary"
          >
            <ShoppingCart
              size={14}
              className={`shrink-0 transition-transform ${
                isCartBumping ? 'animate-bounce text-emerald-400' : 'text-white'
              }`}
            />
            <span className="uppercase tracking-wider">
              {totalItems > 0
                ? `${language === 'en' ? 'Quote' : 'Cotizar'} (${totalItems})`
                : language === 'en'
                ? 'Quote'
                : 'Cotizar'}
            </span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0B0B0B] hover:bg-[#F5F5F5] rounded-xl md:hidden cursor-pointer flex items-center justify-center transition border border-[#E5E5E5]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Expanded Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D9D9D9] bg-white px-3.5 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
          {/* Quick Search inside menu */}
          <button
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-3 rounded-xl bg-[#F5F5F5] hover:bg-[#EAEAEA] text-left text-xs font-bold text-[#0B0B0B] border border-[#D9D9D9] transition cursor-pointer min-h-[44px]"
          >
            <Search size={16} className="text-[#0B0B0B]" />
            <span className="text-[#6B6762]">{language === 'en' ? 'Search entire catalog...' : 'Buscar en todo el catálogo...'}</span>
          </button>

          {/* Category Navigation Items */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-bold transition cursor-pointer min-h-[44px] ${
                selectedCategory === 'all'
                  ? 'bg-[#0B0B0B] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border border-[#E5E5E5]'
              }`}
            >
              <span>{language === 'en' ? 'All Catalog Products' : 'Todos los Productos'}</span>
              <ChevronRight size={14} className={selectedCategory === 'all' ? 'text-white' : 'text-[#6B6762]'} />
            </button>

            <button
              onClick={() => {
                onSelectCategory('spc-vinyl');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-bold transition cursor-pointer min-h-[44px] ${
                selectedCategory === 'spc-vinyl'
                  ? 'bg-[#0B0B0B] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border border-[#E5E5E5]'
              }`}
            >
              <span>SPC Flooring</span>
              <ChevronRight size={14} className={selectedCategory === 'spc-vinyl' ? 'text-white' : 'text-[#6B6762]'} />
            </button>

            <button
              onClick={() => {
                onSelectCategory('stair-steps');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-bold transition cursor-pointer min-h-[44px] ${
                selectedCategory === 'stair-steps'
                  ? 'bg-[#0B0B0B] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border border-[#E5E5E5]'
              }`}
            >
              <span>{language === 'en' ? 'Stair Steps & Treads' : 'Gradas y Peldaños para Escaleras'}</span>
              <ChevronRight size={14} className={selectedCategory === 'stair-steps' ? 'text-white' : 'text-[#6B6762]'} />
            </button>

            <button
              onClick={() => {
                onSelectCategory('moldings');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-bold transition cursor-pointer min-h-[44px] ${
                selectedCategory === 'moldings'
                  ? 'bg-[#0B0B0B] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border border-[#E5E5E5]'
              }`}
            >
              <span>{language === 'en' ? 'Moldings & Transitions' : 'Molduras y Transiciones'}</span>
              <ChevronRight size={14} className={selectedCategory === 'moldings' ? 'text-white' : 'text-[#6B6762]'} />
            </button>

            <button
              onClick={() => {
                onSelectCategory('baseboards');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-bold transition cursor-pointer min-h-[44px] ${
                selectedCategory === 'baseboards'
                  ? 'bg-[#0B0B0B] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border border-[#E5E5E5]'
              }`}
            >
              <span>{language === 'en' ? 'Baseboards & Trims' : 'Zócalos y Rodapiés'}</span>
              <ChevronRight size={14} className={selectedCategory === 'baseboards' ? 'text-white' : 'text-[#6B6762]'} />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateToGuides) {
                  onNavigateToGuides();
                } else {
                  const el = document.getElementById('guides-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-bold bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] hover:bg-[#FFEDD5] transition cursor-pointer min-h-[44px]"
            >
              <span>{language === 'en' ? '📄 Installation & Maintenance PDF Guides' : '📄 Guías PDF de Instalación y Mantenimiento'}</span>
              <ChevronRight size={14} className="text-[#EA580C]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
