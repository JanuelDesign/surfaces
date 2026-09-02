import React, { useState } from 'react';
import { FileText, Download, ExternalLink, X, Printer, Eye } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface GuideItem {
  id: 'installation' | 'maintenance' | 'warranty';
  titleEn: string;
  titleEs: string;
  subtitleEn: string;
  subtitleEs: string;
  pdfRawUrl: string;
  githubUrl: string;
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
    pdfRawUrl: 'https://raw.githubusercontent.com/JanuelDesign/quicksurfacesplanks/main/public/guides/installation-guide.pdf',
    githubUrl: 'https://github.com/JanuelDesign/quicksurfacesplanks/blob/main/public/guides/installation-guide.pdf',
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
    pdfRawUrl: 'https://raw.githubusercontent.com/JanuelDesign/quicksurfacesplanks/main/public/guides/maintenance-guide.pdf',
    githubUrl: 'https://github.com/JanuelDesign/quicksurfacesplanks/blob/main/public/guides/maintenance-guide.pdf',
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
    pdfRawUrl: 'https://raw.githubusercontent.com/JanuelDesign/quicksurfacesplanks/main/public/guides/warranty-guide.pdf',
    githubUrl: 'https://github.com/JanuelDesign/quicksurfacesplanks/blob/main/public/guides/warranty-guide.pdf',
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

  const handleOpenViewer = (guide: GuideItem) => {
    setActiveModalGuide(guide);
  };

  const handleDownloadDirect = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
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
          {GUIDES_DATA.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              {/* PDF Sheet Icon */}
              <div
                onClick={() => handleOpenViewer(guide)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#0B0B0B] mb-5 group-hover:bg-[#ECECEC] group-hover:scale-105 transition-all cursor-pointer"
                title={isEn ? 'Click to preview PDF' : 'Clic para visualizar PDF'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-[#0B0B0B]">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#0B0B0B] mb-1.5">
                {isEn ? guide.titleEn : guide.titleEs}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#4B5563] mb-6">
                {isEn ? guide.subtitleEn : guide.subtitleEs}
              </p>

              {/* Action Buttons */}
              <div className="w-full mt-auto pt-2 space-y-2">
                <button
                  onClick={() => handleOpenViewer(guide)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <Eye size={15} />
                  <span>{isEn ? 'VIEW PDF' : 'VISUALIZAR PDF'}</span>
                </button>

                <a
                  href={guide.pdfRawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  onClick={(e) => handleDownloadDirect(e, guide.pdfRawUrl)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#0B0B0B] border border-[#D9D9D9] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>{isEn ? 'DOWNLOAD PDF' : 'DESCARGAR PDF'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded PDF Viewer Modal */}
      {activeModalGuide && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150"
          onClick={() => setActiveModalGuide(null)}
        >
          <div
            className="bg-white w-full max-w-5xl h-[92vh] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D9D9D9] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Actions Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#D9D9D9] bg-[#F5F5F5] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] text-white flex items-center justify-center font-bold">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#0B0B0B] truncate max-w-[200px] sm:max-w-md">
                    {isEn ? activeModalGuide.titleEn : activeModalGuide.titleEs}
                  </h3>
                  <p className="text-[11px] text-[#6B6762] font-medium hidden sm:block">
                    {isEn ? activeModalGuide.subtitleEn : activeModalGuide.subtitleEs} • QuickSurfaces PDF Viewer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Download Button */}
                <a
                  href={activeModalGuide.pdfRawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  title={isEn ? 'Download PDF File' : 'Descargar archivo PDF'}
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">{isEn ? 'Download' : 'Descargar'}</span>
                </a>

                {/* Open in new tab */}
                <a
                  href={activeModalGuide.pdfRawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white hover:bg-[#EBEBEB] text-[#0B0B0B] border border-[#D9D9D9] text-xs font-bold transition cursor-pointer"
                  title={isEn ? 'Open raw PDF in new tab' : 'Abrir PDF en pestaña nueva'}
                >
                  <ExternalLink size={15} />
                </a>

                {/* Close */}
                <button
                  onClick={() => setActiveModalGuide(null)}
                  className="p-2 rounded-xl hover:bg-black/10 text-[#0B0B0B] transition cursor-pointer ml-1"
                  title={isEn ? 'Close' : 'Cerrar'}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF View with fallback */}
            <div className="flex-1 w-full bg-[#525659] relative overflow-hidden flex flex-col">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(activeModalGuide.pdfRawUrl)}&embedded=true`}
                title={isEn ? activeModalGuide.titleEn : activeModalGuide.titleEs}
                className="w-full h-full border-0"
              />

              {/* Bottom Quick Bar fallback if blocked */}
              <div className="bg-[#1E1E1E] text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-white/10 shrink-0">
                <span className="text-[#BCBAB4] text-[11px] truncate mr-2">
                  {isEn
                    ? 'Viewing official PDF document. If preview does not load, use the direct download button.'
                    : 'Visualizando documento PDF oficial. Si la vista previa no carga, usa el botón de descarga directa.'}
                </span>
                <a
                  href={activeModalGuide.pdfRawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-bold shrink-0 flex items-center gap-1"
                >
                  <span>{isEn ? 'Direct link' : 'Enlace directo'}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

