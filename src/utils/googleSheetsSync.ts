import { Product, ProductColor, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';

export const GOOGLE_SHEET_ID = '1Q0lF-a3jI6OjAwDCVlS_O6OjpEF6ekvGgUtia5dBrSE';
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit?usp=sharing`;
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;

const LOCAL_STORAGE_CUSTOM_PRODUCTS = 'surfaces_custom_synced_products_v1';
const LOCAL_STORAGE_LAST_SYNC = 'surfaces_last_sheet_sync_time';

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
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom products from localStorage', e);
  }
  return PRODUCTS;
}

// Parse CSV text from Google Sheet into Product objects
export function parseGoogleSheetCSV(csvText: string): Product[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return PRODUCTS;

  // Simple CSV parser supporting quotes
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

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase().trim());
  const parsedProducts: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseRow(lines[i]);
    if (row.length < 2) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = row[idx] || '';
    });

    const id = rowObj['id'] || rowObj['product_id'] || `prod_${i}`;
    const name = rowObj['name'] || rowObj['product_name'] || `Product ${i}`;
    const collection = rowObj['collection'] || name;
    const category = (rowObj['category'] || 'spc-vinyl') as CategoryId;
    const subtitle = rowObj['subtitle'] || rowObj['description_short'] || '';
    const description = rowObj['description'] || '';

    // Colors parsing: e.g. "Fearless Gray:02:#96999a, Vital Oak:05:#d6c09b" or simple comma names
    const colorsRaw = rowObj['colors'] || rowObj['colores'] || 'Natural Wood:#c7b28e';
    const colorItems: ProductColor[] = colorsRaw.split(',').map((cStr, cIdx) => {
      const parts = cStr.split(':').map((s) => s.trim());
      const cName = parts[0] || `Color ${cIdx + 1}`;
      const cCode = parts[1] || `${cIdx + 1}`;
      const cHex = parts[2] && parts[2].startsWith('#') ? parts[2] : '#c7b28e';
      return {
        name: cName,
        code: cCode,
        hexColor: cHex,
        patternType: 'wood',
      };
    });

    parsedProducts.push({
      id,
      name,
      collection,
      category,
      subtitle,
      description,
      specs: {
        wearLayer: rowObj['wear_layer'] || rowObj['capa_uso'] || '20 Mil',
        totalThickness: rowObj['thickness'] || rowObj['espesor'] || '5.5 mm',
        sqftPerBox: parseFloat(rowObj['sqft_box'] || rowObj['sqft_por_caja'] || '24.26') || 24.26,
        planksPerBox: parseInt(rowObj['planks_box'] || '9') || 9,
        plankSize: rowObj['plank_size'] || rowObj['medida'] || '7" x 48"',
        installation: rowObj['installation'] || 'Click Angle-Angle',
        finished: rowObj['finished'] || 'Satin',
        warrantyResidential: rowObj['warranty'] || '30 Years Residential',
      },
      colors: colorItems.length > 0 ? colorItems : [{ name: 'Default Oak', code: '01', hexColor: '#c7b28e' }],
      handSamplesAvailable: true,
      featured: true,
      technicalDiagram: 'spc-layers',
    });
  }

  if (parsedProducts.length > 0) {
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_PRODUCTS, JSON.stringify(parsedProducts));
    localStorage.setItem(LOCAL_STORAGE_LAST_SYNC, new Date().toISOString());
    return parsedProducts;
  }

  return PRODUCTS;
}

// Attempt live fetch from Google Sheet
export async function syncFromGoogleSheets(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!response.ok) {
      throw new Error(`Google Sheet returned status ${response.status}`);
    }
    const csv = await response.text();
    if (csv.includes('<!DOCTYPE html>') || csv.includes('login_counter')) {
      throw new Error('Google Sheet is set to private. Make sure "Anyone with the link can view" or use CSV paste.');
    }
    const products = parseGoogleSheetCSV(csv);
    return { success: true, count: products.length };
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
