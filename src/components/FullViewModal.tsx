import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Eye, Layers } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { generatePlankSVG, generateRoomSceneSVG } from '../utils/imageCatalog';
import { formatImageUrl } from '../utils/imageUrlFormatter';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  product: Product;
  selectedColor: ProductColor;
  initialMode?: 'plank' | 'room';
  onClose: () => void;
  onSelectColor?: (color: ProductColor) => void;
}

/**
 * Extracts 1-3 short, non-redundant specifications for the secondary header line.
 * Strictly avoids repeating anything already present in product.name.
 */
function getShortSpecs(product: Product, isEn: boolean): string[] {
  const specs: string[] = [];
  const lowerName = product.name.toLowerCase();

  if (product.category === 'spc-vinyl') {
    // Wear layer e.g. "20 Mil"
    if (product.specs.wearLayer) {
      const wear = product.specs.wearLayer;
      specs.push(wear.includes('Mil') ? wear : `${wear} Wear Layer`);
    }
    // Plank dimensions e.g. "9” x 60”"
    if (product.specs.plankSize) {
      specs.push(product.specs.plankSize);
    }
    // Only include totalThickness if it's not already in product.name (e.g. avoid repeating "6.0 mm" for "SPC 6.0 mm")
    if (product.specs.totalThickness && !lowerName.includes(product.specs.totalThickness.toLowerCase())) {
      specs.push(product.specs.totalThickness);
    }
    // Acoustic HD EVA Pad
    if (product.specs.padding) {
      specs.push(isEn ? 'HD EVA Pad' : 'Pad HD EVA');
    }
  } else if (product.category === 'stair-steps') {
    if (product.specs.material) {
      specs.push(isEn ? 'SPC / Laminate' : 'Núcleo SPC / Laminado');
    }
    if (product.specs.finished) {
      specs.push(isEn ? 'Anti-Slip Satin' : 'Antideslizante Satin');
    }
    if (product.specs.length) {
      const cleanLen = product.specs.length.split('/')[0].trim();
      specs.push(cleanLen);
    }
  } else if (product.category === 'moldings') {
    if (product.specs.plankSize) {
      const size = product.specs.plankSize.includes('94')
        ? (isEn ? '94" Length' : 'Largo: 94"')
        : product.specs.plankSize.split('/')[0].trim();
      specs.push(size);
    }
    specs.push(isEn ? 'Universal Color Match' : 'Tono a juego');
  } else if (product.category === 'baseboards') {
    if (product.specs.totalThickness && !lowerName.includes(product.specs.totalThickness.toLowerCase())) {
      specs.push(product.specs.totalThickness.split('/')[0].trim());
    }
    if (product.specs.finished) {
      specs.push(isEn ? 'Pre-Painted White' : 'Blanco Pre-Pintado');
    }
  }

  // Filter out any spec token that appears in product.name to guarantee zero repetition
  return specs.filter((s) => !lowerName.includes(s.toLowerCase())).slice(0, 3);
}

/**
 * Returns clean, separated badge and descriptive title for the selected variant.
 */
function getVariantDisplay(color: ProductColor) {
  const code = (color.code || '').trim();
  const name = (color.name || '').trim();

  if (!code && !name) return { badge: '', title: '' };
  if (!code) return { badge: name, title: '' };
  if (!name || code === name) return { badge: code, title: '' };

  return { badge: code, title: name };
}

