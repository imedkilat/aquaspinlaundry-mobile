import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 max-w-sm w-[90%] px-4 animate-in fade-in slide-in-from-bottom-3">
      <div className="bg-[#283044] text-[#eef0ff] py-2.5 px-4 rounded-full shadow-2xl flex items-center justify-center gap-2.5 text-center border border-white/10">
        <span className="material-symbols-outlined text-[19px] text-[#89f5e7] flex-shrink-0">
          {icon}
        </span>
        <span className="text-xs font-semibold tracking-wide truncate">{message}</span>
      </div>
    </div>
  );
};
