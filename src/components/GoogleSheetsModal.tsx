import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  Check,
  AlertCircle,
  Upload,
  Copy,
  FolderGit2,
  TableProperties,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  GOOGLE_SHEET_ID,
  GOOGLE_SHEET_URL,
  syncFromGoogleSheets,
  parseGoogleSheetCSV,
  resetToDefaultCatalog,
  getCatalogTemplateCSV,
} from '../utils/googleSheetsSync';
import { useLanguage } from '../i18n/LanguageContext';
import { Product } from '../types';

interface Props {
  onClose: () => void;
  onProductsUpdated: (products: Product[]) => void;
}

export const GoogleSheetsModal: React.FC<Props> = ({ onClose, onProductsUpdated }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'sync' | 'structure' | 'github'>('sync');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [csvPasteText, setCsvPasteText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedUrlFormat, setCopiedUrlFormat] = useState(false);

  const handleLiveSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const res = await syncFromGoogleSheets();
      if (res.success) {
        setSyncResult({
          success: true,
          message: isEn
            ? `Successfully synchronized ${res.count} products from Google Sheets!`
            : `¡Se sincronizaron con éxito ${res.count} productos desde Google Sheets!`,
        });
        const updated = await import('../utils/googleSheetsSync').then((m) => m.getStoredProducts());
        onProductsUpdated(updated);
      } else {
        setSyncResult({
          success: false,
          message:
            res.error ||
            (isEn
              ? 'Unable to connect to Google Sheets directly. Please paste your sheet CSV below.'
              : 'No se pudo conectar directamente. Por favor copia y pega el CSV de tu hoja abajo.'),
        });
        setShowPasteArea(true);
      }
    } catch (e: any) {
      setSyncResult({
        success: false,
        message: e.message || 'Sync error',
      });
      setShowPasteArea(true);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleApplyCsvPaste = () => {
    if (!csvPasteText.trim()) return;
    try {
      const products = parseGoogleSheetCSV(csvPasteText);
      onProductsUpdated(products);
      setSyncResult({
        success: true,
        message: isEn
          ? `Parsed and loaded ${products.length} products successfully!`
          : `¡Se importaron ${products.length} productos correctamente!`,
      });
      setCsvPasteText('');
      setShowPasteArea(false);
    } catch (err: any) {
      setSyncResult({
        success: false,
        message: isEn ? `Error parsing CSV: ${err.message}` : `Error al leer CSV: ${err.message}`,
      });
    }
  };

  const handleCopyTemplate = () => {
    const template = getCatalogTemplateCSV();
    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleCopyGithubExample = () => {
    const url = '05:#d6c09b:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/5.5mm/05.jpg';
    navigator.clipboard.writeText(url);
    setCopiedUrlFormat(true);
    setTimeout(() => setCopiedUrlFormat(false), 2000);
  };

  const handleResetCatalog = () => {
    resetToDefaultCatalog();
    import('../data/products').then((m) => {
      onProductsUpdated(m.PRODUCTS);
      setSyncResult({
        success: true,
        message: isEn ? 'Catalog restored to default factory products.' : 'Catálogo restaurado a valores por defecto.',
      });
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#D9D9D9] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B0B0B] text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#262626] flex items-center justify-center text-white border border-[#383838]">
              <FileSpreadsheet size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                {isEn ? 'Google Sheets Database & GitHub Photos' : 'Base de Datos Google Sheets y Fotos GitHub'}
              </h2>
              <p className="text-xs text-[#BCBAB4]">
                {isEn ? 'Direct Catalog Sync & Image Hosting Guide' : 'Sincronización Directa de Catálogo y Guía de Fotos'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full text-[#BCBAB4] hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D9D9D9] bg-[#F5F5F5] px-4 gap-2 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('sync')}
            className={`py-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sync'
                ? 'border-[#0B0B0B] text-[#0B0B0B]'
                : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            <RefreshCw size={14} />
            <span>{isEn ? 'Live Sync' : 'Sincronización'}</span>
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`py-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'structure'
                ? 'border-[#0B0B0B] text-[#0B0B0B]'
                : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            <TableProperties size={14} />
            <span>{isEn ? 'Tabs & Columns Guide' : 'Pestañas y Columnas'}</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`py-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'border-[#0B0B0B] text-[#0B0B0B]'
                : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            <FolderGit2 size={14} />
            <span>{isEn ? 'Upload Photos to GitHub' : 'Subir Fotos a GitHub'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* TAB 1: LIVE SYNC */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              {/* Linked Sheet Status */}
              <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B6762] uppercase tracking-wider">
                    {isEn ? 'Connected Google Sheet:' : 'Google Sheet Vinculado:'}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#0B0B0B] bg-white border border-[#D9D9D9] px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ID: {GOOGLE_SHEET_ID.substring(0, 10)}...
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <a
                    href={GOOGLE_SHEET_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B0B0B] hover:text-[#6B6762] underline"
                  >
                    <span>{isEn ? 'Open Sheet in Google Drive' : 'Abrir Hoja en Google Drive'}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Sync Feedback Message */}
              {syncResult && (
                <div
                  className={`p-3.5 rounded-2xl flex items-start gap-2.5 text-xs ${
                    syncResult.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                >
                  {syncResult.success ? (
                    <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 font-medium">{syncResult.message}</div>
                </div>
              )}

              {/* Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleLiveSync}
                  disabled={isSyncing}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#0B0B0B] hover:bg-[#262626] text-white font-bold text-xs transition cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                  <span>
                    {isSyncing
                      ? (isEn ? 'Synchronizing...' : 'Sincronizando...')
                      : (isEn ? 'Live Fetch from Google Sheet' : 'Sincronizar en Vivo desde Google Sheet')}
                  </span>
                </button>

                <button
                  onClick={() => setShowPasteArea(!showPasteArea)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#F5F5F5] hover:bg-[#D9D9D9] text-[#0B0B0B] font-bold text-xs border border-[#D9D9D9] transition cursor-pointer"
                >
                  <Upload size={16} className="text-[#0B0B0B]" />
                  <span>{isEn ? 'Manual CSV Import / Paste' : 'Pegar CSV Manualmente'}</span>
                </button>
              </div>

              {/* CSV Paste Textarea */}
              {showPasteArea && (
                <div className="space-y-2 p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl animate-in fade-in">
                  <label className="text-xs font-bold text-[#0B0B0B] block">
                    {isEn
                      ? 'Paste CSV or TSV text directly from your Google Sheet:'
                      : 'Pega el texto CSV o TSV directamente de tu Google Sheet:'}
                  </label>
                  <textarea
                    rows={5}
                    value={csvPasteText}
                    onChange={(e) => setCsvPasteText(e.target.value)}
                    placeholder="id,name,category,thickness,wear_layer,plank_size,sqft_box,planks_box,installation,finished,colors,subtitle,description..."
                    className="w-full text-xs font-mono p-3 bg-white border border-[#D9D9D9] rounded-xl outline-none focus:border-[#0B0B0B]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleApplyCsvPaste}
                      className="py-2 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold transition cursor-pointer"
                    >
                      {isEn ? 'Apply CSV to Catalog' : 'Aplicar CSV al Catálogo'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: STRUCTURE & TABS */}
          {activeTab === 'structure' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#0B0B0B] uppercase tracking-wider">
                    {isEn ? '1. Recommended Google Sheet Tabs:' : '1. Pestañas que debes crear en tu Google Sheet:'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: SPC_Flooring</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Pisos SPC por espesor: 5.5 mm, 6.0 mm, 8.0 mm con códigos de colores (01, 02, 05...).
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: Steps_Treads</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Gradas y peldaños: Double Rounded Step y Square Edge Step (canto recto).
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: Moldings_Profiles</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Molduras: CM T-Molding, CM Reducer, T-Molding Standard, Reducer Standard, End Cap.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: Baseboards</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Zócalos / Rodapiés: BB1x6, BB1x4, BB1x3, BB5180, BB618, BB620, Quarter Round EPS.
                    </p>
                  </div>
                </div>
              </div>

              {/* Columns format table */}
              <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#0B0B0B] uppercase tracking-wider">
                    {isEn ? '2. Columns (Headers in Row 1):' : '2. Columnas obligatorias (Fila 1 en Google Sheet):'}
                  </h3>
                  <button
                    onClick={handleCopyTemplate}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#0B0B0B] text-white text-xs font-bold rounded-full hover:bg-[#262626] transition cursor-pointer"
                  >
                    {copiedTemplate ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedTemplate ? (isEn ? 'Copied!' : '¡Copiado!') : (isEn ? 'Copy CSV Template' : 'Copiar Plantilla CSV')}</span>
                  </button>
                </div>

                <div className="bg-white border border-[#D9D9D9] rounded-xl p-3 text-xs font-mono overflow-x-auto space-y-1">
                  <p className="font-bold text-[#0B0B0B]">
                    id, name, category, thickness, wear_layer, plank_size, sqft_box, planks_box, installation, finished, photo_url, room_image_url, colors, color_images, subtitle, description
                  </p>
                </div>

                <div className="text-[11px] text-[#6B6762] space-y-1.5 leading-relaxed">
                  <p>
                    <strong className="text-[#0B0B0B]">3 Opciones fáciles para poner tus imágenes:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>
                      <strong className="text-[#0B0B0B]">Columna <code>photo_url</code>:</strong> Pega la URL directa de la foto general o del color principal (ej. <code className="bg-white px-1 py-0.5 rounded border border-[#D9D9D9]">https://raw.githubusercontent.com/user/repo/main/spc/5.5mm/01.jpg</code>).
                    </li>
                    <li>
                      <strong className="text-[#0B0B0B]">Columna <code>color_images</code>:</strong> Pega las fotos individuales de cada código separadas por comas (ej. <code className="bg-white px-1 py-0.5 rounded border border-[#D9D9D9]">01:https://.../01.jpg, 02:https://.../02.jpg, 05:https://.../05.jpg</code>).
                    </li>
                    <li>
                      <strong className="text-[#0B0B0B]">Dentro de la columna <code>colors</code>:</strong> Código:Hex:URL (ej. <code className="bg-white px-1 py-0.5 rounded border border-[#D9D9D9]">05:#d6c09b:https://.../05.jpg</code>).
                    </li>
                  </ul>
                  <p className="pt-1">
                    <strong className="text-[#0B0B0B]">Columna <code>room_image_url</code> (opcional):</strong> Foto del piso instalado en una habitación real (para alternar entre vista Tabla y vista Ambiente).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB PHOTOS GUIDE */}
          {activeTab === 'github' && (
            <div className="space-y-4 text-xs leading-relaxed text-[#0B0B0B]">
              <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <FolderGit2 size={16} className="text-[#0B0B0B]" />
                  <h3 className="font-bold uppercase tracking-wider text-xs">
                    {isEn ? 'How to Upload & Link Photos using GitHub:' : 'Paso a paso para subir fotos a GitHub y enlazarlas:'}
                  </h3>
                </div>

                <ol className="list-decimal list-inside space-y-2 text-[#6B6762] text-[11px]">
                  <li>
                    <strong className="text-[#0B0B0B]">Crea un repositorio en GitHub:</strong> Inicia sesión en GitHub y crea un repositorio público (ej. <code className="bg-white px-1 rounded border border-[#D9D9D9]">surfaces-assets</code>).
                  </li>
                  <li>
                    <strong className="text-[#0B0B0B]">Crea las carpetas para organizar las fotos:</strong>
                    <div className="mt-1 p-2 bg-white border border-[#D9D9D9] rounded-xl font-mono text-[10px] text-[#0B0B0B]">
                      surfaces-assets/<br />
                      ├── spc/<br />
                      │   ├── 5.5mm/ (01.jpg, 02.jpg, 05.jpg...)<br />
                      │   ├── 6.0mm/ (01.jpg, 02.jpg...)<br />
                      │   └── 8.0mm/ (01.jpg, 02.jpg...)<br />
                      ├── steps/ (double-rounded.jpg, square-step.jpg)<br />
                      ├── moldings/ (cm-t-molding.jpg, cm-reducer.jpg)<br />
                      └── baseboards/ (bb1x6.jpg, bb1x4.jpg, eps-quarter.jpg)
                    </div>
                  </li>
                  <li>
                    <strong className="text-[#0B0B0B]">Sube los archivos de imagen:</strong> Arrastra las fotos a sus respectivas carpetas en GitHub y haz clic en <em>Commit changes</em>.
                  </li>
                  <li>
                    <strong className="text-[#0B0B0B]">Usa el enlace "Raw" (Crudo):</strong> Para que la web cargue la imagen directamente, la URL debe comenzar con <code className="bg-white px-1 rounded border border-[#D9D9D9]">raw.githubusercontent.com</code>:
                  </li>
                </ol>

                {/* Example box with copy button */}
                <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#6B6762] uppercase tracking-wider font-mono">
                      Formato para la columna "colors" en Google Sheets:
                    </span>
                    <button
                      onClick={handleCopyGithubExample}
                      className="flex items-center gap-1 text-[10px] font-bold bg-[#0B0B0B] text-white px-2 py-0.5 rounded-md hover:bg-[#262626] transition cursor-pointer"
                    >
                      {copiedUrlFormat ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedUrlFormat ? '¡Copiado!' : 'Copiar Ejemplo'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-[10px] text-[#0B0B0B] break-all bg-[#F5F5F5] p-2 rounded border border-[#D9D9D9]">
                    05:#d6c09b:https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/5.5mm/05.jpg
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-2 border-t border-[#D9D9D9] flex justify-between items-center text-xs">
            <button
              onClick={handleResetCatalog}
              className="text-[#6B6762] hover:text-red-600 transition cursor-pointer underline"
            >
              {isEn ? 'Restore Factory Catalog' : 'Restaurar Catálogo de Fábrica'}
            </button>
            <button
              onClick={onClose}
              className="py-2 px-5 bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              {isEn ? 'Close' : 'Cerrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
