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
    <div className="flex flex-col w-full px-margin pb-8 space-y-space-md">
      {/* Title & Date Selector Header */}
      <section className="flex flex-col space-y-space-sm pt-space-xs">
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[15px]">insights</span>
              </span>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Owner Analytics & Reports</h1>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
              <span>Katipunan Branch</span>
              <span className="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
              <span>FY 2024–2025</span>
            </p>
          </div>
          {/* Export Button */}
          <button
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high text-primary hover:bg-surface-variant transition-colors shadow-sm active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">Export</span>
          </button>
        </div>

        {/* Filter Bar & Date Span */}
        <div className="bg-surface-container-lowest p-2 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Time Range Pills */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-lg w-full sm:w-auto" role="tablist">
            {(['today', 'week', 'month', 'yearly'] as const).map((range) => {
              const labels = {
                today: 'Today',
                week: 'This Week',
                month: 'This Month',
                yearly: 'Yearly'
              };
              const isActive = timeRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`filter-pill flex-1 sm:flex-initial px-3 py-1 text-center font-label-sm text-label-sm rounded-md transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  {labels[range]}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant px-1 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">Oct 1 – Oct 31, 2024</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
              Closed Book
            </span>
          </div>
        </div>
      </section>

      {/* Key Metrics / Executive Financial Summary Cards (2x2 Grid) */}
      <section className="grid grid-cols-2 gap-space-sm">
        {/* Net Revenue */}
        <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-secondary-fixed/30 pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Net Revenue</span>
            <span className="material-symbols-outlined text-[18px] text-primary">payments</span>
          </div>
          <div className="mt-2 mb-1">
            <div className="font-currency-display text-currency-display text-on-surface tracking-tight leading-tight">₱348,650</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              +14.2%
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">vs Sept</span>
          </div>
        </div>

        {/* Total Gross Loads */}
        <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Gross Loads</span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">local_laundry_service</span>
          </div>
          <div className="mt-2 mb-1">
            <div className="font-currency-display text-currency-display text-on-surface tracking-tight leading-tight">1,180</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-tertiary font-semibold">~39.3 / day</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">31 days</span>
          </div>
        </div>

        {/* Running Expenses */}
        <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Expenses</span>
            <span className="material-symbols-outlined text-[18px] text-error">receipt_long</span>
          </div>
          <div className="mt-2 mb-1">
            <div className="font-currency-display text-currency-display text-on-surface tracking-tight leading-tight">₱86,400</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Power, Water & Crew</span>
          </div>
        </div>

        {/* Net Profit Margin */}
        <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-tertiary-fixed/30 pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Net Margin</span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">savings</span>
          </div>
          <div className="mt-2 mb-1">
            <div className="font-currency-display text-currency-display text-tertiary tracking-tight leading-tight">75.2%</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-label-sm text-label-sm font-bold text-on-surface">₱262,250</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">profit</span>
          </div>
        </div>
      </section>

      {/* Interactive Revenue Trend Chart Card */}
      <section className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col space-y-space-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Revenue Velocity & Peak Cycles</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Daily gross income tracking • Katipunan Bay</p>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="font-label-sm text-label-sm text-on-surface">Oct Cycles</span>
          </div>
        </div>

        {/* Interactive Peak Highlight Banner */}
        <div className="bg-surface-container-low p-2.5 rounded-lg flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">stars</span>
            <div>
              <div className="font-label-sm text-label-sm text-primary font-bold">Month Peak Load: Oct 19 (Saturday)</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">₱21,450.00 • 68 Baskets Cleared • 100% Bay Occupancy</div>
            </div>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">All-time High</span>
        </div>

        {/* Custom SVG Histogram / Trend Display */}
        <div className="relative w-full pt-2 pb-1">
          <svg aria-label="Revenue chart for October" className="w-full h-32 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 120">
            <defs>
              <linearGradient id="primaryGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006194" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#006194" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="barWeekendGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#008378" />
                <stop offset="100%" stopColor="#89f5e7" />
              </linearGradient>
            </defs>
            {/* Horizontal baseline guide lines */}
            <line stroke="#dae2fd" strokeDasharray="3 3" strokeWidth="0.8" x1="0" x2="320" y1="20" y2="20" />
            <line stroke="#dae2fd" strokeDasharray="3 3" strokeWidth="0.8" x1="0" x2="320" y1="60" y2="60" />
            <line stroke="#dae2fd" strokeWidth="1" x1="0" x2="320" y1="100" y2="100" />
            {/* Area Fill under spline */}
            <path d="M 5,95 Q 40,75 75,82 T 145,55 T 205,18 T 265,65 T 315,40 L 315,100 L 5,100 Z" fill="url(#primaryGradient)" />
            {/* Spline Line */}
            <path d="M 5,95 Q 40,75 75,82 T 145,55 T 205,18 T 265,65 T 315,40" fill="none" stroke="#006194" strokeLinecap="round" strokeWidth="2.5" />
            {/* Weekend Indicators / Peak Bars */}
            <rect fill="#93ccff" height="45" opacity="0.7" rx="3" width="8" x="52" y="55" />
            <rect fill="#93ccff" height="52" opacity="0.7" rx="3" width="8" x="63" y="48" />
            <rect fill="#93ccff" height="60" opacity="0.7" rx="3" width="8" x="122" y="40" />
            <rect fill="#93ccff" height="64" opacity="0.7" rx="3" width="8" x="133" y="36" />
            <rect className="cursor-pointer" fill="url(#barWeekendGradient)" height="84" rx="3" width="10" x="194" y="16">
              <title>Oct 19 Peak: ₱21,450</title>
            </rect>
            <circle cx="199" cy="16" fill="#00685f" r="3.5" stroke="#ffffff" strokeWidth="1.5" />
            <rect fill="#93ccff" height="68" opacity="0.7" rx="3" width="8" x="264" y="32" />
            <rect fill="#93ccff" height="62" opacity="0.7" rx="3" width="8" x="275" y="38" />
          </svg>
          {/* Chart Labels */}
          <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm pt-1">
            <span>Week 1 (Oct 1-7)</span>
            <span>W2 (8-14)</span>
            <span className="text-tertiary font-bold">W3 Peak (15-21)</span>
            <span>W4 (22-28)</span>
            <span>W5 (29-31)</span>
          </div>
        </div>
        {/* Quick Takeaway Callout */}
        <div className="flex items-center gap-2 pt-1 border-t-0 text-on-surface-variant font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-[16px] text-tertiary flex-shrink-0">info</span>
          <span>Weekend average reaches <strong className="text-on-surface font-semibold">₱18,500/day</strong>, delivering 48% of total month volume.</span>
        </div>
      </section>

      {/* Revenue Breakdown by Payment Method */}
      <section className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Payment Channel Split</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Verified customer settlement distribution</p>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface font-bold">1,180 TXNs</span>
        </div>
        {/* Multi-Segment Visual Bar */}
        <div className="w-full h-3 rounded-full bg-surface-container-high flex overflow-hidden">
          <div className="bg-primary h-full transition-all duration-500" style={{ width: '58%' }} title="GCash: 58%"></div>
          <div className="bg-tertiary-container h-full transition-all duration-500" style={{ width: '36%' }} title="Cash: 36%"></div>
          <div className="bg-error h-full transition-all duration-500" style={{ width: '6%' }} title="Unsettled: 6%"></div>
        </div>
        {/* Itemized Channels */}
        <div className="space-y-space-sm pt-1">
          {/* GCash Row */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm shadow-sm flex-shrink-0">
                G
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg text-label-lg font-bold text-on-surface">GCash Digital Pay</span>
                  <span className="px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">58%</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">684 QR Transfers</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-currency-body text-currency-body text-on-surface">₱202,217.00</div>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">Auto-reconciled</span>
            </div>
          </div>
          {/* Cash on Hand Row */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-label-sm shadow-sm flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg text-label-lg font-bold text-on-surface">Counter Cash</span>
                  <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">36%</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">425 Register slips</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-currency-body text-currency-body text-on-surface">₱125,514.00</div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Deposited in Vault</span>
            </div>
          </div>
          {/* Pay-Later Unsettled */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-error-container/40 hover:bg-error-container/60 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-error text-on-error flex items-center justify-center font-bold text-label-sm shadow-sm flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">pending_actions</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg text-label-lg font-bold text-on-surface">Pay-Later Balance</span>
                  <span className="px-1.5 py-0.2 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">6%</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-error-container">71 Pending ticket stubs</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-currency-body text-currency-body text-error font-bold">₱20,919.00</div>
              <span className="font-label-sm text-label-sm text-error font-bold inline-flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">warning</span> ₱4,850 &gt;7d
              </span>
            </div>
          </div>
        </div>
        {/* Ledger Link */}
        <button
          onClick={onViewUnsettled}
          className="inline-flex items-center justify-center gap-1 py-2 text-primary hover:text-primary-container font-label-sm text-label-sm font-bold transition-colors"
          type="button"
        >
          <span>View Unsettled Pay-Later Ledger</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* Service Mix & Operational Ratios */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
        {/* Service Distribution */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Service Volume Mix</h2>
              <span className="material-symbols-outlined text-[18px] text-primary">pie_chart</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Breakdown by laundry service category</p>
          </div>
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between font-label-sm text-label-sm mb-1">
                <span className="text-on-surface font-semibold">Wash-Dry-Fold (Regular)</span>
                <span className="text-on-surface font-bold">52% (614 loads)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container">
                <div className="h-2 rounded-full bg-primary" style={{ width: '52%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-sm text-label-sm mb-1">
                <span className="text-on-surface font-semibold">Bulky / Comforter Care</span>
                <span className="text-tertiary font-bold">26% (High Margin)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container">
                <div className="h-2 rounded-full bg-tertiary" style={{ width: '26%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-sm text-label-sm mb-1">
                <span className="text-on-surface font-semibold">Self-Service Bay Access</span>
                <span className="text-on-surface-variant font-bold">22% (260 loads)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container">
                <div className="h-2 rounded-full bg-secondary-container" style={{ width: '22%' }}></div>
              </div>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Avg Ticket Size</span>
            <span className="font-currency-body text-currency-body text-on-surface font-bold">₱295.40 / client</span>
          </div>
        </div>

        {/* Operating Expense Breakdown */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Operating Utility & Costs</h2>
              <span className="material-symbols-outlined text-[18px] text-error">tune</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Total: ₱86,400.00 OPEX in October</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-body-sm text-body-sm text-on-surface">Power & Water (Meralco/Maynilad)</span>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm font-bold text-on-surface">₱32,400</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">(37.5%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="font-body-sm text-body-sm text-on-surface">Staff Payroll & Overtime</span>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm font-bold text-on-surface">₱25,000</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">(28.9%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-body-sm text-body-sm text-on-surface">Detergent, Softener & Bags</span>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm font-bold text-on-surface">₱24,800</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">(28.7%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-outline"></span>
                <span className="font-body-sm text-body-sm text-on-surface">Machine Maintenance Sinking Fund</span>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm font-bold text-on-surface">₱4,200</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">(4.9%)</span>
              </div>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-tertiary-fixed/20 flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface">Water Recycling Efficiency</span>
            <span className="font-label-sm text-label-sm font-bold text-tertiary">91.4% Target Met</span>
          </div>
        </div>
      </section>

      {/* Physical Facility Status Summary Card */}
      <section className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">storefront</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Katipunan Station Audit Snapshot</h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
            12/12 Drums Active
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-surface-container-low p-2 rounded-lg">
            <div className="font-body-sm text-body-sm text-on-surface-variant">Washer Hubs</div>
            <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">6 Units</div>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold">100% Calibrated</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg">
            <div className="font-body-sm text-body-sm text-on-surface-variant">Dryer Hubs</div>
            <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">6 Units</div>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold">Lint Cleared 4h ago</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg">
            <div className="font-body-sm text-body-sm text-on-surface-variant">Attendants</div>
            <div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">3 On-Shift</div>
            <span className="font-label-sm text-label-sm text-primary font-semibold">Shift B active</span>
          </div>
        </div>
      </section>

      {/* Interactive Export Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm"
          onClick={() => setShowExportModal(false)}
        >
          <div
            className="bg-surface-container-lowest p-6 rounded-2xl max-w-xs w-full shadow-2xl space-y-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">download_done</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Report Generated!</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Aquaspin_Katipunan_Oct2024.csv is ready for accounting.</p>
            </div>
            <div className="flex gap-2">
              <button
                className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow"
                type="button"
                onClick={() => {
                  setShowExportModal(false);
                  showToast('Aquaspin_Katipunan_Oct2024.csv downloaded', 'download');
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
