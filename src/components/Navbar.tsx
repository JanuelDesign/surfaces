import React from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Footprints,
  Layers,
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
  onOpenStairsGuide: () => void;
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
  onOpenStairsGuide,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItems = orderItemCount + sampleItemCount;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D9D9D9] shadow-xs">
      {/* Micro top utility bar: Language switch & catalog badge */}
      <div className="bg-[#0B0B0B] text-[#BCBAB4] text-[11px] font-medium py-1 px-4 sm:px-8 flex justify-between items-center border-b border-[#262626]">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-white font-bold uppercase tracking-wider text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            SURFACES 2026
          </span>
          <span className="hidden md:inline text-[#6B6762]">|</span>
          <span className="hidden md:inline text-[#BCBAB4] text-[10px]">
            {language === 'en' ? 'SPC Flooring (5.5mm • 6.0mm • 8.0mm) • Steps • Moldings • Baseboards' : 'Pisos SPC (5.5mm • 6.0mm • 8.0mm) • Gradas • Molduras • Zócalos'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Subtle Top Bar Language Selector */}
          <div className="flex items-center bg-[#262626] rounded-full p-0.5 border border-[#383838]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
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
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4">
        {/* Brand Monogram */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 bg-[#0B0B0B] rounded-lg flex items-center justify-center text-white shadow-xs group-hover:bg-[#262626] transition-colors">
            <span className="font-black text-sm tracking-wider text-white">S</span>
          </div>
          <span className="font-black tracking-wider text-lg sm:text-xl text-[#0B0B0B]">
            SURFACES
          </span>
        </div>

        {/* Center Desktop Category Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0">
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
            onClick={onOpenStairsGuide}
            className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#F5F5F5] hover:bg-[#D9D9D9] px-3 py-1 rounded-full border border-[#D9D9D9] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Footprints size={13} />
            <span>{t('nav.stairsGuide')}</span>
          </button>
        </nav>

        {/* Right Action Controls: Search Button & Quote Drawer */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Search Trigger Button (Opens Modal) */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#0B0B0B] rounded-full border border-[#D9D9D9] hover:border-[#0B0B0B] transition-all text-xs font-medium cursor-pointer shadow-2xs"
            title={language === 'en' ? 'Search catalog (Ctrl+K)' : 'Buscar en catálogo (Ctrl+K)'}
          >
            <Search size={15} className="text-[#0B0B0B]" />
            <span className="hidden sm:inline text-[#6B6762]">
              {searchQuery ? `"${searchQuery}"` : language === 'en' ? 'Search catalog...' : 'Buscar catálogo...'}
            </span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-white border border-[#D9D9D9] rounded text-[#6B6762]">
              ⌘K
            </kbd>
          </button>

          {/* Active Search Filter Badge with Clear button if active */}
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="p-1.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#262626] transition cursor-pointer"
              title="Clear search"
            >
              <X size={13} />
            </button>
          )}

          {/* Quote Drawer Button */}
          <button
            onClick={onOpenOrderDrawer}
            className="bg-[#0B0B0B] hover:bg-[#262626] text-white px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-2 shadow-xs border border-[#0B0B0B] cursor-pointer"
          >
            <ShoppingCart size={14} className="text-white" />
            <span className="uppercase tracking-wider">
              {totalItems > 0
                ? `${language === 'en' ? 'Quote' : 'Cotizar'} (${totalItems})`
                : language === 'en'
                ? 'Quote (0)'
                : 'Cotizar (0)'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0B0B0B] hover:bg-[#F5F5F5] rounded-lg md:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Expanded Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D9D9D9] bg-white px-4 py-4 space-y-2 animate-in fade-in duration-150">
          <button
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#D9D9D9] text-left text-xs font-bold text-[#0B0B0B] border border-[#D9D9D9] transition"
          >
            <Search size={16} />
            <span>{language === 'en' ? 'Search Catalog...' : 'Buscar en el Catálogo...'}</span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('all');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#D9D9D9] text-left text-xs font-bold text-[#0B0B0B] transition"
          >
            <span>{language === 'en' ? 'All Products' : 'Todos los Productos'}</span>
            <span className="text-[10px] bg-[#0B0B0B] text-white px-2 py-0.5 rounded-full font-bold">Catalog</span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('spc-vinyl');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F5F5] text-left text-xs font-bold text-[#0B0B0B] border border-[#D9D9D9] transition"
          >
            <span>SPC Flooring (5.5mm • 6.0mm • 8.0mm)</span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('stair-steps');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F5F5] text-left text-xs font-bold text-[#0B0B0B] border border-[#D9D9D9] transition"
          >
            <span>{language === 'en' ? 'Stair Steps & Treads' : 'Gradas y Peldaños'}</span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('moldings');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F5F5] text-left text-xs font-bold text-[#0B0B0B] border border-[#D9D9D9] transition"
          >
            <span>{language === 'en' ? 'Moldings & Transitions' : 'Molduras y Perfiles'}</span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('baseboards');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F5F5] text-left text-xs font-bold text-[#0B0B0B] border border-[#D9D9D9] transition"
          >
            <span>{language === 'en' ? 'Baseboards (Rodapiés)' : 'Zócalos y Rodapiés'}</span>
          </button>

          <button
            onClick={() => {
              onOpenStairsGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-[#0B0B0B] text-white font-bold text-xs transition"
          >
            <Footprints size={15} className="text-white" />
            <span>{t('nav.stairsGuide')}</span>
          </button>
        </div>
      )}
    </header>
  );
};

