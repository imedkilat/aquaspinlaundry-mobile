import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';

interface StaffProfileProps {
  onSignOut: () => void;
  onNavigateToSettings: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const StaffProfile: React.FC<StaffProfileProps> = ({
  onSignOut,
  onNavigateToSettings,
  isDarkMode,
  onToggleTheme,
  showToast
}) => {
  const [autoPrint, setAutoPrint] = useState(true);
  const [scaleSync, setScaleSync] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [smsGateway, setSmsGateway] = useState(true);

  const handleDownloadZReading = () => {
    showToast('End-of-Shift Z-Reading generated (₱7,200 Cash / ₱5,250 GCash)', 'file_download');
  };

  const handleHandbook = () => {
    showToast('Opening Aquaspin Attendant Handbook & SOP...', 'menu_book');
  };

  const handleContactManager = () => {
    showToast('Calling Store Manager Engr. Marco Santos (+63 917 888 2782)...', 'call');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-space-md">
        {/* Page Sub-Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
              Profile & Settings
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-[15px] text-primary">storefront</span>
              Katipunan Branch #01 • Active Terminal
            </span>
          </div>
          <button
            onClick={() => showToast('Aquaspin Katipunan POS Help Center', 'help_outline')}
            aria-label="Quick Help"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
        </div>

        {/* User Profile Card */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-[0px_4px_16px_-2px_rgba(2,132,199,0.06)] flex flex-col gap-space-md relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-primary-fixed/30 pointer-events-none blur-xl"></div>
          <div className="flex items-start gap-space-md z-10">
            <div className="relative flex-shrink-0">
              <img
                alt="Maria Aquino Portrait"
                className="w-16 h-16 rounded-xl object-cover shadow-sm ring-2 ring-primary-fixed"
                src={STORE_INFO.attendantAvatar}
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-tertiary-fixed ring-2 ring-surface-container-lowest flex items-center justify-center" title="Online & Ready">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              </span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">Maria Aquino</span>
                <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold">#AQ-ST-01</span>
              </div>
              <div className="inline-flex items-center gap-1 mt-1 bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full self-start">
                <span className="material-symbols-outlined text-[13px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <span className="font-label-sm text-label-sm font-semibold truncate">Senior Shift Lead • POS Counter</span>
              </div>
              <div className="flex flex-col gap-0.5 mt-2">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">schedule</span>
                  <span className="truncate">Shift A: Morning (06:00 - 14:30)</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[14px] text-secondary">pin_drop</span>
                  <span className="truncate">Katipunan Ave., Quezon City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2 z-10 flex items-center gap-space-sm">
            <button
              onClick={() => showToast('Edit Profile dialog opened', 'badge')}
              className="flex-1 h-10 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px] text-primary">badge</span>
              <span>Edit Personal Details</span>
            </button>
            <button
              onClick={() => showToast('Attendant QR badge for clock-in displayed', 'qr_code_2')}
              className="h-10 px-3 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold flex items-center justify-center gap-1 transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px]">qr_code_2</span>
              <span>Staff QR</span>
            </button>
          </div>
        </div>

        {/* Quick Shift Stats (Today's Performance) */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between px-0.5">
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant">Shift Progress (Today)</span>
            <span className="font-label-sm text-label-sm font-semibold text-tertiary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              Live Sync Active
            </span>
          </div>
          <div className="grid grid-cols-3 gap-space-sm">
            {/* Stat 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col items-center text-center shadow-[0px_4px_16px_-2px_rgba(2,132,199,0.06)]">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">local_laundry_service</span>
              </div>
              <span className="font-currency-body text-currency-body text-on-surface font-bold">28 loads</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Handled</span>
            </div>
            {/* Stat 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col items-center text-center shadow-[0px_4px_16px_-2px_rgba(2,132,199,0.06)]">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-1">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <span className="font-currency-body text-currency-body text-on-surface font-bold leading-tight">₱7,200</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tendered</span>
            </div>
            {/* Stat 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col items-center text-center shadow-[0px_4px_16px_-2px_rgba(2,132,199,0.06)]">
              <div className="w-8 h-8 rounded-full bg-primary-fixed-dim/40 flex items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">speed</span>
              </div>
              <span className="font-currency-body text-currency-body text-on-surface font-bold">96%</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">On-Time</span>
            </div>
          </div>
        </div>

        {/* App Preferences & Display Settings */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant px-0.5">Terminal Preferences</span>
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0px_4px_16px_-2px_rgba(2,132,199,0.06)] flex flex-col gap-space-md">
            {/* Appearance Mode */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md font-semibold text-on-surface">Appearance Mode</span>
                <span className="font-label-sm text-label-sm bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-bold">
                  {isDarkMode ? 'Dark Mode' : 'Standard Light'}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Optimized for bright daylight laundry station counter visibility.</span>
              {/* Segmented Control */}
              <div className="grid grid-cols-3 bg-surface-container p-1 rounded-xl mt-1 gap-1" id="theme-selector">
                <button
                  type="button"
                  onClick={() => {
                    if (isDarkMode) onToggleTheme();
                  }}
                  className={`theme-btn flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg font-label-md text-label-md transition-all ${
                    !isDarkMode
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">light_mode</span>
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isDarkMode) onToggleTheme();
                  }}
                  className={`theme-btn flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg font-label-md text-label-md transition-all ${
                    isDarkMode
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('System theme follows OS settings', 'settings_brightness')}
                  className="theme-btn flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">settings_brightness</span>
                  <span>System</span>
                </button>
              </div>
            </div>
            <div className="w-full h-px bg-surface-container"></div>
            {/* Terminal Hardware Toggles */}
            <div className="flex flex-col gap-space-md">
              {/* Auto-print receipts */}
              <div className="flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Auto-Print Thermal Receipts</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Epson TM-T82X (Thermal LAN)</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    checked={autoPrint}
                    onChange={(e) => setAutoPrint(e.target.checked)}
                    className="sr-only peer toggle-input"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              {/* Bluetooth Scale Auto-Sync */}
              <div className="flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">scale</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Bluetooth Scale Auto-Sync</span>
                      <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span>
                    </div>
                    <span className="font-body-sm text-body-sm text-tertiary font-semibold truncate">Connected: CAS PB-150</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    checked={scaleSync}
                    onChange={(e) => setScaleSync(e.target.checked)}
                    className="sr-only peer toggle-input"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              {/* Sound Alerts on Wash Finish */}
              <div className="flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-secondary-fixed-dim/40 flex items-center justify-center text-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Sound Alerts on Cycle End</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Buzzer Melody: Chime 02 (High volume)</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    checked={soundAlerts}
                    onChange={(e) => setSoundAlerts(e.target.checked)}
                    className="sr-only peer toggle-input"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              {/* SMS Notification Gateway */}
              <div className="flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">sms</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Customer SMS Gateway</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Connected via Semaphore API (PH)</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    checked={smsGateway}
                    onChange={(e) => setSmsGateway(e.target.checked)}
                    className="sr-only peer toggle-input"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Terminal Access */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant px-0.5">Security & PIN Authentication</span>
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_16px_-2px_rgba(2,132,199,0.06)] overflow-hidden">
            <button
              onClick={() => showToast('Enter new 4-digit shift PIN on keypad', 'pin')}
              className="w-full p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors text-left"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">pin</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Change 4-Digit Shift PIN</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Last changed 14 days ago • Verified secure</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">chevron_right</span>
            </button>
            <div className="w-full h-px bg-surface-container"></div>
            <button
              onClick={() => showToast('2FA settings configured via Katipunan Hub SMS', 'phonelink_lock')}
              className="w-full p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors text-left"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">phonelink_lock</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Two-Factor Authentication</span>
                    <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.2 rounded-full font-bold">Active</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">SMS OTP to +63 917 *** 4492</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">chevron_right</span>
            </button>
            <div className="w-full h-px bg-surface-container"></div>
            <div className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-low/40">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">tablet_mac</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Active POS Terminal Session</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Galaxy Tab S8 • Katipunan Counter 01</span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary bg-surface-container-lowest px-2 py-1 rounded font-bold shadow-xs">Current</span>
            </div>
          </div>
        </div>

        {/* Reports, Guidelines & Escalation */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant px-0.5">Shift Reports & Escalation</span>
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_16px_-2px_rgba(2,132,199,0.06)] overflow-hidden">
            {/* Cash Balancing Z-Reading */}
            <button
              onClick={handleDownloadZReading}
              className="w-full p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors text-left group"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Download End-of-Shift Z-Reading</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Generate cash balance & GCash settlement report</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">file_download</span>
            </button>
            <div className="w-full h-px bg-surface-container"></div>
            {/* SOP Handbook */}
            <button
              onClick={handleHandbook}
              className="w-full p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors text-left group"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Staff Handbook & Standard SOP</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Fabric care rules, machine fault recovery codes</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">open_in_new</span>
            </button>
            <div className="w-full h-px bg-surface-container"></div>
            {/* Contact Manager */}
            <button
              onClick={handleContactManager}
              className="w-full p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors text-left group"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Contact Store Manager</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Engr. Marco Santos • Direct hotline</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">call</span>
            </button>
            <div className="w-full h-px bg-surface-container"></div>
            {/* Inventory & Operations */}
            <button
              onClick={onNavigateToSettings}
              className="w-full p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors text-left group"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-body-md font-semibold text-on-surface truncate">Branch Inventory & Operations</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Stock monitoring, staff accounts & pricing tariff</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Sign Out & Build Info */}
        <div className="flex flex-col gap-space-md pt-2 pb-space-sm">
          <button
            onClick={onSignOut}
            className="w-full h-12 rounded-xl bg-error-container text-on-error-container hover:bg-error/20 font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Sign Out of Shift Terminal</span>
          </button>
          <div className="flex flex-col items-center justify-center text-center gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-tertiary">check_circle</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">Aquaspin POS • v2.4.1 (Build 89)</span>
            </div>
            <span className="font-body-sm text-body-sm text-outline">Katipunan QC Hub • Cloud Gateway Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
};
