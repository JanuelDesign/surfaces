import { Product, ProductColor, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';
import { formatImageUrl } from './imageUrlFormatter';

export const DEFAULT_GOOGLE_SHEET_ID = '1Q0lF-a3jI6OjAwDCVlS_O6OjpEF6ekvGgUtia5dBrSE';
const LOCAL_STORAGE_CUSTOM_SHEET_ID = 'surfaces_custom_google_sheet_id';
const LOCAL_STORAGE_CUSTOM_PRODUCTS = 'surfaces_custom_synced_products_v1';
const LOCAL_STORAGE_LAST_SYNC = 'surfaces_last_sheet_sync_time';

export function getGoogleSheetId(): string {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_SHEET_ID);
    if (saved && saved.trim().length > 5) {
      return saved.trim();
    }
  } catch (e) {
    // ignore
  }
  return DEFAULT_GOOGLE_SHEET_ID;
}

export function setGoogleSheetId(idOrUrl: string): string {
  let cleanedId = idOrUrl.trim();
  const match = cleanedId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    cleanedId = match[1];
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_SHEET_ID, cleanedId);
  } catch (e) {
    // ignore
  }
  return cleanedId;
}

export function getGoogleSheetUrl(): string {
  const id = getGoogleSheetId();
  return `https://docs.google.com/spreadsheets/d/${id}/edit?usp=sharing`;
}

export function getGoogleSheetCsvUrl(sheetName?: string): string {
  const id = getGoogleSheetId();
  if (sheetName) {
    return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  }
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv`;
}

export const GOOGLE_SHEET_ID = DEFAULT_GOOGLE_SHEET_ID;
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_GOOGLE_SHEET_ID}/edit?usp=sharing`;
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;

export interface SyncStatus {
  lastSyncTime: string | null;
  isSynced: boolean;
  itemCount: number;
  error?: string;
}

// Get current products (either synced from Google Sheets or default catalog)
export function getStoredProducts(): Product[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_PRODUCTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure default accessory collections (stair steps, moldings, baseboards) are merged if missing
        const missingDefaults = PRODUCTS.filter(
          (dp) =>
            ['stair-steps', 'moldings', 'baseboards'].includes(dp.category) &&
            !parsed.some((p: Product) => p.id === dp.id || p.category === dp.category)
        );
        return [...parsed, ...missingDefaults];
      }
    }
  } catch (e) {
    console.error('Error reading custom products from localStorage', e);
  }
  return PRODUCTS;
}

export const KNOWN_SHEET_TABS = [
  'Baseboards',
  'Moldings',
  'Stair_Steps',
  'Steps',
  'SPC_Flooring',
  'Molduras',
  'Gradas',
  'Zocalos',
];

// Normalize and consolidate accessory category / id
function normalizeProductCategoryAndId(rawId: string, rawCategory: string, rawName: string): {
  normalizedId: string;
  normalizedCategory: CategoryId;
  isAccessory: boolean;
} {
  const combined = `${rawId} ${rawCategory} ${rawName}`.toLowerCase();

  if (combined.includes('baseboard') || combined.includes('zocalo') || combined.includes('rodapie') || combined.includes('bb1x')) {
    return { normalizedId: 'baseboards-collection', normalizedCategory: 'baseboards', isAccessory: true };
  }
  if (combined.includes('molding') || combined.includes('moldura') || combined.includes('reducer') || combined.includes('t-molding') || combined.includes('endcap') || combined.includes('transicion')) {
    return { normalizedId: 'moldings-collection', normalizedCategory: 'moldings', isAccessory: true };
  }
  if (combined.includes('step') || combined.includes('stair') || combined.includes('grada') || combined.includes('peldaño') || combined.includes('tread')) {
    return { normalizedId: 'stair-steps-collection', normalizedCategory: 'stair-steps', isAccessory: true };
  }

  // SPC vinyl flooring identification
  if (combined.includes('5.5') || rawId.includes('5.5')) {
    return { normalizedId: 'spc-5.5mm', normalizedCategory: 'spc-vinyl', isAccessory: false };
  }
  if (combined.includes('6.0') || combined.includes('6mm') || rawId.includes('6.0') || rawId.includes('6mm')) {
    return { normalizedId: 'spc-6.0mm', normalizedCategory: 'spc-vinyl', isAccessory: false };
  }
  if (combined.includes('8.0') || combined.includes('8mm') || rawId.includes('8.0') || rawId.includes('8mm')) {
    return { normalizedId: 'spc-8.0mm', normalizedCategory: 'spc-vinyl', isAccessory: false };
  }

  const category = (rawCategory || 'spc-vinyl') as CategoryId;
  return { normalizedId: rawId, normalizedCategory: category, isAccessory: false };
}

