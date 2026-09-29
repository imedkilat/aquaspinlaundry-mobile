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
  const [showPwaBanner, setShowPwaBanner] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(order.id);
    setCopied(true);
    showToast(`Claim Code ${order.id} copied to clipboard!`, 'content_copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGCash = () => {
    if (onSettlePayment) onSettlePayment('gcash');
    showToast('Redirecting to GCash Express Checkout (₱420.00)...', 'payments');
  };

  const handleCash = () => {
    if (onSettlePayment) onSettlePayment('cash');
    showToast('Noted: Please prepare ₱420.00 counter cash upon pickup.', 'point_of_sale');
  };

  return (
    <div className="flex flex-col w-full pb-20 max-w-lg mx-auto bg-[#faf8ff] dark:bg-[#0b1120]">
      {/* Top Banner Navigation back to Staff Terminal */}
      <div className="bg-[#006194] text-white px-4 py-2 flex items-center justify-between text-xs">
        <span className="font-semibold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          Public Customer View
        </span>
        <button
          onClick={onBackToPos}
          className="font-bold underline hover:opacity-80 flex items-center gap-1"
        >
          <span>Return to Staff Terminal</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Welcome Live Context Header */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#7bc2ff]/30 flex items-center justify-center text-[#006399] shadow-xs flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">local_laundry_service</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-extrabold text-[#008378] tracking-wider uppercase">
                  Live Receipt Order Tracker
                </span>
                <span className="font-bold text-sm text-[#131b2e] dark:text-white truncate">
                  Katipunan Ave. Branch (QC)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] dark:bg-[#283044] text-[#131b2e] dark:text-white shadow-xs flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#008378] animate-ping"></span>
              <span className="text-[11px] font-bold">Live Status</span>
            </div>
          </div>

          {/* Claim Code Hero Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-[#eaedff] dark:border-[#283044]">
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#006194]/5 pointer-events-none"></div>
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between text-[#707881] text-xs">
                <span className="font-bold uppercase tracking-wider">Counter Claim Ticket</span>
                <span className="text-[11px] font-bold bg-[#eaedff] dark:bg-[#283044] px-2.5 py-0.5 rounded-full text-[#131b2e] dark:text-white">
                  Shelf Bin: {order.shelfBin}
                </span>
              </div>

              {/* Big Code and Barcode */}
              <div className="flex items-center justify-between gap-3 bg-[#f2f3ff] dark:bg-[#131b2e] p-3 rounded-xl border border-[#eaedff] dark:border-[#283044]">
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-[#707881]">Claim Code</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-wider text-[#006194] dark:text-[#93ccff]">
                      {order.id}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      aria-label="Copy Claim Code"
                      className="h-8 w-8 rounded-full bg-white dark:bg-[#283044] text-[#006194] shadow-xs hover:bg-[#eaedff] flex items-center justify-center active:scale-95 transition-transform"
                      title="Copy Claim Code"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Decorative Barcode */}
                <div className="flex flex-col items-center bg-white dark:bg-white p-1.5 rounded-lg shadow-xs border border-gray-200 flex-shrink-0">
                  <svg className="w-16 h-9 text-black" fill="currentColor" viewBox="0 0 100 48">
                    <rect x="2" y="4" width="3" height="38" />
                    <rect x="7" y="4" width="2" height="38" />
                    <rect x="12" y="4" width="6" height="38" />
                    <rect x="20" y="4" width="2" height="38" />
                    <rect x="25" y="4" width="4" height="38" />
                    <rect x="32" y="4" width="3" height="38" />
                    <rect x="37" y="4" width="2" height="38" />
                    <rect x="42" y="4" width="7" height="38" />
                    <rect x="52" y="4" width="2" height="38" />
                    <rect x="56" y="4" width="4" height="38" />
                    <rect x="62" y="4" width="5" height="38" />
                    <rect x="70" y="4" width="2" height="38" />
                    <rect x="74" y="4" width="6" height="38" />
                    <rect x="82" y="4" width="2" height="38" />
                    <rect x="86" y="4" width="5" height="38" />
                    <rect x="93" y="4" width="4" height="38" />
                  </svg>
                  <span className="text-[9px] text-gray-600 font-mono font-bold tracking-widest mt-0.5">
                    {order.id.replace('#', '')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#3f4850] dark:text-[#bfc7d2] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00685f]">person</span>
                  <span className="font-semibold text-[#131b2e] dark:text-white">{order.customerName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006194]">scale</span>
                  <span className="font-semibold text-[#131b2e] dark:text-white">{order.weightKg} kg Comforter Load</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Celebratory & Urgent 'Ready for Pickup' Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#008378] to-[#00685f] p-4 text-white shadow-lg">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-white leading-tight">
                  Fresh Laundry is Ready for Pickup! 🎉
                </span>
                <span className="text-xs text-white/90 mt-0.5">
                  Clean, neatly folded & sealed in Eco-Bags on Shelf B-04.
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-black/15 backdrop-blur-sm p-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/95">
                  <span className="material-symbols-outlined text-[16px] text-[#89f5e7]">schedule</span>
                  <span className="text-xs font-semibold">Finished today at 3:15 PM</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#89f5e7] text-[#00201d] text-[10px] font-bold">
                  Stored Safely
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-200 mt-1">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span className="text-xs text-white">
                  Store closes at <strong className="underline font-bold text-white">8:00 PM today</strong>. Please present Claim Code {order.id}.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Visual Step Tracker */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Cycle & Processing Timeline</h2>
            <span className="text-xs text-[#006194] dark:text-[#93ccff] font-bold">Step 4 of 5</span>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3 relative">
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-[#006194]/30"></div>
              <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-xs flex-shrink-0 z-10">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white">1. Received & Weighed</span>
                  <span className="text-[11px] text-[#707881]">10:15 AM</span>
                </div>
                <p className="text-xs text-[#707881] mt-0.5">12.0 kg recorded • Heavy Comforter & Bed Delicates segregation</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 relative">
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-[#006194]/30"></div>
              <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-xs flex-shrink-0 z-10">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white">2. Washing & Stain Treatment</span>
                  <span className="text-[11px] text-[#707881]">10:45 AM</span>
                </div>
                <p className="text-xs text-[#707881] mt-0.5">Eco Deep Wash cycle + Ariel Sunrise & Downy Mystique added</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 relative">
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-[#00685f]"></div>
              <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-xs flex-shrink-0 z-10">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white">3. Tumble Drying & Sanitize</span>
                  <span className="text-[11px] text-[#707881]">12:30 PM</span>
                </div>
                <p className="text-xs text-[#707881] mt-0.5">High-heat anti-allergen fluff cycle completed in Dryer Bay #06</p>
              </div>
            </div>

            {/* Step 4: Active */}
            <div className="flex items-start gap-3 relative">
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-[#dae2fd]"></div>
              <div className="relative w-8 h-8 rounded-full bg-[#008378] text-white flex items-center justify-center shadow-md flex-shrink-0 z-10">
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span className="absolute inset-0 rounded-full bg-[#008378] animate-ping opacity-30"></span>
              </div>
              <div className="flex-1 min-w-0 bg-[#f2f3ff] dark:bg-[#131b2e] p-3 rounded-xl border border-[#cce5ff]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00685f] dark:text-[#89f5e7] flex items-center gap-1.5">
                    4. Ready for Pickup
                    <span className="px-1.5 py-0.2 rounded bg-[#00685f] text-white text-[9px] font-bold">NOW</span>
                  </span>
                  <span className="text-xs font-bold text-[#00685f]">1:45 PM</span>
                </div>
                <p className="text-xs text-[#131b2e] dark:text-white mt-1">
                  Folded, steam-pressed & sealed in breathable Eco-Bag in <strong>Bin #B-04</strong>
                </p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#dae2fd] text-[11px] text-[#707881]">
                  <span className="material-symbols-outlined text-[15px] text-[#00685f]">inventory_2</span>
                  <span>Tagged by Attendant: Marites D.</span>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-[#eaedff] dark:bg-[#283044] text-[#707881] flex items-center justify-center flex-shrink-0 z-10">
                <span className="material-symbols-outlined text-[18px]">done_all</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#707881]">5. Completed & Claimed</span>
                  <span className="text-[11px] text-[#707881]">Pending</span>
                </div>
                <p className="text-xs text-[#707881] mt-0.5">Counter sign-out and digital claim receipt validation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary & Settle */}
        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-sm text-[#131b2e] dark:text-white px-1">Order Summary & Settle</h2>
          <div className="rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff] dark:border-[#283044]">
              <div>
                <span className="text-[11px] text-[#707881] block">Customer Reference</span>
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">{order.customerName} • 0917-***-4921</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold">
                Walk-in Drop
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-[#131b2e] dark:text-white">Premium Wash + Comforter Care</p>
                  <p className="text-[11px] text-[#707881]">12.0 kg bulk blanket weight tier</p>
                </div>
                <span className="font-bold text-[#131b2e] dark:text-white">₱360.00</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-[#131b2e] dark:text-white">Fragrance Upgrade & Softener</p>
                  <p className="text-[11px] text-[#707881]">Ariel Sunrise Fresh + Downy Mystique</p>
                </div>
                <span className="font-bold text-[#131b2e] dark:text-white">₱60.00</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] dark:border-[#283044]">
              <span className="text-sm font-bold text-[#131b2e] dark:text-white">Total Amount</span>
              <span className="text-2xl font-bold text-[#006194] dark:text-[#93ccff]">₱420.00</span>
            </div>

            {/* Pay Later Balance Callout */}
            <div className="rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] p-3 flex flex-col gap-2.5 border border-[#cce5ff]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006399] text-[20px] flex-shrink-0 mt-0.5">
                  account_balance_wallet
                </span>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white block">
                    Pay Later Balance: ₱420.00
                  </span>
                  <span className="text-[11px] text-[#707881]">
                    You can settle comfortably via GCash or Cash at the counter upon pickup.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleGCash}
                  className="h-11 rounded-xl bg-[#005ce6] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  <span>Pay with GCash</span>
                </button>
                <button
                  onClick={handleCash}
                  className="h-11 rounded-xl bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                  <span>Cash at Desk</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Store Contact & Navigation */}
        <section className="rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Store Contact & Navigation</h3>
            <span className="text-[10px] font-bold text-[#008378] bg-[#e6f4f2] dark:bg-[#004b45] px-2 py-0.5 rounded-full">
              Open Now
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#3f4850] dark:text-[#bfc7d2]">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">store</span>
            <div className="min-w-0">
              <p className="font-semibold text-[#131b2e] dark:text-white">{STORE_INFO.branch}</p>
              <p className="text-[11px] text-[#707881]">{STORE_INFO.hours} • {STORE_INFO.landmark}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <a
              href="tel:+639171234567"
              className="h-11 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] flex flex-col items-center justify-center text-[#006194] hover:bg-[#eaedff] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="text-[10px] font-bold mt-0.5">Call Shop</span>
            </a>
            <a
              href="sms:+639171234567"
              className="h-11 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] flex flex-col items-center justify-center text-[#006194] hover:bg-[#eaedff] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="text-[10px] font-bold mt-0.5">Send SMS</span>
            </a>
            <a
              href="https://maps.google.com/?q=Katipunan+Avenue+Quezon+City"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] flex flex-col items-center justify-center text-[#006194] hover:bg-[#eaedff] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">directions</span>
              <span className="text-[10px] font-bold mt-0.5">Waze / Maps</span>
            </a>
          </div>
        </section>

        {/* PWA Reminder Banner */}
        {showPwaBanner && (
          <aside className="rounded-2xl bg-gradient-to-r from-[#e2e7ff] to-[#dae2fd] dark:from-[#1a2235] dark:to-[#283044] p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#cce5ff]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[19px]">bookmark_add</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#131b2e] dark:text-white">Bookmark this Load</p>
                <p className="text-[11px] text-[#707881] dark:text-[#bfc7d2] truncate">Instant 1-tap live check on your phone</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => showToast('Press Share ➦ then "Add to Home Screen"', 'add_to_home_screen')}
                className="px-3 py-1.5 rounded-full bg-[#006194] text-white text-xs font-bold shadow-xs active:scale-95 transition-transform"
              >
                Add
              </button>
              <button
                onClick={() => setShowPwaBanner(false)}
                className="w-7 h-7 rounded-full text-[#707881] hover:text-[#131b2e] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
