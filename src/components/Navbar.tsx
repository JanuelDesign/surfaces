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
} from 'lucide-react';
import { CategoryId } from '../types';

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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItems = orderItemCount + sampleItemCount;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-xs">
      {/* Top micro bar for corporate info */}
      <div className="bg-[#000000] text-[#64748b] text-[11px] font-medium py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-white/90 font-semibold uppercase tracking-wider text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#ff8407]"></span>
            Catálogo Oficial 2026
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-white/70">
            PULSE SPC • Ultra Mineral Core • Finsa Laminates • TilePULSE Porcelanatos
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <a
            href="https://wa.me/18005550199?text=Hola%20QuickSurfaces,%20deseo%20información%20sobre%20el%20catálogo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#ff8407] hover:text-white transition font-bold"
          >
            <Phone size={12} />
            <span>Atención Especialistas</span>
          </a>
          <span className="hidden sm:inline text-white/40">quicksurfaces.com</span>
        </div>
      </div>

      {/* Main Bento Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between gap-4">
        {/* Brand Logo - Bento Grid Aesthetic */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 bg-[#ff8407] rounded-sm flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            {/* QuickSurfaces logo monogram */}
            <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
              <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2.5" />
              <path d="M10 20 L16 11 L22 20 Z" fill="white" />
              <rect x="13.5" y="15" width="5" height="6" fill="#ff8407" />
            </svg>
          </div>
          <div>
            <div className="flex items-baseline font-bold tracking-tight text-lg sm:text-xl">
              <span className="text-[#000000]">QUICK</span>
              <span className="text-[#ff8407]">SURFACES</span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors ${
              selectedCategory === 'all'
                ? 'text-[#000000] border-b-2 border-[#ff8407]'
                : 'text-[#64748b] hover:text-[#000000]'
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => onSelectCategory('spc-vinyl')}
            className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors ${
              selectedCategory === 'spc-vinyl'
                ? 'text-[#000000] border-b-2 border-[#ff8407]'
                : 'text-[#64748b] hover:text-[#000000]'
            }`}
          >
            Pisos SPC
          </button>
          <button
            onClick={() => onSelectCategory('ultra-mineral')}
            className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors ${
              selectedCategory === 'ultra-mineral'
                ? 'text-[#000000] border-b-2 border-[#ff8407]'
                : 'text-[#64748b] hover:text-[#000000]'
            }`}
          >
            Ultra Mineral
          </button>
          <button
            onClick={onOpenStairsGuide}
            className="text-xs font-semibold uppercase tracking-wider text-[#64748b] hover:text-[#000000] pb-1 transition-colors"
          >
            Gradas & Molduras
          </button>
          <button
            onClick={onOpenVisualizer}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#ff8407] hover:text-[#000000] pb-1 transition-colors"
          >
            <Eye size={13} />
            <span>Visualizador 3D</span>
          </button>
        </nav>

        {/* Search Input - Bento Pill Style */}
        <div className="hidden sm:flex flex-1 max-w-xs relative mx-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar tonos (Polar Pearl, SI-20, HD6, L-1)..."
            className="w-full pl-9 pr-8 py-2 bg-[#e2e8f0]/40 hover:bg-[#e2e8f0]/60 focus:bg-white text-xs font-medium rounded-full border border-[#e2e8f0] focus:border-[#ff8407] outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#000000]"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Visualizer Trigger on Medium screens */}
          <button
            onClick={onOpenVisualizer}
            className="hidden md:flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2e8f0]/40 hover:bg-[#ff8407] hover:text-white text-[#000000] text-xs font-semibold border border-[#e2e8f0] transition"
          >
            <Eye size={14} className="text-[#ff8407]" />
            <span>3D Room</span>
          </button>

          {/* Bento Black Pill Button for Quote / Samples */}
          <button
            onClick={onOpenOrderDrawer}
            className="bg-[#000000] text-white px-5 py-2 text-xs font-semibold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
          >
            <ShoppingCart size={14} className="text-[#ff8407]" />
            <span className="uppercase tracking-wider">
              {totalItems > 0 ? `Cotización (${totalItems})` : 'Mi Cotización (0)'}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#000000] hover:bg-[#e2e8f0]/50 rounded-lg lg:hidden"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por color o código..."
            className="w-full pl-9 pr-8 py-2 bg-[#e2e8f0]/40 text-xs rounded-full border border-[#e2e8f0] focus:outline-none focus:border-[#ff8407]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile expanded drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e2e8f0] bg-white px-4 py-3 space-y-2 animate-in fade-in duration-150">
          <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest px-2 py-1">
            Categorías Principales
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#e2e8f0]/30 hover:bg-[#e2e8f0] text-left text-xs font-semibold text-[#000000]"
          >
            <span>Ver Catálogo Completo</span>
            <span className="text-[10px] bg-[#ff8407] text-white px-2 py-0.5 rounded-full font-bold">2026</span>
          </button>
          <button
            onClick={() => {
              onOpenVisualizer();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50/80 border border-[#ff8407]/20 text-[#ff8407] font-semibold text-xs"
          >
            <span className="flex items-center gap-2">
              <Eye size={15} /> Probar Visualizador 3D de Ambientes
            </span>
            <span className="text-[10px] font-bold">3D Real</span>
          </button>
          <button
            onClick={() => {
              onOpenStairsGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl text-[#000000] font-medium text-xs hover:bg-[#e2e8f0]/40 border border-[#e2e8f0]"
          >
            <Footprints size={15} className="text-[#ff8407]" /> Guía de Gradas, Molduras y Zócalos
          </button>
          <button
            onClick={() => {
              onOpenOrderDrawer();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#000000] text-white font-medium text-xs"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={15} className="text-[#ff8407]" /> Ver Cotización y Muestras
            </span>
            <span className="font-bold text-[#ff8407]">{totalItems} ítems</span>
          </button>
        </div>
      )}
    </header>
  );
};
