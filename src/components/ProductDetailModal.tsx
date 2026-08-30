import React, { useState, useId } from 'react';
import {
  X,
  Eye,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Calculator,
  ShieldCheck,
  Maximize2,
  ExternalLink,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatSqftBoxes } from '../utils/textureUtils';
import {
  generatePlankSVG,
  generateRoomSceneSVG,
  BASEBOARD_IMAGES,
  MOLDING_IMAGES,
  STAIR_PROFILES,
} from '../utils/imageCatalog';
import { TechnicalLayerDiagram } from './TechnicalLayerDiagram';
import { FullViewModal } from './FullViewModal';
import { useLanguage } from '../i18n/LanguageContext';
import { ROOMVO_VISUALIZER_URL } from '../utils/constants';

interface Props {
  product: Product;
  initialSelectedColor?: ProductColor;
  onClose: () => void;
  onOpenVisualizer?: (product: Product, selectedColor: ProductColor) => void;
  onAddSample: (product: Product, selectedColor: ProductColor) => void;
  onAddToOrder: (
    product: Product,
    selectedColor: ProductColor,
    quantity: number,
    unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces',
    notes?: string
  ) => void;
}

export const ProductDetailModal: React.FC<Props> = ({
  product,
  initialSelectedColor,
  onClose,
  onOpenVisualizer,
  onAddSample,
  onAddToOrder,
}) => {
  const { t, language } = useLanguage();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    initialSelectedColor || product.colors[0]
  );
  const [orderQuantityBoxes, setOrderQuantityBoxes] = useState<number>(10);
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // View Mode: 'plank' vs 'room'
  const [viewMode, setViewMode] = useState<'plank' | 'room'>('plank');
  const [moldingSlideIndex, setMoldingSlideIndex] = useState<number>(0);
  const [showFullViewModal, setShowFullViewModal] = useState(false);

  // Calculator State
  const [calculatorArea, setCalculatorArea] = useState<string>('250');
  const [unitMode, setUnitMode] = useState<'sqft' | 'm2'>('sqft');

  const sqftInputId = useId();
  const m2InputId = useId();
  const notesInputId = useId();

  const isAccessory = ['baseboards', 'moldings', 'stair-steps'].includes(product.category);

  // Calculate box counts based on input area without arbitrary waste margins
  const numericSqftPerBox =
    typeof product.specs.sqftPerBox === 'number'
      ? product.specs.sqftPerBox
      : parseFloat(String(product.specs.sqftPerBox || '24.26')) || 24.26;

  const rawAreaNum = parseFloat(calculatorArea) || 0;
  const areaInSqft = unitMode === 'm2' ? rawAreaNum * 10.7639 : rawAreaNum;
  const calculatedBoxes = Math.max(1, Math.ceil(areaInSqft / numericSqftPerBox));
  const calculatedExactSqft = (calculatedBoxes * numericSqftPerBox).toFixed(2);

  const handleApplyCalculatedToOrder = () => {
    setOrderQuantityBoxes(calculatedBoxes);
  };

  const handleAddOrderSubmit = () => {
    const unitType =
      product.category === 'moldings' || product.category === 'baseboards'
        ? 'pieces'
        : 'boxes';
    onAddToOrder(product, selectedColor, orderQuantityBoxes, unitType, orderNotes);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleSampleRequest = () => {
    onAddSample(product, selectedColor);
    setSampleSuccess(true);
    setTimeout(() => setSampleSuccess(false), 1500);
  };

  // Image assets: prioritize real photo URL if available from Sheets/GitHub, fallback to SVG generator
  const plankSvg = selectedColor.image || generatePlankSVG(
    selectedColor.hexColor || '#c7b28e',
    selectedColor.secondaryHex || '#8c7355',
    'rgba(0,0,0,0.22)',
    selectedColor.patternType || 'wood'
  );

  const roomSvg = selectedColor.roomImage || generateRoomSceneSVG(
    selectedColor.hexColor || '#c7b28e',
    selectedColor.secondaryHex || '#8c7355',
    'living'
  );

  const getAccessoryData = () => {
    if (product.category === 'baseboards') {
      const name = selectedColor.name;
      if (name.includes('BB1x6')) return BASEBOARD_IMAGES['BB1x6-14mm'];
      if (name.includes('BB1x4')) return BASEBOARD_IMAGES['BB1x4-14mm'];
      if (name.includes('BB1x3')) return BASEBOARD_IMAGES['BB1x3-18mm'];
      if (name.includes('BB5180')) return BASEBOARD_IMAGES['BB5180'];
      if (name.includes('BB618')) return BASEBOARD_IMAGES['BB618'];
      if (name.includes('BB620')) return BASEBOARD_IMAGES['BB620'];
      if (name.includes('EPS')) return BASEBOARD_IMAGES['QuarterRound-EPS'];
      if (name.includes('Pine') && name.includes('Round')) return BASEBOARD_IMAGES['QuarterRound-Pine'];
      if (name.includes('Square')) return BASEBOARD_IMAGES['Square1x1-MDF'];
      return BASEBOARD_IMAGES['BB1x6-14mm'];
    }
    if (product.category === 'moldings') {
      const name = selectedColor.name;
      if (name.includes('CM T-Molding') || name.includes('CM-T')) return MOLDING_IMAGES['CM-TMolding'];
      if (name.includes('CM Reducer') || name.includes('CM-R')) return MOLDING_IMAGES['CM-Reducer'];
      if (name.includes('Standard T-Molding')) return MOLDING_IMAGES['Standard-TMolding'];
      if (name.includes('Standard Reducer')) return MOLDING_IMAGES['Standard-Reducer'];
      if (name.includes('End Cap')) return MOLDING_IMAGES['EndCap'];
      return MOLDING_IMAGES['CM-TMolding'];
    }
    if (product.category === 'stair-steps') {
      const name = selectedColor.name;
      if (name.includes('Double Rounded')) return STAIR_PROFILES['DoubleRounded'];
      if (name.includes('Square Step')) return STAIR_PROFILES['SquareStep'];
      if (name.includes('Full Step')) return STAIR_PROFILES['FullStep'];
      if (name.includes('Regular Step')) return STAIR_PROFILES['RegularStep'];
      return STAIR_PROFILES['DoubleRounded'];
    }
    return null;
  };

  const accessoryData = isAccessory ? getAccessoryData() : null;

  // For moldings: 3-slide gallery images
  const moldingSlides = [
    {
      title: language === 'en' ? 'Profile Blueprint' : 'Corte de Perfil',
      src: accessoryData?.profileSvg || plankSvg,
    },
    {
      title: language === 'en' ? '3D In-Situ View' : 'Aplicación 3D en Piso',
      src: accessoryData?.photoUrl || plankSvg,
    },
    {
      title: language === 'en' ? 'Texture & Color' : 'Textura y Color',
      src: plankSvg,
    },
  ];

  const currentDisplayImage = product.category === 'moldings'
    ? moldingSlides[moldingSlideIndex].src
    : product.category === 'baseboards'
    ? (accessoryData?.photoUrl || plankSvg)
    : isAccessory
    ? (viewMode === 'room' ? (accessoryData?.photoUrl || accessoryData?.profileSvg || plankSvg) : (accessoryData?.profileSvg || plankSvg))
    : (viewMode === 'room' ? roomSvg : plankSvg);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <div
          className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#D9D9D9] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9D9D9] bg-[#F5F5F5]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#0B0B0B]"></span>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#6B6762] tracking-wider">
                  {product.collection}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0B0B0B] leading-tight">
                  {product.name}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#D9D9D9] border border-[#D9D9D9] flex items-center justify-center text-[#0B0B0B] transition cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Top Hero: Visualizer + Plank / Room Switcher + Active Color Selector */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Visual Display Card */}
              <div className="md:col-span-6 space-y-2">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#D9D9D9] shadow-sm bg-[#0B0B0B] group">
                  <img
                    src={currentDisplayImage}
                    alt={`${product.name} - ${selectedColor.name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Top Switcher: Carousel for Moldings / Switcher for SPC & Steps / Hidden for Baseboards */}
                  {product.category === 'moldings' ? (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2 py-1 rounded-xl border border-white/20 z-10 text-white text-[11px] font-bold">
                      <button
                        onClick={() => setMoldingSlideIndex((prev) => (prev === 0 ? moldingSlides.length - 1 : prev - 1))}
                        className="p-1 hover:bg-white/20 rounded-md transition cursor-pointer"
                        title="Anterior"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <span className="px-1 text-[#F5F5F5] font-semibold">{moldingSlides[moldingSlideIndex].title} ({moldingSlideIndex + 1}/3)</span>
                      <button
                        onClick={() => setMoldingSlideIndex((prev) => (prev === moldingSlides.length - 1 ? 0 : prev + 1))}
                        className="p-1 hover:bg-white/20 rounded-md transition cursor-pointer"
                        title="Siguiente"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  ) : product.category !== 'baseboards' ? (
                    <div className="absolute top-3 left-3 flex bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/20 z-10">
                      <button
                        onClick={() => setViewMode('plank')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          viewMode === 'plank'
                            ? 'bg-[#0B0B0B] text-white shadow-xs'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <Layers size={13} />
                        <span>{isAccessory ? (language === 'en' ? 'Diagram' : 'Diagrama') : (language === 'en' ? 'Plank' : 'Plank')}</span>
                      </button>
                      <button
                        onClick={() => setViewMode('room')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          viewMode === 'room'
                            ? 'bg-[#0B0B0B] text-white shadow-xs'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <Eye size={13} />
                        <span>{isAccessory ? (language === 'en' ? 'Photo' : 'Foto') : (language === 'en' ? 'Room' : 'Ambiente')}</span>
                      </button>
                    </div>
                  ) : null}

                  {/* Molding Carousel Indicator Dots */}
                  {product.category === 'moldings' && (
                    <div className="absolute bottom-12 left-3 flex gap-1.5 z-10">
                      {moldingSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMoldingSlideIndex(idx)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            moldingSlideIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Full View Lightbox Expand Button */}
                  <button
                    onClick={() => setShowFullViewModal(true)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-white hover:text-[#0B0B0B] text-white backdrop-blur-md border border-white/20 transition cursor-pointer shadow-md"
                    title={language === 'en' ? 'Full Screen High-Res View' : 'Ver en Alta Resolución / Pantalla Completa'}
                  >
                    <Maximize2 size={15} />
                  </button>

                  {/* Active Color Name Tag */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="text-sm font-extrabold flex items-center gap-2 drop-shadow-md">
                      {product.category === 'spc-vinyl' ? (
                        <span>{language === 'en' ? 'Color Code:' : 'Código de Color:'} {selectedColor.code || selectedColor.name}</span>
                      ) : (
                        <>
                          <span>{selectedColor.name}</span>
                          {selectedColor.code && selectedColor.code !== selectedColor.name && (
                            <span className="text-[10px] bg-black/60 text-[#F5F5F5] px-2 py-0.5 rounded font-mono border border-white/20">
                              {selectedColor.code}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-xs text-[#BCBAB4] drop-shadow-xs">
                      {selectedColor.finish || product.specs.finished || 'Satin'}
                    </div>
                  </div>
                </div>

                {/* Direct Roomvo Official AR Launch link - ONLY FOR SPC VINYL */}
                {product.category === 'spc-vinyl' && (
                  <div className="flex items-center justify-between px-3 py-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl text-xs">
                    <span className="font-semibold text-[#0B0B0B] flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#0B0B0B]" />
                      {language === 'en' ? 'Official Roomvo AR Live Camera Visualizer:' : 'Visualizador AR Roomvo con Cámara en Vivo:'}
                    </span>
                    <a
                      href={ROOMVO_VISUALIZER_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#0B0B0B] hover:text-[#6B6762] flex items-center gap-1 underline"
                    >
                      <span>Roomvo</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>

              {/* Colors Picker & Sample Actions */}
              <div className="md:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B]">
                    {product.category === 'spc-vinyl'
                      ? (language === 'en' ? `Color Codes (${product.colors.length}):` : `Códigos de Color (${product.colors.length}):`)
                      : (language === 'en' ? `Select Color / Variety (${product.colors.length}):` : `Seleccionar Tono / Variedad (${product.colors.length}):`)}
                  </h3>
                  <span className="text-xs text-[#0B0B0B] font-bold">
                    {product.category === 'spc-vinyl'
                      ? `${selectedColor.code || selectedColor.name}`
                      : `${selectedColor.name} ${selectedColor.code && selectedColor.code !== selectedColor.name ? `(${selectedColor.code})` : ''}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-left border transition cursor-pointer ${
                          isSelected
                            ? 'border-[#0B0B0B] bg-[#F5F5F5] shadow-xs ring-2 ring-[#0B0B0B]'
                            : 'border-[#D9D9D9] hover:border-[#6B6762] bg-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-[#D9D9D9] shrink-0 shadow-xs"
                          style={{ backgroundColor: c.hexColor }}
                        ></span>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-[#0B0B0B] truncate">
                            {product.category === 'spc-vinyl' ? `Cod. ${c.code || c.name}` : c.name}
                          </div>
                          {product.category !== 'spc-vinyl' && c.code && c.code !== c.name && (
                            <div className="text-[10px] text-[#6B6762] font-mono">{c.code}</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sample Quick Action button */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSampleRequest}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      sampleSuccess
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-[#F5F5F5] hover:bg-[#D9D9D9] text-[#0B0B0B] border-[#D9D9D9]'
                    }`}
                  >
                    {sampleSuccess ? <Check size={16} /> : <Plus size={16} className="text-[#0B0B0B]" />}
                    <span>
                      {sampleSuccess
                        ? t('detailModal.sampleSuccess')
                        : `${t('detailModal.orderSampleBtn')}: ${selectedColor.name}`}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0B0B0B]"></span>
                {t('detailModal.specifications')}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
                {product.specs.wearLayer && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.wearLayer')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.wearLayer}</div>
                  </div>
                )}
                {product.specs.totalThickness && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('productCard.thickness')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.totalThickness}</div>
                  </div>
                )}
                {product.specs.rigidCore && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.coreMaterial')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.rigidCore}</div>
                  </div>
                )}
                {product.specs.padding && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.integratedPadding')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.padding}</div>
                  </div>
                )}
                {product.specs.plankSize && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.plankDimensions')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.plankSize}</div>
                  </div>
                )}
                {product.specs.planksPerBox && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.piecesBox')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">
                      {product.specs.planksPerBox} {language === 'en' ? 'planks' : 'tablas'}
                    </div>
                  </div>
                )}
                {product.specs.sqftPerBox && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#0B0B0B] font-bold">{t('detailModal.boxSqft')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.sqftPerBox} sqft</div>
                  </div>
                )}
                {product.specs.installation && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.installationSystem')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.installation}</div>
                  </div>
                )}
                {product.specs.finished && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{language === 'en' ? 'Surface Finish' : 'Acabado Superficial'}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.finished}</div>
                  </div>
                )}
                {product.specs.warrantyResidential && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.warrantyResidential')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.warrantyResidential}</div>
                  </div>
                )}
                {product.specs.origin && (
                  <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#0B0B0B] font-bold">{t('productCard.origin')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5">{product.specs.origin}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Multilayer Cross-Section Diagram */}
            <TechnicalLayerDiagram type={product.technicalDiagram || 'spc-layers'} />

            {/* Interactive Calculator: Area to Boxes */}
            {product.specs.sqftPerBox && (
              <div className="bg-[#0B0B0B] text-white rounded-2xl p-5 space-y-4 shadow-md border border-[#262626]">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Calculator size={18} className="text-white" />
                    <h3 className="text-sm font-bold text-white">{t('detailModal.calculatorTitle')}</h3>
                  </div>
                  <div className="flex items-center bg-[#1A1A1A] rounded-lg p-0.5 text-xs font-semibold border border-[#333333]">
                    <button
                      onClick={() => setUnitMode('sqft')}
                      className={`px-3 py-1 rounded-md transition cursor-pointer ${
                        unitMode === 'sqft' ? 'bg-white text-[#0B0B0B] font-bold' : 'text-[#BCBAB4] hover:text-white'
                      }`}
                    >
                      Sq. Ft (ft²)
                    </button>
                    <button
                      onClick={() => setUnitMode('m2')}
                      className={`px-3 py-1 rounded-md transition cursor-pointer ${
                        unitMode === 'm2' ? 'bg-white text-[#0B0B0B] font-bold' : 'text-[#BCBAB4] hover:text-white'
                      }`}
                    >
                      Meters² (m²)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Area Input */}
                  <div className="sm:col-span-7 space-y-1">
                    <label htmlFor={unitMode === 'sqft' ? sqftInputId : m2InputId} className="text-xs text-[#BCBAB4]">
                      {language === 'en' ? `Area to cover (${unitMode === 'sqft' ? 'sqft' : 'm²'}):` : `Área a cubrir (${unitMode === 'sqft' ? 'sqft' : 'm²'}):`}
                    </label>
                    <input
                      id={unitMode === 'sqft' ? sqftInputId : m2InputId}
                      type="number"
                      min="1"
                      value={calculatorArea}
                      onChange={(e) => setCalculatorArea(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-2.5 text-white font-bold text-base focus:border-white outline-none"
                      placeholder="e.g. 250"
                    />
                  </div>

                  {/* Calculated Result Box */}
                  <div className="sm:col-span-5 bg-[#1A1A1A] border border-[#333333] rounded-xl p-3 text-center">
                    <div className="text-[11px] text-[#BCBAB4]">{t('detailModal.calculatedBoxes')}:</div>
                    <div className="text-2xl font-extrabold text-white">
                      {calculatedBoxes} {language === 'en' ? 'Boxes' : 'Cajas'}
                    </div>
                    <div className="text-[11px] text-[#BCBAB4]">
                      {calculatedExactSqft} sqft ({product.specs.sqftPerBox} sqft/{language === 'en' ? 'box' : 'caja'})
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleApplyCalculatedToOrder}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white border border-white/20 transition cursor-pointer"
                >
                  {language === 'en'
                    ? `Apply ${calculatedBoxes} Boxes to Order Selector Below ↓`
                    : `Aplicar ${calculatedBoxes} Cajas al selector de pedido de abajo ↓`}
                </button>
              </div>
            )}

            {/* Add to Order / Cotización Form */}
            <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] flex items-center gap-2">
                <ShoppingCart size={16} className="text-[#0B0B0B]" />
                {t('detailModal.addToQuoteBtn')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                {/* Quantity selector */}
                <div className="sm:col-span-5 space-y-1.5">
                  <div className="flex items-center justify-between h-4">
                    <label className="text-xs font-semibold text-[#0B0B0B] leading-none">
                      {t('detailModal.orderQuantity')}:
                    </label>
                    <span className="text-[11px] text-[#6B6762] font-mono leading-none">
                      ≈ {(orderQuantityBoxes * numericSqftPerBox).toFixed(1)} sqft
                    </span>
                  </div>

                  <div className="flex items-center h-10">
                    <button
                      onClick={() => setOrderQuantityBoxes(Math.max(1, orderQuantityBoxes - 1))}
                      className="w-10 h-10 rounded-l-xl bg-white border border-[#D9D9D9] flex items-center justify-center text-[#0B0B0B] hover:bg-[#F5F5F5] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={orderQuantityBoxes}
                      onChange={(e) => setOrderQuantityBoxes(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full h-10 text-center font-bold text-[#0B0B0B] bg-white border-y border-[#D9D9D9] focus:outline-none"
                    />
                    <button
                      onClick={() => setOrderQuantityBoxes(orderQuantityBoxes + 1)}
                      className="w-10 h-10 rounded-r-xl bg-white border border-[#D9D9D9] flex items-center justify-center text-[#0B0B0B] hover:bg-[#F5F5F5] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Note / Area room details */}
                <div className="sm:col-span-7 space-y-1.5">
                  <div className="flex items-center justify-between h-4">
                    <label htmlFor={notesInputId} className="text-xs font-semibold text-[#0B0B0B] leading-none">
                      {t('detailModal.orderNotes')}
                    </label>
                  </div>

                  <div className="h-10">
                    <input
                      id={notesInputId}
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder={t('detailModal.notesPlaceholder')}
                      className="w-full h-10 bg-white border border-[#D9D9D9] rounded-xl px-3 text-xs text-[#0B0B0B] focus:border-[#0B0B0B] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddOrderSubmit}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0B0B0B] hover:bg-[#262626] text-white shadow-xs'
                  }`}
                >
                  {addedSuccess ? <Check size={18} /> : <ShoppingCart size={18} className="text-white" />}
                  <span>
                    {addedSuccess
                      ? t('detailModal.addedToQuoteSuccess')
                      : language === 'en'
                      ? `Add ${orderQuantityBoxes} Boxes of ${selectedColor.name} to Quote`
                      : `Agregar ${orderQuantityBoxes} Cajas de ${selectedColor.name} al Pedido`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full View Lightbox Modal */}
      {showFullViewModal && (
        <FullViewModal
          product={product}
          selectedColor={selectedColor}
          initialMode={viewMode}
          onClose={() => setShowFullViewModal(false)}
          onSelectColor={(c) => setSelectedColor(c)}
        />
      )}
    </>
  );
};
