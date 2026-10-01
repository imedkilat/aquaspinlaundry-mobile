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
    }, 600);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface font-body-md text-body-md text-on-surface">
      {/* Top Bar */}
      <header className="w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/40">
        <div className="h-16 px-margin flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-space-sm min-w-0">
            <img
              alt="Aquaspin Laundry Station Logo"
              className="h-7 w-auto object-contain flex-shrink-0"
              src={STORE_INFO.logoUrl}
            />
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">Login</h1>
          </div>
          <div className="flex items-center gap-space-sm flex-shrink-0">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              src={STORE_INFO.attendantAvatar}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full px-margin pb-safe pt-space-md">
        <div className="relative w-full max-w-md mx-auto flex flex-col">
          {/* Top Brand & Header Section */}
          <div className="flex flex-col items-center text-center mb-space-lg">
            <div className="relative mb-space-sm">
              <div className="w-20 h-20 rounded-full bg-surface-container-low shadow-sm flex items-center justify-center p-space-xs transition-transform hover:scale-105 duration-300 border border-outline-variant/30">
                <img
                  alt="Aquaspin Laundry Station Logo"
                  className="w-full h-full object-contain"
                  src={STORE_INFO.logoUrl}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[14px]">local_laundry_service</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed mb-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Terminal Online</span>
            </div>

            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-extrabold">
              Aquaspin Laundry
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Branch POS & Operations Portal
            </p>
          </div>

          {/* Main Login Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-space-lg mb-space-md">
            {/* Role Toggle Tabs */}
            <div className="relative bg-surface-container-low p-1 rounded-lg flex items-center mb-space-lg">
              <button
                type="button"
                onClick={() => handleRoleChange('staff')}
                className={`flex-1 py-space-xs rounded-md font-label-md text-label-md transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  role === 'staff'
                    ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">badge</span>
                <span>Staff Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('owner')}
                className={`flex-1 py-space-xs rounded-md font-label-md text-label-md transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  role === 'owner'
                    ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                <span>Owner / Manager</span>
              </button>
            </div>

            {/* Sign In Form */}
            <form className="space-y-space-md" onSubmit={handleSubmit}>
              {/* Identifier Input */}
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="identifierInput">
                    {role === 'staff' ? 'Staff Email or ID' : 'Owner / Manager Email'}
                  </label>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">Required</span>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-space-md text-outline pointer-events-none flex items-center">
                    <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                  </div>
                  <input
                    id="identifierInput"
                    name="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="maria.staff@aquaspin.ph"
                    className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md pl-11 pr-space-md py-3 rounded-lg shadow-sm border border-outline-variant/30 placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-bright transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="passwordInput">
                    Password or Passcode
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Reset instructions forwarded to store supervisor.', 'info')}
                    className="font-label-sm text-label-sm text-primary hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-space-md text-outline pointer-events-none flex items-center">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    id="passwordInput"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md pl-11 pr-12 py-3 rounded-lg shadow-sm border border-outline-variant/30 placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-bright transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    aria-label="Toggle password visibility"
                    className="absolute right-space-sm p-1.5 text-outline hover:text-on-surface transition-colors flex items-center justify-center rounded-full"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Terminal Device Toggle */}
              <div className="flex items-center justify-between pt-space-xs">
                <label className="flex items-center gap-space-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${remember ? 'bg-primary text-on-primary' : 'bg-surface-container border border-outline-variant'}`}>
                    {remember && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Remember terminal session</span>
                </label>

                <span className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span> POS Trusted
                </span>
              </div>

              {/* Primary Sign In CTA */}
              <div className="pt-space-xs">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm flex items-center justify-center gap-space-sm transition-all duration-200 active:scale-[0.98]"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign in to Terminal'}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Pin Code Quick Alternative */}
            <div className="relative my-space-lg flex items-center justify-center">
              <div className="w-full h-[1px] bg-surface-container-high"></div>
              <span className="absolute bg-surface-container-lowest px-space-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">
                or rapid shift
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenPinPad}
              className="w-full h-11 bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-space-sm transition-all duration-200 active:scale-[0.98] border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px]">dialpad</span>
              <span>Sign in with 4-Digit Staff PIN</span>
            </button>

            {/* Shift Switch Visual Hint */}
            <div className="mt-space-md pt-space-sm flex items-center justify-between text-outline font-label-sm text-label-sm">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Morning Shift Active
              </span>
              <span>Bay 1-12 Operational</span>
            </div>
          </div>

          {/* Customer Order Redirection Banner */}
          <div className="bg-surface-container-high text-on-surface rounded-xl p-space-md shadow-sm mb-space-lg flex items-start gap-space-sm border border-outline-variant/20">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            </div>
            <div className="space-y-1">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Staff & Owner Access Only</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Looking for your laundry status? Customers track orders anonymously without login by scanning the QR code on your printed receipt.
              </p>
              <div className="pt-space-xs">
                <button
                  type="button"
                  onClick={onGoToTracker}
                  className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:underline font-semibold"
                >
                  <span>Track via Receipt Ticket ID</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Meta & Version Info */}
          <div className="flex flex-col items-center justify-center gap-1 text-center font-label-sm text-label-sm text-outline pb-space-lg">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">storefront</span>
              <span className="text-on-surface-variant font-semibold">Katipunan Ave. Branch (QC)</span>
            </div>
            <div className="flex items-center gap-2 text-outline/80">
              <span>v2.4.0-POS</span>
              <span>•</span>
              <span>Encrypted Terminal Session</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
