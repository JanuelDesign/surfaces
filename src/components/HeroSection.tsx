import React from 'react';
import { Eye, Package, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Layers, Footprints } from 'lucide-react';
import { CategoryId } from '../types';

interface Props {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenVisualizer: () => void;
  onOpenOrderDrawer: () => void;
}

export const HeroSection: React.FC<Props> = ({
  onSelectCategory,
  onOpenVisualizer,
  onOpenOrderDrawer,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Bento Tile 1: Main Feature Display (Spans 2 columns on desktop) */}
        <div className="lg:col-span-2 bg-[#000000] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-black relative overflow-hidden group min-h-[300px]">
          {/* Subtle background glow effect */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#ff8407]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff8407]/25 transition duration-500"></div>
          <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full border-[20px] border-white/5 pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff8407] text-white text-[11px] font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>COLECCIÓN OFICIAL 2026</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[11px] font-medium border border-white/10">
                100% Waterproof & AC6
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-xl">
              Superficies y Pisos de <span className="text-[#ff8407]">Alta Ingeniería</span>
            </h1>

            <p className="text-white/70 text-xs sm:text-sm max-w-lg leading-relaxed font-light">
              Explora nuestra gama de pisos <strong>SPC Rigid Core</strong>, <strong>Ultra Mineral Core</strong>, laminados europeos <strong>Finsa</strong>, porcelanatos rectificados y gradas de precisión.
            </p>
          </div>

          <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenVisualizer}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff8407] hover:bg-[#e67300] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition transform hover:scale-102"
            >
              <Eye size={15} />
              <span>Ver en Visualizador 3D</span>
            </button>
            <button
              onClick={onOpenOrderDrawer}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 transition"
            >
              <Package size={15} className="text-[#ff8407]" />
              <span>Solicitar Muestras</span>
            </button>
          </div>
        </div>

        {/* Bento Tile 2: PULSESelect & XL (SPC Vinyl Tile) */}
        <div
          onClick={() => onSelectCategory('spc-vinyl')}
          className="bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:border-[#ff8407] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff8407] bg-orange-50 px-2 py-0.5 rounded-sm">
                SPC RIGID CORE
              </span>
              <ArrowRight size={14} className="text-[#64748b] group-hover:text-[#ff8407] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#000000] mt-2 group-hover:text-[#ff8407] transition">
              PULSESelect & XL
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              5.5mm a 8mm de espesor con capa de uso de 20 a 22 Mil y base IXPE acústica.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
            <span className="font-semibold text-[#000000]">Residencial / Comercial</span>
            <span className="text-[#ff8407] font-bold">Ver Modelos →</span>
          </div>
        </div>

        {/* Bento Tile 3: Ultra Mineral Core Tile */}
        <div
          onClick={() => onSelectCategory('ultra-mineral')}
          className="bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:border-[#ff8407] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff8407] bg-orange-50 px-2 py-0.5 rounded-sm">
                MINERAL CORE
              </span>
              <ArrowRight size={14} className="text-[#64748b] group-hover:text-[#ff8407] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#000000] mt-2 group-hover:text-[#ff8407] transition">
              UltraPULSE 10mm
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              Núcleo mineral de 8mm + 2mm IXPE, clasificación AC5 y resistencia superior a rayaduras.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
            <span className="font-semibold text-[#000000]">Tráfico Pesado AC5</span>
            <span className="text-[#ff8407] font-bold">Ver Modelos →</span>
          </div>
        </div>

        {/* Bento Tile 4: Porcelain Tiles & Paneles WPC */}
        <div
          onClick={() => onSelectCategory('porcelain-tiles')}
          className="bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:border-[#ff8407] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff8407] bg-orange-50 px-2 py-0.5 rounded-sm">
                PORCELANATOS
              </span>
              <ArrowRight size={14} className="text-[#64748b] group-hover:text-[#ff8407] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#000000] mt-2 group-hover:text-[#ff8407] transition">
              TilePULSE 24"x48"
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              Bordes rectificados en acabados Satin, Glossy y Matte Makrana para muros y pisos.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
            <span className="font-semibold text-[#000000]">Acabado Mármol & Piedra</span>
            <span className="text-[#ff8407] font-bold">Ver Diseños →</span>
          </div>
        </div>

        {/* Bento Tile 5: Wall Panels & Muros Acústicos */}
        <div
          onClick={() => onSelectCategory('wall-panels')}
          className="bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:border-[#ff8407] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff8407] bg-orange-50 px-2 py-0.5 rounded-sm">
                MUROS & ACÚSTICA
              </span>
              <ArrowRight size={14} className="text-[#64748b] group-hover:text-[#ff8407] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#000000] mt-2 group-hover:text-[#ff8407] transition">
              Paneles WPC Slat
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              Listones decorativos acústicos para interiores y revestimiento exterior resistente a UV.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
            <span className="font-semibold text-[#000000]">Absorción Acústica</span>
            <span className="text-[#ff8407] font-bold">Ver Opciones →</span>
          </div>
        </div>
      </div>
    </section>
  );
};
