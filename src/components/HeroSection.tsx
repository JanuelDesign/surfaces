import React from 'react';
import { Eye, Package, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { CategoryId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { ROOMVO_VISUALIZER_URL } from '../utils/constants';

interface Props {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenVisualizer?: () => void;
  onOpenOrderDrawer: () => void;
}

export const HeroSection: React.FC<Props> = ({
  onSelectCategory,
  onOpenVisualizer,
  onOpenOrderDrawer,
}) => {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Bento Tile 1: Main Feature Display (Spans 2 columns on desktop) */}
        <div className="lg:col-span-2 bg-[#0a1680] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#0a1680] relative overflow-hidden group min-h-[300px] shadow-md">
          {/* Background glow effect */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#93b2f8]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#93b2f8]/40 transition duration-500"></div>
          <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full border-[20px] border-white/5 pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1b94c] text-[#0a1680] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <Sparkles size={13} />
                <span>{t('hero.badgeOfficial')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#93b2f8]/20 text-[#fbedb0] text-[11px] font-medium border border-[#93b2f8]/30">
                {t('hero.badgeWaterproof')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-xl text-white">
              {t('hero.title1')} <span className="text-[#f1b94c]">{t('hero.titleHighlight')}</span>
            </h1>

            <p className="text-[#93b2f8] text-xs sm:text-sm max-w-lg leading-relaxed font-normal">
              {language === 'en' ? (
                <>
                  Explore our range of <strong className="text-white">SPC Rigid Core</strong>, <strong className="text-white">Ultra Mineral Core</strong>, European <strong className="text-white">Finsa</strong> laminates, rectified porcelain tiles, and precision stair treads.
                </>
              ) : (
                <>
                  Explora nuestra gama de pisos <strong className="text-white">SPC Rigid Core</strong>, <strong className="text-white">Ultra Mineral Core</strong>, laminados europeos <strong className="text-white">Finsa</strong>, porcelanatos rectificados y gradas de precisión.
                </>
              )}
            </p>
          </div>

          <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
            <a
              href={ROOMVO_VISUALIZER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1b94c] hover:bg-[#e0a83b] text-[#0a1680] text-xs font-bold uppercase tracking-wider shadow-sm transition transform hover:scale-102 cursor-pointer"
            >
              <Eye size={15} />
              <span>{t('hero.btnVisualizer')}</span>
              <ExternalLink size={12} className="opacity-80" />
            </a>
            <button
              onClick={onOpenOrderDrawer}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 transition cursor-pointer"
            >
              <Package size={15} className="text-[#fbedb0]" />
              <span>{t('hero.btnSamples')}</span>
            </button>
          </div>
        </div>

        {/* Bento Tile 2: PULSESelect & XL (SPC Vinyl Tile) */}
        <div
          onClick={() => onSelectCategory('spc-vinyl')}
          className="bg-white rounded-2xl p-5 border border-[#93b2f8]/30 hover:border-[#0a1680] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0a1680] bg-[#93b2f8]/20 px-2 py-0.5 rounded-sm">
                {t('hero.cardSpcBadge')}
              </span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0a1680] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#0a1680] mt-2 group-hover:text-[#081268] transition">
              {t('hero.cardSpcTitle')}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {t('hero.cardSpcDesc')}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">{t('hero.cardSpcUse')}</span>
            <span className="text-[#0a1680] font-bold">{t('hero.viewModels')}</span>
          </div>
        </div>

        {/* Bento Tile 3: Ultra Mineral Core Tile */}
        <div
          onClick={() => onSelectCategory('ultra-mineral')}
          className="bg-white rounded-2xl p-5 border border-[#93b2f8]/30 hover:border-[#0a1680] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0a1680] bg-[#93b2f8]/20 px-2 py-0.5 rounded-sm">
                {t('hero.cardUltraBadge')}
              </span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0a1680] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#0a1680] mt-2 group-hover:text-[#081268] transition">
              {t('hero.cardUltraTitle')}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {t('hero.cardUltraDesc')}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">{t('hero.cardUltraUse')}</span>
            <span className="text-[#0a1680] font-bold">{t('hero.viewModels')}</span>
          </div>
        </div>

        {/* Bento Tile 4: Porcelain Tiles & Porcelanatos */}
        <div
          onClick={() => onSelectCategory('porcelain-tiles')}
          className="bg-white rounded-2xl p-5 border border-[#93b2f8]/30 hover:border-[#0a1680] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0a1680] bg-[#93b2f8]/20 px-2 py-0.5 rounded-sm">
                {t('hero.cardTileBadge')}
              </span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0a1680] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#0a1680] mt-2 group-hover:text-[#081268] transition">
              {t('hero.cardTileTitle')}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {t('hero.cardTileDesc')}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">{t('hero.cardTileUse')}</span>
            <span className="text-[#0a1680] font-bold">{t('hero.viewDesigns')}</span>
          </div>
        </div>

        {/* Bento Tile 5: Wall Panels */}
        <div
          onClick={() => onSelectCategory('wall-panels')}
          className="bg-white rounded-2xl p-5 border border-[#93b2f8]/30 hover:border-[#0a1680] transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0a1680] bg-[#93b2f8]/20 px-2 py-0.5 rounded-sm">
                {t('hero.cardWallBadge')}
              </span>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0a1680] group-hover:translate-x-1 transition" />
            </div>
            <h3 className="text-base font-bold text-[#0a1680] mt-2 group-hover:text-[#081268] transition">
              {t('hero.cardWallTitle')}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {t('hero.cardWallDesc')}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">{t('hero.cardWallUse')}</span>
            <span className="text-[#0a1680] font-bold">{t('hero.viewOptions')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
