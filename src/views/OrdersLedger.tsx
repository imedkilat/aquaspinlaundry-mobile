import React, { useState } from 'react';
import { LaundryOrder } from '../types';

interface OrdersLedgerProps {
  orders: LaundryOrder[];
  onNavigate: (tab: string, orderId?: string) => void;
  onOpenReceipt: (order: LaundryOrder) => void;
  onCollectPayment: (order: LaundryOrder) => void;
  onAdvanceStage: (order: LaundryOrder) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const OrdersLedger: React.FC<OrdersLedgerProps> = ({
  orders,
  onNavigate,
  onOpenReceipt,
  onCollectPayment,
  onAdvanceStage,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'progress' | 'pickup' | 'unpaid' | 'completed'>('all');

  const filtered = orders.filter((order) => {
    // Search matching by customer name, order ID, phone, or service
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.id.replace('#', '').toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.customerPhone.toLowerCase().includes(q) ||
      order.shelfBin.toLowerCase().includes(q) ||
      order.serviceName.toLowerCase().includes(q);

    if (!matchSearch) return false;

    // Filter matching
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return order.status !== 'completed' || order.paymentStatus === 'pay_later';
    if (activeFilter === 'progress') return order.status === 'intake' || order.status === 'washing' || order.status === 'drying';
    if (activeFilter === 'pickup') return order.status === 'pickup';
    if (activeFilter === 'unpaid') return order.paymentStatus === 'pay_later';
    if (activeFilter === 'completed') return order.status === 'completed';
    return true;
  });

  const pendingCount = orders.filter((o) => o.status !== 'completed' || o.paymentStatus === 'pay_later').length;

  return (
    <div className="flex flex-col w-full pb-24 max-w-lg mx-auto">
      {/* Top Banner Accent Layer */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-extrabold text-2xl text-[#131b2e] dark:text-white tracking-tight">
              Orders Ledger
            </h1>
            <p className="text-xs text-[#707881] dark:text-[#bfc7d2] flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00685f] animate-pulse"></span>
              Katipunan Branch • Shift A (06:00 - 14:30)
            </p>
          </div>
          <button
            onClick={() => showToast('Batch filter drawer toggled', 'tune')}
            aria-label="Quick batch actions"
            className="w-10 h-10 rounded-xl bg-[#eaedff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Quick Metric Chips Bar */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div className="bg-white dark:bg-[#1a2235] rounded-xl p-2.5 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#006194]">local_laundry_service</span> Total
            </span>
            <span className="text-sm font-extrabold text-[#131b2e] dark:text-white mt-1">
              42 <span className="text-[10px] font-normal text-[#707881]">loads</span>
            </span>
          </div>

          <div className="bg-white dark:bg-[#1a2235] rounded-xl p-2.5 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#00685f]">payments</span> Today
            </span>
            <span className="text-sm font-extrabold text-[#006194] dark:text-[#93ccff] mt-1">
              ₱14,330
            </span>
          </div>

          <div className="bg-white dark:bg-[#1a2235] rounded-xl p-2.5 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#ba1a1a]">pending_actions</span> Pay-Later
            </span>
            <span className="text-sm font-extrabold text-[#ba1a1a] mt-1">
              6 <span className="text-[10px] font-normal text-[#707881]">due</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search & Scan Bar */}
      <div className="px-4 py-2 flex flex-col gap-2">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#006194] text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name or Order ID (e.g. #AQ-1081, Bea)..."
            className="w-full bg-white dark:bg-[#1a2235] text-[#131b2e] dark:text-white placeholder:text-[#707881] text-xs font-semibold rounded-xl pl-11 pr-20 py-3 shadow-xs border border-[#eaedff] dark:border-[#283044] focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="w-7 h-7 rounded-lg text-[#707881] hover:text-[#131b2e] dark:hover:text-white flex items-center justify-center transition-colors"
                title="Clear Search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setSearchQuery('1081');
                showToast('Scanned QR code: loaded order #AQ-1081', 'qr_code_scanner');
              }}
              className="w-8 h-8 rounded-lg bg-[#eaedff] dark:bg-[#283044] text-[#006194] flex items-center justify-center hover:bg-[#006194] hover:text-white transition-colors"
              title="Scan QR Ticket"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            </button>
          </div>
        </div>

        {/* Quick Search Shortcut Chips for Faster Access to Pending Tasks */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-[#707881] font-semibold flex-shrink-0 text-[10px] uppercase tracking-wider">
            Quick:
          </span>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('pending');
              setSearchQuery('');
              showToast('Filtered: All Pending Tasks', 'bolt');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold flex-shrink-0 flex items-center gap-1 transition-all ${
              activeFilter === 'pending' && !searchQuery
                ? 'bg-[#006194] text-white'
                : 'bg-[#eaedff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] hover:bg-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">bolt</span>
            <span>Pending Tasks ({pendingCount})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchQuery('1081');
              showToast('Searching #AQ-1081 (Bea Santos)', 'search');
            }}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] hover:text-[#006194] border border-[#eaedff] dark:border-[#283044] font-semibold flex-shrink-0"
          >
            #AQ-1081
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchQuery('Bea');
              showToast('Searching customer Bea Santos', 'search');
            }}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] hover:text-[#006194] border border-[#eaedff] dark:border-[#283044] font-semibold flex-shrink-0"
          >
            Bea Santos
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchQuery('1082');
              showToast('Searching #AQ-1082 (Juan Dela Cruz)', 'search');
            }}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] hover:text-[#006194] border border-[#eaedff] dark:border-[#283044] font-semibold flex-shrink-0"
          >
            #AQ-1082
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter('unpaid');
              setSearchQuery('');
              showToast('Filtered: Unpaid Tasks', 'warning');
            }}
            className="px-2.5 py-1 rounded-lg bg-[#ffdad6]/60 dark:bg-[#93000a]/30 text-[#ba1a1a] dark:text-[#ffdad6] font-semibold flex-shrink-0 flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
            <span>Unpaid (6)</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar px-4 py-1 flex items-center gap-1.5">
        {[
          { key: 'all', label: 'All', count: 42 },
          { key: 'pending', label: 'Pending Tasks', count: pendingCount, highlight: true },
          { key: 'progress', label: 'In Progress', count: 18 },
          { key: 'pickup', label: 'Ready for Pickup', count: 12 },
          { key: 'unpaid', label: 'Pay Later Unpaid', count: 6 },
          { key: 'completed', label: 'Completed', count: 6 }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveFilter(item.key as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0 flex items-center gap-1.5 transition-all ${
              activeFilter === item.key
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white dark:bg-[#1a2235] text-[#707881] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
            }`}
          >
            {item.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#89f5e7] animate-pulse"></span>}
            <span>{item.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeFilter === item.key ? 'bg-white/20 text-white' : 'bg-[#eaedff] dark:bg-[#283044] text-[#006194]'
            }`}>
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Active Search / Filter State Header */}
      {searchQuery && (
        <div className="mx-4 mt-2 px-3 py-2 rounded-xl bg-[#cce5ff]/50 dark:bg-[#004f7b]/40 text-[#004b73] dark:text-[#cce5ff] text-xs font-semibold flex items-center justify-between border border-[#93ccff]/40">
          <div className="flex items-center gap-1.5 truncate">
            <span className="material-symbols-outlined text-[16px] text-[#006194]">search</span>
            <span>
              Showing {filtered.length} order{filtered.length !== 1 ? 's' : ''} for <strong className="font-bold">"{searchQuery}"</strong>
            </span>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="text-[11px] font-bold text-[#006194] dark:text-[#93ccff] hover:underline flex-shrink-0 ml-2"
          >
            Clear
          </button>
        </div>
      )}

      {/* Orders Stream List */}
      <div className="px-4 flex flex-col gap-3 mt-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#1a2235] p-8 text-center flex flex-col items-center justify-center border border-[#eaedff] dark:border-[#283044] shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#eaedff] dark:bg-[#283044] flex items-center justify-center text-[#006194] mb-3">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <h4 className="font-bold text-sm text-[#131b2e] dark:text-white">
              No orders found matching "{searchQuery}"
            </h4>
            <p className="text-xs text-[#707881] mt-1 max-w-xs">
              Check for typos or try searching by customer first name, full name, or claim code like #AQ-1081.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold shadow-sm hover:bg-[#007bb9] active:scale-95 transition-all"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] relative overflow-hidden flex flex-col gap-3"
            >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="bg-[#cce5ff] text-[#004b73] font-extrabold text-xs px-2.5 py-0.5 rounded-lg">
                  {order.id}
                </span>
                <span className="bg-[#cde5ff] dark:bg-[#004f7b] text-[#004f7b] dark:text-[#cde5ff] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]">shelves</span>
                  {order.shelfBin}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#707881] text-xs">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>{order.targetReadyTime.replace('Today ', '')}</span>
              </div>
            </div>

            {/* Customer Row */}
            <div className="flex items-start justify-between min-w-0">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2
                    onClick={() => onNavigate('order-detail', order.id)}
                    className="font-bold text-sm text-[#131b2e] dark:text-white truncate cursor-pointer hover:text-[#006194]"
                  >
                    {order.customerName}
                  </h2>
                  {order.isVip && (
                    <span className="bg-[#008378] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">star</span> VIP
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#707881] dark:text-[#bfc7d2] mt-0.5">{order.customerPhone}</p>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#f2f3ff] dark:bg-[#283044] flex items-center justify-center text-[#006194] dark:text-[#93ccff] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {order.status === 'pickup'
                    ? 'inventory_2'
                    : order.status === 'drying'
                    ? 'mode_fan'
                    : order.status === 'washing'
                    ? 'water_drop'
                    : order.status === 'completed'
                    ? 'done_all'
                    : 'hourglass_top'}
                </span>
              </div>
            </div>

            {/* Spec & Badges */}
            <div className="bg-[#f2f3ff] dark:bg-[#131b2e] rounded-xl p-2.5 flex flex-col gap-1 border border-[#eaedff] dark:border-[#283044]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">{order.serviceName}</span>
                <span className="text-[10px] font-bold text-[#006194] bg-[#cce5ff]/50 px-2 py-0.5 rounded">
                  {order.weightKg} kg • {order.loadsCount} load{order.loadsCount > 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-[11px] text-[#707881] truncate">
                {order.addons.join(' + ') || 'Standard detergent & softener'}
              </p>
            </div>

            {/* Status & Financial Row */}
            <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
              <div className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                order.status === 'pickup'
                  ? 'bg-[#89f5e7] text-[#00201d]'
                  : order.status === 'drying'
                  ? 'bg-[#cce5ff] text-[#004b73]'
                  : order.status === 'washing'
                  ? 'bg-[#dae2fd] text-[#004b74]'
                  : order.status === 'completed'
                  ? 'bg-[#eaedff] text-[#3f4850]'
                  : 'bg-[#ffdad6] text-[#93000a]'
              }`}>
                {order.status === 'drying' && <span className="w-1.5 h-1.5 rounded-full bg-[#006194] animate-ping"></span>}
                {order.status === 'pickup' && <span className="material-symbols-outlined text-[13px]">check_circle</span>}
                {order.statusLabel}
              </div>

              <div className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                order.paymentStatus === 'pay_later'
                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                  : order.paymentStatus === 'gcash_paid'
                  ? 'bg-[#005ce6] text-white'
                  : 'bg-[#16a34a] text-white'
              }`}>
                {order.paymentStatus === 'pay_later' ? (
                  <>
                    <span className="material-symbols-outlined text-[13px]">report_problem</span>
                    Pay Later Unpaid • ₱{order.totalAmount.toFixed(2)}
                  </>
                ) : order.paymentStatus === 'gcash_paid' ? (
                  <>
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    GCash Paid • ₱{order.totalAmount.toFixed(2)}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[13px]">payments</span>
                    Cash Paid • ₱{order.totalAmount.toFixed(2)}
                  </>
                )}
              </div>
            </div>

            {/* Quick Action Drawer */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#eaedff] dark:border-[#283044]">
              {order.paymentStatus === 'pay_later' && (
                <button
                  onClick={() => onCollectPayment(order)}
                  className="flex-1 h-11 bg-[#006194] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#007bb9] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[17px]">point_of_sale</span>
                  <span>Collect ₱{order.totalAmount}</span>
                </button>
              )}

              {order.status === 'intake' && (
                <button
                  onClick={() => onAdvanceStage(order)}
                  className="flex-1 h-11 bg-[#006194] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#007bb9] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[17px]">play_circle</span>
                  <span>Start Wash</span>
                </button>
              )}

              {order.status === 'drying' && (
                <button
                  onClick={() => onAdvanceStage(order)}
                  className="flex-1 h-11 bg-[#eaedff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[17px]">fast_forward</span>
                  <span>Advance Stage</span>
                </button>
              )}

              <button
                onClick={() => onOpenReceipt(order)}
                className="w-11 h-11 rounded-xl bg-[#f2f3ff] dark:bg-[#283044] text-[#707881] hover:text-[#006194] flex items-center justify-center active:scale-95 transition-transform"
                title="Print Ticket"
              >
                <span className="material-symbols-outlined text-[19px]">print</span>
              </button>

              <button
                onClick={() => onNavigate('order-detail', order.id)}
                className="px-3 h-11 rounded-xl bg-[#eaedff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#dae2fd] transition-colors"
              >
                <span>Details</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )))}
      </div>

      {/* Pagination Bottom Bar */}
      <div className="px-4 mt-4 flex flex-col items-center gap-2">
        <div className="flex items-center justify-between w-full bg-white dark:bg-[#1a2235] rounded-xl p-2 shadow-xs border border-[#eaedff] dark:border-[#283044]">
          <button
            disabled
            className="w-9 h-9 rounded-lg bg-[#f2f3ff] dark:bg-[#283044] text-[#707881] flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006194]"></span>
            <span className="w-2 h-2 rounded-full bg-[#dae2fd]"></span>
            <span className="w-2 h-2 rounded-full bg-[#dae2fd]"></span>
            <span className="w-2 h-2 rounded-full bg-[#dae2fd]"></span>
            <span className="text-xs font-bold text-[#707881] ml-1">Page 1 of 9</span>
          </div>
          <button
            onClick={() => showToast('Navigated to page 2', 'chevron_right')}
            className="w-9 h-9 rounded-lg bg-[#eaedff] dark:bg-[#283044] text-[#006194] flex items-center justify-center active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
        <p className="text-xs text-[#707881] text-center">
          Showing <span className="font-bold text-[#131b2e] dark:text-white">1 – {filtered.length}</span> of{' '}
          <span className="font-bold text-[#131b2e] dark:text-white">42</span> logged orders
        </p>
      </div>
    </div>
  );
};
