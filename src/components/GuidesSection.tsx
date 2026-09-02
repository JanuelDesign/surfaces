import React, { useState } from 'react';
import { FileText, X, Printer, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface GuideItem {
  id: 'installation' | 'maintenance' | 'warranty';
  titleEn: string;
  titleEs: string;
  subtitleEn: string;
  subtitleEs: string;
  pdfUrl?: string;
  summaryEn: string;
  summaryEs: string;
  keyPointsEn: string[];
  keyPointsEs: string[];
}

export const GUIDES_DATA: GuideItem[] = [
  {
    id: 'installation',
    titleEn: 'Installation Guide',
    titleEs: 'Guía de Instalación',
    subtitleEn: 'Step by Step Guide',
    subtitleEs: 'Guía Paso a Paso',
    pdfUrl: '/guides/installation-guide.pdf',
    summaryEn: 'Complete technical instructions for floating SPC rigid core flooring, stair treads, and architectural transitions.',
    summaryEs: 'Instrucciones técnicas completas para la instalación flotante de pisos SPC rigid core, gradas y molduras.',
    keyPointsEn: [
      'Subfloor preparation: Flat within 3/16" in 10 ft radius, dry and clean.',
      'Acoustic IXPE underlayment: Pre-attached, no additional foam pad required.',
      'Expansion gap: Leave 1/4" (6mm) to 3/8" (10mm) around all perimeter walls and vertical obstacles.',
      'Click-lock system: Angle at 20°-30° into the long groove, lower and gently tap the short end.',
      'Stairs & Transitions: Glue-down installation required for stair steps with polyurethane construction adhesive.'
    ],
    keyPointsEs: [
      'Preparación de contrapiso: Nivelado dentro de 3/16" en 10 pies, seco y libre de polvo.',
      'Manta acústica IXPE: Integrada de fábrica, no requiere espuma adicional.',
      'Junta de dilatación: Dejar 1/4" (6mm) a 3/8" (10mm) en todo el perímetro y obstáculos verticales.',
      'Sistema Click-Lock: Insertar a 20°-30° en la ranura longitudinal, bajar y ajustar suavemente.',
      'Gradas y Molduras: Instalación pegada obligatoria en gradas utilizando adhesivo de poliuretano.'
    ]
  },
  {
    id: 'maintenance',
    titleEn: 'Maintenance Guide',
    titleEs: 'Guía de Mantenimiento',
    subtitleEn: 'Easy Maintenance',
    subtitleEs: 'Mantenimiento Sencillo',
    pdfUrl: '/guides/maintenance-guide.pdf',
    summaryEn: 'Care and cleaning protocol to maintain the high-definition UV ceramic bead finish and lasting beauty.',
    summaryEs: 'Protocolo de limpieza y cuidado para proteger el acabado cerámico UV y conservar el brillo original.',
    keyPointsEn: [
      'Daily Cleaning: Sweep, dust mop, or vacuum with a soft bristle attachment (no beater bar).',
      'Damp Mopping: Use a microfiber mop with pH-neutral floor cleaner diluted in warm water.',
      'Waterproof Advantage: 100% waterproof core handles everyday spills, pet accidents, and bathroom moisture.',
      'Furniture Protection: Apply heavy-duty felt protector pads under all chairs and heavy furniture legs.',
      'Prohibited Chemicals: Never use abrasive scouring powders, bleach, acetone, or wax-based polish.'
    ],
    keyPointsEs: [
      'Limpieza Diaria: Barrer, mopa seca o aspiradora con accesorio suave sin cerdas rotatorias.',
      'Trapeado Húmedo: Usar mopa de microfibra con limpiador de pH neutro diluido en agua tibia.',
      'Ventaja 100% Impermeable: Núcleo rígido resistente a derrames diarios, mascotas y humedad.',
      'Protección de Muebles: Colocar protectores de fieltro de alta densidad bajo patas de mesas y sillas.',
      'Químicos Prohibidos: Evitar limpiadores abrasivos, cloro, acetona o ceras abrillantadoras.'
    ]
  },
  {
    id: 'warranty',
    titleEn: 'Warranty Guide',
    titleEs: 'Guía de Garantía',
    subtitleEn: 'Assured Tranquility',
    subtitleEs: 'Tranquilidad Asegurada',
    pdfUrl: '/guides/warranty-guide.pdf',
    summaryEn: 'Comprehensive manufacturer warranty policy covering wear-layer integrity, waterproofing, and structural stability.',
    summaryEs: 'Póliza de garantía integral de fábrica que cubre la capa de uso, impermeabilidad y estabilidad estructural.',
    keyPointsEn: [
      'Residential Coverage: Up to 25 to 30 years against wear-through, fading, and manufacturing defects.',
      'Commercial Coverage: 10 to 15 years heavy commercial warranty for 20 Mil and 22 Mil wear layers.',
      '100% Structural Waterproofing: Planks will not swell, crack, or delaminate when exposed to water.',
      'Claim Requirements: Proof of purchase, product batch codes, and installation under approved guidelines.'
    ],
    keyPointsEs: [
      'Garantía Residencial: Hasta 25 a 30 años contra desgaste de capa de uso, decoloración y defectos.',
      'Garantía Comercial: 10 a 15 años de garantía para capas de uso de 20 Mil y 22 Mil.',
      '100% Impermeabilidad Estructural: Las tablas no se hinchan, agrietan ni deslamiman por agua.',
      'Requisitos para Reclamos: Comprobante de compra, código de lote e instalación según manual oficial.'
    ]
  }
];

export const GuidesSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [activeModalGuide, setActiveModalGuide] = useState<GuideItem | null>(null);

  const handleDownloadClick = (guide: GuideItem) => {
    // If a custom direct PDF URL is hosted, we can trigger or open it,
    // and open the quick viewer modal so the user gets instant offline/printable access
    setActiveModalGuide(guide);
  };

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <section id="guides-section" className="w-full bg-[#FAFAFA] py-14 sm:py-18 border-t border-b border-[#E5E5E5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B0B0B] tracking-tight leading-tight">
            {isEn ? (
              <>
                Find your Installation and <br className="hidden sm:inline" />
                Maintenance Guide
              </>
            ) : (
              <>
                Encuentra tus Guías de Instalación y <br className="hidden sm:inline" />
                Mantenimiento
              </>
            )}
          </h2>
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-[#4B5563] leading-relaxed max-w-2xl mx-auto font-normal">
            {isEn
              ? 'Make sure your products look and function like new with our detailed installation, maintenance and warranty guides.'
              : 'Asegúrate de que tus productos luzcan y funcionen como nuevos con nuestras guías detalladas de instalación, mantenimiento y garantía.'}
          </p>
        </div>

        {/* 3 Guide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* 1. Installation Guide Card */}
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200 group">
            {/* PDF Sheet Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#0B0B0B] mb-5 group-hover:bg-[#ECECEC] group-hover:scale-105 transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-[#0B0B0B]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#0B0B0B] mb-1.5">
              {isEn ? 'Installation Guide' : 'Guía de Instalación'}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4B5563] mb-8">
              {isEn ? 'Step by Step Guide' : 'Guía Paso a Paso'}
            </p>

            <div className="w-full mt-auto pt-2">
              <button
                onClick={() => handleDownloadClick(GUIDES_DATA[0])}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <span>{isEn ? 'DOWNLOAD GUIDE' : 'DESCARGAR GUÍA'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3 3 3-3" />
                </svg>
              </button>
            </div>
          </div>

          {/* 2. Maintenance Guide Card */}
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200 group">
            {/* PDF Sheet Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#0B0B0B] mb-5 group-hover:bg-[#ECECEC] group-hover:scale-105 transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-[#0B0B0B]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#0B0B0B] mb-1.5">
              {isEn ? 'Maintenance Guide' : 'Guía de Mantenimiento'}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4B5563] mb-8">
              {isEn ? 'Easy Maintenance' : 'Mantenimiento Sencillo'}
            </p>

            <div className="w-full mt-auto pt-2">
              <button
                onClick={() => handleDownloadClick(GUIDES_DATA[1])}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <span>{isEn ? 'DOWNLOAD GUIDE' : 'DESCARGAR GUÍA'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3 3 3-3" />
                </svg>
              </button>
            </div>
          </div>

          {/* 3. Warranty Guide Card */}
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200 group">
            {/* PDF Sheet Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#0B0B0B] mb-5 group-hover:bg-[#ECECEC] group-hover:scale-105 transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-[#0B0B0B]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#0B0B0B] mb-1.5">
              {isEn ? 'Warranty Guide' : 'Guía de Garantía'}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#4B5563] mb-8">
              {isEn ? 'Assured Tranquility' : 'Tranquilidad Asegurada'}
            </p>

            <div className="w-full mt-auto pt-2">
              <button
                onClick={() => handleDownloadClick(GUIDES_DATA[2])}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <span>{isEn ? 'DOWNLOAD GUIDE' : 'DESCARGAR GUÍA'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3 3 3-3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Guide Reader / Printable PDF Modal */}
      {activeModalGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
          <div
            className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D9D9D9] overflow-hidden flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#D9D9D9] bg-[#F5F5F5] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] text-white flex items-center justify-center font-bold">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0B0B0B]">
                    {isEn ? activeModalGuide.titleEn : activeModalGuide.titleEs}
                  </h3>
                  <p className="text-xs text-[#6B6762] font-medium">
                    {isEn ? activeModalGuide.subtitleEn : activeModalGuide.subtitleEs} • SURFACES 2026
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalGuide(null)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 text-[#0B0B0B] transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
                <p className="text-xs sm:text-sm text-[#0B0B0B] leading-relaxed font-medium">
                  {isEn ? activeModalGuide.summaryEn : activeModalGuide.summaryEs}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0B0B0B] mb-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#FF7A00]" />
                  <span>{isEn ? 'Official Guidelines & Standards' : 'Directrices y Normas Oficiales'}</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#374151]">
                  {(isEn ? activeModalGuide.keyPointsEn : activeModalGuide.keyPointsEs).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B0B0B] mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#E5E5E5] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-[#6B6762]">
                  {isEn ? 'Need assistance? Contact your technical representative.' : '¿Requiere asistencia técnica? Contacte a su representante.'}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrintDocument}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#0B0B0B] text-xs font-bold border border-[#D9D9D9] transition cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>{isEn ? 'Print / Save PDF' : 'Imprimir / Guardar PDF'}</span>
                  </button>
                  <button
                    onClick={() => setActiveModalGuide(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold transition cursor-pointer"
                  >
                    {isEn ? 'Close' : 'Cerrar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
