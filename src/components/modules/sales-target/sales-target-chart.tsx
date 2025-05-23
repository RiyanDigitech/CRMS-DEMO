import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { date: 'Mar 12', achieve: 2000, target: 2500 },
  { date: 'Mar 13', achieve: 1500, target: 2000 },
  { date: 'Mar 14', achieve: 2200, target: 1800 },
  { date: 'Mar 15', achieve: 3000, target: 2500 },
  { date: 'Mar 16', achieve: 2000, target: 1500 },
  { date: 'Mar 17', achieve: 2800, target: 3000 },
];

export const SalesTargetChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sales Analytics</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg hover:bg-gray-50">
          Week
          <ChevronDown size={16} />
        </button>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip />
            <Bar dataKey="achieve" fill="#008444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="#ff8548" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};