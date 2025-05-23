import { TrendingUp } from 'lucide-react';

const ProgressBar = ({ value, color }: { value: number; color: string }) => (
  <div className="h-8 bg-gray-100 rounded-md w-full">
    <div
      className={`h-full ${color} rounded-md transition-all duration-300`}
      style={{ width: `${value}%` }}
    />
  </div>
);

export const TransactionsPanel = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500" />
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Our Total Transactions
          </h2>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">12,189</span>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
            <TrendingUp size={14} className="text-green-600" />
            <span className="text-xs font-medium text-green-600">+12%</span>
            <span className="text-xs text-gray-500">vs previous cycle</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">INDIVIDUAL</span>
            <span className="text-sm font-medium text-gray-900">64%</span>
          </div>
          <ProgressBar value={64} color="bg-[#44a6e9]" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">TEAM</span>
            <span className="text-sm font-medium text-gray-900">82%</span>
          </div>
          <ProgressBar value={82} color="bg-[#008444]" />
        </div>
      </div>
    </div>
  );
};