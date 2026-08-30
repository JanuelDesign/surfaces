import React, { useState, useEffect } from 'react';
import {
  X,
  Footprints,
  Sliders,
  Square,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowLeft,
  Layers,
  Calculator,
  Check,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShoppingCart,
  Download,
  Info,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedProducts } from '../i18n/localizedData';
import {
  STAIR_PROFILES,
  STAIR_EXAMPLE_CARDS,
  MOLDING_IMAGES,
  BASEBOARD_IMAGES,
} from '../utils/imageCatalog';

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
  orderCount?: number;
  onOpenOrderDrawer?: () => void;
}

interface FullViewData {
  title: string;
  subtitle?: string;
  imageUrl: string;
  dimensions?: string;
  category?: string;
  type: 'cad' | 'photo';
  specs?: { label: string; value: string }[];
  itemForQuote?: {
    product: Product;
    colorName: string;
    quantity: number;
    unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces';
    notes: string;
  };
}

export const StairsMoldingsGuide: React.FC<Props> = ({
  onClose,
  onAddToOrder,
  orderCount = 0,
  onOpenOrderDrawer,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const products = getLocalizedProducts(language);

  const [activeTab, setActiveTab] = useState<'stairs' | 'moldings' | 'baseboards'>('stairs');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'both' | 'diagram' | 'photo'>('both');
  const [cardViewMap, setCardViewMap] = useState<Record<string, 'diagram' | 'photo'>>({});

  // Full view modal state
  const [fullViewData, setFullViewData] = useState<FullViewData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Keyboard navigation: Esc to close full view or close guide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullViewData) {
          setFullViewData(null);
          setZoomLevel(1);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullViewData, onClose]);

  const toggleCardView = (cardId: string, type: 'diagram' | 'photo') => {
    setCardViewMap((prev) => ({ ...prev, [cardId]: type }));
  };

  const getEffectiveView = (cardId: string): 'diagram' | 'photo' | 'both' => {
    if (displayMode === 'both') return 'both';
    return cardViewMap[cardId] || displayMode;
  };

  // Stair Calculator States
  const [stairStepsCount, setStairStepsCount] = useState<number>(14);
  const [stairTreadLength, setStairTreadLength] = useState<string>('48"');
  const [stairProfileChoice, setStairProfileChoice] = useState<'DoubleRounded' | 'SquareStep'>('DoubleRounded');
  const [includeMatchingRisers, setIncludeMatchingRisers] = useState<boolean>(true);
  const [openEndReturns, setOpenEndReturns] = useState<'none' | 'left' | 'right' | 'both'>('none');

  const stairsProduct = products.find((p) => p.id === 'stair-steps-treads') || products[0];
  const moldingsProduct = products.find((p) => p.id === 'moldings-transitions') || products[0];
  const baseboardsProduct = products.find((p) => p.id === 'baseboards-collection') || products[0];

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
    setTimeout(() => setAddedItem(null), 1800);
  };

  const handleAddStairPackage = () => {
    const colorObj = stairsProduct.colors[0] || { name: 'Color-Matched to Floor', hexColor: '#c7b28e' };
    const notes = `Custom Stair Package: ${stairStepsCount} Steps (${stairTreadLength} length), Profile: ${stairProfileChoice}, Risers: ${
      includeMatchingRisers ? 'Yes (Matching)' : 'No (White/Paint)'
    }, Open Returns: ${openEndReturns}`;
    onAddToOrder(stairsProduct, colorObj, stairStepsCount, 'pieces', 0, notes);
    setAddedItem('stair-calc-package');
    setTimeout(() => setAddedItem(null), 2200);
  };

  const openImageFullView = (data: FullViewData) => {
    setZoomLevel(1);
    setFullViewData(data);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col w-full h-full overflow-hidden animate-in fade-in duration-200">
      {/* Sticky Full-Width Page Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#D9D9D9] shadow-xs shrink-0">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Back Button & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F5] hover:bg-[#D9D9D9] text-[#0B0B0B] text-xs font-bold transition cursor-pointer border border-[#D9D9D9]"
              title={isEn ? 'Back to Catalog' : 'Volver al Catálogo'}
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{isEn ? 'Back to Catalog' : 'Volver al Catálogo'}</span>
              <span className="sm:hidden">{isEn ? 'Back' : 'Atrás'}</span>
            </button>

            <div className="h-6 w-px bg-[#D9D9D9] hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] flex items-center justify-center text-white shadow-xs">
                <Footprints size={17} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-[#0B0B0B] tracking-tight leading-tight">
                  {isEn ? 'Stairs, Moldings & Baseboards Technical Guide' : 'Guía Técnica de Gradas, Molduras & Zócalos'}
                </h1>
                <p className="text-[11px] text-[#6B6762] font-medium hidden md:block">
                  {isEn
                    ? 'CAD Blueprints, 3D Architectural Views & Material Specifications'
                    : 'Planos CAD, Renders 3D y Especificaciones Técnicas Oficiales'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenOrderDrawer && orderCount > 0 && (
              <button
                onClick={onOpenOrderDrawer}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <ShoppingCart size={14} className="text-white" />
                <span>{isEn ? `Quote (${orderCount})` : `Cotizar (${orderCount})`}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#D9D9D9] text-[#0B0B0B] flex items-center justify-center transition cursor-pointer border border-[#D9D9D9]"
              aria-label="Close"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Full-Width Tab & Mode Navigation Bar */}
        <div className="w-full bg-white border-t border-[#D9D9D9] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1 sm:py-0">
          <div className="flex overflow-x-auto space-x-1 sm:space-x-4 no-scrollbar">
            <button
              onClick={() => setActiveTab('stairs')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'stairs'
                  ? 'border-[#0B0B0B] text-[#0B0B0B]'
                  : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
              }`}
            >
              <Footprints size={15} />
              <span>{isEn ? '1. Stairs & Treads' : '1. Gradas & Escaleras'}</span>
            </button>
            <button
              onClick={() => setActiveTab('moldings')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'moldings'
                  ? 'border-[#0B0B0B] text-[#0B0B0B]'
                  : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
              }`}
            >
              <Sliders size={15} />
              <span>{isEn ? '2. Moldings & Transitions' : '2. Molduras & Transiciones'}</span>
            </button>
            <button
              onClick={() => setActiveTab('baseboards')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'baseboards'
                  ? 'border-[#0B0B0B] text-[#0B0B0B]'
                  : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
              }`}
            >
              <Square size={15} />
              <span>{isEn ? '3. Baseboards & Trim' : '3. Zócalos & Rodapiés'}</span>
            </button>
          </div>

          {/* Visual Display Mode Selector */}
          <div className="flex items-center gap-1 bg-[#F5F5F5] p-1 rounded-xl text-[11px] font-semibold self-start sm:self-auto mb-2 sm:mb-0 border border-[#D9D9D9]">
            <button
              onClick={() => setDisplayMode('both')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                displayMode === 'both'
                  ? 'bg-white text-[#0B0B0B] shadow-xs font-bold'
                  : 'text-[#6B6762] hover:text-[#0B0B0B]'
              }`}
            >
              {isEn ? 'Dual (CAD + 3D)' : 'Ambos (CAD + 3D)'}
            </button>
            <button
              onClick={() => setDisplayMode('diagram')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                displayMode === 'diagram'
                  ? 'bg-white text-[#0B0B0B] shadow-xs font-bold'
                  : 'text-[#6B6762] hover:text-[#0B0B0B]'
              }`}
            >
              {isEn ? 'CAD Blueprint' : 'Plano CAD'}
            </button>
            <button
              onClick={() => setDisplayMode('photo')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                displayMode === 'photo'
                  ? 'bg-white text-[#0B0B0B] shadow-xs font-bold'
                  : 'text-[#6B6762] hover:text-[#0B0B0B]'
              }`}
            >
              {isEn ? '3D Photo' : 'Foto 3D'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Width Scrollable Content */}
      <main className="flex-1 overflow-y-auto w-full bg-[#FFFFFF]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          {/* TAB 1: STAIRS & TREADS */}
          {activeTab === 'stairs' && (
            <div className="space-y-8">
              {/* Informative Banner */}
              <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl p-5">
                <h3 className="text-sm sm:text-base font-bold text-[#0B0B0B] flex items-center gap-2">
                  <Sparkles size={18} className="text-[#0B0B0B]" />
                  {isEn
                    ? 'Custom-Fabricated Stair Treads & Technical CAD Profiles'
                    : 'Gradas y Huellas a Medida con Planos Técnicos Vectoriales y Renders 3D'}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6762] mt-1 leading-relaxed">
                  {isEn
                    ? 'Our treads are precision crafted from matching SPC flooring boards to maintain flawless color, grain continuity, and abrasion resistance across multi-level staircases.'
                    : 'Nuestras gradas se fabrican a medida a juego con el mismo color y acabado de su piso SPC, garantizando continuidad visual en toda su residencia o proyecto comercial.'}
                </p>
              </div>

              {/* Section 1: Step Profiles (Double Rounded vs Square Step) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0B0B0B]">
                    {isEn ? '1. Technical Profiles & Cross-Section Diagrams' : '1. Perfiles Técnicos & Diagramas de Sección'}
                  </h3>
                  <span className="text-xs text-[#6B6762] font-medium hidden sm:inline">
                    {isEn ? 'Click any diagram or photo for Full View / Zoom' : 'Haz clic en cualquier imagen para ver en Pantalla Completa'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Double Rounded */}
                  <div className="bg-white border border-[#D9D9D9] hover:border-[#0B0B0B] rounded-3xl p-6 space-y-4 shadow-xs transition flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B0B0B] bg-[#F5F5F5] px-2.5 py-0.5 rounded-full border border-[#D9D9D9]">
                          {isEn ? 'CLASSIC COMFORT PROFILE' : 'PERFIL CLÁSICO'}
                        </span>
                        <span className="text-xs font-semibold text-[#6B6762] bg-[#F5F5F5] px-3 py-1 rounded-full">
                          {isEn ? 'Available in SPC' : 'Disponible en SPC'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-2xl font-black text-[#0B0B0B]">Double Rounded</h4>
                        <p className="text-xs sm:text-sm text-[#6B6762] leading-relaxed">
                          {isEn
                            ? 'Smooth front edge with double soft bullnose radius for enhanced safety, ergonomic foot grip, and comfortable daily descent.'
                            : 'Borde frontal con doble redondeo suave para máxima seguridad, ergonomía y confort en la pisada.'}
                        </p>
                      </div>

                      {/* Interactive Diagram with Full-View Zoom Button */}
                      <div
                        onClick={() =>
                          openImageFullView({
                            title: 'Double Rounded Stair Tread Profile',
                            subtitle: isEn ? 'Standard SPC Bullnose Nosing Profile' : 'Perfil SPC con doble redondeo ergonómico',
                            imageUrl: STAIR_PROFILES.DoubleRounded.profileSvg,
                            dimensions: '12" Depth x 48"/60"/72" Length',
                            category: 'Stair Steps & Treads',
                            type: 'cad',
                            specs: [
                              { label: isEn ? 'Profile Type' : 'Tipo de Perfil', value: 'Double Bullnose 12mm' },
                              { label: isEn ? 'Core' : 'Núcleo', value: 'Stone Plastic Composite (SPC)' },
                              { label: isEn ? 'Available Lengths' : 'Largos Disponibles', value: '48", 60", 72"' },
                              { label: isEn ? 'Depth' : 'Profundidad', value: '12" (Standard Nosing)' },
                            ],
                            itemForQuote: {
                              product: stairsProduct,
                              colorName: 'Double Rounded SPC (All Colors)',
                              quantity: 14,
                              unit: 'pieces',
                              notes: 'Double Rounded SPC Stair Treads',
                            },
                          })
                        }
                        className="border border-[#D9D9D9] rounded-2xl p-4 bg-white flex items-center justify-center min-h-[180px] relative group cursor-pointer hover:border-[#0B0B0B] hover:shadow-md transition"
                        title={isEn ? 'Click to inspect blueprint in Full View' : 'Clic para ver plano en pantalla completa'}
                      >
                        <img
                          src={STAIR_PROFILES.DoubleRounded.profileSvg}
                          alt="Double Rounded Profile Diagram"
                          className="w-full max-h-40 object-contain group-hover:scale-102 transition-transform"
                        />
                        <div className="absolute top-3 right-3 bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] p-1.5 rounded-lg border border-[#D9D9D9] shadow-xs flex items-center gap-1 text-[11px] font-bold">
                          <Maximize2 size={13} />
                          <span className="hidden sm:inline">{isEn ? 'Full View' : 'Ampliar'}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleQuickAdd(
                          stairsProduct,
                          'Double Rounded SPC (All Colors)',
                          12,
                          'pieces',
                          isEn ? 'Double Rounded SPC Stair Treads' : 'Gradas perfil Double Rounded SPC'
                        )
                      }
                      className="w-full py-3.5 bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
                    >
                      <Plus size={16} className="text-white" />
                      <span>
                        {addedItem === 'Double Rounded SPC (All Colors)'
                          ? (isEn ? 'Added to Quote!' : '¡Agregado al Pedido!')
                          : (isEn ? '+ Quote Double Rounded Treads' : '+ Cotizar Gradas Double Rounded')}
                      </span>
                    </button>
                  </div>

                  {/* Square Step */}
                  <div className="bg-white border border-[#D9D9D9] hover:border-[#0B0B0B] rounded-3xl p-6 space-y-4 shadow-xs transition flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B0B0B] bg-[#F5F5F5] px-2.5 py-0.5 rounded-full border border-[#D9D9D9]">
                          {isEn ? 'CONTEMPORARY 90° PROFILE' : 'PERFIL MODERNO 90°'}
                        </span>
                        <span className="text-xs font-semibold text-[#6B6762] bg-[#F5F5F5] px-3 py-1 rounded-full">
                          {isEn ? 'Available in SPC' : 'Disponible en SPC'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-2xl font-black text-[#0B0B0B]">Square Step</h4>
                        <p className="text-xs sm:text-sm text-[#6B6762] leading-relaxed">
                          {isEn
                            ? 'Crisp 90-degree squared nosing edge for contemporary architecture and clean geometric lines.'
                            : 'Borde en ángulo recto de 90 grados para proyectos contemporáneos, residencias de diseño y estética minimalista.'}
                        </p>
                      </div>

                      {/* Interactive Diagram with Full-View Zoom Button */}
                      <div
                        onClick={() =>
                          openImageFullView({
                            title: 'Square Step 90° Stair Tread Profile',
                            subtitle: isEn ? 'Modern Right-Angle Architectural Nosing' : 'Perfil en ángulo recto de 90° para SPC',
                            imageUrl: STAIR_PROFILES.SquareStep.profileSvg,
                            dimensions: '12" Depth x 48"/60"/72" Length',
                            category: 'Stair Steps & Treads',
                            type: 'cad',
                            specs: [
                              { label: isEn ? 'Profile Type' : 'Tipo de Perfil', value: 'Square Nosing 90°' },
                              { label: isEn ? 'Core' : 'Núcleo', value: 'Stone Plastic Composite (SPC)' },
                              { label: isEn ? 'Available Lengths' : 'Largos Disponibles', value: '48", 60", 72"' },
                              { label: isEn ? 'Depth' : 'Profundidad', value: '12" (Standard Nosing)' },
                            ],
                            itemForQuote: {
                              product: stairsProduct,
                              colorName: 'Square Step SPC (All Colors)',
                              quantity: 14,
                              unit: 'pieces',
                              notes: 'Square Step 90° Stair Treads',
                            },
                          })
                        }
                        className="border border-[#D9D9D9] rounded-2xl p-4 bg-white flex items-center justify-center min-h-[180px] relative group cursor-pointer hover:border-[#0B0B0B] hover:shadow-md transition"
                        title={isEn ? 'Click to inspect blueprint in Full View' : 'Clic para ver plano en pantalla completa'}
                      >
                        <img
                          src={STAIR_PROFILES.SquareStep.profileSvg}
                          alt="Square Step Profile Diagram"
                          className="w-full max-h-40 object-contain group-hover:scale-102 transition-transform"
                        />
                        <div className="absolute top-3 right-3 bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] p-1.5 rounded-lg border border-[#D9D9D9] shadow-xs flex items-center gap-1 text-[11px] font-bold">
                          <Maximize2 size={13} />
                          <span className="hidden sm:inline">{isEn ? 'Full View' : 'Ampliar'}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleQuickAdd(
                          stairsProduct,
                          'Square Step SPC (All Colors)',
                          12,
                          'pieces',
                          isEn ? 'Square Step SPC Stair Treads' : 'Gradas perfil Square Step SPC'
                        )
                      }
                      className="w-full py-3.5 bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
                    >
                      <Plus size={16} className="text-white" />
                      <span>
                        {addedItem === 'Square Step SPC (All Colors)'
                          ? (isEn ? 'Added to Quote!' : '¡Agregado al Pedido!')
                          : (isEn ? '+ Quote Square Step Treads' : '+ Cotizar Gradas Square Step')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 2: Construction Methods (Full Steps vs Regular Steps) */}
              <div className="bg-[#0B0B0B] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm border border-[#262626] relative overflow-hidden">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#0B0B0B] text-[10px] font-bold uppercase tracking-wider">
                    {isEn ? 'CONSTRUCTION SPECIFICATIONS' : 'MÉTODOS CONSTRUCTIVOS'}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-white">
                    {isEn
                      ? 'Full Steps (Monolithic) vs Regular Steps (Modular Assembly)'
                      : 'Full Steps (Monolíticas de 1 Pieza) vs Regular Steps (Ensamblaje Modular)'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs sm:text-sm">
                  {/* Full Step */}
                  <div className="p-5 bg-[#171717] rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="font-extrabold text-white text-lg sm:text-xl flex items-center justify-between">
                        <span>Full Steps (Monolithic Tread)</span>
                        <span className="text-xs bg-white/10 text-white px-2.5 py-0.5 rounded-full border border-white/20">
                          {isEn ? 'Seamless 1-Piece' : '1 Sola Pieza'}
                        </span>
                      </div>
                      <p className="text-[#BCBAB4] text-xs sm:text-sm leading-relaxed">
                        {isEn
                          ? 'Continuous unbroken single-piece 12" depth tread with integrated front nosing. Zero seams across the step surface. Ideal for open staircases.'
                          : 'Grada continua de una sola pieza monolítica de 12" de profundidad con nariz integrada. Cero uniones sobre la superficie. Ideal para escaleras de alto diseño.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div
                        onClick={() =>
                          openImageFullView({
                            title: 'Full Step Monolithic Blueprint',
                            imageUrl: STAIR_PROFILES.FullStep.profileSvg,
                            dimensions: '12" Depth x 48"/60" Length',
                            category: 'Monolithic Stair Steps',
                            type: 'cad',
                          })
                        }
                        className="rounded-xl overflow-hidden border border-white/15 bg-black p-3 flex flex-col items-center justify-center min-h-[140px] relative group cursor-pointer hover:border-white/40 transition"
                      >
                        <img src={STAIR_PROFILES.FullStep.profileSvg} alt="Full Step Blueprint" className="w-full h-28 object-contain" />
                        <span className="absolute bottom-2 left-2 bg-black/80 text-[9px] text-white px-2 py-0.5 rounded font-mono flex items-center gap-1">
                          <Maximize2 size={10} /> CAD BLUEPRINT
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          openImageFullView({
                            title: 'Full Step 3D Architectural View',
                            imageUrl: STAIR_PROFILES.FullStep.photoUrl,
                            dimensions: 'Monolithic Floating Tread',
                            category: '3D Render & Installation',
                            type: 'photo',
                          })
                        }
                        className="rounded-xl overflow-hidden border border-white/15 bg-black p-3 flex flex-col items-center justify-center min-h-[140px] relative group cursor-pointer hover:border-white/40 transition"
                      >
                        <img src={STAIR_PROFILES.FullStep.photoUrl} alt="Full Step 3D View" className="w-full h-28 object-contain" />
                        <span className="absolute bottom-2 left-2 bg-black/80 text-[9px] text-white px-2 py-0.5 rounded font-mono flex items-center gap-1">
                          <Maximize2 size={10} /> 3D RENDER
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Regular Step */}
                  <div className="p-5 bg-[#171717] rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="font-extrabold text-white text-lg sm:text-xl flex items-center justify-between">
                        <span>Regular Steps (Modular)</span>
                        <span className="text-xs bg-white/10 text-white px-2.5 py-0.5 rounded-full border border-white/20">
                          {isEn ? 'Modular System' : 'Sistema Modular'}
                        </span>
                      </div>
                      <p className="text-[#BCBAB4] text-xs sm:text-sm leading-relaxed">
                        {isEn
                          ? 'Modular system combining the front nose tread piece with matching flooring planks and matching or crisp white risers.'
                          : 'Sistema modular que une la nariz frontal con tablas estándar de piso y contrahuella (riser) a juego o blanca.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div
                        onClick={() =>
                          openImageFullView({
                            title: 'Regular Step Blueprint',
                            imageUrl: STAIR_PROFILES.RegularStep.profileSvg,
                            dimensions: 'Front Nose + Planks Assembly',
                            category: 'Modular Stair Steps',
                            type: 'cad',
                          })
                        }
                        className="rounded-xl overflow-hidden border border-white/15 bg-black p-3 flex flex-col items-center justify-center min-h-[140px] relative group cursor-pointer hover:border-white/40 transition"
                      >
                        <img src={STAIR_PROFILES.RegularStep.profileSvg} alt="Regular Step Blueprint" className="w-full h-28 object-contain" />
                        <span className="absolute bottom-2 left-2 bg-black/80 text-[9px] text-white px-2 py-0.5 rounded font-mono flex items-center gap-1">
                          <Maximize2 size={10} /> CAD BLUEPRINT
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          openImageFullView({
                            title: 'Regular Step 3D Assembly View',
                            imageUrl: STAIR_PROFILES.RegularStep.photoUrl,
                            dimensions: 'Modular Tread + Riser',
                            category: '3D Render & Installation',
                            type: 'photo',
                          })
                        }
                        className="rounded-xl overflow-hidden border border-white/15 bg-black p-3 flex flex-col items-center justify-center min-h-[140px] relative group cursor-pointer hover:border-white/40 transition"
                      >
                        <img src={STAIR_PROFILES.RegularStep.photoUrl} alt="Regular Step 3D View" className="w-full h-28 object-contain" />
                        <span className="absolute bottom-2 left-2 bg-black/80 text-[9px] text-white px-2 py-0.5 rounded font-mono flex items-center gap-1">
                          <Maximize2 size={10} /> 3D RENDER
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: 4 Rich Architectural Example Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0B0B0B]">
                      {isEn ? '3. Step Applications & Real Architectural Layouts' : '3. Aplicaciones y Diseños de Escaleras Reales'}
                    </h3>
                    <p className="text-xs text-[#6B6762] mt-0.5">
                      {isEn
                        ? 'High-resolution renders and technical specifications for diverse architectural staircase formats'
                        : 'Renders en alta resolución y especificaciones técnicas para los distintos tipos de instalación'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {STAIR_EXAMPLE_CARDS.map((card) => (
                    <div
                      key={card.id}
                      className="bg-white border border-[#D9D9D9] hover:border-[#0B0B0B] rounded-3xl p-5 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div
                          onClick={() =>
                            openImageFullView({
                              title: isEn ? card.titleEn : card.titleEs,
                              subtitle: isEn ? card.subtitleEn : card.subtitleEs,
                              imageUrl: card.imageSvg,
                              dimensions: card.dimensions,
                              category: card.category,
                              type: 'photo',
                              specs: card.tags.map((t) => ({ label: 'Spec', value: t })),
                              itemForQuote: {
                                product: stairsProduct,
                                colorName: isEn ? card.titleEn : card.titleEs,
                                quantity: 14,
                                unit: 'pieces',
                                notes: `Stair Configuration: ${isEn ? card.titleEn : card.titleEs}`,
                              },
                            })
                          }
                          className="rounded-2xl overflow-hidden border border-[#D9D9D9] bg-black p-2 relative group cursor-pointer"
                        >
                          <img
                            src={card.imageSvg}
                            alt={isEn ? card.titleEn : card.titleEs}
                            className="w-full h-56 object-contain group-hover:scale-102 transition-transform"
                          />
                          <div className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white p-2 rounded-xl border border-white/20 shadow-md flex items-center gap-1.5 text-xs font-bold">
                            <Maximize2 size={14} className="text-white" />
                            <span>{isEn ? 'Full View' : 'Ver Pantalla Completa'}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#0B0B0B] uppercase tracking-wide bg-[#F5F5F5] px-2 py-0.5 rounded border border-[#D9D9D9]">
                              {card.category}
                            </span>
                            <span className="text-xs text-[#6B6762] font-mono font-semibold">{card.dimensions}</span>
                          </div>
                          <h4 className="text-base font-extrabold text-[#0B0B0B]">
                            {isEn ? card.titleEn : card.titleEs}
                          </h4>
                          <p className="text-xs text-[#6B6762] leading-relaxed">
                            {isEn ? card.subtitleEn : card.subtitleEs}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {card.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#F5F5F5] text-[#0B0B0B] px-2.5 py-1 rounded-md font-medium border border-[#D9D9D9]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleQuickAdd(
                            stairsProduct,
                            isEn ? card.titleEn : card.titleEs,
                            14,
                            'pieces',
                            isEn ? `Configuration: ${card.titleEn}` : `Configuración: ${card.titleEs}`
                          )
                        }
                        className="w-full py-2.5 bg-[#F5F5F5] hover:bg-[#0B0B0B] hover:text-white text-[#0B0B0B] text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer mt-2 border border-[#D9D9D9]"
                      >
                        <Plus size={15} />
                        <span>{isEn ? 'Add this Stair Configuration' : 'Cotizar esta Configuración'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Stair Package Configurator */}
              <div className="bg-white border border-[#D9D9D9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] flex items-center justify-center text-white">
                    <Calculator size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#0B0B0B]">
                      {isEn ? 'Staircase Calculator & Custom Quote Builder' : 'Calculadora de Escaleras y Cotizador a Medida'}
                    </h4>
                    <p className="text-xs text-[#6B6762]">
                      {isEn
                        ? 'Calculate exact treads, matching risers, and side returns for your staircase'
                        : 'Calcula huellas, contrahuellas a juego y retornos laterales para tu obra'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  {/* Step Count */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0B0B0B] block">
                      {isEn ? 'Number of Steps:' : 'Número de Gradas:'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={stairStepsCount}
                      onChange={(e) => setStairStepsCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] font-bold focus:border-[#0B0B0B] focus:bg-white outline-none"
                    />
                  </div>

                  {/* Tread Length */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0B0B0B] block">
                      {isEn ? 'Tread Length:' : 'Largo de Grada:'}
                    </label>
                    <select
                      value={stairTreadLength}
                      onChange={(e) => setStairTreadLength(e.target.value)}
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] font-bold focus:border-[#0B0B0B] focus:bg-white outline-none"
                    >
                      <option value='48"'>48" (Standard / Estándar)</option>
                      <option value='60"'>60" (Wide / Amplia)</option>
                      <option value='72"'>72" (Grand / Extra)</option>
                    </select>
                  </div>

                  {/* Profile choice */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0B0B0B] block">
                      {isEn ? 'Nosing Profile:' : 'Perfil de Nariz:'}
                    </label>
                    <select
                      value={stairProfileChoice}
                      onChange={(e) => setStairProfileChoice(e.target.value as any)}
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] font-bold focus:border-[#0B0B0B] focus:bg-white outline-none"
                    >
                      <option value="DoubleRounded">Double Rounded (SPC)</option>
                      <option value="SquareStep">Square Step 90° (SPC)</option>
                    </select>
                  </div>

                  {/* Open-end returns */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0B0B0B] block">
                      {isEn ? 'Open Side Miter Caps:' : 'Terminales Laterales:'}
                    </label>
                    <select
                      value={openEndReturns}
                      onChange={(e) => setOpenEndReturns(e.target.value as any)}
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] font-bold focus:border-[#0B0B0B] focus:bg-white outline-none"
                    >
                      <option value="none">{isEn ? 'None (Closed between walls)' : 'Ninguno (Entre paredes)'}</option>
                      <option value="left">{isEn ? 'Left Open End' : 'Abierto a la Izquierda'}</option>
                      <option value="right">{isEn ? 'Right Open End' : 'Abierto a la Derecha'}</option>
                      <option value="both">{isEn ? 'Both Sides Open' : 'Abierto Ambos Lados'}</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2.5 text-xs font-semibold text-[#0B0B0B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeMatchingRisers}
                      onChange={(e) => setIncludeMatchingRisers(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0B0B0B]"
                    />
                    <span>
                      {isEn
                        ? 'Include Color-Matched Vertical Risers (Contrahuellas a juego)'
                        : 'Incluir Contrahuellas (Risers) en el mismo tono del piso'}
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleAddStairPackage}
                  className="w-full py-3.5 bg-[#0B0B0B] hover:bg-[#262626] text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  {addedItem === 'stair-calc-package' ? <Check size={18} /> : <Plus size={18} className="text-white" />}
                  <span>
                    {addedItem === 'stair-calc-package'
                      ? (isEn ? 'Stair Package Added to Quote!' : '¡Paquete de Escalera Agregado a la Cotización!')
                      : (isEn
                          ? `Add ${stairStepsCount} Steps Package (${stairTreadLength}) to Quote`
                          : `Agregar Paquete de ${stairStepsCount} Gradas (${stairTreadLength}) al Pedido`)}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MOLDINGS & TRANSITIONS */}
          {activeTab === 'moldings' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#D9D9D9] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B0B0B]">
                    {isEn ? 'Color-Matched Moldings & Transition Profiles' : 'Molduras de Transición y Terminaciones a Juego Exacto'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6762] mt-1 max-w-3xl leading-relaxed">
                    {isEn
                      ? 'Complete selection of transition profiles: CM and standard T-Moldings for level joints, reducers for gradual height drops, and end caps for sliding glass doors and carpet edges.'
                      : 'Colección completa de molduras: T-Molding para uniones al mismo nivel, Reductores para desniveles suaves, y Terminales (End Caps) para puertas correderas y transiciones a alfombra.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(MOLDING_IMAGES).map(([key, molding]) => {
                  const cardView = getEffectiveView(`molding-${key}`);
                  return (
                    <div
                      key={key}
                      className="bg-white border border-[#D9D9D9] hover:border-[#0B0B0B] rounded-3xl p-5 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#0B0B0B] uppercase bg-[#F5F5F5] px-2.5 py-0.5 rounded-full border border-[#D9D9D9]">
                            {molding.dimensions}
                          </span>
                          <div className="flex items-center gap-1 bg-[#F5F5F5] p-0.5 rounded-lg border border-[#D9D9D9]">
                            <button
                              onClick={() => toggleCardView(`molding-${key}`, 'diagram')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                cardView === 'diagram' ? 'bg-[#0B0B0B] text-white' : 'text-[#6B6762]'
                              }`}
                            >
                              {isEn ? 'CAD' : 'Plano'}
                            </button>
                            <button
                              onClick={() => toggleCardView(`molding-${key}`, 'photo')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                cardView === 'photo' ? 'bg-[#0B0B0B] text-white' : 'text-[#6B6762]'
                              }`}
                            >
                              {isEn ? '3D' : 'Foto'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-[#0B0B0B]">{key.replace('-', ' ')}</h4>
                          <p className="text-xs text-[#6B6762] line-clamp-2 mt-0.5">{molding.description}</p>
                        </div>

                        {/* Visual Display with Click-to-Zoom */}
                        {cardView === 'both' ? (
                          <div className="grid grid-cols-2 gap-2">
                            <div
                              onClick={() =>
                                openImageFullView({
                                  title: `${key.replace('-', ' ')} CAD Blueprint`,
                                  subtitle: molding.description,
                                  imageUrl: molding.profileSvg,
                                  dimensions: molding.dimensions,
                                  category: 'Transition Moldings',
                                  type: 'cad',
                                })
                              }
                              className="rounded-2xl overflow-hidden border border-[#D9D9D9] bg-white p-2.5 flex items-center justify-center min-h-[140px] relative group cursor-pointer hover:border-[#0B0B0B] transition"
                              title={isEn ? 'Click for Full View' : 'Clic para pantalla completa'}
                            >
                              <img src={molding.profileSvg} alt={`${key} Diagram`} className="w-full h-28 object-contain" />
                              <span className="absolute bottom-1.5 left-1.5 bg-[#F5F5F5] text-[8px] text-[#0B0B0B] font-bold px-1.5 py-0.5 rounded border border-[#D9D9D9] flex items-center gap-1">
                                <Maximize2 size={9} /> CAD
                              </span>
                            </div>

                            <div
                              onClick={() =>
                                openImageFullView({
                                  title: `${key.replace('-', ' ')} 3D Render`,
                                  subtitle: molding.description,
                                  imageUrl: molding.photoUrl,
                                  dimensions: molding.dimensions,
                                  category: 'Transition Moldings',
                                  type: 'photo',
                                })
                              }
                              className="rounded-2xl overflow-hidden border border-[#D9D9D9] bg-black p-2.5 flex items-center justify-center min-h-[140px] relative group cursor-pointer hover:border-[#0B0B0B] transition"
                              title={isEn ? 'Click for Full View' : 'Clic para pantalla completa'}
                            >
                              <img src={molding.photoUrl} alt={`${key} 3D Photo`} className="w-full h-28 object-contain" />
                              <span className="absolute bottom-1.5 left-1.5 bg-black/80 text-[8px] text-white px-1.5 py-0.5 rounded font-mono flex items-center gap-1">
                                <Maximize2 size={9} /> 3D
                              </span>
                            </div>
                          </div>
                        ) : cardView === 'photo' ? (
                          <div
                            onClick={() =>
                              openImageFullView({
                                title: `${key.replace('-', ' ')} 3D Render`,
                                subtitle: molding.description,
                                imageUrl: molding.photoUrl,
                                dimensions: molding.dimensions,
                                category: 'Transition Moldings',
                                type: 'photo',
                              })
                            }
                            className="rounded-2xl overflow-hidden border border-[#D9D9D9] bg-black p-3 flex items-center justify-center min-h-[160px] relative group cursor-pointer hover:border-[#0B0B0B] transition"
                          >
                            <img src={molding.photoUrl} alt={`${key} 3D Installed Photo`} className="w-full h-36 object-contain" />
                            <div className="absolute top-2 right-2 bg-black/80 text-white p-1 rounded text-[10px] flex items-center gap-1">
                              <Maximize2 size={11} />
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              openImageFullView({
                                title: `${key.replace('-', ' ')} CAD Blueprint`,
                                subtitle: molding.description,
                                imageUrl: molding.profileSvg,
                                dimensions: molding.dimensions,
                                category: 'Transition Moldings',
                                type: 'cad',
                              })
                            }
                            className="rounded-2xl overflow-hidden border border-[#D9D9D9] bg-white p-3 flex items-center justify-center min-h-[160px] relative group cursor-pointer hover:border-[#0B0B0B] transition"
                          >
                            <img src={molding.profileSvg} alt={`${key} Technical Blueprint`} className="w-full h-36 object-contain" />
                            <div className="absolute top-2 right-2 bg-[#F5F5F5] text-[#0B0B0B] p-1 rounded border border-[#D9D9D9] text-[10px] flex items-center gap-1">
                              <Maximize2 size={11} />
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleQuickAdd(moldingsProduct, `${key} (${molding.dimensions})`, 5, 'pieces', molding.description)}
                        className="w-full py-2.5 bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-xs"
                      >
                        <Plus size={15} className="text-white" />
                        <span>{isEn ? `+ Quote ${key.replace('-', ' ')}` : `+ Cotizar ${key.replace('-', ' ')}`}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: BASEBOARDS & TRIM */}
          {activeTab === 'baseboards' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#D9D9D9] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B0B0B]">
                    {isEn ? 'Finger-Joint Pine & Waterproof EPS Baseboards' : 'Colección Completa de Zócalos de Madera Pino Finger-Joint e Impermeables EPS'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6762] mt-1 max-w-3xl leading-relaxed">
                    {isEn
                      ? 'Solid finger-joint primed pine baseboards (BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620) in 14mm & 18mm thicknesses with lengths up to 17 feet, and 100% waterproof EPS Quarter Round profiles.'
                      : 'Zócalos de pino finger-joint pre-pintados en blanco (BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620) en 14mm y 18mm con largos de hasta 17 pies, y perfiles Quarter Round EPS 100% impermeables.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(BASEBOARD_IMAGES).map(([key, baseboard]) => {
                  return (
                    <div
                      key={key}
                      className="bg-white border border-[#D9D9D9] hover:border-[#0B0B0B] rounded-3xl p-5 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#0B0B0B] uppercase bg-[#F5F5F5] px-2.5 py-0.5 rounded-full border border-[#D9D9D9]">
                            {baseboard.height}
                          </span>
                          <span className="text-xs font-semibold text-[#6B6762] font-mono">
                            {baseboard.length}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-[#0B0B0B]">{key.replace('-', ' ')}</h4>
                          <p className="text-xs text-[#6B6762] line-clamp-1 mt-0.5">{baseboard.description}</p>
                        </div>

                        {/* High-Res 3D Installed Photo Display */}
                        <div
                          onClick={() =>
                            openImageFullView({
                              title: `${key.replace('-', ' ')} 3D View`,
                              subtitle: baseboard.description,
                              imageUrl: baseboard.photoUrl,
                              dimensions: `${baseboard.height} x ${baseboard.length}`,
                              category: 'Baseboards & Trim',
                              type: 'photo',
                              specs: [
                                { label: isEn ? 'Height' : 'Altura', value: baseboard.height },
                                { label: isEn ? 'Length' : 'Largo', value: baseboard.length },
                                { label: isEn ? 'Thickness' : 'Grosor', value: baseboard.thickness },
                              ],
                            })
                          }
                          className="rounded-2xl overflow-hidden border border-[#D9D9D9] bg-black p-3 flex items-center justify-center min-h-[170px] relative group cursor-pointer hover:border-[#0B0B0B] transition"
                          title={isEn ? 'Click to inspect in Full View' : 'Clic para ver en pantalla completa'}
                        >
                          <img
                            src={baseboard.photoUrl}
                            alt={`${key} 3D Installed Photo`}
                            className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-black/80 hover:bg-black text-white px-2 py-1 rounded-lg border border-white/20 text-[11px] font-bold flex items-center gap-1 shadow-xs">
                            <Maximize2 size={12} className="text-white" />
                            <span>{isEn ? 'Full View' : 'Ampliar'}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[#6B6762] px-1 pt-1 border-t border-[#D9D9D9]">
                          <span>{isEn ? 'Thickness:' : 'Grosor:'} <strong className="text-[#0B0B0B]">{baseboard.thickness}</strong></span>
                          <span>{isEn ? 'Length:' : 'Largo:'} <strong className="text-[#0B0B0B]">{baseboard.length}</strong></span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(baseboardsProduct, `${key} (${baseboard.height} - ${baseboard.length})`, 10, 'pieces', baseboard.description)}
                        className="w-full py-2.5 bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-xs"
                      >
                        <Plus size={15} className="text-white" />
                        <span>{isEn ? `+ Quote ${key.replace('-', ' ')}` : `+ Cotizar ${key.replace('-', ' ')}`}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FULL VIEW / LIGHTBOX MODAL WITH ZOOM */}
      {fullViewData && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
          onClick={() => {
            setFullViewData(null);
            setZoomLevel(1);
          }}
        >
          <div
            className="bg-[#121212] border border-[#262626] rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="px-5 py-3.5 border-b border-[#262626] bg-[#1A1A1A] flex items-center justify-between gap-3 shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-[#262626] px-2 py-0.5 rounded">
                    {fullViewData.category || (fullViewData.type === 'cad' ? 'CAD Blueprint' : '3D High-Res View')}
                  </span>
                  {fullViewData.dimensions && (
                    <span className="text-xs text-[#BCBAB4] font-mono">{fullViewData.dimensions}</span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">{fullViewData.title}</h3>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#262626] p-1 rounded-xl">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                    className="p-1.5 text-[#BCBAB4] hover:text-white rounded-lg hover:bg-[#383838] transition cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-[11px] font-mono text-white px-1 font-bold">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                    className="p-1.5 text-[#BCBAB4] hover:text-white rounded-lg hover:bg-[#383838] transition cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 text-[#BCBAB4] hover:text-white rounded-lg hover:bg-[#383838] transition cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setFullViewData(null);
                    setZoomLevel(1);
                  }}
                  className="w-8 h-8 rounded-full bg-[#262626] hover:bg-[#383838] text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Lightbox Image Stage with Zoom */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#000000] min-h-[320px] max-h-[65vh]">
              <div
                className="transition-transform duration-150 flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={fullViewData.imageUrl}
                  alt={fullViewData.title}
                  className="max-h-[58vh] max-w-full object-contain select-none"
                />
              </div>
            </div>

            {/* Lightbox Footer & Specs */}
            <div className="px-5 py-3.5 border-t border-[#262626] bg-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-[#BCBAB4] space-y-0.5">
                {fullViewData.subtitle && <p className="font-medium text-white">{fullViewData.subtitle}</p>}
                {fullViewData.specs && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#BCBAB4] pt-0.5">
                    {fullViewData.specs.map((s, idx) => (
                      <span key={idx}>
                        <strong className="text-white">{s.label}:</strong> {s.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {fullViewData.itemForQuote && (
                <button
                  onClick={() => {
                    if (fullViewData.itemForQuote) {
                      const item = fullViewData.itemForQuote;
                      handleQuickAdd(item.product, item.colorName, item.quantity, item.unit, item.notes);
                    }
                  }}
                  className="px-5 py-2.5 bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] text-xs font-black rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0"
                >
                  <Plus size={15} />
                  <span>{isEn ? '+ Add to Quote List' : '+ Agregar a Cotización'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
