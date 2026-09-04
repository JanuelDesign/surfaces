import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Plus,
  Eye,
  Check,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import {
  generatePlankSVG,
  generateRoomSceneSVG,
} from '../utils/imageCatalog';
import { formatImageUrl } from '../utils/imageUrlFormatter';
import { FullViewModal } from './FullViewModal';
import { useLanguage } from '../i18n/LanguageContext';
import { ROOMVO_VISUALIZER_URL } from '../utils/constants';

interface Props {
  product: Product;
  onOpenDetail: (product: Product, selectedColor?: ProductColor) => void;
  onOpenVisualizer?: (product: Product, selectedColor?: ProductColor) => void;
  onAddToOrder: (product: Product, selectedColor: ProductColor) => void;
  onAddSample: (product: Product, selectedColor: ProductColor) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onOpenDetail,
  onAddToOrder,
  onAddSample,
}) => {
  const { language, t } = useLanguage();
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [cardViewMode, setCardViewMode] = useState<'plank' | 'room'>('plank');
  const [showFullView, setShowFullView] = useState<boolean>(false);
  const [sampleAddedFeedback, setSampleAddedFeedback] = useState<boolean>(false);
  const [imgLoadError, setImgLoadError] = useState<boolean>(false);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleQuickAddSample = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddSample(product, selectedColor);
    setSampleAddedFeedback(true);
    setTimeout(() => setSampleAddedFeedback(false), 1400);
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

  // Exact same image logic for ALL products (SPC, Steps, Moldings, Baseboards):
  // Uses the photo of the selected variant (first variant by default with ✓)
  let topDisplayImage = '';
  let fallbackImage = '';

  if (cardViewMode === 'room') {
    topDisplayImage = customRoomPhoto || customPlankPhoto || fallbackRoomSvg;
    fallbackImage = fallbackRoomSvg;
  } else {
    topDisplayImage = customPlankPhoto || fallbackPlankSvg;
    fallbackImage = fallbackPlankSvg;
  }

  useEffect(() => {
    setImgLoadError(false);
  }, [selectedColor, cardViewMode, product]);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#D9D9D9] hover:border-[#0B0B0B] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
        {/* Top Image Viewport Area */}
        <div
          className="relative h-52 bg-[#0B0B0B] overflow-hidden cursor-pointer"
          onClick={() => onOpenDetail(product, selectedColor)}
        >
          {/* Main High-Res Image Display */}
          <img
            src={imgLoadError ? fallbackImage : topDisplayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgLoadError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top Left: View Switcher (Plank/Photo vs Room) for ALL product cards */}
          <div
            className="absolute top-2.5 left-2.5 flex bg-black/75 backdrop-blur-md p-0.5 rounded-lg border border-white/20 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setImgLoadError(false);
                setCardViewMode('plank');
              }}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                cardViewMode === 'plank'
                  ? 'bg-[#0B0B0B] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {product.category === 'spc-vinyl'
                ? (language === 'en' ? 'Plank' : 'Plank')
                : (language === 'en' ? 'Photo' : 'Foto')}
            </button>
            <button
              onClick={() => {
                setImgLoadError(false);
                setCardViewMode('room');
              }}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                cardViewMode === 'room'
                  ? 'bg-[#0B0B0B] text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Room' : 'Ambiente'}
            </button>
          </div>

          {/* Top Right: Full View Lightbox Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullView(true);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 hover:bg-white hover:text-[#0B0B0B] text-white backdrop-blur-md border border-white/20 transition cursor-pointer shadow-sm z-10"
            title={language === 'en' ? 'Open High-Res Full View' : 'Ver en Pantalla Completa'}
          >
            <Maximize2 size={13} />
          </button>

          {/* Current Active Color overlay info */}
          <div className="absolute bottom-2.5 left-2.5 text-white z-10 pointer-events-none">
            <div className="text-xs font-bold drop-shadow-md flex items-center gap-1.5">
              {product.category === 'spc-vinyl' ? (
                <span>{language === 'en' ? 'Code:' : 'Código:'} {selectedColor.code || selectedColor.name}</span>
              ) : (
                <>
                  <span>{selectedColor.name}</span>
                  {selectedColor.code && selectedColor.code !== selectedColor.name && (
                    <span className="text-[9px] bg-black/60 text-[#F5F5F5] px-1.5 py-0.5 rounded font-mono font-medium border border-white/20">
                      {selectedColor.code}
                    </span>
                  )}
                </>
              )}
            </div>
            {selectedColor.finish && (
              <div className="text-[10px] text-white/90 drop-shadow-xs">{selectedColor.finish}</div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B6762]">
                  {product.collection}
                </span>
                <h3
                  onClick={() => onOpenDetail(product, selectedColor)}
                  className="text-base font-bold text-[#0B0B0B] hover:text-[#6B6762] cursor-pointer transition mt-0.5"
                >
                  {product.name}
                </h3>
              </div>
              {product.specs.warrantyResidential && (
                <span className="text-[10px] font-bold text-[#0B0B0B] bg-[#F5F5F5] px-2 py-0.5 rounded-sm border border-[#D9D9D9] shrink-0 uppercase tracking-wider">
                  {product.specs.warrantyResidential.split(' ')[0]} {product.specs.warrantyResidential.split(' ')[1]}
                </span>
              )}
            </div>

            <p className="text-xs text-[#6B6762] mt-1 line-clamp-2">{product.subtitle}</p>

            {/* Quick Specifications Pill Grid */}
            <div className="grid grid-cols-2 gap-2 my-2.5 text-[11px]">
              {product.specs.wearLayer && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.wearLayer')}:</span>
                  <span className="font-bold text-[#0B0B0B]">{product.specs.wearLayer}</span>
                </div>
              )}
              {product.specs.totalThickness && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.thickness')}:</span>
                  <span className="font-bold text-[#0B0B0B]">{product.specs.totalThickness}</span>
                </div>
              )}
              {product.specs.height && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.height')}:</span>
                  <span className="font-bold text-[#0B0B0B] truncate max-w-[90px]" title={product.specs.height}>
                    {product.specs.height}
                  </span>
                </div>
              )}
              {product.specs.plankSize && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.size')}:</span>
                  <span className="font-bold text-[#0B0B0B] truncate max-w-[90px]" title={product.specs.plankSize}>
                    {product.specs.plankSize.split('|')[0]}
                  </span>
                </div>
              )}
              {product.specs.length && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.length')}:</span>
                  <span className="font-bold text-[#0B0B0B] truncate max-w-[90px]" title={product.specs.length}>
                    {product.specs.length.split('/')[0]}
                  </span>
                </div>
              )}
              {product.specs.sqftPerBox && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.sqftBox')}:</span>
                  <span className="font-bold text-[#0B0B0B]">{product.specs.sqftPerBox}</span>
                </div>
              )}
              {product.specs.compatibleWith && (
                <div className="col-span-2 bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.compatibleWith')}:</span>
                  <span className="font-bold text-[#0B0B0B] truncate text-[10px] max-w-[200px]" title={product.specs.compatibleWith}>
                    {product.specs.compatibleWith}
                  </span>
                </div>
              )}
            </div>

            {/* Color Palettes Swatch Strip */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-medium text-[#6B6762] mb-1.5">
                <span className="font-bold text-[#0B0B0B]">
                  {t('productCard.modelsOptions')} ({product.colors.length}):
                </span>
                <span className="text-[#BCBAB4] text-[10px]">
                  {t('productCard.clickToSelect')}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 py-1">
                {product.colors.map((col, idx) => {
                  const isCurrent = selectedColorIndex === idx;
                  const keyId = col.id || col.code || `${product.id}-${col.name}-${idx}`;
                  return (
                    <button
                      key={keyId}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={col.code && col.code !== col.name ? `${col.name} (${col.code})` : (col.code || col.name)}
                      className={`w-6 h-6 rounded-md border transition-all relative cursor-pointer flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'border-[#0B0B0B] ring-2 ring-[#0B0B0B]/30 shadow-xs scale-105'
                          : 'border-[#D9D9D9] hover:border-[#6B6762] hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hexColor }}
                    >
                      {isCurrent && (
                        <span className="text-[#0B0B0B] text-[10px] font-black drop-shadow-xs">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="pt-3 border-t border-[#D9D9D9] space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {/* Hand sample button */}
              <button
                onClick={handleQuickAddSample}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  sampleAddedFeedback
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-[#F5F5F5] hover:bg-[#D9D9D9] text-[#0B0B0B] border-[#D9D9D9]'
                }`}
              >
                {sampleAddedFeedback ? <Check size={14} /> : <Plus size={14} className="text-[#0B0B0B]" />}
                <span>{sampleAddedFeedback ? (language === 'en' ? 'Added' : 'Lista') : t('productCard.orderSample')}</span>
              </button>

              {/* View Product (opens detail modal to select color and quantity) */}
              <button
                onClick={() => onAddToOrder(product, selectedColor)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                <Eye size={14} className="text-white" />
                <span>{t('productCard.viewProduct')}</span>
              </button>
            </div>

            {/* Roomvo 3D Visualizer Link - Only for SPC Vinyl Flooring */}
            {product.category === 'spc-vinyl' && (
              <a
                href={ROOMVO_VISUALIZER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-[#D9D9D9] hover:border-[#0B0B0B] hover:bg-[#F5F5F5] text-[11px] font-bold uppercase tracking-wider text-[#0B0B0B] transition cursor-pointer"
              >
                <Eye size={13} className="text-[#0B0B0B]" />
                <span>{t('productCard.view3D')} Roomvo</span>
              </a>
            )}
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
