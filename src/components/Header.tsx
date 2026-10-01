import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, orderId?: string) => void;
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
  onToggleRole,
  title,
  showBack = false,
  onBack
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-margin flex items-center justify-between gap-space-sm max-w-lg mx-auto">
        {/* Left Section: Back Button or Logo Lockup */}
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          {showBack ? (
            <button
              onClick={onBack || (() => onNavigate('home'))}
              aria-label="Go back"
              className="w-11 h-11 -ml-space-xs flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors rounded-full"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-space-sm cursor-pointer min-w-0"
          >
            <img
              alt="Aquaspin Laundry Station Logo"
              className="h-8 w-auto object-contain flex-shrink-0"
              src={STORE_INFO.logoUrl}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface truncate">Aquaspin</span>
                <span
                  onClick={(e) => {
                    if (onToggleRole) {
                      e.stopPropagation();
                      onToggleRole();
                    }
                  }}
                  className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded-full uppercase tracking-wider cursor-pointer transition-colors ${
                    isOwnerView
                      ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                      : 'bg-primary-fixed text-on-primary-fixed-variant'
                  }`}
                  title="Toggle Role (Staff / Owner)"
                >
                  {isOwnerView ? 'Owner' : 'Staff'}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {title || 'Katipunan Branch'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-space-sm flex-shrink-0 relative">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="flex items-center justify-center w-11 h-11 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-1 ring-surface"></span>
            </button>

            {/* Notification Popover Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-space-sm z-50">
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">Katipunan Branch Alerts</span>
                  <span className="font-label-sm text-label-sm bg-error-container text-on-error-container font-bold px-1.5 py-0.5 rounded-full">
                    2 New
                  </span>
                </div>
                <div className="py-2 space-y-2 text-body-sm">
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('order-detail', '#AQ-1081');
                    }}
                    className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-bold text-primary">#AQ-1081 Ready</span>
                      <span className="text-label-sm text-outline">12m ago</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm mt-0.5">
                      Atty. Bea Santos comforter load ready for collection.
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('settings');
                    }}
                    className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm font-bold text-error">Low Chemical Alert</span>
                      <span className="text-label-sm text-outline">45m ago</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm mt-0.5">
                      Downy Mystique tank at 15% capacity (1 Drum left).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full py-1 text-center font-label-sm text-label-sm text-primary hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>

          {/* Attendant Profile Avatar Button */}
          <button
            onClick={() => onNavigate('profile')}
            aria-label="Attendant Profile"
            className="flex items-center justify-center p-0.5 rounded-full hover:opacity-90 transition-opacity"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={STORE_INFO.attendantAvatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
