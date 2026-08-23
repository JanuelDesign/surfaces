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
import { getSwatchBackground } from '../utils/textureUtils';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedProducts } from '../i18n/localizedData';

interface Props {
  initialProduct?: Product | null;
  initialColor?: ProductColor | null;
  onClose: () => void;
  onAddSample: (product: Product, color: ProductColor) => void;
  onAddToOrder: (product: Product, color: ProductColor) => void;
}

interface RoomScene {
  id: string;
  nameEn: string;
  nameEs: string;
  categoryType: 'flooring' | 'wall' | 'porcelain';
  subtitleEn: string;
  subtitleEs: string;
  descriptionEn: string;
  descriptionEs: string;
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'living',
    nameEn: 'Contemporary Living Room',
    nameEs: 'Sala de Estar Contemporánea',
    categoryType: 'flooring',
    subtitleEn: 'Living Room with Modern Sofa & Panoramic Window',
    subtitleEs: 'Living Room con Sofá Moderno y Ventanal',
    descriptionEn: 'Experience natural light warmth and plank reflection in a spacious residential setting.',
    descriptionEs: 'Aprecia la calidez y el reflejo de luz natural en un espacio residencial amplio.',
  },
  {
    id: 'kitchen',
    nameEn: 'Open Concept Kitchen & Island',
    nameEs: 'Cocina & Isla de Concepto Abierto',
    categoryType: 'flooring',
    subtitleEn: 'Kitchen Island & Bar Stools',
    subtitleEs: 'Kitchen Island & Bar Stools',
    descriptionEn: 'Check waterproof resilience and elegant contrast with cabinetry and quartz counters.',
    descriptionEs: 'Visualiza la resistencia al agua y el contraste con gabinetes y mesones.',
  },
  {
    id: 'dining',
    nameEn: 'Designer Dining Room',
    nameEs: 'Comedor de Diseño',
    categoryType: 'flooring',
    subtitleEn: 'Dining Room & Designer Chairs',
    subtitleEs: 'Dining Room & Designer Chairs',
    descriptionEn: 'Ideal for evaluating extra-wide XL formats and herringbone patterns.',
    descriptionEs: 'Perfecto para evaluar pisos de gran formato y patrones Herringbone.',
  },
  {
    id: 'porcelain-lobby',
    nameEn: 'Lobby & Porcelain Feature Walls',
    nameEs: 'Lobby & Muros de Porcelanato',
    categoryType: 'porcelain',
    subtitleEn: 'TilePULSE 24"x48" Large Format Makrana',
    subtitleEs: 'TilePULSE 24"x48" Gran Formato Makrana',
    descriptionEn: 'Satin, Glossy, and Matte finishes with continuous Italian-style marble veining.',
    descriptionEs: 'Acabados Satin, Glossy y Matte con vetas continuas de mármol.',
  },
  {
    id: 'wall-slat',
    nameEn: 'Accent Wall with WPC Acoustic Slats',
    nameEs: 'Muro Acento con Paneles WPC',
    categoryType: 'wall',
    subtitleEn: 'Indoor Fluted Slat Wall & TV Accent',
    subtitleEs: 'Indoor Fluted Slat Wall & TV Accent',
    descriptionEn: '3D fluted structure for acoustic comfort and warm interior depth.',
    descriptionEs: 'Ranurado 3D para aportar calidez, textura y absorción acústica.',
  },
  {
    id: 'outdoor-deck',
    nameEn: 'Outdoor Terrace & Cladding Deck',
    nameEs: 'Terraza & Fachada Exterior',
    categoryType: 'wall',
    subtitleEn: 'Outdoor WPC Composite Panels',
    subtitleEs: 'Outdoor WPC Composite Panels',
    descriptionEn: '26 mm thick exterior panels engineered for UV and extreme weather resistance.',
    descriptionEs: 'Paneles de 26 mm resistentes a los rayos UV e intemperie.',
  },
];

