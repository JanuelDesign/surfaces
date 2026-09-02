import React from 'react';
import { ShieldCheck, Sparkles, Footprints, Layers, ExternalLink, FileText } from 'lucide-react';
import { CategoryId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { ROOMVO_VISUALIZER_URL } from '../utils/constants';

interface Props {
  onSelectCategory: (id: CategoryId) => void;
  onOpenVisualizer?: () => void;
  onNavigateToGuides?: () => void;
}

export const Footer: React.FC<Props> = ({
  onSelectCategory,
  onNavigateToGuides,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <footer className="bg-[#0B0B0B] text-[#BCBAB4] border-t border-[#262626] text-xs no-print mt-12">
      {/* Brand values banner */}
      <div className="border-b border-[#262626] bg-[#141414] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-white flex items-center justify-center text-[#0B0B0B] shrink-0 font-bold">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">
                {isEn ? 'Up to 30-Year Warranty' : 'Garantía hasta 30 Años'}
              </div>
              <div className="text-[11px] text-[#BCBAB4]">
                {isEn ? 'Residential & Commercial' : 'Residencial & Comercial'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-white flex items-center justify-center text-[#0B0B0B] shrink-0 font-bold">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">
                {isEn ? 'Hand Samples' : 'Muestras de Mano'}
              </div>
              <div className="text-[11px] text-[#BCBAB4]">
                {isEn ? 'Hand Samples Available' : 'Disponibles para Envío'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-white flex items-center justify-center text-[#0B0B0B] shrink-0 font-bold">
              <Layers size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">100% Waterproof</div>
              <div className="text-[11px] text-[#BCBAB4]">SPC Rigid Core</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-white flex items-center justify-center text-[#0B0B0B] shrink-0 font-bold">
              <Footprints size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">
                {isEn ? 'Custom Matching Stairs' : 'Gradas a Medida'}
              </div>
              <div className="text-[11px] text-[#BCBAB4]">Double Round &amp; Square</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Monogram & Description */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-white flex items-center justify-center text-[#0B0B0B] font-black text-xs">
                S
              </div>
              <div className="text-white font-black text-lg tracking-wider">
                SURFACES
              </div>
            </div>
            <p className="text-[#BCBAB4] text-xs leading-relaxed max-w-sm">
              {isEn
                ? 'Official 2026 manufacturer catalog of architectural SPC rigid core flooring, precision stair treads, transition moldings, and baseboards.'
                : 'Catálogo oficial de fabricante 2026 de pisos SPC rigid core, gradas de precisión, molduras de transición y zócalos.'}
            </p>
          </div>

          {/* Categorías de Pisos y Accesorios */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {isEn ? 'Product Lines' : 'Líneas de Productos'}
            </h4>
            <ul className="space-y-1.5 text-[#BCBAB4]">
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  SPC 5.5 mm (20 Mil Wear Layer)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  SPC 6.0 mm (9" x 60" XL Planks)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  SPC 8.0 mm (22 Mil Commercial)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('stair-steps')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  {isEn ? 'Stair Steps & Treads (Double Round & Square)' : 'Gradas & Peldaños (Double Round & Square)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('moldings')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  {isEn ? 'Moldings & Transitions (T-Molding, Reducers, End Caps)' : 'Molduras & Transiciones (T-Molding, Reducers, Remates)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baseboards')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  {isEn ? 'Baseboards & Trims (Rodapiés Primed Pine & EPS)' : 'Zócalos & Rodapiés (Primed Pine & EPS)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Herramientas Interactivas */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {isEn ? 'Interactive Tools & Downloads' : 'Herramientas y Descargas'}
            </h4>
            <a
              href={ROOMVO_VISUALIZER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white hover:text-[#0B0B0B] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
            >
              <Sparkles size={14} className="text-white" />
              <span>{isEn ? '3D Room Visualizer' : 'Visualizador 3D Roomvo'}</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>

            <button
              onClick={() => {
                if (onNavigateToGuides) {
                  onNavigateToGuides();
                } else {
                  const el = document.getElementById('guides-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-2.5 px-4 rounded-full bg-[#1A1A1A] hover:bg-[#262626] text-[#FF7A00] hover:text-[#FFA14A] text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 border border-[#FF7A00]/30 cursor-pointer"
            >
              <FileText size={14} />
              <span>{isEn ? 'Installation & Care Guides' : 'Guías de Instalación & Uso'}</span>
            </button>

            <div className="pt-2 text-[11px] text-[#6B6762]">
              © 2026 SURFACES. {isEn ? 'Interactive Architectural Catalog.' : 'Catálogo Arquitectónico Interactivo.'}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
