import React from 'react';
import { OrderItem, ClientOrderInfo } from '../types';

interface Props {
  orderItems: OrderItem[];
  clientInfo: ClientOrderInfo;
}

export const PrintQuoteSheet: React.FC<Props> = ({ orderItems, clientInfo }) => {
  const quoteItems = orderItems.filter((i) => i.itemType === 'order');
  const sampleItems = orderItems.filter((i) => i.itemType === 'sample');

  const totalBoxes = quoteItems
    .filter((i) => i.unit === 'boxes')
    .reduce((sum, i) => sum + i.quantity, 0);

  const totalEstSqft = quoteItems.reduce((sum, i) => sum + (i.estimatedSqft || 0), 0);

  const today = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="hidden print:block print-only p-8 bg-white text-slate-900 font-sans max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-[#ff8407] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff8407] flex items-center justify-center text-white font-black text-sm">
              QS
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Quick<span className="text-[#ff8407]">Surfaces</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Product Catalog 2026 • quicksurfaces.com • info@quicksurfaces.com
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-[#0f172a] text-white text-xs font-bold px-3 py-1 rounded">
            SOLICITUD DE PEDIDO / COTIZACIÓN
          </span>
          <div className="text-xs text-slate-500 mt-1">Fecha: {today}</div>
          <div className="text-xs text-slate-500">Ref: QS-2026-{Math.floor(Math.random() * 90000 + 10000)}</div>
        </div>
      </div>

      {/* Client Info Grid */}
      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-6">
        <div>
          <div className="font-bold text-slate-800">DATOS DEL CLIENTE / PROYECTO:</div>
          <div className="mt-1"><span className="text-slate-500">Nombre:</span> <strong>{clientInfo.fullName || 'No especificado'}</strong></div>
          {clientInfo.companyOrRole && <div><span className="text-slate-500">Empresa / Rol:</span> {clientInfo.companyOrRole}</div>}
          <div><span className="text-slate-500">Teléfono:</span> {clientInfo.phone || 'No especificado'}</div>
          {clientInfo.email && <div><span className="text-slate-500">Email:</span> {clientInfo.email}</div>}
        </div>
        <div>
          <div className="font-bold text-slate-800">DETALLES DE ENTREGA:</div>
          <div><span className="text-slate-500">Ciudad / Proyecto:</span> {clientInfo.projectCity || 'No especificado'}</div>
          {clientInfo.projectAddress && <div><span className="text-slate-500">Dirección:</span> {clientInfo.projectAddress}</div>}
          <div><span className="text-slate-500">Tipo de Proyecto:</span> {clientInfo.projectType}</div>
          {clientInfo.deliveryTimeframe && <div><span className="text-slate-500">Tiempo de Entrega:</span> {clientInfo.deliveryTimeframe}</div>}
          <div>
            <span className="text-slate-500">Servicio de Instalación:</span>{' '}
            <strong>{clientInfo.needsInstallation ? 'SÍ, Solicitado' : 'Solo Suministro de Material'}</strong>
          </div>
        </div>
      </div>

      {/* Main Material Table */}
      {quoteItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
            Material Principal & Pisos Solicitados:
          </h2>
          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Colección / Producto</th>
                <th className="p-2 text-left">Color / Código</th>
                <th className="p-2 text-center">Cantidad</th>
                <th className="p-2 text-center">Unidad</th>
                <th className="p-2 text-center">Sqft Estimado</th>
                <th className="p-2 text-left">Notas / Área</th>
              </tr>
            </thead>
            <tbody>
              {quoteItems.map((item, idx) => (
                <tr key={item.id} className="border-b border-slate-200">
                  <td className="p-2 text-slate-500">{idx + 1}</td>
                  <td className="p-2 font-bold text-slate-900">{item.collectionName}</td>
                  <td className="p-2">
                    {item.selectedColor.name} {item.selectedColor.code ? `(${item.selectedColor.code})` : ''}
                  </td>
                  <td className="p-2 text-center font-bold text-[#ff8407]">{item.quantity}</td>
                  <td className="p-2 text-center capitalize">{item.unit}</td>
                  <td className="p-2 text-center">{item.estimatedSqft ? `${item.estimatedSqft} sqft` : '-'}</td>
                  <td className="p-2 text-slate-600 text-[11px]">{item.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals bar */}
          <div className="flex justify-end gap-6 bg-slate-100 p-3 rounded-b-lg border-x border-b border-slate-300 text-xs font-bold">
            <div>Total Cajas: <span className="text-[#ff8407]">{totalBoxes} Cajas</span></div>
            <div>Total Área Estimada: <span className="text-slate-900">{totalEstSqft.toFixed(2)} Sq. Ft.</span></div>
          </div>
        </div>
      )}

      {/* Hand Samples Table */}
      {sampleItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
            Muestras de Mano Solicitadas (Hand Samples Available):
          </h2>
          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-emerald-800 text-white">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Colección</th>
                <th className="p-2 text-left">Tono / Acabado</th>
                <th className="p-2 text-center">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {sampleItems.map((item, idx) => (
                <tr key={item.id} className="border-b border-slate-200">
                  <td className="p-2 text-slate-500">{idx + 1}</td>
                  <td className="p-2 font-bold">{item.collectionName}</td>
                  <td className="p-2">
                    {item.selectedColor.name} {item.selectedColor.code ? `(${item.selectedColor.code})` : ''}
                  </td>
                  <td className="p-2 text-center font-semibold text-emerald-700">Muestra Física de Mano</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Additional Notes */}
      {clientInfo.additionalNotes && (
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs mb-6">
          <div className="font-bold text-slate-800">Notas Adicionales del Proyecto:</div>
          <p className="text-slate-600 mt-0.5">{clientInfo.additionalNotes}</p>
        </div>
      )}

      {/* Footer & Verification Stamp */}
      <div className="border-t border-slate-300 pt-4 flex justify-between items-center text-[10px] text-slate-500">
        <div>
          Documento oficial generado por QuickSurfaces Interactivo. Garantía de fábrica hasta 30 años.
        </div>
        <div className="text-right">
          www.quicksurfaces.com • 1-800-555-0199
        </div>
      </div>
    </div>
  );
};
