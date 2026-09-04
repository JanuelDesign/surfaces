import React from 'react';
import { OrderItem, ClientOrderInfo } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { roundNumber, formatCleanNumber } from '../utils/numberUtils';

interface Props {
  orderItems: OrderItem[];
  clientInfo: ClientOrderInfo;
}

export const PrintQuoteSheet: React.FC<Props> = ({ orderItems, clientInfo }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

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

  const today = new Date().toLocaleDateString(isEn ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="print-quote-document"
      className="hidden print:block p-8 bg-white text-[#0B0B0B] font-sans max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-[#0B0B0B] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] flex items-center justify-center text-white font-black text-base">
              QS
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider text-[#0B0B0B]">
                QUICK SURFACES
              </h1>
              <p className="text-[10px] uppercase font-bold text-[#6B6762] tracking-wider">
                {isEn ? 'Architectural Surfaces & Flooring' : 'Pisos y Superficies Arquitectónicas'}
              </p>
            </div>
          </div>
          <div className="text-[11px] text-[#6B6762] mt-2 space-y-0.5">
            <div><strong>{isEn ? 'Direct Line / WhatsApp:' : 'Línea Directa / WhatsApp:'}</strong> (786) 658-3677</div>
            <div><strong>{isEn ? 'Sales & Orders:' : 'Ventas y Pedidos:'}</strong> marketingquicksurfaces@gmail.com</div>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block bg-[#0B0B0B] text-white text-xs font-bold px-3 py-1 rounded">
            {isEn ? 'OFFICIAL QUOTE / ORDER REQUEST' : 'SOLICITUD DE COTIZACIÓN / PEDIDO'}
          </span>
          <div className="text-xs text-[#6B6762] mt-1.5">{isEn ? 'Date' : 'Fecha'}: {today}</div>
          <div className="text-xs font-mono text-[#6B6762]">Ref: QS-2026-{Math.floor(Math.random() * 90000 + 10000)}</div>
        </div>
      </div>

      {/* Client Info Grid */}
      <div className="grid grid-cols-2 gap-4 bg-[#F5F5F5] p-4 rounded-xl border border-[#D9D9D9] text-xs mb-6">
        <div>
          <div className="font-bold text-[#0B0B0B]">{isEn ? 'CLIENT / PROJECT INFORMATION:' : 'DATOS DEL CLIENTE / PROYECTO:'}</div>
          <div className="mt-1"><span className="text-[#6B6762]">{isEn ? 'Name:' : 'Nombre:'}</span> <strong>{clientInfo.fullName || (isEn ? 'Not specified' : 'No especificado')}</strong></div>
          {clientInfo.companyOrRole && <div><span className="text-[#6B6762]">{isEn ? 'Company / Role:' : 'Empresa / Rol:'}</span> {clientInfo.companyOrRole}</div>}
          {clientInfo.phone && <div><span className="text-[#6B6762]">{isEn ? 'Phone:' : 'Teléfono:'}</span> {clientInfo.phone}</div>}
          {clientInfo.email && <div><span className="text-[#6B6762]">Email:</span> {clientInfo.email}</div>}
        </div>
        <div>
          <div className="font-bold text-[#0B0B0B]">{isEn ? 'DELIVERY DETAILS:' : 'DETALLES DE ENTREGA:'}</div>
          <div><span className="text-[#6B6762]">{isEn ? 'City / Location:' : 'Ciudad / Proyecto:'}</span> {clientInfo.projectCity || (isEn ? 'Not specified' : 'No especificado')}</div>
          {clientInfo.projectAddress && <div><span className="text-[#6B6762]">{isEn ? 'Address:' : 'Dirección:'}</span> {clientInfo.projectAddress}</div>}
          <div><span className="text-[#6B6762]">{isEn ? 'Project Type:' : 'Tipo de Proyecto:'}</span> {clientInfo.projectType}</div>
          {clientInfo.deliveryTimeframe && <div><span className="text-[#6B6762]">{isEn ? 'Delivery Timeframe:' : 'Tiempo de Entrega:'}</span> {clientInfo.deliveryTimeframe}</div>}
          <div>
            <span className="text-[#6B6762]">{isEn ? 'Installation Service:' : 'Servicio de Instalación:'}</span>{' '}
            <strong>{clientInfo.needsInstallation ? (isEn ? 'YES, Requested' : 'SÍ, Solicitado') : (isEn ? 'Supply Only' : 'Solo Suministro de Material')}</strong>
          </div>
        </div>
      </div>

      {/* Main Material Table */}
      {quoteItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black text-[#0B0B0B] uppercase tracking-wider mb-2">
            {isEn ? 'Main Material & Requested Surfaces:' : 'Material Principal & Pisos Solicitados:'}
          </h2>
          <table className="w-full text-xs border-collapse border border-[#D9D9D9]">
            <thead>
              <tr className="bg-[#0B0B0B] text-white">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">{isEn ? 'Collection / Product' : 'Colección / Producto'}</th>
                <th className="p-2 text-left">{isEn ? 'Color / Code' : 'Color / Código'}</th>
                <th className="p-2 text-center">{isEn ? 'Quantity' : 'Cantidad'}</th>
                <th className="p-2 text-center">{isEn ? 'Unit' : 'Unidad'}</th>
                <th className="p-2 text-center">{isEn ? 'Coverage' : 'Cobertura'}</th>
                <th className="p-2 text-left">{isEn ? 'Notes / Area' : 'Notas / Área'}</th>
              </tr>
            </thead>
            <tbody>
              {quoteItems.map((item, idx) => (
                <tr key={item.id} className="border-b border-[#D9D9D9]">
                  <td className="p-2 text-[#6B6762]">{idx + 1}</td>
                  <td className="p-2 font-bold text-[#0B0B0B]">{item.collectionName}</td>
                  <td className="p-2">
                    {item.selectedColor.name}{' '}
                    {item.selectedColor.code && item.selectedColor.code !== item.selectedColor.name ? (
                      <span className="text-[#6B6762]">({item.selectedColor.code})</span>
                    ) : null}
                  </td>
                  <td className="p-2 text-center font-bold text-[#0B0B0B]">{item.quantity}</td>
                  <td className="p-2 text-center capitalize">
                    {item.unit === 'pieces'
                      ? item.quantity === 1 ? (isEn ? 'piece' : 'pieza') : (isEn ? 'pieces' : 'piezas')
                      : item.quantity === 1 ? (isEn ? 'box' : 'caja') : (isEn ? 'boxes' : 'cajas')}
                  </td>
                  <td className="p-2 text-center font-medium">
                    {item.estimatedLinearFt
                      ? `≈ ${formatCleanNumber(item.estimatedLinearFt)} lin. ft`
                      : item.estimatedSqft
                      ? `≈ ${formatCleanNumber(item.estimatedSqft)} sqft`
                      : '-'}
                  </td>
                  <td className="p-2 text-[#6B6762] text-[11px]">{item.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals bar */}
          <div className="flex flex-wrap justify-end gap-6 bg-[#F5F5F5] p-3 rounded-b-lg border-x border-b border-[#D9D9D9] text-xs font-bold">
            {totalBoxes > 0 && (
              <div>{isEn ? 'Total Boxes:' : 'Total Cajas:'} <span className="text-[#0B0B0B]">{totalBoxes} {isEn ? 'Boxes' : 'Cajas'}</span></div>
            )}
            {totalPieces > 0 && (
              <div>{isEn ? 'Total Pieces:' : 'Total Piezas:'} <span className="text-[#0B0B0B]">{totalPieces} {isEn ? 'Pieces' : 'Piezas'}</span></div>
            )}
            {totalEstSqft > 0 && (
              <div>{isEn ? 'Total Est. Area:' : 'Total Área Estimada:'} <span className="text-[#0B0B0B]">{formatCleanNumber(totalEstSqft)} Sq. Ft.</span></div>
            )}
            {totalEstLinearFt > 0 && (
              <div>{isEn ? 'Total Linear Run:' : 'Total Metraje Lineal:'} <span className="text-[#0B0B0B]">{formatCleanNumber(totalEstLinearFt)} Linear Ft.</span></div>
            )}
          </div>
        </div>
      )}

      {/* Hand Samples Table */}
      {sampleItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black text-[#0B0B0B] uppercase tracking-wider mb-2">
            {isEn ? 'Requested Hand Samples (Available for dispatch):' : 'Muestras de Mano Solicitadas (Hand Samples Available):'}
          </h2>
          <table className="w-full text-xs border-collapse border border-[#D9D9D9]">
            <thead>
              <tr className="bg-[#262626] text-white">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">{isEn ? 'Collection' : 'Colección'}</th>
                <th className="p-2 text-left">{isEn ? 'Tone / Finish' : 'Tono / Acabado'}</th>
                <th className="p-2 text-center">{isEn ? 'Type' : 'Tipo'}</th>
              </tr>
            </thead>
            <tbody>
              {sampleItems.map((item, idx) => (
                <tr key={item.id} className="border-b border-[#D9D9D9]">
                  <td className="p-2 text-[#6B6762]">{idx + 1}</td>
                  <td className="p-2 font-bold">{item.collectionName}</td>
                  <td className="p-2">
                    {item.selectedColor.name}{' '}
                    {item.selectedColor.code && item.selectedColor.code !== item.selectedColor.name ? (
                      <span className="text-[#6B6762]">({item.selectedColor.code})</span>
                    ) : null}
                  </td>
                  <td className="p-2 text-center font-semibold text-[#0B0B0B]">
                    {isEn ? 'Physical Hand Sample' : 'Muestra Física de Mano'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Additional Notes */}
      {clientInfo.additionalNotes && (
        <div className="bg-[#F5F5F5] p-3 rounded-lg border border-[#D9D9D9] text-xs mb-6">
          <div className="font-bold text-[#0B0B0B]">{isEn ? 'Additional Project Notes:' : 'Notas Adicionales del Proyecto:'}</div>
          <p className="text-[#6B6762] mt-0.5">{clientInfo.additionalNotes}</p>
        </div>
      )}

      {/* Footer & Verification Stamp */}
      <div className="border-t border-[#D9D9D9] pt-4 flex justify-between items-center text-[10px] text-[#6B6762]">
        <div>
          {isEn
            ? 'Official quotation generated via QUICK SURFACES. Factory warranty up to 30 years.'
            : 'Documento oficial generado por QUICK SURFACES. Garantía de fábrica hasta 30 años.'}
        </div>
        <div className="text-right font-medium">
          QUICK SURFACES Architectural Specifications • (786) 658-3677
        </div>
      </div>
    </div>
  );
};
