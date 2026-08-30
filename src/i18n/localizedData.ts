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
  'ultra-pulse': {
    name: 'UltraPULSE Collection (10 mm)',
    subtitle: 'High-Density Ultra-Mineral Core Flooring (AC5 / 22 Mil - 10 mm)',
    description:
      'Redefines durability and style with high-density ultra-mineral core (8 mm UMC + 2 mm EVA pad). Engineered to withstand the most demanding environments.',
    specs: {
      warrantyResidential: '30 Years Heavy Residential',
      warrantyCommercial: '10 Years Heavy Commercial',
      features: [
        'Ultra Mineral Core 8mm',
        'AC5 Commercial Layer',
        'Pet Friendly',
        'Extreme Scratch Resistance',
        'Superior Dimensional Stability',
      ],
    },
    recommendedUse: ['Hotels', 'Restaurants', 'Grand Lobbies', 'Luxury Residences', 'Medical Centers'],
  },
  'pulse-wood': {
    name: 'PULSEWood Collection',
    subtitle: 'Herringbone Flooring & Random Width Planks (22 Mil / 6 mm)',
    description:
      'Artistic herringbone (5"x27") and random width planks (Random x 48") to create classic and contemporary architectural geometry.',
    specs: {
      warrantyResidential: '30 Years Heavy Residential',
      warrantyCommercial: '10 Years Commercial',
      features: ['Herringbone Geometric Pattern', 'Random Width Options', '22 Mil Wear Layer', 'UV & Anti-Scratch Finish'],
    },
    recommendedUse: ['Main Living Areas', 'Galleries', 'Formal Dining', 'Master Suites', 'Design Studios'],
  },
  'pulse-hd-laminate': {
    name: 'PULSEHD Collection',
    subtitle: 'Waterproof High Density Laminate (AC5 - 7 mm)',
    description:
      'High-density 100% waterproof laminate featuring heavy-duty AC5 certification and integrated 1 mm HD EVA acoustic underlayment.',
    specs: {
      wearLayer: 'AC5 Commercial Resistance',
      warrantyResidential: '30 Years Heavy Residential',
      warrantyCommercial: '10 Years Commercial',
      features: ['Free PVC Black HD Core', 'AC5 Wear Layer', 'Kraft Decor Paper', 'EVA Padding'],
    },
    recommendedUse: ['Homes with Pets', 'Offices', 'Cafes & Restaurants', 'High-Foot-Traffic Hallways'],
  },
  'finsa-laminate-spain': {
    name: 'Finsa Waterproof Laminate',
    subtitle: 'Commercial Intense AC6 / Class 33 (Evolve & Supreme Collections)',
    description:
      'Engineered in Spain with top European technology. AC6 Class 33 rating for intense commercial use (schools, retail stores, open-plan offices).',
    specs: {
      wearLayer: 'AC6 (Highest European Rating)',
      classGrade: 'Class 33 Intense Commercial',
      origin: 'Made in Spain (Europe)',
      finished: 'Natural Woodgrain Texture',
      features: ['AC6 Commercial Intense', 'Made in Spain', 'Certified for Schools & Stores', 'Class 33'],
    },
    recommendedUse: ['Schools & Universities', 'Retail Stores', 'Open Offices', 'High-Traffic Venues', 'Residences'],
  },
  'tile-pulse-porcelain': {
    name: 'TilePULSE Porcelain Floor Tiles',
    subtitle: 'Coloured Porcelain Floor Tiles (24" x 48" Rectified - PEI 3)',
    description:
      'Large-format 24"x48" tiles crafted with Rajasthan clay enriched with Makrana marble dust and pure quartz. Available in Satin, Glossy, and Matte finishes.',
    specs: {
      edge: 'Rectified Precision Edge',
      finished: 'Satin, Glossy & Matte',
      material: 'Porcelain with Makrana Marble Dust & Quartz',
      features: ['Rectified Edge', 'Chemical Resistant', '3 Finishes (Satin/Glossy/Matte)', 'Eco-friendly'],
    },
    recommendedUse: ['Bathrooms & Showers', 'Feature Accent Walls', 'Lobbies', 'Gourmet Kitchens', 'Shopping Centers'],
  },
  'wall-panels-indoor': {
    name: 'Indoor Wall Panels (WPC & Acoustic Slat)',
    subtitle: 'Wood Plastic Composite (WPC) & Wooden Slat Acoustic Panels',
    description:
      'Fluted decorative acoustic wall panels for interior spaces. Elevate living rooms, bed headboards, and executive offices with texture and acoustic absorption.',
    specs: {
      material: 'Wood Plastic Composite (WPC) & Slat Acoustic Wood',
      installation: 'Hidden tongue & groove with clips / Heavy-duty adhesive',
      finished: 'Textured Matte WPC / Natural Wood Veneer',
      features: ['Acoustic Absorption', 'Quick Tongue & Groove Install', 'Moisture Resistant', 'Architectural Modern Design'],
    },
    recommendedUse: ['TV Feature Walls', 'Bed Headboards', 'Audio Studios & Offices', 'Restaurants'],
  },
  'wall-panels-outdoor': {
    name: 'Outdoor Wall Panels (Exterior WPC Composite)',
    subtitle: 'WPC Exterior Composite Panels (8-1/2" x 114" x 26 mm)',
    description:
      'Heavy-duty exterior architectural panels engineered for UV resistance, heavy rain, and weather extremes. Never rots and requires zero painting.',
    specs: {
      material: 'Heavy-Duty Exterior Wood Plastic Composite (26 mm)',
      installation: 'Exterior grooved interlocking system with stainless steel clips',
      finished: 'Anti-UV Woodgrain Shield',
      features: ['Extreme UV & Weather Proof', 'Zero Maintenance', '26 mm Robust Thickness', '100% Waterproof'],
    },
    recommendedUse: ['Building Facades', 'Patios & Terraces', 'Perimeter Accent Walls', 'Main Entrances'],
  },
  'stair-steps-treads': {
    name: 'Stair Steps & Treads',
    subtitle: 'Double Rounded & Square Step Profiles (Full & Regular Steps)',
    description:
      'Precision stair treads manufactured to match all SPC and Laminate floor collections seamlessly. Providing safety, flawless aesthetics, and durability.',
    specs: {
      material: 'SPC Rigid Core & High Density Laminate',
      length: 'Custom Cut Lengths Available',
      installation: 'Direct Glue-Down & Interlocking with Riser',
      features: [
        'Double Rounded Profile (SPC)',
        'Square Step Profile (SPC & Laminate)',
        'Full Steps Configuration (Single continuous tread)',
        'Regular Steps Configuration (With matching filler plank)',
      ],
    },
    recommendedUse: ['Interior Staircases', 'Floating Stairs', 'Stairways with Integrated LED Lighting'],
  },
  'moldings-transitions': {
    name: 'Moldings & Transition Profiles',
    subtitle: 'CM T-Molding, Reducer & End Cap Profiles',
    description:
      'Essential transition moldings to bridge floors of varying heights or different materials, and finish door thresholds with clean lines.',
    specs: {
      material: 'SPC & Laminate Wrapped High Density Aluminum/MDF Core',
      features: [
        'CM T-Molding (1-3/4" x 3/8") - Clean transition between equal level floors',
        'CM Reducer (1-3/4" x 3/8") - Smooth bridge between uneven subfloors',
        'Standard T-Molding (1-3/4" x 1/4") - Standard seamless floor seam',
        'Standard Reducer (1-3/4" x 3/8") - Practical versatile level reducer',
        'End Cap (1-3/8" x 3/8") - Elegant finish against sliding door tracks and carpet',
      ],
    },
    recommendedUse: ['Doorways', 'Floating Floor to Tile Transitions', 'Balcony Sliders', 'Perimeter Terminations'],
  },
  'baseboards-collection': {
    name: 'Baseboards & Trims Collection',
    subtitle: 'Pine Baseboards (BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620) & Waterproof EPS/MDF',
    description:
      'Pre-primed white pine wood baseboards along with 100% waterproof EPS polymer and moisture-resistant MDF trims. Heights from 1 1/2" up to 5 1/2" in 16ft and 17ft lengths.',
    specs: {
      material: 'Pre-Primed Finger-Joint Pine, Waterproof EPS Polymer, and MDF',
      features: [
        'BB1x6 | Pine - Thickness: 14 mm (9/16"), Height: 5 1/2" x 1/2", Length: 16 ft',
        'BB1x6 | Pine - Thickness: 18 mm (11/16"), Height: 5 1/2" x 3/4", Length: 16 ft',
        'BB1x4 | Pine - Thickness: 14 mm (9/16"), Height: 3 1/2" x 1/2", Length: 17 ft',
        'BB1x4 | Pine - Thickness: 18 mm (11/16"), Height: 3 1/2" x 3/4", Length: 17 ft',
        'BB1x3 | Pine - Thickness: 18 mm (11/16"), Height: 1 1/2" x 1/2", Length: 17 ft',
        'BB1x3 | Pine - Thickness: 18 mm (11/16"), Height: 2 1/2" x 3/4", Length: 17 ft',
        'BB5180 | Pine - Thickness: 14 mm (9/16"), Height: 5 1/4" x 9/16", Length: 16 ft',
        'BB618 | Pine - Thickness: 14 mm (9/16"), Height: 5 1/2" x 9/16", Length: 16 ft',
        'BB620 | Pine - Thickness: 18 mm (11/16"), Height: 3 1/4" x 9/16", Length: 16 ft',
        'Quarter Round Pine (MDF 16 ft)',
        'Quarter Round EPS (Waterproof 12 ft)',
        'Square 1x1 MDF (Waterproof 8 ft)',
      ],
    },
    recommendedUse: ['All Flooring Types', 'Perimeter Wall Base Trims', 'Kitchens & Bathrooms (Waterproof EPS)'],
  },
};

