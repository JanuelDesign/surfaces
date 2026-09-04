import React, { useState, useEffect, useId } from 'react';
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
import { roundNumber, formatCleanNumber } from '../utils/numberUtils';
import {
  generatePlankSVG,
  generateRoomSceneSVG,
} from '../utils/imageCatalog';
import { formatImageUrl } from '../utils/imageUrlFormatter';
import { TechnicalLayerDiagram } from './TechnicalLayerDiagram';
import { FullViewModal } from './FullViewModal';
import { useLanguage } from '../i18n/LanguageContext';
import { ROOMVO_VISUALIZER_URL } from '../utils/constants';

export const getBaseboardPieceLength = (
  colorName: string,
  specsPlankSize?: string,
  specsLength?: string
): number => {
  const colorMatch = colorName.match(/(\d+(?:\.\d+)?)\s*(?:ft|')/i);
  if (colorMatch && colorMatch[1]) {
    const val = parseFloat(colorMatch[1]);
    if (!isNaN(val) && val > 0) return val;
  }
  const str = `${specsPlankSize || ''} ${specsLength || ''}`;
  const specMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:ft|')/i);
  if (specMatch && specMatch[1]) {
    const val = parseFloat(specMatch[1]);
    if (!isNaN(val) && val > 0) return val;
  }
  return 16;
};

interface Props {
  product: Product;
  initialSelectedColor?: ProductColor;
  initialColor?: ProductColor;
  onClose: () => void;
  onOpenVisualizer?: (product: Product, selectedColor: ProductColor) => void;
  onAddSample: (product: Product, selectedColor: ProductColor) => void;
  onAddToOrder: (
    product: Product,
    selectedColor: ProductColor,
    quantity: number,
    unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces',
    estimatedSqft?: number,
    notes?: string,
    estimatedLinearFt?: number
  ) => void;
  onOpenQuoteDrawer?: () => void;
}

export const ProductDetailModal: React.FC<Props> = ({
  product,
  initialSelectedColor,
  initialColor,
  onClose,
  onOpenVisualizer,
  onAddSample,
  onAddToOrder,
  onOpenQuoteDrawer,
}) => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    initialSelectedColor || initialColor || product.colors[0]
  );

  // Categories logic
  const isBaseboards = product.category === 'baseboards';
  const isPieceCategory = ['stair-steps', 'moldings', 'baseboards'].includes(product.category);

  // Check if product has sqft per box specification
  const hasSqftPerBox = Boolean(product.specs.sqftPerBox);
  const numericSqftPerBox =
    typeof product.specs.sqftPerBox === 'number'
      ? product.specs.sqftPerBox
      : parseFloat(String(product.specs.sqftPerBox || '24.26')) || 24.26;

  // Baseboard piece length calculation
  const baseboardPieceLength = getBaseboardPieceLength(
    selectedColor.name,
    product.specs.plankSize,
    product.specs.length
  );

  // Compute boxes from area
  const computeBoxesFromArea = (areaVal: string, mode: 'sqft' | 'm2') => {
    const raw = parseFloat(areaVal);
    if (isNaN(raw) || raw <= 0) return 10;
    const sqft = mode === 'm2' ? raw * 10.7639 : raw;
    return Math.max(1, Math.ceil(sqft / numericSqftPerBox));
  };

  // Calculator State & Unified Quantity
  const [unitMode, setUnitMode] = useState<'sqft' | 'm2'>('sqft');
  const [calculatorArea, setCalculatorArea] = useState<string>(hasSqftPerBox ? '250' : '');
  const [linearFeetInput, setLinearFeetInput] = useState<string>(isBaseboards ? '120' : '');
  const [orderQuantity, setOrderQuantity] = useState<number>(() => {
    if (hasSqftPerBox) return computeBoxesFromArea('250', 'sqft');
    if (isBaseboards) {
      const pLen = getBaseboardPieceLength(
        (initialSelectedColor || initialColor || product.colors[0]).name,
        product.specs.plankSize,
        product.specs.length
      );
      return Math.max(1, Math.ceil(120 / pLen));
    }
    if (product.category === 'stair-steps') return 12;
    return 10;
  });
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [postAddSuccess, setPostAddSuccess] = useState(false);
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // View Mode: 'plank' vs 'room'
  const [viewMode, setViewMode] = useState<'plank' | 'room'>('plank');
  const [showFullViewModal, setShowFullViewModal] = useState(false);

  const areaInputId = useId();
  const linearFeetInputId = useId();
  const notesInputId = useId();

  const isAccessory = ['baseboards', 'moldings', 'stair-steps'].includes(product.category);

  // Update baseboard pieces when selectedColor variant changes
  useEffect(() => {
    if (isBaseboards && linearFeetInput) {
      const raw = parseFloat(linearFeetInput);
      if (!isNaN(raw) && raw > 0) {
        const pLen = getBaseboardPieceLength(
          selectedColor.name,
          product.specs.plankSize,
          product.specs.length
        );
        setOrderQuantity(Math.max(1, Math.ceil(raw / pLen)));
      }
    }
  }, [selectedColor, isBaseboards]);

  // Instant automatic sync when area is typed (for flooring)
  const handleAreaChange = (val: string) => {
    setCalculatorArea(val);
    const rawNum = parseFloat(val);
    if (!isNaN(rawNum) && rawNum > 0) {
      const areaSqft = unitMode === 'm2' ? rawNum * 10.7639 : rawNum;
      const boxes = Math.max(1, Math.ceil(areaSqft / numericSqftPerBox));
      setOrderQuantity(boxes);
    }
  };

  // Instant automatic sync when linear feet is typed (for baseboards)
  const handleLinearFeetChange = (val: string) => {
    setLinearFeetInput(val);
    const raw = parseFloat(val);
    if (!isNaN(raw) && raw > 0) {
      const pieces = Math.max(1, Math.ceil(raw / baseboardPieceLength));
      setOrderQuantity(pieces);
    }
  };

  // Instant automatic sync when unit mode toggles (sqft <-> m2)
  const handleUnitToggle = (mode: 'sqft' | 'm2') => {
    if (mode === unitMode) return;
    setUnitMode(mode);
    const rawNum = parseFloat(calculatorArea);
    if (!isNaN(rawNum) && rawNum > 0) {
      const convertedArea = mode === 'm2' ? rawNum / 10.7639 : rawNum * 10.7639;
      const cleanAreaStr = formatCleanNumber(convertedArea, 2);
      setCalculatorArea(cleanAreaStr);
      const areaSqft = mode === 'm2' ? convertedArea * 10.7639 : convertedArea;
      const boxes = Math.max(1, Math.ceil(areaSqft / numericSqftPerBox));
      setOrderQuantity(boxes);
    }
  };

  const handleAddOrderSubmit = () => {
    const unitType = isPieceCategory ? 'pieces' : 'boxes';
    const estimatedSqft = hasSqftPerBox ? roundNumber(orderQuantity * numericSqftPerBox, 2) : 0;
    const estimatedLinearFt = isBaseboards ? roundNumber(orderQuantity * baseboardPieceLength, 2) : 0;
    onAddToOrder(
      product,
      selectedColor,
      orderQuantity,
      unitType,
      estimatedSqft,
      orderNotes,
      estimatedLinearFt
    );
    setPostAddSuccess(true);
  };

  const handleSampleRequest = () => {
    onAddSample(product, selectedColor);
    setSampleSuccess(true);
    setTimeout(() => setSampleSuccess(false), 1500);
  };

  // Dynamic Image Generation or Photo URL
  const customPlankPhoto = formatImageUrl(selectedColor.image);
  const customRoomPhoto = formatImageUrl(selectedColor.roomImage);

  const fallbackPlankSvg = generatePlankSVG(
    selectedColor.hexColor || '#c7b28e',
    selectedColor.secondaryHex || '#8c7355',
    'rgba(0,0,0,0.22)',
    selectedColor.patternType || 'wood'
  );

  const fallbackRoomSvg = generateRoomSceneSVG(
    selectedColor.hexColor || '#c7b28e',
    selectedColor.secondaryHex || '#8c7355',
    'living'
  );

  let currentDisplayImage = '';
  let fallbackImage = '';

  if (viewMode === 'room') {
    currentDisplayImage = customRoomPhoto || customPlankPhoto || fallbackRoomSvg;
    fallbackImage = fallbackRoomSvg;
  } else {
    currentDisplayImage = customPlankPhoto || fallbackPlankSvg;
    fallbackImage = fallbackPlankSvg;
  }

  const [imgLoadError, setImgLoadError] = useState(false);

  useEffect(() => {
    setImgLoadError(false);
  }, [selectedColor, viewMode, product]);

  // Dynamic dimension specs simplified for currently selected variant
  const activeSpecs = React.useMemo(() => {
    const specs = { ...product.specs };

    if (product.category === 'stair-steps') {
      const isDouble =
        selectedColor.name.toLowerCase().includes('double') ||
        (selectedColor.code && selectedColor.code.toLowerCase().includes('double'));
      const isSquare =
        selectedColor.name.toLowerCase().includes('square') ||
        (selectedColor.code && selectedColor.code.toLowerCase().includes('square'));

      if (isDouble) {
        specs.height = '1-3/4" x 1-1/2"';
        specs.length = '48" & 60"';
      } else if (isSquare) {
        specs.height = '1-3/4" x 1-3/8"';
        specs.length = '48" & 60"';
      }
    } else if (product.category === 'moldings') {
      const name = selectedColor.name;
      const code = selectedColor.code || '';
      if (name.includes('CM T-Molding') || code === 'CM-T') {
        specs.plankSize = '1-3/4" x 3/8"';
        specs.length = '94"';
      } else if (name.includes('CM Reducer') || code === 'CM-R') {
        specs.plankSize = '1-3/4" x 3/8"';
        specs.length = '94"';
      } else if (name.includes('Standard T-Molding') || code === 'STD-T') {
        specs.plankSize = '1-3/4" x 1/4"';
        specs.length = '94"';
      } else if (name.includes('Standard Reducer') || code === 'STD-R') {
        specs.plankSize = '1-3/4" x 3/8"';
        specs.length = '94"';
      } else if (name.includes('End Cap') || code === 'EndCap') {
        specs.plankSize = '1-3/8" x 3/8"';
        specs.length = '94"';
      }
    } else if (product.category === 'baseboards') {
      const name = selectedColor.name;
      if (name.includes('BB1x6 Pine (14mm')) {
        specs.totalThickness = '14 mm (9/16")';
        specs.plankSize = '16 ft';
        specs.height = '5-1/2" (1x6)';
      } else if (name.includes('BB1x6 Pine Heavy (18mm')) {
        specs.totalThickness = '18 mm (11/16")';
        specs.plankSize = '16 ft';
        specs.height = '5-1/2" (1x6)';
      } else if (name.includes('BB1x4 Pine (14mm')) {
        specs.totalThickness = '14 mm (9/16")';
        specs.plankSize = '17 ft';
        specs.height = '3-1/2" (1x4)';
      } else if (name.includes('BB1x4 Pine Thick (18mm')) {
        specs.totalThickness = '18 mm (11/16")';
        specs.plankSize = '17 ft';
        specs.height = '3-1/2" (1x4)';
      } else if (name.includes('BB1x3') && name.includes('1-1/2"')) {
        specs.totalThickness = '18 mm (11/16")';
        specs.plankSize = '17 ft';
        specs.height = '1-1/2" (1x3)';
      } else if (name.includes('BB1x3') && name.includes('2-1/2"')) {
        specs.totalThickness = '18 mm (11/16")';
        specs.plankSize = '17 ft';
        specs.height = '2-1/2" (1x3)';
      } else if (name.includes('BB5180')) {
        specs.totalThickness = '14 mm (9/16")';
        specs.plankSize = '16 ft';
        specs.height = '5-1/4"';
      } else if (name.includes('BB618')) {
        specs.totalThickness = '14 mm (9/16")';
        specs.plankSize = '16 ft';
        specs.height = '5-1/2"';
      } else if (name.includes('BB620')) {
        specs.totalThickness = '14 mm (9/16")';
        specs.plankSize = '16 ft';
        specs.height = '3-1/4"';
      } else if (name.includes('Quarter Round EPS')) {
        specs.totalThickness = '5/8" x 5/8"';
        specs.plankSize = '12 ft';
        specs.height = '5/8"';
      } else if (name.includes('Quarter Round Pine')) {
        specs.totalThickness = '11/16" x 11/16"';
        specs.plankSize = '16 ft';
        specs.height = '11/16"';
      } else if (name.includes('Square 1x1')) {
        specs.totalThickness = '1" x 1"';
        specs.plankSize = '8 ft';
        specs.height = '1"';
      }
    }

    return specs;
  }, [product, selectedColor]);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 md:p-6">
        <div
          className="bg-white w-full h-full sm:h-auto sm:max-w-4xl rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-[#D9D9D9] overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#D9D9D9] bg-[#F5F5F5] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0B0B0B]"></span>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-[#6B6762] tracking-wider">
                  {product.collection}
                </span>
                <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0B0B0B] leading-tight">
                  {product.name}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#D9D9D9] border border-[#D9D9D9] flex items-center justify-center text-[#0B0B0B] transition cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1">
            {/* Top Hero: Visualizer + Plank / Room Switcher + Active Color Selector */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
              {/* Visual Display Card */}
              <div className="md:col-span-6 space-y-2">
                <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden border border-[#D9D9D9] shadow-sm bg-[#0B0B0B] group">
                  <img
                    src={imgLoadError ? fallbackImage : currentDisplayImage}
                    alt={`${product.name} - ${selectedColor.name}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgLoadError(true)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Top Switcher: Hidden for Baseboards; Photo/Room for Moldings & Steps; Plank/Room for SPC */}
                  {product.category !== 'baseboards' && (
                    <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex bg-black/70 backdrop-blur-md p-0.5 sm:p-1 rounded-xl border border-white/20 z-10">
                      <button
                        onClick={() => {
                          setImgLoadError(false);
                          setViewMode('plank');
                        }}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                          viewMode === 'plank'
                            ? 'bg-[#0B0B0B] text-white shadow-xs'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <Layers size={12} />
                        <span>{product.category === 'spc-vinyl' ? 'Plank' : (language === 'en' ? 'Photo' : 'Foto')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setImgLoadError(false);
                          setViewMode('room');
                        }}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                          viewMode === 'room'
                            ? 'bg-[#0B0B0B] text-white shadow-xs'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <Eye size={12} />
                        <span>{language === 'en' ? 'Room' : 'Ambiente'}</span>
                      </button>
                    </div>
                  )}

                  {/* Full View Lightbox Expand Button */}
                  <button
                    onClick={() => setShowFullViewModal(true)}
                    className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 p-1.5 sm:p-2 rounded-xl bg-black/70 hover:bg-white hover:text-[#0B0B0B] text-white backdrop-blur-md border border-white/20 transition cursor-pointer shadow-md z-10"
                    title={language === 'en' ? 'Full Screen High-Res View' : 'Ver en Alta Resolución / Pantalla Completa'}
                  >
                    <Maximize2 size={14} />
                  </button>
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

                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-h-48 overflow-y-auto pr-1">
                  {product.colors.map((c, idx) => {
                    const isSelected = selectedColor.name === c.name;
                    const keyId = c.id || c.code || `${product.id}-${c.name}-${idx}`;
                    return (
                      <button
                        key={keyId}
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
                            {product.category === 'spc-vinyl' ? (c.code || c.name) : c.name}
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

            {/* Unified Area Calculator & Quote Order Panel (Single Black Panel) - Positioned immediately below photo & color selector for primary ordering flow */}
            <div className="bg-[#0B0B0B] text-white rounded-2xl p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-xl border border-[#262626]">
              {/* Panel Header */}
              <div className="flex items-center justify-between flex-wrap gap-2.5 pb-2 border-b border-[#262626]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Calculator size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                      {hasSqftPerBox
                        ? (isEn ? 'Area Calculator & Quote Order' : 'Calculadora de Área y Pedido')
                        : isBaseboards
                        ? (isEn ? 'Linear Feet Calculator & Order' : 'Calculadora de Pies Lineales y Pedido')
                        : (isEn ? 'Order Quantity & Specifications' : 'Cantidad a Pedir y Especificaciones')}
                    </h3>
                    <p className="text-[11px] text-[#8C887B]">
                      {hasSqftPerBox
                        ? (isEn ? 'Enter area to auto-calculate boxes, then fine-tune with + / -' : 'Ingresa el área para calcular cajas automáticamente y ajusta con + / -')
                        : isBaseboards
                        ? (isEn ? 'Enter linear feet needed to auto-calculate pieces, then adjust with + / -' : 'Ingresa los pies lineales necesarios para calcular piezas automáticamente y ajusta con + / -')
                        : (isEn ? 'Select quantity of pieces and add project notes' : 'Selecciona la cantidad de piezas y agrega notas del proyecto')}
                    </p>
                  </div>
                </div>

                {/* Sq. Ft / m² Switcher (Only for flooring with sqftPerBox) */}
                {hasSqftPerBox && (
                  <div className="flex items-center bg-[#1A1A1A] rounded-xl p-1 text-xs font-semibold border border-[#333333]">
                    <button
                      type="button"
                      onClick={() => handleUnitToggle('sqft')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                        unitMode === 'sqft'
                          ? 'bg-white text-[#0B0B0B] font-bold shadow-xs'
                          : 'text-[#BCBAB4] hover:text-white'
                      }`}
                    >
                      Sq. Ft (ft²)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUnitToggle('m2')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                        unitMode === 'm2'
                          ? 'bg-white text-[#0B0B0B] font-bold shadow-xs'
                          : 'text-[#BCBAB4] hover:text-white'
                      }`}
                    >
                      Meters² (m²)
                    </button>
                  </div>
                )}
              </div>

              {/* Area to Cover / Linear Feet & Quantity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                {/* 1A. Area Input (if flooring) */}
                {hasSqftPerBox && (
                  <div className="sm:col-span-6 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor={areaInputId} className="text-xs font-semibold text-[#BCBAB4]">
                        {isEn
                          ? `Area to cover (${unitMode === 'sqft' ? 'sqft' : 'm²'}):`
                          : `Área a cubrir (${unitMode === 'sqft' ? 'sqft' : 'm²'}):`}
                      </label>
                      <span className="text-[11px] text-[#8C887B] font-mono">
                        {product.specs.sqftPerBox} sqft / {isEn ? 'box' : 'caja'}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id={areaInputId}
                        type="number"
                        min="1"
                        value={calculatorArea}
                        onChange={(e) => handleAreaChange(e.target.value)}
                        placeholder="e.g. 250"
                        className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-white rounded-xl px-4 py-2.5 text-white font-bold text-base outline-none transition"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C887B] uppercase pointer-events-none">
                        {unitMode === 'sqft' ? 'ft²' : 'm²'}
                      </span>
                    </div>
                  </div>
                )}

                {/* 1B. Linear Feet Input (if Baseboards) */}
                {isBaseboards && (
                  <div className="sm:col-span-6 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor={linearFeetInputId} className="text-xs font-semibold text-[#BCBAB4]">
                        {isEn ? 'Linear Feet Needed:' : 'Pies Lineales Necesarios:'}
                      </label>
                      <span className="text-[11px] text-amber-400 font-mono font-semibold">
                        {formatCleanNumber(baseboardPieceLength)} ft / {isEn ? 'piece' : 'pieza'}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id={linearFeetInputId}
                        type="number"
                        min="1"
                        value={linearFeetInput}
                        onChange={(e) => handleLinearFeetChange(e.target.value)}
                        placeholder="e.g. 120"
                        className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-white rounded-xl px-4 py-2.5 text-white font-bold text-base outline-none transition"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C887B] uppercase pointer-events-none">
                        {isEn ? 'lin. ft' : 'pies lin.'}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8C887B]">
                      {isEn
                        ? `Piece length: ${formatCleanNumber(baseboardPieceLength)} ft. Auto-calculates pieces needed rounded up.`
                        : `Largo por pieza: ${formatCleanNumber(baseboardPieceLength)} ft. Calcula las piezas necesarias redondeando hacia arriba.`}
                    </p>
                  </div>
                )}

                {/* 2. Order Quantity with +/- (Auto-calculated & directly editable) */}
                <div className={`${hasSqftPerBox || isBaseboards ? 'sm:col-span-6' : 'sm:col-span-12 max-w-sm'} space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white">
                      {hasSqftPerBox
                        ? (isEn ? 'Order Quantity (Boxes):' : 'Cantidad a Pedir (Cajas):')
                        : (isEn ? 'Order Quantity (Pieces):' : 'Cantidad a Pedir (Piezas):')}
                    </label>
                    {hasSqftPerBox && (
                      <span className="text-[11px] text-emerald-400 font-mono font-bold">
                        ≈ {formatCleanNumber(orderQuantity * numericSqftPerBox, 2)} sqft
                        {unitMode === 'm2' && ` (${formatCleanNumber(orderQuantity * numericSqftPerBox * 0.092903, 2)} m²)`}
                      </span>
                    )}
                    {isBaseboards && (
                      <span className="text-[11px] text-emerald-400 font-mono font-bold">
                        {formatCleanNumber(orderQuantity * baseboardPieceLength, 2)} ft {isEn ? 'covered' : 'cubiertos'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center h-11 bg-[#1A1A1A] border border-[#333333] rounded-xl overflow-hidden focus-within:border-white transition">
                    <button
                      type="button"
                      onClick={() => setOrderQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-11 h-full bg-[#262626] hover:bg-[#333333] flex items-center justify-center text-white transition cursor-pointer shrink-0"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={orderQuantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setOrderQuantity(isNaN(val) ? 1 : Math.max(1, val));
                      }}
                      className="w-full h-full text-center font-extrabold text-lg text-white bg-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setOrderQuantity((prev) => prev + 1)}
                      className="w-11 h-full bg-[#262626] hover:bg-[#333333] flex items-center justify-center text-white transition cursor-pointer shrink-0"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {hasSqftPerBox && (
                    <p className="text-[10px] text-[#8C887B]">
                      {isEn
                        ? 'Adjust with + / - to add extra margin for cuts or breakage'
                        : 'Ajusta con + / - para agregar margen extra de cortes o desperdicio'}
                    </p>
                  )}
                  {isBaseboards && (
                    <p className="text-[10px] text-[#8C887B]">
                      {isEn
                        ? `Pieces needed: ${orderQuantity} (${formatCleanNumber(orderQuantity * baseboardPieceLength, 2)} ft covered). Adjust with + / - for cuts or extra margin.`
                        : `Piezas necesarias: ${orderQuantity} (${formatCleanNumber(orderQuantity * baseboardPieceLength, 2)} ft cubiertos). Ajusta con + / - para cortes o margen extra.`}
                    </p>
                  )}
                  {!hasSqftPerBox && !isBaseboards && (
                    <p className="text-[10px] text-[#8C887B]">
                      {isEn
                        ? 'Adjust quantity of pieces with + / - buttons'
                        : 'Ajusta la cantidad de piezas con los botones + / -'}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Project Notes / Custom Specifications */}
              <div className="space-y-1.5">
                <label htmlFor={notesInputId} className="text-xs font-semibold text-[#BCBAB4] block">
                  {t('detailModal.orderNotes')}
                </label>
                <input
                  id={notesInputId}
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={t('detailModal.notesPlaceholder')}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6B6762] focus:border-white outline-none transition"
                />
              </div>

              {/* 4. Action Area / Post-Add Flow */}
              {!postAddSuccess ? (
                <button
                  type="button"
                  onClick={handleAddOrderSubmit}
                  className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-white hover:bg-[#E5E5E5] text-[#0B0B0B] transition flex items-center justify-center gap-2.5 shadow-md cursor-pointer group"
                >
                  <ShoppingCart size={18} className="text-[#0B0B0B] group-hover:scale-110 transition-transform" />
                  <span>
                    {isEn
                      ? `Add ${orderQuantity} ${
                          isPieceCategory
                            ? orderQuantity === 1
                              ? 'Piece'
                              : 'Pieces'
                            : orderQuantity === 1
                            ? 'Box'
                            : 'Boxes'
                        } of ${selectedColor.name} to Quote`
                      : `Agregar ${orderQuantity} ${
                          isPieceCategory
                            ? orderQuantity === 1
                              ? 'Pieza'
                              : 'Piezas'
                            : orderQuantity === 1
                            ? 'Caja'
                            : 'Cajas'
                        } de ${selectedColor.name} a la Cotización`}
                  </span>
                </button>
              ) : (
                /* Post-Add Confirmation with TWO clear actions */
                <div className="bg-[#141414] border border-emerald-500/50 rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/60 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check size={18} className="stroke-[3]" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-white flex items-center gap-2">
                          <span>{isEn ? 'Added to your quote!' : '¡Agregado a tu cotización!'}</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            {isEn ? 'Confirmed' : 'Confirmado'}
                          </span>
                        </div>
                        <div className="text-xs text-[#BCBAB4] mt-0.5">
                          <span className="font-bold text-white">
                            {orderQuantity}{' '}
                            {isPieceCategory
                              ? isEn
                                ? orderQuantity === 1 ? 'piece' : 'pieces'
                                : orderQuantity === 1 ? 'pieza' : 'piezas'
                              : isEn
                              ? orderQuantity === 1 ? 'box' : 'boxes'
                              : orderQuantity === 1 ? 'caja' : 'cajas'}
                          </span>{' '}
                          {isBaseboards && (
                            <span className="text-emerald-400 font-semibold">
                              (≈ {formatCleanNumber(orderQuantity * baseboardPieceLength, 2)} {isEn ? 'linear ft covered' : 'pies lineales cubiertos'})
                            </span>
                          )}
                          {hasSqftPerBox && (
                            <span className="text-emerald-400 font-semibold">
                              (≈ {formatCleanNumber(orderQuantity * numericSqftPerBox, 2)} sqft)
                            </span>
                          )}
                          <span className="text-[#8C887B]"> • {selectedColor.name}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPostAddSuccess(false)}
                      className="text-xs text-[#8C887B] hover:text-white underline cursor-pointer"
                    >
                      {isEn ? 'Modify' : 'Modificar'}
                    </button>
                  </div>

                  {/* Two Clear Post-Add Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Action 1: "Seguir viendo productos" */}
                    <button
                      type="button"
                      onClick={() => {
                        setPostAddSuccess(false);
                        onClose();
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#262626] hover:bg-[#333333] text-white border border-[#404040] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <ChevronLeft size={16} className="text-[#BCBAB4] group-hover:-translate-x-0.5 transition-transform" />
                      <span>{isEn ? 'Continue Browsing Products' : 'Seguir viendo productos'}</span>
                    </button>

                    {/* Action 2: "Ir a mi cotización" */}
                    <button
                      type="button"
                      onClick={() => {
                        setPostAddSuccess(false);
                        onClose();
                        onOpenQuoteDrawer?.();
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#E5E5E5] text-[#0B0B0B] text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
                    >
                      <ShoppingCart size={16} className="text-[#0B0B0B]" />
                      <span>{isEn ? 'View My Quote' : 'Ir a mi cotización'}</span>
                      <ChevronRight size={16} className="text-[#0B0B0B] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0B0B0B]"></span>
                {t('detailModal.specifications')}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5 text-xs">
                {activeSpecs.wearLayer && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.wearLayer')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.wearLayer}</div>
                  </div>
                )}
                {activeSpecs.totalThickness && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('productCard.thickness')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.totalThickness}</div>
                  </div>
                )}
                {activeSpecs.material && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.coreMaterial')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate" title={activeSpecs.material}>
                      {activeSpecs.material}
                    </div>
                  </div>
                )}
                {activeSpecs.height && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('productCard.height')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.height}</div>
                  </div>
                )}
                {activeSpecs.rigidCore && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.coreMaterial')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.rigidCore}</div>
                  </div>
                )}
                {activeSpecs.padding && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.integratedPadding')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.padding}</div>
                  </div>
                )}
                {activeSpecs.plankSize && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">
                      {product.category === 'moldings'
                        ? (language === 'en' ? 'Profile Size' : 'Dimensión Perfil')
                        : product.category === 'baseboards'
                        ? (language === 'en' ? 'Length' : 'Largo de Tira')
                        : t('detailModal.plankDimensions')}
                    </div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.plankSize}</div>
                  </div>
                )}
                {activeSpecs.length && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('productCard.length')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.length}</div>
                  </div>
                )}
                {activeSpecs.planksPerBox && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.piecesBox')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">
                      {activeSpecs.planksPerBox} {language === 'en' ? 'planks' : 'tablas'}
                    </div>
                  </div>
                )}
                {activeSpecs.sqftPerBox && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#0B0B0B] font-bold">{t('detailModal.boxSqft')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.sqftPerBox} sqft</div>
                  </div>
                )}
                {activeSpecs.installation && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.installationSystem')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.installation}</div>
                  </div>
                )}
                {activeSpecs.finished && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.surfaceFinish')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.finished}</div>
                  </div>
                )}
                {activeSpecs.compatibleWith && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl col-span-2">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.compatibleWith')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 line-clamp-2">{activeSpecs.compatibleWith}</div>
                  </div>
                )}
                {activeSpecs.warrantyResidential && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.warrantyResidential')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.warrantyResidential}</div>
                  </div>
                )}
                {activeSpecs.warrantyCommercial && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#6B6762] font-medium">{t('detailModal.warrantyCommercial')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.warrantyCommercial}</div>
                  </div>
                )}
                {activeSpecs.origin && (
                  <div className="p-2 sm:p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl">
                    <div className="text-[10px] text-[#0B0B0B] font-bold">{t('productCard.origin')}</div>
                    <div className="font-bold text-[#0B0B0B] mt-0.5 truncate">{activeSpecs.origin}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Multilayer Cross-Section Diagram */}
            <TechnicalLayerDiagram type={product.technicalDiagram || 'spc-layers'} />
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
