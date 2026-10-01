import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';
import { LaundryOrder } from '../types';

interface CustomerTrackerProps {
  order: LaundryOrder;
  onBackToPos: () => void;
  onSettlePayment?: (method: 'gcash' | 'cash') => void;
  showToast: (msg: string, icon?: string) => void;
}

export const CustomerTracker: React.FC<CustomerTrackerProps> = ({
  order,
  onBackToPos,
  onSettlePayment,
  showToast
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(order.id);
    setCopied(true);
    showToast(`Claim Code ${order.id} copied to clipboard!`, 'content_copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGCash = () => {
    if (onSettlePayment) onSettlePayment('gcash');
    showToast(`Redirecting to GCash Checkout for ₱${order.totalAmount.toFixed(2)}...`, 'payments');
  };

  const isReady = order.status === 'pickup';
  const isCompleted = order.status === 'completed';
  const isPayLater = order.paymentStatus === 'pay_later';

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface font-body-md text-body-md text-on-surface pb-24 max-w-lg mx-auto">
      {/* Return to Staff Terminal Bar */}
      <div className="bg-primary text-on-primary px-margin py-2 flex items-center justify-between text-xs">
        <span className="font-semibold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          Public Guest View
        </span>
        <button
          onClick={onBackToPos}
          className="font-bold underline hover:opacity-80 flex items-center gap-1"
        >
          <span>Return to Staff Terminal</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      <div className="px-margin py-space-md flex flex-col gap-space-md">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">local_laundry_service</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-tertiary-container tracking-wider uppercase font-bold">
                Live Receipt Order Tracker
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                {STORE_INFO.branch}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface-variant shadow-sm flex-shrink-0 font-bold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-ping"></span>
            <span className="font-label-sm text-label-sm">Live Status</span>
          </div>
        </div>

        {/* Claim Code Hero Card */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-md border border-outline-variant/20">
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-primary/5 pointer-events-none"></div>
          <div className="flex flex-col gap-space-sm relative z-10">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                Counter Claim Ticket
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-high px-2.5 py-0.5 rounded-full text-on-surface font-bold">
                {order.shelfBin}
              </span>
            </div>

            <div className="flex items-center justify-between gap-space-sm bg-surface-container-low p-space-sm rounded-lg border border-outline-variant/20">
              <div className="flex flex-col min-w-0">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Claim Code</span>
                <div className="flex items-center gap-2">
                  <span className="font-display-mobile text-display-mobile tracking-wider text-primary font-bold">
                    {order.id}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    aria-label="Copy Claim Code"
                    className="h-8 w-8 rounded-full bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container flex items-center justify-center transition-transform active:scale-95 border border-outline-variant/20"
                    title="Copy Claim Code"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {copied ? 'done' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Barcode & QR Stamp */}
              <div className="flex flex-col items-center bg-surface-container-lowest p-1.5 rounded shadow-sm border border-outline-variant/20 flex-shrink-0">
                <svg className="w-16 h-10 text-on-surface" fill="currentColor" viewBox="0 0 100 48">
                  <rect height="38" width="3" x="2" y="4"></rect>
                  <rect height="38" width="2" x="7" y="4"></rect>
                  <rect height="38" width="6" x="12" y="4"></rect>
                  <rect height="38" width="2" x="20" y="4"></rect>
                  <rect height="38" width="4" x="25" y="4"></rect>
                  <rect height="38" width="3" x="32" y="4"></rect>
                  <rect height="38" width="2" x="37" y="4"></rect>
                  <rect height="38" width="7" x="42" y="4"></rect>
                  <rect height="38" width="2" x="52" y="4"></rect>
                  <rect height="38" width="4" x="56" y="4"></rect>
                  <rect height="38" width="5" x="62" y="4"></rect>
                  <rect height="38" width="2" x="70" y="4"></rect>
                  <rect height="38" width="6" x="74" y="4"></rect>
                  <rect height="38" width="2" x="82" y="4"></rect>
                  <rect height="38" width="5" x="86" y="4"></rect>
                  <rect height="38" width="4" x="93" y="4"></rect>
                </svg>
                <span className="font-label-sm text-label-sm text-outline tracking-widest mt-0.5 font-mono">
                  {order.id.replace('#', '')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant pt-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">person</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">scale</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {order.weightKg} kg {order.serviceName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Celebratory Ready for Pickup Banner */}
        {isReady && (
          <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-tertiary-container to-tertiary p-space-md text-on-tertiary shadow-lg">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-space-sm">
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-headline-sm text-white font-bold leading-tight">
                    Fresh Laundry is Ready for Pickup! 🎉
                  </span>
                  <span className="font-body-sm text-body-sm text-white/90 mt-0.5">
                    Clean, neatly folded & sealed in Eco-Bags on {order.shelfBin}.
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-black/15 backdrop-blur-sm p-space-sm flex flex-col gap-1 mt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white/95">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">schedule</span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      Finished today at {order.completedTime || '1:45 PM'}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                    Stored Safely
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-200 mt-1">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span className="font-label-sm text-label-sm text-white">
                    Store closes at <strong className="underline font-bold text-white">9:00 PM today</strong>. Please present Claim Code {order.id}.
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Visual Step Tracker */}
        <section className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Cycle Timeline</h2>
            <span className="font-label-sm text-label-sm text-primary font-bold">
              Step {order.stageStep} of 5
            </span>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            {[
              { num: 1, title: 'Received & Weighed', sub: 'Intake Tagged at POS' },
              { num: 2, title: 'Washing Cycle', sub: 'Washer #03 • Gentle Spin' },
              { num: 3, title: 'Drying & Fluffing', sub: 'Dryer #02 • Low Heat Dry' },
              { num: 4, title: 'Folded & Shelf Ready', sub: `Secured at ${order.shelfBin}` },
              { num: 5, title: 'Claimed & Released', sub: 'Ticket Completed' }
            ].map((step) => {
              const isDone = order.stageStep >= step.num;
              const isCurrent = order.stageStep === step.num;

              return (
                <div key={step.num} className="flex items-start gap-space-sm relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                      isDone ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isDone ? 'check' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-label-lg text-label-lg ${isCurrent ? 'text-primary font-bold' : isDone ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>
                      {step.title}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{step.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Payment Balance Alert & Online Checkout */}
        {isPayLater && (
          <section className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/20 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Unsettled Balance</span>
              <span className="font-currency-display text-currency-display text-primary font-extrabold">
                ₱{order.totalAmount.toFixed(2)}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Pay via GCash for express contactless counter claim, or pay cash upon counter pickup.
            </p>
            <div className="grid grid-cols-2 gap-space-xs pt-1">
              <button
                type="button"
                onClick={handleGCash}
                className="py-3 px-4 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md text-label-md font-bold shadow-sm active:scale-95 transition-all text-center flex items-center justify-center gap-1"
              >
                <span>Pay via GCash</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Please prepare cash amount upon pickup.', 'point_of_sale')}
                className="py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-semibold transition-colors text-center"
              >
                Pay Cash at Shop
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
