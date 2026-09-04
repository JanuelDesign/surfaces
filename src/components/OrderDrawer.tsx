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
  User,
  Mail,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { OrderItem, ClientOrderInfo, ProductColor } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { formatImageUrl } from '../utils/imageUrlFormatter';
import { generatePlankSVG } from '../utils/imageCatalog';
import { roundNumber, formatCleanNumber } from '../utils/numberUtils';
import { sendQuoteOrderEmail } from '../services/emailService';

/**
 * Validates international phone numbers:
 * - Accepts only digits, spaces, hyphens, parentheses, and the + sign
 * - Must have between 7 and 15 digits (E.164 standard)
 */
export const validatePhoneNumber = (phone: string, isEn: boolean): string | null => {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return isEn ? 'Phone / WhatsApp is required' : 'El teléfono / WhatsApp es obligatorio';
  }

  // Reject characters that are NOT digits, spaces, hyphens, parentheses, or +
  const allowedCharsPattern = /^[0-9+\-()\s]+$/;
  if (!allowedCharsPattern.test(trimmed)) {
    return isEn
      ? 'Enter a valid phone number (digits, +, -, (), and spaces only)'
      : 'Ingresa un número de teléfono válido (solo dígitos, +, -, () y espacios)';
  }

  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    return isEn
      ? 'Phone number must have at least 7 digits'
      : 'El número de teléfono debe tener al menos 7 dígitos';
  }
  if (digitsOnly.length > 15) {
    return isEn
      ? 'Phone number cannot exceed 15 digits'
      : 'El número de teléfono no puede superar los 15 dígitos';
  }

  return null;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  clientInfo: ClientOrderInfo;
  onUpdateClientInfo: (info: Partial<ClientOrderInfo>) => void;
  onSelectCategory?: (category: string) => void;
}

/**
 * Renders the real variant photo with fallback to dynamic SVG
 */
