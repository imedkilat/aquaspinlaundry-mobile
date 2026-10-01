import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  unsettledCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  unsettledCount = 0
}) => {
  const isOrdersActive = currentTab === 'orders' || currentTab === 'order-detail';
  const isCustomersActive = currentTab === 'customers' || currentTab === 'customer-detail';
  const isProfileActive = currentTab === 'profile' || currentTab === 'settings';

  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-outline-variant/20"
      data-active-classes="text-primary font-label-md"
    >
      <div className="flex justify-between items-center h-16 px-space-xs max-w-lg mx-auto">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            currentTab === 'home'
              ? 'text-primary font-label-md'
              : 'text-on-surface-variant hover:text-primary font-label-sm'
          }`}
          type="button"
          aria-label="Home"
        >
          <span className="material-symbols-outlined text-[22px]">local_laundry_service</span>
          <span className="text-label-sm mt-0.5">Home</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => onNavigate('orders')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors relative ${
            isOrdersActive
              ? 'text-primary font-label-md'
              : 'text-on-surface-variant hover:text-primary font-label-sm'
          }`}
          type="button"
          aria-label="Orders Ledger"
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            {unsettledCount > 0 && (
              <span className="absolute -top-0.5 -right-1.5 w-2 h-2 rounded-full bg-error ring-1 ring-surface"></span>
            )}
          </div>
          <span className="text-label-sm mt-0.5">Orders</span>
        </button>

        {/* Center Intake Button */}
        <div className="flex items-center justify-center -mt-5">
          <button
            onClick={() => onNavigate('new-order')}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-primary text-on-primary shadow-[0_8px_16px_-4px_rgba(0,97,148,0.4)] transition-transform active:scale-95 hover:bg-primary-container"
            type="button"
            aria-label="New Order Intake"
          >
            <span className="material-symbols-outlined text-[24px]">add</span>
          </button>
        </div>

        {/* Customers */}
        <button
          onClick={() => onNavigate('customers')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            isCustomersActive
              ? 'text-primary font-label-md'
              : 'text-on-surface-variant hover:text-primary font-label-sm'
          }`}
          type="button"
          aria-label="Customer Directory"
        >
          <span className="material-symbols-outlined text-[22px]">group</span>
          <span className="text-label-sm mt-0.5">Customers</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            currentTab === 'dashboard'
              ? 'text-primary font-label-md'
              : 'text-on-surface-variant hover:text-primary font-label-sm'
          }`}
          type="button"
          aria-label="Owner Dashboard"
        >
          <span className="material-symbols-outlined text-[22px]">monitoring</span>
          <span className="text-label-sm mt-0.5">Dashboard</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            isProfileActive
              ? 'text-primary font-label-md'
              : 'text-on-surface-variant hover:text-primary font-label-sm'
          }`}
          type="button"
          aria-label="Staff Profile"
        >
          <span className="material-symbols-outlined text-[22px]">badge</span>
          <span className="text-label-sm mt-0.5">Profile</span>
        </button>
      </div>
    </nav>
  );
};