export const getLocalizedProducts = (language: Language): Product[] => {
  if (language === 'es') {
    return PRODUCTS;
  }

  return PRODUCTS.map((product) => {
    const translation = PRODUCT_TRANSLATIONS_EN[product.id];
    if (!translation) return product;

    return {
      ...product,
      name: translation.name || product.name,
      subtitle: translation.subtitle || product.subtitle,
      description: translation.description || product.description,
      specs: {
        ...product.specs,
        ...(translation.specs?.wearLayer && { wearLayer: translation.specs.wearLayer }),
        ...(translation.specs?.warrantyResidential && { warrantyResidential: translation.specs.warrantyResidential }),
        ...(translation.specs?.warrantyCommercial && { warrantyCommercial: translation.specs.warrantyCommercial }),
        ...(translation.specs?.installation && { installation: translation.specs.installation }),
        ...(translation.specs?.finished && { finished: translation.specs.finished }),
        ...(translation.specs?.material && { material: translation.specs.material }),
        ...(translation.specs?.features && { features: translation.specs.features }),
      },
      recommendedUse: translation.recommendedUse || product.recommendedUse,
    };
  });
};

export const getLocalizedCategories = (language: Language): Category[] => {
  return LOCALIZED_CATEGORIES[language] || LOCALIZED_CATEGORIES.en;
};