// Parse CSV text from Google Sheet into Product objects
export function parseGoogleSheetCSV(csvText: string, existingProductsMap?: Map<string, Product>): Product[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return PRODUCTS;

  // CSV parser supporting quoted text with commas
  const parseRow = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"(.*)"$/, '$1'));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim().replace(/^"(.*)"$/, '$1'));
    return values;
  };

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase().trim().replace(/\s+/g, '_'));

  // Initialize product map with either existing or default products
  const productMap = existingProductsMap || new Map<string, Product>();

  // Ensure default base items from PRODUCTS are pre-populated
  PRODUCTS.forEach((p) => {
    if (!productMap.has(p.id)) {
      productMap.set(p.id, JSON.parse(JSON.stringify(p)));
    }
  });

  for (let i = 1; i < lines.length; i++) {
    const row = parseRow(lines[i]);
    if (row.length < 2) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = row[idx] || '';
    });

    const rawId = (rowObj['id'] || rowObj['product_id'] || '').trim();
    const rawCategory = (rowObj['category'] || rowObj['categoria'] || '').trim();
    const rawName = (rowObj['name'] || rowObj['product_name'] || '').trim();

    if (!rawId && !rawName) continue;

    const { normalizedId, normalizedCategory, isAccessory } = normalizeProductCategoryAndId(rawId, rawCategory, rawName);

    const collection = rowObj['collection'] || rowObj['coleccion'] || rawName;
    const subtitle = rowObj['subtitle'] || rowObj['subtitulo'] || rowObj['description_short'] || '';
    const description = rowObj['description'] || rowObj['descripcion'] || '';

    const singleColorCode = rowObj['color_code'] || rowObj['codigo_color'] || rowObj['color'] || '';
    const singleColorHex = rowObj['color_hex'] || rowObj['hex'] || rowObj['color_hexadecimal'] || '#FFFFFF';
    const singlePlankPhoto = formatImageUrl(rowObj['plank_photo_url'] || rowObj['photo_url'] || rowObj['foto_tabla'] || rowObj['foto'] || rowObj['image_url'] || rowObj['image'] || '');
    const singleRoomPhoto = formatImageUrl(rowObj['room_photo_url'] || rowObj['room_image_url'] || rowObj['foto_ambiente'] || rowObj['room_photo'] || '');

    const specs = {
      wearLayer: rowObj['wear_layer'] || rowObj['capa_uso'] || '20 Mil',
      totalThickness: rowObj['thickness'] || rowObj['espesor'] || '5.5 mm',
      sqftPerBox: parseFloat(rowObj['sqft_box'] || rowObj['sqft_por_caja'] || '24.26') || 24.26,
      planksPerBox: parseInt(rowObj['planks_box'] || rowObj['tablas_por_caja'] || '9') || 9,
      plankSize: rowObj['plank_size'] || rowObj['medida'] || '7" x 48"',
      installation: rowObj['installation'] || rowObj['instalacion'] || 'Click Angle-Angle',
      finished: rowObj['finished'] || rowObj['acabado'] || 'Satin',
      warrantyResidential: rowObj['warranty'] || rowObj['garantia_residencial'] || '30 Years Residential',
    };

    if (!productMap.has(normalizedId)) {
      productMap.set(normalizedId, {
        id: normalizedId,
        name: rawName || normalizedId,
        collection: collection || rawName,
        category: normalizedCategory,
        subtitle,
        description,
        specs,
        colors: [],
        handSamplesAvailable: true,
        featured: true,
        technicalDiagram: isAccessory ? 'molding-profile' : 'spc-layers',
      });
    }

    const prodEntry = productMap.get(normalizedId)!;

    // Handle Accessory row consolidation
    if (isAccessory) {
      const optionName = rawName || singleColorCode || `Option ${prodEntry.colors.length + 1}`;
      const optionCode = singleColorCode || rawId || optionName;

      // Match existing model/option by code, name, or substring
      const existingIdx = prodEntry.colors.findIndex(
        (c) =>
          c.code.toLowerCase() === optionCode.toLowerCase() ||
          c.name.toLowerCase() === optionName.toLowerCase() ||
          (rawId && c.code.toLowerCase().includes(rawId.replace(/baseboards-|moldings-|stair-steps-/g, '').toLowerCase()))
      );

      if (existingIdx >= 0) {
        // Update photo and hex if provided
        if (singlePlankPhoto) prodEntry.colors[existingIdx].image = singlePlankPhoto;
        if (singleRoomPhoto) prodEntry.colors[existingIdx].roomImage = singleRoomPhoto;
        if (singleColorHex && singleColorHex !== '#FFFFFF') {
          prodEntry.colors[existingIdx].hexColor = singleColorHex.startsWith('#') ? singleColorHex : `#${singleColorHex}`;
        }
      } else {
        // Add new model/variation option to this consolidated accessory card
        prodEntry.colors.push({
          name: optionName,
          code: optionCode,
          hexColor: singleColorHex.startsWith('#') ? singleColorHex : `#${singleColorHex}`,
          patternType: normalizedCategory === 'baseboards' ? 'solid' : 'wood',
          image: singlePlankPhoto || undefined,
          roomImage: singleRoomPhoto || undefined,
        });
      }
    } else {
      // SPC Flooring row handling
      if (singleColorCode) {
        const existingColorIdx = prodEntry.colors.findIndex(
          (c) => c.code.toLowerCase() === singleColorCode.toLowerCase() || c.name.toLowerCase() === singleColorCode.toLowerCase()
        );
        if (existingColorIdx >= 0) {
          if (singlePlankPhoto) prodEntry.colors[existingColorIdx].image = singlePlankPhoto;
          if (singleRoomPhoto) prodEntry.colors[existingColorIdx].roomImage = singleRoomPhoto;
          if (singleColorHex) prodEntry.colors[existingColorIdx].hexColor = singleColorHex.startsWith('#') ? singleColorHex : `#${singleColorHex}`;
        } else {
          prodEntry.colors.push({
            name: singleColorCode,
            code: singleColorCode,
            hexColor: singleColorHex.startsWith('#') ? singleColorHex : `#${singleColorHex}`,
            patternType: 'wood',
            image: singlePlankPhoto || undefined,
            roomImage: singleRoomPhoto || undefined,
          });
        }
      } else {
        // Multiple colors comma list pattern
        const colorImagesRaw = rowObj['color_images'] || rowObj['fotos_colores'] || '';
        const colorImagesMap: Record<string, string> = {};
        if (colorImagesRaw) {
          colorImagesRaw.split(',').forEach((item, idx) => {
            const parts = item.split(':').map((s) => s.trim());
            if (parts.length >= 2) {
              colorImagesMap[parts[0]] = formatImageUrl(parts.slice(1).join(':'));
            } else if (parts.length === 1 && (parts[0].startsWith('http') || parts[0].includes('.'))) {
              colorImagesMap[`0${idx + 1}`] = formatImageUrl(parts[0]);
            }
          });
        }

        const colorsRaw = rowObj['colors'] || rowObj['colores'] || rowObj['codigos_colores'] || '';
        if (colorsRaw) {
          const colorItems: ProductColor[] = colorsRaw.split(',').map((cStr, cIdx) => {
            const parts = cStr.split(':').map((s) => s.trim());
            const rawNameC = parts[0] || `0${cIdx + 1}`;
            let cHex = '#c7b28e';
            let cPhoto: string | undefined = colorImagesMap[rawNameC] || (singlePlankPhoto || undefined);
            let cRoomPhoto: string | undefined = singleRoomPhoto || undefined;

            if (parts[1]) {
              if (parts[1].startsWith('#')) cHex = parts[1];
              else if (parts[1].startsWith('http') || parts[1].includes('.')) cPhoto = formatImageUrl(parts[1]);
            }
            if (parts[2]) {
              if (parts[2].startsWith('#')) cHex = parts[2];
              else if (parts[2].startsWith('http') || parts[2].includes('.')) cPhoto = formatImageUrl(parts[2]);
            }
            if (parts[3] && (parts[3].startsWith('http') || parts[3].includes('.'))) {
              cRoomPhoto = formatImageUrl(parts[3]);
            }

            return {
              name: rawNameC,
              code: rawNameC,
              hexColor: cHex,
              patternType: 'wood',
              image: cPhoto,
              roomImage: cRoomPhoto,
            };
          });

          if (colorItems.length > 0) {
            prodEntry.colors = colorItems;
          }
        }
      }
    }
  }

  return Array.from(productMap.values());
}

