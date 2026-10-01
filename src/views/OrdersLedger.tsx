import React, { useState } from 'react';
import { LaundryOrder } from '../types';
import { PaymentStatusBadge, OrderStatusBadge } from '../components/StatusBadge';

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
  const [activeFilter, setActiveFilter] = useState<'all' | 'progress' | 'pickup' | 'unpaid' | 'completed'>('all');

  const filtered = orders.filter((order) => {
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

    if (activeFilter === 'all') return true;
    if (activeFilter === 'progress') return order.status === 'intake' || order.status === 'washing' || order.status === 'drying';
    if (activeFilter === 'pickup') return order.status === 'pickup';
    if (activeFilter === 'unpaid') return order.paymentStatus === 'pay_later';
    if (activeFilter === 'completed') return order.status === 'completed';
    return true;
  });

  const totalLoads = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus !== 'pay_later' ? o.totalAmount : 0), 0);
  const unpaidCount = orders.filter((o) => o.paymentStatus === 'pay_later').length;
  const inProgressCount = orders.filter((o) => o.status === 'intake' || o.status === 'washing' || o.status === 'drying').length;
  const pickupCount = orders.filter((o) => o.status === 'pickup').length;
  const completedCount = orders.filter((o) => o.status === 'completed').length;

  return (
    <div className="flex flex-col w-full pb-24 max-w-lg mx-auto">
      {/* Top Banner Accent Layer */}
      <div className="px-margin pt-space-md pb-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-extrabold">
              Orders Ledger
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              Katipunan Branch • Shift A (06:00 - 14:30)
            </p>
          </div>
          <button
            onClick={() => showToast('Batch filter drawer toggled', 'tune')}
            aria-label="Quick batch actions"
            className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Quick Metric Chips Bar */}
        <div className="grid grid-cols-3 gap-space-xs mt-space-xs">
          <div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[13px] text-primary">local_laundry_service</span> Total
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
              {totalLoads} <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">loads</span>
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[13px] text-tertiary">payments</span> Today
            </span>
            <span className="font-currency-body text-currency-body text-primary mt-1 font-bold">
              ₱{totalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-2.5 shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-error uppercase tracking-wider flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[13px] text-error">pending_actions</span> Pay-Later
            </span>
            <span className="font-headline-sm text-headline-sm text-error mt-1 font-bold">
              {unpaidCount} <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">due</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search & Scan Bar */}
      <div className="px-margin pt-space-xs pb-space-sm">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order #, customer, phone..."
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md rounded-xl pl-11 pr-12 py-3 shadow-sm border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-low transition-colors"
          />
          <button
            onClick={() => showToast('Optical QR scanner activated', 'qr_code_scanner')}
            className="absolute right-2 w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors active:scale-90"
            title="Scan QR Ticket"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
          </button>
        </div>
      </div>

      {/* Filter Chips (Horizontal Scroll) */}
      <div className="w-full overflow-x-auto no-scrollbar px-margin py-1 flex items-center gap-space-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm flex items-center gap-1.5 transition-all ${
            activeFilter === 'all'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:text-primary'
          }`}
        >
          <span>All</span>
          <span
            className={`px-1.5 py-0.2 rounded-full font-label-sm text-label-sm ${
              activeFilter === 'all' ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            {totalLoads}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('progress')}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm flex items-center gap-1.5 transition-all ${
            activeFilter === 'progress'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:text-primary'
          }`}
        >
          <span>In Progress</span>
          <span
            className={`px-1.5 py-0.2 rounded-full font-label-sm text-label-sm ${
              activeFilter === 'progress'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-surface-container-high text-primary font-bold'
            }`}
          >
            {inProgressCount}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('pickup')}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm flex items-center gap-1.5 transition-all ${
            activeFilter === 'pickup'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:text-tertiary'
          }`}
        >
          <span>Ready for Pickup</span>
          <span
            className={`px-1.5 py-0.2 rounded-full font-label-sm text-label-sm ${
              activeFilter === 'pickup'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-tertiary-fixed text-on-tertiary-fixed font-bold'
            }`}
          >
            {pickupCount}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('unpaid')}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm flex items-center gap-1.5 transition-all ${
            activeFilter === 'unpaid'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:text-error'
          }`}
        >
          <span>Pay Later Unpaid</span>
          <span
            className={`px-1.5 py-0.2 rounded-full font-label-sm text-label-sm ${
              activeFilter === 'unpaid'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-error-container text-on-error-container font-bold'
            }`}
          >
            {unpaidCount}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm flex items-center gap-1.5 transition-all ${
            activeFilter === 'completed'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:text-on-surface'
          }`}
        >
          <span>Completed</span>
          <span
            className={`px-1.5 py-0.2 rounded-full font-label-sm text-label-sm ${
              activeFilter === 'completed'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            {completedCount}
          </span>
        </button>
      </div>

      {/* Orders Stream */}
      <div className="px-margin flex flex-col gap-space-sm mt-space-sm">
        {filtered.map((order) => {
          const isPayLater = order.paymentStatus === 'pay_later';
          const isReady = order.status === 'pickup';
          const isCompleted = order.status === 'completed';

          return (
            <div
              key={order.id}
              className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm relative overflow-hidden flex flex-col gap-3 border border-outline-variant/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary-fixed text-on-primary-fixed font-headline-sm text-headline-sm px-2.5 py-0.5 rounded-lg tracking-tight font-bold">
                    {order.id}
                  </span>
                  <span className="bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm px-2 py-0.5 rounded-md flex items-center gap-0.5 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">shelves</span> {order.shelfBin}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[15px]">schedule</span> {order.intakeTime}
                </div>
              </div>

              {/* Customer Row */}
              <div
                onClick={() => onNavigate('order-detail', order.id)}
                className="flex items-start justify-between min-w-0 cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                      {order.customerName}
                    </h2>
                    {order.isVip && (
                      <span className="bg-tertiary text-on-tertiary font-label-sm text-label-sm px-1.5 py-0.2 rounded-full flex items-center gap-0.5 font-bold">
                        <span className="material-symbols-outlined text-[11px]">star</span> VIP
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{order.customerPhone}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
              </div>

              {/* Laundry Spec & Badges */}
              <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col gap-1.5 border border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-body-md text-on-surface font-semibold truncate mr-2">
                    {order.serviceName}
                  </span>
                  <span className="font-label-md text-label-md text-primary bg-primary-fixed/50 px-2 py-0.5 rounded font-bold flex-shrink-0">
                    {order.weightKg} kg • {order.loadsCount} load
                  </span>
                </div>
                {order.addons.length > 0 && (
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[14px] text-primary">spa</span>
                    <span className="truncate">{order.addons.join(' + ')}</span>
                  </div>
                )}
              </div>

              {/* Status & Financial Row */}
              <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <OrderStatusBadge status={order.status} label={order.statusLabel} />
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-currency-body text-currency-body text-on-surface font-extrabold">
                    ₱{order.totalAmount.toFixed(2)}
                  </span>

                  {isPayLater && (
                    <button
                      onClick={() => onCollectPayment(order)}
                      className="px-2.5 py-1 rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm font-bold shadow-xs active:scale-95"
                    >
                      Collect Due
                    </button>
                  )}

                  {!isCompleted && (
                    <button
                      onClick={() => onAdvanceStage(order)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-label-sm text-label-sm font-bold active:scale-95 transition-transform"
                      title="Advance to next step"
                    >
                      Advance
                    </button>
                  )}

                  <button
                    onClick={() => onOpenReceipt(order)}
                    className="w-8 h-8 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors"
                    title="View Receipt"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
