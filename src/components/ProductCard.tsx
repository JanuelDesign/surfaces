import React, { useState } from 'react';
import {
  Eye,
  FileText,
  Plus,
  Check,
  Maximize2,
  Layers,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  generatePlankSVG,
  generateRoomSceneSVG,
  BASEBOARD_IMAGES,
  MOLDING_IMAGES,
  STAIR_PROFILES,
} from '../utils/imageCatalog';
import { FullViewModal } from './FullViewModal';
import { ROOMVO_VISUALIZER_URL } from '../utils/constants';

interface Props {
  product: Product;
  onOpenDetail: (product: Product, selectedColor: ProductColor) => void;
  onOpenVisualizerWithProduct?: (product: Product, selectedColor: ProductColor) => void;
  onAddSample: (product: Product, selectedColor: ProductColor) => void;
  onAddToOrder: (product: Product, selectedColor: ProductColor) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onOpenDetail,
  onOpenVisualizerWithProduct,
  onAddSample,
  onAddToOrder,
}) => {
  const { t, language } = useLanguage();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const [sampleAddedFeedback, setSampleAddedFeedback] = useState(false);
  const [cardViewMode, setCardViewMode] = useState<'plank' | 'room'>('plank');
  const [showFullView, setShowFullView] = useState(false);

  const handleQuickAddSample = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddSample(product, selectedColor);
    setSampleAddedFeedback(true);
    setTimeout(() => setSampleAddedFeedback(false), 1500);
  };

  const isAccessory = ['baseboards', 'moldings', 'stair-steps'].includes(product.category);

  // High-fidelity image assets
  const plankSvg = generatePlankSVG(
    selectedColor.hexColor || '#c7b28e',
    selectedColor.secondaryHex || '#8c7355',
    'rgba(0,0,0,0.22)',
    selectedColor.patternType || 'wood'
  );

  const roomSvg = generateRoomSceneSVG(
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

  const currentDisplayImage = isAccessory
    ? (cardViewMode === 'room' ? (accessoryData?.photoUrl || accessoryData?.profileSvg || plankSvg) : (accessoryData?.profileSvg || plankSvg))
    : (cardViewMode === 'room' ? roomSvg : plankSvg);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#93b2f8]/30 hover:border-[#0a1680] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
        {/* Visualizer & Plank Swatch Area - Bento Tile Top */}
        <div
          className="relative h-48 bg-slate-950 overflow-hidden cursor-pointer"
          onClick={() => onOpenDetail(product, selectedColor)}
        >
          {/* Main High-Res Image Display */}
          <img
            src={currentDisplayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top Left: View Switcher (Plank vs Room) */}
          <div
            className="absolute top-2.5 left-2.5 flex bg-black/60 backdrop-blur-md p-0.5 rounded-lg border border-white/20 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCardViewMode('plank')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                cardViewMode === 'plank'
                  ? 'bg-[#0a1680] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {isAccessory ? (language === 'en' ? 'Diagram' : 'Diagrama') : (language === 'en' ? 'Plank' : 'Plank')}
            </button>
            <button
              onClick={() => setCardViewMode('room')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                cardViewMode === 'room'
                  ? 'bg-[#0a1680] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {isAccessory ? (language === 'en' ? 'Photo' : 'Foto') : (language === 'en' ? 'Room' : 'Ambiente')}
            </button>
          </div>

          {/* Top Right: Full View Lightbox Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullView(true);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-[#f1b94c] hover:text-[#0a1680] text-white backdrop-blur-md border border-white/20 transition cursor-pointer shadow-sm z-10"
            title={language === 'en' ? 'Open High-Res Full View' : 'Ver en Pantalla Completa'}
          >
            <Maximize2 size={13} />
          </button>

          {/* Quick 3D View Floating Button */}
          <a
            href={ROOMVO_VISUALIZER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 hover:bg-[#f1b94c] text-[#0a1680] text-[11px] font-bold shadow-md backdrop-blur-xs transition transform hover:scale-105 cursor-pointer z-10"
            title={language === 'en' ? 'Launch 3D Room Visualizer' : 'Abrir en Visualizador 3D'}
          >
            <Eye size={12} className="text-[#0a1680]" />
            <span>{t('productCard.view3D')}</span>
          </a>

          {/* Current Active Color overlay info */}
          <div className="absolute bottom-2.5 left-2.5 text-white z-10 pointer-events-none">
            <div className="text-xs font-bold drop-shadow-md flex items-center gap-1.5">
              <span>{selectedColor.name}</span>
              {selectedColor.code && (
                <span className="text-[9px] bg-black/50 text-[#fbedb0] px-1.5 py-0.5 rounded font-mono font-medium border border-white/20">
                  {selectedColor.code}
                </span>
              )}
            </div>
            {selectedColor.finish && (
              <div className="text-[10px] text-white/90 drop-shadow-xs">{selectedColor.finish}</div>
            )}
          </div>
        </div>

        {/* Bento Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0a1680]">
                  {product.collection}
                </span>
                <h3
                  onClick={() => onOpenDetail(product, selectedColor)}
                  className="text-base font-bold text-[#0a1680] hover:text-[#081268] cursor-pointer transition mt-0.5"
                >
                  {product.name}
                </h3>
              </div>
              {product.specs.warrantyResidential && (
                <span className="text-[10px] font-bold text-slate-700 bg-[#93b2f8]/20 px-2 py-0.5 rounded-sm border border-[#93b2f8]/30 shrink-0 uppercase tracking-wider">
                  {product.specs.warrantyResidential.split(' ')[0]} {product.specs.warrantyResidential.split(' ')[1]}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{product.subtitle}</p>

            {/* Quick Specifications Bento Pill Grid */}
            <div className="grid grid-cols-2 gap-2 my-3 text-[11px]">
              {product.specs.wearLayer && (
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-slate-500">{t('productCard.wearLayer')}:</span>
                  <span className="font-bold text-[#0a1680]">{product.specs.wearLayer}</span>
                </div>
              )}
              {product.specs.totalThickness && (
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-slate-500">{t('productCard.thickness')}:</span>
                  <span className="font-bold text-[#0a1680]">{product.specs.totalThickness}</span>
                </div>
              )}
              {product.specs.plankSize && (
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-slate-500">{language === 'en' ? 'SIZE:' : 'MEDIDA:'}</span>
                  <span className="font-bold text-[#0a1680] truncate max-w-[90px]" title={product.specs.plankSize}>
                    {product.specs.plankSize.split('|')[0]}
                  </span>
                </div>
              )}
              {product.specs.sqftPerBox && (
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-slate-500">{t('productCard.sqftBox')}:</span>
                  <span className="font-bold text-[#0a1680]">{product.specs.sqftPerBox}</span>
                </div>
              )}
            </div>

            {/* Color Palettes Swatch Strip */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 mb-2">
                <span className="font-bold text-[#0a1680]">
                  {language === 'en' ? `Colors (${product.colors.length}):` : `Tonos (${product.colors.length}):`}
                </span>
                <span className="text-slate-400 text-[10px]">
                  {language === 'en' ? 'Click to select' : 'Toca para cambiar'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {product.colors.map((col, idx) => {
                  const isCurrent = selectedColorIndex === idx;
                  return (
                    <button
                      key={col.name + idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={`${col.name} ${col.code ? `(${col.code})` : ''}`}
                      className={`w-6 h-6 rounded-full border-2 transition-all relative cursor-pointer ${
                        isCurrent
                          ? 'border-[#0a1680] scale-110 shadow-xs ring-2 ring-[#93b2f8]'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                      style={{ backgroundColor: col.hexColor }}
                    >
                      {isCurrent && (
                        <span className="absolute inset-0 flex items-center justify-center text-[#0a1680] text-[9px] font-black">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bento Card Footer Actions */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {/* Hand sample button */}
              <button
                onClick={handleQuickAddSample}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  sampleAddedFeedback
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-[#93b2f8]/20 hover:bg-[#93b2f8]/40 text-[#0a1680] border-[#93b2f8]/40'
                }`}
              >
                {sampleAddedFeedback ? <Check size={14} /> : <Plus size={14} className="text-[#0a1680]" />}
                <span>{sampleAddedFeedback ? (language === 'en' ? 'Added' : 'Lista') : t('productCard.orderSample')}</span>
              </button>

              {/* Add to order / quote */}
              <button
                onClick={() => onAddToOrder(product, selectedColor)}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#0a1680] hover:bg-[#081268] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                <Plus size={14} className="text-[#f1b94c]" />
                <span>{t('productCard.addToQuote')}</span>
              </button>
            </div>

            {/* Full specs technical sheet link */}
            <button
              onClick={() => onOpenDetail(product, selectedColor)}
              className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600 hover:text-[#0a1680] transition cursor-pointer"
            >
              <FileText size={12} />
              <span>{language === 'en' ? 'Technical Specs & Calculator' : 'Ficha Técnica y Calculadora'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full View Lightbox Modal */}
      {showFullView && (
        <FullViewModal
          product={product}
          selectedColor={selectedColor}
          initialMode={cardViewMode}
          onClose={() => setShowFullView(false)}
          onSelectColor={(c) => {
            const cIdx = product.colors.findIndex((col) => col.name === c.name);
            if (cIdx >= 0) setSelectedColorIndex(cIdx);
          }}
        />
      )}
    </>
  );
};
