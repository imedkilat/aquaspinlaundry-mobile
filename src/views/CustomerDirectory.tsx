import React, { useState } from 'react';
import { Customer } from '../types';

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

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Sub-header & Action Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex flex-col min-w-0">
          <h1 className="font-extrabold text-2xl text-[#131b2e] dark:text-white tracking-tight truncate">
            Customers Directory
          </h1>
          <p className="text-xs text-[#707881] dark:text-[#bfc7d2] flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#00685f] animate-pulse inline-block"></span>
            348 Registered Accounts • Katipunan Node
          </p>
        </div>
        <button
          onClick={onAddCustomer}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#006194] text-white text-xs font-bold shadow-md hover:bg-[#007bb9] active:scale-95 transition-all flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add New</span>
        </button>
      </div>

      {/* KPI Pulse Overview */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white dark:bg-[#1a2235] p-3 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total</span>
            <span className="material-symbols-outlined text-[#006194] text-[18px]">group</span>
          </div>
          <div className="my-1">
            <span className="text-xl font-extrabold text-[#131b2e] dark:text-white leading-none">348</span>
          </div>
          <span className="text-[10px] text-[#00685f] font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">trending_up</span>+14 this wk
          </span>
        </div>

        <div className="bg-white dark:bg-[#1a2235] p-3 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-[10px] font-bold uppercase tracking-wider">VIPs</span>
            <span className="material-symbols-outlined text-[#006399] text-[18px]">verified</span>
          </div>
          <div className="my-1">
            <span className="text-xl font-extrabold text-[#131b2e] dark:text-white leading-none">86</span>
          </div>
          <span className="text-[10px] text-[#707881] dark:text-[#bfc7d2] truncate">≥ 5 visits/mo</span>
        </div>

        <div className="bg-white dark:bg-[#1a2235] p-3 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Rewards</span>
            <span className="material-symbols-outlined text-[#008378] text-[18px]">featured_seasonal_and_gifts</span>
          </div>
          <div className="my-1">
            <span className="text-xl font-extrabold text-[#008378] dark:text-[#89f5e7] leading-none">23</span>
          </div>
          <span className="text-[10px] text-[#008378] font-bold truncate">Free Wash Ready</span>
        </div>
      </div>

      {/* Search & Loyalty Scan Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 flex items-center bg-white dark:bg-[#1a2235] rounded-xl shadow-xs border border-[#eaedff] dark:border-[#283044] px-3 py-2.5">
          <span className="material-symbols-outlined text-[#707881] text-[20px] mr-2">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, 09xx, or card ID..."
            className="w-full bg-transparent text-xs font-semibold text-[#131b2e] dark:text-white placeholder:text-[#707881] focus:outline-none"
          />
          <button
            onClick={() => showToast('Listening for customer name...', 'mic')}
            aria-label="Voice Search"
            className="text-[#707881] hover:text-[#006194] transition-colors p-1"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>
        <button
          onClick={() => showToast('Scan loyalty QR camera opened', 'qr_code_scanner')}
          aria-label="Scan QR Loyalty Card"
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#eaedff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] hover:bg-[#cce5ff] active:scale-95 transition-all flex-shrink-0 shadow-xs"
        >
          <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
        </button>
      </div>

      {/* Segment Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0 shadow-xs flex items-center gap-1.5 transition-all ${
            filter === 'all'
              ? 'bg-[#006194] text-white'
              : 'bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
          }`}
        >
          <span>All</span>
          <span className="bg-[#007bb9] text-white px-1.5 py-0.2 rounded-full text-[10px]">348</span>
        </button>

        <button
          onClick={() => setFilter('vip')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0 shadow-xs transition-all ${
            filter === 'vip'
              ? 'bg-[#006194] text-white'
              : 'bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
          }`}
        >
          VIP Frequent
        </button>

        <button
          onClick={() => setFilter('unpaid')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0 shadow-xs flex items-center gap-1 transition-all ${
            filter === 'unpaid'
              ? 'bg-[#ba1a1a] text-white'
              : 'bg-[#ffdad6] text-[#ba1a1a]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
          With Unpaid Balance
        </button>

        <button
          onClick={() => setFilter('reward')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex-shrink-0 shadow-xs transition-all ${
            filter === 'reward'
              ? 'bg-[#008378] text-white'
              : 'bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] border border-[#eaedff] dark:border-[#283044]'
          }`}
        >
          Reward Eligible (8/10+)
        </button>
      </div>

      {/* Customer Cards List */}
      <div className="flex flex-col gap-3">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            onClick={() => onSelectCustomer(cust)}
            className="bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3 relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
          >
            {cust.isVip && (
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#006194]"></div>
            )}

            {/* Upper: Avatar, Credentials, VIP Pill */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs">
                  {cust.initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm text-[#131b2e] dark:text-white truncate">
                      {cust.name}
                    </span>
                    {cust.tier && (
                      <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[11px]">star</span>
                        {cust.tier}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[#707881] text-xs mt-0.5">
                    <span className="font-semibold text-[#006194] dark:text-[#93ccff]">{cust.phone}</span>
                    <span>•</span>
                    <span className="truncate">{cust.address}</span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bfc7d2] text-[20px] flex-shrink-0">
                chevron_right
              </span>
            </div>

            {/* Stamp Card Visualization */}
            <div className="bg-[#f2f3ff] dark:bg-[#131b2e] rounded-xl p-3 flex flex-col gap-2 border border-[#eaedff] dark:border-[#283044]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#707881] uppercase tracking-wider text-[10px]">
                  Aquaspin Loyalty Card
                </span>
                <span className="font-bold text-[#006194] dark:text-[#93ccff]">
                  {cust.stampsCount} of 10 Stamps
                </span>
              </div>

              {/* Water Drops Grid */}
              <div className="flex items-center justify-between gap-1 py-1">
                {Array.from({ length: 10 }).map((_, index) => {
                  const isFilled = index < cust.stampsCount;
                  const isLast = index === 9;

                  return (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isFilled
                          ? 'bg-[#93ccff] text-[#004b73] shadow-xs'
                          : isLast
                          ? 'bg-[#cde5ff] text-[#006399]'
                          : 'bg-[#eaedff] dark:bg-[#283044] text-[#bfc7d2]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isFilled ? 'water_drop' : isLast ? 'redeem' : 'water_drop'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {cust.stampsCount >= 10 ? (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-[#00685f] dark:text-[#89f5e7]">
                    🎁 Reward Ready to Redeem! (Free 7kg Load)
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRedeemReward(cust);
                    }}
                    className="px-3 py-1 rounded-full bg-[#008378] text-white text-[11px] font-bold shadow-xs hover:bg-[#00685f]"
                  >
                    Redeem
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-[#006399] dark:text-[#94ccff] font-semibold">
                  💧 {10 - cust.stampsCount} stamps to FREE 7kg Wash & Dry!
                </p>
              )}
            </div>

            {/* Financial Status & Warning Banner */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-[#707881] dark:text-[#bfc7d2]">
                <span>{cust.totalVisits} Total Visits</span>
                <span className="font-bold text-[#131b2e] dark:text-white">₱{cust.totalSpent.toLocaleString()} Spent</span>
              </div>

              {cust.unpaidBalance > 0 && (
                <div className="flex items-center justify-between bg-[#ffdad6]/60 dark:bg-[#93000a]/30 p-2.5 rounded-xl border border-[#ffdad6] text-[#ba1a1a] dark:text-[#ffdad6]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span className="text-xs font-bold truncate">
                      ₱{cust.unpaidBalance.toFixed(2)} Unpaid ({cust.unpaidOrderId || 'Order'})
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCollectBalance(cust);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#ba1a1a] text-white text-[10px] uppercase font-bold flex-shrink-0 hover:bg-[#93000a]"
                  >
                    Collect
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls & Export */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exported 348 customer records to CSV', 'download')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] text-xs font-bold shadow-xs hover:text-[#006194] border border-[#eaedff] dark:border-[#283044]"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => showToast('Batch SMS announcement composer opened', 'sms')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a2235] text-[#3f4850] dark:text-[#bfc7d2] text-xs font-bold shadow-xs hover:text-[#006194] border border-[#eaedff] dark:border-[#283044]"
          >
            <span className="material-symbols-outlined text-[16px]">sms</span>
            <span>Broadcast</span>
          </button>
        </div>
        <span className="text-[11px] text-[#707881] font-semibold">
          Showing 1-{filtered.length} of 348
        </span>
      </div>
    </div>
  );
};
