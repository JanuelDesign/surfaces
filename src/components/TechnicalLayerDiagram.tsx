import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  type?: 'spc-layers' | 'ultra-layers' | 'laminate-layers' | 'molding-profile' | 'step-profile' | 'wpc-slat';
  className?: string;
}

export const TechnicalLayerDiagram: React.FC<Props> = ({ type = 'spc-layers', className = '' }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

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
      <div className={`bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl p-4 sm:p-5 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-[#0B0B0B] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B0B0B]"></span>
            {isEn ? 'Molding & Transition Profiles (5 Architectural Models)' : 'Perfiles Técnicos de Molduras & Transiciones (5 Modelos)'}
          </h4>
          <span className="text-[10px] font-bold text-[#6B6762] bg-white px-2.5 py-0.5 rounded-full border border-[#D9D9D9]">
            {isEn ? 'Engineering Cross-Sections' : 'Cortes Transversales'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Model 1: T-Molding */}
          <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9] text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-extrabold text-[#0B0B0B]">T-Molding</div>
              <div className="text-[10px] font-mono text-[#6B6762]">1-3/4" x 3/8" (45 mm x 10 mm)</div>
              <div className="mt-1 inline-block text-[9px] font-bold text-white bg-[#0B0B0B] px-2 py-0.5 rounded-full">
                {isEn ? 'Same Level' : 'Mismo Nivel'}
              </div>
            </div>
            <div className="my-2 py-1">
              <svg viewBox="0 0 180 80" className="w-full h-16 mx-auto">
                {/* T-shape profile */}
                <path
                  d="M 15 30 Q 90 22 165 30 L 165 37 Q 105 35 102 40 L 102 68 L 78 68 L 78 40 Q 75 35 15 37 Z"
                  fill="#0B0B0B"
                  fillOpacity="0.08"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
                {/* Dimensions */}
                <line x1="15" y1="18" x2="165" y2="18" stroke="#6B6762" strokeWidth="1" strokeDasharray="2 2" />
                <text x="90" y="14" fontSize="8" fill="#6B6762" textAnchor="middle" fontWeight="bold">1-3/4"</text>
                <text x="170" y="48" fontSize="8" fill="#6B6762">3/8"</text>
              </svg>
            </div>
            <p className="text-[10px] text-[#6B6762] leading-tight">
              {isEn ? 'Seamless bridge between two level surfaces of identical height.' : 'Puente de unión entre dos pisos de la misma altura.'}
            </p>
          </div>

          {/* Model 2: Reducer */}
          <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9] text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-extrabold text-[#0B0B0B]">Reducer</div>
              <div className="text-[10px] font-mono text-[#6B6762]">1-3/4" x 3/8" (45 mm x 10 mm)</div>
              <div className="mt-1 inline-block text-[9px] font-bold text-white bg-[#0B0B0B] px-2 py-0.5 rounded-full">
                {isEn ? 'Floor Transition' : 'Desnivel de Piso'}
              </div>
            </div>
            <div className="my-2 py-1">
              <svg viewBox="0 0 180 80" className="w-full h-16 mx-auto">
                {/* Reducer ramp shape */}
                <path
                  d="M 20 28 L 95 28 Q 155 35 165 65 L 145 65 Q 135 48 95 44 L 95 68 L 72 68 L 72 44 L 20 44 Z"
                  fill="#0B0B0B"
                  fillOpacity="0.08"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
                <line x1="20" y1="18" x2="165" y2="18" stroke="#6B6762" strokeWidth="1" strokeDasharray="2 2" />
                <text x="92" y="14" fontSize="8" fill="#6B6762" textAnchor="middle" fontWeight="bold">1-3/4"</text>
                <text x="170" y="48" fontSize="8" fill="#6B6762">3/8"</text>
              </svg>
            </div>
            <p className="text-[10px] text-[#6B6762] leading-tight">
              {isEn ? 'Smooth transition ramp to lower floors, tile, or bare concrete.' : 'Rampa suave para desniveles hacia baldosas o concreto.'}
            </p>
          </div>

          {/* Model 3: End Cap */}
          <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9] text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-extrabold text-[#0B0B0B]">End Cap</div>
              <div className="text-[10px] font-mono text-[#6B6762]">1-3/8" x 3/8" (35 mm x 10 mm)</div>
              <div className="mt-1 inline-block text-[9px] font-bold text-white bg-[#0B0B0B] px-2 py-0.5 rounded-full">
                {isEn ? 'Perimeter Finish' : 'Remate Perimetral'}
              </div>
            </div>
            <div className="my-2 py-1">
              <svg viewBox="0 0 180 80" className="w-full h-16 mx-auto">
                {/* End cap / Square threshold shape */}
                <path
                  d="M 25 28 L 130 28 L 130 68 L 105 68 L 105 44 L 25 44 Z"
                  fill="#0B0B0B"
                  fillOpacity="0.08"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
                <line x1="25" y1="18" x2="130" y2="18" stroke="#6B6762" strokeWidth="1" strokeDasharray="2 2" />
                <text x="78" y="14" fontSize="8" fill="#6B6762" textAnchor="middle" fontWeight="bold">1-3/8"</text>
                <text x="140" y="48" fontSize="8" fill="#6B6762">3/8"</text>
              </svg>
            </div>
            <p className="text-[10px] text-[#6B6762] leading-tight">
              {isEn ? 'Square clean stop against sliding doors, carpets, or thresholds.' : 'Remate recto para puertas corredizas, ventanales o alfombras.'}
            </p>
          </div>

          {/* Model 4: Quarter Round */}
          <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9] text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-extrabold text-[#0B0B0B]">Quarter Round</div>
              <div className="text-[10px] font-mono text-[#6B6762]">5/8" x 5/8" (16 mm x 16 mm)</div>
              <div className="mt-1 inline-block text-[9px] font-bold text-white bg-[#0B0B0B] px-2 py-0.5 rounded-full">
                {isEn ? 'Wall & Baseboard Shoe' : 'Remate de Zócalo'}
              </div>
            </div>
            <div className="my-2 py-1">
              <svg viewBox="0 0 180 80" className="w-full h-16 mx-auto">
                {/* Quarter round curve shape */}
                <path
                  d="M 60 20 L 60 70 L 110 70 Q 110 20 60 20 Z"
                  fill="#0B0B0B"
                  fillOpacity="0.08"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
                <text x="85" y="14" fontSize="8" fill="#6B6762" textAnchor="middle" fontWeight="bold">5/8"</text>
                <text x="120" y="50" fontSize="8" fill="#6B6762">5/8"</text>
              </svg>
            </div>
            <p className="text-[10px] text-[#6B6762] leading-tight">
              {isEn ? 'Covers expansion gaps against walls and existing baseboards.' : 'Cubre el espacio de dilatación contra zócalos o muros.'}
            </p>
          </div>

          {/* Model 5: Flush Stair Nose */}
          <div className="bg-white p-3.5 rounded-xl border border-[#D9D9D9] text-center flex flex-col justify-between sm:col-span-2 lg:col-span-2">
            <div>
              <div className="text-xs font-extrabold text-[#0B0B0B]">Stair Nose (Flush / Overlap)</div>
              <div className="text-[10px] font-mono text-[#6B6762]">2-3/4" x 1-1/8" (70 mm x 28 mm)</div>
              <div className="mt-1 inline-block text-[9px] font-bold text-white bg-[#0B0B0B] px-2 py-0.5 rounded-full">
                {isEn ? 'Step Edge Transition' : 'Borde de Grada'}
              </div>
            </div>
            <div className="my-2 py-1">
              <svg viewBox="0 0 240 80" className="w-full h-16 mx-auto">
                {/* Stair nose bullnose curve */}
                <path
                  d="M 30 35 L 170 35 Q 195 35 195 50 Q 195 68 180 68 L 165 68 L 165 52 L 30 52 Z"
                  fill="#0B0B0B"
                  fillOpacity="0.08"
                  stroke="#0B0B0B"
                  strokeWidth="1.8"
                />
                <line x1="30" y1="22" x2="195" y2="22" stroke="#6B6762" strokeWidth="1" strokeDasharray="2 2" />
                <text x="110" y="16" fontSize="8" fill="#6B6762" textAnchor="middle" fontWeight="bold">2-3/4"</text>
                <text x="205" y="52" fontSize="8" fill="#6B6762">1-1/8"</text>
              </svg>
            </div>
            <p className="text-[10px] text-[#6B6762] leading-tight">
              {isEn ? 'Architectural nosing providing clean transition at step landings and top staircase treads.' : 'Remate frontal para descanso de escaleras y peldaños superiores.'}
            </p>
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

