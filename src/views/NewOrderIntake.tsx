import React, { useState } from 'react';
import { Customer, LaundryOrder, ServiceType } from '../types';

interface NewOrderIntakeProps {
  customers: Customer[];
  onSaveOrder: (newOrder: LaundryOrder) => void;
  onHoldBasket?: () => void;
  onOpenReceipt: (order: LaundryOrder) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const NewOrderIntake: React.FC<NewOrderIntakeProps> = ({
  customers,
  onSaveOrder,
  onHoldBasket,
  onOpenReceipt,
  showToast
}) => {
  // Selected Customer
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers[0]);
  const [custName, setCustName] = useState(customers[0]?.name || 'Atty. Bea Santos');
  const [custPhone, setCustPhone] = useState(customers[0]?.phone.replace('+63 ', '') || '917 555 4921');

  // Service configuration
  const [serviceType, setServiceType] = useState<ServiceType>('wash_dry_fold');
  const [ratePerKg, setRatePerKg] = useState(35);
  const [weightKg, setWeightKg] = useState(8.5);

  // Addons
  const [addons, setAddons] = useState<{ [key: string]: { name: string; price: number; checked: boolean } }>({
    ariel: { name: 'Ariel Sunrise Fresh', price: 20, checked: true },
    downy: { name: 'Downy Mystique', price: 25, checked: true },
    bleach: { name: 'Color-Safe Sanitizer', price: 15, checked: false },
    steam: { name: 'Steam Press & Hanger', price: 40, checked: false }
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cash_paid' | 'gcash_paid' | 'pay_later'>('gcash_paid');
  const [gcashRef, setGcashRef] = useState('#9042-8819-01');

  // Staging & Attendant
  const [targetTime, setTargetTime] = useState('Today 5:30 PM');
  const [shelfBin, setShelfBin] = useState('Shelf B-07 (Upper Bin)');
  const [attendant, setAttendant] = useState('Liza M. (Shift Lead)');

  // Calculations
  const calculateBase = () => {
    if (serviceType === 'wash_dry_fold') {
      return weightKg * ratePerKg;
    }
    if (serviceType === 'self_wash') {
      const loads = Math.max(1, Math.ceil(weightKg / 8));
      return loads * 80;
    }
    if (serviceType === 'self_dry') {
      const loads = Math.max(1, Math.ceil(weightKg / 8));
      return loads * 70;
    }
    return 120; // comforter piece
  };

  const calculateAddons = () => {
    return Object.values(addons)
      .filter((a) => a.checked)
      .reduce((sum, item) => sum + item.price, 0);
  };

  const baseTotal = calculateBase();
  const addonTotal = calculateAddons();
  const grandTotal = baseTotal + addonTotal;
  const drumCount = Math.max(1, Math.ceil(weightKg / 8));

  const toggleAddon = (key: string) => {
    setAddons((prev) => ({
      ...prev,
      [key]: { ...prev[key], checked: !prev[key].checked }
    }));
  };

  const handleSave = () => {
    const activeAddonNames = Object.values(addons)
      .filter((a) => a.checked)
      .map((a) => a.name);

    const newOrder: LaundryOrder = {
      id: `#AQ-${Math.floor(1084 + Math.random() * 20)}`,
      customerName: custName,
      customerPhone: `+63 ${custPhone}`,
      customerInitial: custName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() || 'CU',
      isVip: selectedCustomer?.isVip || false,
      serviceName:
        serviceType === 'wash_dry_fold'
          ? 'Wash-Dry-Fold'
          : serviceType === 'self_wash'
          ? 'Self-Service Wash'
          : serviceType === 'self_dry'
          ? 'Self-Service Dry'
          : 'Bulky Comforter Special',
      serviceType,
      weightKg,
      loadsCount: drumCount,
      addons: activeAddonNames,
      baseAmount: baseTotal,
      addonAmount: addonTotal,
      totalAmount: grandTotal,
      paymentStatus: paymentMethod,
      paymentRef: paymentMethod === 'gcash_paid' ? gcashRef : undefined,
      status: 'intake',
      statusLabel: 'Intake Queue',
      stageStep: 1,
      shelfBin,
      intakeTime: 'Today, Oct 24 • Just now',
      targetReadyTime: targetTime,
      notes: `Attendant: ${attendant}`,
      intakeAttendant: attendant
    };

    onSaveOrder(newOrder);
    onOpenReceipt(newOrder);
    showToast(`Order ${newOrder.id} saved & queued for ${custName}!`, 'print');
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Ticket Header & Shelf Staging Highlight */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#cce5ff] dark:bg-[#283044] flex items-center justify-center text-[#006194] dark:text-[#93ccff] flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#131b2e] dark:text-white">Intake Batch</span>
              <span className="text-[10px] font-bold bg-[#007bb9] text-white px-2 py-0.5 rounded-full tracking-wide">
                #AQ-1083
              </span>
            </div>
            <p className="text-xs text-[#707881] dark:text-[#bfc7d2] truncate">
              Express Counter Lane 02 • Katipunan
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">Staging</span>
          <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff] bg-[#cce5ff]/50 dark:bg-[#283044] px-2 py-0.5 rounded-md">
            Bay B-07
          </span>
        </div>
      </div>

      {/* SECTION 1: Customer Profile */}
      <section className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">person</span>
            <h2 className="text-xs font-bold text-[#131b2e] dark:text-white uppercase tracking-wider">
              Customer Profile
            </h2>
          </div>
          <button
            onClick={() => {
              const nextCust = customers[1];
              setSelectedCustomer(nextCust);
              setCustName(nextCust.name);
              setCustPhone(nextCust.phone.replace('+63 ', ''));
              showToast(`Switched customer profile to ${nextCust.name}`, 'person');
            }}
            className="text-[11px] font-semibold text-[#006194] dark:text-[#93ccff] flex items-center gap-0.5 hover:underline"
          >
            <span className="material-symbols-outlined text-[15px]">history</span>
            Recent (F4)
          </button>
        </div>

        {/* Name input */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
            placeholder="Enter customer name..."
            className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white text-xs font-semibold rounded-xl px-3 py-2.5 outline-none focus:bg-white dark:focus:bg-[#1a2235] focus:ring-2 focus:ring-[#006194] border border-[#eaedff] dark:border-[#283044] pr-20"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[#00685f] text-[18px]">verified</span>
            <span className="text-[10px] font-bold text-[#00685f]">VIP</span>
          </div>
        </div>

        {/* Phone & Suki Stamps */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex bg-[#f2f3ff] dark:bg-[#131b2e] rounded-xl overflow-hidden border border-[#eaedff] dark:border-[#283044]">
            <div className="bg-[#eaedff] dark:bg-[#283044] px-3 flex items-center text-[#707881] text-xs font-bold">
              +63
            </div>
            <input
              type="tel"
              value={custPhone}
              onChange={(e) => setCustPhone(e.target.value)}
              placeholder="9XX XXX XXXX"
              className="w-full bg-transparent text-[#131b2e] dark:text-white text-xs font-semibold px-3 py-2 outline-none"
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-2 bg-[#e6f4f2] dark:bg-[#004b45] px-3 py-2 rounded-xl">
            <div className="flex items-center gap-1 text-[#00685f] dark:text-[#89f5e7]">
              <span className="material-symbols-outlined text-[18px]">stars</span>
              <span className="text-xs font-bold">8/10 Stamps</span>
            </div>
            <span className="text-[10px] text-[#707881] dark:text-white/80">(Next Load Free 50%)</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Service & Load Sizing */}
      <section className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">local_laundry_service</span>
            <h2 className="text-xs font-bold text-[#131b2e] dark:text-white uppercase tracking-wider">
              Service & Load Sizing
            </h2>
          </div>
          <span className="text-[10px] bg-[#eaedff] dark:bg-[#283044] px-2 py-0.5 rounded text-[#707881] font-semibold">
            Min. 7 kg load
          </span>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              setServiceType('wash_dry_fold');
              setRatePerKg(35);
            }}
            className={`text-left p-3 rounded-xl flex flex-col justify-between transition-all ${
              serviceType === 'wash_dry_fold'
                ? 'bg-[#007bb9] text-white shadow-md'
                : 'bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold">Wash-Dry-Fold</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'wash_dry_fold' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-bold">₱35</span>
              <span className="text-[10px] opacity-80">/kg</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setServiceType('self_wash');
              setRatePerKg(80);
            }}
            className={`text-left p-3 rounded-xl flex flex-col justify-between transition-all ${
              serviceType === 'self_wash'
                ? 'bg-[#007bb9] text-white shadow-md'
                : 'bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold">Self-Service Wash</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'self_wash' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-bold">₱80</span>
              <span className="text-[10px] opacity-80">/load</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setServiceType('self_dry');
              setRatePerKg(70);
            }}
            className={`text-left p-3 rounded-xl flex flex-col justify-between transition-all ${
              serviceType === 'self_dry'
                ? 'bg-[#007bb9] text-white shadow-md'
                : 'bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold">Self-Service Dry</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'self_dry' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-bold">₱70</span>
              <span className="text-[10px] opacity-80">/load</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setServiceType('comforter');
              setRatePerKg(120);
            }}
            className={`text-left p-3 rounded-xl flex flex-col justify-between transition-all ${
              serviceType === 'comforter'
                ? 'bg-[#007bb9] text-white shadow-md'
                : 'bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold">Bulky Comforter</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'comforter' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm font-bold">₱120</span>
              <span className="text-[10px] opacity-80">/piece</span>
            </div>
          </button>
        </div>

        {/* Live Weight Stepper Area */}
        <div className="bg-[#f2f3ff] dark:bg-[#131b2e] rounded-xl p-3.5 space-y-3 border border-[#eaedff] dark:border-[#283044]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#3f4850] dark:text-[#bfc7d2] text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px]">scale</span>
              <span>Measured Scale Weight</span>
            </div>
            <span className="text-[11px] font-bold text-[#006194] dark:text-[#93ccff] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00685f] animate-ping"></span>
              Live BLE Scale Connected
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setWeightKg((w) => Math.max(1, Math.round((w - 0.5) * 10) / 10))}
              className="w-12 h-12 rounded-xl bg-[#dae2fd] dark:bg-[#283044] text-[#131b2e] dark:text-white flex items-center justify-center font-extrabold text-2xl hover:bg-[#cce5ff] active:scale-95 transition-all"
            >
              -
            </button>
            <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-[#1a2235] rounded-xl py-2 shadow-xs border border-[#eaedff] dark:border-[#283044]">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#006194] dark:text-[#93ccff]">
                  {weightKg.toFixed(1)}
                </span>
                <span className="text-sm font-bold text-[#707881]">kg</span>
              </div>
              <span className="text-[11px] text-[#707881]">
                {drumCount} Wash • {drumCount} Dryer Drum
              </span>
            </div>
            <button
              type="button"
              onClick={() => setWeightKg((w) => Math.round((w + 0.5) * 10) / 10)}
              className="w-12 h-12 rounded-xl bg-[#dae2fd] dark:bg-[#283044] text-[#131b2e] dark:text-white flex items-center justify-center font-extrabold text-2xl hover:bg-[#cce5ff] active:scale-95 transition-all"
            >
              +
            </button>
          </div>

          {/* Quick Preset Pills */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[7.0, 8.0, 10.0, 12.0].map((wt) => (
              <button
                key={wt}
                type="button"
                onClick={() => setWeightKg(wt)}
                className={`py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                  weightKg === wt
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1a2235] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
                }`}
              >
                {wt} kg
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Care Add-Ons & Fragrance Bar */}
      <section className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">sanitizer</span>
            <h2 className="text-xs font-bold text-[#131b2e] dark:text-white uppercase tracking-wider">
              Detergents & Special Care
            </h2>
          </div>
          <span className="text-[10px] text-[#00685f] font-semibold">Select all that apply</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {Object.entries(addons).map(([key, item]) => (
            <label
              key={key}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                item.checked
                  ? 'bg-[#006194]/10 border-[#006194]/40'
                  : 'bg-[#f2f3ff] dark:bg-[#131b2e] border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleAddon(key)}
                  className="w-4 h-4 rounded text-[#006194] focus:ring-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#131b2e] dark:text-white truncate">{item.name}</p>
                  <p className="text-[11px] text-[#707881]">
                    {key === 'ariel'
                      ? 'Triple action antibacterial'
                      : key === 'downy'
                      ? 'French perfume microcapsules'
                      : key === 'bleach'
                      ? 'Oxygen bleach brightener'
                      : 'Wrinkle-free garment cover'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff] flex-shrink-0">
                +₱{item.price.toFixed(2)}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* SECTION 4: Live Ledger & Settlement */}
      <section className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">payments</span>
            <h2 className="text-xs font-bold text-[#131b2e] dark:text-white uppercase tracking-wider">
              Amount & Payment
            </h2>
          </div>
          <span className="text-[11px] text-[#707881]">POS Terminal 01</span>
        </div>

        {/* Live Bill Breakdown Tile */}
        <div className="bg-[#f2f3ff] dark:bg-[#131b2e] rounded-xl p-3.5 space-y-2 border border-[#eaedff] dark:border-[#283044]">
          <div className="flex justify-between text-xs text-[#707881]">
            <span>
              {serviceType === 'wash_dry_fold'
                ? `Wash-Dry-Fold (${weightKg} kg @ ₱${ratePerKg}/kg)`
                : `Self-Service (${drumCount} loads)`}
            </span>
            <span className="font-semibold text-[#131b2e] dark:text-white">₱{baseTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-[#707881]">
            <span>
              Detergents & Add-ons ({Object.values(addons).filter((a) => a.checked).length} items)
            </span>
            <span className="font-semibold text-[#131b2e] dark:text-white">₱{addonTotal.toFixed(2)}</span>
          </div>

          <div className="pt-2 flex justify-between items-baseline bg-white dark:bg-[#1a2235] px-3 py-2 rounded-xl mt-2 shadow-xs border border-[#eaedff] dark:border-[#283044]">
            <div>
              <span className="text-xs font-bold text-[#131b2e] dark:text-white block">Total Due</span>
              <p className="text-[10px] text-[#00685f] font-semibold">VAT Inclusive • Eco Pouch Bagged</p>
            </div>
            <span className="text-2xl font-extrabold text-[#006194] dark:text-[#93ccff]">
              ₱{grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Badges / Methods */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#707881] block">Settlement Status</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('cash_paid')}
              className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                paymentMethod === 'cash_paid'
                  ? 'bg-[#16a34a] text-white shadow-md'
                  : 'bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span className="text-[11px] font-bold">Cash Paid</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('gcash_paid')}
              className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                paymentMethod === 'gcash_paid'
                  ? 'bg-[#005ce6] text-white shadow-md'
                  : 'bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              <span className="text-[11px] font-bold">GCash Paid</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('pay_later')}
              className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                paymentMethod === 'pay_later'
                  ? 'bg-[#ba1a1a] text-white shadow-md'
                  : 'bg-[#ffdad6]/60 dark:bg-[#93000a]/30 text-[#ba1a1a] dark:text-[#ffdad6]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
              <span className="text-[11px] font-bold">Pay Later</span>
            </button>
          </div>
        </div>

        {/* Quick GCash Reference Prompt */}
        {paymentMethod === 'gcash_paid' && (
          <div className="flex items-center gap-2.5 bg-[#005ce6]/10 rounded-xl p-2.5 border border-[#005ce6]/20">
            <span className="material-symbols-outlined text-[#005ce6] text-[22px]">qr_code_2</span>
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={gcashRef}
                onChange={(e) => setGcashRef(e.target.value)}
                className="text-xs font-bold text-[#131b2e] dark:text-white bg-transparent outline-none w-full"
                placeholder="GCash Ref: #9042-8819-01"
              />
              <p className="text-[11px] text-[#707881] truncate">Customer sent proof on terminal scanner</p>
            </div>
            <span className="text-[10px] font-bold text-[#005ce6] px-2 py-1 bg-white dark:bg-[#1a2235] rounded-lg shadow-xs">
              Verified
            </span>
          </div>
        )}
      </section>

      {/* SECTION 5: Schedule & Shelf Staging */}
      <section className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">schedule</span>
            <h2 className="text-xs font-bold text-[#131b2e] dark:text-white uppercase tracking-wider">
              Target Ready Time & Staging
            </h2>
          </div>
          <span className="text-[10px] text-[#00685f] font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[13px]">bolt</span> Standard (3 hrs)
          </span>
        </div>

        {/* Quick Time Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {['Today 5:30 PM', '+4 hrs (7:30 PM)', 'Tomorrow 9:00 AM'].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setTargetTime(time)}
              className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all ${
                targetTime === time
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white hover:bg-[#eaedff]'
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Shelf Bin & Notes Dropdown */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div>
            <label className="text-[10px] font-bold text-[#707881] uppercase block mb-1">
              Staging Bin / Rack
            </label>
            <div className="relative">
              <select
                value={shelfBin}
                onChange={(e) => setShelfBin(e.target.value)}
                className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white text-xs font-semibold rounded-xl px-3 py-2 appearance-none outline-none border border-[#eaedff] dark:border-[#283044]"
              >
                <option>Shelf B-07 (Upper Bin)</option>
                <option>Shelf B-08 (Upper Bin)</option>
                <option>Shelf A-02 (Heavy Rail)</option>
                <option>Hanger Rack H-04</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[#707881] text-[18px] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#707881] uppercase block mb-1">
              Assigned Attendant
            </label>
            <div className="relative">
              <select
                value={attendant}
                onChange={(e) => setAttendant(e.target.value)}
                className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white text-xs font-semibold rounded-xl px-3 py-2 appearance-none outline-none border border-[#eaedff] dark:border-[#283044]"
              >
                <option>Liza M. (Shift Lead)</option>
                <option>Carlos R. (Washer)</option>
                <option>Ana P. (Folding)</option>
                <option>Maria Aquino (Stn 1)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[#707881] text-[18px] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM ACTIONS */}
      <div className="pt-1 flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleSave}
          type="button"
          className="flex-1 h-12 bg-[#006194] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md hover:bg-[#007bb9] active:scale-[0.99] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">print</span>
          <span>Save & Print Ticket QR (₱{grandTotal.toFixed(2)})</span>
        </button>
        <button
          onClick={() => {
            if (onHoldBasket) onHoldBasket();
            showToast('Basket saved to Pending Hold queue.', 'pause_circle');
          }}
          type="button"
          className="h-12 px-5 bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">pause_circle</span>
          <span>Hold Basket</span>
        </button>
      </div>
    </div>
  );
};
