import React from 'react';
import { LaundryOrder } from '../types';
import { STORE_INFO } from '../data/mockData';

interface ReceiptModalProps {
  order: LaundryOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onPrintSuccess?: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  order,
  isOpen,
  onClose,
  onPrintSuccess
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-[#f2f3ff] px-4 py-3 flex items-center justify-between border-b border-[#dae2fd]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">print</span>
            <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">Thermal 80mm Print Preview</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-[#707881] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Paper Thermal Receipt Container */}
        <div className="p-5 overflow-y-auto font-mono text-xs text-gray-800 bg-[#fafafa] space-y-4">
          {/* Shop Header */}
          <div className="text-center space-y-1">
            <div className="flex justify-center mb-1">
              <img src={STORE_INFO.logoUrl} alt="Logo" className="h-10 object-contain" />
            </div>
            <h3 className="font-bold text-sm tracking-wide text-gray-900">{STORE_INFO.name.toUpperCase()}</h3>
            <p className="text-[11px] text-gray-600">{STORE_INFO.address}</p>
            <p className="text-[11px] text-gray-600">Hotline: {STORE_INFO.hotline}</p>
            <p className="text-[10px] text-gray-500">BIR Permit: {STORE_INFO.birReg}</p>
          </div>

          <div className="border-t border-dashed border-gray-400 pt-3">
            <div className="flex justify-between font-bold text-sm text-gray-900">
              <span>CLAIM TICKET:</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-[11px] mt-1">
              <span>Date & Time:</span>
              <span>{order.intakeTime}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-[11px]">
              <span>Customer:</span>
              <span className="font-bold">{order.customerName}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-[11px]">
              <span>Contact:</span>
              <span>{order.customerPhone}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-[11px]">
              <span>Shelf Bin / Bay:</span>
              <span className="font-bold text-[#006194]">{order.shelfBin}</span>
            </div>
          </div>

          {/* Line Items */}
          <div className="border-t border-dashed border-gray-400 pt-3 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span>{order.serviceName} ({order.weightKg}kg)</span>
              <span>₱{order.baseAmount.toFixed(2)}</span>
            </div>
            {order.addons.map((addon, i) => (
              <div key={i} className="flex justify-between text-gray-600 pl-2">
                <span>+ {addon}</span>
                <span>₱{(order.addonAmount / Math.max(1, order.addons.length)).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-dashed border-gray-400 pt-2 space-y-1">
            <div className="flex justify-between font-bold text-sm text-gray-900">
              <span>TOTAL DUE:</span>
              <span className="text-[#006194]">₱{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Payment Status:</span>
              <span className={`font-bold ${order.paymentStatus === 'pay_later' ? 'text-amber-700' : 'text-emerald-700'}`}>
                {order.paymentStatus === 'gcash_paid' ? 'GCASH PAID' : order.paymentStatus === 'cash_paid' ? 'CASH PAID' : 'UNPAID (PAY ON PICKUP)'}
              </span>
            </div>
          </div>

          {/* Barcode & QR Code Section */}
          <div className="border-t border-dashed border-gray-400 pt-3 flex flex-col items-center gap-2 text-center">
            {/* Simulated Barcode */}
            <div className="h-10 flex items-center justify-center gap-0.5 bg-white px-3 py-1 rounded border border-gray-300">
              <div className="w-1.5 h-7 bg-black"></div>
              <div className="w-0.5 h-7 bg-black"></div>
              <div className="w-2 h-7 bg-black"></div>
              <div className="w-1 h-7 bg-black"></div>
              <div className="w-0.5 h-7 bg-black"></div>
              <div className="w-2.5 h-7 bg-black"></div>
              <div className="w-1 h-7 bg-black"></div>
              <div className="w-1.5 h-7 bg-black"></div>
              <div className="w-0.5 h-7 bg-black"></div>
              <div className="w-2 h-7 bg-black"></div>
              <div className="w-1 h-7 bg-black"></div>
            </div>
            <span className="text-[10px] tracking-widest text-gray-500 font-bold">{order.id.replace('#', '')}</span>

            <p className="text-[10px] text-gray-500 leading-tight">
              Scan QR code on receipt to view real-time wash progress online at any time!
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-3 bg-white border-t border-[#eaedff] flex items-center gap-2">
          <button
            onClick={() => {
              if (onPrintSuccess) onPrintSuccess();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#006194] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-[#007bb9] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Send to Station Printer</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#eaedff] text-[#131b2e] font-semibold text-xs hover:bg-[#dae2fd] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
