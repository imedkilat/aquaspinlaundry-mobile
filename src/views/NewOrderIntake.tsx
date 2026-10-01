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

  // Staging
  const [shelfBin] = useState('Shelf B-07 (Upper Bin)');

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

    const orderNumber = Math.floor(1084 + Math.random() * 20);
    const newOrder: LaundryOrder = {
      id: `#AQ-${orderNumber}`,
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
      status: 'intake',
      statusLabel: 'Intake Bay B-07',
      stageStep: 1,
      shelfBin,
      intakeTime: 'Today • Just now',
      targetReadyTime: 'Today 5:30 PM',
      completedTime: '',
      notes: 'Fresh intake tagged at POS Counter. Standard cycle queue.',
      intakeAttendant: 'Maria A. (Shift Lead)',
      smsNotification: {
        delivered: true,
        text: `Aquaspin Notice: Order #AQ-${orderNumber} received (${weightKg}kg). Estimated ready at 5:30 PM.`,
        timestamp: 'Just now'
      }
    };

    onSaveOrder(newOrder);
    showToast(`Order #AQ-${orderNumber} saved and claim ticket printed!`, 'receipt');
    onOpenReceipt(newOrder);
  };

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl space-y-space-md max-w-lg mx-auto">
      {/* Ticket Header & Shelf Staging Highlight */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between border border-outline-variant/20">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Intake Batch</span>
              <span className="font-label-sm text-label-sm bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-bold tracking-wide">
                #AQ-1083
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Express Counter Lane 02 • Katipunan Bay
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Staging</span>
          <span className="font-label-lg text-label-lg text-primary bg-primary-fixed/40 px-2 py-0.5 rounded font-bold">
            Bay B-07
          </span>
        </div>
      </div>

      {/* SECTION 1: Customer Profile */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">person</span>
            <h2 className="font-label-lg text-label-lg text-on-surface font-bold">Customer Profile</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextCust = customers[(customers.indexOf(selectedCustomer) + 1) % customers.length] || customers[0];
              setSelectedCustomer(nextCust);
              setCustName(nextCust.name);
              setCustPhone(nextCust.phone.replace('+63 ', ''));
              showToast(`Switched customer profile to ${nextCust.name}`, 'person');
            }}
            className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 hover:underline font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            Switch Profile
          </button>
        </div>

        {/* Name input */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <input
              type="text"
              value={custName}
              onChange={(e) => setCustName(e.target.value)}
              placeholder="Enter customer name..."
              className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-3 py-2.5 outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:shadow-md transition-all pr-20 border border-outline-variant/30"
            />
            <div className="absolute right-2.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
              <span className="font-label-sm text-label-sm text-tertiary font-bold">VIP</span>
            </div>
          </div>
        </div>

        {/* Phone & Suki Stamps */}
        <div className="flex flex-col sm:flex-row gap-space-sm">
          <div className="flex-1 flex bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/30 focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary transition-all">
            <div className="bg-surface-container px-3 flex items-center text-on-surface-variant font-label-md text-label-md font-bold">
              +63
            </div>
            <input
              type="tel"
              value={custPhone}
              onChange={(e) => setCustPhone(e.target.value)}
              placeholder="9XX XXX XXXX"
              className="w-full bg-transparent text-on-surface font-body-md text-body-md px-3 py-2 outline-none"
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-2 bg-tertiary-container/10 px-3 py-2 rounded-lg border border-tertiary/20">
            <div className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-[18px]">stars</span>
              <span className="font-label-md text-label-md font-bold">
                {selectedCustomer?.stampsCount || 8}/10 Stamps
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">(Next Load Free 50%)</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Service Selection & Load Sizing */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">local_laundry_service</span>
            <h2 className="font-label-lg text-label-lg text-on-surface font-bold">Service & Load Sizing</h2>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-semibold">
            Min. 7 kg load
          </span>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-2 gap-space-sm">
          <button
            type="button"
            onClick={() => {
              setServiceType('wash_dry_fold');
              setRatePerKg(35);
            }}
            className={`text-left p-3 rounded-lg flex flex-col justify-between transition-all ${
              serviceType === 'wash_dry_fold'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md font-bold">Wash-Dry-Fold</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'wash_dry_fold' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="font-currency-body text-currency-body font-bold">₱35</span>
              <span className="font-label-sm text-label-sm opacity-80">/kg</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setServiceType('self_wash');
              setRatePerKg(80);
            }}
            className={`text-left p-3 rounded-lg flex flex-col justify-between transition-all ${
              serviceType === 'self_wash'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md font-bold">Self-Service Wash</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'self_wash' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="font-currency-body text-currency-body font-bold">₱80</span>
              <span className="font-label-sm text-label-sm opacity-80">/load</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setServiceType('self_dry');
              setRatePerKg(70);
            }}
            className={`text-left p-3 rounded-lg flex flex-col justify-between transition-all ${
              serviceType === 'self_dry'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md font-bold">Self-Service Dry</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'self_dry' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="font-currency-body text-currency-body font-bold">₱70</span>
              <span className="font-label-sm text-label-sm opacity-80">/load</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setServiceType('comforter');
              setRatePerKg(120);
            }}
            className={`text-left p-3 rounded-lg flex flex-col justify-between transition-all ${
              serviceType === 'comforter'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md font-bold">Bulky Comforter</span>
              <span className="material-symbols-outlined text-[18px]">
                {serviceType === 'comforter' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            <div className="mt-2">
              <span className="font-currency-body text-currency-body font-bold">₱120</span>
              <span className="font-label-sm text-label-sm opacity-80">/piece</span>
            </div>
          </button>
        </div>

        {/* Weight & Drum Scale Integration */}
        <div className="bg-surface-container-low rounded-lg p-space-sm space-y-space-sm border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md font-semibold">
              <span className="material-symbols-outlined text-[18px]">scale</span>
              <span>Measured Scale Weight</span>
            </div>
            <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span> Live BLE Scale Connected
            </span>
          </div>

          <div className="flex items-center justify-between gap-space-sm">
            <button
              type="button"
              onClick={() => setWeightKg((w) => Math.max(1, +(w - 0.5).toFixed(1)))}
              className="w-11 h-11 rounded-lg bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container flex items-center justify-center active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[22px]">remove</span>
            </button>

            <div className="flex flex-col items-center">
              <div className="font-currency-display text-currency-display text-on-surface font-extrabold tracking-tight">
                {weightKg.toFixed(1)} <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">kg</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                ~{drumCount} {drumCount > 1 ? 'drums' : 'drum'} load sizing
              </span>
            </div>

            <button
              type="button"
              onClick={() => setWeightKg((w) => +(w + 0.5).toFixed(1))}
              className="w-11 h-11 rounded-lg bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container flex items-center justify-center active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[22px]">add</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Chemical & Treatment Add-ons */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">sanitizer</span>
            <h2 className="font-label-lg text-label-lg text-on-surface font-bold">Chemicals & Customization</h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Optional booster</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
          {Object.entries(addons).map(([key, item]) => (
            <label
              key={key}
              onClick={() => toggleAddon(key)}
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer border transition-colors ${
                item.checked
                  ? 'bg-surface-container border-primary/40'
                  : 'bg-surface-container-low border-transparent hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    item.checked ? 'bg-primary text-on-primary' : 'bg-surface-container border border-outline-variant'
                  }`}
                >
                  {item.checked && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</span>
              </div>
              <span className="font-label-md text-label-md text-primary font-bold">+₱{item.price}</span>
            </label>
          ))}
        </div>
      </section>

      {/* SECTION 4: Payment & Checkout Summary */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
            <h2 className="font-label-lg text-label-lg text-on-surface font-bold">Payment Method</h2>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-bold">Auto Receipt</span>
        </div>

        {/* Method selector */}
        <div className="grid grid-cols-3 gap-space-xs">
          <button
            type="button"
            onClick={() => setPaymentMethod('cash_paid')}
            className={`py-2 px-1 rounded-lg text-center font-label-md text-label-md font-bold transition-all ${
              paymentMethod === 'cash_paid'
                ? 'bg-tertiary text-on-tertiary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Counter Cash
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('gcash_paid')}
            className={`py-2 px-1 rounded-lg text-center font-label-md text-label-md font-bold transition-all ${
              paymentMethod === 'gcash_paid'
                ? 'bg-secondary text-on-secondary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            GCash QR
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('pay_later')}
            className={`py-2 px-1 rounded-lg text-center font-label-md text-label-md font-bold transition-all ${
              paymentMethod === 'pay_later'
                ? 'bg-error-container text-on-error-container shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Pay on Pickup
          </button>
        </div>

        {/* Cost breakdown */}
        <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5 font-body-sm text-body-sm">
          <div className="flex justify-between text-on-surface-variant">
            <span>Base Service ({weightKg} kg):</span>
            <span className="font-currency-body text-currency-body text-on-surface font-semibold">
              ₱{baseTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Selected Addons:</span>
            <span className="font-currency-body text-currency-body text-on-surface font-semibold">
              ₱{addonTotal.toFixed(2)}
            </span>
          </div>
          <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-baseline">
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Total Amount Due:</span>
            <span className="font-currency-display text-currency-display text-primary font-extrabold tracking-tight">
              ₱{grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-space-xs pt-1">
          {onHoldBasket && (
            <button
              type="button"
              onClick={onHoldBasket}
              className="py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-semibold transition-colors active:scale-95"
            >
              Hold in Basket
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-sm flex items-center justify-center gap-space-xs transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">receipt</span>
            <span>Save & Issue Claim Receipt</span>
          </button>
        </div>
      </section>
    </div>
  );
};
