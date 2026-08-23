import React from 'react';
import { Phone, Mail, Globe, MapPin, ShieldCheck, Sparkles, Footprints, Layers } from 'lucide-react';
import { CategoryId } from '../types';

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
  return (
    <footer className="bg-[#000000] text-[#64748b] border-t border-white/10 text-xs no-print mt-12">
      {/* Brand values Bento banner */}
      <div className="border-b border-white/10 bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#ff8407] flex items-center justify-center text-white shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Garantía hasta 30 Años</div>
              <div className="text-[11px] text-[#64748b]">Residencial & Comercial</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#ff8407] flex items-center justify-center text-white shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Muestras de Mano</div>
              <div className="text-[11px] text-[#64748b]">Hand Samples Available</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#ff8407] flex items-center justify-center text-white shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">100% Waterproof</div>
              <div className="text-[11px] text-[#64748b]">SPC & Ultra Mineral Core</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-9 h-9 rounded-sm bg-[#ff8407] flex items-center justify-center text-white shrink-0">
              <Footprints size={18} />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Gradas a Medida</div>
              <div className="text-[11px] text-[#64748b]">Double Round & Square</div>
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
              <div className="w-7 h-7 rounded-sm bg-[#ff8407] flex items-center justify-center text-white font-bold text-xs">
                QS
              </div>
              <div className="text-white font-bold text-lg">
                QUICK<span className="text-[#ff8407]">SURFACES</span>
              </div>
            </div>
            <p className="text-[#64748b] text-xs leading-relaxed">
              Catálogo oficial de pisos y superficies arquitectónicas de alta ingeniería con distribución autorizada.
            </p>
            <div className="pt-1">
              <a
                href="https://quicksurfaces.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#ff8407] hover:underline font-semibold flex items-center gap-1"
              >
                <Globe size={13} />
                <span>quicksurfaces.com</span>
              </a>
            </div>
          </div>

          {/* Categorías de Pisos */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Líneas de Pisos</h4>
            <ul className="space-y-1.5 text-[#64748b]">
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  PULSESelect (5.5 mm / 20 Mil)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  PULSEShield XL (6 mm / 9"x60")
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('spc-vinyl')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  XLPULSE Premium (8 mm / 22 Mil)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ultra-mineral')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  UltraPULSE Mineral Core (10 mm)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wood-herringbone')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  PULSEWood Espiga (Herringbone)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('laminate')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  Finsa España (AC6 Clase 33)
                </button>
              </li>
            </ul>
          </div>

          {/* Revestimientos & Terminaciones */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Revestimientos & Perfiles
            </h4>
            <ul className="space-y-1.5 text-[#64748b]">
              <li>
                <button
                  onClick={() => onSelectCategory('porcelain-tiles')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  TilePULSE Porcelanatos 24"x48"
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wall-panels')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  Paneles WPC Fluted Indoor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wall-panels')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  Paneles WPC Exterior 26 mm
                </button>
              </li>
              <li>
                <button onClick={onOpenStairsGuide} className="hover:text-[#ff8407] transition text-left">
                  Gradas Double Rounded & Square
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('moldings')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  Molduras CM T-Molding & Reducer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baseboards')}
                  className="hover:text-[#ff8407] transition text-left"
                >
                  Zócalos BB1x6, BB1x4, BB1x3 Pine
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto & Herramientas */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Herramientas
            </h4>
            <button
              onClick={onOpenVisualizer}
              className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-[#ff8407] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 border border-white/10"
            >
              <Sparkles size={14} className="text-[#ff8407]" />
              <span>Visualizador 3D</span>
            </button>

            <a
              href="https://wa.me/18005550199?text=Hola%20QuickSurfaces,%20necesito%20asesor%C3%ADa%20sobre%20sus%20productos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-[#ff8407] hover:bg-[#e67300] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              <span>WhatsApp Comercial</span>
            </a>

            <div className="pt-2 text-[11px] text-[#64748b]">
              © 2026 QuickSurfaces. Catálogo Interactivo.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
