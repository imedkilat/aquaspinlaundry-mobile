import React, { useState } from 'react';

interface OwnerAnalyticsProps {
  onViewUnsettled: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const OwnerAnalytics: React.FC<OwnerAnalyticsProps> = ({
  onViewUnsettled,
  showToast
}) => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'yearly'>('month');
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Title & Date Selector Header */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#006194]/10 text-[#006194]">
                <span className="material-symbols-outlined text-[16px]">insights</span>
              </span>
              <h1 className="font-extrabold text-2xl text-[#131b2e] dark:text-white tracking-tight">
                Owner Analytics & Reports
              </h1>
            </div>
            <p className="text-xs text-[#707881] dark:text-[#bfc7d2] flex items-center gap-1">
              <span>Katipunan Branch</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#707881]"></span>
              <span>FY 2024–2025</span>
            </p>
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#eaedff] dark:bg-[#283044] text-[#006194] dark:text-[#93ccff] hover:bg-[#dae2fd] transition-colors shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">Export</span>
          </button>
        </div>

        {/* Filter Bar & Date Span */}
        <div className="bg-white dark:bg-[#1a2235] p-2 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center bg-[#f2f3ff] dark:bg-[#131b2e] p-1 rounded-xl w-full sm:w-auto">
            {(['today', 'week', 'month', 'yearly'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`flex-1 sm:flex-initial px-3 py-1 text-center text-xs font-bold rounded-lg transition-all ${
                  timeRange === r
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'text-[#707881] dark:text-[#bfc7d2] hover:text-[#131b2e]'
                }`}
              >
                {r === 'today' ? 'Today' : r === 'week' ? 'This Week' : r === 'month' ? 'This Month' : 'Yearly'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#707881] px-1 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1 font-semibold text-[#131b2e] dark:text-white">
              <span className="material-symbols-outlined text-[16px] text-[#006194]">calendar_today</span>
              <span>Oct 1 – Oct 31, 2024</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#004b74] text-[10px] font-bold">
              Closed Book
            </span>
          </div>
        </div>
      </section>

      {/* Key Metrics Summary Cards (2x2 Grid) */}
      <section className="grid grid-cols-2 gap-2.5">
        {/* Net Revenue */}
        <div className="bg-white dark:bg-[#1a2235] p-3.5 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Net Revenue</span>
            <span className="material-symbols-outlined text-[18px] text-[#006194]">payments</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-[#131b2e] dark:text-white leading-tight">
              ₱348,650
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-[#e6f4f2] text-[#00685f] text-[10px] font-bold">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> +14.2%
            </span>
            <span className="text-[11px] text-[#707881]">vs Sept</span>
          </div>
        </div>

        {/* Gross Loads */}
        <div className="bg-white dark:bg-[#1a2235] p-3.5 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Gross Loads</span>
            <span className="material-symbols-outlined text-[18px] text-[#00685f]">local_laundry_service</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-[#131b2e] dark:text-white leading-tight">
              1,180
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#00685f] font-bold">~39.3 / day</span>
            <span className="text-[#707881]">31 days</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white dark:bg-[#1a2235] p-3.5 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Expenses</span>
            <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">receipt_long</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-[#131b2e] dark:text-white leading-tight">
              ₱86,400
            </div>
          </div>
          <span className="text-[11px] text-[#707881] truncate">Power, Water & Crew</span>
        </div>

        {/* Net Margin */}
        <div className="bg-white dark:bg-[#1a2235] p-3.5 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#707881]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Net Margin</span>
            <span className="material-symbols-outlined text-[18px] text-[#00685f]">savings</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-[#00685f] dark:text-[#89f5e7] leading-tight">
              75.2%
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span className="font-bold text-[#131b2e] dark:text-white">₱262,250</span>
            <span className="text-[#707881]">profit</span>
          </div>
        </div>
      </section>

      {/* Interactive Revenue Trend Chart Card */}
      <section className="bg-white dark:bg-[#1a2235] p-4 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Revenue Velocity & Peak Cycles</h2>
            <p className="text-xs text-[#707881]">Daily gross income tracking • Katipunan Bay</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f2f3ff] dark:bg-[#131b2e] px-2.5 py-1 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
            <span className="text-[10px] font-bold text-[#131b2e] dark:text-white">Oct Cycles</span>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="bg-[#f2f3ff] dark:bg-[#131b2e] p-3 rounded-xl flex items-center justify-between border border-[#cce5ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">stars</span>
            <div>
              <div className="text-xs font-bold text-[#006194] dark:text-[#93ccff]">
                Month Peak Load: Oct 19 (Saturday)
              </div>
              <div className="text-[11px] text-[#707881]">
                ₱21,450.00 • 68 Baskets Cleared • 100% Bay Occupancy
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#cce5ff] text-[#004b73]">
            All-time High
          </span>
        </div>

        {/* Custom SVG Graph */}
        <div className="relative w-full pt-1 pb-1">
          <svg className="w-full h-32 overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ownerPrimaryGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006194" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#006194" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line x1="0" x2="320" y1="20" y2="20" stroke="#dae2fd" strokeDasharray="3 3" strokeWidth="0.8" />
            <line x1="0" x2="320" y1="60" y2="60" stroke="#dae2fd" strokeDasharray="3 3" strokeWidth="0.8" />
            <line x1="0" x2="320" y1="100" y2="100" stroke="#dae2fd" strokeWidth="1" />

            {/* Area Fill */}
            <path
              d="M 5,95 Q 40,75 75,82 T 145,55 T 205,18 T 265,65 T 315,40 L 315,100 L 5,100 Z"
              fill="url(#ownerPrimaryGrad)"
            />
            {/* Spline */}
            <path
              d="M 5,95 Q 40,75 75,82 T 145,55 T 205,18 T 265,65 T 315,40"
              fill="none"
              stroke="#006194"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Weekend Bars */}
            <rect x="52" y="55" width="8" height="45" rx="3" fill="#93ccff" opacity="0.7" />
            <rect x="63" y="48" width="8" height="52" rx="3" fill="#93ccff" opacity="0.7" />
            <rect x="122" y="40" width="8" height="60" rx="3" fill="#93ccff" opacity="0.7" />
            <rect x="133" y="36" width="8" height="64" rx="3" fill="#93ccff" opacity="0.7" />
            {/* Oct 19 peak bar */}
            <rect x="194" y="16" width="10" height="84" rx="3" fill="#008378" />
            <circle cx="199" cy="16" r="4" fill="#00685f" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="264" y="32" width="8" height="68" rx="3" fill="#93ccff" opacity="0.7" />
            <rect x="275" y="38" width="8" height="62" rx="3" fill="#93ccff" opacity="0.7" />
          </svg>
          <div className="flex justify-between items-center text-[#707881] text-[10px] pt-1">
            <span>Week 1 (Oct 1-7)</span>
            <span>W2 (8-14)</span>
            <span className="text-[#00685f] font-bold">W3 Peak (15-21)</span>
            <span>W4 (22-28)</span>
            <span>W5 (29-31)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-xs text-[#707881]">
          <span className="material-symbols-outlined text-[16px] text-[#00685f] flex-shrink-0">info</span>
          <span>Weekend average reaches <strong className="text-[#131b2e] dark:text-white font-bold">₱18,500/day</strong>, delivering 48% of total month volume.</span>
        </div>
      </section>

      {/* Revenue Breakdown by Payment Method */}
      <section className="bg-white dark:bg-[#1a2235] p-4 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Payment Channel Split</h2>
            <p className="text-xs text-[#707881]">Verified customer settlement distribution</p>
          </div>
          <span className="text-[10px] font-bold bg-[#eaedff] dark:bg-[#283044] text-[#131b2e] dark:text-white px-2.5 py-0.5 rounded-full">
            1,180 TXNs
          </span>
        </div>

        {/* Multi-Segment Bar */}
        <div className="w-full h-3 rounded-full bg-[#eaedff] dark:bg-[#283044] flex overflow-hidden">
          <div className="bg-[#006194] h-full" style={{ width: '58%' }} title="GCash: 58%"></div>
          <div className="bg-[#008378] h-full" style={{ width: '36%' }} title="Cash: 36%"></div>
          <div className="bg-[#ba1a1a] h-full" style={{ width: '6%' }} title="Unsettled: 6%"></div>
        </div>

        {/* Channels */}
        <div className="space-y-2 pt-1">
          {/* GCash */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#005ce6] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                G
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white">GCash Digital Pay</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#cce5ff] text-[#004b73]">58%</span>
                </div>
                <span className="text-[11px] text-[#707881]">684 QR Transfers</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#131b2e] dark:text-white">₱202,217.00</div>
              <span className="text-[10px] font-bold text-[#008378]">Auto-reconciled</span>
            </div>
          </div>

          {/* Cash */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e6f4f2] text-[#00685f] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#131b2e] dark:text-white">Counter Cash</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#eaedff] text-[#3f4850]">36%</span>
                </div>
                <span className="text-[11px] text-[#707881]">425 Register slips</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#131b2e] dark:text-white">₱125,514.00</div>
              <span className="text-[10px] text-[#707881]">Deposited in Vault</span>
            </div>
          </div>

          {/* Pay-Later */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ffdad6]/50 dark:bg-[#93000a]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ba1a1a] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <span className="material-symbols-outlined text-[18px]">pending_actions</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#ba1a1a] dark:text-[#ffdad6]">Pay-Later Balance</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#ba1a1a] text-white">6%</span>
                </div>
                <span className="text-[11px] text-[#ba1a1a] dark:text-[#ffdad6]">71 Pending ticket stubs</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#ba1a1a] dark:text-[#ffdad6]">₱20,919.00</div>
              <span className="text-[10px] text-[#ba1a1a] font-bold flex items-center gap-0.5 justify-end">
                <span className="material-symbols-outlined text-[12px]">warning</span> ₱4,850 &gt;7d
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onViewUnsettled}
          className="inline-flex items-center justify-center gap-1 py-1.5 text-[#006194] dark:text-[#93ccff] font-bold text-xs hover:underline"
        >
          <span>View Unsettled Pay-Later Ledger</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* Service Mix & Operating Utility */}
      <section className="bg-white dark:bg-[#1a2235] p-4 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Service Volume Mix</h2>
          <span className="material-symbols-outlined text-[18px] text-[#006194]">pie_chart</span>
        </div>

        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#131b2e] dark:text-white">Wash-Dry-Fold (Regular)</span>
              <span className="font-bold text-[#131b2e] dark:text-white">52% (614 loads)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eaedff] dark:bg-[#283044] overflow-hidden">
              <div className="h-full bg-[#006194] rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#131b2e] dark:text-white">Bulky / Comforter Care</span>
              <span className="font-bold text-[#00685f]">26% (High Margin)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eaedff] dark:bg-[#283044] overflow-hidden">
              <div className="h-full bg-[#008378] rounded-full" style={{ width: '26%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#131b2e] dark:text-white">Self-Service Bay Access</span>
              <span className="font-bold text-[#707881]">22% (260 loads)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eaedff] dark:bg-[#283044] overflow-hidden">
              <div className="h-full bg-[#7bc2ff] rounded-full" style={{ width: '22%' }}></div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-[#131b2e] flex items-center justify-between text-xs">
          <span className="text-[#707881]">Average Ticket Size</span>
          <span className="font-bold text-[#131b2e] dark:text-white">₱295.40 / client</span>
        </div>
      </section>

      {/* Facility Status Snapshot */}
      <section className="bg-white dark:bg-[#1a2235] p-4 rounded-2xl shadow-sm border border-[#eaedff] dark:border-[#283044] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006194]">storefront</span>
            <h2 className="font-bold text-sm text-[#131b2e] dark:text-white">Katipunan Station Audit Snapshot</h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#89f5e7] text-[#005049] text-[10px] font-bold">
            12/12 Drums Active
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-[#f2f3ff] dark:bg-[#131b2e] p-2.5 rounded-xl border border-[#eaedff] dark:border-[#283044]">
            <div className="text-[11px] text-[#707881]">Washer Hubs</div>
            <div className="text-base font-extrabold text-[#131b2e] dark:text-white mt-0.5">6 Units</div>
            <span className="text-[10px] font-bold text-[#00685f]">100% Calibrated</span>
          </div>
          <div className="bg-[#f2f3ff] dark:bg-[#131b2e] p-2.5 rounded-xl border border-[#eaedff] dark:border-[#283044]">
            <div className="text-[11px] text-[#707881]">Dryer Hubs</div>
            <div className="text-base font-extrabold text-[#131b2e] dark:text-white mt-0.5">6 Units</div>
            <span className="text-[10px] font-bold text-[#00685f]">Lint Cleared 4h ago</span>
          </div>
          <div className="bg-[#f2f3ff] dark:bg-[#131b2e] p-2.5 rounded-xl border border-[#eaedff] dark:border-[#283044]">
            <div className="text-[11px] text-[#707881]">Attendants</div>
            <div className="text-base font-extrabold text-[#131b2e] dark:text-white mt-0.5">3 On-Shift</div>
            <span className="text-[10px] font-bold text-[#006194]">Shift B Active</span>
          </div>
        </div>
      </section>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131b2e]/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a2235] p-6 rounded-2xl max-w-xs w-full shadow-2xl space-y-4 text-center border border-[#eaedff] dark:border-[#283044] animate-in zoom-in-95">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">download_done</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#131b2e] dark:text-white">Report Generated!</h3>
              <p className="text-xs text-[#707881] mt-1">Aquaspin_Katipunan_Oct2024.csv is ready for accounting & BIR review.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowExportModal(false);
                  showToast('Exported Katipunan October Ledger CSV', 'download');
                }}
                className="w-full py-2.5 rounded-xl bg-[#006194] text-white font-bold text-xs hover:bg-[#007bb9] transition-colors shadow-sm"
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
