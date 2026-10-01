import React, { useState } from 'react';
import { InventoryItem, StaffMember } from '../types';

interface OperationsSettingsProps {
  inventory: InventoryItem[];
  staff: StaffMember[];
  onOrderStock: (item: InventoryItem) => void;
  onRestockAll: () => void;
  onOpenPinModal: (staffMember: StaffMember) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const OperationsSettings: React.FC<OperationsSettingsProps> = ({
  inventory,
  staff,
  onOrderStock,
  onRestockAll,
  onOpenPinModal,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings'>('inventory');

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl">
      {/* Top Hub Intro */}
      <div className="pt-space-md pb-space-sm flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-extrabold tracking-tight">
            Operations & Settings
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
            <span className="material-symbols-outlined text-[14px]">shield_person</span>
            Admin Clearance
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
          Katipunan Branch #01 • Active Commercial POS
        </p>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="mt-space-sm p-1 bg-surface-container rounded-xl flex items-center justify-between shadow-sm">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all duration-200 ${
            activeTab === 'inventory'
              ? 'bg-surface text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          <span>Inventory & Stock</span>
          <span className="px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container text-label-sm font-bold ml-0.5">
            3
          </span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all duration-200 ${
            activeTab === 'settings'
              ? 'bg-surface text-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">badge</span>
          <span>Staff & Pricing</span>
        </button>
      </div>

      {/* PANEL A: INVENTORY & STOCK */}
      {activeTab === 'inventory' ? (
        <div className="flex flex-col gap-space-md mt-space-md">
          {/* Header with Action */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Live Stock Levels</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time tank volume & packaging units</p>
            </div>
            <button
              onClick={onRestockAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>+ Restock</span>
            </button>
          </div>

          {/* Low Stock Amber Warning Banner */}
          <div className="p-3.5 bg-[#FFFBEB] rounded-xl flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 text-[#B45309]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md font-bold text-[#B45309]">3 Items Critically Low</span>
                <span className="font-label-sm text-label-sm text-[#B45309] font-semibold">Priority Action</span>
              </div>
              <p className="font-body-sm text-body-sm text-[#92400E] mt-0.5 leading-snug">
                Downy Mystique, Machine Descaler, and Poly Laundry Bags are below threshold. Reorder recommended to avoid shift stalls.
              </p>
            </div>
          </div>

          {/* Quick Stats Cards (2-column bento) */}
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="p-3.5 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-label-sm uppercase font-semibold">Weekly Consumption</span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">water_drop</span>
              </div>
              <div className="mt-2">
                <div className="font-headline-md text-headline-md text-on-surface font-bold">
                  48.2 <span className="text-label-md font-normal text-on-surface-variant">Liters</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +6% vs last week
                </span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-label-sm uppercase font-semibold">Estimated Reorder</span>
                <span className="material-symbols-outlined text-[18px] text-primary">payments</span>
              </div>
              <div className="mt-2">
                <div className="font-currency-body text-currency-body text-on-surface font-bold">₱6,420.00</div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">local_shipping</span> B2B wholesale rate
                </span>
              </div>
            </div>
          </div>

          {/* Supplies Inventory List */}
          <div className="flex flex-col gap-space-sm">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        item.isLow
                          ? 'bg-error-container text-error'
                          : item.category === 'softener'
                          ? 'bg-secondary-fixed text-primary'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {item.category === 'softener'
                          ? 'sanitizer'
                          : item.category === 'bleach'
                          ? 'clean_hands'
                          : item.category === 'packaging'
                          ? 'shopping_bag'
                          : item.category === 'maintenance'
                          ? 'cleaning_services'
                          : 'soap'}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface truncate">
                          {item.name}
                        </span>
                        {item.isLow && <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>}
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        {item.vendor} • ₱{item.unitPrice}/{item.unitLabel}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold flex-shrink-0 ${
                      item.isLow
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    }`}
                  >
                    {item.currentStock} {item.unitLabel}s {item.isLow ? '(Low)' : 'left'}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-label-sm text-on-surface-variant">
                    <span className={item.isLow ? 'text-error font-semibold' : ''}>
                      {item.isLow ? `Critically low • ${item.capacityPercent}%` : `Capacity ${item.capacityPercent}% full`}
                    </span>
                    <span>Last Restocked: {item.lastRestocked}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.isLow ? 'bg-error' : 'bg-primary'}`}
                      style={{ width: `${item.capacityPercent}%` }}
                    ></div>
                  </div>
                </div>

                {item.isLow && (
                  <div className="pt-1 flex items-center justify-between border-t border-surface-container-high">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Standard batch refill: {item.reorderBatchUnits} {item.unitLabel}s
                    </span>
                    <button
                      onClick={() => onOrderStock(item)}
                      className="px-3 py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      Order {item.reorderBatchUnits} {item.unitLabel}s
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* PANEL B: STAFF & PRICING */
        <div className="flex flex-col gap-space-md mt-space-md">
          {/* Staff Account Overview Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Branch Staff (4 Active)</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Operator permissions & terminal PINs</p>
            </div>
            <button
              onClick={() => showToast('Add Attendant sheet unlocked. Enter 4-digit POS credentials.', 'person_add')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Add Staff</span>
            </button>
          </div>

          {/* Staff Cards Stack */}
          <div className="flex flex-col gap-space-sm">
            {staff.map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-container-high"
                        src={s.avatar}
                        alt={s.name}
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                          s.isActive ? 'bg-[#10B981]' : 'bg-outline-variant'
                        }`}
                      ></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface truncate">
                          {s.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                          {s.role.split('•')[0].trim()}
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        ID: {s.id} • {s.shift}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold flex-shrink-0 ${
                      s.isActive
                        ? 'bg-[#ECFDF5] text-[#065F46]'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {s.statusText}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">POS Terminal PIN:</span>
                    <span className="font-mono text-on-surface font-bold tracking-widest text-[13px] bg-surface-container px-2 py-0.5 rounded">
                      •••• {s.pin}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenPinModal(s)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors"
                      type="button"
                    >
                      Reset PIN
                    </button>
                    <button
                      onClick={() => showToast(`Manage permissions for ${s.name}`, 'tune')}
                      className="p-1 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shop Profile & Pricing Matrix */}
          <div className="pt-space-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Shop Profile & Pricing</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Store registry and customer unit charges</p>
              </div>
              <button
                onClick={() => showToast('Exported BIR Katipunan Official Audit Log', 'download')}
                className="px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high transition-colors"
                type="button"
              >
                Export BIR Log
              </button>
            </div>

            {/* Store Details Badge Card */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Branch Master Info</span>
                <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span> POS Online
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-on-surface">
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">Store Name</span>
                  <span className="font-label-md text-label-md font-bold">Aquaspin Katipunan</span>
                </div>
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">Operating Hours</span>
                  <span className="font-label-md text-label-md font-bold">Mon-Sun 7AM - 9PM</span>
                </div>
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">Contact Hotline</span>
                  <span className="font-label-md text-label-md font-bold">+63 917 888 2782</span>
                </div>
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">BIR Permit Reg</span>
                  <span className="font-label-md text-label-md font-bold font-mono">#FP-9281-QC</span>
                </div>
              </div>
            </div>

            {/* Mini Pricing Adjustment Matrix */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between pb-1">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Active Laundry Tariff Rates</span>
                <span className="font-label-sm text-label-sm text-primary font-bold">Tap to adjust</span>
              </div>
              {[
                { title: 'Wash-Dry-Fold Base', desc: 'Minimum 5 kg load', price: '₱35.00', unit: '/kg', icon: 'local_laundry_service', iconBg: 'bg-secondary-fixed text-primary' },
                { title: 'Self-Service Wash', desc: 'Standard 38-min cycle', price: '₱80.00', unit: '/load', icon: 'water', iconBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
                { title: 'Self-Service Dry', desc: 'High-temp 42-min tumble', price: '₱70.00', unit: '/load', icon: 'mode_fan', iconBg: 'bg-[#FEF3C7] text-[#B45309]' },
                { title: 'Heavy Comforter Tier', desc: 'King/Queen bedding special', price: '₱120.00', unit: '/pc', icon: 'bed', iconBg: 'bg-surface-container-high text-on-surface' }
              ].map((rate, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rate.iconBg}`}>
                      <span className="material-symbols-outlined text-[18px]">{rate.icon}</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md font-bold text-on-surface block">{rate.title}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{rate.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-currency-body text-currency-body font-bold text-on-surface">
                      {rate.price} <span className="text-label-sm font-normal text-on-surface-variant">{rate.unit}</span>
                    </span>
                    <button
                      onClick={() => showToast(`Adjust rate for ${rate.title}`, 'edit')}
                      className="p-1 rounded-md text-primary hover:bg-primary-fixed transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
