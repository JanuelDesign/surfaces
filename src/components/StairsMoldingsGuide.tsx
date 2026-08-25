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
  Calculator,
  Check,
  Building2,
  Maximize2,
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
}

export const StairsMoldingsGuide: React.FC<Props> = ({ onClose, onAddToOrder }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const products = getLocalizedProducts(language);

  const [activeTab, setActiveTab] = useState<'stairs' | 'moldings' | 'baseboards'>('stairs');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'both' | 'diagram' | 'photo'>('both');
  const [cardViewMap, setCardViewMap] = useState<Record<string, 'diagram' | 'photo'>>({});

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
    setTimeout(() => setAddedItem(null), 1500);
  };

  const handleAddStairPackage = () => {
    const colorObj = stairsProduct.colors[0] || { name: 'Color-Matched to Floor', hexColor: '#c7b28e' };
    const notes = `Custom Stair Package: ${stairStepsCount} Steps (${stairTreadLength} length), Profile: ${stairProfileChoice}, Risers: ${
      includeMatchingRisers ? 'Yes (Matching)' : 'No (White/Paint)'
    }, Open Returns: ${openEndReturns}`;
    onAddToOrder(stairsProduct, colorObj, stairStepsCount, 'pieces', 0, notes);
    setAddedItem('stair-calc-package');
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-[#fcfdff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a1680] flex items-center justify-center text-white shadow-md shadow-[#0a1680]/20">
              <Footprints size={20} className="text-[#f1b94c]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0a1680]">
                {isEn ? 'Technical Finish Guide' : 'Guía Técnica de Acabados'}
              </span>
              <h2 className="text-lg font-extrabold text-[#0a1680]">
                {isEn ? 'SURFACES Stairs, Moldings & Baseboards' : 'Gradas, Molduras & Zócalos SURFACES'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
            aria-label="Close guide modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation & Global View Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 bg-white px-6 gap-2 py-2 sm:py-0">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('stairs')}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'stairs'
                  ? 'border-[#0a1680] text-[#0a1680]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Footprints size={16} />
              <span>{isEn ? 'Stairs & Treads' : 'Gradas & Escaleras (Stair Treads)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('moldings')}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'moldings'
                  ? 'border-[#0a1680] text-[#0a1680]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders size={16} />
              <span>{isEn ? 'Moldings & Transitions' : 'Molduras & Transiciones'}</span>
            </button>
            <button
              onClick={() => setActiveTab('baseboards')}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'baseboards'
                  ? 'border-[#0a1680] text-[#0a1680]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Square size={16} />
              <span>{isEn ? 'Baseboards & Trim' : 'Zócalos & Rodapiés (Baseboards)'}</span>
            </button>
          </div>

          {/* Visual Display Mode Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-semibold self-start sm:self-auto mb-2 sm:mb-0">
            <button
              onClick={() => setDisplayMode('both')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                displayMode === 'both'
                  ? 'bg-white text-[#0a1680] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? '✨ Both (Diagram + Photo)' : '✨ Ver Ambos (Plano + Foto)'}
            </button>
            <button
              onClick={() => setDisplayMode('diagram')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                displayMode === 'diagram'
                  ? 'bg-white text-[#0a1680] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? '📐 Blueprint CAD' : '📐 Planos CAD'}
            </button>
            <button
              onClick={() => setDisplayMode('photo')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                displayMode === 'photo'
                  ? 'bg-white text-[#0a1680] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? '📸 3D Photo' : '📸 Fotos 3D'}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: STAIRS */}
          {activeTab === 'stairs' && (
            <div className="space-y-6">
              <div className="bg-[#93b2f8]/15 border border-[#93b2f8]/40 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-[#0a1680] flex items-center gap-2">
                  <Sparkles size={16} className="text-[#0a1680]" />
                  {isEn
                    ? 'Quality at Every Step: Color-Matched Stair Treads & Architectural Blueprints'
                    : 'Quality at Every Step: Gradas y Treads a Juego con Planos Técnicos Vectoriales'}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {isEn
                    ? 'Our treads are custom manufactured to precisely match the color and grain of your SPC or Laminate flooring, delivering cohesive architectural continuity across multi-level residences or commercial spaces.'
                    : 'Nuestras gradas se fabrican a medida a juego con el mismo color y acabado de su piso SPC o Laminado, garantizando continuidad visual en toda su residencia o proyecto comercial.'}
                </p>
              </div>

              {/* Step Technical CAD Blueprints: Double Rounded vs Square Step */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isEn ? '1. Technical Profiles & Dimension Diagrams' : '1. Perfiles Técnicos & Diagramas de Dimensiones'}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {isEn ? 'Custom length fabrication' : 'Fabricación a medida'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Double Rounded */}
                  <div className="bg-white border border-slate-200 hover:border-[#0a1680]/40 rounded-3xl p-6 space-y-4 shadow-xs transition flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#0a1680]">
                          {isEn ? 'CLASSIC PROFILE' : 'PERFIL CLÁSICO'}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                          {isEn ? 'Available in SPC Flooring' : 'Disponible en Pisos SPC'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-[#0a1680]">Double Rounded</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {isEn
                            ? 'Smooth front edge with double soft bullnose radius for enhanced safety and comfort.'
                            : 'Borde frontal con doble redondeo suave para máxima seguridad, ergonomía y confort.'}
                        </p>
                      </div>

                      {/* Clean White Diagram Container */}
                      <div className="border border-slate-200 rounded-2xl p-4 bg-white flex items-center justify-center min-h-[160px]">
                        <img
                          src={STAIR_PROFILES.DoubleRounded.profileSvg}
                          alt="Double Rounded Profile Diagram"
                          className="w-full max-h-36 object-contain"
                        />
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
                      className="w-full py-3.5 bg-[#0a1680] hover:bg-[#081268] text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-[#0a1680]/20 cursor-pointer mt-2"
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
                  <div className="bg-white border border-slate-200 hover:border-[#0a1680]/40 rounded-3xl p-6 space-y-4 shadow-xs transition flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#0a1680]">
                          {isEn ? 'MODERN PROFILE' : 'PERFIL MODERNO'}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                          {isEn ? 'Available in SPC & Laminate' : 'Disponible en SPC & Laminado'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-[#0a1680]">Square Step</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {isEn
                            ? 'Crisp 90-degree squared nosing edge for contemporary minimalist architecture.'
                            : 'Borde en ángulo recto de 90 grados para proyectos contemporáneos y minimalistas.'}
                        </p>
                      </div>

                      {/* Clean White Diagram Container */}
                      <div className="border border-slate-200 rounded-2xl p-4 bg-white flex items-center justify-center min-h-[160px]">
                        <img
                          src={STAIR_PROFILES.SquareStep.profileSvg}
                          alt="Square Step Profile Diagram"
                          className="w-full max-h-36 object-contain"
                        />
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
                      className="w-full py-3.5 bg-[#0a1680] hover:bg-[#081268] text-white text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-[#0a1680]/20 cursor-pointer mt-2"
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

              {/* Full Steps vs Regular Steps Blueprint & 3D Photo Section */}
              <div className="bg-[#0a1680] text-white rounded-2xl p-5 space-y-4 shadow-md">
                <h4 className="text-sm font-bold text-[#f1b94c]">
                  {isEn
                    ? '2. Construction Methods: Full Steps (Monolithic) vs Regular Steps (Modular)'
                    : '2. Métodos de Construcción: Full Steps (Monolíticas) vs Regular Steps (Modulares)'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#081268] rounded-xl border border-white/15 space-y-2">
                    <div className="font-extrabold text-white text-base">Full Steps (Monolithic Tread)</div>
                    <p className="text-white/80 text-[11px] leading-relaxed">
                      {isEn
                        ? 'Continuous unbroken single-piece 12" depth tread with integrated nosing. Zero seams across the step surface. Ideal for floating open stringers.'
                        : 'Grada continua de una sola pieza monolítica de 12" de profundidad con nariz integrada. Cero uniones sobre la superficie. Ideal para escaleras flotantes.'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="rounded-lg overflow-hidden border border-white/20 bg-[#060e36]">
                        <img src={STAIR_PROFILES.FullStep.profileSvg} alt="Full Step Blueprint" className="w-full h-28 object-contain" />
                      </div>
                      <div className="rounded-lg overflow-hidden border border-white/20 bg-[#0f172a]">
                        <img src={STAIR_PROFILES.FullStep.photoUrl} alt="Full Step 3D View" className="w-full h-28 object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#081268] rounded-xl border border-white/15 space-y-2">
                    <div className="font-extrabold text-white text-base">
                      {isEn ? 'Regular Steps (Modular Assembly)' : 'Regular Steps (Ensamblaje Modular)'}
                    </div>
                    <p className="text-white/80 text-[11px] leading-relaxed">
                      {isEn
                        ? 'Modular system combining the front nose tread piece with matching flooring planks and matching or crisp white risers.'
                        : 'Sistema modular que une la nariz frontal con tablas estándar de piso y contrahuella (riser) a juego o blanca.'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="rounded-lg overflow-hidden border border-white/20 bg-[#060e36]">
                        <img src={STAIR_PROFILES.RegularStep.profileSvg} alt="Regular Step Blueprint" className="w-full h-28 object-contain" />
                      </div>
                      <div className="rounded-lg overflow-hidden border border-white/20 bg-[#1e293b]">
                        <img src={STAIR_PROFILES.RegularStep.photoUrl} alt="Regular Step 3D View" className="w-full h-28 object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Rich Step Application & Example Visual Cards (Specifically requested by user) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {isEn ? '3. Step Applications & Real Architectural Examples' : '3. Aplicaciones y Ejemplos Reales de Gradas'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {isEn
                        ? 'Visual rendering examples and technical specifications for diverse architectural staircase layouts'
                        : 'Renders visuales y especificaciones técnicas para los distintos tipos de instalación y diseños de escalera'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {STAIR_EXAMPLE_CARDS.map((card) => (
                    <div
                      key={card.id}
                      className="bg-white border border-slate-200 hover:border-[#0a1680]/50 rounded-2xl p-4 space-y-3 shadow-xs hover:shadow-md transition"
                    >
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
                        <img
                          src={card.imageSvg}
                          alt={isEn ? card.titleEn : card.titleEs}
                          className="w-full h-48 object-contain"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#0a1680] uppercase tracking-wide">
                            {card.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{card.dimensions}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          {isEn ? card.titleEn : card.titleEs}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {isEn ? card.subtitleEn : card.subtitleEs}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {card.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                          >
                            {tag}
                          </span>
                        ))}
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
                        className="w-full py-2 bg-slate-100 hover:bg-[#0a1680] hover:text-white text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>{isEn ? 'Add this Stair Configuration' : 'Cotizar esta Configuración'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Stair Package Configurator & Quote Builder */}
              <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Calculator size={18} className="text-[#0a1680]" />
                  <h4 className="text-sm font-bold text-slate-900">
                    {isEn ? 'Staircase Calculator & Custom Quote Builder' : 'Calculadora de Escaleras y Cotizador a Medida'}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  {/* Step Count */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      {isEn ? 'Number of Steps:' : 'Número de Gradas:'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={stairStepsCount}
                      onChange={(e) => setStairStepsCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-[#0a1680] outline-none"
                    />
                  </div>

                  {/* Tread Length */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      {isEn ? 'Tread Length:' : 'Largo de Grada:'}
                    </label>
                    <select
                      value={stairTreadLength}
                      onChange={(e) => setStairTreadLength(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-[#0a1680] outline-none"
                    >
                      <option value='48"'>48" (Standard / Estándar)</option>
                      <option value='60"'>60" (Wide / Amplia)</option>
                      <option value='72"'>72" (Grand / Extra)</option>
                    </select>
                  </div>

                  {/* Profile choice */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      {isEn ? 'Nosing Profile:' : 'Perfil de Nariz:'}
                    </label>
                    <select
                      value={stairProfileChoice}
                      onChange={(e) => setStairProfileChoice(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-[#0a1680] outline-none"
                    >
                      <option value="DoubleRounded">Double Rounded (SPC)</option>
                      <option value="SquareStep">Square Step 90° (SPC/Lam)</option>
                    </select>
                  </div>

                  {/* Open-end returns */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      {isEn ? 'Open Side Miter Caps:' : 'Terminales Laterales:'}
                    </label>
                    <select
                      value={openEndReturns}
                      onChange={(e) => setOpenEndReturns(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-[#0a1680] outline-none"
                    >
                      <option value="none">{isEn ? 'None (Closed between walls)' : 'Ninguno (Entre paredes)'}</option>
                      <option value="left">{isEn ? 'Left Open End' : 'Abierto a la Izquierda'}</option>
                      <option value="right">{isEn ? 'Right Open End' : 'Abierto a la Derecha'}</option>
                      <option value="both">{isEn ? 'Both Sides Open' : 'Abierto Ambos Lados'}</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeMatchingRisers}
                      onChange={(e) => setIncludeMatchingRisers(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0a1680]"
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
                  className="w-full py-3 bg-[#0a1680] hover:bg-[#081268] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-[#0a1680]/20 cursor-pointer"
                >
                  {addedItem === 'stair-calc-package' ? <Check size={16} /> : <Plus size={16} className="text-[#f1b94c]" />}
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

          {/* TAB 2: MOLDINGS (All Complete Models) */}
          {activeTab === 'moldings' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isEn ? 'Infinite Design Possibilities with Moldings' : 'Posibilidades Infinitas con Molduras'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {isEn
                      ? 'Complete catalog of transition moldings: CM and standard profiles for level floors, step-down reducers, sliding door end caps, and expansion transitions with technical blueprints & 3D renders.'
                      : 'Catálogo completo de molduras de transición: perfiles CM y estándar para pisos a nivel, reductores de desnivel, remates para puertas correderas y dilataciones con planos CAD y renders 3D.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(MOLDING_IMAGES).map(([key, molding]) => {
                  const cardView = getEffectiveView(`molding-${key}`);
                  return (
                    <div key={key} className="bg-white border border-slate-200 hover:border-[#0a1680]/40 rounded-2xl p-4 space-y-3 shadow-xs transition flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#0a1680] uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {molding.dimensions}
                          </span>
                          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                            <button
                              onClick={() => toggleCardView(`molding-${key}`, 'diagram')}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-semibold cursor-pointer ${
                                cardView === 'diagram' ? 'bg-[#0a1680] text-white' : 'text-slate-600'
                              }`}
                            >
                              {isEn ? 'Plan' : 'Plano'}
                            </button>
                            <button
                              onClick={() => toggleCardView(`molding-${key}`, 'photo')}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-semibold cursor-pointer ${
                                cardView === 'photo' ? 'bg-[#0a1680] text-white' : 'text-slate-600'
                              }`}
                            >
                              {isEn ? '3D' : 'Foto'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">{key.replace('-', ' ')}</h4>
                          <p className="text-[11px] text-slate-500 font-sans line-clamp-2 mt-0.5">{molding.description}</p>
                        </div>

                        {/* Visual Display: Dual or Single */}
                        {cardView === 'both' ? (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white p-2 flex items-center justify-center relative group">
                              <img src={molding.profileSvg} alt={`${key} Diagram`} className="w-full h-28 object-contain" />
                              <span className="absolute bottom-1 left-1 bg-slate-100 text-[8px] text-[#0a1680] font-bold px-1.5 py-0.5 rounded border border-slate-200">CAD PLAN</span>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative group">
                              <img src={molding.photoUrl} alt={`${key} 3D Photo`} className="w-full h-28 object-contain" />
                              <span className="absolute bottom-1 left-1 bg-black/70 text-[8px] text-[#fbedb0] px-1.5 py-0.5 rounded font-mono">3D PHOTO</span>
                            </div>
                          </div>
                        ) : cardView === 'photo' ? (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 p-2 flex items-center justify-center">
                            <img src={molding.photoUrl} alt={`${key} 3D Installed Photo`} className="w-full h-36 object-contain" />
                          </div>
                        ) : (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-white p-3 flex items-center justify-center">
                            <img src={molding.profileSvg} alt={`${key} Technical Blueprint`} className="w-full h-36 object-contain" />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleQuickAdd(moldingsProduct, `${key} (${molding.dimensions})`, 5, 'pieces', molding.description)}
                        className="w-full py-2.5 bg-[#0a1680] hover:bg-[#081268] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-xs"
                      >
                        <Plus size={14} className="text-white" />
                        <span>{isEn ? `+ Quote ${key.replace('-', ' ')}` : `+ Cotizar ${key.replace('-', ' ')}`}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: BASEBOARDS (All Complete Models) */}
          {activeTab === 'baseboards' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isEn ? 'Complete Solid Finger-Joint Pine & Waterproof Baseboards Collection' : 'Colección Completa de Zócalos de Madera Pino Finger-Joint e Impermeables EPS'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {isEn
                      ? 'All models: BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620 in 14mm & 18mm thicknesses with lengths up to 17 feet, plus 100% waterproof EPS Quarter Round with architectural blueprints & 3D photos.'
                      : 'Todos los modelos: BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620 en grosores de 14mm y 18mm con largos de hasta 17 pies, además de Cuarto de Bocel EPS impermeable con planos y renders 3D.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(BASEBOARD_IMAGES).map(([key, baseboard]) => {
                  const cardView = getEffectiveView(`baseboard-${key}`);
                  return (
                    <div key={key} className="bg-white border border-slate-200 hover:border-[#0a1680]/40 rounded-2xl p-4 space-y-3 shadow-xs transition flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#0a1680] uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {baseboard.height}
                          </span>
                          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                            <button
                              onClick={() => toggleCardView(`baseboard-${key}`, 'diagram')}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-semibold cursor-pointer ${
                                cardView === 'diagram' ? 'bg-[#0a1680] text-white' : 'text-slate-600'
                              }`}
                            >
                              {isEn ? 'Plan' : 'Plano'}
                            </button>
                            <button
                              onClick={() => toggleCardView(`baseboard-${key}`, 'photo')}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-semibold cursor-pointer ${
                                cardView === 'photo' ? 'bg-[#0a1680] text-white' : 'text-slate-600'
                              }`}
                            >
                              {isEn ? '3D' : 'Foto'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-extrabold text-slate-900">{key.replace('-', ' ')}</h4>
                            <span className="text-[10px] font-semibold text-slate-500 font-mono">
                              {baseboard.length}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-sans line-clamp-1">{baseboard.description}</p>
                        </div>

                        {/* Visual Display: Dual or Single */}
                        {cardView === 'both' ? (
                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#09132e] relative group">
                              <img src={baseboard.profileSvg} alt={`${key} Diagram`} className="w-full h-28 object-contain" />
                              <span className="absolute bottom-1 left-1 bg-black/70 text-[8px] text-blue-200 px-1 py-0.2 rounded font-mono">CAD PLAN</span>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#0f172a] relative group">
                              <img src={baseboard.photoUrl} alt={`${key} 3D Photo`} className="w-full h-28 object-contain" />
                              <span className="absolute bottom-1 left-1 bg-black/70 text-[8px] text-[#fbedb0] px-1 py-0.2 rounded font-mono">3D PHOTO</span>
                            </div>
                          </div>
                        ) : cardView === 'photo' ? (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#0f172a]">
                            <img src={baseboard.photoUrl} alt={`${key} 3D Installed Photo`} className="w-full h-36 object-contain" />
                          </div>
                        ) : (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#09132e]">
                            <img src={baseboard.profileSvg} alt={`${key} Technical Blueprint`} className="w-full h-36 object-contain" />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-slate-600 px-1 pt-1 border-t border-slate-100">
                          <span>{isEn ? 'Thickness:' : 'Grosor:'} <strong className="text-slate-800">{baseboard.thickness}</strong></span>
                          <span>{isEn ? 'Length:' : 'Largo:'} <strong className="text-slate-800">{baseboard.length}</strong></span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(baseboardsProduct, `${key} (${baseboard.height} - ${baseboard.length})`, 10, 'pieces', baseboard.description)}
                        className="w-full py-2 bg-slate-100 hover:bg-[#0a1680] hover:text-white text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                      >
                        <Plus size={14} />
                        <span>{isEn ? `Add ${key.replace('-', ' ')}` : `Agregar ${key.replace('-', ' ')}`}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
