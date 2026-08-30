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

  // We support TWO convenient Google Sheets structures:
  // 1) ROW PER COLOR (The easiest and cleanest! Each row has product_id, name, color_code, plank_photo_url, room_photo_url, hex_color)
  // 2) ROW PER PRODUCT (Grouped product with colors separated by commas)
  
  // Group rows by product ID
  const productMap = new Map<string, {
    baseInfo: {
      id: string;
      name: string;
      collection: string;
      category: CategoryId;
      subtitle: string;
      description: string;
      specs: any;
    };
    colors: ProductColor[];
  }>();

  for (let i = 1; i < lines.length; i++) {
    const row = parseRow(lines[i]);
    if (row.length < 2) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = row[idx] || '';
    });

    const id = (rowObj['id'] || rowObj['product_id'] || `prod_${i}`).trim();
    if (!id) continue;

    const name = (rowObj['name'] || rowObj['product_name'] || `Product ${i}`).trim();
    const collection = rowObj['collection'] || rowObj['coleccion'] || name;
    const category = (rowObj['category'] || rowObj['categoria'] || 'spc-vinyl') as CategoryId;
    const subtitle = rowObj['subtitle'] || rowObj['subtitulo'] || rowObj['description_short'] || '';
    const description = rowObj['description'] || rowObj['descripcion'] || '';
    
    // Check if this row is a SINGLE COLOR row (e.g. has 'color_code' or 'codigo_color')
    const singleColorCode = rowObj['color_code'] || rowObj['codigo_color'] || rowObj['color'] || '';
    const singleColorHex = rowObj['color_hex'] || rowObj['hex'] || rowObj['color_hexadecimal'] || '#c7b28e';
    const singlePlankPhoto = rowObj['plank_photo_url'] || rowObj['photo_url'] || rowObj['foto_tabla'] || rowObj['foto'] || rowObj['image_url'] || '';
    const singleRoomPhoto = rowObj['room_photo_url'] || rowObj['room_image_url'] || rowObj['foto_ambiente'] || rowObj['room_photo'] || '';

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

    if (!productMap.has(id)) {
      productMap.set(id, {
        baseInfo: {
          id,
          name,
          collection,
          category,
          subtitle,
          description,
          specs,
        },
        colors: [],
      });
    }

    const prodEntry = productMap.get(id)!;

    // If row specifies a single color code (Row-per-color pattern)
    if (singleColorCode) {
      const existingColor = prodEntry.colors.find((c) => c.code === singleColorCode);
      if (!existingColor) {
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
      // Multiple colors in one row pattern
      const colorImagesRaw = rowObj['color_images'] || rowObj['fotos_colores'] || '';
      const colorImagesMap: Record<string, string> = {};
      if (colorImagesRaw) {
        colorImagesRaw.split(',').forEach((item, idx) => {
          const parts = item.split(':').map((s) => s.trim());
          if (parts.length >= 2) {
            colorImagesMap[parts[0]] = parts.slice(1).join(':');
          } else if (parts.length === 1 && parts[0].startsWith('http')) {
            colorImagesMap[`0${idx + 1}`] = parts[0];
          }
        });
      }

      const colorsRaw = rowObj['colors'] || rowObj['colores'] || rowObj['codigos_colores'] || '01:#c7b28e';
      const colorItems: ProductColor[] = colorsRaw.split(',').map((cStr, cIdx) => {
        const parts = cStr.split(':').map((s) => s.trim());
        const rawName = parts[0] || `0${cIdx + 1}`;
        
        let cName = rawName;
        let cCode = rawName;
        let cHex = '#c7b28e';
        let cPhoto: string | undefined = colorImagesMap[rawName] || (singlePlankPhoto || undefined);
        let cRoomPhoto: string | undefined = singleRoomPhoto || undefined;

        if (parts[1]) {
          if (parts[1].startsWith('#')) {
            cHex = parts[1];
          } else if (parts[1].startsWith('http')) {
            cPhoto = parts[1];
          } else {
            cCode = parts[1];
          }
        }

        if (parts[2]) {
          if (parts[2].startsWith('#')) {
            cHex = parts[2];
          } else if (parts[2].startsWith('http')) {
            cPhoto = parts[2];
          }
        }

        if (parts[3] && parts[3].startsWith('http')) {
          cRoomPhoto = parts[3];
        }

        return {
          name: cName,
          code: cCode,
          hexColor: cHex,
          patternType: 'wood',
          image: cPhoto,
          roomImage: cRoomPhoto,
        };
      });

      prodEntry.colors = colorItems;
    }
  }

  // Convert map to Product array
  const parsedProducts: Product[] = [];
  productMap.forEach((entry) => {
    parsedProducts.push({
      id: entry.baseInfo.id,
      name: entry.baseInfo.name,
      collection: entry.baseInfo.collection,
      category: entry.baseInfo.category,
      subtitle: entry.baseInfo.subtitle,
      description: entry.baseInfo.description,
      specs: entry.baseInfo.specs,
      colors: entry.colors.length > 0 ? entry.colors : [{ name: '01', code: '01', hexColor: '#c7b28e' }],
      handSamplesAvailable: true,
      featured: true,
      technicalDiagram: 'spc-layers',
    });
  });

  if (parsedProducts.length > 0) {
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_PRODUCTS, JSON.stringify(parsedProducts));
    localStorage.setItem(LOCAL_STORAGE_LAST_SYNC, new Date().toISOString());
    return parsedProducts;
  }

  return PRODUCTS;
}

