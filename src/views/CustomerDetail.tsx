import React, { useState } from 'react';
import { Customer } from '../types';
import { PaymentStatusBadge } from '../components/StatusBadge';

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
    <div className="flex flex-col w-full px-margin pb-space-xl space-y-space-md">
      {/* Breadcrumb Navigation Quick Action */}
      <div className="flex items-center justify-between pt-space-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-space-xs text-primary font-label-md text-label-md active:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Customers</span>
        </button>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[13px] text-tertiary">verified</span>
          Active Account
        </span>
      </div>

      {/* Profile Hero Card */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-4px_rgba(2,132,199,0.08)] flex flex-col space-y-space-md">
        <div className="flex items-start gap-space-md">
          {/* Initials & VIP Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-fixed to-primary-container flex items-center justify-center text-on-primary-container font-headline-md text-headline-md shadow-sm">
              {customer.initials}
            </div>
            {customer.isVip && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-on-surface flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>
              </div>
            )}
          </div>

          {/* Identity & Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="font-headline-md text-headline-md text-on-surface truncate">{customer.name}</h2>
              {customer.tier && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm text-label-sm flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {customer.tier}
                </span>
              )}
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-0.5 truncate">
              <span className="material-symbols-outlined text-[16px] text-primary">phone_iphone</span>
              {customer.phone}
            </p>
            <p className="font-body-sm text-body-sm text-outline flex items-center gap-1 mt-0.5 truncate">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              {customer.address}
            </p>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">workspace_premium</span> VIP Customer
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-primary">local_florist</span> Prefers {customer.favoriteScent || 'Downy Mystique'}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-tertiary">bed</span> Comforter Tier
          </span>
        </div>

        {/* Quick Communication Actions */}
        <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
          <a
            className="h-11 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors active:scale-[0.99]"
            href={`tel:${customer.phone}`}
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call Hotline</span>
          </a>
          <a
            className="h-11 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors active:scale-[0.99]"
            href={`sms:${customer.phone}?body=Hi%20${encodeURIComponent(customer.name)},%20your%20Aquaspin%20laundry%20is%20ready!`}
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>SMS Reminder</span>
          </a>
        </div>
      </section>

      {/* Digital Suki Loyalty Card (Tactile Aqueous Gradient) */}
      <section className="w-full relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0f766e] text-on-primary p-5 shadow-[0_12px_28px_-6px_rgba(2,132,199,0.35)]">
        {/* Subtle Water Ring Decorative Vectors */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none"></div>
        <div className="absolute right-12 -top-12 w-28 h-28 rounded-full bg-white/10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col space-y-4">
          {/* Card Top Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-white tracking-wide leading-none">SUKI REWARD CARD</div>
                <div className="font-label-sm text-label-sm text-sky-200 mt-0.5">Aquaspin Loyalty Club</div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm bg-black/20 text-white px-2 py-0.5 rounded-full font-mono">#AQ-VIP-042</span>
            </div>
          </div>

          {/* 10-Stamp Visual Grid */}
          <div className="bg-black/15 backdrop-blur-sm rounded-lg p-3">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }).map((_, idx) => {
                const isStamped = idx < stamps;
                const isLastStamped = idx === stamps - 1 && stamps > 0;
                const isFreeSlot = idx === 9;

                if (isStamped) {
                  return (
                    <div
                      key={idx}
                      className={`aspect-square rounded-md bg-white text-primary flex flex-col items-center justify-center shadow-sm ${
                        isLastStamped ? 'relative overflow-hidden' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="font-label-sm text-[9px] font-bold leading-none -mt-0.5">#{idx + 1}</span>
                      {isLastStamped && (
                        <div className="absolute inset-0 bg-primary/10 animate-ping rounded-md pointer-events-none"></div>
                      )}
                    </div>
                  );
                }

                if (isFreeSlot) {
                  return (
                    <div key={idx} className="aspect-square rounded-md bg-amber-400/25 flex flex-col items-center justify-center text-amber-200">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
                      <span className="font-label-sm text-[9px] leading-none font-bold text-amber-200">FREE</span>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="aspect-square rounded-md bg-white/15 flex flex-col items-center justify-center text-white/70">
                    <span className="material-symbols-outlined text-[18px]">water_drop</span>
                    <span className="font-label-sm text-[9px] leading-none mt-0.5">{idx + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stamp Counter & Explainer */}
          <div className="flex items-center justify-between text-white text-body-sm font-body-sm pt-0.5">
            <div className="flex items-center gap-1.5 font-label-md text-label-md">
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              <span>{stamps}/10 Stamps Completed</span>
            </div>
            <span className="text-sky-100 text-[11px] font-medium">
              {stamps >= 10 ? 'Ready to claim reward!' : `${10 - stamps} more loads for free 7kg`}
            </span>
          </div>

          {/* Action Footer */}
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={handleRedeem}
              disabled={stamps < 10}
              className={`flex-1 h-10 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 backdrop-blur-sm transition-all ${
                stamps >= 10
                  ? 'bg-amber-400 text-on-surface hover:bg-amber-300 shadow-md font-bold'
                  : 'bg-white/20 text-white/70 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">{stamps >= 10 ? 'redeem' : 'lock'}</span>
              <span>{stamps >= 10 ? 'Redeem FREE Load Now' : `Redeem (${10 - stamps} Stamps Needed)`}</span>
            </button>
            <button
              onClick={handleAddStamp}
              className="h-10 px-3 rounded-lg bg-white text-primary font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm active:bg-sky-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Add Stamp</span>
            </button>
          </div>
        </div>
      </section>

      {/* High Attention: Outstanding Pay-Later Balance Card */}
      {customer.unpaidBalance > 0 && (
        <section className="w-full bg-amber-50/80 rounded-xl p-space-md shadow-sm flex flex-col space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-amber-700 uppercase tracking-wider font-bold">Unsettled Charge</span>
                <div className="font-currency-display text-currency-display text-on-surface">₱{customer.unpaidBalance.toFixed(2)}</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-label-sm text-label-sm">Pay-Later</span>
          </div>

          {/* Order Attachment Details */}
          <div className="bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between text-body-sm font-body-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[18px] text-amber-600">local_laundry_service</span>
              <span className="font-label-md text-label-md text-on-surface truncate">
                {customer.unpaidOrderId || '#AQ-1081'}: Comforter + Fold 12kg
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-amber-700 font-semibold whitespace-nowrap">Ready for Pickup</span>
          </div>

          {/* Settlement Quick Action CTA Buttons */}
          <div className="grid grid-cols-2 gap-space-sm pt-0.5">
            <button
              onClick={() => onSettleBalance(customer, 'gcash')}
              className="h-11 rounded-lg bg-[#005CE6] hover:bg-blue-700 text-white font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              <span>Settle via GCash</span>
            </button>
            <button
              onClick={() => onSettleBalance(customer, 'cash')}
              className="h-11 rounded-lg bg-[#15803D] hover:bg-green-800 text-white font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span>Settle via Cash</span>
            </button>
          </div>
        </section>
      )}

      {/* Customer Statistics Summary Grid (4 Tiles) */}
      <section className="grid grid-cols-2 gap-space-sm w-full">
        {/* Stat 1: Lifetime Orders */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm">Lifetime Orders</span>
            <span className="material-symbols-outlined text-[18px] text-primary">local_laundry_service</span>
          </div>
          <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">{customer.totalVisits}</div>
          <span className="font-body-sm text-[11px] text-tertiary flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[13px]">trending_up</span> Top 5% customer
          </span>
        </div>

        {/* Stat 2: Total Kilos */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm">Total Kilos</span>
            <span className="material-symbols-outlined text-[18px] text-primary">scale</span>
          </div>
          <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
            {customer.totalKilos} <span className="text-body-sm font-normal text-on-surface-variant">kg</span>
          </div>
          <span className="font-body-sm text-[11px] text-outline truncate">Avg. 8.2 kg / order</span>
        </div>

        {/* Stat 3: Lifetime Spend */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm">Lifetime Spend</span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">account_balance_wallet</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-surface font-bold">₱{customer.totalSpent.toLocaleString()}</div>
          <span className="font-body-sm text-[11px] text-on-surface-variant truncate">Paid via GCash & Cash</span>
        </div>

        {/* Stat 4: Favorite Scent */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm">Favorite Scent</span>
            <span className="material-symbols-outlined text-[18px] text-primary">view_in_ar_new</span>
          </div>
          <div className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">{customer.favoriteScent}</div>
          <span className="font-body-sm text-[11px] text-primary truncate">+ Ariel Oxy Power</span>
        </div>
      </section>

      {/* Order History Ledger */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Laundry Visits</h3>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
              {customer.recentOrders.length} loaded
            </span>
          </div>
          <button className="font-label-sm text-label-sm text-primary hover:underline">
            View All ({customer.recentOrders.length})
          </button>
        </div>

        {/* List of Orders */}
        <div className="flex flex-col space-y-2">
          {customer.recentOrders.map((rec, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface-container-low flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-primary font-bold">{rec.orderId}</span>
                  <span className="font-body-sm text-body-sm text-outline">{rec.date}</span>
                </div>
                <span className={`font-currency-body text-currency-body font-bold ${rec.isUnpaid ? 'text-error' : 'text-on-surface'}`}>
                  ₱{rec.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm">
                <span className="text-on-surface truncate">{rec.serviceDesc}</span>
                <PaymentStatusBadge
                  status={rec.isUnpaid ? 'pay_later' : rec.paymentBadge}
                  label={rec.paymentBadge}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Care Instructions */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col space-y-2">
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-[18px] text-tertiary">edit_note</span>
          <h4 className="font-label-md text-label-md text-on-surface">Special Care Instructions</h4>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {customer.specialInstructions || 'Standard fabric care. Hypoallergenic rinse preferred.'}
        </p>
      </section>

      {/* Sticky Bottom Actions */}
      <div className="w-full flex items-center gap-space-sm pt-space-xs">
        <button
          onClick={() => showToast('Customer details editor opened', 'manage_accounts')}
          className="h-12 px-4 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
          <span>Edit Info</span>
        </button>
        <button
          onClick={() => onStartOrderForCustomer(customer)}
          className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.99] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Start New Order for {customer.name.split(' ')[0]}</span>
        </button>
      </div>
    </div>
  );
};
