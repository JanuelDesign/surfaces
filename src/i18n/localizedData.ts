import { Category, Product, CategoryId, ProductSpecs } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { Language } from './translations';

export const LOCALIZED_CATEGORIES: Record<Language, Category[]> = {
  en: [
    {
      id: 'spc-vinyl',
      name: 'SPC Vinyl Waterproof Flooring',
      shortName: 'SPC Vinyl',
      tagline: 'Waterproof Rigid Core Vinyl Flooring',
      iconName: 'Layers',
      description: '100% waterproof rigid core flooring with integrated HD EVA acoustic pad and Satin finish.',
    },
    {
      id: 'stair-steps',
      name: 'Stair Steps & Treads',
      shortName: 'Stair Steps',
      tagline: 'Double Rounded & Square Step Stair Treads',
      iconName: 'Footprints',
      description: 'Continuous Full Steps and Regular Steps with Square Step and Double Rounded profiles matching SPC and Laminate.',
    },
    {
      id: 'moldings',
      name: 'Moldings & Transitions',
      shortName: 'Moldings',
      tagline: 'Infinite Design Possibilities with Moldings',
      iconName: 'Sliders',
      description: 'T-Molding, Reducer, End Cap and CM profiles for smooth transitions and professional finishes.',
    },
    {
      id: 'baseboards',
      name: 'Baseboards & Trims',
      shortName: 'Baseboards',
      tagline: 'Elegance in Every Detail Baseboards',
      iconName: 'Square',
      description: 'BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620 in Primed Pine, Waterproof EPS Quarter Round, and MDF.',
    },
  ],
  es: CATEGORIES,
};

interface ProductTranslation {
  name?: string;
  subtitle?: string;
  description?: string;
  specs?: Partial<ProductSpecs>;
  recommendedUse?: string[];
}