export const FullViewModal: React.FC<Props> = ({
  product,
  selectedColor,
  initialMode = 'plank',
  onClose,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [viewMode, setViewMode] = useState<'plank' | 'room'>(initialMode);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [imgLoadError, setImgLoadError] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Generate or get image sources (prioritize real photo URL if available)
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

  useEffect(() => {
    setImgLoadError(false);
  }, [selectedColor, viewMode, product]);

  const shortSpecs = getShortSpecs(product, isEn);
  const variant = getVariantDisplay(selectedColor);

  // Only show Room mode toggle if category supports room mockups or has a room image
  const hasRoomMode =
    product.category !== 'baseboards' &&
    Boolean(customRoomPhoto || product.category === 'spc-vinyl' || product.category === 'stair-steps' || product.category === 'moldings');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full sm:h-auto max-w-5xl bg-[#121212] border-0 sm:border border-[#262626] rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Clean Visual Hierarchy */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#171717] border-b border-[#262626] text-white z-10 shrink-0 gap-3">
          {/* Left: Product Name (Primary) & Variant / Specs (Secondary) */}
          <div className="min-w-0 flex-1">
            {/* Primary Heading: Product Name rendered ONCE */}
            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-white tracking-tight truncate leading-tight">
              {product.name}
            </h2>

            {/* Secondary Line: Variant Code/Badge & Non-repetitive specs */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mt-0.5 sm:mt-1">
              {variant.badge && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#242424] text-white border border-[#3D3D3D] text-[10px] sm:text-xs font-bold shrink-0">
                  {selectedColor.hexColor && (
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: selectedColor.hexColor }}
                    />
                  )}
                  <span>{variant.badge}</span>
                </span>
              )}

              {variant.title && (
                <span className="text-[11px] sm:text-xs text-[#D1CFC7] font-medium truncate max-w-[140px] sm:max-w-xs">
                  {variant.title}
                </span>
              )}

              {shortSpecs.length > 0 && (
                <div className="hidden xs:flex items-center gap-1.5 text-[10px] sm:text-xs text-[#8C887B] font-mono truncate">
                  <span className="text-[#4A4A4A]">•</span>
                  <span>{shortSpecs.join(' • ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Mode Toggle, Zoom, and Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Mode Toggle: Photo / Room */}
            {hasRoomMode && (
              <div className="flex bg-[#242424] p-0.5 sm:p-1 rounded-xl border border-[#383838]">
                <button
                  type="button"
                  onClick={() => setViewMode('plank')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                    viewMode === 'plank'
                      ? 'bg-white text-[#0B0B0B] shadow-xs'
                      : 'text-[#BCBAB4] hover:text-white'
                  }`}
                >
                  <Layers size={13} />
                  <span>
                    {product.category === 'spc-vinyl'
                      ? isEn
                        ? 'Plank'
                        : 'Plank'
                      : isEn
                      ? 'Photo'
                      : 'Foto'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('room')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                    viewMode === 'room'
                      ? 'bg-white text-[#0B0B0B] shadow-xs'
                      : 'text-[#BCBAB4] hover:text-white'
                  }`}
                >
                  <Eye size={13} />
                  <span>{isEn ? 'Room' : 'Ambiente'}</span>
                </button>
              </div>
            )}

            {/* Desktop Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-[#242424] px-2 py-1 rounded-xl border border-[#383838]">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.8, Number((z - 0.2).toFixed(1))))}
                className="p-1.5 hover:bg-[#333333] rounded-lg text-[#BCBAB4] hover:text-white cursor-pointer transition"
                title={isEn ? 'Zoom Out' : 'Reducir zoom'}
              >
                <ZoomOut size={15} />
              </button>
              <span className="text-xs font-mono text-[#F5F5F5] w-12 text-center select-none">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.2).toFixed(1))))}
                className="p-1.5 hover:bg-[#333333] rounded-lg text-[#BCBAB4] hover:text-white cursor-pointer transition"
                title={isEn ? 'Zoom In' : 'Ampliar zoom'}
              >
                <ZoomIn size={15} />
              </button>
              {zoomLevel !== 1 && (
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:bg-[#333333] rounded-lg text-[#BCBAB4] hover:text-white cursor-pointer transition ml-0.5"
                  title={isEn ? 'Reset Zoom' : 'Restablecer zoom'}
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-[#262626] rounded-full text-[#BCBAB4] hover:text-white transition cursor-pointer"
              title={isEn ? 'Close' : 'Cerrar'}
              aria-label={isEn ? 'Close full screen view' : 'Cerrar vista de pantalla completa'}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Full View Stage (Unobstructed, 100% focused on High-Res Image) */}
        <div className="relative flex-1 bg-black overflow-auto flex items-center justify-center p-2 sm:p-6 min-h-[320px] sm:min-h-[520px]">
          <div
            className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={imgLoadError ? fallbackImage : currentDisplayImage}
              alt={`${product.name} - ${selectedColor.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImgLoadError(true)}
              onClick={() => {
                // Click on image toggles 1x and 1.5x zoom
                setZoomLevel((z) => (z === 1 ? 1.5 : 1));
              }}
              className={`max-h-[76vh] sm:max-h-[80vh] max-w-full object-contain rounded-lg sm:rounded-xl shadow-2xl border border-[#262626] transition-all select-none ${
                zoomLevel === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

