import React, { useState, useId } from 'react';
import {
  X,
  Eye,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Maximize2,
  Calculator,
  Layers,
  Award,
  Sparkles,
  Info,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { TechnicalLayerDiagram } from './TechnicalLayerDiagram';
import { getSwatchBackground, formatSqftBoxes } from '../utils/textureUtils';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  product: Product | null;
  initialColor?: ProductColor;
  onClose: () => void;
  onOpenVisualizer: (product: Product, color: ProductColor) => void;
  onAddSample: (product: Product, color: ProductColor) => void;
  onAddToOrder: (
    product: Product,
    color: ProductColor,
    quantity: number,
    unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces',
    estimatedSqft: number,
    notes?: string
  ) => void;
}

export const ProductDetailModal: React.FC<Props> = ({
  product,
  initialColor,
  onClose,
  onOpenVisualizer,
  onAddSample,
  onAddToOrder,
}) => {
  const { t, language } = useLanguage();
  const sqftInputId = useId();
  const m2InputId = useId();
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    initialColor || product.colors[0]
  );
  const [calculatorArea, setCalculatorArea] = useState<string>('250');
  const [wasteMargin, setWasteMargin] = useState<number>(10);
  const [unitMode, setUnitMode] = useState<'sqft' | 'm2'>('sqft');
  const [orderQuantityBoxes, setOrderQuantityBoxes] = useState<number>(10);
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [sampleSuccess, setSampleSuccess] = useState<boolean>(false);

  // Convert m2 to sqft if needed (1 m2 = 10.7639 sqft)
  const parsedInput = parseFloat(calculatorArea) || 0;
  const areaInSqft = unitMode === 'm2' ? parsedInput * 10.7639 : parsedInput;
  const areaWithWaste = areaInSqft * (1 + wasteMargin / 100);

  // Sqft per box calculation
  const numericSqftPerBox =
    typeof product.specs.sqftPerBox === 'number'
      ? product.specs.sqftPerBox
      : typeof product.specs.sqftPerBox === 'string'
      ? parseFloat(product.specs.sqftPerBox.split(' ')[0]) || 20
      : 20;

  const { boxes: calculatedBoxes, exactSqft: calculatedExactSqft } = formatSqftBoxes(
    areaWithWaste,
    numericSqftPerBox
  );

  const handleApplyCalculatedToOrder = () => {
    setOrderQuantityBoxes(calculatedBoxes);
  };

  const handleAddOrderSubmit = () => {
    const totalSqft = Math.round(orderQuantityBoxes * numericSqftPerBox * 100) / 100;
    onAddToOrder(
      product,
      selectedColor,
      orderQuantityBoxes,
      'boxes',
      totalSqft,
      orderNotes || `Color ${selectedColor.name} (${selectedColor.code || ''})`
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleSampleRequest = () => {
    onAddSample(product, selectedColor);
    setSampleSuccess(true);
    setTimeout(() => setSampleSuccess(false), 1500);
  };

  const swatchStyle = getSwatchBackground(selectedColor);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#fcfdff]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#0a1680]"></span>
            <div>
              <span className="text-[11px] font-bold uppercase text-[#0a1680] tracking-wider">
                {product.collection}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1680] leading-tight">
                {product.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Hero: Color texture swatch + active color selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Swatch & Visualizer card */}
            <div className="md:col-span-5 relative h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
              <div className="absolute inset-0 transition-all duration-300" style={swatchStyle}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
              </div>

              {/* Hand samples badge */}
              {product.handSamplesAvailable && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#fbedb0] text-[#0a1680] text-[11px] font-bold border border-[#f1b94c]/50 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#f1b94c] animate-pulse"></span>
                  {t('productCard.samplesAvailable')}
                </div>
              )}

              {/* Action: Open Visualizer */}
              <button
                onClick={() => onOpenVisualizer(product, selectedColor)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-[#f1b94c] text-[#0a1680] text-xs font-bold shadow-md transition transform hover:scale-105 cursor-pointer"
              >
                <Eye size={14} className="text-[#0a1680]" />
                <span>{t('detailModal.openIn3D')}</span>
              </button>

              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-base font-extrabold flex items-center gap-2">
                  {selectedColor.name}
                  {selectedColor.code && (
                    <span className="text-xs bg-black/40 text-[#fbedb0] px-2 py-0.5 rounded font-mono border border-white/20">
                      CODE: {selectedColor.code}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-200">
                  {selectedColor.finish || product.specs.finished || 'Satin'}
                </div>
              </div>
            </div>

            {/* Colors picker list */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'en'
                    ? `Select Color / Variety (${product.colors.length}):`
                    : `Seleccionar Tono / Variedad (${product.colors.length}):`}
                </h3>
                <span className="text-xs text-[#0a1680] font-bold">
                  {selectedColor.name} {selectedColor.code ? `(${selectedColor.code})` : ''}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
                {product.colors.map((c) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left border transition cursor-pointer ${
                        isSelected
                          ? 'border-[#0a1680] bg-[#93b2f8]/20 shadow-xs ring-2 ring-[#93b2f8]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-slate-300 shrink-0 shadow-xs"
                        style={{ backgroundColor: c.hexColor }}
                      ></span>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-slate-800 truncate">{c.name}</div>
                        {c.code && <div className="text-[10px] text-slate-400 font-mono">{c.code}</div>}
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
                      : 'bg-[#93b2f8]/20 hover:bg-[#93b2f8]/40 text-[#0a1680] border-[#93b2f8]/40'
                  }`}
                >
                  {sampleSuccess ? <Check size={16} /> : <Plus size={16} className="text-[#0a1680]" />}
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0a1680]"></span>
              {t('detailModal.specifications')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
              {product.specs.wearLayer && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.wearLayer')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.wearLayer}</div>
                </div>
              )}
              {product.specs.totalThickness && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('productCard.thickness')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.totalThickness}</div>
                </div>
              )}
              {product.specs.rigidCore && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.coreMaterial')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.rigidCore}</div>
                </div>
              )}
              {product.specs.padding && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.integratedPadding')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.padding}</div>
                </div>
              )}
              {product.specs.plankSize && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.plankDimensions')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.plankSize}</div>
                </div>
              )}
              {product.specs.planksPerBox && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.piecesBox')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {product.specs.planksPerBox} {language === 'en' ? 'planks' : 'tablas'}
                  </div>
                </div>
              )}
              {product.specs.sqftPerBox && (
                <div className="p-2.5 bg-[#93b2f8]/20 border border-[#93b2f8]/40 rounded-xl">
                  <div className="text-[10px] text-[#0a1680] font-bold">{t('detailModal.boxSqft')}</div>
                  <div className="font-bold text-[#0a1680] mt-0.5">{product.specs.sqftPerBox} sqft</div>
                </div>
              )}
              {product.specs.installation && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.installationSystem')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.installation}</div>
                </div>
              )}
              {product.specs.finished && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{language === 'en' ? 'Surface Finish' : 'Acabado Superficial'}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.finished}</div>
                </div>
              )}
              {product.specs.warrantyResidential && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.warrantyResidential')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.warrantyResidential}</div>
                </div>
              )}
              {product.specs.warrantyCommercial && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 font-medium">{t('detailModal.warrantyCommercial')}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{product.specs.warrantyCommercial}</div>
                </div>
              )}
              {product.specs.origin && (
                <div className="p-2.5 bg-[#fbedb0]/50 border border-[#f1b94c]/40 rounded-xl">
                  <div className="text-[10px] text-[#0a1680] font-bold">{t('productCard.origin')}</div>
                  <div className="font-bold text-[#0a1680] mt-0.5">{product.specs.origin}</div>
                </div>
              )}
            </div>
          </div>

          {/* Technical Multilayer Cross-Section Diagram */}
          <TechnicalLayerDiagram type={product.technicalDiagram || 'spc-layers'} />

          {/* Interactive Calculator: Area to Boxes */}
          {product.specs.sqftPerBox && (
            <div className="bg-[#0a1680] text-white rounded-2xl p-5 space-y-4 shadow-md">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Calculator size={18} className="text-[#f1b94c]" />
                  <h3 className="text-sm font-bold text-white">{t('detailModal.calculatorTitle')}</h3>
                </div>
                <div className="flex items-center bg-[#081268] rounded-lg p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => setUnitMode('sqft')}
                    className={`px-3 py-1 rounded-md transition cursor-pointer ${
                      unitMode === 'sqft' ? 'bg-[#f1b94c] text-[#0a1680] font-bold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sq. Ft (ft²)
                  </button>
                  <button
                    onClick={() => setUnitMode('m2')}
                    className={`px-3 py-1 rounded-md transition cursor-pointer ${
                      unitMode === 'm2' ? 'bg-[#f1b94c] text-[#0a1680] font-bold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Meters² (m²)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Area Input */}
                <div className="sm:col-span-5 space-y-1">
                  <label htmlFor={unitMode === 'sqft' ? sqftInputId : m2InputId} className="text-xs text-[#93b2f8]">
                    {language === 'en' ? `Area to cover (${unitMode === 'sqft' ? 'sqft' : 'm²'}):` : `Área a cubrir (${unitMode === 'sqft' ? 'sqft' : 'm²'}):`}
                  </label>
                  <input
                    id={unitMode === 'sqft' ? sqftInputId : m2InputId}
                    type="number"
                    min="1"
                    value={calculatorArea}
                    onChange={(e) => setCalculatorArea(e.target.value)}
                    className="w-full bg-[#081268] border border-[#93b2f8]/40 rounded-xl px-3.5 py-2 text-white font-bold text-base focus:border-[#f1b94c] outline-none"
                    placeholder="e.g. 250"
                  />
                </div>

                {/* Waste selector */}
                <div className="sm:col-span-3 space-y-1">
                  <label className="text-xs text-[#93b2f8]">{t('detailModal.wasteMargin')}</label>
                  <div className="flex gap-1">
                    {[5, 10, 15].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWasteMargin(w)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                          wasteMargin === w
                            ? 'bg-[#f1b94c] border-[#f1b94c] text-[#0a1680] font-bold'
                            : 'bg-[#081268] border-[#93b2f8]/30 text-white/80 hover:bg-[#081268]/80'
                        }`}
                      >
                        +{w}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Result Box */}
                <div className="sm:col-span-4 bg-[#081268] border border-[#93b2f8]/30 rounded-xl p-3 text-center">
                  <div className="text-[11px] text-[#93b2f8]">{t('detailModal.calculatedBoxes')}:</div>
                  <div className="text-2xl font-extrabold text-[#f1b94c]">
                    {calculatedBoxes} {language === 'en' ? 'Boxes' : 'Cajas'}
                  </div>
                  <div className="text-[11px] text-[#fbedb0]">
                    {calculatedExactSqft} sqft ({product.specs.sqftPerBox} sqft/{language === 'en' ? 'box' : 'caja'})
                  </div>
                </div>
              </div>

              <button
                onClick={handleApplyCalculatedToOrder}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white border border-white/20 transition cursor-pointer"
              >
                {language === 'en'
                  ? `Apply ${calculatedBoxes} Boxes to Order Selector Below ↓`
                  : `Aplicar ${calculatedBoxes} Cajas al selector de pedido de abajo ↓`}
              </button>
            </div>
          )}

          {/* Add to Order / Cotización Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ShoppingCart size={16} className="text-[#0a1680]" />
              {t('detailModal.addToQuoteBtn')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Quantity selector */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-semibold text-slate-700">{t('detailModal.orderQuantity')}:</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setOrderQuantityBoxes(Math.max(1, orderQuantityBoxes - 1))}
                    className="w-10 h-10 rounded-l-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={orderQuantityBoxes}
                    onChange={(e) => setOrderQuantityBoxes(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full h-10 text-center font-bold text-slate-900 bg-white border-y border-slate-300 focus:outline-none"
                  />
                  <button
                    onClick={() => setOrderQuantityBoxes(orderQuantityBoxes + 1)}
                    className="w-10 h-10 rounded-r-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 text-center">
                  ≈ {(orderQuantityBoxes * numericSqftPerBox).toFixed(2)} {language === 'en' ? 'est. sqft' : 'sqft estimados'}
                </div>
              </div>

              {/* Note / Area room details */}
              <div className="sm:col-span-8 space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {t('detailModal.orderNotes')}
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={t('detailModal.notesPlaceholder')}
                  className="w-full h-10 bg-white border border-slate-300 rounded-xl px-3 text-xs text-slate-800 focus:border-[#0a1680] outline-none"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddOrderSubmit}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0a1680] hover:bg-[#081268] text-white shadow-[#0a1680]/25'
                }`}
              >
                {addedSuccess ? <Check size={18} /> : <ShoppingCart size={18} className="text-[#f1b94c]" />}
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
  );
};
