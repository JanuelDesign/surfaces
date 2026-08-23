import React, { useState } from 'react';
import {
  Eye,
  FileText,
  Plus,
  ShieldCheck,
  Check,
  Sparkles,
  Info,
  Maximize2,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { getSwatchBackground } from '../utils/textureUtils';

interface Props {
  product: Product;
  onOpenDetail: (product: Product, selectedColor: ProductColor) => void;
  onOpenVisualizerWithProduct: (product: Product, selectedColor: ProductColor) => void;
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
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const [sampleAddedFeedback, setSampleAddedFeedback] = useState(false);

  const handleQuickAddSample = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddSample(product, selectedColor);
    setSampleAddedFeedback(true);
    setTimeout(() => setSampleAddedFeedback(false), 1500);
  };

  const swatchStyle = getSwatchBackground(selectedColor);

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#ff8407] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      {/* Visualizer & Plank Swatch Area - Bento Tile Top */}
      <div
        className="relative h-44 bg-[#000000] overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(product, selectedColor)}
      >
        {/* Dynamic Texture Background rendering the selected color with realistic finish */}
        <div
          className="absolute inset-0 transition-all duration-300 transform group-hover:scale-105"
          style={swatchStyle}
        >
          {/* Subtle woodgrain / marble overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
        </div>

        {/* Hand Sample Available Badge */}
        {product.handSamplesAvailable && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-xs border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8407] animate-pulse"></span>
            <span>Muestras Disponibles</span>
          </div>
        )}

        {/* Origin / Class Badge */}
        {product.specs.origin && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-sm bg-[#ff8407] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
            {product.specs.origin}
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenVisualizerWithProduct(product, selectedColor);
          }}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#000000] text-xs font-bold shadow-md backdrop-blur-xs transition transform hover:scale-105"
          title="Ver este piso aplicado en un ambiente 3D"
        >
          <Eye size={13} className="text-[#ff8407]" />
          <span>Ver 3D</span>
        </button>

        {/* Current Active Color overlay info */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-sm font-bold drop-shadow-sm flex items-center gap-2">
            {selectedColor.name}
            {selectedColor.code && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-sm font-mono font-medium">
                {selectedColor.code}
              </span>
            )}
          </div>
          {selectedColor.finish && (
            <div className="text-[10px] text-white/80 drop-shadow-xs">{selectedColor.finish}</div>
          )}
        </div>
      </div>

      {/* Bento Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff8407]">
                {product.collection}
              </span>
              <h3
                onClick={() => onOpenDetail(product, selectedColor)}
                className="text-base font-bold text-[#000000] hover:text-[#ff8407] cursor-pointer transition mt-0.5"
              >
                {product.name}
              </h3>
            </div>
            {product.specs.warrantyResidential && (
              <span className="text-[10px] font-bold text-[#64748b] bg-[#e2e8f0]/40 px-2 py-0.5 rounded-sm border border-[#e2e8f0] shrink-0 uppercase tracking-wider">
                {product.specs.warrantyResidential.split(' ')[0]} {product.specs.warrantyResidential.split(' ')[1]}
              </span>
            )}
          </div>

          <p className="text-xs text-[#64748b] mt-1 line-clamp-2">{product.subtitle}</p>

          {/* Quick Specifications Bento Pill Grid */}
          <div className="grid grid-cols-2 gap-2 my-3 text-[11px]">
            {product.specs.wearLayer && (
              <div className="bg-[#e2e8f0]/30 border border-[#e2e8f0] p-2 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase text-[#64748b]">WEAR LAYER:</span>
                <span className="font-bold text-[#000000]">{product.specs.wearLayer}</span>
              </div>
            )}
            {product.specs.totalThickness && (
              <div className="bg-[#e2e8f0]/30 border border-[#e2e8f0] p-2 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase text-[#64748b]">GROSOR:</span>
                <span className="font-bold text-[#000000]">{product.specs.totalThickness}</span>
              </div>
            )}
            {product.specs.plankSize && (
              <div className="bg-[#e2e8f0]/30 border border-[#e2e8f0] p-2 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase text-[#64748b]">MEDIDA:</span>
                <span className="font-bold text-[#000000] truncate max-w-[90px]" title={product.specs.plankSize}>
                  {product.specs.plankSize.split('|')[0]}
                </span>
              </div>
            )}
            {product.specs.sqftPerBox && (
              <div className="bg-[#e2e8f0]/30 border border-[#e2e8f0] p-2 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase text-[#64748b]">SQFT/CAJA:</span>
                <span className="font-bold text-[#ff8407]">{product.specs.sqftPerBox}</span>
              </div>
            )}
          </div>

          {/* Color Palettes Swatch Strip */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-medium text-[#64748b] mb-2">
              <span className="font-semibold text-[#000000]">Tonos ({product.colors.length}):</span>
              <span className="text-[#64748b] text-[10px]">Toca para cambiar</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {product.colors.map((col, idx) => {
                const isCurrent = selectedColorIndex === idx;
                return (
                  <button
                    key={col.name + idx}
                    onClick={() => setSelectedColorIndex(idx)}
                    title={`${col.name} ${col.code ? `(${col.code})` : ''}`}
                    className={`w-6 h-6 rounded-full border-2 transition-all relative ${
                      isCurrent
                        ? 'border-[#ff8407] scale-110 shadow-xs ring-2 ring-[#ff8407]/30'
                        : 'border-[#e2e8f0] hover:border-[#64748b]'
                    }`}
                    style={{ backgroundColor: col.hexColor }}
                  >
                    {isCurrent && (
                      <span className="absolute inset-0 flex items-center justify-center text-[#000000] text-[9px] font-bold">
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
        <div className="pt-3 border-t border-[#e2e8f0] space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Hand sample button */}
            <button
              onClick={handleQuickAddSample}
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                sampleAddedFeedback
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white hover:bg-[#e2e8f0]/50 text-[#000000] border-[#e2e8f0]'
              }`}
            >
              {sampleAddedFeedback ? <Check size={14} /> : <Plus size={14} className="text-[#ff8407]" />}
              <span>{sampleAddedFeedback ? 'Lista' : 'Muestra'}</span>
            </button>

            {/* Add to order / quote */}
            <button
              onClick={() => onAddToOrder(product, selectedColor)}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#000000] hover:bg-[#ff8407] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <Plus size={14} className="text-[#ff8407]" />
              <span>Cotizar</span>
            </button>
          </div>

          {/* Full specs technical sheet link */}
          <button
            onClick={() => onOpenDetail(product, selectedColor)}
            className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#64748b] hover:text-[#ff8407] transition"
          >
            <FileText size={12} />
            <span>Ficha Técnica y Calculadora</span>
          </button>
        </div>
      </div>
    </div>
  );
};
