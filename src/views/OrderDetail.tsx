import React, { useState } from 'react';
import { LaundryOrder } from '../types';
import { PaymentStatusBadge, OrderStatusBadge } from '../components/StatusBadge';

interface OrderDetailProps {
  order: LaundryOrder;
  onUpdateOrder: (updated: LaundryOrder) => void;
  onOpenReceipt: (order: LaundryOrder) => void;
  onNavigateToCustomer: (customerName: string) => void;
  onOpenTracker: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  onUpdateOrder,
  onOpenReceipt,
  onNavigateToCustomer,
  onOpenTracker,
  showToast
}) => {
  const [currentStep, setCurrentStep] = useState(order.stageStep);

  const handleAdvanceStep = (stepNumber: number) => {
    let nextStatus = order.status;
    let nextLabel = order.statusLabel;

    if (stepNumber === 1) {
      nextStatus = 'intake';
      nextLabel = 'Intake Weighed';
    } else if (stepNumber === 2) {
      nextStatus = 'washing';
      nextLabel = 'Washer #03 (Washing)';
    } else if (stepNumber === 3) {
      nextStatus = 'drying';
      nextLabel = 'Dryer #02 (Drying)';
    } else if (stepNumber === 4) {
      nextStatus = 'pickup';
      nextLabel = 'Ready for Pickup';
    } else if (stepNumber === 5) {
      nextStatus = 'completed';
      nextLabel = 'Completed & Claimed';
    }

    const updated: LaundryOrder = {
      ...order,
      stageStep: stepNumber,
      status: nextStatus,
      statusLabel: nextLabel,
      completedTime: stepNumber === 5 ? 'Just now' : order.completedTime
    };

    setCurrentStep(stepNumber);
    onUpdateOrder(updated);
    showToast(`Order updated to Stage ${stepNumber}: ${nextLabel}`, 'fast_forward');
  };

  const handlePayment = (method: 'Cash' | 'GCash') => {
    const updated: LaundryOrder = {
      ...order,
      paymentStatus: method === 'Cash' ? 'cash_paid' : 'gcash_paid'
    };
    onUpdateOrder(updated);
    showToast(`Payment of ₱${order.totalAmount.toFixed(2)} settled via ${method}!`, 'payments');
  };

  const handleResendSms = () => {
    showToast(`Resent pickup SMS alert to ${order.customerPhone}`, 'sms');
  };

  const steps = [
    { num: 1, title: 'Received & Weighed', desc: `Intake Tagged ${order.id}`, time: order.intakeTime },
    { num: 2, title: 'Washing Cycle', desc: 'Heavy Blanket Gentle Cycle', time: '10:45 AM' },
    { num: 3, title: 'Drying & Fluffing', desc: 'Dryer #02 • Low Heat Dry', time: '12:30 PM' },
    { num: 4, title: 'Staged for Pickup', desc: `${order.shelfBin} • Checked`, time: order.targetReadyTime },
    { num: 5, title: 'Customer Claimed', desc: 'Completed & Ticket Closed', time: order.completedTime || 'Pending' }
  ];

  const isPaid = order.paymentStatus !== 'pay_later';

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl gap-space-md max-w-lg mx-auto">
      {/* Top Order Identity & Header Card */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-outline-variant/20">
        <div className="flex items-center justify-between flex-wrap gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-extrabold">
              {order.id}
            </span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(order.id);
                showToast(`Order ${order.id} copied!`, 'content_copy');
              }}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              title="Copy Order Code"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
            </button>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-label-md text-label-md flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[14px]">shelves</span>
              {order.shelfBin}
            </span>
            <OrderStatusBadge status={order.status} label={order.statusLabel} />
          </div>
        </div>

        {/* Customer Details Cardlet */}
        <div className="w-full bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs mt-1 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div
              onClick={() => onNavigateToCustomer(order.customerName)}
              className="flex items-center gap-space-sm min-w-0 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-headline-sm text-headline-sm flex-shrink-0 font-bold">
                {order.customerInitial}
              </div>
              <div className="min-w-0">
                <h2 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                  {order.customerName}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant tracking-wide">{order.customerPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-space-xs flex-shrink-0">
              <a
                className="h-9 px-3 rounded-full bg-primary-fixed-dim text-on-primary-fixed flex items-center gap-1 font-label-md text-label-md hover:bg-primary-fixed transition-colors font-semibold"
                href={`tel:${order.customerPhone}`}
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                Call
              </a>
              <button
                onClick={handleResendSms}
                className="h-9 px-3 rounded-full bg-secondary-container text-on-secondary-container flex items-center gap-1 font-label-md text-label-md hover:bg-secondary-fixed transition-colors font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                SMS
              </button>
            </div>
          </div>
        </div>

        {/* Operational Intake Metadata */}
        <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-1 px-1">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
            <span>{order.intakeTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-tertiary">badge</span>
            <span>{order.intakeAttendant}</span>
          </div>
        </div>
      </div>

      {/* Interactive 5-Stage Stepper */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">local_laundry_service</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Laundry Progression</h3>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full font-semibold">
            Stage {currentStep} of 5
          </span>
        </div>

        {/* Timeline Stepper List */}
        <div className="relative flex flex-col gap-space-md pl-2">
          {/* Continuous Background Line */}
          <div className="absolute left-6 top-3 bottom-5 w-0.5 bg-surface-container-high -z-0"></div>
          <div
            className="absolute left-6 top-3 w-0.5 bg-primary -z-0 transition-all duration-300"
            style={{ height: `${((currentStep - 1) / 4) * 85}%` }}
          ></div>

          {steps.map((step) => {
            const isDone = currentStep >= step.num;
            const isCurrent = currentStep === step.num;

            return (
              <div
                key={step.num}
                onClick={() => handleAdvanceStep(step.num)}
                className="flex items-start gap-space-sm relative z-10 cursor-pointer group"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                    isDone
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant group-hover:bg-primary-fixed'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isDone ? 'check' : 'radio_button_unchecked'}
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between pt-1">
                  <div>
                    <p
                      className={`font-label-lg text-label-lg ${
                        isCurrent
                          ? 'text-primary font-bold'
                          : isDone
                          ? 'text-on-surface font-semibold'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{step.desc}</p>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{step.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Itemized Pricing & Settlement Actions */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Cost Breakdown</span>
          <PaymentStatusBadge status={order.paymentStatus} label={isPaid ? 'Paid & Settled' : 'Unpaid Balance'} />
        </div>

        <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5 font-body-sm text-body-sm">
          <div className="flex justify-between text-on-surface-variant">
            <span>{order.serviceName} ({order.weightKg} kg):</span>
            <span className="font-currency-body text-currency-body text-on-surface font-semibold">
              ₱{order.baseAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Addons ({order.addons.join(', ') || 'None'}):</span>
            <span className="font-currency-body text-currency-body text-on-surface font-semibold">
              ₱{order.addonAmount.toFixed(2)}
            </span>
          </div>
          <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-baseline">
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Total:</span>
            <span className="font-currency-display text-currency-display text-primary font-extrabold tracking-tight">
              ₱{order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-space-xs pt-1">
          {!isPaid ? (
            <>
              <button
                type="button"
                onClick={() => handlePayment('Cash')}
                className="py-2.5 px-3 rounded-lg bg-tertiary hover:bg-tertiary-container text-on-tertiary font-label-md text-label-md font-bold shadow-xs active:scale-95 transition-all text-center"
              >
                Settle Counter Cash
              </button>
              <button
                type="button"
                onClick={() => handlePayment('GCash')}
                className="py-2.5 px-3 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md text-label-md font-bold shadow-xs active:scale-95 transition-all text-center"
              >
                Settle GCash QR
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleAdvanceStep(5)}
              className="col-span-2 py-3 px-4 rounded-lg bg-tertiary text-on-tertiary font-label-lg text-label-lg font-bold shadow-sm active:scale-95 transition-all"
            >
              Mark Completed & Claimed
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenReceipt(order)}
            className="py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">receipt</span>
            <span>Thermal Receipt</span>
          </button>

          <button
            type="button"
            onClick={onOpenTracker}
            className="py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>Public Tracker</span>
          </button>
        </div>
      </div>
    </div>
  );
};
