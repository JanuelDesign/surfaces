import React from 'react';

interface Props {
  type?: 'spc-layers' | 'ultra-layers' | 'laminate-layers' | 'molding-profile' | 'step-profile' | 'wpc-slat';
  className?: string;
}

export const TechnicalLayerDiagram: React.FC<Props> = ({ type = 'spc-layers', className = '' }) => {
  if (type === 'step-profile') {
    return (
      <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 ${className}`}>
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff8407]"></span>
          Perfil Técnico de Grada (Stair Tread)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
            <div className="text-xs font-bold text-slate-800 mb-1">Double Rounded (SPC)</div>
            <svg viewBox="0 0 200 100" className="w-full h-24 mx-auto">
              <path
                d="M 20 40 L 140 40 Q 155 40 155 55 L 155 75 Q 155 85 145 85 L 130 85 Q 120 85 120 75 L 120 60 L 20 60 Z"
                fill="#ff8407"
                fillOpacity="0.15"
                stroke="#ff8407"
                strokeWidth="2"
              />
              <text x="75" y="32" fontSize="9" fill="#64748b" textAnchor="middle">Custom Length</text>
              <text x="175" y="60" fontSize="9" fill="#64748b">1-1/2"</text>
              <text x="135" y="97" fontSize="9" fill="#64748b">7/8"</text>
            </svg>
            <p className="text-[11px] text-slate-500 mt-1">Borde frontal doblemente redondeado para máxima seguridad.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
            <div className="text-xs font-bold text-slate-800 mb-1">Square Step (SPC & Laminate)</div>
            <svg viewBox="0 0 200 100" className="w-full h-24 mx-auto">
              <path
                d="M 20 40 L 150 40 L 150 78 L 132 78 L 132 58 L 20 58 Z"
                fill="#0f172a"
                fillOpacity="0.1"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x="75" y="32" fontSize="9" fill="#64748b" textAnchor="middle">Custom Length</text>
              <text x="172" y="60" fontSize="9" fill="#64748b">1-3/8"</text>
              <text x="138" y="94" fontSize="9" fill="#64748b">7/8"</text>
            </svg>
            <p className="text-[11px] text-slate-500 mt-1">Perfil contemporáneo de 90° de corte recto arquitectónico.</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'molding-profile') {
    return (
      <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 ${className}`}>
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff8407]"></span>
          Perfiles de Moldura & Ensamble
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-800">T-Molding</div>
            <div className="text-[10px] text-slate-500">1-3/4" x 3/8"</div>
            <div className="text-[9px] text-[#ff8407] mt-1 font-medium">Mismo nivel</div>
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-800">Reducer</div>
            <div className="text-[10px] text-slate-500">1-3/4" x 3/8"</div>
            <div className="text-[9px] text-[#ff8407] mt-1 font-medium">Desnivel de piso</div>
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-800">End Cap</div>
            <div className="text-[10px] text-slate-500">1-3/8" x 3/8"</div>
            <div className="text-[9px] text-[#ff8407] mt-1 font-medium">Remate perimetral</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'wpc-slat') {
    return (
      <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 ${className}`}>
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff8407]"></span>
          Estructura Ranurada WPC / Acoustic Slat
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1 h-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex-1 h-full bg-[#ff8407]/20 border-t-2 border-r border-[#ff8407] rounded-t flex items-center justify-center">
                  <span className="text-[8px] text-slate-600 font-bold">1"</span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-slate-800 rounded-b mt-0.5"></div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-2">
              <span>Listón ranurado</span>
              <span>Base acústica / Núcleo WPC</span>
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
    <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff8407]"></span>
          Estructura de Capas Multicapa ({isUltra ? 'Ultra Mineral Core' : isLaminate ? 'High Density Laminate' : 'SPC Rigid Core'})
        </h4>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff8407]/10 text-[#ff8407]">
          {isUltra ? '10 mm Total' : isLaminate ? '7 mm / 8 mm' : '5.5 mm - 8 mm'}
        </span>
      </div>

      <div className="space-y-1.5 text-xs">
        {/* Layer 1: UV Layer */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-slate-200">
          <span className="w-6 h-3 bg-amber-200 border border-amber-300 rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-slate-700">1. Doble Capa UV Cerámica</span>
            <span className="text-[11px] text-slate-500">Anti-manchas y protección solar</span>
          </div>
        </div>

        {/* Layer 2: Wear Layer */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-slate-200">
          <span className="w-6 h-3 bg-orange-300 border border-orange-400 rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-slate-700">
              2. Capa de Desgaste ({isUltra ? 'AC5 / 22 Mil' : isLaminate ? 'AC5 / AC6 Commercial' : '20 Mil / 22 Mil'})
            </span>
            <span className="text-[11px] text-[#ff8407] font-semibold">Uso Comercial Intenso</span>
          </div>
        </div>

        {/* Layer 3: Decor Paper */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-slate-200">
          <span className="w-6 h-3 bg-stone-300 border border-stone-400 rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-slate-700">3. Película Decorativa HD Kraft</span>
            <span className="text-[11px] text-slate-500">Impresión de alta fidelidad</span>
          </div>
        </div>

        {/* Layer 4: Rigid Core */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-slate-200">
          <span className={`w-6 h-4 ${isUltra ? 'bg-zinc-800' : isLaminate ? 'bg-amber-800' : 'bg-slate-700'} rounded shrink-0`}></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-slate-800">
              4. {isUltra ? 'Núcleo Ultra-Mineral 8mm UMC' : isLaminate ? 'Núcleo Laminado Alta Densidad (Free PVC)' : 'Núcleo Rígido SPC Waterproof'}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">100% Impermeable</span>
          </div>
        </div>

        {/* Layer 5: HD EVA Padding */}
        <div className="flex items-center gap-3 bg-white p-2 rounded border border-slate-200">
          <span className="w-6 h-3 bg-blue-400 border border-blue-500 rounded shrink-0"></span>
          <div className="flex-1 flex justify-between">
            <span className="font-medium text-slate-700">5. Pad Acústico Integrado HD EVA (1.5mm - 2mm)</span>
            <span className="text-[11px] text-slate-500">Insonorización & Confort</span>
          </div>
        </div>
      </div>
    </div>
  );
};
