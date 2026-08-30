import React from 'react';
import {
  Layers,
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
      return <LayoutGrid size={13} />;
    case 'spc-vinyl':
      return <Layers size={13} />;
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
    <div className="w-full bg-white border-b border-[#D9D9D9] sticky top-[60px] z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Horizontal Smooth Scroll Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {/* All Categories button */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0B0B0B] text-white shadow-xs'
                : 'bg-[#F5F5F5] text-[#6B6762] hover:text-[#0B0B0B] hover:bg-[#E5E5E5] border border-[#D9D9D9]'
            }`}
          >
            {getCategoryIcon('all')}
            <span>{t('filters.allCategories')}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                selectedCategory === 'all' ? 'bg-white text-[#0B0B0B]' : 'bg-[#D9D9D9] text-[#0B0B0B]'
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B0B0B] text-white shadow-xs'
                    : 'bg-white text-[#6B6762] hover:text-[#0B0B0B] hover:bg-[#F5F5F5] border border-[#D9D9D9]'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.shortName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F5F5F5] text-[#6B6762]'
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

