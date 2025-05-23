import { ChevronDown, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const generateData = () => {
  return months.map(month => ({
    name: month,
    thisYear: Math.floor(Math.random() * 100) + 50,
    lastYear: Math.floor(Math.random() * 80) + 30,
  }));
};

export const SalesActivityChart = () => {
  const data = generateData();
  const thisYearTotal = 1870;
  const lastYearTotal = 1250;
  const percentageIncrease = '+5%';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sales</h2>
        <div className="flex gap-2">
          <button className="flex items-center text-gray-600 text-sm">
            This year
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <button className="flex items-center text-gray-600 text-sm">
            All Sales
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="flex gap-8 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-gray-600">THIS YEAR</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{thisYearTotal}</span>
            <span className="text-emerald-500 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {percentageIncrease}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-[#ff8548]"></div>
            <span className="text-sm text-gray-600">VS LAST YEAR</span>
          </div>
          <span className="text-2xl font-semibold">{lastYearTotal}</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="thisYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lastYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff8548" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ff8548" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="#10B981"
              fill="url(#thisYearGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="lastYear"
              stroke="#ff8548"
              fill="url(#lastYearGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};