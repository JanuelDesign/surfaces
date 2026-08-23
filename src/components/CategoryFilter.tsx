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
      return <LayoutGrid size={14} />;
    case 'spc-vinyl':
      return <Layers size={14} />;
    case 'ultra-mineral':
      return <ShieldCheck size={14} />;
    case 'laminate':
      return <Maximize2 size={14} />;
    case 'wood-herringbone':
      return <Grid size={14} />;
    case 'porcelain-tiles':
      return <Sparkles size={14} />;
    case 'wall-panels':
      return <Columns size={14} />;
    case 'stair-steps':
      return <Footprints size={14} />;
    case 'moldings':
      return <Sliders size={14} />;
    case 'baseboards':
      return <Square size={14} />;
    default:
      return <Layers size={14} />;
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
    <div className="w-full bg-white border-b border-[#93b2f8]/30 sticky top-[70px] z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {/* All Categories button */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0a1680] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#0a1680] hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {getCategoryIcon('all')}
            <span>{t('filters.allCategories')}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                selectedCategory === 'all' ? 'bg-[#f1b94c] text-[#0a1680]' : 'bg-slate-100 text-slate-700'
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0a1680] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#0a1680] hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.shortName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
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
