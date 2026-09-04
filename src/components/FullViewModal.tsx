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

export const FullViewModal: React.FC<Props> = ({
  product,
  selectedColor,
  initialMode = 'plank',
  onClose,
  onSelectColor,
}) => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'plank' | 'room'>(initialMode);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeColor, setActiveColor] = useState<ProductColor>(selectedColor);
  const [imgLoadError, setImgLoadError] = useState(false);

  // Generate or get image sources (prioritize real photo URL if available)
  const customPlankPhoto = formatImageUrl(activeColor.image);
  const customRoomPhoto = formatImageUrl(activeColor.roomImage);

  const fallbackPlankSvg = generatePlankSVG(
    activeColor.hexColor || '#c7b28e',
    activeColor.secondaryHex || '#8c7355',
    'rgba(0,0,0,0.22)',
    activeColor.patternType || 'wood'
  );

  const fallbackRoomSvg = generateRoomSceneSVG(
    activeColor.hexColor || '#c7b28e',
    activeColor.secondaryHex || '#8c7355',
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
  }, [activeColor, viewMode, product]);

  const handleColorPick = (col: ProductColor) => {
    setImgLoadError(false);
    setActiveColor(col);
    if (onSelectColor) onSelectColor(col);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full h-full sm:h-auto max-w-5xl bg-[#121212] border-0 sm:border border-[#262626] rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[95vh]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#1A1A1A] border-b border-[#262626] text-white z-10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shrink-0"></div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-extrabold text-white flex flex-wrap items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">{product.name}</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white text-[#0B0B0B] font-bold shrink-0">
                  {product.category === 'spc-vinyl'
                    ? `${activeColor.code || activeColor.name}`
                    : `${activeColor.name} ${activeColor.code && activeColor.code !== activeColor.name ? `(${activeColor.code})` : ''}`}
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-[#BCBAB4] font-mono truncate">
                {product.name} • {product.specs.totalThickness || product.specs.wearLayer || ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Mode Toggle: Hidden for Baseboards */}
            {product.category !== 'baseboards' && (
              <div className="flex bg-[#262626] p-0.5 sm:p-1 rounded-xl border border-[#383838]">
                <button
                  onClick={() => setViewMode('plank')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                    viewMode === 'plank'
                      ? 'bg-white text-[#0B0B0B] shadow-xs'
                      : 'text-[#BCBAB4] hover:text-white'
                  }`}
                >
                  <Layers size={13} />
                  <span>{product.category === 'spc-vinyl' ? (language === 'en' ? 'Plank' : 'Plank') : (language === 'en' ? 'Photo' : 'Foto')}</span>
                </button>
                <button
                  onClick={() => setViewMode('room')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                    viewMode === 'room'
                      ? 'bg-white text-[#0B0B0B] shadow-xs'
                      : 'text-[#BCBAB4] hover:text-white'
                  }`}
                >
                  <Eye size={13} />
                  <span>{language === 'en' ? 'Room' : 'Ambiente'}</span>
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-[#262626] px-2 py-1 rounded-xl border border-[#383838]">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                className="p-1.5 hover:bg-[#333333] rounded-lg text-[#BCBAB4] hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs font-mono text-[#F5F5F5] w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                className="p-1.5 hover:bg-[#333333] rounded-lg text-[#BCBAB4] hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:bg-[#333333] rounded-lg text-[#BCBAB4] hover:text-white cursor-pointer ml-1"
                title="Reset Zoom"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-[#262626] rounded-full text-[#BCBAB4] hover:text-white transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Full View Stage */}
        <div className="relative flex-1 bg-black overflow-auto flex items-center justify-center p-2 sm:p-4 min-h-[300px] sm:min-h-[500px]">
          <div
            className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={imgLoadError ? fallbackImage : currentDisplayImage}
              alt={`${product.name} - ${activeColor.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImgLoadError(true)}
              className="max-h-[65vh] sm:max-h-[70vh] max-w-full object-contain rounded-lg sm:rounded-xl shadow-2xl border border-[#262626]"
            />
          </div>

          {/* Quick Details Floating Badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-black/80 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-[#333333] text-white pointer-events-none max-w-[calc(100%-24px)]">
            <div className="text-[11px] sm:text-xs font-bold text-white truncate">
              {activeColor.name} {activeColor.code && activeColor.code !== activeColor.name ? `(${activeColor.code})` : ''}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#BCBAB4] font-mono mt-0.5 truncate">
              {product.specs.plankSize || product.specs.wearLayer || ''} • {product.specs.installation || 'Waterproof'}
            </div>
          </div>
        </div>

        {/* Bottom Swatch Selector Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#1A1A1A] border-t border-[#262626] flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto shrink-0">
          <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#BCBAB4] shrink-0">
            {language === 'en' ? `Options (${product.colors.length}):` : `Opciones (${product.colors.length}):`}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {product.colors.map((col, idx) => {
              const isActive = activeColor.name === col.name;
              const keyId = col.id || col.code || `${product.id}-${col.name}-${idx}`;
              return (
                <button
                  key={keyId}
                  onClick={() => handleColorPick(col)}
                  title={`${col.name} ${col.code ? `(${col.code})` : ''}`}
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0B0B0B] border-white shadow-md font-bold'
                      : 'bg-[#262626] text-[#BCBAB4] border-[#383838] hover:border-white hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: col.hexColor }}
                  />
                  <span className="text-[11px] sm:text-xs">{col.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
