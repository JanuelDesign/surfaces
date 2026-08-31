import React, { useState, useEffect } from 'react';
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
  Link2,
} from 'lucide-react';
import {
  getGoogleSheetId,
  setGoogleSheetId,
  getGoogleSheetUrl,
  syncFromGoogleSheets,
  parseGoogleSheetCSV,
  resetToDefaultCatalog,
  getCatalogTemplateCSV,
  KNOWN_SHEET_TABS,
} from '../utils/googleSheetsSync';
import { useLanguage } from '../i18n/LanguageContext';
import { Product } from '../types';

interface Props {
  onClose: () => void;
  onProductsUpdated?: (products: Product[]) => void;
  onSyncComplete?: (products?: Product[]) => void;
}

export const GoogleSheetsModal: React.FC<Props> = ({ onClose, onProductsUpdated, onSyncComplete }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const notifyUpdate = (products: Product[]) => {
    if (onProductsUpdated) onProductsUpdated(products);
    if (onSyncComplete) onSyncComplete(products);
  };

  const [activeTab, setActiveTab] = useState<'sync' | 'structure' | 'github'>('sync');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string; details?: string[] } | null>(null);
  const [csvPasteText, setCsvPasteText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [sheetIdInput, setSheetIdInput] = useState('');
  const [savedUrlSuccess, setSavedUrlSuccess] = useState(false);

  useEffect(() => {
    setSheetIdInput(getGoogleSheetId());
  }, []);

  const handleSaveSheetId = () => {
    if (!sheetIdInput.trim()) return;
    const cleanId = setGoogleSheetId(sheetIdInput);
    setSheetIdInput(cleanId);
    setSavedUrlSuccess(true);
    setTimeout(() => setSavedUrlSuccess(false), 2500);
  };

  const handleLiveSync = async (tabName?: string) => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      if (sheetIdInput.trim()) {
        setGoogleSheetId(sheetIdInput);
      }

      const res = await syncFromGoogleSheets(tabName);
      if (res.success) {
        setSyncResult({
          success: true,
          message: isEn
            ? `Successfully loaded ${res.count} products from Google Sheets!`
            : `¡Se cargaron con éxito ${res.count} productos desde Google Sheets!`,
          details: res.syncedTabs ? res.syncedTabs : undefined,
        });
        const updated = await import('../utils/googleSheetsSync').then((m) => m.getStoredProducts());
        notifyUpdate(updated);
      } else {
        setSyncResult({
          success: false,
          message:
            res.error ||
            (isEn
              ? 'Unable to connect to Google Sheets directly. Please ensure sharing is set to "Anyone with link can view" or use CSV paste below.'
              : 'No se pudo conectar directamente. Asegúrate de que compartir esté en "Cualquier persona con el enlace (Lector)" o pega el CSV abajo.'),
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
      notifyUpdate(products);
      setSyncResult({
        success: true,
        message: isEn
          ? `Parsed and loaded ${products.length} products successfully!`
          : `¡Se importaron ${products.length} productos correctamente al catálogo!`,
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

  const handleResetCatalog = () => {
    resetToDefaultCatalog();
    import('../data/products').then((m) => {
      notifyUpdate(m.PRODUCTS);
      setSyncResult({
        success: true,
        message: isEn ? 'Catalog restored to default factory products.' : 'Catálogo restaurado a valores por defecto.',
      });
    });
  };

  const currentSheetUrl = getGoogleSheetUrl();

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
              {/* Google Sheet Link & ID Input */}
              <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B6762] uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 size={14} className="text-[#0B0B0B]" />
                    {isEn ? 'Google Sheet ID or URL:' : 'Enlace o ID de tu Google Sheet:'}
                  </span>
                  <a
                    href={currentSheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B0B0B] hover:text-[#6B6762] underline"
                  >
                    <span>{isEn ? 'Open Sheet' : 'Abrir Hoja'}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sheetIdInput}
                    onChange={(e) => setSheetIdInput(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/TU_ID_AQUI/edit o ID"
                    className="flex-1 text-xs font-mono p-2.5 bg-white border border-[#D9D9D9] rounded-xl outline-none focus:border-[#0B0B0B]"
                  />
                  <button
                    onClick={handleSaveSheetId}
                    className="px-3.5 py-2.5 bg-[#0B0B0B] text-white text-xs font-bold rounded-xl hover:bg-[#262626] transition cursor-pointer shrink-0"
                  >
                    {savedUrlSuccess ? (isEn ? 'Saved!' : '¡Guardado!') : (isEn ? 'Save' : 'Guardar')}
                  </button>
                </div>

                <p className="text-[11px] text-[#6B6762]">
                  {isEn
                    ? 'Important: In Google Sheets, make sure File > Share is set to "Anyone with the link can view" (Viewer).'
                    : 'Importante: En tu Google Sheet, ve a Compartir y asegúrate que esté en "Cualquier persona con el enlace (Lector)".'}
                </p>
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
                  <div className="flex-1">
                    <p className="font-bold">{syncResult.message}</p>
                    {syncResult.details && syncResult.details.length > 0 && (
                      <p className="text-[11px] mt-1 opacity-90">
                        {isEn ? 'Synced tabs: ' : 'Pestañas detectadas: '}
                        {syncResult.details.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Main Sync Button */}
              <div className="space-y-2">
                <button
                  onClick={() => handleLiveSync()}
                  disabled={isSyncing}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#0B0B0B] hover:bg-[#262626] text-white font-bold text-xs transition cursor-pointer disabled:opacity-50 shadow-md"
                >
                  <RefreshCw size={16} className={isSyncing ? 'animate-spin text-emerald-400' : 'text-emerald-400'} />
                  <span>
                    {isSyncing
                      ? (isEn ? 'Synchronizing all tabs...' : 'Sincronizando todas las pestañas...')
                      : (isEn ? 'Sync All Tabs (SPC, Steps, Moldings, Baseboards)' : 'Sincronizar Catálogo Completo (SPC, Gradas, Molduras, Rodapiés)')}
                  </span>
                </button>

                {/* Individual Tab Sync Shortcuts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {KNOWN_SHEET_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleLiveSync(tab)}
                      disabled={isSyncing}
                      className="py-1.5 px-2 bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#0B0B0B] text-[10px] font-bold rounded-lg border border-[#D9D9D9] transition cursor-pointer text-center truncate disabled:opacity-50"
                      title={`Sync ${tab}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* CSV Manual Paste Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setShowPasteArea(!showPasteArea)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#0B0B0B] font-bold text-xs border border-[#D9D9D9] transition cursor-pointer"
                >
                  <Upload size={14} className="text-[#0B0B0B]" />
                  <span>{showPasteArea ? (isEn ? 'Hide CSV Paste' : 'Ocultar Pegar CSV') : (isEn ? 'Manual CSV Paste (Instant 1-Click Update)' : 'Pegar CSV Manual (Actualización Instantánea en 1 Clic)')}</span>
                </button>
              </div>

              {/* CSV Paste Textarea */}
              {showPasteArea && (
                <div className="space-y-2 p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#0B0B0B] block">
                      {isEn
                        ? 'Paste CSV or TSV text directly from your Google Sheet:'
                        : 'Pega el texto CSV de tu Google Sheet (Copia todo en la hoja y pega aquí):'}
                    </label>
                  </div>
                  <textarea
                    rows={6}
                    value={csvPasteText}
                    onChange={(e) => setCsvPasteText(e.target.value)}
                    placeholder="id,name,category,thickness,wear_layer,plank_size,sqft_box,planks_box,color_code,color_hex,plank_photo_url,room_photo_url..."
                    className="w-full text-xs font-mono p-3 bg-white border border-[#D9D9D9] rounded-xl outline-none focus:border-[#0B0B0B]"
                  />
                  <div className="flex justify-between items-center gap-2">
                    <button
                      onClick={handleResetCatalog}
                      className="text-xs font-bold text-[#6B6762] hover:text-rose-600 transition cursor-pointer"
                    >
                      {isEn ? 'Restore Factory Catalog' : 'Restaurar Catálogo por Defecto'}
                    </button>
                    <button
                      onClick={handleApplyCsvPaste}
                      className="py-2 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold transition cursor-pointer"
                    >
                      {isEn ? 'Apply to Catalog' : 'Aplicar al Catálogo'}
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
                <h3 className="text-xs font-bold text-[#0B0B0B] uppercase tracking-wider">
                  {isEn ? '1. Recommended Google Sheet Tabs:' : '1. Pestañas en tu Google Sheet:'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: SPC_Flooring</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Pisos SPC 5.5 mm, 6.0 mm, 8.0 mm con 1 fila por cada color (01, 02, 05...).
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: Steps_Treads</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Gradas y peldaños: Double Rounded Step y Square Edge Step.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: Moldings_Profiles</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Molduras: CM T-Molding, CM Reducer, T-Molding Standard, Reducer, End Cap.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-[#D9D9D9] rounded-xl">
                    <span className="font-bold text-[#0B0B0B] block font-mono">Pestaña: Baseboards</span>
                    <p className="text-[11px] text-[#6B6762] mt-0.5">
                      Zócalos / Rodapiés: BB1x6, BB1x4, BB1x3, Quarter Round EPS.
                    </p>
                  </div>
                </div>
              </div>

              {/* Columns format table */}
              <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#0B0B0B] uppercase tracking-wider">
                    {isEn ? '2. Columns (Headers in Row 1):' : '2. Columnas obligatorias (Fila 1):'}
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
                    id, name, category, thickness, wear_layer, plank_size, sqft_box, planks_box, color_code, color_hex, plank_photo_url, room_photo_url
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB GUIDE */}
          {activeTab === 'github' && (
            <div className="space-y-4 text-xs text-[#0B0B0B]">
              <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl space-y-3">
                <h3 className="font-bold uppercase tracking-wider">
                  {isEn ? 'How to Host Free HD Photos on GitHub:' : 'Cómo alojar tus fotos en GitHub gratis:'}
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-[#6B6762] text-xs">
                  <li>
                    Crea un repositorio público en GitHub (por ejemplo, <code className="bg-white px-1.5 py-0.5 rounded text-[#0B0B0B] font-bold">surfaces-catalog</code>).
                  </li>
                  <li>
                    Crea carpetas ordenadas: <code className="bg-white px-1.5 py-0.5 rounded text-[#0B0B0B] font-bold">spc/5.5mm/01.jpg</code>, etc.
                  </li>
                  <li>
                    Usa el enlace directo <strong>raw.githubusercontent.com</strong>:
                  </li>
                </ol>

                <div className="bg-white border border-[#D9D9D9] rounded-xl p-3 font-mono text-[11px] break-all">
                  https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/spc/5.5mm/01.jpg
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
