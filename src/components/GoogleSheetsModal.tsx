import React, { useState } from 'react';
import { X, Database, RefreshCw, ExternalLink, Check, AlertCircle, FileSpreadsheet, Upload, Download, Sparkles } from 'lucide-react';
import {
  GOOGLE_SHEET_ID,
  GOOGLE_SHEET_URL,
  GOOGLE_SHEET_CSV_URL,
  syncFromGoogleSheets,
  parseGoogleSheetCSV,
  resetToDefaultCatalog,
} from '../utils/googleSheetsSync';
import { useLanguage } from '../i18n/LanguageContext';
import { Product } from '../types';

interface Props {
  onClose: () => void;
  onProductsUpdated: (products: Product[]) => void;
}

export const GoogleSheetsModal: React.FC<Props> = ({ onClose, onProductsUpdated }) => {
  const { t, language } = useLanguage();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [csvPasteText, setCsvPasteText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);

  const handleLiveSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const res = await syncFromGoogleSheets();
      if (res.success) {
        setSyncResult({
          success: true,
          message: language === 'en'
            ? `Successfully synchronized ${res.count} products from Google Sheets!`
            : `¡Se sincronizaron con éxito ${res.count} productos desde Google Sheets!`,
        });
        // reload from storage
        const updated = await import('../utils/googleSheetsSync').then((m) => m.getStoredProducts());
        onProductsUpdated(updated);
      } else {
        setSyncResult({
          success: false,
          message: res.error || (language === 'en'
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
        message: language === 'en'
          ? `Parsed and loaded ${products.length} products successfully!`
          : `¡Se importaron ${products.length} productos correctamente!`,
      });
      setCsvPasteText('');
      setShowPasteArea(false);
    } catch (err: any) {
      setSyncResult({
        success: false,
        message: language === 'en' ? `Error parsing CSV: ${err.message}` : `Error al leer CSV: ${err.message}`,
      });
    }
  };

  const handleResetCatalog = () => {
    resetToDefaultCatalog();
    import('../data/products').then((m) => {
      onProductsUpdated(m.PRODUCTS);
      setSyncResult({
        success: true,
        message: language === 'en' ? 'Catalog restored to default factory products.' : 'Catálogo restaurado a valores por defecto.',
      });
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a1680] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {language === 'en' ? 'Google Sheets Database Integration' : 'Integración Base de Datos Google Sheets'}
              </h2>
              <p className="text-xs text-[#93b2f8]">
                {language === 'en' ? 'Live Cloud Product Sync & Catalog Manager' : 'Sincronización en la Nube y Gestor de Catálogo'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Connected Sheet Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === 'en' ? 'Connected Database Sheet:' : 'Hoja de Cálculo Vinculada:'}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {language === 'en' ? 'Connected' : 'Conectada'}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-800 break-all bg-white p-2.5 rounded-xl border border-slate-200">
              ID: {GOOGLE_SHEET_ID}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={GOOGLE_SHEET_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-[#0a1680] hover:text-[#081268] transition"
              >
                <span>{language === 'en' ? 'Open Google Sheet in New Tab' : 'Abrir Google Sheet en nueva pestaña'}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Sync status alert */}
          {syncResult && (
            <div
              className={`p-3 rounded-xl flex items-start gap-2.5 text-xs ${
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
              <div className="flex-1">{syncResult.message}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleLiveSync}
              disabled={isSyncing}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0a1680] hover:bg-[#081268] text-white font-bold text-xs shadow-md shadow-[#0a1680]/20 transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
              <span>
                {isSyncing
                  ? (language === 'en' ? 'Synchronizing...' : 'Sincronizando...')
                  : (language === 'en' ? 'Live Sync from Sheet' : 'Sincronizar desde Google Sheet')}
              </span>
            </button>

            <button
              onClick={() => setShowPasteArea(!showPasteArea)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition cursor-pointer"
            >
              <Upload size={16} className="text-slate-600" />
              <span>{language === 'en' ? 'Import / Paste CSV' : 'Importar / Pegar CSV'}</span>
            </button>
          </div>

          {/* CSV Paste Form */}
          {showPasteArea && (
            <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in">
              <label className="text-xs font-bold text-slate-700 block">
                {language === 'en'
                  ? 'Paste CSV or TSV text from your Google Sheet:'
                  : 'Pega el texto CSV o TSV de tu Google Sheet:'}
              </label>
              <textarea
                rows={5}
                value={csvPasteText}
                onChange={(e) => setCsvPasteText(e.target.value)}
                placeholder="id,name,collection,category,thickness,wear_layer,sqft_box,colors..."
                className="w-full text-xs font-mono p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#0a1680]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleApplyCsvPaste}
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  {language === 'en' ? 'Apply CSV Data' : 'Aplicar Datos CSV'}
                </button>
              </div>
            </div>
          )}

          {/* Instructions note */}
          <div className="p-4 bg-[#fbedb0]/30 border border-[#f1b94c]/40 rounded-2xl space-y-1.5 text-xs text-slate-700">
            <div className="font-bold text-[#0a1680] flex items-center gap-1.5">
              <Sparkles size={15} className="text-[#f1b94c]" />
              <span>{language === 'en' ? 'How Automatic Sync Works:' : 'Cómo funciona la sincronización automática:'}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              {language === 'en'
                ? '1. Open your Google Sheet and edit products, colors, or specifications. 2. In Google Sheets, go to File > Share > Publish to web and choose CSV to enable real-time automatic fetches.'
                : '1. Abre tu hoja de Google Sheets y edita productos, colores o especificaciones. 2. En Google Sheets, ve a Archivo > Compartir > Publicar en la web y elige CSV para permitir lecturas automáticas en tiempo real.'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={handleResetCatalog}
              className="text-xs text-slate-500 hover:text-red-600 transition cursor-pointer underline"
            >
              {language === 'en' ? 'Restore factory catalog' : 'Restaurar catálogo de fábrica'}
            </button>
            <button
              onClick={onClose}
              className="py-2 px-5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'Cerrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
