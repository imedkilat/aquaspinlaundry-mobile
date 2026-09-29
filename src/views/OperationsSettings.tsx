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
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Top Hub Intro */}
      <div className="pt-1 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-2xl text-[#131b2e] dark:text-white tracking-tight">
            Operations & Settings
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#cde5ff] dark:bg-[#004f7b] text-[#004f7b] dark:text-[#cde5ff] text-[10px] font-bold uppercase tracking-wider shadow-xs">
            <span className="material-symbols-outlined text-[13px]">shield_person</span>
            Admin Clearance
          </span>
        </div>
        <p className="text-xs text-[#707881] dark:text-[#bfc7d2] flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-[#006194]">location_on</span>
          Katipunan Branch #01 • Active Commercial POS
        </p>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="p-1 bg-[#eaedff] dark:bg-[#283044] rounded-2xl flex items-center justify-between shadow-xs">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'inventory'
              ? 'bg-white dark:bg-[#1a2235] text-[#006194] dark:text-[#93ccff] shadow-sm'
              : 'text-[#707881] dark:text-[#bfc7d2] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          <span>Inventory & Stock</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-extrabold ml-0.5">
            3
          </span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'settings'
              ? 'bg-white dark:bg-[#1a2235] text-[#006194] dark:text-[#93ccff] shadow-sm'
              : 'text-[#707881] dark:text-[#bfc7d2] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">badge</span>
          <span>Staff & Pricing</span>
        </button>
      </div>

      {/* PANEL A: INVENTORY & STOCK */}
      {activeTab === 'inventory' ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Live Stock Levels</h2>
              <p className="text-xs text-[#707881]">Real-time tank volume & packaging units</p>
            </div>
            <button
              onClick={onRestockAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold shadow-sm hover:bg-[#007bb9] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>+ Restock</span>
            </button>
          </div>

          {/* Low Stock Warning Banner */}
          <div className="p-3.5 bg-[#fffbeb] dark:bg-[#93000a]/20 rounded-2xl flex items-start gap-3 border border-[#fef3c7] dark:border-[#93000a]/30 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#fef3c7] dark:bg-[#93000a]/40 flex items-center justify-center flex-shrink-0 text-[#b45309] dark:text-[#ffdad6]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#b45309] dark:text-[#ffdad6]">3 Items Critically Low</span>
                <span className="text-[10px] font-bold text-[#b45309] uppercase">Priority Action</span>
              </div>
              <p className="text-xs text-[#92400e] dark:text-[#ffdad6]/80 mt-0.5 leading-relaxed">
                Downy Mystique, Machine Descaler, and Poly Laundry Bags are below buffer threshold. Reorder recommended to avoid shift stalls.
              </p>
            </div>
          </div>

          {/* Quick Stats Bento */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-white dark:bg-[#1a2235] shadow-xs border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#707881]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Weekly Consumption</span>
                <span className="material-symbols-outlined text-[18px] text-[#00685f]">water_drop</span>
              </div>
              <div className="mt-2">
                <div className="text-xl font-extrabold text-[#131b2e] dark:text-white">
                  48.2 <span className="text-xs font-normal text-[#707881]">Liters</span>
                </div>
                <span className="text-[10px] font-bold text-[#00685f] flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">trending_up</span> +6% vs last week
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-[#1a2235] shadow-xs border border-[#eaedff] dark:border-[#283044] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#707881]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Estimated Reorder</span>
                <span className="material-symbols-outlined text-[18px] text-[#006194]">payments</span>
              </div>
              <div className="mt-2">
                <div className="text-xl font-extrabold text-[#131b2e] dark:text-white">₱6,420.00</div>
                <span className="text-[10px] text-[#707881] flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">local_shipping</span> B2B wholesale rate
                </span>
              </div>
            </div>
          </div>

          {/* Inventory Items */}
          <div className="flex flex-col gap-2.5">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1a2235] shadow-xs border border-[#eaedff] dark:border-[#283044] flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.isLow ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#cce5ff] text-[#006194]'
                    }`}>
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
                        <span className="text-xs font-bold text-[#131b2e] dark:text-white truncate">
                          {item.name}
                        </span>
                        {item.isLow && <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>}
                      </div>
                      <span className="text-[11px] text-[#707881] truncate">
                        {item.vendor} • ₱{item.unitPrice}/{item.unitLabel}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${
                    item.isLow
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : 'bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white'
                  }`}>
                    {item.currentStock} {item.unitLabel}s {item.isLow ? '(Low)' : 'left'}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-[#707881]">
                    <span className={item.isLow ? 'text-[#ba1a1a] font-bold' : ''}>
                      Capacity {item.capacityPercent}% full
                    </span>
                    <span>Last Restocked: {item.lastRestocked}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eaedff] dark:bg-[#283044] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.isLow ? 'bg-[#ba1a1a]' : 'bg-[#006194]'}`}
                      style={{ width: `${item.capacityPercent}%` }}
                    ></div>
                  </div>
                </div>

                {item.isLow && (
                  <div className="pt-1 flex items-center justify-between border-t border-[#eaedff] dark:border-[#283044]">
                    <span className="text-[11px] text-[#707881]">
                      Batch refill: {item.reorderBatchUnits} {item.unitLabel}s
                    </span>
                    <button
                      onClick={() => onOrderStock(item)}
                      className="px-3 py-1 rounded-lg bg-[#cce5ff] text-[#004b73] text-[11px] font-bold hover:bg-[#93ccff] transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">sync</span>
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
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Branch Staff (4 Active)</h2>
              <p className="text-xs text-[#707881]">Operator permissions & terminal PINs</p>
            </div>
            <button
              onClick={() => showToast('New staff attendant invitation dialog opened', 'person_add')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold shadow-sm hover:bg-[#007bb9] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Add Staff</span>
            </button>
          </div>

          {/* Staff List */}
          <div className="flex flex-col gap-2.5">
            {staff.map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1a2235] shadow-xs border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#eaedff]"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                        s.isActive ? 'bg-[#10b981]' : 'bg-[#707881]'
                      }`}></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#131b2e] dark:text-white truncate">
                          {s.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold">
                          {s.role.split('•')[0].trim()}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#707881] truncate">{s.shift}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${
                    s.isActive ? 'bg-[#e6f4f2] text-[#00685f]' : 'bg-[#eaedff] text-[#707881]'
                  }`}>
                    {s.statusText}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] dark:border-[#283044]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#707881]">Terminal PIN:</span>
                    <span className="font-mono text-xs font-bold text-[#131b2e] dark:text-white bg-[#f2f3ff] dark:bg-[#283044] px-2 py-0.5 rounded">
                      •••• {s.pin}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenPinModal(s)}
                    className="px-2.5 py-1 rounded-lg bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white text-xs font-semibold hover:bg-[#dae2fd] transition-colors"
                  >
                    Reset PIN
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Store Profile & Tariff Rates */}
          <div className="pt-2 flex flex-col gap-2.5">
            <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Active Laundry Tariff Rates</h2>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1a2235] shadow-xs border border-[#eaedff] dark:border-[#283044] flex flex-col gap-2">
              {[
                { title: 'Wash-Dry-Fold Base', desc: 'Minimum 5 kg load', price: '₱35.00', unit: '/kg' },
                { title: 'Self-Service Wash', desc: 'Standard 38-min cycle', price: '₱80.00', unit: '/load' },
                { title: 'Self-Service Dry', desc: 'High-temp 42-min tumble', price: '₱70.00', unit: '/load' },
                { title: 'Heavy Comforter Tier', desc: 'King/Queen bedding special', price: '₱120.00', unit: '/pc' }
              ].map((rate, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e]"
                >
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] dark:text-white block">{rate.title}</span>
                    <span className="text-[11px] text-[#707881]">{rate.desc}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#131b2e] dark:text-white">
                      {rate.price} <span className="text-[10px] font-normal text-[#707881]">{rate.unit}</span>
                    </span>
                    <button
                      onClick={() => showToast(`Adjust rate for ${rate.title}`, 'edit')}
                      className="p-1 rounded text-[#006194] hover:bg-[#eaedff]"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
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
