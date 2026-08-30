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

  // Generate or get image sources (prioritize real photo URL if available)
  const plankSvg = activeColor.image || generatePlankSVG(
    activeColor.hexColor || '#c7b28e',
    activeColor.secondaryHex || '#8c7355',
    'rgba(0,0,0,0.22)',
    activeColor.patternType || 'wood'
  );

  const roomSvg = activeColor.roomImage || generateRoomSceneSVG(
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
      <div className="relative w-full max-w-5xl bg-[#121212] border border-[#262626] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1A1A1A] border-b border-[#262626] text-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                {product.name}
                <span className="text-xs px-2 py-0.5 rounded-full bg-white text-[#0B0B0B] font-bold">
                  {product.category === 'spc-vinyl'
                    ? `Cod. ${activeColor.code || activeColor.name}`
                    : `${activeColor.name} ${activeColor.code && activeColor.code !== activeColor.name ? `(${activeColor.code})` : ''}`}
                </span>
              </h2>
              <p className="text-xs text-[#BCBAB4] font-mono">
                {product.name} • {product.specs.totalThickness || product.specs.wearLayer || ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Plank vs Room - Hidden for Baseboards */}
            {product.category !== 'baseboards' && (
              <div className="flex bg-[#262626] p-1 rounded-xl border border-[#383838]">
                <button
                  onClick={() => setViewMode('plank')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'plank'
                      ? 'bg-white text-[#0B0B0B] shadow-xs'
                      : 'text-[#BCBAB4] hover:text-white'
                  }`}
                >
                  <Layers size={14} />
                  <span>{isAccessory ? (language === 'en' ? 'Profile Diagram' : 'Diagrama Perfil') : (language === 'en' ? 'Plank Closeup' : 'Foto Plank')}</span>
                </button>
                <button
                  onClick={() => setViewMode('room')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'room'
                      ? 'bg-white text-[#0B0B0B] shadow-xs'
                      : 'text-[#BCBAB4] hover:text-white'
                  }`}
                >
                  <Eye size={14} />
                  <span>{isAccessory ? (language === 'en' ? '3D Installation' : 'Instalación 3D') : (language === 'en' ? 'Room Scene' : 'Ambiente')}</span>
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
              className="p-2 hover:bg-[#262626] rounded-full text-[#BCBAB4] hover:text-white transition cursor-pointer"
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
              className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl border border-[#262626]"
            />
          </div>

          {/* Floating Spec Watermark Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-[#141414]/90 backdrop-blur-md border border-[#262626] px-4 py-2.5 rounded-2xl text-white text-xs max-w-sm hidden sm:block">
            <div className="font-extrabold text-white flex items-center gap-1.5">
              <span>{activeColor.name}</span>
              {activeColor.code && <span className="font-mono text-[10px] text-[#BCBAB4]">CODE: {activeColor.code}</span>}
            </div>
            <div className="text-[11px] text-[#BCBAB4] mt-0.5">
              {product.specs.plankSize ? `${product.specs.plankSize} • ` : ''}
              {product.specs.sqftPerBox ? `${product.specs.sqftPerBox} sqft/box • ` : ''}
              {product.specs.finished || 'Satin Finish'}
            </div>
          </div>
        </div>

        {/* Bottom Palette Swatches Bar */}
        {product.colors && product.colors.length > 1 && (
          <div className="p-4 bg-[#141414] border-t border-[#262626]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#BCBAB4] uppercase tracking-wider">
                {language === 'en' ? 'Switch Color Variant:' : 'Cambiar Tono de Color:'}
              </span>
              <span className="text-xs text-white font-bold">
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
                        ? 'border-white bg-white/10 text-white font-bold ring-2 ring-white/30'
                        : 'border-[#262626] bg-[#1A1A1A] text-[#BCBAB4] hover:border-[#444444]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 shrink-0"
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
