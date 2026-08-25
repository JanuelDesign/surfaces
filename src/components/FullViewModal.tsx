import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Eye, Layers, Maximize, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { generatePlankSVG, generateRoomSceneSVG, BASEBOARD_IMAGES, MOLDING_IMAGES, STAIR_PROFILES } from '../utils/imageCatalog';
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
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'plank' | 'room'>(initialMode);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeColor, setActiveColor] = useState<ProductColor>(selectedColor);

  const isAccessory = ['baseboards', 'moldings', 'stair-steps'].includes(product.category);

  // Generate or get image sources
  const plankSvg = generatePlankSVG(
    activeColor.hexColor || '#c7b28e',
    activeColor.secondaryHex || '#8c7355',
    'rgba(0,0,0,0.22)',
    activeColor.patternType || 'wood'
  );

  const roomSvg = generateRoomSceneSVG(
    activeColor.hexColor || '#c7b28e',
    activeColor.secondaryHex || '#8c7355',
    'living'
  );

  // For accessories
  const getAccessoryData = () => {
    if (product.category === 'baseboards') {
      const name = activeColor.name;
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
      const name = activeColor.name;
      if (name.includes('CM T-Molding') || name.includes('CM-T')) return MOLDING_IMAGES['CM-TMolding'];
      if (name.includes('CM Reducer') || name.includes('CM-R')) return MOLDING_IMAGES['CM-Reducer'];
      if (name.includes('Standard T-Molding')) return MOLDING_IMAGES['Standard-TMolding'];
      if (name.includes('Standard Reducer')) return MOLDING_IMAGES['Standard-Reducer'];
      if (name.includes('End Cap')) return MOLDING_IMAGES['EndCap'];
      return MOLDING_IMAGES['CM-TMolding'];
    }
    if (product.category === 'stair-steps') {
      const name = activeColor.name;
      if (name.includes('Double Rounded')) return STAIR_PROFILES['DoubleRounded'];
      if (name.includes('Square Step')) return STAIR_PROFILES['SquareStep'];
      if (name.includes('Full Step')) return STAIR_PROFILES['FullStep'];
      if (name.includes('Regular Step')) return STAIR_PROFILES['RegularStep'];
      return STAIR_PROFILES['DoubleRounded'];
    }
    return null;
  };

  const accessoryData = isAccessory ? getAccessoryData() : null;

  const currentDisplayImage = product.category === 'baseboards'
    ? (accessoryData?.photoUrl || plankSvg)
    : isAccessory
    ? (viewMode === 'room' ? (accessoryData?.photoUrl || accessoryData?.profileSvg || plankSvg) : (accessoryData?.profileSvg || plankSvg))
    : (viewMode === 'room' ? roomSvg : plankSvg);

  const handleColorPick = (col: ProductColor) => {
    setActiveColor(col);
    if (onSelectColor) onSelectColor(col);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800 text-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#f1b94c]"></div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                {product.name}
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#fbedb0] text-[#0a1680] font-bold">
                  {activeColor.name} {activeColor.code ? `(${activeColor.code})` : ''}
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {product.collection} • {product.specs.totalThickness || product.specs.wearLayer || ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Plank vs Room - Hidden for Baseboards */}
            {product.category !== 'baseboards' && (
              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setViewMode('plank')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'plank'
                      ? 'bg-[#0a1680] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers size={14} />
                  <span>{isAccessory ? (language === 'en' ? 'Profile Diagram' : 'Diagrama Perfil') : (language === 'en' ? 'Plank Closeup' : 'Foto Plank')}</span>
                </button>
                <button
                  onClick={() => setViewMode('room')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'room'
                      ? 'bg-[#0a1680] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye size={14} />
                  <span>{isAccessory ? (language === 'en' ? '3D Installation' : 'Instalación 3D') : (language === 'en' ? 'Room Scene' : 'Ambiente')}</span>
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs font-mono text-slate-300 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer ml-1"
                title="Reset Zoom"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Full View Stage */}
        <div className="relative flex-1 bg-black overflow-auto flex items-center justify-center p-4 min-h-[380px] sm:min-h-[500px]">
          <div
            className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={currentDisplayImage}
              alt={product.name}
              className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl border border-slate-800"
            />
          </div>

          {/* Floating Spec Watermark Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-4 py-2.5 rounded-2xl text-white text-xs max-w-sm hidden sm:block">
            <div className="font-extrabold text-[#f1b94c] flex items-center gap-1.5">
              <span>{activeColor.name}</span>
              {activeColor.code && <span className="font-mono text-[10px] text-slate-300">CODE: {activeColor.code}</span>}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              {product.specs.plankSize ? `${product.specs.plankSize} • ` : ''}
              {product.specs.sqftPerBox ? `${product.specs.sqftPerBox} sqft/box • ` : ''}
              {product.specs.finished || 'Satin Finish'}
            </div>
          </div>
        </div>

        {/* Bottom Palette Swatches Bar */}
        {product.colors && product.colors.length > 1 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {language === 'en' ? 'Switch Color Variant:' : 'Cambiar Tono de Color:'}
              </span>
              <span className="text-xs text-[#f1b94c] font-bold">
                {activeColor.name} {activeColor.code ? `(${activeColor.code})` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.colors.map((c) => {
                const isSelected = activeColor.name === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => handleColorPick(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition shrink-0 cursor-pointer ${
                      isSelected
                        ? 'border-[#f1b94c] bg-slate-800 text-[#fbedb0] font-bold ring-2 ring-[#f1b94c]/40'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-slate-600 shrink-0"
                      style={{ backgroundColor: c.hexColor }}
                    ></span>
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
