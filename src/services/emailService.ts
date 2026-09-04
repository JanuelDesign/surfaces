import { ClientOrderInfo, OrderItem } from '../types';
import { formatCleanNumber } from '../utils/numberUtils';

export interface SendEmailPayload {
  clientInfo: ClientOrderInfo;
  orderItems: OrderItem[];
  orderSummaryText: string;
  isEn: boolean;
}

export interface SendEmailResult {
  success: boolean;
  message?: string;
  error?: string;
}

const PRIMARY_EMAIL_DESTINATION = 'marketingquicksurfaces@gmail.com';

/**
 * Sends a quote and order request directly to Quick Surfaces via background API.
 * Uses FormSubmit AJAX API as primary zero-config endpoint, with optional EmailJS integration if configured.
 */
export async function sendQuoteOrderEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const { clientInfo, orderItems, orderSummaryText, isEn } = payload;

  const clientName = clientInfo.fullName?.trim() || (isEn ? 'Client' : 'Cliente');
  const city = clientInfo.projectCity?.trim() ? ` - ${clientInfo.projectCity.trim()}` : '';
  const subject = isEn
    ? `Quote / Order Request: ${clientName}${city} | Quick Surfaces`
    : `Solicitud de Cotización: ${clientName}${city} | Quick Surfaces`;

  // Filter quote and sample items for organized display
  const quoteItems = orderItems.filter((i) => i.itemType === 'order');
  const sampleItems = orderItems.filter((i) => i.itemType === 'sample');

  const formattedItemsList = quoteItems.length > 0
    ? quoteItems
        .map((item, idx) => {
          const colorName = item.selectedColor.code && item.selectedColor.code !== item.selectedColor.name
            ? `${item.selectedColor.name} (${item.selectedColor.code})`
            : (item.selectedColor.code || item.selectedColor.name);
          const coverage = item.estimatedSqft
            ? ` ≈ ${formatCleanNumber(item.estimatedSqft, 2)} sqft`
            : item.estimatedLinearFt
            ? ` ≈ ${formatCleanNumber(item.estimatedLinearFt, 2)} lin. ft`
            : '';
          return `${idx + 1}. [${item.collectionName}] ${colorName} - ${item.quantity} ${item.unit}${coverage}`;
        })
        .join('\n')
    : (isEn ? 'No materials added' : 'Sin materiales agregados');

  const formattedSamplesList = sampleItems.length > 0
    ? sampleItems
        .map((item, idx) => {
          const colorName = item.selectedColor.code && item.selectedColor.code !== item.selectedColor.name
            ? `${item.selectedColor.name} (${item.selectedColor.code})`
            : (item.selectedColor.code || item.selectedColor.name);
          return `${idx + 1}. [${item.collectionName}] ${colorName} (Physical hand sample)`;
        })
        .join('\n')
    : (isEn ? 'No samples requested' : 'Sin muestras solicitadas');

  // Check if EmailJS is configured via environment variables
  const emailJsServiceId = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY;

  if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
    try {
      const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          template_params: {
            to_email: PRIMARY_EMAIL_DESTINATION,
            subject,
            client_name: clientInfo.fullName,
            client_phone: clientInfo.phone,
            client_email: clientInfo.email || 'N/A',
            company: clientInfo.companyOrRole || 'N/A',
            city: clientInfo.projectCity || 'N/A',
            address: clientInfo.projectAddress || 'N/A',
            project_type: clientInfo.projectType || 'Residential',
            delivery_timeframe: clientInfo.deliveryTimeframe || 'Immediate',
            needs_installation: clientInfo.needsInstallation ? 'Yes' : 'No',
            notes: clientInfo.additionalNotes || 'N/A',
            order_summary: orderSummaryText,
          },
        }),
      });

      if (emailJsResponse.ok) {
        return {
          success: true,
          message: isEn
            ? 'Request sent successfully via email!'
            : '¡Solicitud enviada con éxito por correo electrónico!',
        };
      }
    } catch {
      // Fall back to FormSubmit if EmailJS request fails
    }
  }

  // Primary zero-config endpoint: FormSubmit AJAX endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const replyToEmail = clientInfo.email && clientInfo.email.includes('@')
      ? clientInfo.email.trim()
      : PRIMARY_EMAIL_DESTINATION;

    const requestBody = {
      _subject: subject,
      _replyto: replyToEmail,
      _captcha: 'false',
      _template: 'table',
      Client_Name: clientInfo.fullName?.trim(),
      Phone_WhatsApp: clientInfo.phone?.trim(),
      Email_Address: clientInfo.email?.trim() || (isEn ? 'Not provided' : 'No provisto'),
      Company_or_Role: clientInfo.companyOrRole?.trim() || 'N/A',
      Project_City: clientInfo.projectCity?.trim() || 'N/A',
      Delivery_Address: clientInfo.projectAddress?.trim() || 'N/A',
      Project_Type: clientInfo.projectType || 'Residential',
      Estimated_Delivery: clientInfo.deliveryTimeframe || 'Immediate',
      Include_Installation: clientInfo.needsInstallation ? 'YES (Requested)' : 'No',
      Project_Notes: clientInfo.additionalNotes?.trim() || 'None',
      Quoted_Materials: formattedItemsList,
      Requested_Samples: formattedSamplesList,
      Full_Order_Summary: orderSummaryText,
    };

    const response = await fetch(`https://formsubmit.co/ajax/${PRIMARY_EMAIL_DESTINATION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    // FormSubmit returns { success: "true", message: "..." } or { success: "false", message: "..." }
    if (response.ok && (data?.success === 'true' || data?.success === true)) {
      return {
        success: true,
        message: isEn
          ? 'Request sent successfully! An advisor will contact you shortly.'
          : '¡Solicitud enviada con éxito! Un asesor le contactará a la brevedad.',
      };
    }

    // If FormSubmit sent the one-time activation verification email to marketingquicksurfaces@gmail.com
    if (data?.message && typeof data.message === 'string' && data.message.toLowerCase().includes('activation')) {
      return {
        success: true,
        message: isEn
          ? 'Request submitted to marketingquicksurfaces@gmail.com! (FormSubmit activation email dispatched to inbox).'
          : '¡Solicitud registrada para marketingquicksurfaces@gmail.com! (Enlace de activación enviado al buzón).',
      };
    }

    const errorMessage = data?.message || (isEn
      ? 'Unable to send email. Please check your connection or contact us via WhatsApp.'
      : 'No se pudo enviar el correo. Por favor verifique su conexión o contáctenos por WhatsApp.');

    return {
      success: false,
      error: errorMessage,
    };
  } catch (err: any) {
    const isTimeout = err?.name === 'AbortError';
    return {
      success: false,
      error: isTimeout
        ? (isEn ? 'The request timed out. Please try again or send via WhatsApp.' : 'La solicitud tardó demasiado. Por favor intente de nuevo o envíe por WhatsApp.')
        : (isEn ? 'Network error sending email. Please check your internet connection or use WhatsApp.' : 'Error de red al enviar el correo. Por favor revise su conexión o use WhatsApp.'),
    };
  }
}