// Attempt live fetch from Google Sheet (supports single tab, all known tabs + root tab)
export async function syncFromGoogleSheets(sheetName?: string): Promise<{
  success: boolean;
  count: number;
  syncedTabs?: string[];
  error?: string;
}> {
  try {
    const sheetId = getGoogleSheetId();

    // If a specific sheet tab was requested
    if (sheetName && sheetName !== 'ALL') {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google Sheet tab "${sheetName}" returned status ${response.status}`);
      }
      const csv = await response.text();
      if (csv.includes('<!DOCTYPE html>') || csv.includes('login_counter')) {
        throw new Error('Google Sheet is set to private. Make sure "Anyone with the link can view" (Viewer) or use CSV paste.');
      }
      const products = parseGoogleSheetCSV(csv);
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_PRODUCTS, JSON.stringify(products));
      localStorage.setItem(LOCAL_STORAGE_LAST_SYNC, new Date().toISOString());
      return { success: true, count: products.length, syncedTabs: [sheetName] };
    }

    // Default / ALL: Fetch the root sheet FIRST + also check all known accessory tabs
    const productMap = new Map<string, Product>();
    PRODUCTS.forEach((p) => productMap.set(p.id, JSON.parse(JSON.stringify(p))));

    const syncedTabsList: string[] = [];

    // 1. Fetch root sheet (default tab)
    try {
      const rootUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
      const rootRes = await fetch(rootUrl);
      if (rootRes.ok) {
        const rootCsv = await rootRes.text();
        if (!rootCsv.includes('<!DOCTYPE html>') && !rootCsv.includes('login_counter') && rootCsv.trim().length > 20) {
          parseGoogleSheetCSV(rootCsv, productMap);
          syncedTabsList.push('Main');
        }
      }
    } catch (e) {
      console.warn('Could not fetch root tab:', e);
    }

    // 2. Fetch specific tabs (Baseboards, Moldings, Stair_Steps, etc.)
    const tabPromises = KNOWN_SHEET_TABS.map(async (tab) => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          if (!text.includes('<!DOCTYPE html>') && !text.includes('login_counter') && text.trim().length > 20) {
            return { tab, csv: text, ok: true };
          }
        }
      } catch (err) {
        // ignore individual tab failure
      }
      return { tab, csv: '', ok: false };
    });

    const tabResults = await Promise.all(tabPromises);
    for (const item of tabResults) {
      if (item.ok && item.csv.length > 20) {
        parseGoogleSheetCSV(item.csv, productMap);
        syncedTabsList.push(item.tab);
      }
    }

    const allProducts = Array.from(productMap.values());

    if (allProducts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_PRODUCTS, JSON.stringify(allProducts));
      localStorage.setItem(LOCAL_STORAGE_LAST_SYNC, new Date().toISOString());
      return {
        success: true,
        count: allProducts.length,
        syncedTabs: syncedTabsList,
      };
    }

    return {
      success: false,
      count: PRODUCTS.length,
      error: 'No products were detected in the Google Sheet.',
    };
  } catch (e: any) {
    return {
      success: false,
      count: PRODUCTS.length,
      error: e.message || 'Could not fetch Google Sheet directly due to Google permissions or network.',
    };
  }
}

export function resetToDefaultCatalog() {
  localStorage.removeItem(LOCAL_STORAGE_CUSTOM_PRODUCTS);
  localStorage.removeItem(LOCAL_STORAGE_LAST_SYNC);
}

export function getCatalogTemplateCSV(): string {
  return `id,name,collection,category,color_code,color_name,color_hex,plank_photo_url,room_photo_url,subtitle,description,wear_layer
baseboard_bb1,Baseboard BB1 1x4 (12 ft),Baseboards,baseboards,BB1-12FT,Baseboard BB1 1x4 (12 ft),#FFFFFF,https://example.com/baseboard1.jpg,,Zócalo de Pino Pre-Primed 12 ft,Zócalo de pino finger-joint pre-sellado con base de pintura al agua.,
molding_cm_tmolding,CM T-Molding,Moldings,moldings,CM-TM-01,CM T-Molding Standard,#c7b28e,https://example.com/tmolding.jpg,https://example.com/tmolding_room.jpg,Moldura de Transición al Mismo Nivel,Diseñada para transiciones niveladas entre pisos.,
step_double_round,Double Rounded Step,Stairs,stair-steps,DR-01,Double Rounded Bullnose Step,#c7b28e,https://example.com/step_dr.jpg,https://example.com/step_dr_room.jpg,Grada con Doble Canto Redondeado,Grada arquitectónica con doble radio superior e inferior.,
spc-5.5mm,SPC 5.5 mm (20 Mil),PULSESelect,spc-vinyl,01,Alabaster Oak,#d5c8b3,https://example.com/alabaster.jpg,https://example.com/alabaster_room.jpg,Colección Residencial Premium 5.5mm,Piso de vinil rígido con base acústica IXPE.,20 Mil`;
}
