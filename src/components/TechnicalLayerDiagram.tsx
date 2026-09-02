import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { BaseboardsProfileDiagram } from './BaseboardsProfileDiagram';

interface Props {
  type?: 'spc-layers' | 'ultra-layers' | 'laminate-layers' | 'molding-profile' | 'step-profile' | 'wpc-slat' | 'baseboard-profiles';
  className?: string;
}

export const TechnicalLayerDiagram: React.FC<Props> = ({ type = 'spc-layers', className = '' }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  if (type === 'baseboard-profiles') {
    return <BaseboardsProfileDiagram className={className} />;
  }

  if (type === 'step-profile') {
    return (
      <div className={`bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 ${className}`}>
        <h4 className="text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0B0B0B]"></span>
          {isEn ? 'Technical Stair Tread Profiles' : 'Perfil Técnico de Grada (Stair Tread)'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-[#D9D9D9] text-center">
            <div className="text-xs font-bold text-[#0B0B0B] mb-1">Double Rounded (SPC)</div>
            <svg viewBox="0 0 200 100" className="w-full h-24 mx-auto">
              <path
                d="M 20 40 L 140 40 Q 155 40 155 55 L 155 75 Q 155 85 145 85 L 130 85 Q 120 85 120 75 L 120 60 L 20 60 Z"
                fill="#0B0B0B"
                fillOpacity="0.08"
                stroke="#0B0B0B"
                strokeWidth="2"
              />
              <text x="75" y="32" fontSize="9" fill="#6B6762" textAnchor="middle">Custom Length</text>
              <text x="175" y="60" fontSize="9" fill="#6B6762">1-1/2"</text>
              <text x="135" y="97" fontSize="9" fill="#6B6762">7/8"</text>
            </svg>
            <p className="text-[11px] text-[#6B6762] mt-1">
              {isEn
                ? 'Double rounded front edge for maximum safety and ergonomic step flow.'
                : 'Borde frontal doblemente redondeado para máxima seguridad.'}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#D9D9D9] text-center">
            <div className="text-xs font-bold text-[#0B0B0B] mb-1">Square Step (SPC & Laminate)</div>
            <svg viewBox="0 0 200 100" className="w-full h-24 mx-auto">
              <path
                d="M 20 40 L 150 40 L 150 78 L 132 78 L 132 58 L 20 58 Z"
                fill="#0B0B0B"
                fillOpacity="0.08"
                stroke="#0B0B0B"
                strokeWidth="2"
              />
              <text x="75" y="32" fontSize="9" fill="#6B6762" textAnchor="middle">Custom Length</text>
              <text x="172" y="60" fontSize="9" fill="#6B6762">1-3/8"</text>
              <text x="138" y="94" fontSize="9" fill="#6B6762">7/8"</text>
            </svg>
            <p className="text-[11px] text-[#6B6762] mt-1">
              {isEn
                ? 'Contemporary 90° architectural straight edge profile.'
                : 'Perfil contemporáneo de 90° de corte recto arquitectónico.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'molding-profile') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#0B0B0B] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B0B0B]"></span>
            {isEn ? 'Molding & Transition Profiles' : 'Perfiles de Molduras & Transiciones'}
          </h4>
          <span className="text-[10px] font-bold text-[#6B6762] bg-[#F5F5F5] px-2.5 py-0.5 rounded-full border border-[#D9D9D9]">
            {isEn ? 'Cross-Sections & Dimensions' : 'Cortes Transversales & Medidas'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: T-MOLDING */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#D9D9D9] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <h5 className="text-base sm:text-lg font-black text-[#0B0B0B] tracking-tight mb-2">
                T-MOLDING
              </h5>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                {isEn
                  ? 'Perfect for joining different floors, ensuring a smooth transition.'
                  : 'Perfecto para unir diferentes pisos, asegurando una transición suave.'}
              </p>
            </div>
            <div className="pt-2 pb-1 flex items-center justify-center">
              <svg viewBox="0 0 260 100" className="w-full h-24 max-w-[240px]">
                {/* Dimension Top 1-3/4" */}
                <path d="M 52 20 L 52 12 L 210 12 L 210 20" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="131" y="9" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0B0B0B">1-3/4″</text>
                {/* Dimension Left 1/4" */}
                <path d="M 28 36 L 20 36 L 20 54 L 28 54" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="14" y="49" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0B0B0B">1/4″</text>
                {/* Profile shape */}
                <path
                  d="M 52 38 Q 131 34 210 38 Q 216 39 216 45 Q 216 52 210 53 L 148 53 L 148 68 Q 148 72 144 72 L 140 72 L 138 76 L 124 76 L 122 72 L 118 72 Q 114 72 114 68 L 114 53 L 52 53 Q 46 52 46 45 Q 46 39 52 38 Z"
                  fill="#C4C8CC"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: REDUCER */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#D9D9D9] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <h5 className="text-base sm:text-lg font-black text-[#0B0B0B] tracking-tight mb-2">
                REDUCER
              </h5>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                {isEn
                  ? 'Facilitates the transition between floors of different heights, practical and versatile.'
                  : 'Facilita la transición entre pisos de diferentes alturas, práctico y versátil.'}
              </p>
            </div>
            <div className="pt-2 pb-1 flex items-center justify-center">
              <svg viewBox="0 0 260 100" className="w-full h-24 max-w-[240px]">
                {/* Dimension Top 1-3/4" */}
                <path d="M 68 16 L 68 8 L 222 8 L 222 16" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="145" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0B0B0B">1-3/4″</text>
                {/* Dimension Left 3/8" */}
                <path d="M 60 26 L 52 26 L 52 74 L 60 74" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="46" y="54" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0B0B0B">3/8″</text>
                {/* Reducer profile shape */}
                <path
                  d="M 120 26 Q 180 26 220 32 Q 225 34 223 42 Q 220 46 212 46 L 180 46 L 180 60 L 170 60 L 166 54 L 148 54 L 144 60 L 138 60 L 138 44 L 122 44 L 122 74 L 70 74 Q 76 48 120 26 Z"
                  fill="#C4C8CC"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {/* Card 3: END CAP */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#D9D9D9] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <h5 className="text-base sm:text-lg font-black text-[#0B0B0B] tracking-tight mb-2">
                END CAP
              </h5>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                {isEn
                  ? 'Completes your floor installation with an elegant and professional touch.'
                  : 'Completa la instalación de tu piso con un toque elegante y profesional.'}
              </p>
            </div>
            <div className="pt-2 pb-1 flex items-center justify-center">
              <svg viewBox="0 0 260 100" className="w-full h-24 max-w-[240px]">
                {/* Dimension Top 1-3/8" */}
                <path d="M 60 16 L 60 8 L 215 8 L 215 16" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="137" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0B0B0B">1-3/8″</text>
                {/* Dimension Left 3/8" */}
                <path d="M 50 26 L 42 26 L 42 74 L 50 74" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="36" y="54" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0B0B0B">3/8″</text>
                {/* End Cap profile shape */}
                <path
                  d="M 68 26 Q 160 26 210 32 Q 215 34 213 42 Q 210 46 202 46 L 172 46 L 168 60 L 158 60 L 154 54 L 136 54 L 132 60 L 124 60 L 124 44 L 102 44 L 102 74 L 64 74 Q 58 74 58 68 L 58 34 Q 58 26 68 26 Z"
                  fill="#C4C8CC"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {/* Card 4: CM T-MOLDING */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#D9D9D9] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <h5 className="text-base sm:text-lg font-black text-[#0B0B0B] tracking-tight mb-2">
                CM T-MOLDING
              </h5>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                {isEn
                  ? 'Provides a stylish transition between floors, both functional and aesthetically pleasing.'
                  : 'Ofrece una elegante transición entre pisos, tanto funcional como estéticamente atractiva.'}
              </p>
            </div>
            <div className="pt-2 pb-1 flex items-center justify-center">
              <svg viewBox="0 0 260 100" className="w-full h-24 max-w-[240px]">
                {/* Dimension Top 1-3/4" */}
                <path d="M 52 18 L 52 10 L 210 10 L 210 18" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="131" y="7" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0B0B0B">1-3/4″</text>
                {/* Dimension Left 3/8" */}
                <path d="M 38 42 L 30 42 L 30 76 L 38 76" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="24" y="63" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0B0B0B">3/8″</text>
                {/* CM T-Molding curved arch shape */}
                <path
                  d="M 52 74 Q 56 46 95 44 L 165 44 Q 204 46 208 74 Q 210 78 204 80 L 194 80 Q 188 78 184 68 Q 170 60 130 60 Q 90 60 76 68 Q 72 78 66 80 L 56 80 Q 50 78 52 74 Z"
                  fill="#C4C8CC"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {/* Card 5: CM REDUCER */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#D9D9D9] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <h5 className="text-base sm:text-lg font-black text-[#0B0B0B] tracking-tight mb-2">
                CM REDUCER
              </h5>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                {isEn
                  ? 'Ideal for leveling uneven surfaces, combining utility and design.'
                  : 'Ideal para nivelar superficies irregulares, combinando utilidad y diseño.'}
              </p>
            </div>
            <div className="pt-2 pb-1 flex items-center justify-center">
              <svg viewBox="0 0 260 100" className="w-full h-24 max-w-[240px]">
                {/* Dimension Top 1-3/4" */}
                <path d="M 52 14 L 52 6 L 210 6 L 210 14" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="131" y="3" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0B0B0B">1-3/4″</text>
                {/* Dimension Left 3/8" */}
                <path d="M 38 28 L 30 28 L 30 80 L 38 80" stroke="#0B0B0B" strokeWidth="1.2" fill="none" />
                <text x="24" y="58" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0B0B0B">3/8″</text>
                {/* CM Reducer curved ramp shape */}
                <path
                  d="M 54 78 Q 50 36 90 32 L 180 32 Q 206 34 210 56 Q 210 64 200 64 L 192 64 Q 186 52 170 50 L 92 50 Q 72 52 72 78 Q 72 84 62 84 L 56 84 Q 52 84 54 78 Z"
                  fill="#C4C8CC"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: SPC or Ultra Mineral or Laminate layers
  const isUltra = type === 'ultra-layers';
  const isLaminate = type === 'laminate-layers';

  return (
    <div className={`bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0B0B0B]"></span>
          {isEn
            ? `Multi-layer Architecture (${isUltra ? 'Ultra Mineral Core' : isLaminate ? 'High Density Laminate' : 'SPC Rigid Core'})`
            : `Estructura de Capas Multicapa (${isUltra ? 'Ultra Mineral Core' : isLaminate ? 'High Density Laminate' : 'SPC Rigid Core'})`}
        </h4>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#0B0B0B] border border-[#D9D9D9]">
          {isUltra ? '10 mm Total' : isLaminate ? '7 mm / 8 mm' : '5.5 mm - 8 mm'}
        </span>
      </div>

      <div className="space-y-1.5 text-xs">
        {/* Layer 1: UV Layer */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-[#D9D9D9]">
          <span className="w-6 h-3 bg-[#E5E5E5] border border-[#D9D9D9] rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-[#0B0B0B]">
              {isEn ? '1. Double Ceramic UV Coating' : '1. Doble Capa UV Cerámica'}
            </span>
            <span className="text-[11px] text-[#6B6762]">
              {isEn ? 'Anti-stain & UV solar protection' : 'Anti-manchas y protección solar'}
            </span>
          </div>
        </div>

        {/* Layer 2: Wear Layer */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-[#D9D9D9]">
          <span className="w-6 h-3 bg-[#D9D9D9] border border-[#BCBAB4] rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-[#0B0B0B]">
              {isEn
                ? `2. Commercial Wear Layer (${isUltra ? 'AC5 / 22 Mil' : isLaminate ? 'AC5 / AC6 Commercial' : '20 Mil / 22 Mil'})`
                : `2. Capa de Desgaste (${isUltra ? 'AC5 / 22 Mil' : isLaminate ? 'AC5 / AC6 Commercial' : '20 Mil / 22 Mil'})`}
            </span>
            <span className="text-[11px] text-[#0B0B0B] font-bold">
              {isEn ? 'Heavy Commercial Grade' : 'Uso Comercial Intenso'}
            </span>
          </div>
        </div>

        {/* Layer 3: Decor Paper */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-[#D9D9D9]">
          <span className="w-6 h-3 bg-[#C4B39B] border border-[#A6947C] rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-[#0B0B0B]">
              {isEn ? '3. High-Definition Kraft Film' : '3. Película Decorativa HD Kraft'}
            </span>
            <span className="text-[11px] text-[#6B6762]">
              {isEn ? 'Ultra-realistic wood & stone grain' : 'Impresión de alta fidelidad'}
            </span>
          </div>
        </div>

        {/* Layer 4: Rigid Core */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-[#D9D9D9]">
          <span className="w-6 h-4 bg-[#262626] rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-[#0B0B0B]">
              {isEn
                ? `4. ${isUltra ? 'Ultra-Mineral 8mm UMC Core' : isLaminate ? 'High Density HDF Core (PVC Free)' : 'SPC Rigid Core Waterproof'}`
                : `4. ${isUltra ? 'Núcleo Ultra-Mineral 8mm UMC' : isLaminate ? 'Núcleo Laminado Alta Densidad (Free PVC)' : 'Núcleo Rígido SPC Waterproof'}`}
            </span>
            <span className="text-[11px] text-[#0B0B0B] font-semibold">
              {isEn ? '100% Waterproof' : '100% Impermeable'}
            </span>
          </div>
        </div>

        {/* Layer 5: HD EVA Padding */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-[#D9D9D9]">
          <span className="w-6 h-3 bg-[#6B6762] border border-[#383838] rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-[#0B0B0B]">
              {isEn ? '5. Integrated HD Acoustic Pad (1.5mm - 2mm)' : '5. Pad Acústico Integrado HD EVA (1.5mm - 2mm)'}
            </span>
            <span className="text-[11px] text-[#6B6762]">
              {isEn ? 'Sound Absorption & Comfort' : 'Insonorización & Confort'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

