import { LaundryOrder, Customer, InventoryItem, StaffMember, MachineBay } from '../types';

export const STORE_INFO = {
  name: 'Aquaspin Laundry Station',
  branch: 'Katipunan Branch (QC)',
  address: 'Katipunan Ave., Quezon City',
  landmark: 'Across Ateneo Gate 3',
  hotline: '+63 917 888 2782',
  phone: '+63 917 123 4567',
  hours: 'Mon–Sun: 7:00 AM – 9:00 PM',
  birReg: '#FP-9281-QC',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkgebFlU2r1GH_pQ4eCLvwlJjUumCbiT6cupZBWqli1DWoslmh8t8Qve7lEKsB9fRThXACL-pO0SosANyHSgbtWsT_AqcfY9Jey_roRVC11b-ohp5G_00ALUdfT0JAuI25AA0nhom0aLAQL6xcIuhvZJDP8QhzBZc5q3A89nQgz20yG1OMJXDslZUv77Bdn95b9h1Kg5nxvn0BU0d1ZD-YBg0Ac2Qf9-B0m8IqRjjLkyxelS5JYwHPTg',
  attendantAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlIuEIo-lJ6CHUgNEMSAM8zbz_OVf0C8AZw7ssm0pbSkIKIPISUPYqy0w72NgXeo77F5wj3p4SCzAiwlYIuMTQDlZ-Oh4ZCXAzoLkfqoZ1g7QmKrff9NMdWKTJUmLIZQKdYDGXkFJ8uP8AM7FKQcUA5XNuXSn_OqnIuoG2EgY93yY-OqHI08fcEozBZ3X5Wdjf-oaWer_zaB50WzBU6ZfskOYo_bpvJf6adrZojR7n-M1OoL2v1bg1hA'
};

