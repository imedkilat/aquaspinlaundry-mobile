import React, { useState } from 'react';
import { LaundryOrder } from '../types';
import { PaymentStatusBadge, MachineStatusBadge, OrderStatusBadge } from '../components/StatusBadge';

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

  const unpaidTotal = orders
    .filter((o) => o.paymentStatus === 'pay_later')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const unpaidCount = orders.filter((o) => o.paymentStatus === 'pay_later').length;

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl gap-space-md max-w-lg mx-auto">
      {/* Greeting, Shift & Interactive Mode Toggle */}
      <div className="flex items-center justify-between pt-space-sm">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs flex-wrap">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-extrabold tracking-tight">
              Mabuhay, Maria!
            </h1>
            <span className="inline-flex items-center text-[18px]">🫧</span>
          </div>
          <div className="flex items-center gap-space-xs mt-0.5 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
            <span>Today, Oct 24 · Shift A (Morning)</span>
          </div>
        </div>

        {/* Dual Actions: Role Switch Pill & Theme Toggle */}
        <div className="flex items-center gap-space-xs flex-shrink-0">
          <button
            onClick={onToggleRole}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-surface-container-high text-on-secondary-fixed-variant hover:bg-surface-variant transition-colors shadow-sm active:scale-95"
            title="Switch Between Staff & Owner View"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm font-bold">
              {isOwnerView ? 'Owner View' : 'Staff View'}
            </span>
            <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme appearance"
            className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-variant transition-colors shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>

      {/* Key Metrics Bento Grid (Philippine Peso ₱) */}
      <div className="grid grid-cols-1 gap-space-sm">
        {/* Top Highlight: Gross Revenue with Breakdown */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/20">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-surface-container/60 pointer-events-none"></div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Today's Gross Sales
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-currency-display text-currency-display text-on-surface font-extrabold tracking-tight">
                    ₱12,450.00
                  </span>
                  <span className="inline-flex items-center font-label-sm text-label-sm text-tertiary bg-surface-container-low px-1.5 py-0.5 rounded-full font-bold">
                    +18%
                  </span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline-variant text-[20px]">trending_up</span>
          </div>

          {/* Payment Breakdown Micro Bar */}
          <div className="mt-space-md pt-space-xs flex flex-col gap-1.5">
            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: '58%' }} title="Counter Cash ₱7,200 (58%)"></div>
              <div className="h-full bg-secondary-container" style={{ width: '42%' }} title="GCash ₱5,250 (42%)"></div>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Cash: <strong className="text-on-surface font-currency-body">₱7,200.00</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                GCash: <strong className="text-on-surface font-currency-body">₱5,250.00</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Metrics 2-Card Row */}
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Total Transactions */}
          <div className="rounded-xl bg-surface-container-lowest p-space-sm flex flex-col justify-between shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[17px]">local_laundry_service</span>
              </span>
              <span className="font-label-sm text-label-sm text-tertiary bg-surface-container-low px-1 py-0.5 rounded-full font-bold">
                +14%
              </span>
            </div>
            <div className="mt-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Transactions</span>
              <p className="font-headline-md text-headline-md text-on-surface mt-0.5 font-bold">
                42 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">Loads</span>
              </p>
            </div>
          </div>

          {/* Attention Needed: Unsettled Pay-Later Balance */}
          <div className="rounded-xl bg-error-container/40 p-space-sm flex flex-col justify-between shadow-sm border border-error-container/60">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-error-container flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[17px]">pending_actions</span>
              </span>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-error text-on-error uppercase font-bold">
                Needs Care
              </span>
            </div>
            <div className="mt-space-sm">
              <span className="font-label-sm text-label-sm text-error font-semibold">Unpaid Balances</span>
              <p className="font-headline-md text-headline-md text-on-surface mt-0.5 font-currency-display font-bold">
                ₱{unpaidTotal > 0 ? unpaidTotal.toFixed(2) : '1,880.00'}
              </p>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {unpaidCount} tickets unsettled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Interactive CTAs */}
      <div className="flex flex-col gap-space-xs">
        {/* Hero Action: New Order Intake */}
        <button
          onClick={() => onNavigate('new-order')}
          className="group relative overflow-hidden rounded-xl bg-primary text-on-primary p-space-md shadow-md active:scale-[0.99] transition-all text-left w-full"
        >
          <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[110px]">add_circle</span>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-xl bg-on-primary/15 flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[26px]">add_task</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-primary font-bold tracking-tight">
                  New Order Intake
                </h2>
                <p className="font-body-sm text-body-sm text-on-primary/85 mt-0.5">
                  Scan customer QR or enter kilo weight
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[24px] text-on-primary/90 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Quick Utilities Horizontal Row */}
        <div className="grid grid-cols-2 gap-space-xs">
          <button
            onClick={() => onNavigate('new-order')}
            className="flex items-center gap-space-xs px-space-sm py-2.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low transition-colors border border-outline-variant/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-primary text-[19px]">scale</span>
            <span className="font-label-md text-label-md truncate font-semibold">Quick Weigh In</span>
          </button>
          <button
            onClick={() => {
              const sample = orders.find((o) => o.id === '#AQ-1081') || orders[0];
              onOpenReceipt(sample);
            }}
            className="flex items-center gap-space-xs px-space-sm py-2.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low transition-colors border border-outline-variant/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-secondary text-[19px]">print</span>
            <span className="font-label-md text-label-md truncate font-semibold">Print Shelf Claim</span>
          </button>
        </div>
      </div>

      {/* Operational Machine Bays Live Gauge */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/20">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[19px]">tune</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Machine Bay Status</h3>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary bg-surface-container-low px-2 py-0.5 rounded-full font-bold">
            Optimal Load
          </span>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Washers Status */}
          <div className="rounded-lg bg-surface-container-low p-space-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[16px] text-primary">water_drop</span>
                Washers
              </span>
              <MachineStatusBadge status="running" label="8/10 Run" />
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">2 bays ready for loading</span>
          </div>

          {/* Dryers Status */}
          <div className="rounded-lg bg-surface-container-low p-space-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[16px] text-tertiary">mode_fan</span>
                Dryers
              </span>
              <MachineStatusBadge status="drying" label="7/8 Run" />
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full bg-tertiary-container rounded-full" style={{ width: '87.5%' }}></div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">1 tumbler cooling down</span>
          </div>
        </div>
      </div>

      {/* Operational Activity / Queue Ledger */}
      <div className="flex flex-col gap-space-sm">
        {/* Header with Search & Filter Tabs */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Queue Ledger</h3>
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Katipunan Station</span>
          </div>

          {/* Quick Interactive Filter Pills (Overflow-X Friendly) */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap shadow-sm transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilter('unpaid')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                filter === 'unpaid'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Pay Later ({orders.filter((o) => o.paymentStatus === 'pay_later').length})
            </button>
            <button
              onClick={() => setFilter('pickup')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                filter === 'pickup'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Ready for Pickup ({orders.filter((o) => o.status === 'pickup').length})
            </button>
            <button
              onClick={() => setFilter('progress')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                filter === 'progress'
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              In Progress ({orders.filter((o) => o.status === 'washing' || o.status === 'drying' || o.status === 'intake').length})
            </button>
          </div>
        </div>

        {/* Ticket Cards List */}
        <div className="flex flex-col gap-space-sm">
          {filteredOrders.map((order) => {
            const isPayLater = order.paymentStatus === 'pay_later';
            const isGCash = order.paymentStatus === 'gcash_paid';
            const isCash = order.paymentStatus === 'cash_paid';

            return (
              <div
                key={order.id}
                className="ticket-card rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/20 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div
                    onClick={() => onNavigate('order-detail', order.id)}
                    className="flex items-start gap-space-xs min-w-0 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0 font-bold">
                      {order.customerInitial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                          {order.customerName}
                        </h4>
                        <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                          {order.id}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {order.serviceName} · {order.weightKg} kg ({order.loadsCount} load)
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <OrderStatusBadge status={order.status} label={order.statusLabel} />
                </div>

                <div className="flex items-center justify-between pt-space-xs">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <PaymentStatusBadge status={order.paymentStatus} label={isPayLater ? 'Pay Later (Due)' : undefined} />
                    <span className="font-currency-body text-currency-body text-on-surface font-bold">
                      ₱{order.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Micro Action Buttons */}
                  <div className="flex items-center gap-1">
                    {isPayLater && (
                      <button
                        onClick={() => onCollectPayment(order)}
                        className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs active:scale-95 transition-transform"
                      >
                        Collect
                      </button>
                    )}
                    <button
                      onClick={() => onSendSms(order)}
                      className="w-8 h-8 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center justify-center transition-colors"
                      title="SMS Customer update"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                    </button>
                    <button
                      onClick={() => onOpenReceipt(order)}
                      className="w-8 h-8 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center justify-center transition-colors"
                      title="View Ticket Receipt & QR"
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
    </div>
  );
};
