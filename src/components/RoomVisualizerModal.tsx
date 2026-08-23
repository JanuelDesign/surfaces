import React, { useState } from 'react';
import {
  X,
  Eye,
  Sun,
  Moon,
  Sparkles,
  Sliders,
  Check,
  Plus,
  Columns,
  Maximize2,
  ShoppingCart,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { Product, ProductColor, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';
import { getSwatchBackground } from '../utils/textureUtils';

interface Props {
  initialProduct?: Product | null;
  initialColor?: ProductColor | null;
  onClose: () => void;
  onAddSample: (product: Product, color: ProductColor) => void;
  onAddToOrder: (product: Product, color: ProductColor) => void;
}

interface RoomScene {
  id: string;
  name: string;
  categoryType: 'flooring' | 'wall' | 'porcelain';
  subtitle: string;
  description: string;
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'living',
    name: 'Sala de Estar Contemporánea',
    categoryType: 'flooring',
    subtitle: 'Living Room con Sofá Moderno y Ventanal',
    description: 'Aprecia la calidez y el reflejo de luz natural en un espacio residencial amplio.',
  },
  {
    id: 'kitchen',
    name: 'Cocina & Isla de Concepto Abierto',
    categoryType: 'flooring',
    subtitle: 'Kitchen Island & Bar Stools',
    description: 'Visualiza la resistencia al agua y el contraste con gabinetes y mesones.',
  },
  {
    id: 'dining',
    name: 'Comedor de Diseño',
    categoryType: 'flooring',
    subtitle: 'Dining Room & Designer Chairs',
    description: 'Perfecto para evaluar pisos de gran formato y patrones Herringbone.',
  },
  {
    id: 'porcelain-lobby',
    name: 'Lobby & Muros de Porcelanato',
    categoryType: 'porcelain',
    subtitle: 'TilePULSE 24"x48" Gran Formato Makrana',
    description: 'Acabados Satin, Glossy y Matte con vetas continuas de mármol.',
  },
  {
    id: 'wall-slat',
    name: 'Muro Acento con Paneles WPC',
    categoryType: 'wall',
    subtitle: 'Indoor Fluted Slat Wall & TV Accent',
    description: 'Ranurado 3D para aportar calidez, textura y absorción acústica.',
  },
  {
    id: 'outdoor-deck',
    name: 'Terraza & Fachada Exterior',
    categoryType: 'wall',
    subtitle: 'Outdoor WPC Composite Panels',
    description: 'Paneles de 26 mm resistentes a los rayos UV e intemperie.',
  },
];

export const RoomVisualizerModal: React.FC<Props> = ({
  initialProduct,
  initialColor,
  onClose,
  onAddSample,
  onAddToOrder,
}) => {
  // Default to initial or first flooring product
  const defaultProd = initialProduct || PRODUCTS[0];
  const [selectedProduct, setSelectedProduct] = useState<Product>(defaultProd);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    initialColor || defaultProd.colors[0]
  );
  const [activeRoomId, setActiveRoomId] = useState<string>('living');
  const [lightingMode, setLightingMode] = useState<'daylight' | 'warm' | 'studio'>('daylight');
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareColor, setCompareColor] = useState<ProductColor>(
    defaultProd.colors[1] || defaultProd.colors[0]
  );
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [sampleSuccess, setSampleSuccess] = useState<boolean>(false);

  const activeRoom = ROOM_SCENES.find((r) => r.id === activeRoomId) || ROOM_SCENES[0];

  const handleProductChange = (prod: Product) => {
    setSelectedProduct(prod);
    setSelectedColor(prod.colors[0]);
    if (prod.colors[1]) {
      setCompareColor(prod.colors[1]);
    }
  };

  const handleSampleClick = () => {
    onAddSample(selectedProduct, selectedColor);
    setSampleSuccess(true);
    setTimeout(() => setSampleSuccess(false), 1500);
  };

  // Lighting classes and overlay filters
  const getLightingOverlay = () => {
    switch (lightingMode) {
      case 'warm':
        return 'bg-gradient-to-tr from-amber-500/15 via-orange-400/10 to-transparent mix-blend-color-burn';
      case 'studio':
        return 'bg-gradient-to-b from-white/10 to-transparent mix-blend-screen';
      case 'daylight':
      default:
        return 'bg-gradient-to-t from-sky-400/5 via-transparent to-transparent';
    }
  };

  const primarySwatchStyle = getSwatchBackground(selectedColor);
  const compareSwatchStyle = getSwatchBackground(compareColor);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div
        className="bg-slate-900 text-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[96vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#ff8407] flex items-center justify-center text-white">
              <Eye size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#ff8407] tracking-wider">
                  Seeing is Believing!
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                  Visualizador Interactivo
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Our Floors, Your Room!
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Compare Toggle */}
            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                isCompareMode
                  ? 'bg-[#ff8407] border-[#ff8407] text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Columns size={14} />
              <span className="hidden sm:inline">Comparar 2 Colores</span>
              <span className="sm:hidden">Comparar</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Visualizer Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Left / Center Stage: The Interactive Room Scene */}
          <div className="lg:col-span-8 p-4 flex flex-col justify-between space-y-3 bg-slate-950 overflow-y-auto">
            {/* Room Scene Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {ROOM_SCENES.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    activeRoomId === room.id
                      ? 'bg-[#ff8407] text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* The Room Canvas / Perspective View */}
            <div className="relative w-full h-72 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl select-none group">
              {/* Back Wall of Room */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                {/* Ceiling & Lighting fixture effect */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-2 bg-white/40 rounded-full blur-md"></div>

                {/* Wall decoration / window / artwork based on scene */}
                {activeRoomId === 'wall-slat' || activeRoomId === 'outdoor-deck' ? (
                  // The wall itself uses the texture!
                  <div
                    className="absolute top-0 left-0 right-0 bottom-24 transition-all duration-300"
                    style={primarySwatchStyle}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                  </div>
                ) : (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center justify-between">
                    <div className="w-1/3 h-full rounded-lg bg-gradient-to-br from-sky-400/20 to-indigo-900/40 border border-sky-300/20 flex flex-col justify-end p-2">
                      <span className="text-[10px] text-sky-200 font-medium">Luz Natural Exterior</span>
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-center space-y-1">
                      <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                      <div className="text-[10px] text-slate-400 mt-2">
                        {selectedProduct.collection} • {selectedColor.name}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* The Perspective Floor Layer */}
              {activeRoomId !== 'wall-slat' && activeRoomId !== 'outdoor-deck' && (
                <div className="absolute bottom-0 left-0 right-0 h-[58%] overflow-hidden">
                  {/* Perspective transform for 3D floor plane */}
                  <div
                    className="w-full h-full origin-bottom"
                    style={{
                      transform: 'perspective(450px) rotateX(42deg) scale(1.35)',
                      transformOrigin: '50% 100%',
                    }}
                  >
                    {isCompareMode ? (
                      // Split Comparison Mode
                      <div className="relative w-full h-full">
                        {/* Side A */}
                        <div
                          className="absolute inset-0 right-1/2 transition-all duration-300 border-r-2 border-white/80"
                          style={{
                            ...primarySwatchStyle,
                            clipPath: `polygon(0 0, ${sliderPosition * 2}% 0, ${sliderPosition * 2}% 100%, 0 100%)`,
                          }}
                        >
                          <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white z-10">
                            {selectedColor.name}
                          </div>
                        </div>
                        {/* Side B */}
                        <div
                          className="absolute inset-0 left-0 transition-all duration-300"
                          style={{
                            ...compareSwatchStyle,
                            clipPath: `polygon(${sliderPosition * 2}% 0, 100% 0, 100% 100%, ${sliderPosition * 2}% 100%)`,
                          }}
                        >
                          <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-[#ff8407] z-10">
                            {compareColor.name}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Single Active Floor
                      <div
                        className="w-full h-full transition-all duration-300"
                        style={primarySwatchStyle}
                      >
                        {/* Realistic plank joint lines & gloss reflections */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Realistic Foreground Room Elements (Couch / Table / Kitchen silhouette) */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-6">
                {/* Lighting overlay layer */}
                <div className={`absolute inset-0 ${getLightingOverlay()}`}></div>

                {/* Furniture Silhouette / Overlay */}
                <div className="relative z-10 flex items-end justify-between">
                  {/* Left sofa element */}
                  <div className="w-48 sm:w-64 h-24 bg-gradient-to-t from-zinc-900 via-zinc-800 to-zinc-700/80 rounded-t-3xl border-t border-zinc-600/50 shadow-2xl p-3 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff8407]"></span>
                      <span className="text-[10px] font-semibold text-zinc-300">
                        {activeRoom.subtitle}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Grosor: {selectedProduct.specs.totalThickness || '5.5 mm - 10 mm'}
                    </div>
                  </div>

                  {/* Right coffee table & accent */}
                  <div className="w-32 sm:w-44 h-16 bg-gradient-to-t from-zinc-950 via-zinc-900 to-zinc-800 rounded-t-2xl border-t border-zinc-700 shadow-xl flex items-center justify-center">
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {selectedColor.code ? `CODE: ${selectedColor.code}` : selectedProduct.collection}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compare Slider bar when in compare mode */}
              {isCompareMode && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-700 flex items-center gap-3 z-20">
                  <span className="text-[10px] font-bold text-white shrink-0">
                    A: {selectedColor.name}
                  </span>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                    aria-label="Ajustar divisor de comparación de colores"
                    className="w-full accent-[#ff8407] cursor-pointer"
                  />
                  <span className="text-[10px] font-bold text-[#ff8407] shrink-0">
                    B: {compareColor.name}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Controls: Lighting and Room descriptions */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">Iluminación del ambiente:</span>
                <div className="flex bg-slate-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setLightingMode('daylight')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition ${
                      lightingMode === 'daylight' ? 'bg-[#ff8407] text-white' : 'text-slate-400'
                    }`}
                  >
                    <Sun size={12} /> Luz Día
                  </button>
                  <button
                    onClick={() => setLightingMode('warm')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition ${
                      lightingMode === 'warm' ? 'bg-[#ff8407] text-white' : 'text-slate-400'
                    }`}
                  >
                    <Moon size={12} /> Cálida
                  </button>
                  <button
                    onClick={() => setLightingMode('studio')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition ${
                      lightingMode === 'studio' ? 'bg-[#ff8407] text-white' : 'text-slate-400'
                    }`}
                  >
                    <Sparkles size={12} /> Estudio
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                {activeRoom.description}
              </div>
            </div>
          </div>

          {/* Right Stage: Product & Swatch Selector Carousel */}
          <div className="lg:col-span-4 p-5 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Collection Switcher */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Colección QuickSurfaces:
                </label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = PRODUCTS.find((p) => p.id === e.target.value);
                    if (found) handleProductChange(found);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[#ff8407] outline-none"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.colors.length} tonos)
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Swatches Grid (Primary Floor) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Tono Activo ({selectedProduct.colors.length}):
                  </span>
                  <span className="text-xs text-[#ff8407] font-extrabold">
                    {selectedColor.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {selectedProduct.colors.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-left border transition ${
                          isSelected
                            ? 'border-[#ff8407] bg-[#ff8407]/15 ring-2 ring-[#ff8407]/30'
                            : 'border-slate-800 hover:border-slate-700 bg-slate-800/60'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-slate-600 shrink-0"
                          style={{ backgroundColor: c.hexColor }}
                        ></span>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{c.name}</div>
                          {c.code && (
                            <div className="text-[10px] text-slate-400 font-mono">{c.code}</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* If in Compare Mode: Selector for Color B */}
              {isCompareMode && (
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-[#ff8407] flex items-center justify-between">
                    <span>Segundo Color a Comparar (B):</span>
                    <span>{compareColor.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={'comp-' + c.name}
                        onClick={() => setCompareColor(c)}
                        title={c.name}
                        className={`w-6 h-6 rounded-full border-2 transition ${
                          compareColor.name === c.name
                            ? 'border-white scale-110 ring-2 ring-[#ff8407]'
                            : 'border-slate-600 hover:border-slate-400'
                        }`}
                        style={{ backgroundColor: c.hexColor }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Specifications */}
              <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/70 text-xs space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Wear Layer:</span>
                  <span className="font-semibold text-white">
                    {selectedProduct.specs.wearLayer || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Espesor Total:</span>
                  <span className="font-semibold text-white">
                    {selectedProduct.specs.totalThickness || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rendimiento:</span>
                  <span className="font-semibold text-[#ff8407]">
                    {selectedProduct.specs.sqftPerBox ? `${selectedProduct.specs.sqftPerBox} sqft/caja` : 'Según medida'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleSampleClick}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 ${
                  sampleSuccess
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {sampleSuccess ? <Check size={16} /> : <Plus size={16} className="text-[#ff8407]" />}
                <span>
                  {sampleSuccess ? 'Muestra Agregada' : `Pedir Muestra de ${selectedColor.name}`}
                </span>
              </button>

              <button
                onClick={() => {
                  onAddToOrder(selectedProduct, selectedColor);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#ff8407] hover:bg-[#e67300] text-white text-xs font-bold shadow-lg shadow-[#ff8407]/20 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                <span>Agregar este Piso al Pedido</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
