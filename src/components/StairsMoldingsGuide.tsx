import React, { useState } from 'react';
import {
  X,
  Footprints,
  Sliders,
  Square,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';

interface Props {
  onClose: () => void;
  onAddToOrder: (
    product: Product,
    color: ProductColor,
    quantity: number,
    unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces',
    estimatedSqft: number,
    notes?: string
  ) => void;
}

export const StairsMoldingsGuide: React.FC<Props> = ({ onClose, onAddToOrder }) => {
  const [activeTab, setActiveTab] = useState<'stairs' | 'moldings' | 'baseboards'>('stairs');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const stairsProduct = PRODUCTS.find((p) => p.id === 'stair-steps-treads') || PRODUCTS[0];
  const moldingsProduct = PRODUCTS.find((p) => p.id === 'moldings-transitions') || PRODUCTS[0];
  const baseboardsProduct = PRODUCTS.find((p) => p.id === 'baseboards-collection') || PRODUCTS[0];

  const handleQuickAdd = (
    prod: Product,
    colorName: string,
    quantity: number,
    unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces',
    notes: string
  ) => {
    const colorObj = prod.colors.find((c) => c.name === colorName) || prod.colors[0];
    onAddToOrder(prod, colorObj, quantity, unit, 0, notes);
    setAddedItem(colorName);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff8407] flex items-center justify-center text-white">
              <Footprints size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8407]">
                Guía Técnica de Acabados
              </span>
              <h2 className="text-lg font-extrabold text-slate-900">
                Gradas, Molduras & Zócalos QuickSurfaces
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('stairs')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'stairs'
                ? 'border-[#ff8407] text-[#ff8407]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Footprints size={16} />
            <span>Gradas & Escaleras (Stair Treads)</span>
          </button>
          <button
            onClick={() => setActiveTab('moldings')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'moldings'
                ? 'border-[#ff8407] text-[#ff8407]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders size={16} />
            <span>Molduras & Transiciones</span>
          </button>
          <button
            onClick={() => setActiveTab('baseboards')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'baseboards'
                ? 'border-[#ff8407] text-[#ff8407]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Square size={16} />
            <span>Zócalos & Rodapiés (Baseboards)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: STAIRS */}
          {activeTab === 'stairs' && (
            <div className="space-y-6">
              <div className="bg-[#ff8407]/10 border border-[#ff8407]/30 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#ff8407]" />
                  Quality at Every Step: Gradas y Treads a Juego Exacto
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Nuestras gradas se fabrican a medida a juego con el mismo color y acabado de su piso SPC o Laminado, garantizando continuidad visual en toda su residencia o proyecto comercial.
                </p>
              </div>

              {/* Step Profiles: Double Rounded vs Square Step */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Double Rounded */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#ff8407]">Perfil Clásico</span>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-semibold text-slate-700">
                      Disponible en SPC Flooring
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Double Rounded</h4>
                  <p className="text-xs text-slate-600">
                    Borde frontal con doble redondeo suave para mayor ergonomía y seguridad familiar.
                  </p>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <svg viewBox="0 0 200 90" className="w-full h-20 mx-auto">
                      <path
                        d="M 15 30 L 135 30 Q 155 30 155 50 L 155 70 Q 155 80 145 80 L 125 80 Q 115 80 115 70 L 115 50 L 15 50 Z"
                        fill="#ff8407"
                        fillOpacity="0.2"
                        stroke="#ff8407"
                        strokeWidth="2.5"
                      />
                      <text x="65" y="24" fontSize="9" fill="#64748b" textAnchor="middle">Custom Length</text>
                      <text x="175" y="55" fontSize="9" fill="#64748b">1-1/2"</text>
                      <text x="135" y="88" fontSize="9" fill="#64748b">7/8"</text>
                    </svg>
                  </div>

                  <button
                    onClick={() =>
                      handleQuickAdd(
                        stairsProduct,
                        'Double Rounded SPC (All Colors)',
                        12,
                        'pieces',
                        'Gradas perfil Double Rounded SPC'
                      )
                    }
                    className="w-full py-2 bg-slate-900 hover:bg-[#ff8407] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>
                      {addedItem === 'Double Rounded SPC (All Colors)'
                        ? '¡Agregado al Pedido!'
                        : 'Cotizar Gradas Double Rounded'}
                    </span>
                  </button>
                </div>

                {/* Square Step */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#ff8407]">Perfil Moderno</span>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-semibold text-slate-700">
                      Disponible en SPC & Laminate
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Square Step</h4>
                  <p className="text-xs text-slate-600">
                    Borde en ángulo recto de 90 grados para proyectos de diseño minimalista contemporáneo.
                  </p>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <svg viewBox="0 0 200 90" className="w-full h-20 mx-auto">
                      <path
                        d="M 15 30 L 145 30 L 145 75 L 125 75 L 125 50 L 15 50 Z"
                        fill="#0f172a"
                        fillOpacity="0.15"
                        stroke="#0f172a"
                        strokeWidth="2.5"
                      />
                      <text x="65" y="24" fontSize="9" fill="#64748b" textAnchor="middle">Custom Length</text>
                      <text x="170" y="55" fontSize="9" fill="#64748b">1-3/8"</text>
                      <text x="135" y="88" fontSize="9" fill="#64748b">7/8"</text>
                    </svg>
                  </div>

                  <button
                    onClick={() =>
                      handleQuickAdd(
                        stairsProduct,
                        'Square Step SPC (All Colors)',
                        12,
                        'pieces',
                        'Gradas perfil Square Step SPC'
                      )
                    }
                    className="w-full py-2 bg-slate-900 hover:bg-[#ff8407] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>
                      {addedItem === 'Square Step SPC (All Colors)'
                        ? '¡Agregado al Pedido!'
                        : 'Cotizar Gradas Square Step'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Full Steps vs Regular Steps */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-[#ff8407]">
                  Configuraciones de Escalera: Full Steps vs Regular Steps
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                    <div className="font-bold text-white text-sm">Full Steps</div>
                    <p className="text-slate-300 text-[11px]">
                      La grada ocupa todo el ancho de la escalera en una sola pieza monolítica sin uniones intermedias. Soportada en estructura central o paredes laterales.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                    <div className="font-bold text-white text-sm">Regular Steps (con Plancha de Relleno)</div>
                    <p className="text-slate-300 text-[11px]">
                      Usa la nariz frontal de grada combinada con la tabla de piso estándar y contrahuella (riser) en la parte vertical.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MOLDINGS */}
          {activeTab === 'moldings' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Infinite Design Possibilities with Moldings
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Soluciones elegantes y funcionales para transiciones entre diferentes pisos, dilataciones y remates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* CM T-Molding */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#ff8407] uppercase">Transición Nivel</span>
                    <h4 className="text-sm font-bold text-slate-900">CM T-Molding</h4>
                    <div className="text-xs text-slate-500 font-mono">1-3/4” x 3/8”</div>
                    <p className="text-[11px] text-slate-600 mt-2">
                      Proporciona una transición estética y funcional entre dos áreas al mismo nivel.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(moldingsProduct, 'CM T-Molding', 5, 'pieces', 'Moldura CM T-Molding')
                    }
                    className="w-full py-1.5 bg-slate-100 hover:bg-[#ff8407] hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    + Agregar a Cotización
                  </button>
                </div>

                {/* CM Reducer */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#ff8407] uppercase">Desnivel</span>
                    <h4 className="text-sm font-bold text-slate-900">CM Reducer</h4>
                    <div className="text-xs text-slate-500 font-mono">1-3/4” x 3/8”</div>
                    <p className="text-[11px] text-slate-600 mt-2">
                      Ideal para nivelar superficies con diferente altura (ej. piso vinílico a baldosa).
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(moldingsProduct, 'CM Reducer', 5, 'pieces', 'Moldura CM Reducer')
                    }
                    className="w-full py-1.5 bg-slate-100 hover:bg-[#ff8407] hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    + Agregar a Cotización
                  </button>
                </div>

                {/* Standard T-Molding */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#ff8407] uppercase">Estándar</span>
                    <h4 className="text-sm font-bold text-slate-900">T-Molding</h4>
                    <div className="text-xs text-slate-500 font-mono">1-3/4” x 1/4”</div>
                    <p className="text-[11px] text-slate-600 mt-2">
                      Perfecto para unir diferentes tipos de suelo asegurando paso suave.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(moldingsProduct, 'Standard T-Molding', 5, 'pieces', 'Moldura T-Molding estándar')
                    }
                    className="w-full py-1.5 bg-slate-100 hover:bg-[#ff8407] hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    + Agregar a Cotización
                  </button>
                </div>

                {/* Reducer */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#ff8407] uppercase">Estándar</span>
                    <h4 className="text-sm font-bold text-slate-900">Reducer Estándar</h4>
                    <div className="text-xs text-slate-500 font-mono">1-3/4” x 3/8”</div>
                    <p className="text-[11px] text-slate-600 mt-2">
                      Facilita la transición entre pisos de diferentes alturas, versátil.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(moldingsProduct, 'Standard Reducer', 5, 'pieces', 'Moldura Reducer estándar')
                    }
                    className="w-full py-1.5 bg-slate-100 hover:bg-[#ff8407] hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    + Agregar a Cotización
                  </button>
                </div>

                {/* End Cap */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#ff8407] uppercase">Remate Final</span>
                    <h4 className="text-sm font-bold text-slate-900">End Cap</h4>
                    <div className="text-xs text-slate-500 font-mono">1-3/8” x 3/8”</div>
                    <p className="text-[11px] text-slate-600 mt-2">
                      Completa la instalación contra marcos de puertas corredizas y alfombras.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(moldingsProduct, 'End Cap', 5, 'pieces', 'Moldura End Cap')
                    }
                    className="w-full py-1.5 bg-slate-100 hover:bg-[#ff8407] hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    + Agregar a Cotización
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BASEBOARDS */}
          {activeTab === 'baseboards' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Baseboards: Details That Make the Difference
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Zócalos en madera de pino pre-pintado blanco de alta calidad y opciones en polímero EPS impermeable.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* BB1x6 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs">BB1x6 | Pine</div>
                  <div className="text-[11px] text-slate-500">
                    Grosor: 14mm / 18mm • Alto: 5 1/2" • Largo: 16 ft
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(baseboardsProduct, 'BB1x6 Pine (14mm / 18mm)', 10, 'pieces', 'Zócalos BB1x6 Pine 16ft')
                    }
                    className="mt-2 w-full py-1 text-xs bg-slate-100 hover:bg-[#ff8407] hover:text-white rounded font-medium transition"
                  >
                    + Agregar Tiras
                  </button>
                </div>

                {/* BB1x4 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs">BB1x4 | Pine</div>
                  <div className="text-[11px] text-slate-500">
                    Grosor: 14mm / 18mm • Alto: 3 1/2" • Largo: 17 ft
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(baseboardsProduct, 'BB1x4 Pine (14mm / 18mm)', 10, 'pieces', 'Zócalos BB1x4 Pine 17ft')
                    }
                    className="mt-2 w-full py-1 text-xs bg-slate-100 hover:bg-[#ff8407] hover:text-white rounded font-medium transition"
                  >
                    + Agregar Tiras
                  </button>
                </div>

                {/* BB1x3 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs">BB1x3 | Pine</div>
                  <div className="text-[11px] text-slate-500">
                    Grosor: 18mm • Alto: 1 1/2" o 2 1/2" • Largo: 17 ft
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(baseboardsProduct, 'BB1x3 Pine (18mm)', 10, 'pieces', 'Zócalos BB1x3 Pine 17ft')
                    }
                    className="mt-2 w-full py-1 text-xs bg-slate-100 hover:bg-[#ff8407] hover:text-white rounded font-medium transition"
                  >
                    + Agregar Tiras
                  </button>
                </div>

                {/* BB5180 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs">BB5180 | Pine Molded</div>
                  <div className="text-[11px] text-slate-500">
                    Grosor: 14mm • Alto: 5 1/4" • Largo: 16 ft
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(baseboardsProduct, 'BB5180 Molded Pine', 10, 'pieces', 'Zócalos BB5180 Pine 16ft')
                    }
                    className="mt-2 w-full py-1 text-xs bg-slate-100 hover:bg-[#ff8407] hover:text-white rounded font-medium transition"
                  >
                    + Agregar Tiras
                  </button>
                </div>

                {/* BB618 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs">BB618 | Pine</div>
                  <div className="text-[11px] text-slate-500">
                    Grosor: 14mm • Alto: 5 1/2" • Largo: 16 ft
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(baseboardsProduct, 'BB618 Profile Pine', 10, 'pieces', 'Zócalos BB618 Pine 16ft')
                    }
                    className="mt-2 w-full py-1 text-xs bg-slate-100 hover:bg-[#ff8407] hover:text-white rounded font-medium transition"
                  >
                    + Agregar Tiras
                  </button>
                </div>

                {/* Quarter Round EPS */}
                <div className="p-3 bg-orange-50/60 border border-[#ff8407]/30 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                    <span>Quarter Round EPS</span>
                    <span className="text-[9px] bg-[#ff8407] text-white px-1.5 py-0.2 rounded">Waterproof</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    100% Resistente al agua • Largo: 12 ft
                  </div>
                  <button
                    onClick={() =>
                      handleQuickAdd(baseboardsProduct, 'Quarter Round EPS Waterproof', 10, 'pieces', 'Quarter Round EPS 12ft')
                    }
                    className="mt-2 w-full py-1 text-xs bg-white hover:bg-[#ff8407] hover:text-white rounded font-medium border border-slate-200 transition"
                  >
                    + Agregar Tiras
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