export const RoomVisualizerModal: React.FC<Props> = ({
  initialProduct,
  initialColor,
  onClose,
  onAddSample,
  onAddToOrder,
}) => {
  const { language, t } = useLanguage();
  const products = getLocalizedProducts(language);

  // Default to initial or first flooring product
  const defaultProd = initialProduct || products[0];
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
  const roomName = language === 'en' ? activeRoom.nameEn : activeRoom.nameEs;
  const roomSubtitle = language === 'en' ? activeRoom.subtitleEn : activeRoom.subtitleEs;
  const roomDesc = language === 'en' ? activeRoom.descriptionEn : activeRoom.descriptionEs;

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
            <div className="w-8 h-8 rounded-xl bg-[#0a1680] flex items-center justify-center text-white shadow-md shadow-[#0a1680]/30">
              <Eye size={18} className="text-[#f1b94c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#93b2f8] tracking-wider">
                  Seeing is Believing!
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                  {language === 'en' ? 'Interactive 3D Room Visualizer' : 'Visualizador Interactivo'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                {language === 'en' ? 'Our Surfaces, Your Real Space' : 'Nuestros Pisos en Tu Espacio Real'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Compare Toggle */}
            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isCompareMode
                  ? 'bg-[#0a1680] border-[#93b2f8] text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Columns size={14} />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Compare 2 Colors' : 'Comparar 2 Colores'}
              </span>
              <span className="sm:hidden">{language === 'en' ? 'Compare' : 'Comparar'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Close visualizer"
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
              {ROOM_SCENES.map((room) => {
                const isSelected = activeRoomId === room.id;
                const rName = language === 'en' ? room.nameEn : room.nameEs;
                return (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#0a1680] text-white shadow-md border border-[#93b2f8]/40'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {rName}
                  </button>
                );
              })}
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
                      <span className="text-[10px] text-sky-200 font-medium">
                        {language === 'en' ? 'Natural Window Lighting' : 'Luz Natural Exterior'}
                      </span>
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
                          <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-[#f1b94c] z-10">
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
                      <span className="w-2 h-2 rounded-full bg-[#f1b94c]"></span>
                      <span className="text-[10px] font-semibold text-zinc-300">
                        {roomSubtitle}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {language === 'en' ? 'Thickness' : 'Grosor'}: {selectedProduct.specs.totalThickness || '5.5 mm - 10 mm'}
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
                    aria-label="Adjust color comparison divider"
                    className="w-full accent-[#f1b94c] cursor-pointer"
                  />
                  <span className="text-[10px] font-bold text-[#f1b94c] shrink-0">
                    B: {compareColor.name}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Controls: Lighting and Room descriptions */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">
                  {language === 'en' ? 'Atmosphere Lighting:' : 'Iluminación del ambiente:'}
                </span>
                <div className="flex bg-slate-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setLightingMode('daylight')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer ${
                      lightingMode === 'daylight' ? 'bg-[#0a1680] text-white' : 'text-slate-400'
                    }`}
                  >
                    <Sun size={12} /> {language === 'en' ? 'Daylight' : 'Luz Día'}
                  </button>
                  <button
                    onClick={() => setLightingMode('warm')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer ${
                      lightingMode === 'warm' ? 'bg-[#0a1680] text-white' : 'text-slate-400'
                    }`}
                  >
                    <Moon size={12} /> {language === 'en' ? 'Warm Evening' : 'Cálida'}
                  </button>
                  <button
                    onClick={() => setLightingMode('studio')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer ${
                      lightingMode === 'studio' ? 'bg-[#0a1680] text-white' : 'text-slate-400'
                    }`}
                  >
                    <Sparkles size={12} /> {language === 'en' ? 'Studio Pure' : 'Estudio'}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                {roomDesc}
              </div>
            </div>
          </div>

          {/* Right Stage: Product & Swatch Selector Carousel */}
          <div className="lg:col-span-4 p-5 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Collection Switcher */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {language === 'en' ? 'SURFACES Collection:' : 'Colección SURFACES:'}
                </label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = products.find((p) => p.id === e.target.value);
                    if (found) handleProductChange(found);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-[#93b2f8] outline-none cursor-pointer"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.colors.length} {language === 'en' ? 'colors' : 'tonos'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Swatches Grid (Primary Floor) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {language === 'en'
                      ? `Active Color (${selectedProduct.colors.length}):`
                      : `Tono Activo (${selectedProduct.colors.length}):`}
                  </span>
                  <span className="text-xs text-[#f1b94c] font-extrabold">
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
                        className={`flex items-center gap-2 p-2 rounded-xl text-left border transition cursor-pointer ${
                          isSelected
                            ? 'border-[#f1b94c] bg-[#f1b94c]/15 ring-2 ring-[#f1b94c]/30'
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
                  <div className="text-xs font-bold text-[#f1b94c] flex items-center justify-between">
                    <span>{language === 'en' ? 'Secondary Comparison Color (B):' : 'Segundo Color a Comparar (B):'}</span>
                    <span>{compareColor.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={'comp-' + c.name}
                        onClick={() => setCompareColor(c)}
                        title={c.name}
                        className={`w-6 h-6 rounded-full border-2 transition cursor-pointer ${
                          compareColor.name === c.name
                            ? 'border-[#f1b94c] scale-110 ring-2 ring-[#f1b94c]'
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
                  <span className="text-slate-400">{t('detailModal.wearLayer')}:</span>
                  <span className="font-semibold text-white">
                    {selectedProduct.specs.wearLayer || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('productCard.thickness')}:</span>
                  <span className="font-semibold text-white">
                    {selectedProduct.specs.totalThickness || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('detailModal.boxSqft')}:</span>
                  <span className="font-semibold text-[#93b2f8]">
                    {selectedProduct.specs.sqftPerBox ? `${selectedProduct.specs.sqftPerBox} sqft/${language === 'en' ? 'box' : 'caja'}` : (language === 'en' ? 'By dimension' : 'Según medida')}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleSampleClick}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                  sampleSuccess
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {sampleSuccess ? <Check size={16} /> : <Plus size={16} className="text-[#f1b94c]" />}
                <span>
                  {sampleSuccess
                    ? (language === 'en' ? 'Sample Added to List' : 'Muestra Agregada')
                    : (language === 'en' ? `Order Hand Sample: ${selectedColor.name}` : `Pedir Muestra de ${selectedColor.name}`)}
                </span>
              </button>

              <button
                onClick={() => {
                  onAddToOrder(selectedProduct, selectedColor);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0a1680] hover:bg-[#081268] text-white text-xs font-bold shadow-lg shadow-[#0a1680]/30 transition flex items-center justify-center gap-2 border border-[#93b2f8]/30 cursor-pointer"
              >
                <ShoppingCart size={16} className="text-[#f1b94c]" />
                <span>{language === 'en' ? 'Add This Surface to Quote' : 'Agregar este Piso al Pedido'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