export const INITIAL_ORDERS: LaundryOrder[] = [
  {
    id: '#AQ-1081',
    customerName: 'Atty. Bea Santos',
    customerPhone: '+63 917 555 4921',
    customerInitial: 'BS',
    isVip: true,
    serviceName: 'Premium Wash + Comforter Care',
    serviceType: 'comforter',
    weightKg: 12.0,
    loadsCount: 2,
    addons: ['Ariel Sunrise Fresh', 'Downy Mystique Booster'],
    baseAmount: 360.0,
    addonAmount: 60.0,
    totalAmount: 420.0,
    paymentStatus: 'pay_later',
    status: 'pickup',
    statusLabel: 'Shelf B-04',
    stageStep: 4,
    shelfBin: 'Shelf B-04',
    intakeTime: 'Today, Oct 24 • 10:15 AM',
    targetReadyTime: '1:45 PM',
    completedTime: '1:45 PM',
    notes: 'Comforter + Bulk blanket tier. Sensitive to bleach. Double dry & pack in zip bags.',
    intakeAttendant: 'Maria A. (Stn 1)',
    smsNotification: {
      delivered: true,
      text: 'Hi Bea, your laundry is ready at Aquaspin Katipunan! Total ₱420.00. Located at Shelf B-04. Present ticket #AQ-1081 upon pickup.',
      timestamp: 'Today • 1:45 PM'
    }
  },
  {
    id: '#AQ-1082',
    customerName: 'Juan Dela Cruz',
    customerPhone: '+63 918 223 9941',
    customerInitial: 'JD',
    isVip: false,
    serviceName: 'Wash-Dry-Fold',
    serviceType: 'wash_dry_fold',
    weightKg: 7.5,
    loadsCount: 1,
    addons: ['Regular Scent', 'Fabric Softener'],
    baseAmount: 165.0,
    addonAmount: 25.0,
    totalAmount: 190.0,
    paymentStatus: 'gcash_paid',
    paymentRef: '#GC-9921-X',
    status: 'drying',
    statusLabel: 'Drying · 18m left',
    stageStep: 3,
    shelfBin: 'Dryer Bay #06',
    assignedBay: 'Dryer Bay #06',
    intakeTime: 'Today, Oct 24 • 1:10 PM',
    targetReadyTime: 'Today 2:30 PM',
    notes: 'Ateneo Dormer standard wash load.',
    intakeAttendant: 'Maria A. (Stn 1)',
    smsNotification: {
      delivered: true,
      text: 'Hi Juan! Your laundry #AQ-1082 is now drying in Dryer Bay #06. Estimated ready in 25 mins.',
      timestamp: 'Today • 1:15 PM'
    }
  },
  {
    id: '#AQ-1080',
    customerName: 'Kuya Ronald Tan',
    customerPhone: '+63 905 771 8832',
    customerInitial: 'RT',
    isVip: false,
    serviceName: 'Self-Service Wash & Dry',
    serviceType: 'self_wash',
    weightKg: 8.0,
    loadsCount: 1,
    addons: ['Attendant Assisted'],
    baseAmount: 150.0,
    addonAmount: 10.0,
    totalAmount: 160.0,
    paymentStatus: 'cash_paid',
    status: 'completed',
    statusLabel: 'Claimed · 25m ago',
    stageStep: 5,
    shelfBin: 'Claimed',
    intakeTime: 'Today, Oct 24 • 11:30 AM',
    targetReadyTime: '12:45 PM',
    completedTime: '1:00 PM',
    notes: 'Regular self-service customer. Suki stamp added.',
    intakeAttendant: 'Maria A. (Stn 1)',
    smsNotification: {
      delivered: true,
      text: 'Thanks for washing with Aquaspin, Kuya Ronald! You have earned your 10th stamp for a FREE wash!',
      timestamp: 'Today • 1:02 PM'
    }
  },
  {
    id: '#AQ-1079',
    customerName: 'Camille Reyes',
    customerPhone: '+63 922 811 4452',
    customerInitial: 'CR',
    isVip: true,
    serviceName: 'Barong Tagalog & Delicates',
    serviceType: 'wash_dry_fold',
    weightKg: 4.0,
    loadsCount: 1,
    addons: ['Cold Gentle Cycle', 'Hand Steam'],
    baseAmount: 250.0,
    addonAmount: 100.0,
    totalAmount: 350.0,
    paymentStatus: 'gcash_paid',
    paymentRef: '#GC-8812-B',
    status: 'washing',
    statusLabel: 'Washer 04 · Rinse',
    stageStep: 2,
    shelfBin: 'Washer Bay #04',
    assignedBay: 'Washer Bay #04',
    intakeTime: 'Today, Oct 24 • 12:40 PM',
    targetReadyTime: 'Today 3:30 PM',
    notes: 'Special care: delicate hand wash and gentle steam press only.',
    intakeAttendant: 'Maria A. (Stn 1)',
    smsNotification: {
      delivered: true,
      text: 'Hi Camille, your delicate Barong load is currently rinsing safely in Washer 04.',
      timestamp: 'Today • 1:00 PM'
    }
  },
  {
    id: '#AQ-1078',
    customerName: 'Mark Villanueva',
    customerPhone: '+63 928 333 7619',
    customerInitial: 'MV',
    isVip: false,
    serviceName: 'Wash-Dry-Press',
    serviceType: 'wash_dry_fold',
    weightKg: 9.0,
    loadsCount: 1,
    addons: ['Steam Press & Hanger'],
    baseAmount: 220.0,
    addonAmount: 40.0,
    totalAmount: 260.0,
    paymentStatus: 'pay_later',
    status: 'intake',
    statusLabel: 'Intake Queue',
    stageStep: 1,
    shelfBin: 'Staging Rack A-01',
    intakeTime: 'Today, Oct 24 • 1:40 PM',
    targetReadyTime: 'Today 5:00 PM',
    notes: 'Pay on pickup balance ₱260.00.',
    intakeAttendant: 'Maria A. (Stn 1)'
  },
  {
    id: '#AQ-1083',
    customerName: 'Dr. Liza Mercado',
    customerPhone: '+63 919 444 1290',
    customerInitial: 'LM',
    isVip: true,
    serviceName: 'Hospital Scrubs & Wash-Dry-Fold',
    serviceType: 'wash_dry_fold',
    weightKg: 8.5,
    loadsCount: 1,
    addons: ['Hypoallergenic Rinse', 'Sanitizer'],
    baseAmount: 252.5,
    addonAmount: 45.0,
    totalAmount: 297.5,
    paymentStatus: 'cash_paid',
    status: 'intake',
    statusLabel: 'Intake Bin B-07',
    stageStep: 1,
    shelfBin: 'Shelf B-07',
    assignedBay: 'Intake Queue',
    intakeTime: 'Today, Oct 24 • 2:05 PM',
    targetReadyTime: 'Today 5:30 PM',
    notes: 'Hospital scrub specialist. High-temp sanitization requested.',
    intakeAttendant: 'Maria A. (Stn 1)'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Atty. Bea Santos',
    initials: 'BS',
    phone: '+63 917 555 4921',
    address: 'Katipunan Ave, Quezon City',
    tier: 'VIP Gold',
    isVip: true,
    stampsCount: 8,
    totalVisits: 24,
    totalSpent: 9650,
    totalKilos: 198.5,
    favoriteScent: 'Downy Mystique + Ariel Oxy Power',
    unpaidBalance: 420.0,
    unpaidOrderId: '#AQ-1081',
    currentActiveOrderId: '#AQ-1081',
    specialInstructions: 'Sensitive to bleach. Always use hypoallergenic rinse and double dry. Comforters folded in large zip bags only.',
    recentOrders: [
      {
        orderId: '#AQ-1081',
        date: 'Today, Oct 24',
        serviceDesc: 'Comforter + Wash-Dry-Fold 12kg',
        amount: 420.0,
        paymentBadge: 'Ready (Unpaid)',
        isUnpaid: true
      },
      {
        orderId: '#AQ-1044',
        date: 'Oct 12, 2024',
        serviceDesc: 'Wash-Dry-Fold 8kg',
        amount: 280.0,
        paymentBadge: 'GCash Paid'
      },
      {
        orderId: '#AQ-1012',
        date: 'Sep 28, 2024',
        serviceDesc: 'Comforter Gentle 10kg',
        amount: 360.0,
        paymentBadge: 'Cash Paid'
      },
      {
        orderId: '#AQ-0985',
        date: 'Sep 15, 2024',
        serviceDesc: 'Wash-Dry-Fold 7kg',
        amount: 245.0,
        paymentBadge: 'GCash Paid',
        stampTag: 'Stamp #5'
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'Kuya Ronald Tan',
    initials: 'RT',
    phone: '+63 905 771 8832',
    address: 'Xavierville Ave, QC',
    tier: 'Regular',
    isVip: false,
    stampsCount: 10,
    totalVisits: 15,
    totalSpent: 2400,
    totalKilos: 120.0,
    favoriteScent: 'Ariel Sunrise Fresh',
    unpaidBalance: 0,
    specialInstructions: 'Self-service prefer Bay 03 & 04.',
    recentOrders: [
      {
        orderId: '#AQ-1080',
        date: 'Today, Oct 24',
        serviceDesc: 'Self-Service Wash & Dry 8kg',
        amount: 160.0,
        paymentBadge: 'Cash Paid'
      },
      {
        orderId: '#AQ-1030',
        date: 'Oct 10, 2024',
        serviceDesc: 'Self-Service Wash 8kg',
        amount: 80.0,
        paymentBadge: 'Cash Paid'
      }
    ]
  },
  {
    id: 'cust-3',
    name: 'Dr. Liza Mercado',
    initials: 'LM',
    phone: '+63 919 444 1290',
    address: 'Loyola Heights Medical Center, QC',
    tier: 'VIP',
    isVip: true,
    stampsCount: 5,
    totalVisits: 12,
    totalSpent: 4120,
    totalKilos: 95.0,
    favoriteScent: 'Hypoallergenic Baby Fragrance',
    unpaidBalance: 0,
    currentActiveOrderId: '#AQ-1083',
    specialInstructions: 'Medical scrubs require double hygiene sanitize wash.',
    recentOrders: [
      {
        orderId: '#AQ-1083',
        date: 'Today, Oct 24',
        serviceDesc: 'Hospital Scrubs Wash-Dry-Fold 8.5kg',
        amount: 297.5,
        paymentBadge: 'Cash Paid'
      }
    ]
  },
  {
    id: 'cust-4',
    name: 'Juan Dela Cruz',
    initials: 'JD',
    phone: '+63 918 223 9941',
    address: 'Cervini Hall, Ateneo de Manila',
    tier: 'Student',
    isVip: false,
    stampsCount: 3,
    totalVisits: 6,
    totalSpent: 1140,
    totalKilos: 48.0,
    favoriteScent: 'Downy Mystique',
    unpaidBalance: 0,
    currentActiveOrderId: '#AQ-1082',
    recentOrders: [
      {
        orderId: '#AQ-1082',
        date: 'Today, Oct 24',
        serviceDesc: 'Wash-Dry-Fold 7.5kg',
        amount: 190.0,
        paymentBadge: 'GCash Paid'
      }
    ]
  },
  {
    id: 'cust-5',
    name: 'Mark Villanueva',
    initials: 'MV',
    phone: '+63 928 333 7619',
    address: 'Barangka, Marikina / Loyola Heights',
    tier: 'Regular',
    isVip: false,
    stampsCount: 4,
    totalVisits: 5,
    totalSpent: 1300,
    totalKilos: 45.0,
    favoriteScent: 'Ariel Sunrise Fresh',
    unpaidBalance: 260.0,
    unpaidOrderId: '#AQ-1078',
    currentActiveOrderId: '#AQ-1078',
    recentOrders: [
      {
        orderId: '#AQ-1078',
        date: 'Today, Oct 24',
        serviceDesc: 'Wash-Dry-Press 9kg',
        amount: 260.0,
        paymentBadge: 'Pay on Pickup',
        isUnpaid: true
      }
    ]
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Ariel Sunrise Fresh Liquid (20L)',
    category: 'detergent',
    vendor: 'P&G Commercial B2B',
    unitPrice: 1850,
    unitLabel: 'drum',
    currentStock: 4,
    maxStock: 6,
    capacityPercent: 68,
    isLow: false,
    lastRestocked: 'Oct 18',
    reorderBatchUnits: 2
  },
  {
    id: 'inv-2',
    name: 'Downy Mystique FabCon (20L)',
    category: 'softener',
    vendor: 'P&G Commercial B2B',
    unitPrice: 2100,
    unitLabel: 'drum',
    currentStock: 1,
    maxStock: 6,
    capacityPercent: 15,
    isLow: true,
    lastRestocked: 'Oct 12',
    reorderBatchUnits: 3
  },
  {
    id: 'inv-3',
    name: 'Color-Safe Oxygen Bleach (10L)',
    category: 'bleach',
    vendor: 'ChemPro Luzon',
    unitPrice: 890,
    unitLabel: 'jug',
    currentStock: 3,
    maxStock: 5,
    capacityPercent: 55,
    isLow: false,
    lastRestocked: 'Oct 20',
    reorderBatchUnits: 2
  },
  {
    id: 'inv-4',
    name: 'Hypoallergenic Baby Detergent (10L)',
    category: 'detergent',
    vendor: 'Ecolab Philippines',
    unitPrice: 1320,
    unitLabel: 'drum',
    currentStock: 0.5,
    maxStock: 4,
    capacityPercent: 8,
    isLow: true,
    lastRestocked: 'Oct 02',
    reorderBatchUnits: 2
  },
  {
    id: 'inv-5',
    name: 'Poly Eco-Bags (12kg roll)',
    category: 'packaging',
    vendor: 'Manila Plastics Corp',
    unitPrice: 4.5,
    unitLabel: 'pcs',
    currentStock: 85,
    maxStock: 500,
    capacityPercent: 17,
    isLow: true,
    lastRestocked: 'Oct 05',
    reorderBatchUnits: 300
  },
  {
    id: 'inv-6',
    name: 'Machine Descaler Tablets',
    category: 'maintenance',
    vendor: 'LG Tech Service',
    unitPrice: 45,
    unitLabel: 'tabs',
    currentStock: 12,
    maxStock: 50,
    capacityPercent: 24,
    isLow: true,
    lastRestocked: 'Sep 29',
    reorderBatchUnits: 25
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-01',
    name: 'Maria Aquino',
    role: 'Senior Shift Lead • POS Counter',
    shift: 'Shift A: Morning (06:00 - 14:30)',
    pin: '8821',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7gLFHQ8sjLyAZKaDIYvWUV6VGfAgRn1qyo4-HUEP7_o13s6rz3wgfAwCgMzFcAouHqkpHy959dF9B7hf-p2kP74sqgO8uavxaFSyc_6ZTh_8XuEClXTqcLqEBl9J9JUQeCmcSyUNxGVdYCQmSosJtJeRqb9J7QdkUHsWYaJlEN8C8Rz7EOay2rpdvqrNmFdcmyxbdegQG9o-Qjk9nLigKDBmZS3Ce2mw19iseakqWsSHdwBYg79hYXQ',
    isActive: true,
    statusText: 'Active Now'
  },
  {
    id: 'st-02',
    name: 'Liza Mercado',
    role: 'Counter POS & Folding Lead',
    shift: 'Shift B: Afternoon (14:00 - 22:00)',
    pin: '4310',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkFG6UhkrndpmtuVABJxe6iURaqvTOi4FTFkVsiDFmXtObesUTkr5EwQHRgOPwVSEBzOT_6mD18p_bCSbRqOcFSbaSD0XA_eUeKeY2UPtty_3cvrmuI7mbQ1sIgOZFbGrlJn5bMbX-S6aMdHS21UlIOdQLcjSWAbug5Sihyyvm679PhITJzclMKjN07AI6fMt6eye9vs7upEKpwYH-9FazECw7FK5eEGJ5OTx_PW4mX2qDLEsa68-UJw',
    isActive: false,
    statusText: 'Off-Duty'
  },
  {
    id: 'st-03',
    name: 'Kuya Ronald Tan',
    role: 'Tech & Machine Bay Care',
    shift: 'Part-time Maintenance',
    pin: '1099',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClfKXq13oSdeG2mcpgZ8AvJ6_RGixtmQOa8acRc40aN-Aq50ISKlGyH6lsZVMkGS_PNP0o6F7FK_J_c3HcYMbKF5dkkQdWMedpqjTp503SSK7ysN5xsenGNNcU11A5q-d4l1R9mPPwM3TPP9jedp8sw57UkYrQuhQRPt6bYKdAiyJQ8-kKz_XywfGNsqtavRmrRG129CQEYP2Rj9_hZJhkEOEwxm-1L5aQpTXiAzncmU3W-FLqKAg0Sg',
    isActive: true,
    statusText: 'In Bay'
  },
  {
    id: 'st-04',
    name: 'Engr. Marco Santos',
    role: 'Franchisee Super Admin',
    shift: 'Store Franchisee • Full Root Control',
    pin: '9900',
    avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1WHq56NihwelwpZIHCPnK6DSg3xo8sXc_OLX6fMJJWcU81xAZOGK6Z2Niiffof7cPsfLQqeXxms7SMHjFdDrbKdePMPwymRNYU91cl73VSuploZ5e3kKSd1Fjha1HTwnQw0lynHuztdJ4GFcU8vKIJIOe4xZGG5_nmOtTMi6sJoSYCm3RiYQW_fT675VC8cPE-Jbs2SYZVO-hMpXgJY4zEE5kOXy9MiNu6N0vrwGQqTgOl8colGAmsSmsc',
    isActive: true,
    statusText: 'Master Key'
  }
];

export const INITIAL_BAYS: MachineBay[] = [
  { id: 'W-01', name: 'Washer 01', type: 'washer', status: 'running', currentOrderId: '#AQ-1077', remainingMinutes: 12, cycleStage: 'Spin' },
  { id: 'W-02', name: 'Washer 02', type: 'washer', status: 'running', currentOrderId: '#AQ-1076', remainingMinutes: 8, cycleStage: 'Rinse' },
  { id: 'W-03', name: 'Washer 03', type: 'washer', status: 'running', currentOrderId: '#AQ-1081', remainingMinutes: 20, cycleStage: 'Heavy Deep Wash' },
  { id: 'W-04', name: 'Washer 04', type: 'washer', status: 'running', currentOrderId: '#AQ-1079', remainingMinutes: 14, cycleStage: 'Delicate Rinse' },
  { id: 'W-05', name: 'Washer 05', type: 'washer', status: 'running', currentOrderId: '#AQ-1075', remainingMinutes: 24, cycleStage: 'Wash' },
  { id: 'W-06', name: 'Washer 06', type: 'washer', status: 'running', currentOrderId: '#AQ-1074', remainingMinutes: 19, cycleStage: 'Wash' },
  { id: 'W-07', name: 'Washer 07', type: 'washer', status: 'running', currentOrderId: '#AQ-1073', remainingMinutes: 5, cycleStage: 'Final Spin' },
  { id: 'W-08', name: 'Washer 08', type: 'washer', status: 'running', currentOrderId: '#AQ-1072', remainingMinutes: 28, cycleStage: 'Eco Soak' },
  { id: 'W-09', name: 'Washer 09', type: 'washer', status: 'idle' },
  { id: 'W-10', name: 'Washer 10', type: 'washer', status: 'idle' },
  { id: 'D-01', name: 'Dryer 01', type: 'dryer', status: 'running', currentOrderId: '#AQ-1071', remainingMinutes: 10 },
  { id: 'D-02', name: 'Dryer 02', type: 'dryer', status: 'running', currentOrderId: '#AQ-1070', remainingMinutes: 15 },
  { id: 'D-03', name: 'Dryer 03', type: 'dryer', status: 'running', currentOrderId: '#AQ-1069', remainingMinutes: 22 },
  { id: 'D-04', name: 'Dryer 04', type: 'dryer', status: 'running', currentOrderId: '#AQ-1068', remainingMinutes: 18 },
  { id: 'D-05', name: 'Dryer 05', type: 'dryer', status: 'running', currentOrderId: '#AQ-1067', remainingMinutes: 7 },
  { id: 'D-06', name: 'Dryer 06', type: 'dryer', status: 'running', currentOrderId: '#AQ-1082', remainingMinutes: 15 },
  { id: 'D-07', name: 'Dryer 07', type: 'dryer', status: 'running', currentOrderId: '#AQ-1066', remainingMinutes: 26 },
  { id: 'D-08', name: 'Dryer 08', type: 'dryer', status: 'cooling', remainingMinutes: 3 }
];
