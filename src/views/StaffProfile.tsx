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
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Sub-header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="font-extrabold text-2xl text-[#131b2e] dark:text-white tracking-tight">
            Profile & Settings
          </span>
          <span className="text-xs text-[#707881] dark:text-[#bfc7d2] flex items-center gap-1.5 mt-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#006194]">storefront</span>
            Katipunan Branch #01 • Active Terminal
          </span>
        </div>
        <button
          onClick={() => showToast('Aquaspin Katipunan POS Help Center', 'help_outline')}
          aria-label="Quick Help"
          className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2235] border border-[#eaedff] dark:border-[#283044] flex items-center justify-center text-[#707881] hover:text-[#006194] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
        </button>
      </div>

      {/* User Profile Card */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <img
              alt="Maria Aquino Portrait"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#cce5ff]"
              src={STORE_INFO.attendantAvatar}
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#89f5e7] ring-2 ring-white flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#00685f] animate-pulse"></span>
            </span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-base text-[#131b2e] dark:text-white truncate">
                Maria Aquino
              </span>
              <span className="text-[10px] font-bold bg-[#eaedff] dark:bg-[#283044] text-[#707881] px-2 py-0.5 rounded-full">
                #AQ-ST-01
              </span>
            </div>
            <div className="inline-flex items-center gap-1 mt-1 bg-[#cde5ff] dark:bg-[#004f7b] text-[#004f7b] dark:text-[#cde5ff] px-2 py-0.5 rounded-full self-start">
              <span className="material-symbols-outlined text-[12px]">verified_user</span>
              <span className="text-[10px] font-bold truncate">Senior Shift Lead • POS Counter</span>
            </div>
            <div className="flex flex-col gap-0.5 mt-2 text-xs text-[#707881] dark:text-[#bfc7d2]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#00685f]">schedule</span>
                <span className="truncate">Shift A: Morning (06:00 - 14:30)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#006194]">pin_drop</span>
                <span className="truncate">Katipunan Ave., Quezon City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1 flex items-center gap-2 border-t border-[#eaedff] dark:border-[#283044]">
          <button
            onClick={() => showToast('Edit Profile dialog opened', 'badge')}
            className="flex-1 h-10 rounded-xl bg-[#f2f3ff] dark:bg-[#283044] text-[#131b2e] dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006194]">badge</span>
            <span>Edit Personal Details</span>
          </button>
          <button
            onClick={() => showToast('Attendant QR badge for clock-in displayed', 'qr_code_2')}
            className="h-10 px-3 rounded-xl bg-[#cce5ff] text-[#004b73] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#93ccff] transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">qr_code_2</span>
            <span>Staff QR</span>
          </button>
        </div>
      </div>

      {/* Quick Shift Stats (Today's Performance) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
            Shift Progress (Today)
          </span>
          <span className="text-[11px] font-bold text-[#00685f] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00685f]"></span>
            Live Sync Active
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-3 flex flex-col items-center text-center shadow-xs border border-[#eaedff] dark:border-[#283044]">
            <div className="w-8 h-8 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] mb-1">
              <span className="material-symbols-outlined text-[18px]">local_laundry_service</span>
            </div>
            <span className="text-sm font-extrabold text-[#131b2e] dark:text-white">28 loads</span>
            <span className="text-[10px] text-[#707881]">Handled</span>
          </div>

          <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-3 flex flex-col items-center text-center shadow-xs border border-[#eaedff] dark:border-[#283044]">
            <div className="w-8 h-8 rounded-full bg-[#e6f4f2] flex items-center justify-center text-[#00685f] mb-1">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
            <span className="text-sm font-extrabold text-[#131b2e] dark:text-white">₱7,200</span>
            <span className="text-[10px] text-[#707881]">Tendered</span>
          </div>

          <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-3 flex flex-col items-center text-center shadow-xs border border-[#eaedff] dark:border-[#283044]">
            <div className="w-8 h-8 rounded-full bg-[#cde5ff] flex items-center justify-center text-[#004f7b] mb-1">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </div>
            <span className="text-sm font-extrabold text-[#131b2e] dark:text-white">96%</span>
            <span className="text-[10px] text-[#707881]">On-Time</span>
          </div>
        </div>
      </div>

      {/* App Preferences & Display Settings */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881] px-1">
          Terminal Preferences
        </span>
        <div className="bg-white dark:bg-[#1a2235] rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
          {/* Appearance Mode */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#131b2e] dark:text-white">Appearance Mode</span>
              <span className="text-[10px] font-bold bg-[#cce5ff] text-[#004b73] px-2 py-0.5 rounded-full">
                {isDarkMode ? 'Dark Mode' : 'Standard Light'}
              </span>
            </div>
            <span className="text-[11px] text-[#707881]">
              Optimized for bright daylight laundry station counter visibility.
            </span>

            {/* Segmented Control */}
            <div className="grid grid-cols-3 bg-[#f2f3ff] dark:bg-[#131b2e] p-1 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => {
                  if (isDarkMode) onToggleTheme();
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                  !isDarkMode
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">light_mode</span>
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!isDarkMode) onToggleTheme();
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                  isDarkMode
                    ? 'bg-[#283044] text-[#93ccff] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">dark_mode</span>
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('System mode synced with OS', 'settings_brightness')}
                className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-[#707881] text-xs font-medium hover:text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[16px]">settings_brightness</span>
                <span>System</span>
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-[#eaedff] dark:bg-[#283044]"></div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            {/* Auto Print */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white truncate">
                    Auto-Print Thermal Receipts
                  </span>
                  <span className="text-[11px] text-[#707881] truncate">Epson TM-T82X (Thermal LAN)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAutoPrint(!autoPrint)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                  autoPrint ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoPrint ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Bluetooth Scale */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4f2] flex items-center justify-center text-[#00685f] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">scale</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#131b2e] dark:text-white truncate">
                      Bluetooth Scale Auto-Sync
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#00685f]"></span>
                  </div>
                  <span className="text-[11px] text-[#00685f] font-semibold truncate">Connected: CAS PB-150</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScaleSync(!scaleSync)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                  scaleSync ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  scaleSync ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Sound alerts */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#cde5ff] flex items-center justify-center text-[#006399] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white truncate">
                    Sound Alerts on Cycle End
                  </span>
                  <span className="text-[11px] text-[#707881] truncate">Buzzer Melody: Chime 02 (High volume)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSoundAlerts(!soundAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                  soundAlerts ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  soundAlerts ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Customer SMS Gateway */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#eaedff] dark:bg-[#283044] flex items-center justify-center text-[#006194] dark:text-[#93ccff] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sms</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white truncate">
                    Customer SMS Gateway
                  </span>
                  <span className="text-[11px] text-[#707881] truncate">Connected via Semaphore API (PH)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSmsGateway(!smsGateway)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                  smsGateway ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  smsGateway ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Terminal Access */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881] px-1">
          Security & PIN Authentication
        </span>
        <div className="bg-white dark:bg-[#1a2235] rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] overflow-hidden">
          <button
            onClick={() => showToast('Enter new 4-digit shift PIN on keypad', 'pin')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] dark:bg-[#283044] flex items-center justify-center text-[#006194] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">pin</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">Change 4-Digit Shift PIN</span>
                <span className="text-[11px] text-[#707881]">Last changed 14 days ago • Verified secure</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bfc7d2] text-[20px]">chevron_right</span>
          </button>

          <div className="w-full h-px bg-[#eaedff] dark:border-[#283044]"></div>

          <div className="p-3.5 flex items-center justify-between bg-[#f2f3ff]/40 dark:bg-[#131b2e]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] dark:bg-[#283044] flex items-center justify-center text-[#006399] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">tablet_mac</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">Active POS Terminal Session</span>
                <span className="text-[11px] text-[#707881]">Galaxy Tab S8 • Katipunan Counter 01</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#00685f] bg-[#e6f4f2] px-2 py-0.5 rounded">
              Current
            </span>
          </div>
        </div>
      </div>

      {/* Shift Reports & Escalation */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881] px-1">
          Shift Reports & Escalation
        </span>
        <div className="bg-white dark:bg-[#1a2235] rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] overflow-hidden">
          <button
            onClick={handleDownloadZReading}
            className="w-full p-3.5 flex items-center justify-between hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">Download End-of-Shift Z-Reading</span>
                <span className="text-[11px] text-[#707881]">Generate cash balance & GCash settlement</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006194] text-[20px]">file_download</span>
          </button>

          <div className="w-full h-px bg-[#eaedff] dark:bg-[#283044]"></div>

          <button
            onClick={handleHandbook}
            className="w-full p-3.5 flex items-center justify-between hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] dark:bg-[#283044] flex items-center justify-center text-[#707881] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">Staff Handbook & Standard SOP</span>
                <span className="text-[11px] text-[#707881]">Fabric care rules, machine fault recovery codes</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#bfc7d2] text-[20px]">open_in_new</span>
          </button>

          <div className="w-full h-px bg-[#eaedff] dark:bg-[#283044]"></div>

          <button
            onClick={handleContactManager}
            className="w-full p-3.5 flex items-center justify-between hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#cde5ff] flex items-center justify-center text-[#006399] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">Contact Store Manager</span>
                <span className="text-[11px] text-[#707881]">Engr. Marco Santos • Direct hotline</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006194] text-[20px]">call</span>
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2 flex flex-col gap-3">
        <button
          onClick={onSignOut}
          className="w-full h-12 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffdad6]/80 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Sign Out of Shift Terminal</span>
        </button>

        <div className="flex flex-col items-center justify-center text-center gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#00685f]">check_circle</span>
            <span className="text-xs font-semibold text-[#707881]">Aquaspin POS • v2.4.1 (Build 89)</span>
          </div>
          <span className="text-[11px] text-[#bfc7d2]">Katipunan QC Hub • Cloud Gateway Synchronized</span>
        </div>
      </div>
    </div>
  );
};