const PRODUCT_TRANSLATIONS_EN: Record<string, ProductTranslation> = {
  // SPC Flooring
  'spc-pulse-select': {
    name: 'SPC 5.5 mm',
    subtitle: 'Waterproof Rigid Core SPC Vinyl Flooring (5.5 mm - 20 Mil)',
    description:
      'High-performance waterproof rigid core vinyl flooring with 20 Mil wear layer and rapid Click Angle-Angle locking system.',
    specs: {
      warrantyResidential: '30 Years Heavy Residential',
      warrantyCommercial: '10 Years Heavy Commercial',
      installation: 'Click Angle-Angle',
      finished: 'Satin Real Wood Feel',
      features: ['100% Waterproof', 'Pet Friendly', 'Scratch Resistant', 'FloorScore Certified', 'High Density Core'],
    },
    recommendedUse: ['Living Rooms', 'Dining Rooms', 'Kitchens', 'Offices', 'Bedrooms', 'Commercial Spaces'],
  },
  'spc-pulse-shield-xl': {
    name: 'SPC 6.0 mm',
    subtitle: 'Waterproof Rigid Core SPC Vinyl Flooring (6.0 mm - Extra Large 9"x60")',
    description:
      'Extra wide and long 9"x60" format with 6.0 mm thickness and 20 Mil protective wear layer to create visually spacious interiors.',
    specs: {
      warrantyResidential: '30 Years Heavy Residential',
      warrantyCommercial: '10 Years Heavy Commercial',
      installation: 'Click Angle-Angle',
      features: ['XL Extra-Wide Format', '100% Waterproof', 'Pet Friendly', 'Scratch Resistant'],
    },
    recommendedUse: ['Hospitality', 'Luxury Residences', 'Open Concept Living', 'Commercial Boutiques'],
  },
  'spc-xl-pulse': {
    name: 'SPC 8.0 mm',
    subtitle: 'Waterproof Rigid Core SPC Vinyl Flooring (8.0 mm - 22 Mil Premium)',
    description:
      'The pinnacle of vinyl robustness: 8.0 mm total thickness with 2 mm HD EVA acoustic pad and 22 Mil wear layer for demanding applications.',
    specs: {
      wearLayer: '22 Mil (Ultra Heavy Commercial)',
      warrantyResidential: '30 Years Heavy Residential',
      warrantyCommercial: '15 Years Heavy Commercial',
      features: ['22 Mil Wear Layer', 'Superior Acoustic Insulation 2mm EVA', 'Stain Resistant', 'Real Wood Texture'],
    },
    recommendedUse: ['High-Traffic Zones', 'Multi-Family Buildings', 'Premium Residences', 'Boutique Retail'],
  },

  // Unified Stair Steps & Treads
  'stair-steps-collection': {
    name: 'Stair Steps & Treads',
    subtitle: 'Double Rounded, Square Step, Full Step & Regular Steps (SPC & Laminate)',
    description:
      'High-impact stair nose and tread profiles for SPC and laminate staircases with ergonomic rounded edges and modern 90° square edges. Seamless Full Steps and modular Regular Step systems exact-matching all flooring decors.',
    specs: {
      material: 'SPC Rigid Core & High Density Laminate',
      height: '1-3/4" x 1-1/2" (Double) / 1-3/4" x 1-3/8" (Square)',
      length: '48" / 60" / Custom lengths',
      installation: 'Direct Glue-down & Click Locking with tread & riser',
      finished: 'Satin Anti-Slip Real Touch',
      warrantyResidential: '30 Years Heavy Residential',
      features: [
        'Ergonomic Double Rounded Front Edge',
        'Contemporary 90° Square Edge Step',
        'Monolithic Full Step without joint lines',
        'Modular Regular Step with matching Riser',
        '100% Compatible with all SPC colorways',
      ],
    },
    recommendedUse: ['Interior Staircases', 'Floating Steps', 'Architectural Homes', 'Commercial & Main Stairs'],
  },

  // Unified Moldings & Transitions
  'moldings-collection': {
    name: 'Moldings & Transitions (CM & Standard)',
    subtitle: 'CM T-Molding, CM Reducer, Standard T-Molding, Standard Reducer & End Cap',
    description:
      'Complete transition solutions between equal-height floors, height reducers down to tile or concrete, and perimeter thresholds for sliding doors and fireplaces.',
    specs: {
      material: 'Aluminum / High Density SPC/Laminate Wrapped Core',
      plankSize: '1-3/4” x 3/8” / 1-3/4" x 1/4" (Length: 94")',
      installation: 'Screwed base track or direct construction adhesive',
      finished: 'Satin Match Decors',
      warrantyResidential: '30 Years Heavy Residential',
      features: [
        'CM T-Molding for flush transitions',
        'CM Reducer for smooth sloped transitions',
        'Standard slim T-Molding',
        'Standard multi-purpose Reducer',
        'End Cap / Threshold for sliding doors and masonry',
      ],
    },
    recommendedUse: ['Doorways', 'Room Transitions', 'SPC to Tile Junctions', 'Sliding Doors', 'Large Expansion Spans'],
  },

  // Unified Baseboards & Trims
  'baseboards-collection': {
    name: 'Baseboards & Trims',
    subtitle: 'BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620, Quarter Round EPS & Pine, Square 1x1 MDF',
    description:
      'Comprehensive line of wall baseboards and perimeter trims in white pre-primed finger-joint pine, 100% waterproof EPS polymer, and moisture-resistant MDF for flawless wall finishes.',
    specs: {
      material: 'White Pre-Primed Finger-Joint Pine / EPS Polymer / Hydrophobic MDF',
      totalThickness: '14 mm (9/16") / 18 mm (11/16")',
      plankSize: 'Long 16 ft / 17 ft / 12 ft / 8 ft strips',
      installation: 'Brad nailer & Construction adhesive',
      finished: 'Smooth Pre-Primed White Ready to Install',
      warrantyResidential: '30 Years Heavy Residential',
      features: [
        'High-stability white primed finger-joint pine',
        'Extra long 16ft and 17ft strips for minimal wall seams',
        '100% Waterproof EPS Quarter Round for wet areas',
        'Classic colonial and modern square-edge profiles',
      ],
    },
    recommendedUse: ['Living Rooms', 'Dining Rooms', 'Bedrooms', 'Bathrooms', 'Kitchens', 'All floor types'],
  },
};

export function getLocalizedProducts(language: Language): Product[] {
  if (language === 'es') {
    return PRODUCTS;
  }

  return PRODUCTS.map((prod) => {
    const trans = PRODUCT_TRANSLATIONS_EN[prod.id];
    if (!trans) return prod;

    return {
      ...prod,
      name: trans.name || prod.name,
      subtitle: trans.subtitle || prod.subtitle,
      description: trans.description || prod.description,
      specs: {
        ...prod.specs,
        ...(trans.specs || {}),
      },
      recommendedUse: trans.recommendedUse || prod.recommendedUse,
    };
  });
}

export function getLocalizedCategories(language: Language): Category[] {
  return LOCALIZED_CATEGORIES[language] || CATEGORIES;
}