const CartProductThumb: React.FC<{
  color: ProductColor;
  collectionName: string;
  size?: 'sm' | 'md';
}> = ({ color, collectionName, size = 'md' }) => {
  const [hasError, setHasError] = useState(false);
  const plankPhoto = formatImageUrl(color.image);
  const roomPhoto = formatImageUrl(color.roomImage);
  const mainPhoto = plankPhoto || roomPhoto;

  const fallbackSvg = generatePlankSVG(
    color.hexColor || '#c7b28e',
    color.secondaryHex || '#8c7355',
    'rgba(0,0,0,0.22)',
    color.patternType || 'wood'
  );

  const dimensions = size === 'sm' ? 'w-11 h-11 rounded-xl' : 'w-16 h-16 rounded-xl';

  return (
    <div
      className={`${dimensions} shrink-0 border border-[#D9D9D9] bg-[#0B0B0B] overflow-hidden relative shadow-inner flex items-center justify-center`}
    >
      <img
        src={!hasError && mainPhoto ? mainPhoto : fallbackSvg}
        alt={`${collectionName} - ${color.name}`}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const OrderDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  clientInfo,
  onUpdateClientInfo,
  onSelectCategory,
}) => {
  const { language } = useLanguage();
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

  // Wizard state: Step 1 (Materials & Samples) -> Step 2 (Project & Contact Info)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappSubmitted, setWhatsappSubmitted] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [formErrors, setFormErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});

  if (!isOpen) return null;

  const quoteItems = orderItems.filter((i) => i.itemType === 'order');
  const sampleItems = orderItems.filter((i) => i.itemType === 'sample');

  const totalBoxes = quoteItems
    .filter((i) => i.unit === 'boxes')
    .reduce((sum, i) => sum + i.quantity, 0);

  const totalPieces = quoteItems
    .filter((i) => i.unit === 'pieces')
    .reduce((sum, i) => sum + i.quantity, 0);

  const totalEstSqft = roundNumber(quoteItems.reduce((sum, i) => sum + (i.estimatedSqft || 0), 0), 2);
  const totalEstLinearFt = roundNumber(quoteItems.reduce((sum, i) => sum + (i.estimatedLinearFt || 0), 0), 2);

  // Validate form fields
  const validateClientForm = (): boolean => {
    const errors: { fullName?: string; phone?: string; email?: string } = {};

    if (!clientInfo.fullName || clientInfo.fullName.trim().length < 2) {
      errors.fullName = isEn
        ? 'Full Name is required (minimum 2 characters)'
        : 'El Nombre Completo es obligatorio (mínimo 2 caracteres)';
    }

    const phoneError = validatePhoneNumber(clientInfo.phone || '', isEn);
    if (phoneError) {
      errors.phone = phoneError;
    }

    if (clientInfo.email && clientInfo.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientInfo.email.trim())) {
        errors.email = isEn
          ? 'Please enter a valid email address'
          : 'Por favor ingrese un correo electrónico válido';
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setCurrentStep(2);
      return false;
    }
    return true;
  };

  // Generate clean WhatsApp & Email message
  const generateOrderSummary = () => {
    let text = isEn
      ? `*QUICK SURFACES - ORDER & QUOTE REQUEST*\n\n`
      : `*QUICK SURFACES - SOLICITUD DE COTIZACIÓN Y PEDIDO*\n\n`;

    text += isEn
      ? `*Client:* ${clientInfo.fullName || 'Not specified'}\n`
      : `*Cliente:* ${clientInfo.fullName || 'No especificado'}\n`;

    if (clientInfo.companyOrRole) {
      text += isEn
        ? `*Company / Role:* ${clientInfo.companyOrRole}\n`
        : `*Empresa / Rol:* ${clientInfo.companyOrRole}\n`;
    }

    text += isEn
      ? `*Phone / WhatsApp:* ${clientInfo.phone || 'Not specified'}\n`
      : `*Teléfono / WhatsApp:* ${clientInfo.phone || 'No especificado'}\n`;

    if (clientInfo.email) text += `*Email:* ${clientInfo.email}\n`;
    if (clientInfo.projectCity) {
      text += isEn
        ? `*City / Project Location:* ${clientInfo.projectCity}\n`
        : `*Ciudad / Proyecto:* ${clientInfo.projectCity}\n`;
    }
    if (clientInfo.projectAddress) {
      text += isEn
        ? `*Delivery Address:* ${clientInfo.projectAddress}\n`
        : `*Dirección de Entrega:* ${clientInfo.projectAddress}\n`;
    }
    if (clientInfo.projectType) {
      text += isEn
        ? `*Project Type:* ${clientInfo.projectType}\n`
        : `*Tipo de Proyecto:* ${clientInfo.projectType}\n`;
    }
    if (clientInfo.deliveryTimeframe) {
      text += isEn
        ? `*Delivery Timeframe:* ${clientInfo.deliveryTimeframe}\n`
        : `*Tiempo de Entrega:* ${clientInfo.deliveryTimeframe}\n`;
    }
    if (clientInfo.needsInstallation) {
      text += isEn
        ? `*Installation Service:* Yes, requested\n`
        : `*Servicio de Instalación:* Sí, solicitado\n`;
    }

    text += isEn ? `\n*--- REQUESTED MATERIALS & SAMPLES ---*\n` : `\n*--- MATERIALES Y MUESTRAS SOLICITADAS ---*\n`;

    if (quoteItems.length > 0) {
      text += isEn ? `\n*📦 MAIN MATERIAL / ORDERS:*\n` : `\n*📦 MATERIAL PRINCIPAL / PEDIDOS:*\n`;
      quoteItems.forEach((item, idx) => {
        const colorDisplay = item.selectedColor.code && item.selectedColor.code !== item.selectedColor.name
          ? `${item.selectedColor.name} (${item.selectedColor.code})`
          : (item.selectedColor.code || item.selectedColor.name);
        text += `${idx + 1}. *${item.collectionName}* - ${colorDisplay}\n`;
        const unitLabel =
          item.unit === 'pieces'
            ? isEn
              ? item.quantity === 1 ? 'piece' : 'pieces'
              : item.quantity === 1 ? 'pieza' : 'piezas'
            : isEn
            ? item.quantity === 1 ? 'box' : 'boxes'
            : item.quantity === 1 ? 'caja' : 'cajas';

        text += isEn
          ? `   • Quantity: ${item.quantity} ${unitLabel}\n`
          : `   • Cantidad: ${item.quantity} ${unitLabel}\n`;
        if (item.estimatedLinearFt) {
          text += isEn
            ? `   • Coverage: ${formatCleanNumber(item.estimatedLinearFt)} linear ft covered\n`
            : `   • Cobertura: ${formatCleanNumber(item.estimatedLinearFt)} pies lineales cubiertos\n`;
        } else if (item.estimatedSqft) {
          text += isEn
            ? `   • Estimated: ≈ ${formatCleanNumber(item.estimatedSqft)} sqft\n`
            : `   • Estimado: ≈ ${formatCleanNumber(item.estimatedSqft)} sqft\n`;
        }
        if (item.notes) {
          text += isEn ? `   • Note: ${item.notes}\n` : `   • Nota: ${item.notes}\n`;
        }
      });
      const totalsSummary: string[] = [];
      if (totalBoxes > 0) totalsSummary.push(`${totalBoxes} ${isEn ? (totalBoxes === 1 ? 'box' : 'boxes') : (totalBoxes === 1 ? 'caja' : 'cajas')}`);
      if (totalPieces > 0) totalsSummary.push(`${totalPieces} ${isEn ? (totalPieces === 1 ? 'piece' : 'pieces') : (totalPieces === 1 ? 'pieza' : 'piezas')}`);
      if (totalEstSqft > 0) totalsSummary.push(`≈ ${formatCleanNumber(totalEstSqft)} sqft`);
      if (totalEstLinearFt > 0) totalsSummary.push(`≈ ${formatCleanNumber(totalEstLinearFt)} linear ft`);

      text += isEn
        ? `\n*Total:* ${totalsSummary.join(' | ')}\n`
        : `\n*Total:* ${totalsSummary.join(' | ')}\n`;
    }

    if (sampleItems.length > 0) {
      text += isEn
        ? `\n*🏷️ REQUESTED HAND SAMPLES:*\n`
        : `\n*🏷️ MUESTRAS DE MANO SOLICITADAS (HAND SAMPLES):*\n`;
      sampleItems.forEach((item, idx) => {
        const colorDisplay = item.selectedColor.code && item.selectedColor.code !== item.selectedColor.name
          ? `${item.selectedColor.name} (${item.selectedColor.code})`
          : (item.selectedColor.code || item.selectedColor.name);
        text += `${idx + 1}. *${item.collectionName}* - ${colorDisplay} (${isEn ? 'Hand sample' : 'Muestra física'})\n`;
      });
    }

    if (clientInfo.additionalNotes) {
      text += isEn
        ? `\n*Project Notes:* ${clientInfo.additionalNotes}\n`
        : `\n*Notas del Proyecto:* ${clientInfo.additionalNotes}\n`;
    }

    text += isEn
      ? `\n_Generated via Quick Surfaces | WhatsApp: (786) 658-3677 | marketingquicksurfaces@gmail.com_`
      : `\n_Generado vía Quick Surfaces | WhatsApp: (786) 658-3677 | marketingquicksurfaces@gmail.com_`;
    return text;
  };

  const handleSendWhatsApp = () => {
    if (!validateClientForm()) return;
    setEmailError(null);
    const text = generateOrderSummary();
    const encoded = encodeURIComponent(text);
    // Directly targeted to Quick Surfaces WhatsApp number: (786) 658-3677
    const whatsappUrl = `https://wa.me/17866583677?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    setWhatsappSubmitted(true);
    setSubmitted(true);
  };

  const handleSendEmail = async () => {
    if (isSendingEmail) return;
    if (!validateClientForm()) return;

    setIsSendingEmail(true);
    setEmailError(null);
    setEmailSuccess(false);
    setSubmitted(false);

    const summary = generateOrderSummary();

    try {
      const result = await sendQuoteOrderEmail({
        clientInfo,
        orderItems,
        orderSummaryText: summary,
        isEn,
      });

      setIsSendingEmail(false);

      if (result.success) {
        setEmailSuccess(true);
        setEmailError(null);

        // Clear all form fields
        onUpdateClientInfo({
          fullName: '',
          companyOrRole: '',
          phone: '',
          email: '',
          projectCity: '',
          projectAddress: '',
          needsInstallation: false,
          projectType: 'Residential',
          deliveryTimeframe: 'Immediate',
          additionalNotes: '',
        });

        // Clear quote items / cart
        onClearOrder();
        setPhoneTouched(false);
        setFormErrors({});
      } else {
        // Keep all form inputs intact if sending failed
        setEmailError(
          result.error ||
            (isEn
              ? 'Unable to deliver email automatically. Please check your connection or send via WhatsApp.'
              : 'No se pudo entregar el correo automáticamente. Por favor revise su conexión o envíe por WhatsApp.')
        );
      }
    } catch {
      setIsSendingEmail(false);
      setEmailError(
        isEn
          ? 'Network error while delivering email. Please try again or send via WhatsApp.'
          : 'Error de red al entregar el correo. Por favor intente de nuevo o use WhatsApp.'
      );
    }
  };

  const handleCopySummary = () => {
    const text = generateOrderSummary();
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
        {/* Drawer Header - Short, clean, visually balanced with homogeneous buttons */}
        <div className="px-6 py-4 border-b border-[#D9D9D9] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Left Cart Icon - Homogeneous size & style */}
            <div className="w-9 h-9 rounded-xl bg-[#F5F5F5] border border-[#D9D9D9] flex items-center justify-center text-[#0B0B0B] shrink-0 shadow-xs">
              <ShoppingCart size={18} className="text-[#0B0B0B]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0B0B0B] leading-tight">
                {isEn ? 'Your Quote' : 'Tu cotización'}
              </h2>
              <p className="text-[11px] text-[#6B6762] font-medium leading-none mt-0.5">
                {orderItems.length === 0
                  ? isEn
                    ? '0 items selected'
                    : '0 productos seleccionados'
                  : isEn
                  ? `${orderItems.length} ${orderItems.length === 1 ? 'item' : 'items'} • Step ${currentStep} of 2`
                  : `${orderItems.length} ${orderItems.length === 1 ? 'producto' : 'productos'} • Paso ${currentStep} de 2`}
              </p>
            </div>
          </div>

          {/* Right Close Button - Homogeneous size & style */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#F5F5F5] hover:bg-[#0B0B0B] hover:text-white border border-[#D9D9D9] flex items-center justify-center text-[#0B0B0B] transition cursor-pointer shrink-0"
            aria-label="Close quote drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Progress Wizard Bar with visual progress tracking */}
        {orderItems.length > 0 && (
          <div className="px-4 sm:px-6 py-3 bg-[#F5F5F5] border-b border-[#D9D9D9] space-y-2">
            {/* Simple clear progress indicator text */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#0B0B0B]">
                {isEn ? `Step ${currentStep} of 2` : `Paso ${currentStep} de 2`}
              </span>
              <span className="text-[11px] font-semibold text-[#6B6762]">
                {currentStep === 1
                  ? isEn
                    ? 'Review Materials & Hand Samples'
                    : 'Revisar Materiales y Muestras'
                  : isEn
                  ? 'Project Details & Delivery'
                  : 'Datos de Contacto y Envío'}
              </span>
            </div>

            {/* Visual animated progress bar line */}
            <div className="w-full h-1.5 bg-[#D9D9D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0B0B0B] transition-all duration-300 rounded-full"
                style={{ width: currentStep === 1 ? '50%' : '100%' }}
              />
            </div>

            {/* Interactive Step Navigation Buttons */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 text-xs w-full pt-1">
              {/* Step 1 Pill */}
              <button
                onClick={() => setCurrentStep(1)}
                className={`flex-1 min-w-0 py-2 px-2 sm:px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition cursor-pointer border min-h-[40px] ${
                  currentStep === 1
                    ? 'bg-[#0B0B0B] text-white border-[#0B0B0B] shadow-xs'
                    : 'bg-white text-[#6B6762] border-[#D9D9D9] hover:text-[#0B0B0B]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    currentStep === 1
                      ? 'bg-white text-[#0B0B0B]'
                      : currentStep === 2
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#F5F5F5] text-[#6B6762] border border-[#D9D9D9]'
                  }`}
                >
                  {currentStep === 2 ? <Check size={11} /> : '1'}
                </span>
                <span className="whitespace-nowrap font-bold text-[11px] sm:text-xs">
                  {isEn ? '1. Materials' : '1. Materiales'}
                </span>
              </button>

              <ChevronRight size={14} className="text-[#BCBAB4] shrink-0" />

              {/* Step 2 Pill */}
              <button
                onClick={() => setCurrentStep(2)}
                className={`flex-1 min-w-0 py-2 px-2 sm:px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition cursor-pointer border min-h-[40px] ${
                  currentStep === 2
                    ? 'bg-[#0B0B0B] text-white border-[#0B0B0B] shadow-xs'
                    : 'bg-white text-[#6B6762] border-[#D9D9D9] hover:text-[#0B0B0B]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    currentStep === 2
                      ? 'bg-white text-[#0B0B0B]'
                      : 'bg-[#F5F5F5] text-[#6B6762] border border-[#D9D9D9]'
                  }`}
                >
                  2
                </span>
                <span className="whitespace-nowrap font-bold text-[11px] sm:text-xs">
                  {isEn ? '2. Contact & Delivery' : '2. Contacto y Envío'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {emailSuccess ? (
            <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-white border border-emerald-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-xs">
                  <Check size={32} className="stroke-[3]" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-extrabold text-[#0B0B0B]">
                    {isEn
                      ? '✓ Request sent successfully!'
                      : '✓ ¡Solicitud enviada con éxito!'}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {isEn
                      ? 'An advisor will contact you shortly.'
                      : 'Un asesor le contactará a la brevedad.'}
                  </p>
                  <p className="text-xs text-[#6B6762] leading-relaxed">
                    {isEn
                      ? 'Your quote specifications were automatically dispatched to marketingquicksurfaces@gmail.com. We have cleared your quote list so you are ready for a new order.'
                      : 'Su cotización fue transmitida automáticamente a marketingquicksurfaces@gmail.com. El carrito se ha limpiado para nuevos pedidos.'}
                  </p>
                </div>

                <div className="pt-2 w-full space-y-2">
                  <button
                    onClick={() => {
                      setEmailSuccess(false);
                      onClose();
                    }}
                    className="w-full min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold shadow-xs cursor-pointer transition flex items-center justify-center gap-2"
                  >
                    <span>{isEn ? 'Continue Browsing Catalog' : 'Continuar Viendo Catálogo'}</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setEmailSuccess(false);
                      setCurrentStep(1);
                    }}
                    className="w-full min-h-[44px] px-6 py-2 rounded-xl bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#0B0B0B] text-xs font-semibold border border-[#D9D9D9] cursor-pointer transition"
                  >
                    {isEn ? 'Start a New Quote' : 'Crear Nueva Cotización'}
                  </button>
                </div>
              </div>
            </div>
          ) : orderItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-6">
              <div className="bg-[#FBFBFA] border border-[#D9D9D9] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xs flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#0B0B0B] border border-[#D9D9D9] shadow-xs">
                  <ShoppingCart size={28} className="text-[#0B0B0B]" />
                </div>
                <div className="space-y-1.5 text-center">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0B0B0B]">
                    {isEn ? 'Your quote list is empty' : 'Tu lista de cotización está vacía'}
                  </h3>
                  <p className="text-xs text-[#6B6762] leading-relaxed">
                    {isEn
                      ? 'Browse our architectural SPC flooring collections, matching moldings, stair steps, or order free physical hand samples.'
                      : 'Explora nuestras colecciones de pisos SPC Rigid Core, gradas para escaleras, zócalos o solicita muestras físicas sin costo.'}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold shadow-xs cursor-pointer transition flex items-center justify-center gap-2"
                >
                  <span>{isEn ? 'Explore Full Catalog' : 'Explorar Catálogo Completo'}</span>
                  <ArrowRight size={14} />
                </button>

                {/* Quick Category Shortcuts */}
                <div className="pt-4 border-t border-[#E5E5E5] w-full">
                  <p className="text-[10px] uppercase font-bold text-[#6B6762] tracking-wider mb-2 text-center">
                    {isEn ? 'Or jump directly to a collection:' : 'O ingresa directo a una categoría:'}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCategory?.('spc-vinyl');
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-[#F5F5F5] border border-[#D9D9D9] text-left transition cursor-pointer min-h-[44px]"
                    >
                      <div className="text-[11px] font-bold text-[#0B0B0B]">SPC Flooring</div>
                      <div className="text-[10px] text-[#6B6762]">5.5mm • 6.0mm • 8.0mm</div>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCategory?.('stair-steps');
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-[#F5F5F5] border border-[#D9D9D9] text-left transition cursor-pointer min-h-[44px]"
                    >
                      <div className="text-[11px] font-bold text-[#0B0B0B]">{isEn ? 'Stair Steps' : 'Gradas'}</div>
                      <div className="text-[10px] text-[#6B6762]">{isEn ? 'Square nose & flush' : 'Nariz cuadrada'}</div>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCategory?.('moldings');
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-[#F5F5F5] border border-[#D9D9D9] text-left transition cursor-pointer min-h-[44px]"
                    >
                      <div className="text-[11px] font-bold text-[#0B0B0B]">{isEn ? 'Moldings' : 'Molduras'}</div>
                      <div className="text-[10px] text-[#6B6762]">{isEn ? 'T-Molding • Reducer' : 'T-Molding • Reducer'}</div>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCategory?.('baseboards');
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-[#F5F5F5] border border-[#D9D9D9] text-left transition cursor-pointer min-h-[44px]"
                    >
                      <div className="text-[11px] font-bold text-[#0B0B0B]">{isEn ? 'Baseboards' : 'Zócalos'}</div>
                      <div className="text-[10px] text-[#6B6762]">{isEn ? 'Rodapiés de acabado' : 'Rodapiés de acabado'}</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: MATERIALS & SAMPLES */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-3 gap-2 bg-[#F5F5F5] p-3 rounded-2xl border border-[#D9D9D9] text-center">
                    <div>
                      <div className="text-[10px] text-[#6B6762] uppercase font-semibold">
                        {totalBoxes > 0 && totalPieces > 0
                          ? isEn ? 'Boxes / Pieces' : 'Cajas / Piezas'
                          : totalPieces > 0
                          ? isEn ? 'Total Pieces' : 'Total Piezas'
                          : isEn ? 'Total Boxes' : 'Total Cajas'}
                      </div>
                      <div className="text-lg font-extrabold text-[#0B0B0B]">
                        {totalBoxes > 0 && totalPieces > 0
                          ? `${totalBoxes} / ${totalPieces}`
                          : totalPieces > 0
                          ? totalPieces
                          : totalBoxes}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6B6762] uppercase font-semibold">
                        {totalEstLinearFt > 0 && totalEstSqft > 0
                          ? isEn ? 'Coverage' : 'Metraje'
                          : totalEstLinearFt > 0
                          ? isEn ? 'Linear Ft' : 'Pies Lineales'
                          : isEn ? 'Est. Sqft' : 'Sqft Estimado'}
                      </div>
                      <div className="text-lg font-extrabold text-[#0B0B0B]">
                        {totalEstLinearFt > 0 && totalEstSqft > 0
                          ? `${formatCleanNumber(totalEstSqft)} sf / ${formatCleanNumber(totalEstLinearFt)} lf`
                          : totalEstLinearFt > 0
                          ? `${formatCleanNumber(totalEstLinearFt)} ft`
                          : formatCleanNumber(totalEstSqft)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6B6762] uppercase font-semibold">
                        {isEn ? 'Hand Samples' : 'Muestras'}
                      </div>
                      <div className="text-lg font-extrabold text-[#0B0B0B]">
                        {sampleItems.length}
                      </div>
                    </div>
                  </div>

                  {/* Section: Material & Flooring Orders */}
                  {quoteItems.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] flex items-center gap-2">
                        <Package size={14} className="text-[#0B0B0B]" />
                        {isEn
                          ? `Project Material & Orders (${quoteItems.length})`
                          : `Material & Pedidos para Proyecto (${quoteItems.length})`}
                      </h4>

                      <div className="space-y-2.5">
                        {quoteItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white border border-[#D9D9D9] rounded-2xl p-3.5 shadow-xs hover:border-[#0B0B0B] transition flex items-start gap-3.5"
                          >
                            {/* Real Product Photo Thumbnail */}
                            <CartProductThumb
                              color={item.selectedColor}
                              collectionName={item.collectionName}
                              size="md"
                            />

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="truncate">
                                  <span className="text-[10px] uppercase font-bold text-[#6B6762]">
                                    {item.collectionName}
                                  </span>
                                  <div className="text-sm font-bold text-[#0B0B0B] truncate">
                                    {item.selectedColor.name}{' '}
                                    {item.selectedColor.code && item.selectedColor.code !== item.selectedColor.name && (
                                      <span className="text-[11px] font-mono text-[#6B6762] font-normal">
                                        ({item.selectedColor.code})
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="w-9 h-9 min-h-[36px] min-w-[36px] rounded-xl text-[#6B6762] hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition cursor-pointer"
                                  title={isEn ? 'Delete item' : 'Eliminar'}
                                  aria-label={isEn ? 'Delete item' : 'Eliminar'}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>

                              {/* Estimated coverage & notes */}
                              <div className="text-[11px] text-[#6B6762] mt-1 space-y-0.5">
                                {item.estimatedLinearFt ? (
                                  <div className="font-semibold text-[#0B0B0B] flex items-center gap-1.5 flex-wrap">
                                    <span className="bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide">
                                      {isEn ? 'Linear Coverage' : 'Metraje Lineal'}
                                    </span>
                                    <span>
                                      {formatCleanNumber(item.estimatedLinearFt)} {isEn ? 'linear ft covered' : 'pies lineales cubiertos'} ({item.quantity} {item.quantity === 1 ? (isEn ? 'piece' : 'pieza') : (isEn ? 'pieces' : 'piezas')})
                                    </span>
                                  </div>
                                ) : item.estimatedSqft ? (
                                  <div className="font-semibold text-[#0B0B0B]">
                                    ≈ {formatCleanNumber(item.estimatedSqft)} sqft ({item.quantity} {item.quantity === 1 ? (isEn ? 'box' : 'caja') : (isEn ? 'boxes' : 'cajas')})
                                  </div>
                                ) : (
                                  <div className="font-semibold text-[#0B0B0B]">
                                    {item.quantity} {item.unit === 'pieces' ? (item.quantity === 1 ? (isEn ? 'piece' : 'pieza') : (isEn ? 'pieces' : 'piezas')) : (isEn ? 'units' : 'unidades')}
                                  </div>
                                )}
                                {item.notes && <div className="text-[#6B6762] text-[11px]">{item.notes}</div>}
                              </div>

                              {/* Quantity controls */}
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D9D9D9]">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="w-8 h-8 sm:w-9 sm:h-9 min-w-[36px] min-h-[36px] rounded-xl bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#0B0B0B] flex items-center justify-center cursor-pointer border border-[#D9D9D9] transition active:scale-95"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={13} />
                                  </button>
                                  <span className="text-xs font-bold text-[#0B0B0B] min-w-7 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="w-8 h-8 sm:w-9 sm:h-9 min-w-[36px] min-h-[36px] rounded-xl bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#0B0B0B] flex items-center justify-center cursor-pointer border border-[#D9D9D9] transition active:scale-95"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={13} />
                                  </button>
                                  <span className="text-xs font-medium text-[#6B6762] ml-1">
                                    {item.unit === 'pieces'
                                      ? item.quantity === 1 ? (isEn ? 'piece' : 'pieza') : (isEn ? 'pieces' : 'piezas')
                                      : item.quantity === 1 ? (isEn ? 'box' : 'caja') : (isEn ? 'boxes' : 'cajas')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section: Hand Samples */}
                  {sampleItems.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] flex items-center gap-2">
                        <Sparkles size={14} className="text-[#0B0B0B]" />
                        {isEn
                          ? `Requested Hand Samples (${sampleItems.length})`
                          : `Muestras Físicas Solicitadas (${sampleItems.length})`}
                      </h4>

                      <div className="space-y-2">
                        {sampleItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl p-3 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              {/* Real Product Photo Thumbnail */}
                              <CartProductThumb
                                color={item.selectedColor}
                                collectionName={item.collectionName}
                                size="sm"
                              />
                              <div>
                                <div className="text-xs font-bold text-[#0B0B0B]">
                                  {item.selectedColor.name} ({item.collectionName})
                                </div>
                                <div className="text-[10px] text-[#6B6762] font-semibold">
                                  {isEn
                                    ? 'Physical Hand Sample Available'
                                    : 'Muestra Física Disponible para Envío'}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="w-9 h-9 min-h-[36px] min-w-[36px] rounded-xl text-[#6B6762] hover:text-red-600 hover:bg-red-100 flex items-center justify-center transition cursor-pointer"
                              title={isEn ? 'Delete sample' : 'Eliminar muestra'}
                              aria-label={isEn ? 'Delete sample' : 'Eliminar muestra'}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1 Bottom Action Row with safe inline confirmation */}
                  <div className="pt-4 border-t border-[#D9D9D9] flex items-center justify-between gap-3 flex-wrap">
                    {isConfirmingClear ? (
                      <div className="flex items-center gap-2 animate-in fade-in py-1">
                        <span className="text-xs font-bold text-red-600">
                          {isEn ? 'Clear all items?' : '¿Vaciar la lista?'}
                        </span>
                        <button
                          onClick={() => {
                            onClearOrder();
                            setIsConfirmingClear(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer transition min-h-[36px]"
                        >
                          {isEn ? 'Yes, clear' : 'Sí, vaciar'}
                        </button>
                        <button
                          onClick={() => setIsConfirmingClear(false)}
                          className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0B] border border-[#D9D9D9] text-xs font-bold hover:bg-[#E5E5E5] cursor-pointer transition min-h-[36px]"
                        >
                          {isEn ? 'Cancel' : 'Cancelar'}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsConfirmingClear(true)}
                        className="text-xs text-[#6B6762] hover:text-red-600 transition flex items-center gap-1.5 cursor-pointer py-2 px-2 min-h-[44px]"
                      >
                        <Trash2 size={14} />
                        <span>{isEn ? 'Clear All' : 'Vaciar lista'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="py-3 px-6 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs min-h-[44px] ml-auto"
                    >
                      <span>{isEn ? 'Next: Contact Info' : 'Siguiente: Contacto'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PROJECT & CONTACT INFORMATION */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  {/* Top Back Nav & Quick Summary Pill */}
                  <div className="flex items-center justify-between bg-white pb-2 border-b border-[#D9D9D9]">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-[#0B0B0B] hover:underline flex items-center gap-1.5 cursor-pointer py-1"
                    >
                      <ArrowLeft size={14} />
                      <span>{isEn ? 'Back to Materials' : 'Volver a Materiales'}</span>
                    </button>
                    <span className="text-[11px] font-semibold text-[#6B6762] bg-[#F5F5F5] px-2.5 py-1 rounded-lg border border-[#D9D9D9]">
                      {totalBoxes > 0 && `${totalBoxes} ${isEn ? (totalBoxes === 1 ? 'box' : 'boxes') : (totalBoxes === 1 ? 'caja' : 'cajas')}`}
                      {totalBoxes > 0 && totalPieces > 0 && ' • '}
                      {totalPieces > 0 && `${totalPieces} ${isEn ? (totalPieces === 1 ? 'piece' : 'pieces') : (totalPieces === 1 ? 'pieza' : 'piezas')}`}
                      {totalEstSqft > 0 && ` • ≈ ${formatCleanNumber(totalEstSqft)} sqft`}
                      {totalEstLinearFt > 0 && ` • ≈ ${formatCleanNumber(totalEstLinearFt)} linear ft`}
                    </span>
                  </div>

                  <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-2xl p-4 space-y-1">
                    <h4 className="text-xs font-bold text-[#0B0B0B] flex items-center gap-1.5">
                      <User size={14} className="text-[#0B0B0B]" />
                      <span>{isEn ? 'Project & Delivery Information' : 'Información del Proyecto y Entrega'}</span>
                    </h4>
                    <p className="text-[11px] text-[#6B6762]">
                      {isEn
                        ? 'Fill in your project details to send your direct quote request via WhatsApp, Email, or generate a PDF.'
                        : 'Complete los datos para enviar su solicitud directa por WhatsApp, Correo o generar un PDF oficial.'}
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label htmlFor={fullNameId} className="font-semibold text-[#0B0B0B] block mb-1">
                        {isEn ? 'Full Name / Contact' : 'Nombre Completo / Contacto'}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={fullNameId}
                        type="text"
                        autoComplete="name"
                        value={clientInfo.fullName}
                        onChange={(e) => {
                          onUpdateClientInfo({ fullName: e.target.value });
                          if (formErrors.fullName)
                            setFormErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder={
                          isEn ? 'e.g. John Doe / Architect Carlos' : 'Ej. Arq. Carlos Mendoza / Juan Pérez'
                        }
                        className={`w-full min-h-[44px] bg-[#F5F5F5] border rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:bg-white outline-none transition ${
                          formErrors.fullName
                            ? 'border-red-500 ring-1 ring-red-400 bg-red-50/20'
                            : 'border-[#D9D9D9] focus:border-[#0B0B0B]'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-red-500 text-[11px] font-medium mt-1">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={phoneId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {isEn ? 'Phone / WhatsApp' : 'Teléfono / WhatsApp'}{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id={phoneId}
                          type="tel"
                          autoComplete="tel"
                          value={clientInfo.phone}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateClientInfo({ phone: val });
                            const digitsCount = val.replace(/\D/g, '').length;
                            const hasInvalidChars = !/^[0-9+\-()\s]*$/.test(val);
                            // Immediately validate on invalid characters, over-length, or if touched
                            if (phoneTouched || hasInvalidChars || digitsCount > 15) {
                              const err = validatePhoneNumber(val, isEn);
                              setFormErrors((prev) => ({ ...prev, phone: err || undefined }));
                            } else if (formErrors.phone && digitsCount >= 7 && digitsCount <= 15) {
                              setFormErrors((prev) => ({ ...prev, phone: undefined }));
                            }
                          }}
                          onBlur={() => {
                            setPhoneTouched(true);
                            const err = validatePhoneNumber(clientInfo.phone || '', isEn);
                            setFormErrors((prev) => ({ ...prev, phone: err || undefined }));
                          }}
                          placeholder="(786) 658-3677"
                          className={`w-full min-h-[44px] bg-[#F5F5F5] border rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:bg-white outline-none transition ${
                            formErrors.phone
                              ? 'border-red-500 ring-1 ring-red-400 bg-red-50/20'
                              : 'border-[#D9D9D9] focus:border-[#0B0B0B]'
                          }`}
                        />
                        {formErrors.phone ? (
                          <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                            <AlertCircle size={12} className="shrink-0" />
                            <span>{formErrors.phone}</span>
                          </p>
                        ) : (
                          <p className="text-[#8C887B] text-[10px] mt-0.5">
                            {isEn
                              ? 'Accepted: digits, +, -, (), spaces (7 to 15 digits)'
                              : 'Acepta: dígitos, +, -, (), espacios (7 a 15 dígitos)'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={emailId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {isEn ? 'Email Address' : 'Correo Electrónico'}
                        </label>
                        <input
                          id={emailId}
                          type="email"
                          autoComplete="email"
                          value={clientInfo.email}
                          onChange={(e) => {
                            onUpdateClientInfo({ email: e.target.value });
                            if (formErrors.email)
                              setFormErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="client@example.com"
                          className={`w-full min-h-[44px] bg-[#F5F5F5] border rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:bg-white outline-none transition ${
                            formErrors.email
                              ? 'border-red-500 ring-1 ring-red-400 bg-red-50/20'
                              : 'border-[#D9D9D9] focus:border-[#0B0B0B]'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-[11px] font-medium mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={companyOrRoleId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {isEn ? 'Company / Role' : 'Empresa o Rol'}
                        </label>
                        <select
                          id={companyOrRoleId}
                          value={
                            ['Architect', 'Contractor', 'Homeowner', 'Interior Designer'].includes(
                              clientInfo.companyOrRole
                            )
                              ? clientInfo.companyOrRole
                              : clientInfo.companyOrRole
                              ? 'Other'
                              : ''
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              onUpdateClientInfo({ companyOrRole: 'Other' });
                            } else {
                              onUpdateClientInfo({ companyOrRole: val });
                            }
                          }}
                          className="w-full min-h-[44px] bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none cursor-pointer transition"
                        >
                          <option value="">{isEn ? 'Select role...' : 'Seleccione rol...'}</option>
                          <option value="Architect">{isEn ? 'Architect' : 'Arquitecto'}</option>
                          <option value="Contractor">{isEn ? 'Contractor' : 'Contratista / Constructor'}</option>
                          <option value="Homeowner">{isEn ? 'Homeowner' : 'Propietario / Particular'}</option>
                          <option value="Interior Designer">
                            {isEn ? 'Interior Designer' : 'Diseñador de Interiores'}
                          </option>
                          <option value="Other">{isEn ? 'Other' : 'Otro (especificar)'}</option>
                        </select>

                        {(![
                          'Architect',
                          'Contractor',
                          'Homeowner',
                          'Interior Designer',
                          '',
                        ].includes(clientInfo.companyOrRole) ||
                          clientInfo.companyOrRole === 'Other') && (
                          <input
                            type="text"
                            value={clientInfo.companyOrRole === 'Other' ? '' : clientInfo.companyOrRole}
                            onChange={(e) =>
                              onUpdateClientInfo({ companyOrRole: e.target.value || 'Other' })
                            }
                            placeholder={
                              isEn
                                ? 'Please specify your company or role...'
                                : 'Especifique su empresa o rol...'
                            }
                            className="w-full min-h-[44px] bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none transition mt-2"
                            autoFocus
                          />
                        )}
                      </div>
                      <div>
                        <label htmlFor={projectCityId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {isEn ? 'City / Project Location' : 'Ciudad / Región'}
                        </label>
                        <input
                          id={projectCityId}
                          type="text"
                          autoComplete="address-level2"
                          value={clientInfo.projectCity}
                          onChange={(e) => onUpdateClientInfo({ projectCity: e.target.value })}
                          placeholder={isEn ? 'e.g. Miami, FL' : 'ej. Miami, FL'}
                          className="w-full min-h-[44px] bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={projectAddressId} className="font-semibold text-[#0B0B0B] block mb-1">
                        {isEn ? 'Delivery Address' : 'Dirección del Proyecto / Envío'}
                      </label>
                      <input
                        id={projectAddressId}
                        type="text"
                        autoComplete="street-address"
                        value={clientInfo.projectAddress}
                        onChange={(e) => onUpdateClientInfo({ projectAddress: e.target.value })}
                        placeholder={
                          isEn
                            ? 'Street, suite, building or delivery instructions'
                            : 'Calle, número, suite o punto de referencia'
                        }
                        className="w-full min-h-[44px] bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={projectTypeId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {isEn ? 'Project Type' : 'Tipo de Proyecto'}
                        </label>
                        <select
                          id={projectTypeId}
                          value={
                            clientInfo.projectType === 'Residencial'
                              ? 'Residential'
                              : clientInfo.projectType === 'Comercial'
                              ? 'Commercial'
                              : clientInfo.projectType === 'Contratista'
                              ? 'Contractor / Builder'
                              : clientInfo.projectType === 'Diseño / Arquitectura'
                              ? 'Interior Design / Architecture'
                              : clientInfo.projectType === 'Otro'
                              ? 'Other'
                              : clientInfo.projectType || 'Residential'
                          }
                          onChange={(e) =>
                            onUpdateClientInfo({
                              projectType: e.target.value,
                            })
                          }
                          className="w-full min-h-[44px] bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none cursor-pointer transition"
                        >
                          <option value="Residential">{isEn ? 'Residential' : 'Residencial'}</option>
                          <option value="Commercial">{isEn ? 'Commercial' : 'Comercial'}</option>
                          <option value="Multi-Family">{isEn ? 'Multi-Family' : 'Multifamiliar'}</option>
                          <option value="Hospitality">
                            {isEn ? 'Hospitality' : 'Hotelería y Restaurantes'}
                          </option>
                          <option value="Contractor / Builder">
                            {isEn ? 'Contractor / Builder' : 'Contratista / Constructor'}
                          </option>
                          <option value="Interior Design / Architecture">
                            {isEn ? 'Interior Design / Architecture' : 'Diseño / Arquitectura'}
                          </option>
                          <option value="Other">{isEn ? 'Other' : 'Otro'}</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor={deliveryTimeframeId} className="font-semibold text-[#0B0B0B] block mb-1">
                          {isEn ? 'Estimated Delivery' : 'Tiempo Estimado de Entrega'}
                        </label>
                        <select
                          id={deliveryTimeframeId}
                          value={clientInfo.deliveryTimeframe || 'Immediate'}
                          onChange={(e) => onUpdateClientInfo({ deliveryTimeframe: e.target.value })}
                          className="w-full min-h-[44px] bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2.5 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none cursor-pointer transition"
                        >
                          <option value="Immediate">{isEn ? 'Immediate (In Stock)' : 'Inmediato (En Stock)'}</option>
                          <option value="1-2 weeks">{isEn ? '1 - 2 Weeks' : '1 a 2 Semanas'}</option>
                          <option value="2-4 weeks">{isEn ? '2 - 4 Weeks' : '2 a 4 Semanas'}</option>
                          <option value="1-3 months">{isEn ? '1 - 3 Months' : '1 a 3 Meses'}</option>
                          <option value="Flexible / Not sure yet">
                            {isEn ? 'Budgeting / Not sure yet' : 'Solo Presupuesto / Por definir'}
                          </option>
                        </select>
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
                          {isEn
                            ? 'Include installation service by certified technicians'
                            : 'Deseo incluir el servicio de instalación Quick Surfaces'}
                        </span>
                        <span className="text-[11px] text-[#6B6762]">
                          {isEn
                            ? 'Certified crews provide subfloor prep, leveling, acoustic underlay, and transitions.'
                            : 'Nuestros técnicos realizan nivelación, colocación, barrera de humedad y remates.'}
                        </span>
                      </label>
                    </div>

                    <div>
                      <label htmlFor={additionalNotesId} className="font-semibold text-[#0B0B0B] block mb-1">
                        {isEn ? 'Project Notes / Cut Specs' : 'Notas Adicionales del Proyecto'}
                      </label>
                      <textarea
                        id={additionalNotesId}
                        rows={2}
                        value={clientInfo.additionalNotes}
                        onChange={(e) => onUpdateClientInfo({ additionalNotes: e.target.value })}
                        placeholder={
                          isEn
                            ? 'e.g. Specific stair measurements, custom cut, site delivery details...'
                            : 'ej. Medidas específicas de gradas, corte especial, acceso al edificio...'
                        }
                        className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl px-3.5 py-2 text-[#0B0B0B] focus:border-[#0B0B0B] focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer Actions - ONLY VISIBLE ON STEP 2 */}
        {orderItems.length > 0 && currentStep === 2 && (
          <div className="p-6 border-t border-[#D9D9D9] bg-white space-y-2.5">
            {/* Primary Action 1: WhatsApp */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full h-11 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#262626] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={15} className="text-white" />
              <span>{isEn ? 'Submit Request via WhatsApp' : 'Enviar Solicitud por WhatsApp'}</span>
            </button>

            {/* Primary Action 2: Email */}
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={isSendingEmail}
              className={`w-full h-11 px-4 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                isSendingEmail
                  ? 'bg-[#E5E5E5] text-[#6B6762] cursor-not-allowed border border-[#D9D9D9]'
                  : 'bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#0B0B0B] border border-[#D9D9D9]'
              }`}
            >
              {isSendingEmail ? (
                <>
                  <Loader2 size={15} className="text-[#0B0B0B] animate-spin" />
                  <span>{isEn ? 'Sending...' : 'Enviando...'}</span>
                </>
              ) : (
                <>
                  <Mail size={15} className="text-[#0B0B0B]" />
                  <span>{isEn ? 'Send via Email' : 'Enviar por Correo'}</span>
                </>
              )}
            </button>

            {/* Secondary action row: PDF & Copy */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Print / Save PDF */}
              <button
                onClick={handlePrint}
                className="h-11 min-h-[44px] px-3 rounded-xl bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border border-[#D9D9D9] text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Printer size={15} />
                <span>{isEn ? 'Print / Export PDF' : 'Imprimir / Guardar en PDF'}</span>
              </button>

              {/* Copy Summary */}
              <button
                onClick={handleCopySummary}
                className={`h-11 min-h-[44px] px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  copied
                    ? 'bg-[#F5F5F5] text-[#0B0B0B] border-[#0B0B0B]'
                    : 'bg-white hover:bg-[#F5F5F5] text-[#0B0B0B] border-[#D9D9D9]'
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>
                  {copied
                    ? isEn
                      ? 'Copied!'
                      : '¡Copiado!'
                    : isEn
                    ? 'Copy Summary'
                    : 'Copiar Resumen'}
                </span>
              </button>
            </div>

            {/* Email Error Alert */}
            {emailError && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-900 font-medium animate-in fade-in flex items-start gap-2.5">
                <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                <div className="text-left space-y-0.5">
                  <p className="font-bold text-red-800">
                    {isEn ? 'Unable to send email' : 'Error al enviar el correo'}
                  </p>
                  <p className="text-[11px] text-red-700">{emailError}</p>
                  <p className="text-[10px] text-[#6B6762] pt-0.5">
                    {isEn
                      ? 'Your form data was preserved. You can retry or send via WhatsApp.'
                      : 'Sus datos no se han perdido. Puede reintentar o enviar directamente por WhatsApp.'}
                  </p>
                </div>
              </div>
            )}

            {/* WhatsApp Submitted Alert */}
            {whatsappSubmitted && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs text-emerald-900 font-medium animate-in fade-in">
                {isEn
                  ? '✓ Request opened in WhatsApp! An advisor will assist you.'
                  : '✓ ¡Solicitud enviada a WhatsApp! Un asesor le atenderá.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
