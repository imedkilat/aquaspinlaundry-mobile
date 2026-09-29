import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';

interface LoginPortalProps {
  onSuccessLogin: (role: 'staff' | 'owner') => void;
  onOpenPinPad: () => void;
  onGoToTracker: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({
  onSuccessLogin,
  onOpenPinPad,
  onGoToTracker,
  showToast
}) => {
  const [role, setRole] = useState<'staff' | 'owner'>('staff');
  const [identifier, setIdentifier] = useState('maria.staff@aquaspin.ph');
  const [password, setPassword] = useState('••••••••••••');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (newRole: 'staff' | 'owner') => {
    setRole(newRole);
    if (newRole === 'staff') {
      setIdentifier('maria.staff@aquaspin.ph');
    } else {
      setIdentifier('branch01.manager@aquaspin.ph');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    showToast('Authenticating POS terminal credentials...', 'sync');

    setTimeout(() => {
      setLoading(false);
      onSuccessLogin(role);
      showToast(`Access Granted: Katipunan POS logged in as ${role === 'owner' ? 'Owner / Manager' : 'Staff'}!`, 'check_circle');
    }, 700);
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center px-4 py-8 max-w-md mx-auto">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#1a2235] shadow-md flex items-center justify-center p-2.5 transition-transform hover:scale-105 duration-300 border border-[#eaedff] dark:border-[#283044]">
            <img
              alt="Aquaspin Logo"
              className="w-full h-full object-contain"
              src={STORE_INFO.logoUrl}
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00685f] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[14px]">local_laundry_service</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cce5ff] text-[#004b73] mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006194] animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Terminal Online</span>
        </div>

        <h1 className="font-extrabold text-2xl text-[#131b2e] dark:text-white tracking-tight">
          Aquaspin Laundry
        </h1>
        <p className="text-xs text-[#707881] dark:text-[#bfc7d2] mt-0.5">
          Branch POS & Operations Portal
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full bg-white dark:bg-[#1a2235] rounded-3xl shadow-sm border border-[#eaedff] dark:border-[#283044] p-6 mb-4">
        {/* Role Toggle Tabs */}
        <div className="bg-[#f2f3ff] dark:bg-[#131b2e] p-1 rounded-xl flex items-center mb-5">
          <button
            type="button"
            onClick={() => handleRoleChange('staff')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'staff'
                ? 'bg-white dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] shadow-xs'
                : 'text-[#707881] dark:text-[#bfc7d2] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>Staff Access</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('owner')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'owner'
                ? 'bg-white dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] shadow-xs'
                : 'text-[#707881] dark:text-[#bfc7d2] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>Owner / Manager</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#131b2e] dark:text-white">
                {role === 'staff' ? 'Staff Email or ID' : 'Owner / Manager Portal Email'}
              </label>
              <span className="text-[10px] font-bold text-[#006194]">Required</span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#707881] text-[20px] pointer-events-none">
                alternate_email
              </span>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white text-xs font-semibold pl-11 pr-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#006194] border border-[#eaedff] dark:border-[#283044]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#131b2e] dark:text-white">
                Password or Passcode
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to admin@aquaspin.ph', 'mail')}
                className="text-[10px] font-bold text-[#006194] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#707881] text-[20px] pointer-events-none">
                lock
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f2f3ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-white text-xs font-semibold pl-11 pr-11 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#006194] border border-[#eaedff] dark:border-[#283044]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 text-[#707881] hover:text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPass ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember session */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#707881]">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 rounded text-[#006194] focus:ring-0"
              />
              <span>Remember terminal session</span>
            </label>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#00685f]">
              <span className="material-symbols-outlined text-[14px]">shield</span> POS Trusted
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                <span>Authenticating Terminal...</span>
              </>
            ) : (
              <>
                <span>Sign in to Terminal</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* PIN option */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-px bg-[#eaedff] dark:bg-[#283044]"></div>
          <span className="absolute bg-white dark:bg-[#1a2235] px-3 text-[10px] font-bold text-[#707881] uppercase tracking-wider">
            or rapid shift
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenPinPad}
          className="w-full h-11 bg-[#f2f3ff] dark:bg-[#131b2e] hover:bg-[#eaedff] text-[#006194] dark:text-[#93ccff] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">dialpad</span>
          <span>Sign in with 4-Digit Staff PIN</span>
        </button>

        <div className="mt-4 pt-3 flex items-center justify-between text-[#707881] text-[11px] border-t border-[#eaedff] dark:border-[#283044]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006399]"></span> Morning Shift Active
          </span>
          <span>Bay 1-12 Operational</span>
        </div>
      </div>

      {/* Customer Order Redirection Banner */}
      <div className="w-full bg-[#eaedff] dark:bg-[#283044] rounded-2xl p-4 shadow-sm flex items-start gap-3 mb-6 border border-[#dae2fd] dark:border-[#283044]">
        <div className="w-9 h-9 rounded-xl bg-[#cde5ff] text-[#004b74] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
        </div>
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-[#131b2e] dark:text-white">Staff & Owner Access Only</h2>
          <p className="text-[11px] text-[#3f4850] dark:text-[#bfc7d2] leading-relaxed">
            Looking for your laundry status? Customers track orders anonymously without login by scanning the QR code on your printed counter receipt or SMS link.
          </p>
          <div className="pt-1">
            <button
              onClick={onGoToTracker}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#006194] dark:text-[#93ccff] hover:underline"
            >
              <span>Track via Receipt Ticket ID</span>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col items-center text-center gap-1 text-[11px] text-[#707881]">
        <div className="flex items-center gap-1 font-semibold text-[#131b2e] dark:text-white">
          <span className="material-symbols-outlined text-[14px]">storefront</span>
          <span>{STORE_INFO.branch}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <span>App v2.4.1 Build 89</span>
          <span>•</span>
          <span>Bay Network: Encrypted (WPA3)</span>
        </div>
        <div className="text-[10px] text-[#707881]">
          © 2025 Aquaspin Systems Inc. Philippines
        </div>
      </div>
    </div>
  );
};
