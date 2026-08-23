import React from 'react';
import {
  Search,
  ShoppingCart,
  Eye,
  Sliders,
  Sparkles,
  Phone,
  Layers,
  Menu,
  X,
  Footprints,
  FileText,
  Globe,
} from 'lucide-react';
import { CategoryId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  orderItemCount: number;
  sampleItemCount: number;
  onOpenOrderDrawer: () => void;
  onOpenVisualizer: () => void;
  onOpenStairsGuide: () => void;
}

export const Navbar: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  orderItemCount,
  sampleItemCount,
  onOpenOrderDrawer,
  onOpenVisualizer,
  onOpenStairsGuide,
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItems = orderItemCount + sampleItemCount;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#93b2f8]/30 shadow-xs">
      {/* Top micro bar for corporate info & language switcher */}
      <div className="bg-[#0a1680] text-[#93b2f8] text-[11px] font-medium py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#fbedb0] font-semibold uppercase tracking-wider text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#f1b94c] animate-pulse"></span>
            {language === 'en' ? 'Official 2026 Catalog' : 'Catálogo Oficial 2026'}
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-white/90">
            PULSE SPC • Ultra Mineral Core • Finsa Laminates • TilePULSE Porcelain
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <a
            href="https://wa.me/18005550199?text=Hello%20SURFACES,%20I%20would%20like%20information%20about%20the%20catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#f1b94c] hover:text-[#fbedb0] transition font-bold"
          >
            <Phone size={12} />
            <span>{t('nav.phoneAssistance')}</span>
          </a>
          <span className="hidden sm:inline text-white/60">surfaces.com</span>

          {/* Top Bar Language Selector */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/20">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#f1b94c] text-[#0a1680] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                language === 'es'
                  ? 'bg-[#f1b94c] text-[#0a1680] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Cambiar a Español"
            >
              ES
            </button>
          </div>
        </div>
      </div>

      {/* Main Bento Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 bg-[#0a1680] rounded-sm flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <span className="font-black text-sm tracking-wider text-[#f1b94c]">S</span>
          </div>
          <div>
            <div className="flex items-baseline font-black tracking-wider text-xl sm:text-2xl text-[#0a1680]">
              <span>SURFACES</span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors ${
              selectedCategory === 'all'
                ? 'text-[#0a1680] border-b-2 border-[#0a1680]'
                : 'text-slate-600 hover:text-[#0a1680]'
            }`}
          >
            {language === 'en' ? 'Catalog' : 'Catálogo'}
          </button>
          <button
            onClick={() => onSelectCategory('spc-vinyl')}
            className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors ${
              selectedCategory === 'spc-vinyl'
                ? 'text-[#0a1680] border-b-2 border-[#0a1680]'
                : 'text-slate-600 hover:text-[#0a1680]'
            }`}
          >
            {language === 'en' ? 'SPC Vinyl' : 'Pisos SPC'}
          </button>
          <button
            onClick={() => onSelectCategory('ultra-mineral')}
            className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors ${
              selectedCategory === 'ultra-mineral'
                ? 'text-[#0a1680] border-b-2 border-[#0a1680]'
                : 'text-slate-600 hover:text-[#0a1680]'
            }`}
          >
            {language === 'en' ? 'Ultra Mineral' : 'Ultra Mineral'}
          </button>
          <button
            onClick={onOpenStairsGuide}
            className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-[#0a1680] pb-1 transition-colors"
          >
            {t('nav.stairsGuide')}
          </button>
          <button
            onClick={onOpenVisualizer}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0a1680] hover:text-[#081268] pb-1 transition-colors bg-[#93b2f8]/20 px-2.5 py-1 rounded-full"
          >
            <Eye size={13} className="text-[#0a1680]" />
            <span>{t('nav.visualizer')}</span>
          </button>
        </nav>

        {/* Search Input - Bento Pill Style */}
        <div className="hidden sm:flex flex-1 max-w-xs relative mx-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Search colors, collections, or specs...'
                : 'Buscar colección, color o especificación...'
            }
            className="w-full pl-9 pr-8 py-2 bg-slate-100/70 hover:bg-slate-100 focus:bg-white text-xs font-medium rounded-full border border-slate-200 focus:border-[#0a1680] text-[#0a1680] outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a1680]"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Main Language Switcher Toggle Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0a1680] text-xs font-bold border border-slate-300 transition shadow-2xs"
            title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
          >
            <Globe size={13} className="text-[#0a1680]" />
            <span className={language === 'en' ? 'text-[#0a1680] font-extrabold' : 'text-slate-400'}>EN</span>
            <span className="text-slate-300">/</span>
            <span className={language === 'es' ? 'text-[#0a1680] font-extrabold' : 'text-slate-400'}>ES</span>
          </button>

          {/* Visualizer Trigger on Medium screens */}
          <button
            onClick={onOpenVisualizer}
            className="hidden md:flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#93b2f8]/20 hover:bg-[#0a1680] hover:text-white text-[#0a1680] text-xs font-semibold border border-[#93b2f8]/40 transition"
          >
            <Eye size={14} className="text-[#0a1680]" />
            <span>3D Room</span>
          </button>

          {/* Pill Button for Quote / Samples */}
          <button
            onClick={onOpenOrderDrawer}
            className="bg-[#0a1680] hover:bg-[#081268] text-white px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all flex items-center gap-2 shadow-sm border border-[#93b2f8]/40 shrink-0"
          >
            <ShoppingCart size={14} className="text-[#f1b94c]" />
            <span className="uppercase tracking-wider">
              {totalItems > 0
                ? `${language === 'en' ? 'Quote' : 'Cotización'} (${totalItems})`
                : language === 'en'
                ? 'My Quote (0)'
                : 'Mi Cotización (0)'}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0a1680] hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={language === 'en' ? 'Search by color or code...' : 'Buscar por color o código...'}
            className="w-full pl-9 pr-8 py-2 bg-slate-100 text-xs rounded-full border border-slate-200 focus:outline-none focus:border-[#0a1680]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile expanded drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#93b2f8]/30 bg-white px-4 py-3 space-y-2 animate-in fade-in duration-150">
          {/* Mobile Language Switcher row */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-xs font-bold text-[#0a1680] flex items-center gap-2">
              <Globe size={14} /> {language === 'en' ? 'Language / Idioma' : 'Idioma / Language'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-[#0a1680] text-white shadow-xs' : 'bg-white text-slate-700'
                }`}
              >
                English 🇺🇸
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'es' ? 'bg-[#0a1680] text-white shadow-xs' : 'bg-white text-slate-700'
                }`}
              >
                Español 🇪🇸
              </button>
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1">
            {language === 'en' ? 'Navigation' : 'Navegación'}
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left text-xs font-semibold text-[#0a1680]"
          >
            <span>{language === 'en' ? 'View Full Catalog' : 'Ver Catálogo Completo'}</span>
            <span className="text-[10px] bg-[#0a1680] text-white px-2 py-0.5 rounded-full font-bold">2026</span>
          </button>
          <button
            onClick={() => {
              onOpenVisualizer();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#93b2f8]/20 border border-[#93b2f8]/40 text-[#0a1680] font-semibold text-xs"
          >
            <span className="flex items-center gap-2">
              <Eye size={15} className="text-[#0a1680]" /> {t('nav.visualizer')}
            </span>
            <span className="text-[10px] font-bold bg-[#f1b94c] text-[#0a1680] px-1.5 py-0.5 rounded">3D Real</span>
          </button>
          <button
            onClick={() => {
              onOpenStairsGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl text-[#0a1680] font-medium text-xs hover:bg-slate-50 border border-slate-200"
          >
            <Footprints size={15} className="text-[#f1b94c]" /> {t('nav.stairsGuide')}
          </button>
          <button
            onClick={() => {
              onOpenOrderDrawer();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0a1680] text-white font-medium text-xs"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={15} className="text-[#f1b94c]" /> {t('nav.myQuote')}
            </span>
            <span className="font-bold text-[#fbedb0]">
              {totalItems} {language === 'en' ? 'items' : 'ítems'}
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
