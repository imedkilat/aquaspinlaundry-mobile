export type OrderStatus = 'intake' | 'washing' | 'drying' | 'pickup' | 'completed';
export type PaymentStatus = 'cash_paid' | 'gcash_paid' | 'pay_later';
export type ServiceType = 'wash_dry_fold' | 'self_wash' | 'self_dry' | 'comforter';

export interface LaundryOrder {
  id: string; // e.g. '#AQ-1081'
  customerName: string;
  customerPhone: string;
  customerInitial: string;
  isVip?: boolean;
  serviceName: string;
  serviceType: ServiceType;
  weightKg: number;
  loadsCount: number;
  addons: string[];
  baseAmount: number;
  addonAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentRef?: string;
  status: OrderStatus;
  statusLabel: string;
  stageStep: number; // 1 to 5
  shelfBin: string;
  assignedBay?: string;
  intakeTime: string;
  targetReadyTime: string;
  completedTime?: string;
  notes?: string;
  intakeAttendant: string;
  smsNotification?: {
    delivered: boolean;
    text: string;
    timestamp: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  initials: string;
  phone: string;
  address: string;
  tier: 'VIP Gold' | 'VIP' | 'Regular' | 'Student';
  isVip: boolean;
  stampsCount: number; // out of 10
  totalVisits: number;
  totalSpent: number;
  totalKilos: number;
  favoriteScent: string;
  unpaidBalance: number;
  unpaidOrderId?: string;
  currentActiveOrderId?: string;
  specialInstructions?: string;
  recentOrders: {
    orderId: string;
    date: string;
    serviceDesc: string;
    amount: number;
    paymentBadge: string;
    isUnpaid?: boolean;
    stampTag?: string;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'detergent' | 'softener' | 'bleach' | 'packaging' | 'maintenance';
  vendor: string;
  unitPrice: number;
  unitLabel: string;
  currentStock: number;
  maxStock: number;
  capacityPercent: number;
  isLow: boolean;
  lastRestocked: string;
  reorderBatchUnits: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  pin: string;
  avatar: string;
  isActive: boolean;
  statusText: string;
}

export interface MachineBay {
  id: string;
  name: string;
  type: 'washer' | 'dryer';
  status: 'running' | 'idle' | 'cooling' | 'maintenance';
  currentOrderId?: string;
  remainingMinutes?: number;
  cycleStage?: string;
}
