import React from 'react';
import { PaymentStatus, MachineBay, OrderStatus } from '../types';

export type MachineStatusType = MachineBay['status'];

export interface PaymentStatusBadgeProps {
  status: PaymentStatus | 'unpaid' | 'cash' | 'gcash' | string;
  label?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Reusable Payment Status Badge matching DESIGN.md
 * - GCash: #005CE6 royal blue / secondary-fixed (#CDE5FF text #004F74)
 * - Cash: #16A34A / #DCFCE7 text #15803D (or #ECFDF5 text #065F46)
 * - Pay-Later: #D97706 warm amber / #FFFBEB border #FDE68A text #B45309
 */
export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  status,
  label,
  showIcon = true,
  size = 'sm',
  className = ''
}) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-surface-container text-on-surface-variant border border-outline-variant';
  let defaultLabel = status;
  let iconName = 'payments';

  if (normalized.includes('gcash')) {
    // Official high-trust royal blue from DESIGN.md
    colorClasses = 'bg-[#EBF3FF] text-[#005CE6] border border-[#BFDBFE]';
    defaultLabel = 'GCash Paid';
    iconName = 'qr_code_2';
  } else if (normalized.includes('cash') || normalized === 'paid') {
    // Fresh emerald green from DESIGN.md (#DCFCE7 text #15803D)
    colorClasses = 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]';
    defaultLabel = 'Cash Paid';
    iconName = 'payments';
  } else if (normalized.includes('later') || normalized.includes('unpaid') || normalized.includes('unsettled')) {
    // Warm amber balance alert from DESIGN.md (#FFFBEB text #B45309 border #FDE68A)
    colorClasses = 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]';
    defaultLabel = 'Pay-Later';
    iconName = 'warning';
  }

  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-0.5 text-label-sm font-label-sm'
    : 'px-3 py-1 text-label-md font-label-md';

  const iconSize = size === 'sm' ? 'text-[12px]' : 'text-[15px]';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold transition-colors ${sizeClasses} ${colorClasses} ${className}`}
    >
      {showIcon && (
        <span
          className={`material-symbols-outlined ${iconSize} flex-shrink-0`}
          style={iconName === 'warning' ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {iconName}
        </span>
      )}
      <span className="truncate">{label || defaultLabel}</span>
    </span>
  );
};

export interface MachineStatusBadgeProps {
  status: MachineStatusType | 'washing' | 'drying';
  type?: 'washer' | 'dryer';
  remainingMinutes?: number;
  label?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Reusable Machine Status Badge matching DESIGN.md
 * - Running/Washing: Sky blue fill with animated pulse icon
 * - Drying: High-temp amber/secondary oceanic tint
 * - Idle/Available: Pristine mint-teal (#F0FDFA text #0F766E border #99F6E4)
 * - Maintenance/Issue: Rose red alert (#FFDAD6 text #93000A)
 */
export const MachineStatusBadge: React.FC<MachineStatusBadgeProps> = ({
  status,
  remainingMinutes,
  label,
  showIcon = true,
  size = 'sm',
  className = ''
}) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-surface-container text-on-surface-variant';
  let defaultLabel: string = status;
  let iconContent: React.ReactNode = null;

  if (normalized === 'running' || normalized === 'washing') {
    // Wash cycle running: Pill with animated pulse icon, pale blue fill
    colorClasses = 'bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] font-bold shadow-xs';
    defaultLabel = remainingMinutes !== undefined ? `${remainingMinutes}m left` : 'Running';
    iconContent = (
      <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse flex-shrink-0" />
    );
  } else if (normalized === 'drying') {
    // Drying cycle
    colorClasses = 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] font-bold shadow-xs';
    defaultLabel = remainingMinutes !== undefined ? `${remainingMinutes}m left` : 'Drying';
    iconContent = (
      <span className="material-symbols-outlined text-[13px] text-[#B45309] animate-spin flex-shrink-0">
        mode_fan
      </span>
    );
  } else if (normalized === 'idle' || normalized === 'available' || normalized === 'ready') {
    // Clean / Available mint teal
    colorClasses = 'bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] font-semibold';
    defaultLabel = 'Idle';
    iconContent = (
      <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] flex-shrink-0" />
    );
  } else if (normalized === 'cooling') {
    colorClasses = 'bg-secondary-fixed text-on-secondary-fixed border border-secondary-fixed-dim font-semibold';
    defaultLabel = 'Cooling';
    iconContent = (
      <span className="material-symbols-outlined text-[13px] text-secondary flex-shrink-0">
        ac_unit
      </span>
    );
  } else if (normalized === 'maintenance' || normalized === 'error') {
    colorClasses = 'bg-error-container text-on-error-container border border-error/20 font-bold';
    defaultLabel = 'Maintenance';
    iconContent = (
      <span className="material-symbols-outlined text-[13px] text-error flex-shrink-0">
        build
      </span>
    );
  }

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-label-sm font-label-sm'
    : 'px-2.5 py-1 text-label-md font-label-md';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full transition-colors ${sizeClasses} ${colorClasses} ${className}`}
    >
      {showIcon && iconContent}
      <span>{label || defaultLabel}</span>
    </span>
  );
};

export interface OrderStatusBadgeProps {
  status: OrderStatus | 'ready' | 'claimed' | string;
  label?: string;
  showDot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Reusable Order Lifecycle Status Badge matching DESIGN.md
 */
export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  label,
  showDot = true,
  size = 'sm',
  className = ''
}) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-surface-container text-on-surface-variant';
  let dotColor = 'bg-outline';
  let defaultLabel = status;

  if (normalized.includes('wash') || normalized === 'intake') {
    colorClasses = 'bg-primary-fixed text-on-primary-fixed';
    dotColor = 'bg-primary animate-pulse';
    defaultLabel = 'Washing';
  } else if (normalized.includes('dry')) {
    colorClasses = 'bg-secondary-fixed text-on-secondary-fixed';
    dotColor = 'bg-secondary animate-pulse';
    defaultLabel = 'Drying';
  } else if (normalized.includes('ready') || normalized === 'pickup') {
    colorClasses = 'bg-amber-100 text-amber-900 border border-amber-200';
    dotColor = 'bg-amber-500';
    defaultLabel = 'Ready for Pickup';
  } else if (normalized.includes('complete') || normalized.includes('claim')) {
    colorClasses = 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
    dotColor = 'bg-tertiary';
    defaultLabel = 'Claimed';
  }

  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-0.5 text-label-sm font-label-sm'
    : 'px-3 py-1 text-label-md font-label-md';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold ${sizeClasses} ${colorClasses} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />}
      <span className="truncate">{label || defaultLabel}</span>
    </span>
  );
};

export interface StatusBadgeProps {
  variant: 'payment' | 'machine' | 'order';
  status: string;
  label?: string;
  remainingMinutes?: number;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Unified StatusBadge Component
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  status,
  label,
  remainingMinutes,
  showIcon = true,
  size = 'sm',
  className = ''
}) => {
  if (variant === 'machine') {
    return (
      <MachineStatusBadge
        status={status as MachineStatusType}
        remainingMinutes={remainingMinutes}
        label={label}
        showIcon={showIcon}
        size={size}
        className={className}
      />
    );
  }

  if (variant === 'order') {
    return (
      <OrderStatusBadge
        status={status}
        label={label}
        showDot={showIcon}
        size={size}
        className={className}
      />
    );
  }

  return (
    <PaymentStatusBadge
      status={status}
      label={label}
      showIcon={showIcon}
      size={size}
      className={className}
    />
  );
};

export default StatusBadge;
