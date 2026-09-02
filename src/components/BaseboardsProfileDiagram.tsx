import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

// Import existing product photos for the visual cards
import imgBB1x6_14 from '../images/products/baseboards/baseboards_bb1x6_pine_14mm.webp';
import imgBB1x4_14 from '../images/products/baseboards/baseboards_bb1x4_pine_14mm.webp';
import imgBB5180 from '../images/products/baseboards/baseboards_bb5180_pine_14mm.webp';

interface Props {
  className?: string;
}

export const BaseboardsProfileDiagram: React.FC<Props> = ({ className = '' }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className={`bg-white border border-[#D9D9D9] rounded-2xl p-4 sm:p-6 shadow-xs space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E5E5E5] gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0B0B0B] tracking-tight">
            Baseboards
          </h3>
          <p className="text-xs text-[#6B6762] font-medium">
            {isEn
              ? 'Architectural Profiles, Cross-Sections & Linear Dimensions'
              : 'Perfiles Arquitectónicos, Cortes Transversales y Medidas Lineales'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#0B0B0B] bg-[#F5F5F5] border border-[#D9D9D9] px-2.5 py-1 rounded-full uppercase tracking-wider">
            {isEn ? 'FSC Pine / EPS / MDF' : 'Pino Finger-Joint / EPS / MDF'}
          </span>
        </div>
      </div>

      {/* SECTION 1: Upper Block - Modern Flat Tall Profiles & Shoe Trims (5 1/2", 7 1/2", 4 1/2", QR, 1x1) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-[#0B0B0B]">
            {isEn ? '1. Modern Flat Profiles & Base Shoes' : '1. Perfiles Planos Contemporáneos & Remates'}
          </span>
          <span className="text-[10px] text-[#6B6762] font-semibold">
            {isEn ? '5-1/2" to 7-1/2" Height' : 'Alturas de 5-1/2" a 7-1/2"'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Visual 3D Render / Photo of flat baseboard on wall */}
          <div className="lg:col-span-4 bg-white p-2 rounded-xl border border-[#D9D9D9] shadow-xs flex flex-col items-center">
            <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden relative bg-[#EBEBEB] flex items-center justify-center">
              <img
                src={imgBB1x6_14}
                alt="Flat Baseboard Wall Installation"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Flat Modern Profile
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="text-[11px] font-bold text-[#0B0B0B]">BB 1x6 & 1x8 Series</div>
              <div className="text-[10px] text-[#6B6762]">Pre-primed White Ready to Paint</div>
            </div>
          </div>

          {/* SVG Cross-Section Diagrams for Flat Tall Profiles */}
          <div className="lg:col-span-8 overflow-x-auto pb-2">
            <div className="min-w-[560px] flex items-end justify-between gap-2.5 pt-6 pb-2 px-1">
              {/* Profile 1: EPS 5-1/2" - 12 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-bold text-[#4B5563] text-center leading-tight">
                  14mm<br />½:aprox
                </div>
                <div className="text-[9px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[9px] font-bold text-[#6B6762] absolute -left-5 top-1/2 -translate-y-1/2 rotate-[-90deg]">5 ½"</span>
                  <div className="w-5 h-28 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[8px] font-black text-white rotate-[-90deg] tracking-tighter">EPS</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">12 LF</div>
              </div>

              {/* Profile 2: PINE 5-1/2" 14mm - 16 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-bold text-[#4B5563] text-center leading-tight">
                  14mm<br />½:aprox
                </div>
                <div className="text-[9px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[9px] font-bold text-[#6B6762] absolute -left-5 top-1/2 -translate-y-1/2 rotate-[-90deg]">5 ½"</span>
                  <div className="w-5 h-28 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[8px] font-black text-white rotate-[-90deg] tracking-tighter">PINE</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">16 LF</div>
              </div>

              {/* Profile 3: PINE 5-1/2" 18mm - 16 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-bold text-[#4B5563] text-center leading-tight">
                  18mm<br />¾:aprox
                </div>
                <div className="text-[9px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <div className="w-7 h-28 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[8px] font-black text-white rotate-[-90deg] tracking-tighter">PINE</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">16 LF</div>
              </div>

              {/* Profile 4: PINE 7-1/2" 14mm - 16 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-bold text-[#4B5563] text-center leading-tight">
                  14mm<br />½:aprox
                </div>
                <div className="text-[9px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[9px] font-bold text-[#6B6762] absolute -left-5 top-1/2 -translate-y-1/2 rotate-[-90deg]">7 ½"</span>
                  <div className="w-5 h-38 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[8px] font-black text-white rotate-[-90deg] tracking-tighter">PINE</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">16 LF</div>
              </div>

              {/* Profile 5: PINE 7-1/2" 18mm - 16 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-bold text-[#4B5563] text-center leading-tight">
                  18mm<br />¾:aprox
                </div>
                <div className="text-[9px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[9px] font-bold text-[#6B6762] absolute -left-5 top-1/2 -translate-y-1/2 rotate-[-90deg]">7 ½"</span>
                  <div className="w-7 h-38 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[8px] font-black text-white rotate-[-90deg] tracking-tighter">PINE</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">16 LF</div>
              </div>

              {/* Profile 6: PINE 7-1/2" 14mm #810 Notch */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-bold text-[#4B5563] text-center leading-tight">
                  14mm<br />½:aprox
                </div>
                <div className="text-[9px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[9px] font-bold text-[#6B6762] absolute -left-5 top-1/2 -translate-y-1/2 rotate-[-90deg]">7 ½"</span>
                  <svg width="24" height="152" viewBox="0 0 24 152" className="drop-shadow-xs">
                    {/* Stepped notch #810 */}
                    <path
                      d="M 2 2 L 18 2 L 18 16 L 22 16 L 22 150 L 2 150 Z"
                      fill="#8C929D"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                    />
                    <text x="12" y="80" fontSize="8" fill="#FFFFFF" fontWeight="bold" textAnchor="middle" transform="rotate(-90 12 80)">PINE</text>
                  </svg>
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">16 LF</div>
                <div className="text-[9px] font-extrabold text-[#0B0B0B]">#810</div>
              </div>

              {/* Profile 7: PINE 4-1/2" 14mm #410 Rebate */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-bold text-[#4B5563] text-center leading-tight">
                  14mm<br />½:aprox
                </div>
                <div className="text-[9px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[9px] font-bold text-[#6B6762] absolute -left-5 top-1/2 -translate-y-1/2 rotate-[-90deg]">4 ½"</span>
                  <svg width="24" height="96" viewBox="0 0 24 96" className="drop-shadow-xs">
                    {/* Stepped notch #410 */}
                    <path
                      d="M 2 2 L 18 2 L 18 12 L 22 12 L 22 94 L 2 94 Z"
                      fill="#8C929D"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                    />
                    <text x="12" y="52" fontSize="8" fill="#FFFFFF" fontWeight="bold" textAnchor="middle" transform="rotate(-90 12 52)">PINE</text>
                  </svg>
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">16 LF</div>
                <div className="text-[9px] font-extrabold text-[#0B0B0B]">#410</div>
              </div>

              {/* Profile 8: Quarter Round 1/2" x 3/4" */}
              <div className="flex flex-col items-center justify-end h-full">
                <div className="relative flex items-center mb-1">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-3.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">½"</span>
                  <svg width="34" height="34" viewBox="0 0 34 34" className="drop-shadow-xs">
                    <path
                      d="M 2 2 L 2 32 L 32 32 Q 32 2 2 2 Z"
                      fill="#8C929D"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="text-[8px] font-bold text-[#6B6762] text-center">↔ ¾"</div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">16 LF</div>
                <div className="text-[8px] font-semibold text-[#6B6762]">QR</div>
              </div>

              {/* Profile 9: Square 1x1 MDF / Base Shoe */}
              <div className="flex flex-col items-center justify-end h-full">
                <div className="relative flex items-center mb-1">
                  <div className="w-7 h-7 bg-[#8C929D] border border-[#4B5563] rounded-[1px] shadow-xs flex items-center justify-center">
                    <span className="text-[7px] font-bold text-white">1x1</span>
                  </div>
                </div>
                <div className="text-[8px] font-bold text-[#6B6762] text-center">T</div>
                <div className="mt-2 text-[10px] font-bold text-[#0B0B0B]">9 LF</div>
                <div className="text-[8px] font-semibold text-[#6B6762]">Square</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: 2 SUB-SECTIONS (Low Profiles on Left, Molded/Colonial on Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* SUB-SECTION 2: Low Profiles (3 1/2" & 2 1/2" MDF / Pine) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#0B0B0B]">
              {isEn ? '2. Low-Profile Baseboards' : '2. Rodapiés de Bajo Perfil'}
            </span>
            <span className="text-[10px] text-[#6B6762] font-semibold">
              3-1/2" & 2-1/2"
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Visual Photo */}
            <div className="sm:col-span-5 bg-white p-2 rounded-xl border border-[#D9D9D9] shadow-xs">
              <div className="w-full h-32 rounded-lg overflow-hidden bg-[#EBEBEB]">
                <img
                  src={imgBB1x4_14}
                  alt="Low profile baseboards"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="mt-1 text-center">
                <div className="text-[10px] font-bold text-[#0B0B0B]">MDF & Pine Cores</div>
              </div>
            </div>

            {/* Diagrams */}
            <div className="sm:col-span-7 flex items-end justify-around gap-2 pt-4 pb-1">
              {/* Profile 1: MDF 3-1/2" 14mm - 16 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-[#4B5563] text-center leading-tight">14mm<br />½:aprox</div>
                <div className="text-[8px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-4.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">3 ½"</span>
                  <div className="w-4.5 h-20 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[7px] font-black text-white rotate-[-90deg] tracking-tighter">MDF</span>
                  </div>
                </div>
                <div className="mt-1.5 text-[9px] font-bold text-[#0B0B0B]">16 LF</div>
              </div>

              {/* Profile 2: PINE 3-1/2" 14mm - 17 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-[#4B5563] text-center leading-tight">14mm<br />½:aprox</div>
                <div className="text-[8px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-4.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">3 ½"</span>
                  <div className="w-4.5 h-20 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[7px] font-black text-white rotate-[-90deg] tracking-tighter">PINE</span>
                  </div>
                </div>
                <div className="mt-1.5 text-[9px] font-bold text-[#0B0B0B]">17 LF</div>
              </div>

              {/* Profile 3: PINE 3-1/2" 18mm - 17 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-[#4B5563] text-center leading-tight">18mm<br />¾:aprox</div>
                <div className="text-[8px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-4.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">3 ½"</span>
                  <div className="w-6 h-20 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[7px] font-black text-white rotate-[-90deg] tracking-tighter">PINE</span>
                  </div>
                </div>
                <div className="mt-1.5 text-[9px] font-bold text-[#0B0B0B]">17 LF</div>
              </div>

              {/* Profile 4: PINE 2-1/2" 18mm - 17 LF */}
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-[#4B5563] text-center leading-tight">18mm<br />¾:aprox</div>
                <div className="text-[8px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-4.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">2 ½"</span>
                  <div className="w-6 h-14 bg-[#8C929D] border border-[#4B5563] rounded-[1px] flex items-center justify-center shadow-xs">
                    <span className="text-[7px] font-black text-white rotate-[-90deg] tracking-tighter">PINE</span>
                  </div>
                </div>
                <div className="mt-1.5 text-[9px] font-bold text-[#0B0B0B]">17 LF</div>
              </div>
            </div>
          </div>
        </div>

        {/* SUB-SECTION 3: Colonial & Sculpted Molded Baseboards (#5180, #620, #618) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#0B0B0B]">
              {isEn ? '3. Colonial & Sculpted Profiles' : '3. Perfiles Coloniales & Esculpidos'}
            </span>
            <span className="text-[10px] text-[#6B6762] font-semibold">
              #5180, #620, #618
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Visual Photo */}
            <div className="sm:col-span-5 bg-white p-2 rounded-xl border border-[#D9D9D9] shadow-xs">
              <div className="w-full h-32 rounded-lg overflow-hidden bg-[#EBEBEB]">
                <img
                  src={imgBB5180}
                  alt="Colonial molded baseboard"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="mt-1 text-center">
                <div className="text-[10px] font-bold text-[#0B0B0B]">Colonial Molding Series</div>
              </div>
            </div>

            {/* SVG Profiles for Colonial, Crown & Traditional */}
            <div className="sm:col-span-7 flex items-end justify-around gap-2 pt-4 pb-1">
              {/* Profile 1: #5180 Colonial 5 1/4" */}
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-[#4B5563] text-center leading-tight">14mm<br />½:aprox</div>
                <div className="text-[8px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-4.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">5 ¼"</span>
                  <svg width="22" height="106" viewBox="0 0 22 106" className="drop-shadow-xs">
                    {/* Double ogee curve profile #5180 */}
                    <path
                      d="M 2 2 L 14 2 Q 18 2 18 6 Q 18 10 14 12 Q 10 16 12 24 Q 14 30 18 36 L 18 104 L 2 104 Z"
                      fill="#8C929D"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                    />
                    <text x="10" y="70" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle" transform="rotate(-90 10 70)">PINE</text>
                  </svg>
                </div>
                <div className="mt-1.5 text-[9px] font-bold text-[#0B0B0B]">16 LF</div>
                <div className="text-[8px] font-extrabold text-[#0B0B0B]">#5180</div>
              </div>

              {/* Profile 2: #620 Stepped Crown / Base 5 1/4" */}
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-[#4B5563] text-center leading-tight">14mm<br />½:aprox</div>
                <div className="text-[8px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-4.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">5 ¼"</span>
                  <svg width="22" height="106" viewBox="0 0 22 106" className="drop-shadow-xs">
                    {/* Stepped crown profile #620 */}
                    <path
                      d="M 2 2 L 12 2 L 12 6 Q 16 8 18 14 L 18 36 L 16 38 L 16 104 L 2 104 Z"
                      fill="#8C929D"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                    />
                    <text x="9" y="70" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle" transform="rotate(-90 9 70)">PINE</text>
                  </svg>
                </div>
                <div className="mt-1.5 text-[9px] font-bold text-[#0B0B0B]">16 LF</div>
                <div className="text-[8px] font-extrabold text-[#0B0B0B]">#620</div>
              </div>

              {/* Profile 3: #618 Traditional 4 1/4" */}
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-[#4B5563] text-center leading-tight">14mm<br />½:aprox</div>
                <div className="text-[8px] text-[#6B6762] my-0.5">↔</div>
                <div className="relative flex items-center">
                  <span className="text-[8px] font-bold text-[#6B6762] absolute -left-4.5 top-1/2 -translate-y-1/2 rotate-[-90deg]">4 ¼"</span>
                  <svg width="22" height="86" viewBox="0 0 22 86" className="drop-shadow-xs">
                    {/* Traditional ogee curve #618 */}
                    <path
                      d="M 2 2 L 14 2 Q 18 4 18 10 Q 18 18 14 24 L 14 36 L 18 40 L 18 84 L 2 84 Z"
                      fill="#8C929D"
                      stroke="#4B5563"
                      strokeWidth="1.5"
                    />
                    <text x="10" y="58" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle" transform="rotate(-90 10 58)">PINE</text>
                  </svg>
                </div>
                <div className="mt-1.5 text-[9px] font-bold text-[#0B0B0B]">16 LF</div>
                <div className="text-[8px] font-extrabold text-[#0B0B0B]">#618</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
