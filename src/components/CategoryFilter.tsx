import React from 'react';
import {
  Layers,
  ShieldCheck,
  Maximize2,
  Grid,
  Sparkles,
  Columns,
  Footprints,
  Sliders,
  Square,
  LayoutGrid,
  ChevronDown,
} from 'lucide-react';
import { CategoryId } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedCategories } from '../i18n/localizedData';

interface Props {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

const getCategoryIcon = (id: CategoryId | 'all') => {
  switch (id) {
    case 'all':
      return <LayoutGrid size={13} />;
    case 'spc-vinyl':
      return <Layers size={13} />;
    case 'ultra-mineral':
      return <ShieldCheck size={13} />;
    case 'laminate':
      return <Maximize2 size={13} />;
    case 'wood-herringbone':
      return <Grid size={13} />;
    case 'porcelain-tiles':
      return <Sparkles size={13} />;
    case 'wall-panels':
      return <Columns size={13} />;
    case 'stair-steps':
      return <Footprints size={13} />;
    case 'moldings':
      return <Sliders size={13} />;
    case 'baseboards':
      return <Square size={13} />;
    default:
      return <Layers size={13} />;
  }
};

export const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  totalCount,
}) => {
  const { language, t } = useLanguage();
  const categories = getLocalizedCategories(language);

  return (
    <div className="w-full bg-white border-b border-[#93b2f8]/30 sticky top-[58px] sm:top-[58px] z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        {/* Horizontal Smooth Scroll Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          {/* All Categories button */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0a1680] text-white shadow-xs'
                : 'bg-slate-100/70 text-slate-700 hover:text-[#0a1680] hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {getCategoryIcon('all')}
            <span>{t('filters.allCategories')}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                selectedCategory === 'all' ? 'bg-[#f1b94c] text-[#0a1680]' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {/* Category buttons */}
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0a1680] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-[#0a1680] hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.shortName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-[#93b2f8]/30 text-[#fbedb0]' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
