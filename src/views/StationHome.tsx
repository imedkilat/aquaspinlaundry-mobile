import React, { useState } from 'react';
import { LaundryOrder } from '../types';

interface StationHomeProps {
  orders: LaundryOrder[];
  onNavigate: (tab: string, orderId?: string) => void;
  onCollectPayment: (order: LaundryOrder) => void;
  onOpenReceipt: (order: LaundryOrder) => void;
  onSendSms: (order: LaundryOrder) => void;
  isOwnerView: boolean;
  onToggleRole: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const StationHome: React.FC<StationHomeProps> = ({
  orders,
  onNavigate,
  onCollectPayment,
  onOpenReceipt,
  onSendSms,
  isOwnerView,
  onToggleRole,
  isDarkMode,
  onToggleTheme
}) => {
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'pickup' | 'progress'>('all');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    if (filter === 'unpaid') return order.paymentStatus === 'pay_later';
    if (filter === 'pickup') return order.status === 'pickup';
    if (filter === 'progress') return order.status === 'washing' || order.status === 'drying' || order.status === 'intake';
    return true;
  });

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Greeting, Shift & Interactive Mode Toggle */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h1 className="font-extrabold text-2xl text-[#131b2e] dark:text-white tracking-tight">
              Mabuhay, Maria!
            </h1>
            <span className="inline-flex items-center text-[20px]">🫧</span>
          </div>
          <div className="flex items-center gap-1 text-[#3f4850] dark:text-[#bfc7d2] text-xs mt-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#006194]">schedule</span>
            <span>Today, Oct 24 · Shift A (Morning)</span>
          </div>
        </div>

        {/* Dual Actions: Role Switch Pill & Theme Toggle */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onToggleRole}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#e2e7ff] dark:bg-[#283044] text-[#004b74] dark:text-[#93ccff] hover:bg-[#dae2fd] transition-colors shadow-xs"
            title="Switch Between Staff & Owner View"
          >
            <span className="w-2 h-2 rounded-full bg-[#00685f] animate-pulse"></span>
            <span className="text-xs font-bold">{isOwnerView ? 'Owner View' : 'Staff View'}</span>
            <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
          </button>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme appearance"
            className="w-9 h-9 rounded-full bg-[#e2e7ff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] flex items-center justify-center hover:bg-[#dae2fd] transition-colors shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>

      {/* Key Metrics Bento Grid (Philippine Peso ₱) */}
      <div className="grid grid-cols-1 gap-3">
        {/* Top Highlight: Gross Revenue with Breakdown */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-[#eaedff] dark:border-[#283044]">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#eaedff]/60 dark:bg-[#283044]/40 pointer-events-none"></div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] dark:bg-[#283044] flex items-center justify-center text-[#006194] dark:text-[#93ccff]">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#707881] dark:text-[#bfc7d2] uppercase tracking-wider">
                  Today's Gross Sales
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl font-bold text-[#131b2e] dark:text-white tracking-tight">
                    ₱12,450.00
                  </span>
                  <span className="inline-flex items-center text-[11px] font-bold text-[#00685f] bg-[#e6f4f2] dark:bg-[#004b45] px-1.5 py-0.5 rounded-full">
                    +18%
                  </span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bfc7d2] text-[20px]">trending_up</span>
          </div>

          {/* Payment Breakdown Micro Bar */}
          <div className="mt-4 pt-1 flex flex-col gap-1.5">
            <div className="w-full h-2 rounded-full bg-[#eaedff] dark:bg-[#283044] overflow-hidden flex">
              <div className="h-full bg-[#006194]" style={{ width: '58%' }} title="Counter Cash ₱7,200 (58%)"></div>
              <div className="h-full bg-[#7bc2ff]" style={{ width: '42%' }} title="GCash ₱5,250 (42%)"></div>
            </div>
            <div className="flex items-center justify-between text-[#3f4850] dark:text-[#bfc7d2] text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
                Cash: <strong className="text-[#131b2e] dark:text-white font-semibold">₱7,200.00</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7bc2ff]"></span>
                GCash: <strong className="text-[#131b2e] dark:text-white font-semibold">₱5,250.00</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Metrics 2-Card Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Total Transactions */}
          <div className="rounded-2xl bg-white dark:bg-[#1a2235] p-3.5 flex flex-col justify-between shadow-sm border border-[#eaedff] dark:border-[#283044]">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-[#eaedff] dark:bg-[#283044] flex items-center justify-center text-[#006194] dark:text-[#93ccff]">
                <span className="material-symbols-outlined text-[19px]">local_laundry_service</span>
              </span>
              <span className="text-[10px] font-bold text-[#00685f] bg-[#e6f4f2] dark:bg-[#004b45] px-1.5 py-0.5 rounded-full">
                +14%
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-[#707881] dark:text-[#bfc7d2]">Transactions</span>
              <p className="text-xl font-bold text-[#131b2e] dark:text-white mt-0.5">
                42 <span className="text-xs font-normal text-[#707881]">Loads</span>
              </p>
            </div>
          </div>

          {/* Attention Needed: Unsettled Pay-Later Balance */}
          <div className="rounded-2xl bg-[#ffdad6]/40 dark:bg-[#93000a]/20 p-3.5 flex flex-col justify-between shadow-sm border border-[#ffdad6] dark:border-[#93000a]/40">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-[#ffdad6] dark:bg-[#93000a]/50 flex items-center justify-center text-[#ba1a1a] dark:text-[#ffdad6]">
                <span className="material-symbols-outlined text-[19px]">pending_actions</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#ba1a1a] text-white uppercase tracking-wider">
                Needs Care
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-bold text-[#ba1a1a] dark:text-[#ffdad6]">Unpaid Balances</span>
              <p className="text-xl font-bold text-[#131b2e] dark:text-white mt-0.5">
                ₱1,880.00
              </p>
              <span className="text-[11px] text-[#707881] dark:text-[#bfc7d2]">6 tickets unsettled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Interactive CTAs */}
      <div className="flex flex-col gap-2">
        {/* Hero Action: New Order Intake */}
        <button
          onClick={() => onNavigate('new-order')}
          className="group relative overflow-hidden rounded-2xl bg-[#006194] text-white p-4 shadow-md active:scale-[0.99] transition-all text-left w-full"
        >
          <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[110px]">add_circle</span>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[26px]">add_task</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">New Order Intake</h2>
                <p className="text-xs text-white/85 mt-0.5">Scan customer QR or enter kilo weight</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[24px] text-white/90 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Quick Utilities Horizontal Row */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigate('new-order')}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white dark:bg-[#1a2235] text-[#131b2e] dark:text-white shadow-sm hover:bg-[#f2f3ff] transition-colors border border-[#eaedff] dark:border-[#283044]"
          >
            <span className="material-symbols-outlined text-[#006194] text-[20px]">scale</span>
            <span className="text-xs font-bold truncate">Quick Weigh In</span>
          </button>
          <button
            onClick={() => {
              const sample = orders.find((o) => o.id === '#AQ-1081') || orders[0];
              onOpenReceipt(sample);
            }}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white dark:bg-[#1a2235] text-[#131b2e] dark:text-white shadow-sm hover:bg-[#f2f3ff] transition-colors border border-[#eaedff] dark:border-[#283044]"
          >
            <span className="material-symbols-outlined text-[#006399] text-[20px]">print</span>
            <span className="text-xs font-bold truncate">Print Shelf Claim</span>
          </button>
        </div>
      </div>

      {/* Operational Machine Bays Live Gauge */}
      <div className="rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-[#eaedff] dark:border-[#283044]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">tune</span>
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Machine Bay Status</h3>
          </div>
          <span className="text-[10px] font-bold text-[#00685f] bg-[#e6f4f2] dark:bg-[#004b45] px-2 py-0.5 rounded-full">
            Optimal Load
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Washers Status */}
          <div className="rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] dark:text-[#bfc7d2] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#006194]">water_drop</span>
                Washers
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#cce5ff] text-[#004b73]">
                8/10 Run
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#eaedff] dark:bg-[#283044] overflow-hidden">
              <div className="h-full bg-[#006194] rounded-full" style={{ width: '80%' }}></div>
            </div>
            <span className="text-[11px] text-[#707881] dark:text-[#bfc7d2]">2 bays ready for loading</span>
          </div>

          {/* Dryers Status */}
          <div className="rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] dark:text-[#bfc7d2] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#00685f]">mode_fan</span>
                Dryers
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#89f5e7] text-[#005049]">
                7/8 Run
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#eaedff] dark:bg-[#283044] overflow-hidden">
              <div className="h-full bg-[#008378] rounded-full" style={{ width: '87.5%' }}></div>
            </div>
            <span className="text-[11px] text-[#707881] dark:text-[#bfc7d2]">1 tumbler cooling down</span>
          </div>
        </div>
      </div>

      {/* Operational Activity / Queue Ledger */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Queue Ledger</h3>
            <span className="w-2 h-2 rounded-full bg-[#00685f]"></span>
          </div>
          <span className="text-xs text-[#707881] dark:text-[#bfc7d2]">Katipunan Station</span>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
            }`}
          >
            All (42)
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === 'unpaid'
                ? 'bg-[#ba1a1a] text-white shadow-sm'
                : 'bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
            }`}
          >
            Pay Later (6)
          </button>
          <button
            onClick={() => setFilter('pickup')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === 'pickup'
                ? 'bg-[#008378] text-white shadow-sm'
                : 'bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
            }`}
          >
            Ready for Pickup (12)
          </button>
          <button
            onClick={() => setFilter('progress')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === 'progress'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
            }`}
          >
            In Progress (15)
          </button>
        </div>

        {/* Ticket Cards List */}
        <div className="flex flex-col gap-2.5">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl bg-white dark:bg-[#1a2235] p-6 text-center flex flex-col items-center justify-center border border-[#eaedff] dark:border-[#283044]">
              <span className="material-symbols-outlined text-3xl text-[#006194] mb-2">soap</span>
              <p className="font-bold text-sm text-[#131b2e] dark:text-white">No tickets match this filter</p>
              <p className="text-xs text-[#707881] mt-1">All loads in this category are cleared and smelling fresh!</p>
            </div>
          ) : (
            filteredOrders.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3 transition-transform active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      onClick={() => onNavigate('customer-detail')}
                      className="w-10 h-10 rounded-full bg-[#cde5ff] text-[#001d32] dark:bg-[#283044] dark:text-[#94ccff] flex items-center justify-center font-bold text-sm flex-shrink-0 cursor-pointer"
                    >
                      {ticket.customerInitial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4
                          onClick={() => onNavigate('order-detail', ticket.id)}
                          className="font-bold text-sm text-[#131b2e] dark:text-white truncate cursor-pointer hover:text-[#006194]"
                        >
                          {ticket.customerName}
                        </h4>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#eaedff] dark:bg-[#283044] text-[#3f4850] dark:text-[#bfc7d2]">
                          {ticket.id}
                        </span>
                      </div>
                      <p className="text-xs text-[#707881] dark:text-[#bfc7d2] mt-0.5">
                        {ticket.serviceName} · {ticket.weightKg} kg
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0 ${
                    ticket.status === 'pickup'
                      ? 'bg-[#89f5e7] text-[#00201d]'
                      : ticket.status === 'drying'
                      ? 'bg-[#cce5ff] text-[#004b73]'
                      : ticket.status === 'washing'
                      ? 'bg-[#dae2fd] text-[#004b74]'
                      : ticket.status === 'completed'
                      ? 'bg-[#eaedff] text-[#3f4850]'
                      : 'bg-[#ffdad6] text-[#93000a]'
                  }`}>
                    {ticket.status === 'drying' && <span className="w-1.5 h-1.5 rounded-full bg-[#006194] animate-ping"></span>}
                    {ticket.status === 'pickup' && <span className="material-symbols-outlined text-[13px]">check</span>}
                    {ticket.statusLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] dark:border-[#283044]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ticket.paymentStatus === 'pay_later'
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : ticket.paymentStatus === 'gcash_paid'
                        ? 'bg-[#005ce6] text-white'
                        : 'bg-[#16a34a] text-white'
                    }`}>
                      {ticket.paymentStatus === 'pay_later' ? (
                        <>
                          <span className="material-symbols-outlined text-[12px]">warning</span>
                          Pay Later Unpaid
                        </>
                      ) : ticket.paymentStatus === 'gcash_paid' ? (
                        <>
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          GCash Paid
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[12px]">payments</span>
                          Cash Paid
                        </>
                      )}
                    </span>
                    <span className={`text-xs font-bold ${ticket.paymentStatus === 'pay_later' ? 'text-[#ba1a1a]' : 'text-[#131b2e] dark:text-white'}`}>
                      ₱{ticket.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Micro Actions */}
                  <div className="flex items-center gap-1">
                    {ticket.paymentStatus === 'pay_later' && (
                      <button
                        onClick={() => onCollectPayment(ticket)}
                        className="px-2.5 py-1 rounded-full bg-[#006194] text-white text-[11px] font-bold hover:bg-[#007bb9] active:scale-95 transition-transform"
                      >
                        Collect ₱{ticket.totalAmount}
                      </button>
                    )}
                    <button
                      onClick={() => onSendSms(ticket)}
                      className="w-8 h-8 rounded-full bg-[#f2f3ff] dark:bg-[#283044] text-[#3f4850] dark:text-[#bfc7d2] hover:text-[#006194] flex items-center justify-center transition-colors"
                      title="SMS Customer Update"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                    </button>
                    <button
                      onClick={() => onNavigate('order-detail', ticket.id)}
                      className="w-8 h-8 rounded-full bg-[#f2f3ff] dark:bg-[#283044] text-[#3f4850] dark:text-[#bfc7d2] hover:text-[#006194] flex items-center justify-center transition-colors"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Neighborhood Store Announcement Micro Card */}
      <div className="rounded-2xl bg-[#e2e7ff]/70 dark:bg-[#283044]/50 p-3.5 flex items-center gap-3 border border-[#dae2fd] dark:border-[#283044]">
        <span className="material-symbols-outlined text-[#006194] text-[24px] flex-shrink-0">
          tips_and_updates
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold text-[#131b2e] dark:text-white uppercase tracking-wider">
            Aroma Drop Restock
          </p>
          <p className="text-xs text-[#3f4850] dark:text-[#bfc7d2] truncate">
            Downy Mystique & Ariel Sunrise fresh supplies delivered.
          </p>
        </div>
        <button
          onClick={() => onNavigate('settings')}
          className="text-xs text-[#006194] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-[#1a2235] shadow-xs flex-shrink-0 hover:bg-[#eaedff]"
        >
          OK
        </button>
      </div>

      {/* Public Guest Order Tracker Entry Link */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('tracker')}
          className="text-xs font-semibold text-[#006194] hover:underline inline-flex items-center gap-1"
        >
          <span>Open Public Customer Tracker for #AQ-1081</span>
          <span className="material-symbols-outlined text-[15px]">open_in_new</span>
        </button>
      </div>
    </div>
  );
};
