import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  isOwnerView: boolean;
  onToggleRole?: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  isOwnerView,
  title,
  showBack = false,
  onBack
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Left Section: Back Button or Logo Lockup */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {showBack ? (
            <button
              onClick={onBack || (() => onNavigate('home'))}
              aria-label="Go back"
              className="w-10 h-10 -ml-1 flex items-center justify-center text-[#131b2e] hover:text-[#006194] transition-colors rounded-full hover:bg-[#eaedff]"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer min-w-0"
          >
            <img
              alt="Aquaspin Logo"
              className="h-8 w-auto object-contain flex-shrink-0"
              src={STORE_INFO.logoUrl}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-[#131b2e] truncate">Aquaspin</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                  isOwnerView
                    ? 'bg-[#cce5ff] text-[#004b73]'
                    : 'bg-[#cde5ff] text-[#004b74]'
                }`}>
                  {isOwnerView ? 'Owner' : 'Staff'}
                </span>
              </div>
              <span className="text-[11px] text-[#3f4850] truncate">
                {title || 'Katipunan Branch'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Live Actions & Profile */}
        <div className="flex items-center gap-1.5 flex-shrink-0 relative">
          {/* Quick Order Tracker Shortcut Pill */}
          <button
            onClick={() => onNavigate('tracker')}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'tracker'
                ? 'bg-[#008378] text-white'
                : 'bg-[#eaedff] text-[#006194] hover:bg-[#dae2fd]'
            }`}
            title="Open Customer Public Order Tracker"
          >
            <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
            <span>Guest Tracker</span>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] flex items-center justify-center transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
            </button>

            {/* Notification Popover Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-[#dae2fd] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                  <span className="text-xs font-bold text-[#131b2e]">Katipunan Branch Alerts</span>
                  <span className="text-[10px] bg-[#ffdad6] text-[#93000a] font-bold px-1.5 py-0.5 rounded">2 New</span>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div
                    onClick={() => {
                      onNavigate('order-detail');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-[#131b2e] flex items-center justify-between">
                      <span>#AQ-1081 Ready for Pickup</span>
                      <span className="text-[10px] text-[#707881]">1:45 PM</span>
                    </div>
                    <p className="text-[11px] text-[#3f4850] mt-0.5">Atty. Bea Santos comforter load packed in Shelf B-04.</p>
                  </div>
                  <div
                    onClick={() => {
                      onNavigate('settings');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-[#fffbeb] hover:bg-[#fef3c7] cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-[#b45309] flex items-center justify-between">
                      <span>Low Stock Alert</span>
                      <span className="text-[10px] text-[#92400e]">Today</span>
                    </div>
                    <p className="text-[11px] text-[#92400e] mt-0.5">Downy Mystique & Eco-Bags are below buffer threshold.</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#eaedff] text-center">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] font-bold text-[#006194] hover:underline"
                  >
                    Close Alerts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Attendant Profile Picture Button */}
          <button
            onClick={() => onNavigate('profile')}
            aria-label="Attendant Profile"
            className="flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#006194]/30 transition-all"
            title="Maria Aquino Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#006194]/20"
              src={STORE_INFO.attendantAvatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