// Attempt live fetch from Google Sheet
export async function syncFromGoogleSheets(sheetName?: string): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const url = sheetName
      ? `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`
      : GOOGLE_SHEET_CSV_URL;
    const response = await fetch(url);
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

// Generate ready-to-copy CSV structure for Google Sheets
export function getCatalogTemplateCSV(): string {
  const headers = [
    'id',
    'name',
    'category',
    'thickness',
    'wear_layer',
    'plank_size',
    'sqft_box',
    'planks_box',
    'installation',
    'finished',
    'photo_url',
    'room_image_url',
    'colors',
    'color_images',
    'subtitle',
    'description',
  ];

  const rows = [
    [
      'spc-5.5mm',
      'SPC 5.5 mm',
      'spc-vinyl',
      '5.5 mm',
      '20 Mil',
      '7" x 48"',
      '24.26',
      '9',
      'Click Angle-Angle',
      'Satin Wood Feel',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/5.5mm/01.jpg',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/5.5mm/01_room.jpg',
      '01:#8c7355,02:#96999a,03:#c4ab80,04:#d1bfa0,05:#d6c09b,06:#9c8264,07:#6d533b,08:#b8a383,09:#a18d72,10:#cfbe9b,11:#7d674f,12:#5c4733',
      '01:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/5.5mm/01.jpg,02:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/5.5mm/02.jpg',
      'Piso Vinílico SPC Rigid Core 5.5 mm con Capa de Uso 20 Mil',
      'Piso rígido de alto desempeño 100% impermeable con click Angle-Angle y manta acústica IXPE.',
    ],
    [
      'spc-6.0mm',
      'SPC 6.0 mm',
      'spc-vinyl',
      '6.0 mm',
      '20 Mil',
      '9" x 60" XL',
      '22.50',
      '6',
      'Click Angle-Angle',
      'Embossed Real Wood Texture',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/6.0mm/01.jpg',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/6.0mm/01_room.jpg',
      '01:#a89984,02:#8e7c68,03:#c2b29c,04:#6b5847,05:#ded0be,06:#544335',
      '01:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/6.0mm/01.jpg,02:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/6.0mm/02.jpg',
      'Piso Vinílico SPC Rigid Core Formato Extra Grande 9"x60" XL',
      'Formato extra ancho y largo para amplitud visual y máxima elegancia arquitectónica.',
    ],
    [
      'spc-8.0mm',
      'SPC 8.0 mm',
      'spc-vinyl',
      '8.0 mm',
      '22 Mil',
      '9" x 60" HD',
      '18.75',
      '5',
      'Click Angle-Angle',
      'Heavy Commercial Texture',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/8.0mm/01.jpg',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/8.0mm/01_room.jpg',
      '01:#96836c,02:#7b6955,03:#bfae98,04:#524233',
      '01:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/8.0mm/01.jpg,02:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/8.0mm/02.jpg',
      'Piso Vinílico SPC Rigid Core Ultra Robusto 8.0 mm (22 Mil)',
      'Máxima amortiguación con pad acústico EVA de 2mm y capa de uso comercial pesada de 22 Mil.',
    ],
    [
      'steps-double-rounded',
      'Double Rounded Step (Doble Boleado)',
      'stair-steps',
      '5.5 mm / 6.0 mm / 8.0 mm',
      '20-22 Mil',
      '12" x 48" / 12" x 60"',
      '1.00',
      '1',
      'Direct Glue Down & Click System',
      'Dual Smooth Bullnose Edge',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/steps/double_rounded.jpg',
      '',
      'Match SPC 5.5mm / 6.0mm / 8.0mm:#c7b28e',
      '',
      'Grada con Doble Canto Redondeado para Escaleras Abiertas',
      'Peldaño arquitectónico para gradas con laterales visibles o esquinas expuestas.',
    ],
    [
      'steps-square',
      'Square Edge Step (Canto Recto)',
      'stair-steps',
      '5.5 mm / 6.0 mm / 8.0 mm',
      '20-22 Mil',
      '12" x 48" / 12" x 60"',
      '1.00',
      '1',
      'Direct Glue Down & Click System',
      'Modern 90° Clean Edge',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/steps/square_step.jpg',
      '',
      'Match SPC 5.5mm / 6.0mm / 8.0mm:#c7b28e',
      '',
      'Grada de Canto Recto Minimalista 90 Grados',
      'Diseño contemporáneo de líneas puras para escaleras modernas.',
    ],
    [
      'moldings-cm-t-molding',
      'CM T-Molding (Transición Plana)',
      'moldings',
      'Matching SPC',
      'Commercial Grade',
      '94" (2.40 m)',
      '1.00',
      '1',
      'Track & Snap / Adhesive',
      'Matching Wood Texture',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/moldings/cm_t_molding.jpg',
      '',
      'Match SPC Color Codes:#c7b28e',
      '',
      'Perfil de Transición en T a Mismo Nivel',
      'Cubre juntas de dilatación entre habitaciones con piso al mismo nivel.',
    ],
    [
      'moldings-cm-reducer',
      'CM Reducer (Reductor de Desnivel)',
      'moldings',
      'Matching SPC',
      'Commercial Grade',
      '94" (2.40 m)',
      '1.00',
      '1',
      'Track & Snap / Adhesive',
      'Matching Wood Texture',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/moldings/cm_reducer.jpg',
      '',
      'Match SPC Color Codes:#c7b28e',
      '',
      'Perfil Reductor para Diferencia de Altura',
      'Transición suave entre el piso SPC y pisos de menor espesor como vinil o concreto.',
    ],
    [
      'baseboards-bb1x6',
      'Baseboard BB1x6 (14 mm)',
      'baseboards',
      '14 mm x 135 mm (5-3/8")',
      'Factory Primed White',
      '2.44 m (8 ft)',
      '1.00',
      '1',
      'Nail & Adhesive',
      'Ultra Smooth Primed White',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/baseboards/bb1x6.jpg',
      '',
      'White Primed:#FFFFFF',
      '',
      'Zócalo / Rodapié Arquitectónico Blanco Primed 1x6',
      'Rodapié de alta altura con acabado listo para pintar.',
    ],
    [
      'baseboards-quarter-round-eps',
      'Quarter Round EPS Waterproof',
      'baseboards',
      '15 mm x 15 mm',
      '100% Waterproof Polystyrene',
      '2.40 m (8 ft)',
      '1.00',
      '1',
      'Brad Nails / Silicone',
      'Waterproof White Satin',
      'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/baseboards/quarter_round.jpg',
      '',
      'White Waterproof:#F8F8F8',
      '',
      'Moldura Cuarto de Bocel 100% Resistente al Agua',
      'Protege los perímetros contra la pared y cubre espacios de dilatación.',
    ],
  ];

  return [headers.join(','), ...rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))].join('\n');
}

