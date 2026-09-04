import React from 'react';
import { Eye, Sparkles, ExternalLink, ShieldCheck, Layers, FileText } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ROOMVO_VISUALIZER_URL } from '../utils/constants';

interface Props {
  onOpenOrderDrawer: () => void;
  onSelectCategory?: (category: string) => void;
  onOpenVisualizer?: () => void;
  onNavigateToGuides?: () => void;
}

export const HeroSection: React.FC<Props> = ({
  onOpenOrderDrawer,
  onNavigateToGuides,
}) => {
  const { t, language } = useLanguage();

  return (
    <section className="w-full bg-[#0B0B0B] text-white py-8 sm:py-12 lg:py-14 border-b border-[#262626] relative overflow-hidden">
      {/* Subtle geometric background glows */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#262626]/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-80 h-80 rounded-full border border-white/5 pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text and Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0B0B0B] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <Sparkles size={13} />
                <span>{t('hero.badgeOfficial')}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {language === 'en' ? (
                <>
                  Architectural Flooring &amp; <span className="text-[#BCBAB4]">Precision Millwork</span>
                </>
              ) : (
                <>
                  Pisos Arquitectónicos y <span className="text-[#BCBAB4]">Molduras de Precisión</span>
                </>
              )}
            </h1>

            <p className="text-[#BCBAB4] text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-normal">
              {language === 'en' ? (
                <>
                  Direct manufacturer catalog for <strong className="text-white">SPC Rigid Core Flooring</strong> (5.5 mm, 6.0 mm, 8.0 mm), <strong className="text-white">Stair Steps &amp; Tread Systems</strong>, architectural <strong className="text-white">Moldings</strong>, and primed <strong className="text-white">Baseboards</strong>.
                </>
              ) : (
                <>
                  Catálogo directo de fabricante para <strong className="text-white">Pisos SPC Rigid Core</strong> (5.5 mm, 6.0 mm, 8.0 mm), sistemas de <strong className="text-white">Gradas y Peldaños</strong>, <strong className="text-white">Molduras</strong> arquitectónicas y <strong className="text-white">Zócalos / Rodapiés</strong>.
                </>
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={ROOMVO_VISUALIZER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] text-xs font-bold uppercase tracking-wider shadow-sm transition transform hover:scale-102 cursor-pointer"
              >
                <Eye size={15} />
                <span>{t('hero.btnVisualizer')}</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
              <button
                onClick={() => {
                  if (onNavigateToGuides) {
                    onNavigateToGuides();
                  } else {
                    const el = document.getElementById('guides-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/50 hover:bg-black text-[#FF7A00] hover:text-[#FFA14A] text-xs font-bold uppercase tracking-wider border border-[#FF7A00]/40 transition cursor-pointer"
              >
                <FileText size={15} />
                <span>{language === 'en' ? 'PDF Guides' : 'Guías PDF'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Floating Planks & Rigid Core Architectural Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center relative select-none">
            <div className="relative w-full max-w-md h-64 sm:h-72">
              <svg viewBox="0 0 450 320" className="w-full h-full drop-shadow-2xl overflow-visible">
                <defs>
                  {/* Wood Plank 1 Gradient */}
                  <linearGradient id="plankOakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d8c5a4" />
                    <stop offset="50%" stopColor="#c2ad89" />
                    <stop offset="100%" stopColor="#9a815a" />
                  </linearGradient>

                  {/* Wood Plank 2 Gradient */}
                  <linearGradient id="plankGreyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a3a8ad" />
                    <stop offset="50%" stopColor="#81868c" />
                    <stop offset="100%" stopColor="#5f6368" />
                  </linearGradient>

                  {/* Wood Plank 3 Gradient (Warm Walnut) */}
                  <linearGradient id="plankWalnutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e4d5bc" />
                    <stop offset="50%" stopColor="#cbb692" />
                    <stop offset="100%" stopColor="#ad936a" />
                  </linearGradient>

                  {/* Core Edge Gradient */}
                  <linearGradient id="coreEdgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#303030" />
                    <stop offset="100%" stopColor="#141414" />
                  </linearGradient>

                  {/* EVA Pad Blue Edge */}
                  <linearGradient id="evaPadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>

                {/* Ambient Floor Shadow */}
                <ellipse cx="230" cy="275" rx="160" ry="25" fill="#000000" opacity="0.6" filter="blur(10px)" />

                {/* --- PLANK 3 (Bottom Layer, Warm Tone) --- */}
                <g transform="translate(10, 45)">
                  {/* Underlay Pad */}
                  <polygon points="120,200 320,110 320,118 120,208" fill="url(#evaPadGrad)" />
                  <polygon points="50,165 120,200 120,208 50,173" fill="#1e40af" />
                  {/* Rigid Core Body */}
                  <polygon points="120,192 320,102 320,110 120,200" fill="url(#coreEdgeGrad)" />
                  <polygon points="50,157 120,192 120,200 50,165" fill="#202020" />
                  {/* Plank Top Surface */}
                  <polygon points="120,192 320,102 250,67 50,157" fill="url(#plankWalnutGrad)" />
                  {/* Subtle Wood Texture Grain Lines */}
                  <path d="M 90,140 Q 180,95 270,80" stroke="#8a7350" strokeWidth="1" opacity="0.4" fill="none" />
                  <path d="M 75,148 Q 170,105 290,88" stroke="#8a7350" strokeWidth="1" opacity="0.3" fill="none" />
                </g>

                {/* --- PLANK 2 (Middle Layer, Modern Grey Tone) --- */}
                <g transform="translate(60, 15)">
                  {/* Rigid Core Body */}
                  <polygon points="120,172 320,82 320,90 120,180" fill="url(#coreEdgeGrad)" />
                  <polygon points="50,137 120,172 120,180 50,145" fill="#202020" />
                  {/* Top Surface */}
                  <polygon points="120,172 320,82 250,47 50,137" fill="url(#plankGreyGrad)" />
                  {/* Texture Grain Lines */}
                  <path d="M 90,120 Q 180,75 270,60" stroke="#45484c" strokeWidth="1" opacity="0.5" fill="none" />
                  <path d="M 70,130 Q 160,85 285,68" stroke="#45484c" strokeWidth="1" opacity="0.4" fill="none" />
                </g>

                {/* --- PLANK 1 (Top Floating Plank, Natural Select Oak) --- */}
                <g transform="translate(100, -15)">
                  {/* Drop Shadow from Top Plank */}
                  <polygon points="120,157 320,67 250,32 50,122" fill="#000000" opacity="0.35" filter="blur(4px)" transform="translate(-10, 20)" />
                  {/* Underlay Pad */}
                  <polygon points="120,152 320,62 320,168 120,158" fill="url(#evaPadGrad)" opacity="0" />
                  {/* Core Edge */}
                  <polygon points="120,148 320,58 320,66 120,156" fill="url(#coreEdgeGrad)" />
                  <polygon points="50,113 120,148 120,156 50,121" fill="#202020" />
                  {/* Top Surface */}
                  <polygon points="120,148 320,58 250,23 50,113" fill="url(#plankOakGrad)" />
                  {/* Grain Lines */}
                  <path d="M 85,100 Q 175,55 265,40" stroke="#7e6540" strokeWidth="1.2" opacity="0.45" fill="none" />
                  <path d="M 70,108 Q 160,63 285,48" stroke="#7e6540" strokeWidth="1.2" opacity="0.35" fill="none" />
                  <circle cx="160" cy="75" r="4" fill="#7e6540" opacity="0.4" />
                </g>

                {/* Floating Spec Badges in 3D Space */}
                <g transform="translate(20, 20)">
                  <rect x="0" y="0" width="115" height="42" rx="10" fill="#181818" fillOpacity="0.9" stroke="#333333" strokeWidth="1" />
                  <text x="12" y="18" fill="#FFFFFF" fontSize="10" fontWeight="bold">SPC RIGID CORE</text>
                  <text x="12" y="32" fill="#3b82f6" fontSize="9" fontWeight="bold">20 &amp; 22 MIL WEAR</text>
                </g>

                <g transform="translate(270, 215)">
                  <rect x="0" y="0" width="125" height="42" rx="10" fill="#181818" fillOpacity="0.9" stroke="#333333" strokeWidth="1" />
                  <text x="12" y="18" fill="#FFFFFF" fontSize="10" fontWeight="bold">100% WATERPROOF</text>
                  <text x="12" y="32" fill="#10b981" fontSize="9" fontWeight="bold">HD EVA ACOUSTIC PAD</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

