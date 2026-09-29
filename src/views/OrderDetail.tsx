import React, { useState } from 'react';
import { LaundryOrder } from '../types';

interface OrderDetailProps {
  order: LaundryOrder;
  onUpdateOrder: (updated: LaundryOrder) => void;
  onOpenReceipt: (order: LaundryOrder) => void;
  onNavigateToCustomer: (customerName: string) => void;
  onOpenTracker: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  onUpdateOrder,
  onOpenReceipt,
  onNavigateToCustomer,
  onOpenTracker,
  showToast
}) => {
  const [currentStep, setCurrentStep] = useState(order.stageStep);

  const handleMarkCompleted = () => {
    const updated: LaundryOrder = {
      ...order,
      status: 'completed',
      statusLabel: 'Completed & Claimed',
      stageStep: 5,
      completedTime: 'Just now'
    };
    setCurrentStep(5);
    onUpdateOrder(updated);
    showToast(`Order ${order.id} marked as Completed & Claimed!`, 'check_circle');
  };

  const handlePayment = (method: 'Cash' | 'GCash') => {
    const updated: LaundryOrder = {
      ...order,
      paymentStatus: method === 'Cash' ? 'cash_paid' : 'gcash_paid'
    };
    onUpdateOrder(updated);
    showToast(`Payment of ₱${order.totalAmount.toFixed(2)} settled via ${method}!`, 'payments');
  };

  const handleResendSms = () => {
    showToast(`Resent pickup SMS alert to ${order.customerPhone}`, 'sms');
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Top Order Identity Card */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-[#006194] dark:text-[#93ccff] tracking-tight">
              {order.id}
            </span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(order.id);
                showToast(`Order ${order.id} copied!`, 'content_copy');
              }}
              className="w-8 h-8 rounded-full bg-[#f2f3ff] dark:bg-[#283044] flex items-center justify-center text-[#707881] hover:text-[#006194]"
              title="Copy Order ID"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-[#cde5ff] dark:bg-[#004f7b] text-[#004f7b] dark:text-[#cde5ff] px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shelves</span>
              {order.shelfBin}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
              order.status === 'completed'
                ? 'bg-[#eaedff] text-[#3f4850]'
                : 'bg-[#89f5e7] text-[#00201d]'
            }`}>
              {order.status !== 'completed' && <span className="w-1.5 h-1.5 rounded-full bg-[#00685f] animate-ping"></span>}
              {order.statusLabel}
            </span>
          </div>
        </div>

        {/* Customer Details Cardlet */}
        <div className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] rounded-xl p-3 flex items-center justify-between border border-[#eaedff] dark:border-[#283044]">
          <div
            onClick={() => onNavigateToCustomer(order.customerName)}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-80"
          >
            <div className="w-10 h-10 rounded-full bg-[#cce5ff] dark:bg-[#283044] flex items-center justify-center text-[#001d31] dark:text-[#93ccff] font-extrabold text-sm flex-shrink-0">
              {order.customerInitial}
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-[#131b2e] dark:text-white truncate">
                {order.customerName}
              </h2>
              <p className="text-xs text-[#707881] dark:text-[#bfc7d2]">{order.customerPhone}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <a
              href={`tel:${order.customerPhone}`}
              className="h-8 px-2.5 rounded-full bg-[#cce5ff] text-[#004b73] flex items-center gap-1 text-xs font-bold hover:bg-[#93ccff] transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              Call
            </a>
            <a
              href={`sms:${order.customerPhone}`}
              className="h-8 px-2.5 rounded-full bg-[#cde5ff] text-[#004f7b] flex items-center gap-1 text-xs font-bold hover:bg-[#94ccff] transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              SMS
            </a>
          </div>
        </div>

        {/* Operational Intake Metadata */}
        <div className="flex items-center justify-between text-[#707881] dark:text-[#bfc7d2] text-xs pt-0.5 px-1">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#006194]">schedule</span>
            <span>{order.intakeTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#00685f]">badge</span>
            <span>Intake: {order.intakeAttendant}</span>
          </div>
        </div>
      </div>

      {/* Interactive 5-Stage Stepper */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">local_laundry_service</span>
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Laundry Progression</h3>
          </div>
          <span className="text-[10px] font-bold bg-[#eaedff] dark:bg-[#283044] text-[#3f4850] dark:text-[#bfc7d2] px-2 py-0.5 rounded-full">
            Stage {currentStep} of 5
          </span>
        </div>

        {/* Timeline Stepper */}
        <div className="relative flex flex-col gap-3 pl-2">
          {/* Connector pipe */}
          <div className="absolute left-6 top-3 bottom-5 w-0.5 bg-[#eaedff] dark:bg-[#283044]"></div>
          <div
            className="absolute left-6 top-3 w-0.5 bg-[#006194] transition-all duration-300"
            style={{ height: `${(currentStep - 1) * 25}%` }}
          ></div>

          {/* Steps */}
          {[
            { step: 1, title: 'Received & Weighed', desc: `Intake Tagged ${order.id} • ${order.weightKg}kg`, time: '10:15 AM' },
            { step: 2, title: 'Washing (Washer #03)', desc: 'Heavy Blanket Gentle Cycle + Ariel', time: '10:45 AM' },
            { step: 3, title: 'Drying & Fluffing', desc: 'Dryer #02 • Low Heat Dry', time: '12:30 PM' },
            { step: 4, title: 'Ready for Pickup', desc: `Packed in Waterproof Poly • ${order.shelfBin}`, time: '1:45 PM' },
            { step: 5, title: 'Completed & Claimed', desc: 'Counter sign-out and digital claim', time: order.completedTime || '—' }
          ].map((item) => {
            const isDone = currentStep > item.step;
            const isCurrent = currentStep === item.step;

            return (
              <div
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className="flex items-start gap-3 relative z-10 cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs transition-all ${
                  isDone
                    ? 'bg-[#006194] text-white'
                    : isCurrent
                    ? 'bg-[#008378] text-white ring-4 ring-[#89f5e7]'
                    : 'bg-[#eaedff] dark:bg-[#283044] text-[#707881]'
                }`}>
                  <span className="material-symbols-outlined text-[17px]">
                    {isDone ? 'check' : isCurrent ? 'star' : 'radio_button_unchecked'}
                  </span>
                </div>
                <div className={`flex-1 min-w-0 flex items-center justify-between p-1.5 rounded-xl transition-colors ${
                  isCurrent ? 'bg-[#f2f3ff] dark:bg-[#131b2e]' : ''
                }`}>
                  <div>
                    <p className={`text-xs font-bold ${isCurrent ? 'text-[#00685f] dark:text-[#89f5e7]' : 'text-[#131b2e] dark:text-white'}`}>
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#707881]">{item.desc}</p>
                  </div>
                  <span className="text-[10px] text-[#707881] font-semibold">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Handover Button */}
        {order.status !== 'completed' ? (
          <button
            onClick={handleMarkCompleted}
            className="w-full h-11 rounded-xl bg-[#008378] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#00685f] active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
            <span>Mark as Completed & Handover to Customer</span>
          </button>
        ) : (
          <div className="w-full py-2.5 rounded-xl bg-[#e6f4f2] text-[#00685f] font-bold text-xs flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Order Completed & Handed Over</span>
          </div>
        )}
      </div>

      {/* Itemized Service & Charge Breakdown */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Billing & Services</h3>
          {order.paymentStatus === 'pay_later' ? (
            <span className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Pay Later Unpaid — ₱{order.totalAmount.toFixed(2)}
            </span>
          ) : (
            <span className="bg-[#e6f4f2] text-[#00685f] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              {order.paymentStatus === 'gcash_paid' ? 'GCash Settled' : 'Cash Paid'}
            </span>
          )}
        </div>

        {/* Line Items */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between py-1 border-b border-[#eaedff] dark:border-[#283044]">
            <div>
              <p className="font-bold text-[#131b2e] dark:text-white">{order.serviceName}</p>
              <p className="text-[11px] text-[#707881]">{order.weightKg} kg bulk blanket tier • Hypoallergenic Rinse</p>
            </div>
            <span className="font-bold text-[#131b2e] dark:text-white">₱{order.baseAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#eaedff] dark:border-[#283044]">
            <div>
              <p className="font-bold text-[#131b2e] dark:text-white">Fragrance Upgrade</p>
              <p className="text-[11px] text-[#707881]">Ariel Sunrise Fresh + Downy Mystique Booster</p>
            </div>
            <span className="font-bold text-[#131b2e] dark:text-white">₱{order.addonAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-sm font-bold text-[#131b2e] dark:text-white block">Total Amount</span>
              <span className="text-[11px] text-[#707881]">Inclusive of 12% VAT</span>
            </div>
            <span className="text-2xl font-extrabold text-[#006194] dark:text-[#93ccff]">
              ₱{order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Settlement Actions if Unpaid */}
        {order.paymentStatus === 'pay_later' && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handlePayment('Cash')}
              className="h-11 rounded-xl bg-[#f2f3ff] dark:bg-[#283044] text-[#131b2e] dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#eaedff] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#00685f]">payments</span>
              <span>Collect Cash (₱{order.totalAmount})</span>
            </button>
            <button
              onClick={() => handlePayment('GCash')}
              className="h-11 rounded-xl bg-[#006194] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#007bb9] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>Collect via GCash</span>
            </button>
          </div>
        )}
      </div>

      {/* Operational Bag Tag & Thermal Identification Card */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">qr_code_scanner</span>
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Bag Tag & Identification</h3>
          </div>
          <span className="text-[10px] font-bold bg-[#eaedff] dark:bg-[#283044] text-[#707881] px-2 py-0.5 rounded-full">
            Thermal 80mm
          </span>
        </div>

        {/* Mini Preview Mock */}
        <div className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] rounded-xl p-3.5 flex items-center justify-between border border-[#eaedff] dark:border-[#283044]">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#131b2e] dark:text-white tracking-wider">
                {order.id}
              </span>
              <span className="text-[10px] font-bold bg-[#cce5ff] text-[#004b73] px-2 py-0.5 rounded-full">
                {order.weightKg} KG
              </span>
            </div>
            <p className="text-xs text-[#707881] truncate">{order.customerName} • Comforter x1</p>

            {/* Barcode line representation */}
            <div className="flex items-center gap-0.5 mt-2 h-7 bg-white dark:bg-white p-1 rounded border border-gray-300">
              <span className="w-1 h-full bg-black"></span>
              <span className="w-2 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-1.5 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-2 h-full bg-black"></span>
              <span className="w-1 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-2.5 h-full bg-black"></span>
              <span className="w-1 h-full bg-black"></span>
            </div>
          </div>

          {/* QR Box */}
          <div
            onClick={onOpenTracker}
            className="flex flex-col items-center gap-1 bg-white dark:bg-[#283044] p-2 rounded-xl shadow-xs border border-gray-200 cursor-pointer hover:border-[#006194] transition-colors"
            title="Open Live Public Customer Tracker"
          >
            <span className="material-symbols-outlined text-[36px] text-[#006194]">qr_code_2</span>
            <span className="text-[9px] font-bold text-[#707881] dark:text-[#bfc7d2]">Live Tracker</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenReceipt(order)}
              className="h-11 rounded-xl bg-[#cce5ff] text-[#004b73] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#93ccff] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              Print Bag Tag
            </button>
            <button
              onClick={() => onOpenReceipt(order)}
              className="h-11 rounded-xl bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              Reprint Receipt
            </button>
          </div>

          <button
            onClick={onOpenTracker}
            className="w-full h-10 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] text-[#006194] dark:text-[#93ccff] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            Open Public Guest Tracker Link
          </button>
        </div>
      </div>

      {/* Customer SMS Notification Status Card */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00685f] text-[18px]">sms</span>
            <h4 className="text-xs font-bold text-[#131b2e] dark:text-white">Customer Notification</h4>
          </div>
          <span className="bg-[#89f5e7] text-[#00201d] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">done_all</span>
            Delivered
          </span>
        </div>
        <div className="bg-[#f2f3ff] dark:bg-[#131b2e] p-3 rounded-xl border border-[#eaedff] dark:border-[#283044]">
          <p className="text-xs text-[#131b2e] dark:text-white italic leading-relaxed">
            "{order.smsNotification?.text || `Hi Bea, your laundry is ready at Aquaspin Katipunan! Total ₱${order.totalAmount.toFixed(2)}. Located at ${order.shelfBin}. Present ticket ${order.id} upon pickup.`}"
          </p>
          <div className="flex items-center justify-between text-[#707881] text-[10px] mt-2 pt-1 border-t border-[#eaedff] dark:border-[#283044]">
            <span>Sent automatically via Semaphore SMS</span>
            <span>{order.smsNotification?.timestamp || 'Today • 1:45 PM'}</span>
          </div>
        </div>
        <button
          onClick={handleResendSms}
          className="text-[#006194] dark:text-[#93ccff] font-bold text-xs flex items-center justify-center gap-1 pt-1 hover:underline"
        >
          <span className="material-symbols-outlined text-[16px]">sync</span>
          Resend SMS Reminder
        </button>
      </div>
    </div>
  );
};
