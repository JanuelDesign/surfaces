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
  Database,
  ExternalLink,
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
  onOpenDatabaseSync?: () => void;
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
  onOpenDatabaseSync,
}) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItems = orderItemCount + sampleItemCount;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#93b2f8]/30 shadow-xs">
      {/* Top micro bar for phone contact & language switcher */}
      <div className="bg-[#0a1680] text-[#93b2f8] text-[11px] font-medium py-1 px-3 sm:px-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1.5 text-[#fbedb0] font-bold uppercase tracking-wider text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#f1b94c] animate-pulse"></span>
            {language === 'en' ? 'SURFACES 2026' : 'SURFACES 2026'}
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-white/90 text-[10px]">
            PULSE SPC • Ultra Mineral Core • Finsa Laminates • Stairs & Moldings
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          {/* Phone Contact */}
          <a
            href="tel:+17866583677"
            className="flex items-center gap-1 text-[#f1b94c] hover:text-[#fbedb0] transition font-bold"
          >
            <Phone size={11} />
            <span>(786) 658-3677</span>
          </a>

          {/* Database Sheet Sync Trigger */}
          {onOpenDatabaseSync && (
            <button
              onClick={onOpenDatabaseSync}
              className="hidden sm:flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition font-bold text-[10px] bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30 cursor-pointer"
              title="Google Sheets Database Integration"
            >
              <Database size={10} />
              <span>Google Sheets Sync</span>
            </button>
          )}

          {/* Top Bar Language Selector */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/20">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
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
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
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

      {/* Main Compact Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-[58px] flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-7 h-7 bg-[#0a1680] rounded-md flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <span className="font-black text-xs tracking-wider text-[#f1b94c]">S</span>
          </div>
          <span className="font-black tracking-wider text-lg sm:text-xl text-[#0a1680]">
            SURFACES
          </span>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-bold uppercase tracking-wider pb-0.5 transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'text-[#0a1680] border-b-2 border-[#0a1680]'
                : 'text-slate-600 hover:text-[#0a1680]'
            }`}
          >
            {language === 'en' ? 'All Products' : 'Todos'}
          </button>
          <button
            onClick={() => onSelectCategory('spc-vinyl')}
            className={`text-xs font-bold uppercase tracking-wider pb-0.5 transition-colors cursor-pointer ${
              selectedCategory === 'spc-vinyl'
                ? 'text-[#0a1680] border-b-2 border-[#0a1680]'
                : 'text-slate-600 hover:text-[#0a1680]'
            }`}
          >
            SPC Vinyl
          </button>
          <button
            onClick={() => onSelectCategory('ultra-mineral')}
            className={`text-xs font-bold uppercase tracking-wider pb-0.5 transition-colors cursor-pointer ${
              selectedCategory === 'ultra-mineral'
                ? 'text-[#0a1680] border-b-2 border-[#0a1680]'
                : 'text-slate-600 hover:text-[#0a1680]'
            }`}
          >
            Ultra Mineral
          </button>
          <button
            onClick={onOpenStairsGuide}
            className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#0a1680] pb-0.5 transition-colors cursor-pointer"
          >
            {t('nav.stairsGuide')}
          </button>
          <a
            href="https://www.roomvo.com/my/flooringwaterproof/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0a1680] hover:text-[#081268] bg-[#93b2f8]/25 hover:bg-[#fbedb0] px-3 py-1 rounded-full cursor-pointer transition border border-[#93b2f8]/40"
            title="Open 3D Room Visualizer"
          >
            <Eye size={13} className="text-[#0a1680]" />
            <span>3D Room</span>
            <ExternalLink size={10} className="text-[#0a1680]/70" />
          </a>
        </nav>

        {/* Compact Search Input */}
        <div className="hidden sm:flex flex-1 max-w-[220px] lg:max-w-[280px] relative mx-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Search color, code, specs...'
                : 'Buscar color, código o espec...'
            }
            className="w-full pl-8 pr-7 py-1.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs font-medium rounded-full border border-slate-200 focus:border-[#0a1680] text-[#0a1680] outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a1680]"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Main Language Switcher Toggle Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0a1680] text-xs font-bold border border-slate-300 transition cursor-pointer"
            title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
          >
            <Globe size={12} className="text-[#0a1680]" />
            <span className={language === 'en' ? 'text-[#0a1680] font-black' : 'text-slate-400'}>EN</span>
            <span className="text-slate-300">/</span>
            <span className={language === 'es' ? 'text-[#0a1680] font-black' : 'text-slate-400'}>ES</span>
          </button>

          {/* Quote / Cart Pill Button */}
          <button
            onClick={onOpenOrderDrawer}
            className="bg-[#0a1680] hover:bg-[#081268] text-white px-3 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 shadow-sm border border-[#93b2f8]/40 shrink-0 cursor-pointer"
          >
            <ShoppingCart size={13} className="text-[#f1b94c]" />
            <span className="uppercase tracking-wider">
              {totalItems > 0
                ? `${language === 'en' ? 'Quote' : 'Cotizar'} (${totalItems})`
                : language === 'en'
                ? 'Quote (0)'
                : 'Cotizar (0)'}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#0a1680] hover:bg-slate-100 rounded-lg md:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden px-3 pb-2 pt-0.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={language === 'en' ? 'Search color, code or specs...' : 'Buscar color, código o espec...'}
            className="w-full pl-8 pr-7 py-1.5 bg-slate-100 text-xs rounded-full border border-slate-200 focus:outline-none focus:border-[#0a1680]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile expanded drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#93b2f8]/30 bg-white px-4 py-3 space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-xs font-bold text-[#0a1680] flex items-center gap-1.5">
              <Globe size={13} /> {language === 'en' ? 'Language:' : 'Idioma:'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-[#0a1680] text-white shadow-xs' : 'bg-white text-slate-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'es' ? 'bg-[#0a1680] text-white shadow-xs' : 'bg-white text-slate-700'
                }`}
              >
                Español
              </button>
            </div>
          </div>

          {onOpenDatabaseSync && (
            <button
              onClick={() => {
                onOpenDatabaseSync();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
            >
              <span className="flex items-center gap-1.5">
                <Database size={14} className="text-emerald-700" />
                Google Sheets Sync
              </span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">Cloud</span>
            </button>
          )}

          <button
            onClick={() => {
              onSelectCategory('all');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-left text-xs font-bold text-[#0a1680]"
          >
            <span>{language === 'en' ? 'View All Products' : 'Ver Todos los Productos'}</span>
            <span className="text-[10px] bg-[#0a1680] text-white px-2 py-0.5 rounded-full font-bold">Catalog</span>
          </button>

          <a
            href="https://www.roomvo.com/my/flooringwaterproof/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-[#93b2f8]/20 border border-[#93b2f8]/40 text-[#0a1680] font-bold text-xs"
          >
            <span className="flex items-center gap-2">
              <Eye size={14} className="text-[#0a1680]" /> 3D Room Visualizer
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold bg-[#f1b94c] text-[#0a1680] px-2 py-0.5 rounded">
              <span>3D</span>
              <ExternalLink size={10} />
            </span>
          </a>

          <button
            onClick={() => {
              onOpenStairsGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl text-[#0a1680] font-bold text-xs hover:bg-slate-50 border border-slate-200"
          >
            <Footprints size={14} className="text-[#f1b94c]" /> {t('nav.stairsGuide')}
          </button>
        </div>
      )}
    </header>
  );
};
