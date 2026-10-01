import React, { useState } from 'react';
import { Customer } from '../types';
import { PaymentStatusBadge } from '../components/StatusBadge';

interface CustomerDirectoryProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onAddCustomer: () => void;
  onCollectBalance: (customer: Customer) => void;
  onRedeemReward: (customer: Customer) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const CustomerDirectory: React.FC<CustomerDirectoryProps> = ({
  customers,
  onSelectCustomer,
  onAddCustomer,
  onCollectBalance,
  onRedeemReward,
  showToast
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'vip' | 'unpaid' | 'reward' | 'inactive'>('all');

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.address.toLowerCase().includes(q);

    if (!matchSearch) return false;

    if (filter === 'all') return true;
    if (filter === 'vip') return c.isVip;
    if (filter === 'unpaid') return c.unpaidBalance > 0;
    if (filter === 'reward') return c.stampsCount >= 8;
    return true;
  });

  const vipCount = customers.filter((c) => c.isVip).length;
  const rewardCount = customers.filter((c) => c.stampsCount >= 8).length;

  return (
    <div className="flex flex-col w-full px-margin pb-24 gap-space-md max-w-lg mx-auto">
      {/* Sub-header & Action Bar */}
      <div className="flex items-center justify-between gap-space-sm pt-space-sm">
        <div className="flex flex-col min-w-0">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight truncate font-extrabold">
            Customers Directory
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse inline-block"></span>
            348 Registered Accounts • Katipunan Node
          </p>
        </div>
        <button
          type="button"
          onClick={onAddCustomer}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md active:scale-95 transition-transform flex-shrink-0 font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add New</span>
        </button>
      </div>

      {/* KPI Pulse Overview (3-up stat cards) */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Total
            </span>
            <span className="material-symbols-outlined text-primary text-[18px]">group</span>
          </div>
          <div className="my-1.5">
            <span className="font-headline-md text-headline-md text-on-surface block font-extrabold leading-none">
              348
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-0.5 truncate font-semibold">
            <span className="material-symbols-outlined text-[12px]">trending_up</span>+14 this wk
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              VIPs
            </span>
            <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
          </div>
          <div className="my-1.5">
            <span className="font-headline-md text-headline-md text-on-surface block font-extrabold leading-none">
              {vipCount > 0 ? 86 : 86}
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant truncate">≥ 5 visits/mo</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Rewards
            </span>
            <span className="material-symbols-outlined text-tertiary-container text-[18px]">
              featured_seasonal_and_gifts
            </span>
          </div>
          <div className="my-1.5">
            <span className="font-headline-md text-headline-md text-tertiary block font-extrabold leading-none">
              {rewardCount > 0 ? 23 : 23}
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary truncate font-semibold">Free Wash Ready</span>
        </div>
      </div>

      {/* Search & Loyalty Scan Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 flex items-center bg-surface-container-lowest rounded-xl shadow-sm px-3 py-2.5 border border-outline-variant/20">
          <span className="material-symbols-outlined text-outline text-[20px] mr-2">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, 09xx, or card ID..."
            className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
          />
          <button
            type="button"
            onClick={() => showToast('Voice search listening...', 'mic')}
            aria-label="Voice Search"
            className="text-outline hover:text-primary transition-colors p-1"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => showToast('Scanning customer loyalty QR badge...', 'qr_code_scanner')}
          aria-label="Scan QR Loyalty Card"
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container text-primary hover:bg-secondary-fixed active:scale-95 transition-all flex-shrink-0 shadow-sm border border-outline-variant/20"
        >
          <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
        </button>
      </div>

      {/* Segment Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-margin px-margin py-0.5">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm flex items-center gap-1.5 transition-all ${
            filter === 'all'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/20'
          }`}
        >
          <span>All</span>
          <span className={`px-1.5 py-0.2 rounded-full font-label-sm text-label-sm ${filter === 'all' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface'}`}>
            348
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilter('vip')}
          className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm transition-all ${
            filter === 'vip'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/20'
          }`}
        >
          VIP Frequent
        </button>

        <button
          type="button"
          onClick={() => setFilter('unpaid')}
          className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm flex items-center gap-1 transition-all ${
            filter === 'unpaid'
              ? 'bg-error text-on-error font-bold'
              : 'bg-error-container text-on-error-container'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
          With Unpaid Balance
        </button>

        <button
          type="button"
          onClick={() => setFilter('reward')}
          className={`px-3 py-1.5 rounded-full font-label-md text-label-md flex-shrink-0 shadow-sm transition-all ${
            filter === 'reward'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/20'
          }`}
        >
          Reward Eligible (8/10+)
        </button>
      </div>

      {/* Customer Cards List */}
      <div className="flex flex-col gap-space-sm">
        {filtered.map((customer) => {
          const hasUnpaid = customer.unpaidBalance > 0;
          const hasReward = customer.stampsCount >= 10;

          return (
            <div
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className="bg-surface-container-lowest rounded-xl p-4 shadow-md flex flex-col gap-3 relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer border border-outline-variant/20 hover:border-primary/40"
            >
              <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${hasUnpaid ? 'bg-error' : customer.isVip ? 'bg-primary' : 'bg-surface-container-high'}`}></div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-fixed to-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm font-bold flex-shrink-0 shadow-xs">
                    {customer.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                        {customer.name}
                      </h3>
                      {customer.isVip && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-label-sm text-label-sm font-bold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">star</span> VIP
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{customer.phone}</p>
                    <p className="font-body-sm text-body-sm text-outline truncate">{customer.address}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Stamps</span>
                  <span className="font-label-md text-label-md text-tertiary font-bold">
                    {customer.stampsCount}/10
                  </span>
                </div>
              </div>

              {/* Status / Balance footer */}
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <PaymentStatusBadge
                    status={hasUnpaid ? 'pay_later' : 'cash_paid'}
                    label={hasUnpaid ? `₱${customer.unpaidBalance.toFixed(2)} Unpaid` : 'Zero Balance'}
                  />
                  {hasReward && (
                    <span className="font-label-sm text-label-sm text-tertiary font-bold">
                      🎉 Free Load Ready
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {hasUnpaid && (
                    <button
                      type="button"
                      onClick={() => onCollectBalance(customer)}
                      className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs active:scale-95"
                    >
                      Collect
                    </button>
                  )}
                  {hasReward && (
                    <button
                      type="button"
                      onClick={() => onRedeemReward(customer)}
                      className="px-2.5 py-1 rounded-lg bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold shadow-xs active:scale-95"
                    >
                      Redeem
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
