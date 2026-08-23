import React, { useState, useId } from 'react';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Send,
  Printer,
  Copy,
  Check,
  Package,
  Sparkles,
  Phone,
  FileText,
  User,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { OrderItem, ClientOrderInfo } from '../types';
import { getSwatchBackground } from '../utils/textureUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  clientInfo: ClientOrderInfo;
  onUpdateClientInfo: (info: Partial<ClientOrderInfo>) => void;
}

export const OrderDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  clientInfo,
  onUpdateClientInfo,
}) => {
  const fullNameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const companyOrRoleId = useId();
  const projectCityId = useId();
  const projectAddressId = useId();
  const projectTypeId = useId();
  const deliveryTimeframeId = useId();
  const additionalNotesId = useId();
  const needsInstallationId = useId();
  const [activeTab, setActiveTab] = useState<'cart' | 'client'>('cart');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const quoteItems = orderItems.filter((i) => i.itemType === 'order');
  const sampleItems = orderItems.filter((i) => i.itemType === 'sample');

  const totalBoxes = quoteItems
    .filter((i) => i.unit === 'boxes')
    .reduce((sum, i) => sum + i.quantity, 0);

  const totalEstSqft = quoteItems.reduce((sum, i) => sum + (i.estimatedSqft || 0), 0);

  // Generate clean WhatsApp message
  const generateWhatsAppMessage = () => {
    let text = `*SOLICITUD DE PEDIDO / COTIZACIÓN - QUICKSURFACES 2026*\n\n`;
    text += `*Cliente:* ${clientInfo.fullName || 'No especificado'}\n`;
    if (clientInfo.companyOrRole) text += `*Empresa / Rol:* ${clientInfo.companyOrRole}\n`;
    text += `*Teléfono:* ${clientInfo.phone || 'No especificado'}\n`;
    if (clientInfo.email) text += `*Email:* ${clientInfo.email}\n`;
    if (clientInfo.projectCity) text += `*Ciudad / Proyecto:* ${clientInfo.projectCity}\n`;
    if (clientInfo.needsInstallation) text += `*Servicio de Instalación:* Sí, solicitado\n`;
    text += `\n*--- PRODUCTOS SOLICITADOS ---*\n`;

    if (quoteItems.length > 0) {
      text += `\n*📦 MATERIAL PRINCIPAL / CAJAS:*\n`;
      quoteItems.forEach((item, idx) => {
        text += `${idx + 1}. *${item.collectionName}* - ${item.selectedColor.name} ${
          item.selectedColor.code ? `(${item.selectedColor.code})` : ''
        }\n`;
        text += `   • Cantidad: ${item.quantity} ${item.unit}\n`;
        if (item.estimatedSqft) text += `   • Estimado: ≈ ${item.estimatedSqft} sqft\n`;
        if (item.notes) text += `   • Nota: ${item.notes}\n`;
      });
    }

    if (sampleItems.length > 0) {
      text += `\n*🏷️ MUESTRAS DE MANO SOLICITADAS (HAND SAMPLES):*\n`;
      sampleItems.forEach((item, idx) => {
        text += `${idx + 1}. *${item.collectionName}* - ${item.selectedColor.name} ${
          item.selectedColor.code ? `(${item.selectedColor.code})` : ''
        } (Muestra física)\n`;
      });
    }

    if (clientInfo.additionalNotes) {
      text += `\n*Notas del Proyecto:* ${clientInfo.additionalNotes}\n`;
    }

    text += `\n_Generado desde Catálogo Interactivo QuickSurfaces 2026 (quicksurfaces.com)_`;
    return text;
  };

  const handleSendWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/18005550199?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleCopySummary = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff8407] flex items-center justify-center text-white shadow-md shadow-[#ff8407]/20">
              <ShoppingCart size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#ff8407] tracking-wider">
                Sistema de Pedido sin Precios
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                Mi Lista de Pedido & Muestras
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition flex items-center justify-center gap-2 ${
              activeTab === 'cart'
                ? 'border-[#ff8407] text-[#ff8407]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Package size={15} />
            <span>Productos ({orderItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition flex items-center justify-center gap-2 ${
              activeTab === 'client'
                ? 'border-[#ff8407] text-[#ff8407]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User size={15} />
            <span>Datos del Cliente & Envío</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingCart size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800">Su lista de pedido está vacía</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Explore nuestro catálogo y agregue cajas de pisos, molduras, zócalos o solicite muestras físicas de mano (Hand Samples).
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#ff8407] text-white text-xs font-bold shadow-md shadow-[#ff8407]/20"
              >
                Explorar Catálogo de Productos
              </button>
            </div>
          ) : (
            <>
              {/* TAB 1: PRODUCT LIST */}
              {activeTab === 'cart' && (
                <div className="space-y-6">
                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Cajas</div>
                      <div className="text-lg font-extrabold text-[#ff8407]">{totalBoxes}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Sq. Ft. Est.</div>
                      <div className="text-lg font-extrabold text-slate-900">{totalEstSqft.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Muestras</div>
                      <div className="text-lg font-extrabold text-emerald-600">{sampleItems.length}</div>
                    </div>
                  </div>

                  {/* Section: Material & Flooring Orders */}
                  {quoteItems.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Package size={14} className="text-[#ff8407]" />
                        Material & Cajas para Proyecto ({quoteItems.length})
                      </h4>

                      <div className="space-y-2.5">
                        {quoteItems.map((item) => {
                          const swatchStyle = getSwatchBackground(item.selectedColor);
                          return (
                            <div
                              key={item.id}
                              className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:border-slate-300 transition flex items-start gap-3"
                            >
                              {/* Swatch avatar */}
                              <div
                                className="w-12 h-12 rounded-xl shrink-0 border border-slate-300 shadow-inner overflow-hidden relative"
                                style={swatchStyle}
                              ></div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="truncate">
                                    <span className="text-[10px] uppercase font-bold text-[#ff8407]">
                                      {item.collectionName}
                                    </span>
                                    <div className="text-sm font-bold text-slate-900 truncate">
                                      {item.selectedColor.name}{' '}
                                      {item.selectedColor.code && (
                                        <span className="text-[11px] font-mono text-slate-500 font-normal">
                                          ({item.selectedColor.code})
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-slate-400 hover:text-red-500 p-1 transition"
                                    title="Eliminar"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>

                                {/* Estimated sqft & notes */}
                                <div className="text-[11px] text-slate-500 mt-1">
                                  {item.estimatedSqft ? `≈ ${item.estimatedSqft} sqft calculados` : ''}
                                  {item.notes ? ` • ${item.notes}` : ''}
                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, -1)}
                                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="text-xs font-bold text-slate-900 min-w-6 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, 1)}
                                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                                    >
                                      <Plus size={12} />
                                    </button>
                                    <span className="text-xs font-medium text-slate-600 capitalize ml-1">
                                      {item.unit}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Section: Hand Samples */}
                  {sampleItems.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-600" />
                        Muestras de Mano Solicitadas (Hand Samples) ({sampleItems.length})
                      </h4>

                      <div className="space-y-2">
                        {sampleItems.map((item) => {
                          const swatchStyle = getSwatchBackground(item.selectedColor);
                          return (
                            <div
                              key={item.id}
                              className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-lg shrink-0 border border-emerald-300"
                                  style={swatchStyle}
                                ></div>
                                <div>
                                  <div className="text-xs font-bold text-slate-900">
                                    {item.selectedColor.name} ({item.collectionName})
                                  </div>
                                  <div className="text-[10px] text-emerald-700 font-semibold">
                                    Muestra de Mano Físicamente Disponible
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-slate-400 hover:text-red-500 p-1"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={onClearOrder}
                      className="text-xs text-slate-400 hover:text-red-500 transition flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      <span>Vaciar Lista</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('client')}
                      className="text-xs font-bold text-[#ff8407] hover:underline"
                    >
                      Continuar a Datos de Envío →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: CLIENT INFO */}
              {activeTab === 'client' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">Información del Proyecto</h4>
                    <p className="text-[11px] text-slate-500">
                      Complete sus datos para generar la cotización formal o procesar su pedido directo por WhatsApp o PDF.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label htmlFor={fullNameId} className="font-semibold text-slate-700 block mb-1">Nombre Completo *</label>
                      <input
                        id={fullNameId}
                        type="text"
                        value={clientInfo.fullName}
                        onChange={(e) => onUpdateClientInfo({ fullName: e.target.value })}
                        placeholder="Ej. Arq. Carlos Mendoza / Juan Pérez"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={phoneId} className="font-semibold text-slate-700 block mb-1">
                          Teléfono / WhatsApp *
                        </label>
                        <input
                          id={phoneId}
                          type="tel"
                          value={clientInfo.phone}
                          onChange={(e) => onUpdateClientInfo({ phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={emailId} className="font-semibold text-slate-700 block mb-1">Correo Electrónico</label>
                        <input
                          id={emailId}
                          type="email"
                          value={clientInfo.email}
                          onChange={(e) => onUpdateClientInfo({ email: e.target.value })}
                          placeholder="contacto@ejemplo.com"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={companyOrRoleId} className="font-semibold text-slate-700 block mb-1">Empresa / Rol</label>
                        <input
                          id={companyOrRoleId}
                          type="text"
                          value={clientInfo.companyOrRole}
                          onChange={(e) => onUpdateClientInfo({ companyOrRole: e.target.value })}
                          placeholder="Constructora / Propietario"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={projectCityId} className="font-semibold text-slate-700 block mb-1">Ciudad / Estado</label>
                        <input
                          id={projectCityId}
                          type="text"
                          value={clientInfo.projectCity}
                          onChange={(e) => onUpdateClientInfo({ projectCity: e.target.value })}
                          placeholder="Ciudad del proyecto"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={projectAddressId} className="font-semibold text-slate-700 block mb-1">
                        Dirección de Entrega / Proyecto
                      </label>
                      <input
                        id={projectAddressId}
                        type="text"
                        value={clientInfo.projectAddress}
                        onChange={(e) => onUpdateClientInfo({ projectAddress: e.target.value })}
                        placeholder="Calle, número, urbanización o punto de referencia"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={projectTypeId} className="font-semibold text-slate-700 block mb-1">Tipo de Proyecto</label>
                        <select
                          id={projectTypeId}
                          value={clientInfo.projectType}
                          onChange={(e) =>
                            onUpdateClientInfo({
                              projectType: e.target.value as ClientOrderInfo['projectType'],
                            })
                          }
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                        >
                          <option value="Residencial">Residencial</option>
                          <option value="Comercial">Comercial</option>
                          <option value="Contratista">Contratista</option>
                          <option value="Diseño / Arquitectura">Diseño / Arquitectura</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor={deliveryTimeframeId} className="font-semibold text-slate-700 block mb-1">
                          Tiempo Estimado de Entrega
                        </label>
                        <input
                          id={deliveryTimeframeId}
                          type="text"
                          value={clientInfo.deliveryTimeframe}
                          onChange={(e) => onUpdateClientInfo({ deliveryTimeframe: e.target.value })}
                          placeholder="Inmediato / En 2 semanas"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                        />
                      </div>
                    </div>

                    {/* Needs Installation Checkbox */}
                    <div className="p-3 bg-orange-50/60 border border-[#ff8407]/30 rounded-xl flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id={needsInstallationId}
                        checked={clientInfo.needsInstallation}
                        onChange={(e) => onUpdateClientInfo({ needsInstallation: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#ff8407] rounded"
                      />
                      <label htmlFor={needsInstallationId} className="text-xs text-slate-800 cursor-pointer">
                        <span className="font-bold block">
                          Deseo incluir el servicio de instalación QuickSurfaces
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Nuestros técnicos certificados realizarán la nivelación, colocación y terminaciones.
                        </span>
                      </label>
                    </div>

                    <div>
                      <label htmlFor={additionalNotesId} className="font-semibold text-slate-700 block mb-1">
                        Notas o requerimientos adicionales
                      </label>
                      <textarea
                        id={additionalNotesId}
                        rows={2}
                        value={clientInfo.additionalNotes}
                        onChange={(e) => onUpdateClientInfo({ additionalNotes: e.target.value })}
                        placeholder="Ej. Medidas específicas de gradas, corte especial, acceso al edificio..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#ff8407] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {orderItems.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Direct WhatsApp Order */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#ff8407] hover:bg-[#e67300] text-white font-extrabold text-sm shadow-lg shadow-[#ff8407]/25 transition flex items-center justify-center gap-2 transform active:scale-98"
            >
              <Send size={18} />
              <span>Enviar Pedido Oficial por WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Print / Save PDF */}
              <button
                onClick={handlePrint}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Printer size={15} />
                <span>Imprimir / PDF</span>
              </button>

              {/* Copy Summary */}
              <button
                onClick={handleCopySummary}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  copied
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
              </button>
            </div>

            {submitted && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-medium">
                ✓ Se ha abierto WhatsApp con el desglose de su pedido. ¡Pronto un asesor le contactará!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
