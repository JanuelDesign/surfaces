export type CategoryId =
  | 'spc-vinyl'
  | 'stair-steps'
  | 'moldings'
  | 'baseboards';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  tagline: string;
  iconName: string;
  description: string;
}

export interface ProductColor {
  id?: string;
  name: string;
  code?: string;
  hexColor: string;
  secondaryHex?: string;
  patternType?: 'wood' | 'marble' | 'stone' | 'slat' | 'solid';
  image?: string;
  roomImage?: string;
  finish?: 'Satin' | 'Glossy' | 'Matte' | 'Satin & Glossy' | 'Glossy & Matte' | 'All Finishes' | string;
}

export interface ProductSpecs {
  wearLayer?: string;
  totalThickness?: string;
  rigidCore?: string;
  padding?: string;
  planksPerBox?: number | string;
  plankSize?: string;
  installation?: string;
  sqftPerBox?: number | string;
  finished?: string;
  classGrade?: string;
  abrasionResistance?: string;
  edge?: string;
  warrantyResidential?: string;
  warrantyCommercial?: string;
  material?: string;
  height?: string;
  thickness?: string;
  length?: string;
  origin?: string;
  compatibleWith?: string;
  features?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  collection: string;
  subtitle: string;
  description: string;
  specs: ProductSpecs;
  colors: ProductColor[];
  handSamplesAvailable: boolean;
  featured?: boolean;
  coverImage?: string;
  technicalDiagram?: 'spc-layers' | 'ultra-layers' | 'laminate-layers' | 'molding-profile' | 'step-profile' | 'wpc-slat' | 'baseboard-profiles';
  certifications?: string[];
  recommendedUse?: string[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  collectionName: string;
  categoryName: string;
  selectedColor: ProductColor;
  itemType: 'order' | 'sample';
  quantity: number;
  unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces' | 'sample_unit';
  estimatedSqft?: number;
  estimatedLinearFt?: number;
  notes?: string;
}

export interface ClientOrderInfo {
  fullName: string;
  companyOrRole: string;
  phone: string;
  email: string;
  projectCity: string;
  projectAddress: string;
  needsInstallation: boolean;
  projectType: string;
  deliveryTimeframe: string;
  additionalNotes: string;
}
