import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  unsettledCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  unsettledCount = 6
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 bg-white/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-[#eaedff]">
      <div className="flex justify-between items-center h-16 px-2 max-w-lg mx-auto">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            currentTab === 'home' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#006194]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">local_laundry_service</span>
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => onNavigate('orders')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors relative ${
            currentTab === 'orders' || currentTab === 'order-detail' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#006194]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          <span className="text-[10px] mt-0.5 font-bold">Orders</span>
          {unsettledCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
          )}
        </button>

        {/* Floating Center Action: New Order Intake */}
        <div className="flex items-center justify-center -mt-6">
          <button
            onClick={() => onNavigate('new-order')}
            aria-label="New Order Intake"
            className="flex flex-col items-center justify-center w-13 h-13 rounded-full bg-[#006194] text-white shadow-[0_8px_20px_-4px_rgba(0,97,148,0.45)] transition-transform active:scale-95 hover:bg-[#007bb9] p-2"
          >
            <span className="material-symbols-outlined text-[26px]">add</span>
          </button>
        </div>

        {/* Customers */}
        <button
          onClick={() => onNavigate('customers')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            currentTab === 'customers' || currentTab === 'customer-detail' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#006194]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">group</span>
          <span className="text-[10px] mt-0.5 font-bold">Customers</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            currentTab === 'dashboard' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#006194]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">monitoring</span>
          <span className="text-[10px] mt-0.5 font-bold">Dashboard</span>
        </button>

        {/* Profile / Operations */}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center min-w-[48px] h-12 transition-colors ${
            currentTab === 'profile' || currentTab === 'settings' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#006194]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">badge</span>
          <span className="text-[10px] mt-0.5 font-bold">Profile</span>
        </button>
      </div>
    </nav>
  );
};
