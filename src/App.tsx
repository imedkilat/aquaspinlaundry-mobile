import { useState, useEffect } from 'react';
import { LaundryOrder, Customer, InventoryItem, StaffMember } from './types';
import {
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_INVENTORY,
  INITIAL_STAFF,
  STORE_INFO
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ReceiptModal } from './components/ReceiptModal';
import { PinPadModal } from './components/PinPadModal';
import { Toast } from './components/Toast';

// Views
import { StationHome } from './views/StationHome';
import { CustomerTracker } from './views/CustomerTracker';
import { NewOrderIntake } from './views/NewOrderIntake';
import { OrderDetail } from './views/OrderDetail';
import { CustomerDirectory } from './views/CustomerDirectory';
import { CustomerDetail } from './views/CustomerDetail';
import { OrdersLedger } from './views/OrdersLedger';
import { OwnerAnalytics } from './views/OwnerAnalytics';
import { OperationsSettings } from './views/OperationsSettings';
import { StaffProfile } from './views/StaffProfile';
import { LoginPortal } from './views/LoginPortal';

export default function App() {
  // App state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [orders, setOrders] = useState<LaundryOrder[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);

  // Active selections
  const [selectedOrderId, setSelectedOrderId] = useState<string>('#AQ-1081');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('cust-1');

  // Modes
  const [isOwnerView, setIsOwnerView] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Modals & Notifications
  const [receiptOrder, setReceiptOrder] = useState<LaundryOrder | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [pinTargetStaff, setPinTargetStaff] = useState<StaffMember | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: 'check_circle',
    visible: false
  });

  const showToast = (message: string, icon: string = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  // Sync dark mode class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handlers
  const handleNavigate = (tab: string, orderId?: string) => {
    if (orderId) {
      setSelectedOrderId(orderId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomerId(customer.id);
    setCurrentTab('customer-detail');
  };

  const handleCollectOrderPayment = (targetOrder: LaundryOrder) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === targetOrder.id
          ? { ...o, paymentStatus: 'cash_paid' }
          : o
      )
    );
    // Also update customer balance if matched
    setCustomers((prev) =>
      prev.map((c) =>
        c.name === targetOrder.customerName
          ? { ...c, unpaidBalance: Math.max(0, c.unpaidBalance - targetOrder.totalAmount) }
          : c
      )
    );
    showToast(`Payment of ₱${targetOrder.totalAmount.toFixed(2)} collected for ${targetOrder.id}!`, 'payments');
  };

  const handleAdvanceStage = (targetOrder: LaundryOrder) => {
    const nextStep = Math.min(5, targetOrder.stageStep + 1);
    let nextStatus = targetOrder.status;
    let nextLabel = targetOrder.statusLabel;

    if (nextStep === 2) {
      nextStatus = 'washing';
      nextLabel = 'Washer 02 · Washing';
    } else if (nextStep === 3) {
      nextStatus = 'drying';
      nextLabel = 'Dryer 04 · Drying';
    } else if (nextStep === 4) {
      nextStatus = 'pickup';
      nextLabel = 'Shelf B-07 (Ready)';
    } else if (nextStep === 5) {
      nextStatus = 'completed';
      nextLabel = 'Completed & Claimed';
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === targetOrder.id
          ? {
              ...o,
              stageStep: nextStep,
              status: nextStatus,
              statusLabel: nextLabel,
              completedTime: nextStep === 5 ? 'Just now' : o.completedTime
            }
          : o
      )
    );
    showToast(`Order ${targetOrder.id} advanced to ${nextLabel}!`, 'fast_forward');
  };

  const handleSettleCustomerBalance = (cust: Customer, method: 'gcash' | 'cash') => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, unpaidBalance: 0 } : c))
    );
    setOrders((prev) =>
      prev.map((o) =>
        o.customerName === cust.name && o.paymentStatus === 'pay_later'
          ? { ...o, paymentStatus: method === 'gcash' ? 'gcash_paid' : 'cash_paid' }
          : o
      )
    );
    showToast(`Unpaid balance of ₱${cust.unpaidBalance.toFixed(2)} settled via ${method.toUpperCase()}!`, 'check_circle');
  };

  const handleRedeemReward = (cust: Customer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, stampsCount: 0 } : c))
    );
    showToast(`Free 7kg Wash & Dry voucher issued to ${cust.name}!`, 'redeem');
  };

  const handleSaveNewOrder = (newOrder: LaundryOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    // If customer exists, update visit count and add stamps
    setCustomers((prev) =>
      prev.map((c) =>
        c.name.toLowerCase() === newOrder.customerName.toLowerCase()
          ? {
              ...c,
              totalVisits: c.totalVisits + 1,
              totalSpent: c.totalSpent + newOrder.totalAmount,
              stampsCount: Math.min(10, c.stampsCount + 1),
              totalKilos: c.totalKilos + newOrder.weightKg,
              unpaidBalance:
                newOrder.paymentStatus === 'pay_later'
                  ? c.unpaidBalance + newOrder.totalAmount
                  : c.unpaidBalance
            }
          : c
      )
    );
    setSelectedOrderId(newOrder.id);
  };

  const handleUpdateOrder = (updated: LaundryOrder) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const handleOrderStock = (item: InventoryItem) => {
    setInventory((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              currentStock: i.currentStock + item.reorderBatchUnits,
              capacityPercent: Math.min(100, i.capacityPercent + 40),
              isLow: false,
              lastRestocked: 'Today'
            }
          : i
      )
    );
    showToast(`Restock order placed for ${item.reorderBatchUnits} ${item.unitLabel}s of ${item.name}`, 'add_shopping_cart');
  };

  const handleRestockAll = () => {
    setInventory((prev) =>
      prev.map((i) => ({
        ...i,
        currentStock: i.maxStock,
        capacityPercent: 95,
        isLow: false,
        lastRestocked: 'Today'
      }))
    );
    showToast('Batch PO issued: All chemical tanks & packaging replenished!', 'local_shipping');
  };

  // Find currently active order and customer
  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];
  const currentCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  // Screen header title logic
  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'orders':
        return 'Orders Ledger';
      case 'new-order':
        return 'New Order Intake';
      case 'order-detail':
        return `Order ${currentOrder.id}`;
      case 'customers':
        return 'Customers Directory';
      case 'customer-detail':
        return currentCustomer.name;
      case 'dashboard':
        return 'Owner Analytics';
      case 'settings':
        return 'Operations & Settings';
      case 'profile':
        return 'Staff Profile';
      case 'tracker':
        return 'Customer Order Tracker';
      default:
        return 'Katipunan Branch';
    }
  };

  const isChildScreen =
    currentTab === 'order-detail' ||
    currentTab === 'customer-detail' ||
    currentTab === 'new-order' ||
    currentTab === 'tracker';

  const handleBack = () => {
    if (currentTab === 'order-detail') {
      setCurrentTab('orders');
    } else if (currentTab === 'customer-detail') {
      setCurrentTab('customers');
    } else {
      setCurrentTab('home');
    }
  };

  // Login view standalone
  if (currentTab === 'login') {
    return (
      <div className={`min-h-screen bg-[#faf8ff] dark:bg-[#0b1120] text-[#131b2e] dark:text-white font-sans ${isDarkMode ? 'dark' : ''}`}>
        <LoginPortal
          onSuccessLogin={(role) => {
            setIsOwnerView(role === 'owner');
            setCurrentTab(role === 'owner' ? 'dashboard' : 'home');
          }}
          onOpenPinPad={() => {
            setPinTargetStaff(staff[0]);
            setIsPinModalOpen(true);
          }}
          onGoToTracker={() => {
            setSelectedOrderId('#AQ-1081');
            setCurrentTab('tracker');
          }}
          showToast={showToast}
        />
        <PinPadModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onSuccess={(pin) => {
            setIsPinModalOpen(false);
            showToast(`Staff PIN verified: Starting shift session for ${pinTargetStaff?.name || 'Maria'}!`, 'check_circle');
            setCurrentTab('home');
          }}
          staffName={pinTargetStaff?.name || 'Maria Aquino'}
        />
        <Toast
          message={toast.message}
          icon={toast.icon}
          visible={toast.visible}
          onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-surface text-on-surface font-body-md text-body-md flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Universal Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        isOwnerView={isOwnerView}
        onToggleRole={() => setIsOwnerView(!isOwnerView)}
        title={getHeaderTitle()}
        showBack={isChildScreen}
        onBack={handleBack}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full pt-16">
        {currentTab === 'home' && (
          <StationHome
            orders={orders}
            onNavigate={handleNavigate}
            onCollectPayment={handleCollectOrderPayment}
            onOpenReceipt={(order) => {
              setReceiptOrder(order);
              setIsReceiptOpen(true);
            }}
            onSendSms={(order) => {
              showToast(`SMS sent to ${order.customerName} (${order.customerPhone})`, 'sms');
            }}
            isOwnerView={isOwnerView}
            onToggleRole={() => setIsOwnerView(!isOwnerView)}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
        )}

        {currentTab === 'orders' && (
          <OrdersLedger
            orders={orders}
            onNavigate={handleNavigate}
            onOpenReceipt={(order) => {
              setReceiptOrder(order);
              setIsReceiptOpen(true);
            }}
            onCollectPayment={handleCollectOrderPayment}
            onAdvanceStage={handleAdvanceStage}
            showToast={showToast}
          />
        )}

        {currentTab === 'new-order' && (
          <NewOrderIntake
            customers={customers}
            onSaveOrder={handleSaveNewOrder}
            onHoldBasket={() => setCurrentTab('orders')}
            onOpenReceipt={(order) => {
              setReceiptOrder(order);
              setIsReceiptOpen(true);
            }}
            showToast={showToast}
          />
        )}

        {currentTab === 'order-detail' && (
          <OrderDetail
            order={currentOrder}
            onUpdateOrder={handleUpdateOrder}
            onOpenReceipt={(order) => {
              setReceiptOrder(order);
              setIsReceiptOpen(true);
            }}
            onNavigateToCustomer={(custName) => {
              const matched = customers.find(
                (c) => c.name.toLowerCase() === custName.toLowerCase()
              );
              if (matched) {
                setSelectedCustomerId(matched.id);
                setCurrentTab('customer-detail');
              } else {
                setCurrentTab('customers');
              }
            }}
            onOpenTracker={() => setCurrentTab('tracker')}
            showToast={showToast}
          />
        )}

        {currentTab === 'customers' && (
          <CustomerDirectory
            customers={customers}
            onSelectCustomer={handleSelectCustomer}
            onAddCustomer={() => {
              setCurrentTab('new-order');
              showToast('Ready for new customer drop-off intake', 'person_add');
            }}
            onCollectBalance={(cust) => handleSettleCustomerBalance(cust, 'cash')}
            onRedeemReward={handleRedeemReward}
            showToast={showToast}
          />
        )}

        {currentTab === 'customer-detail' && (
          <CustomerDetail
            customer={currentCustomer}
            onBack={() => setCurrentTab('customers')}
            onStartOrderForCustomer={(cust) => {
              setCurrentTab('new-order');
              showToast(`Preparing new laundry batch for ${cust.name}`, 'shopping_basket');
            }}
            onSettleBalance={handleSettleCustomerBalance}
            showToast={showToast}
          />
        )}

        {currentTab === 'dashboard' && (
          <OwnerAnalytics
            onViewUnsettled={() => setCurrentTab('orders')}
            showToast={showToast}
          />
        )}

        {currentTab === 'settings' && (
          <OperationsSettings
            inventory={inventory}
            staff={staff}
            onOrderStock={handleOrderStock}
            onRestockAll={handleRestockAll}
            onOpenPinModal={(member) => {
              setPinTargetStaff(member);
              setIsPinModalOpen(true);
            }}
            showToast={showToast}
          />
        )}

        {currentTab === 'profile' && (
          <StaffProfile
            onSignOut={() => setCurrentTab('login')}
            onNavigateToSettings={() => setCurrentTab('settings')}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            showToast={showToast}
          />
        )}

        {currentTab === 'tracker' && (
          <CustomerTracker
            order={currentOrder}
            onBackToPos={() => setCurrentTab('home')}
            onSettlePayment={(method) => {
              handleCollectOrderPayment(currentOrder);
            }}
            showToast={showToast}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      {currentTab !== 'tracker' && currentTab !== 'login' && (
        <BottomNav
          currentTab={currentTab}
          onNavigate={handleNavigate}
          unsettledCount={orders.filter((o) => o.paymentStatus === 'pay_later').length}
        />
      )}

      {/* Thermal 80mm Receipt / Bag Tag Modal */}
      <ReceiptModal
        order={receiptOrder}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        onPrintSuccess={() => {
          showToast(`Printed thermal claim tag for ${receiptOrder?.id || 'order'}!`, 'print');
        }}
      />

      {/* Staff 4-Digit PIN Keypad Modal */}
      <PinPadModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={(pin) => {
          setIsPinModalOpen(false);
          showToast(`Staff PIN verified: Shift authenticated for ${pinTargetStaff?.name || 'attendant'}!`, 'check_circle');
        }}
        staffName={pinTargetStaff?.name || 'Attendant'}
      />

      {/* Floating System Toast Notifications */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
