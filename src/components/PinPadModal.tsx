import React, { useState } from 'react';

interface PinPadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pin: string) => void;
  staffName?: string;
}

export const PinPadModal: React.FC<PinPadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  staffName = 'Staff'
}) => {
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const handleKey = (digit: string) => {
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      if (next.length === 4) {
        setTimeout(() => {
          onSuccess(next);
          setPin('');
        }, 200);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleClear = () => {
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 flex flex-col items-center animate-in slide-in-from-bottom-5">
        <div className="w-12 h-1 bg-[#eaedff] rounded-full mb-4 sm:hidden"></div>

        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">pin</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#131b2e]">{staffName} PIN Sign-in</h3>
              <p className="text-[11px] text-[#707881]">Katipunan Branch POS Terminal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] text-[#707881] flex items-center justify-center hover:bg-[#dae2fd]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#707881] text-center my-3">
          Enter 4-digit shift passcode to authenticate terminal session.
        </p>

        {/* 4 PIN Dots */}
        <div className="flex items-center gap-4 my-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                index < pin.length
                  ? 'bg-[#006194] scale-125 shadow-md'
                  : 'bg-[#eaedff]'
              }`}
            />
          ))}
        </div>

        {/* Numeric Keypad Grid */}
        <div className="grid grid-cols-3 gap-2.5 w-full my-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKey(digit)}
              className="h-12 rounded-xl bg-[#f2f3ff] active:bg-[#cce5ff] hover:bg-[#eaedff] font-bold text-lg text-[#131b2e] flex items-center justify-center transition-all shadow-xs"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="h-12 rounded-xl bg-[#f2f3ff] text-[#707881] hover:text-[#ba1a1a] font-bold text-xs flex items-center justify-center hover:bg-[#eaedff]"
          >
            CLEAR
          </button>
          <button
            type="button"
            onClick={() => handleKey('0')}
            className="h-12 rounded-xl bg-[#f2f3ff] active:bg-[#cce5ff] hover:bg-[#eaedff] font-bold text-lg text-[#131b2e] flex items-center justify-center transition-all shadow-xs"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 rounded-xl bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">backspace</span>
          </button>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-full py-2 text-center text-xs font-semibold text-[#707881] hover:text-[#131b2e]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
