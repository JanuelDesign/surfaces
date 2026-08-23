import React from 'react';
import { Phone, Mail, Globe, MapPin, ShieldCheck, Sparkles, Footprints, Layers } from 'lucide-react';
import { CategoryId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  onSelectCategory: (id: CategoryId) => void;
  onOpenVisualizer: () => void;
  onOpenStairsGuide: () => void;
}

export const Footer: React.FC<Props> = ({
  onSelectCategory,
  onOpenVisualizer,
  onOpenStairsGuide,
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <footer className="bg-[#0a1680] text-white/70 border-t border-[#93b2f8]/20 text-xs no-print mt-12">
      {/* Brand values Bento banner */}
      <div className="border-b border-[#93b2f8]/20 bg-[#081268] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#f1b94c] flex items-center justify-center text-[#0a1680] shrink-0 font-bold">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">
                {isEn ? 'Up to 30-Year Warranty' : 'Garantía hasta 30 Años'}
              </div>
              <div className="text-[11px] text-[#93b2f8]">
                {isEn ? 'Residential & Commercial' : 'Residencial & Comercial'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#f1b94c] flex items-center justify-center text-[#0a1680] shrink-0 font-bold">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">
                {isEn ? 'Hand Samples' : 'Muestras de Mano'}
              </div>
              <div className="text-[11px] text-[#93b2f8]">
                {isEn ? 'Hand Samples Available' : 'Disponibles para Envío'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#f1b94c] flex items-center justify-center text-[#0a1680] shrink-0 font-bold">
              <Layers size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">100% Waterproof</div>
              <div className="text-[11px] text-[#93b2f8]">SPC & Ultra Mineral Core</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#f1b94c] flex items-center justify-center text-[#0a1680] shrink-0 font-bold">
              <Footprints size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">
                {isEn ? 'Custom Matching Stairs' : 'Gradas a Medida'}
              </div>
              <div className="text-[11px] text-[#93b2f8]">Double Round & Square</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bento Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Monogram & Description */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-[#f1b94c] flex items-center justify-center text-[#0a1680] font-black text-xs">
                S
              </div>
              <div className="text-white font-black text-lg tracking-wider">
                SURFACES
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed">
              {isEn
                ? 'Official catalog of high-engineered architectural flooring and surfaces with authorized distribution.'
                : 'Catálogo oficial de pisos y superficies arquitectónicas de alta ingeniería con distribución autorizada.'}
            </p>
            <div className="pt-1">
              <a
                href="https://surfaces.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#f1b94c] hover:underline font-semibold flex items-center gap-1"
              >
                <Globe size={13} />
                <span>surfaces.com</span>
              </a>
            </div>
          </div>

          {/* Categorías de Pisos */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {isEn ? 'Flooring Lines' : 'Líneas de Pisos'}
            </h4>
            <ul className="space-y-1.5 text-white/70">
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  PULSESelect (5.5 mm / 20 Mil)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  PULSEShield XL (6 mm / 9"x60")
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  XLPULSE Premium (8 mm / 22 Mil)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ultra-mineral')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  UltraPULSE Mineral Core (10 mm)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wood-herringbone')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  PULSEWood {isEn ? 'Herringbone' : 'Espiga (Herringbone)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('laminate')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  Finsa España (AC6 {isEn ? 'Class 33' : 'Clase 33'})
                </button>
              </li>
            </ul>
          </div>

          {/* Revestimientos & Terminaciones */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {isEn ? 'Wall & Trims' : 'Revestimientos & Perfiles'}
            </h4>
            <ul className="space-y-1.5 text-white/70">
              <li>
                <button
                  onClick={() => onSelectCategory('porcelain-tiles')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  TilePULSE {isEn ? 'Porcelain 24"x48"' : 'Porcelanatos 24"x48"'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wall-panels')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  {isEn ? 'Indoor Fluted WPC Panels' : 'Paneles WPC Fluted Indoor'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wall-panels')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  {isEn ? 'Exterior WPC 26 mm Panels' : 'Paneles WPC Exterior 26 mm'}
                </button>
              </li>
              <li>
                <button onClick={onOpenStairsGuide} className="hover:text-[#f1b94c] transition text-left cursor-pointer">
                  {isEn ? 'Double Rounded & Square Stairs' : 'Gradas Double Rounded & Square'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('moldings')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  {isEn ? 'CM T-Molding & Reducer' : 'Molduras CM T-Molding & Reducer'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baseboards')}
                  className="hover:text-[#f1b94c] transition text-left cursor-pointer"
                >
                  {isEn ? 'BB1x6, BB1x4, BB1x3 Pine Baseboards' : 'Zócalos BB1x6, BB1x4, BB1x3 Pine'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto & Herramientas */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {isEn ? 'Interactive Tools' : 'Herramientas'}
            </h4>
            <button
              onClick={onOpenVisualizer}
              className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-[#f1b94c] hover:text-[#0a1680] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
            >
              <Sparkles size={14} className="text-[#f1b94c]" />
              <span>{isEn ? '3D Room Visualizer' : 'Visualizador 3D'}</span>
            </button>

            <a
              href="https://wa.me/18005550199?text=Hello%20SURFACES,%20I%20would%20like%20information%20on%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-[#f1b94c] hover:bg-[#e4ac3f] text-[#0a1680] text-xs font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Phone size={14} />
              <span>{isEn ? 'Commercial WhatsApp' : 'WhatsApp Comercial'}</span>
            </a>

            <div className="pt-2 text-[11px] text-white/50">
              © 2026 SURFACES. {isEn ? 'Interactive Catalog.' : 'Catálogo Interactivo.'}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
