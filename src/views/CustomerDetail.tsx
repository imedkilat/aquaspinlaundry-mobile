import React, { useState } from 'react';
import { Customer } from '../types';

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
  onStartOrderForCustomer: (customer: Customer) => void;
  onSettleBalance: (customer: Customer, method: 'gcash' | 'cash') => void;
  showToast: (msg: string, icon?: string) => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  onBack,
  onStartOrderForCustomer,
  onSettleBalance,
  showToast
}) => {
  const [stamps, setStamps] = useState(customer.stampsCount);

  const handleAddStamp = () => {
    if (stamps < 10) {
      const next = stamps + 1;
      setStamps(next);
      showToast(`Added 1 Suki Stamp! Now ${next} of 10 stamps.`, 'stars');
    } else {
      showToast('10 Stamps completed! Reward ready to redeem.', 'redeem');
    }
  };

  const handleRedeem = () => {
    if (stamps >= 10) {
      setStamps(0);
      showToast('Free 7kg Wash & Dry reward redeemed!', 'celebration');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[#006194] dark:text-[#93ccff] text-xs font-bold hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Customers</span>
        </button>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaedff] dark:bg-[#283044] text-[#00685f] text-[10px] font-bold">
          <span className="material-symbols-outlined text-[13px]">verified</span>
          Active Account
        </span>
      </div>

      {/* Profile Hero Card */}
      <section className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-start gap-3">
          {/* Initials & VIP Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#cce5ff] to-[#007bb9] flex items-center justify-center text-white font-extrabold text-xl shadow-xs">
              {customer.initials}
            </div>
            {customer.isVip && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[15px]">crown</span>
              </div>
            )}
          </div>

          {/* Identity & Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="font-extrabold text-lg text-[#131b2e] dark:text-white truncate">
                {customer.name}
              </h2>
              {customer.tier && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[11px]">star</span>
                  {customer.tier}
                </span>
              )}
            </div>
            <p className="text-xs text-[#707881] dark:text-[#bfc7d2] flex items-center gap-1 mt-0.5 truncate">
              <span className="material-symbols-outlined text-[16px] text-[#006194]">phone_iphone</span>
              {customer.phone}
            </p>
            <p className="text-[11px] text-[#707881] flex items-center gap-1 mt-0.5 truncate">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              {customer.address}
            </p>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="px-2.5 py-1 rounded-full bg-[#cce5ff] text-[#004b73] text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">workspace_premium</span> VIP Customer
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#006194]">local_florist</span> Prefers Downy Mystique
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] dark:bg-[#131b2e] text-[#707881] text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#00685f]">bed</span> Comforter Tier
          </span>
        </div>

        {/* Quick Communication Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`tel:${customer.phone}`}
            className="h-11 px-3 rounded-xl bg-[#f2f3ff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call Hotline</span>
          </a>
          <a
            href={`sms:${customer.phone}?body=Hi%20${encodeURIComponent(customer.name)},%20your%20Aquaspin%20laundry%20is%20ready!`}
            className="h-11 px-3 rounded-xl bg-[#f2f3ff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>SMS Reminder</span>
          </a>
        </div>
      </section>

      {/* Digital Suki Reward Card (Aqueous Gradient Card) */}
      <section className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0f766e] text-white p-5 shadow-lg">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none"></div>
        <div className="absolute right-12 -top-12 w-28 h-28 rounded-full bg-white/10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">water_drop</span>
              </div>
              <div>
                <div className="text-sm font-extrabold tracking-wide leading-none">SUKI REWARD CARD</div>
                <div className="text-[10px] text-sky-200 mt-0.5">Aquaspin Loyalty Club</div>
              </div>
            </div>
            <span className="text-[10px] bg-black/20 text-white px-2 py-0.5 rounded-full font-mono font-bold">
              #AQ-VIP-042
            </span>
          </div>

          {/* 10-Stamp Visual Grid */}
          <div className="bg-black/15 backdrop-blur-sm rounded-xl p-3">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }).map((_, index) => {
                const isStamped = index < stamps;
                const isFree = index === 9;

                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center shadow-xs transition-transform ${
                      isStamped
                        ? 'bg-white text-[#006194]'
                        : isFree
                        ? 'bg-amber-400/30 text-amber-200 border border-amber-300/40'
                        : 'bg-white/15 text-white/70'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isStamped ? 'check_circle' : isFree ? 'card_giftcard' : 'water_drop'}
                    </span>
                    <span className="text-[8px] font-bold leading-none mt-0.5">
                      {isFree ? 'FREE' : `#${index + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stamp Explainer */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              <span>{stamps}/10 Stamps Completed</span>
            </div>
            <span className="text-sky-100 text-[11px]">
              {stamps >= 10 ? 'Ready to claim!' : `${10 - stamps} more loads for free 7kg`}
            </span>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleRedeem}
              disabled={stamps < 10}
              className={`flex-1 h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                stamps >= 10
                  ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-md active:scale-95'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {stamps >= 10 ? 'redeem' : 'lock'}
              </span>
              <span>{stamps >= 10 ? 'Redeem FREE Load Now!' : `Redeem (${10 - stamps} Stamps Needed)`}</span>
            </button>
            <button
              onClick={handleAddStamp}
              className="h-10 px-3 rounded-xl bg-white text-[#006194] text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Add Stamp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Outstanding Pay-Later Charge Card */}
      {customer.unpaidBalance > 0 && (
        <section className="w-full bg-[#fffbeb] dark:bg-[#93000a]/20 rounded-2xl p-4 shadow-sm border border-[#fef3c7] dark:border-[#93000a]/40 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#fef3c7] text-[#b45309] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-wider">
                  Unsettled Charge
                </span>
                <div className="text-xl font-extrabold text-[#131b2e] dark:text-white">
                  ₱{customer.unpaidBalance.toFixed(2)}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] text-[10px] font-bold">
              Pay-Later
            </span>
          </div>

          <div className="bg-white dark:bg-[#1a2235] rounded-xl p-2.5 flex items-center justify-between text-xs border border-[#eaedff] dark:border-[#283044]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[18px] text-[#b45309]">local_laundry_service</span>
              <span className="font-bold text-[#131b2e] dark:text-white truncate">
                {customer.unpaidOrderId || '#AQ-1081'}: Comforter + Fold 12kg
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#008378]">Ready for Pickup</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              onClick={() => onSettleBalance(customer, 'gcash')}
              className="h-11 rounded-xl bg-[#005ce6] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              <span>Settle via GCash</span>
            </button>
            <button
              onClick={() => onSettleBalance(customer, 'cash')}
              className="h-11 rounded-xl bg-[#16a34a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span>Settle via Cash</span>
            </button>
          </div>
        </section>
      )}

      {/* Customer Statistics Summary Grid (4 Tiles) */}
      <section className="grid grid-cols-2 gap-3 w-full">
        <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-3.5 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-xs font-semibold">Lifetime Orders</span>
            <span className="material-symbols-outlined text-[18px] text-[#006194]">local_laundry_service</span>
          </div>
          <div className="text-2xl font-extrabold text-[#131b2e] dark:text-white my-1">
            {customer.totalVisits}
          </div>
          <span className="text-[10px] text-[#00685f] font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">trending_up</span> Top 5% customer
          </span>
        </div>

        <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-3.5 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-xs font-semibold">Total Kilos</span>
            <span className="material-symbols-outlined text-[18px] text-[#006194]">scale</span>
          </div>
          <div className="text-2xl font-extrabold text-[#131b2e] dark:text-white my-1">
            {customer.totalKilos} <span className="text-xs font-normal text-[#707881]">kg</span>
          </div>
          <span className="text-[10px] text-[#707881]">Avg. 8.2 kg / order</span>
        </div>

        <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-3.5 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-xs font-semibold">Lifetime Spend</span>
            <span className="material-symbols-outlined text-[18px] text-[#008378]">account_balance_wallet</span>
          </div>
          <div className="text-lg font-extrabold text-[#131b2e] dark:text-white my-1">
            ₱{customer.totalSpent.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#707881]">Paid via GCash & Cash</span>
        </div>

        <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-3.5 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-xs font-semibold">Favorite Scent</span>
            <span className="material-symbols-outlined text-[18px] text-[#006194]">spa</span>
          </div>
          <div className="text-xs font-bold text-[#131b2e] dark:text-white my-1 truncate">
            {customer.favoriteScent}
          </div>
          <span className="text-[10px] text-[#006194] font-semibold">+ Ariel Oxy Power</span>
        </div>
      </section>

      {/* Order History Ledger */}
      <section className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Recent Laundry Visits</h3>
          <span className="text-xs text-[#707881]">View All ({customer.recentOrders.length})</span>
        </div>

        <div className="flex flex-col gap-2">
          {customer.recentOrders.map((rec, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] flex flex-col gap-1.5 border border-[#eaedff] dark:border-[#283044]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff]">{rec.orderId}</span>
                  <span className="text-[11px] text-[#707881]">{rec.date}</span>
                </div>
                <span className={`text-xs font-bold ${rec.isUnpaid ? 'text-[#ba1a1a]' : 'text-[#131b2e] dark:text-white'}`}>
                  ₱{rec.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#3f4850] dark:text-[#bfc7d2] truncate">{rec.serviceDesc}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  rec.isUnpaid
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : rec.paymentBadge.includes('GCash')
                    ? 'bg-[#cde5ff] text-[#004f7b]'
                    : 'bg-[#e6f4f2] text-[#00685f]'
                }`}>
                  {rec.paymentBadge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Special Care Notes */}
      <section className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] rounded-2xl p-4 flex flex-col gap-2 border border-[#eaedff] dark:border-[#283044]">
        <div className="flex items-center gap-1.5 text-[#131b2e] dark:text-white">
          <span className="material-symbols-outlined text-[18px] text-[#00685f]">edit_note</span>
          <span className="text-xs font-bold">Special Care Instructions</span>
        </div>
        <p className="text-xs text-[#3f4850] dark:text-[#bfc7d2] leading-relaxed">
          {customer.specialInstructions || 'Standard fabric care. Hypoallergenic rinse preferred.'}
        </p>
      </section>

      {/* Sticky Bottom Actions */}
      <div className="w-full flex items-center gap-2 pt-1">
        <button
          onClick={() => showToast('Customer details editor opened', 'manage_accounts')}
          className="h-12 px-4 rounded-xl bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
          <span>Edit Info</span>
        </button>
        <button
          onClick={() => onStartOrderForCustomer(customer)}
          className="flex-1 h-12 rounded-xl bg-[#006194] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#007bb9] active:scale-[0.99] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Start New Order for {customer.name.split(' ')[0]}</span>
        </button>
      </div>
    </div>
  );
};
