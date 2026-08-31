import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Plus,
  Eye,
  Check,
  Compass,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import {
  generatePlankSVG,
  generateRoomSceneSVG,
  BASEBOARD_IMAGES,
  MOLDING_IMAGES,
  STAIR_PROFILES,
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

  const isAccessory = ['baseboards', 'moldings', 'stair-steps'].includes(product.category);

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

  const getAccessoryData = () => {
    const searchStr = `${product.id} ${product.name} ${selectedColor.name} ${selectedColor.code || ''} ${product.subtitle || ''}`.toLowerCase();

    if (product.category === 'baseboards') {
      if (searchStr.includes('bb1x6') && (searchStr.includes('18mm') || searchStr.includes('heavy') || searchStr.includes('11/16'))) return BASEBOARD_IMAGES['BB1x6-18mm'];
      if (searchStr.includes('bb1x6')) return BASEBOARD_IMAGES['BB1x6-14mm'];
      if (searchStr.includes('bb1x4') && (searchStr.includes('18mm') || searchStr.includes('thick') || searchStr.includes('11/16'))) return BASEBOARD_IMAGES['BB1x4-18mm'];
      if (searchStr.includes('bb1x4')) return BASEBOARD_IMAGES['BB1x4-14mm'];
      if (searchStr.includes('bb1x3')) return BASEBOARD_IMAGES['BB1x3-18mm'];
      if (searchStr.includes('5180')) return BASEBOARD_IMAGES['BB5180'];
      if (searchStr.includes('618')) return BASEBOARD_IMAGES['BB618'];
      if (searchStr.includes('620')) return BASEBOARD_IMAGES['BB620'];
      if (searchStr.includes('eps')) return BASEBOARD_IMAGES['QuarterRound-EPS'];
      if (searchStr.includes('round') || searchStr.includes('quarter') || searchStr.includes('bocel')) return BASEBOARD_IMAGES['QuarterRound-Pine'];
      if (searchStr.includes('square') || searchStr.includes('1x1') || searchStr.includes('mdf')) return BASEBOARD_IMAGES['Square1x1-MDF'];
      return BASEBOARD_IMAGES['BB1x6-14mm'];
    }
    if (product.category === 'moldings') {
      if (searchStr.includes('cm') && (searchStr.includes('reducer') || searchStr.includes('desnivel') || searchStr.includes('reductor'))) return MOLDING_IMAGES['CM-Reducer'];
      if (searchStr.includes('cm') && (searchStr.includes('t-molding') || searchStr.includes('t molding') || searchStr.includes('tmolding'))) return MOLDING_IMAGES['CM-TMolding'];
      if (searchStr.includes('end cap') || searchStr.includes('endcap') || searchStr.includes('remate')) return MOLDING_IMAGES['EndCap'];
      if (searchStr.includes('reducer') || searchStr.includes('reductor')) return MOLDING_IMAGES['Standard-Reducer'];
      if (searchStr.includes('t-molding') || searchStr.includes('t molding') || searchStr.includes('tmolding')) return MOLDING_IMAGES['Standard-TMolding'];
      return MOLDING_IMAGES['CM-TMolding'];
    }
    if (product.category === 'stair-steps') {
      if (searchStr.includes('double') || searchStr.includes('doble') || searchStr.includes('round')) return STAIR_PROFILES['DoubleRounded'];
      if (searchStr.includes('square') || searchStr.includes('cuadrad')) return STAIR_PROFILES['SquareStep'];
      if (searchStr.includes('full') || searchStr.includes('completo')) return STAIR_PROFILES['FullStep'];
      if (searchStr.includes('regular') || searchStr.includes('riser')) return STAIR_PROFILES['RegularStep'];
      return STAIR_PROFILES['DoubleRounded'];
    }
    return null;
  };

  const accessoryData = isAccessory ? getAccessoryData() : null;
  const accessoryPhoto = customPlankPhoto || formatImageUrl(accessoryData?.photoUrl);
  const accessoryRoom = customRoomPhoto || formatImageUrl((accessoryData as any)?.roomUrl) || fallbackRoomSvg;
  const blueprintSvg = accessoryData?.profileSvg || fallbackPlankSvg;
  const accessoryDimensions = (accessoryData as any)?.dimensions || ((accessoryData as any)?.thickness ? `${(accessoryData as any).thickness} • ${(accessoryData as any).height || ''}` : '');

  // Determine which image to show in the top viewport based on product category & viewMode
  let topDisplayImage = '';
  let fallbackImage = '';

  if (product.category === 'baseboards') {
    // Baseboards: SOLO PHOTO at top
    topDisplayImage = accessoryPhoto || blueprintSvg;
    fallbackImage = blueprintSvg;
  } else if (product.category === 'moldings' || product.category === 'stair-steps') {
    // Moldings & Steps: Photo vs Room mode
    if (cardViewMode === 'room') {
      topDisplayImage = accessoryRoom;
      fallbackImage = fallbackRoomSvg;
    } else {
      topDisplayImage = accessoryPhoto || blueprintSvg;
      fallbackImage = blueprintSvg;
    }
  } else {
    // SPC Vinyl Flooring: Plank vs Room mode
    if (cardViewMode === 'room') {
      topDisplayImage = customRoomPhoto || fallbackRoomSvg;
      fallbackImage = fallbackRoomSvg;
    } else {
      topDisplayImage = customPlankPhoto || fallbackPlankSvg;
      fallbackImage = fallbackPlankSvg;
    }
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

          {/* Top Left: View Switcher - Only shown for Moldings, Steps & SPC Vinyl (Hidden for Baseboards) */}
          {product.category !== 'baseboards' && (
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
          )}

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
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{language === 'en' ? 'HEIGHT:' : 'ALTO:'}</span>
                  <span className="font-bold text-[#0B0B0B] truncate max-w-[90px]" title={product.specs.height}>
                    {product.specs.height}
                  </span>
                </div>
              )}
              {product.specs.plankSize && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{language === 'en' ? 'SIZE:' : 'MEDIDA:'}</span>
                  <span className="font-bold text-[#0B0B0B] truncate max-w-[90px]" title={product.specs.plankSize}>
                    {product.specs.plankSize.split('|')[0]}
                  </span>
                </div>
              )}
              {product.specs.sqftPerBox && (
                <div className="bg-[#F5F5F5] border border-[#D9D9D9] p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-[#6B6762]">{t('productCard.sqftBox')}:</span>
                  <span className="font-bold text-[#0B0B0B]">{product.specs.sqftPerBox}</span>
                </div>
              )}
            </div>

            {/* TECHNICAL CAD BLUEPRINT DIAGRAM DISPLAY FOR ALL ACCESSORIES (Baseboards, Moldings, Steps) */}
            {isAccessory && (
              <div className="my-2.5 p-2.5 rounded-xl bg-[#0F172A] border border-[#334155] text-white">
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 text-slate-300">
                  <div className="flex items-center gap-1 font-bold text-sky-400">
                    <Compass size={11} />
                    <span>{language === 'en' ? 'CAD PROFILE BLUEPRINT' : 'PLANO DE PERFIL CAD'}</span>
                  </div>
                  <span className="text-slate-400 font-semibold truncate max-w-[120px]">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="h-16 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center p-1 overflow-hidden">
                  <img
                    src={blueprintSvg}
                    alt={`${selectedColor.name} CAD Profile`}
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                  />
                </div>
                {accessoryDimensions && (
                  <div className="mt-1 text-[9px] font-mono text-slate-300 text-center">
                    {language === 'en' ? 'Specs:' : 'Medidas:'} <span className="text-sky-300 font-semibold">{accessoryDimensions}</span>
                  </div>
                )}
              </div>
            )}

            {/* Color Palettes Swatch Strip */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-medium text-[#6B6762] mb-1.5">
                <span className="font-bold text-[#0B0B0B]">
                  {language === 'en' ? `Models / Options (${product.colors.length}):` : `Modelos / Opciones (${product.colors.length}):`}
                </span>
                <span className="text-[#BCBAB4] text-[10px]">
                  {language === 'en' ? 'Click to select' : 'Toca para cambiar'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 max-h-20 overflow-y-auto pr-1">
                {product.colors.map((col, idx) => {
                  const isCurrent = selectedColorIndex === idx;
                  return (
                    <button
                      key={col.name + idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={`${col.name} ${col.code ? `(${col.code})` : ''}`}
                      className={`w-6 h-6 rounded-full border-2 transition-all relative cursor-pointer ${
                        isCurrent
                          ? 'border-[#0B0B0B] scale-110 shadow-xs ring-2 ring-[#BCBAB4]'
                          : 'border-[#D9D9D9] hover:border-[#6B6762]'
                      }`}
                      style={{ backgroundColor: col.hexColor }}
                    >
                      {isCurrent && (
                        <span className="absolute inset-0 flex items-center justify-center text-[#0B0B0B] text-[9px] font-black">
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

              {/* Add to order / quote */}
              <button
                onClick={() => onAddToOrder(product, selectedColor)}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                <Plus size={14} className="text-white" />
                <span>{t('productCard.addToQuote')}</span>
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
