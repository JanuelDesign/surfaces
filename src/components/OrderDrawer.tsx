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
import { useLanguage } from '../i18n/LanguageContext';

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
  const { language, t } = useLanguage();
  const isEn = language === 'en';

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
  const [formErrors, setFormErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});

  if (!isOpen) return null;

  const quoteItems = orderItems.filter((i) => i.itemType === 'order');
  const sampleItems = orderItems.filter((i) => i.itemType === 'sample');

  const totalBoxes = quoteItems
    .filter((i) => i.unit === 'boxes')
    .reduce((sum, i) => sum + i.quantity, 0);

  const totalEstSqft = quoteItems.reduce((sum, i) => sum + (i.estimatedSqft || 0), 0);

  // Validate form fields
  const validateClientForm = (): boolean => {
    const errors: { fullName?: string; phone?: string; email?: string } = {};

    if (!clientInfo.fullName || clientInfo.fullName.trim().length < 2) {
      errors.fullName = isEn ? 'Please enter full name (minimum 2 characters)' : 'Por favor ingrese el nombre completo (mínimo 2 caracteres)';
    }

    const cleanPhone = (clientInfo.phone || '').replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = isEn ? 'Please enter a valid phone number (at least 7 digits)' : 'Por favor ingrese un número de teléfono válido (mínimo 7 dígitos)';
    }

    if (clientInfo.email && clientInfo.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientInfo.email.trim())) {
        errors.email = isEn ? 'Please enter a valid email address' : 'Por favor ingrese un correo electrónico válido';
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setActiveTab('client');
      return false;
    }
    return true;
  };

  // Generate clean WhatsApp message
  const generateWhatsAppMessage = () => {
    let text = isEn
      ? `*ORDER / QUOTE REQUEST - SURFACES 2026*\n\n`
      : `*SOLICITUD DE PEDIDO / COTIZACIÓN - SURFACES 2026*\n\n`;

    text += isEn
      ? `*Client:* ${clientInfo.fullName || 'Not specified'}\n`
      : `*Cliente:* ${clientInfo.fullName || 'No especificado'}\n`;

    if (clientInfo.companyOrRole) {
      text += isEn
        ? `*Company / Role:* ${clientInfo.companyOrRole}\n`
        : `*Empresa / Rol:* ${clientInfo.companyOrRole}\n`;
    }

    text += isEn
      ? `*Phone:* ${clientInfo.phone || 'Not specified'}\n`
      : `*Teléfono:* ${clientInfo.phone || 'No especificado'}\n`;

    if (clientInfo.email) text += `*Email:* ${clientInfo.email}\n`;
    if (clientInfo.projectCity) {
      text += isEn
        ? `*City / Project Location:* ${clientInfo.projectCity}\n`
        : `*Ciudad / Proyecto:* ${clientInfo.projectCity}\n`;
    }
    if (clientInfo.needsInstallation) {
      text += isEn
        ? `*Installation Service:* Yes, requested\n`
        : `*Servicio de Instalación:* Sí, solicitado\n`;
    }
    text += isEn ? `\n*--- REQUESTED PRODUCTS ---*\n` : `\n*--- PRODUCTOS SOLICITADOS ---*\n`;

    if (quoteItems.length > 0) {
      text += isEn ? `\n*📦 MAIN MATERIAL / BOXES:*\n` : `\n*📦 MATERIAL PRINCIPAL / CAJAS:*\n`;
      quoteItems.forEach((item, idx) => {
        text += `${idx + 1}. *${item.collectionName}* - ${item.selectedColor.name} ${
          item.selectedColor.code ? `(${item.selectedColor.code})` : ''
        }\n`;
        text += isEn
          ? `   • Quantity: ${item.quantity} ${item.unit}\n`
          : `   • Cantidad: ${item.quantity} ${item.unit}\n`;
        if (item.estimatedSqft) {
          text += isEn
            ? `   • Estimated: ≈ ${item.estimatedSqft} sqft\n`
            : `   • Estimado: ≈ ${item.estimatedSqft} sqft\n`;
        }
        if (item.notes) {
          text += isEn ? `   • Note: ${item.notes}\n` : `   • Nota: ${item.notes}\n`;
        }
      });
    }

    if (sampleItems.length > 0) {
      text += isEn
        ? `\n*🏷️ REQUESTED HAND SAMPLES:*\n`
        : `\n*🏷️ MUESTRAS DE MANO SOLICITADAS (HAND SAMPLES):*\n`;
      sampleItems.forEach((item, idx) => {
        text += `${idx + 1}. *${item.collectionName}* - ${item.selectedColor.name} ${
          item.selectedColor.code ? `(${item.selectedColor.code})` : ''
        } (${isEn ? 'Hand sample' : 'Muestra física'})\n`;
      });
    }

    if (clientInfo.additionalNotes) {
      text += isEn
        ? `\n*Project Notes:* ${clientInfo.additionalNotes}\n`
        : `\n*Notas del Proyecto:* ${clientInfo.additionalNotes}\n`;
    }

    text += isEn
      ? `\n_Generated from SURFACES 2026 Official Catalog (surfaces.com)_`
      : `\n_Generado desde Catálogo Interactivo SURFACES 2026 (surfaces.com)_`;
    return text;
  };

  const handleSendWhatsApp = () => {
    if (!validateClientForm()) return;
    const text = generateWhatsAppMessage();
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encoded}`;
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
    if (!validateClientForm()) return;
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#D9D9D9] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] flex items-center justify-center text-white shadow-xs">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#6B6762] tracking-wider">
                {t('drawer.title')}
              </span>
              <h2 className="text-lg font-extrabold text-[#0B0B0B] leading-tight">
                {t('drawer.subtitle')}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5F5F5] hover:bg-[#D9D9D9] flex items-center justify-center text-[#0B0B0B] transition cursor-pointer border border-[#D9D9D9]"
            aria-label="Close quote drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#D9D9D9] bg-white px-6">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'cart'
                ? 'border-[#0B0B0B] text-[#0B0B0B]'
                : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            <Package size={15} />
            <span>{t('drawer.tabItems')} ({orderItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'client'
                ? 'border-[#0B0B0B] text-[#0B0B0B]'
                : 'border-transparent text-[#6B6762] hover:text-[#0B0B0B]'
            }`}
          >
            <User size={15} />
            <span>{t('drawer.tabClient')}</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#6B6762] border border-[#D9D9D9]">
                <ShoppingCart size={28} />
              </div>
              <h3 className="text-base font-bold text-[#0B0B0B]">{t('drawer.emptyTitle')}</h3>
              <p className="text-xs text-[#6B6762] max-w-sm">
                {t('drawer.emptyDesc')}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#0B0B0B] text-white text-xs font-bold shadow-xs cursor-pointer hover:bg-[#262626]"
              >
                {t('drawer.exploreBtn')}
              </button>
            </div>
          ) : (
            <>
              {/* TAB 1: PRODUCT LIST */}
              {activeTab === 'cart' && (
                <div className="space-y-6">
                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-3 gap-2 bg-[#F5F5F5] p-3 rounded-2xl border border-[#D9D9D9] text-center">
                    <div>
                      <div className="text-[10px] text-[#6B6762] uppercase font-semibold">{t('drawer.totalBoxes')}</div>
                      <div className="text-lg font-extrabold text-[#0B0B0B]">{totalBoxes}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6B6762] uppercase font-semibold">{t('drawer.totalSqft')}</div>
                      <div className="text-lg font-extrabold text-[#0B0B0B]">{totalEstSqft.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6B6762] uppercase font-semibold">{t('drawer.totalSamples')}</div>
                      <div className="text-lg font-extrabold text-[#0B0B0B]">{sampleItems.length}</div>
                    </div>
                  </div>

                  {/* Section: Material & Flooring Orders */}
                  {quoteItems.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] flex items-center gap-2">
                        <Package size={14} className="text-[#0B0B0B]" />
                        {isEn ? `Project Material & Boxes (${quoteItems.length})` : `Material & Cajas para Proyecto (${quoteItems.length})`}
                      </h4>

                      <div className="space-y-2.5">
                        {quoteItems.map((item) => {
                          const swatchStyle = getSwatchBackground(item.selectedColor);
                          return (
                            <div
                              key={item.id}
                              className="bg-white border border-[#D9D9D9] rounded-2xl p-3.5 shadow-xs hover:border-[#0B0B0B] transition flex items-start gap-3"
                            >
                              {/* Swatch avatar */}
                              <div
                                className="w-12 h-12 rounded-xl shrink-0 border border-[#D9D9D9] shadow-inner overflow-hidden relative"
                                style={swatchStyle}
                              ></div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="truncate">
                                    <span className="text-[10px] uppercase font-bold text-[#6B6762]">
                                      {item.collectionName}
                                    </span>
                                    <div className="text-sm font-bold text-[#0B0B0B] truncate">
                                      {item.selectedColor.name}{' '}
                                      {item.selectedColor.code && (
                                        <span className="text-[11px] font-mono text-[#6B6762] font-normal">
                                          ({item.selectedColor.code})
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-[#6B6762] hover:text-red-500 p-1 transition cursor-pointer"
                                    title={isEn ? 'Delete item' : 'Eliminar'}
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>

                                {/* Estimated sqft & notes */}
                                <div className="text-[11px] text-[#6B6762] mt-1">
                                  {item.estimatedSqft ? `≈ ${item.estimatedSqft} sqft` : ''}
                                  {item.notes ? ` • ${item.notes}` : ''}
                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D9D9D9]">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, -1)}
                                      className="w-7 h-7 rounded-lg bg-[#F5F5F5] hover:bg-[#D9D9D9] text-[#0B0B0B] flex items-center justify-center cursor-pointer border border-[#D9D9D9]"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="text-xs font-bold text-[#0B0B0B] min-w-6 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, 1)}
                                      className="w-7 h-7 rounded-lg bg-[#F5F5F5] hover:bg-[#D9D9D9] text-[#0B0B0B] flex items-center justify-center cursor-pointer border border-[#D9D9D9]"
                                    >
                                      <Plus size={12} />
                                    </button>
                                    <span className="text-xs font-medium text-[#6B6762] capitalize ml-1">
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
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] flex items-center gap-2">
                        <Sparkles size={14} className="text-[#0B0B0B]" />
                        {isEn ? `Requested Hand Samples (${sampleItems.length})` : `Muestras de Mano Solicitadas (Hand Samples) (${sampleItems.length})`}
                      </h4>

                      <div className="space-y-2">
                        {sampleItems.map((item) => {
                          const swatchStyle = getSwatchBackground(item.selectedColor);
                          return (
                            <div
                              key={item.id}
                              className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl p-3 flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-lg shrink-0 border border-[#D9D9D9]"
                                  style={swatchStyle}
                                ></div>
                                <div>
                                  <div className="text-xs font-bold text-[#0B0B0B]">
                                    {item.selectedColor.name} ({item.collectionName})
                                  </div>
                                  <div className="text-[10px] text-[#6B6762] font-bold">
                                    {isEn ? 'Physical Hand Sample Available' : 'Muestra de Mano Físicamente Disponible'}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-[#6B6762] hover:text-red-500 p-1 cursor-pointer"
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
                      className="text-xs text-[#6B6762] hover:text-red-500 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>{t('drawer.clearCart')}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('client')}
                      className="text-xs font-bold text-[#0B0B0B] hover:underline cursor-pointer"
                    >
                      {t('drawer.continueBtn')} →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: CLIENT INFO */}
              {activeTab === 'client' && (
                <div className="space-y-4">
                  <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl p-4 space-y-1">
                    <h4 className="text-xs font-bold text-[#0B0B0B]">
                      {isEn ? 'Project & Delivery Details' : 'Información del Proyecto'}
                    </h4>
                    <p className="text-[11px] text-[#6B6762]">
                      {isEn
                        ? 'Fill in your details to generate a formal quote or submit your direct order via WhatsApp or PDF.'
                        : 'Complete sus datos para generar la cotización formal o procesar su pedido directo por WhatsApp o PDF.'}
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label htmlFor={fullNameId} className="font-semibold text-[#0B0B0B] flex items-center justify-between mb-1">
                        <span>{t('drawer.fullName')} <span className="text-red-500">*</span></span>
                        {formErrors.fullName && (
                          <span className="text-red-600 text-[10px] font-bold">{formErrors.fullName}</span>
                        )}
                      </label>
                      <input
                        id={fullNameId}
                        type="text"
                        value={clientInfo.fullName}
                        onChange={(e) => {
                          onUpdateClientInfo({ fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder={isEn ? 'e.g. John Doe / Architect Carlos' : 'Ej. Arq. Carlos Mendoza / Juan Pérez'}
                        className={`w-full bg-[#F5F5F5] border rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:bg-white outline-none transition ${
                          formErrors.fullName ? 'border-red-500 ring-1 ring-red-400' : 'border-[#D9D9D9] focus:border-[#0B0B0B]'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={phoneId} className="font-semibold text-[#0B0B0B] flex items-center justify-between mb-1">
                          <span>{t('drawer.phone')} <span className="text-red-500">*</span></span>
                          {formErrors.phone && (
                            <span className="text-red-600 text-[10px] font-bold">{formErrors.phone}</span>
                          )}
                        </label>
                        <input
                          id={phoneId}
                          type="tel"
                          value={clientInfo.phone}
                          onChange={(e) => {
                            onUpdateClientInfo({ phone: e.target.value });
                            if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full bg-[#F5F5F5] border rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:bg-white outline-none transition ${
                            formErrors.phone ? 'border-red-500 ring-1 ring-red-400' : 'border-[#D9D9D9] focus:border-[#0B0B0B]'
                          }`}
                        />
                      </div>
                      <div>
                        <label htmlFor={emailId} className="font-semibold text-[#0B0B0B] flex items-center justify-between mb-1">
                          <span>{t('drawer.email')}</span>
                          {formErrors.email && (
                            <span className="text-red-600 text-[10px] font-bold">{formErrors.email}</span>
                          )}
                        </label>
                        <input
                          id={emailId}
                          type="email"
                          value={clientInfo.email}
                          onChange={(e) => {
                            onUpdateClientInfo({ email: e.target.value });
                            if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="contact@example.com"
                          className={`w-full bg-[#F5F5F5] border rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:bg-white outline-none transition ${
                            formErrors.email ? 'border-red-500 ring-1 ring-red-400' : 'border-[#D9D9D9] focus:border-[#0B0B0B]'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={companyOrRoleId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {t('drawer.companyRole')}
                        </label>
                        <input
                          id={companyOrRoleId}
                          type="text"
                          value={clientInfo.companyOrRole}
                          onChange={(e) => onUpdateClientInfo({ companyOrRole: e.target.value })}
                          placeholder={isEn ? 'General Contractor / Architect' : 'Constructora / Propietario'}
                          className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={projectCityId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {t('drawer.city')}
                        </label>
                        <input
                          id={projectCityId}
                          type="text"
                          value={clientInfo.projectCity}
                          onChange={(e) => onUpdateClientInfo({ projectCity: e.target.value })}
                          placeholder={isEn ? 'City & State' : 'Ciudad del proyecto'}
                          className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={projectAddressId} className="font-semibold text-[#0B0B0B] block mb-1">
                        {t('drawer.address')}
                      </label>
                      <input
                        id={projectAddressId}
                        type="text"
                        value={clientInfo.projectAddress}
                        onChange={(e) => onUpdateClientInfo({ projectAddress: e.target.value })}
                        placeholder={isEn ? 'Street, building number, suite or landmark' : 'Calle, número, urbanización o punto de referencia'}
                        className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={projectTypeId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {t('drawer.projectType')}
                        </label>
                        <select
                          id={projectTypeId}
                          value={clientInfo.projectType}
                          onChange={(e) =>
                            onUpdateClientInfo({
                              projectType: e.target.value as ClientOrderInfo['projectType'],
                            })
                          }
                          className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none cursor-pointer"
                        >
                          <option value="Residencial">{isEn ? 'Residential' : 'Residencial'}</option>
                          <option value="Comercial">{isEn ? 'Commercial' : 'Comercial'}</option>
                          <option value="Contratista">{isEn ? 'Contractor / Builder' : 'Contratista'}</option>
                          <option value="Diseño / Arquitectura">{isEn ? 'Design / Architecture' : 'Diseño / Arquitectura'}</option>
                          <option value="Otro">{isEn ? 'Other' : 'Otro'}</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor={deliveryTimeframeId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {t('drawer.deliveryTime')}
                        </label>
                        <input
                          id={deliveryTimeframeId}
                          type="text"
                          value={clientInfo.deliveryTimeframe}
                          onChange={(e) => onUpdateClientInfo({ deliveryTimeframe: e.target.value })}
                          placeholder={isEn ? 'Immediate / In 2 weeks' : 'Inmediato / En 2 semanas'}
                          className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none"
                        />
                      </div>
                    </div>

                    {/* Needs Installation Checkbox */}
                    <div className="p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id={needsInstallationId}
                        checked={clientInfo.needsInstallation}
                        onChange={(e) => onUpdateClientInfo({ needsInstallation: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#0B0B0B] rounded cursor-pointer"
                      />
                      <label htmlFor={needsInstallationId} className="text-xs text-[#0B0B0B] cursor-pointer">
                        <span className="font-bold block text-[#0B0B0B]">
                          {t('drawer.includeInstallation')}
                        </span>
                        <span className="text-[11px] text-[#6B6762]">
                          {isEn
                            ? 'Our certified technicians perform leveling, laying, acoustic underlay, and transitions.'
                            : 'Nuestros técnicos certificados realizarán la nivelación, colocación y terminaciones.'}
                        </span>
                      </label>
                    </div>

                    <div>
                      <label htmlFor={additionalNotesId} className="font-semibold text-[#0B0B0B] block mb-1">
                        {t('drawer.notes')}
                      </label>
                      <textarea
                        id={additionalNotesId}
                        rows={2}
                        value={clientInfo.additionalNotes}
                        onChange={(e) => onUpdateClientInfo({ additionalNotes: e.target.value })}
                        placeholder={isEn ? 'e.g. Specific stair measurements, custom cut, site delivery details...' : 'Ej. Medidas específicas de gradas, corte especial, acceso al edificio...'}
                        className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none"
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
          <div className="p-6 border-t border-[#D9D9D9] bg-white space-y-3">
            {/* Direct WhatsApp Order */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#0B0B0B] hover:bg-[#262626] text-white font-extrabold text-sm shadow-xs transition flex items-center justify-center gap-2 transform active:scale-98 cursor-pointer"
            >
              <Send size={18} className="text-white" />
              <span>{t('drawer.submitWhatsApp')}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Print / Save PDF */}
              <button
                onClick={handlePrint}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border border-[#D9D9D9] text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Printer size={15} />
                <span>{t('drawer.printPDF')}</span>
              </button>

              {/* Copy Summary */}
              <button
                onClick={handleCopySummary}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  copied
                    ? 'bg-[#F5F5F5] text-[#0B0B0B] border-[#0B0B0B]'
                    : 'bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border-[#D9D9D9]'
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? (isEn ? 'Copied!' : '¡Copiado!') : t('drawer.copySummary')}</span>
              </button>
            </div>

            {submitted && (
              <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl text-center text-xs text-[#0B0B0B] font-medium">
                {isEn
                  ? '✓ WhatsApp opened with your quote breakdown. An advisor will contact you shortly!'
                  : '✓ Se ha abierto WhatsApp con el desglose de su pedido. ¡Pronto un asesor le contactará!'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
