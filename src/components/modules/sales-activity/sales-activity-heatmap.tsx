import React from 'react';
import { ChevronDown } from 'lucide-react';

type VisitLevel = '< 500' | '< 1000' | '< 2000' | '< 6000';

interface HeatmapData {
  time: string;
  [key: string]: string | number;
}

const times = ['12am', '3am', '6am', '9am', '3pm', '6pm', '9pm'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sat'];

const getColorForValue = (value: number): string => {
  if (value < 500) return 'bg-emerald-100';
  if (value < 1000) return 'bg-emerald-200';
  if (value < 2000) return 'bg-emerald-300';
  return 'bg-emerald-500';
};

const generateRandomData = () => {
  return times.map(time => ({
    time,
    ...days.reduce((acc, day) => ({
      ...acc,
      [day]: Math.floor(Math.random() * 6000)
    }), {})
  }));
};

export const SalesActivityHeatmap = () => {
  const data = generateRandomData();

  console.log(data,"data")

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Visits by Time</h2>
        <button className="flex items-center text-gray-600 text-sm">
          Week
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        {['< 500', '< 1000', '< 2000', '< 6000'].map((level) => (
          <div key={level} className="flex items-center gap-1">
            <div className={`w-2.5 h-2.5 rounded ${getColorForValue(parseInt(level.slice(2)))}`} />
            <span className="text-xs text-gray-600">{level}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-0.5">
        <div className=""></div>
        {days.map(day => (
          <div key={day} className="text-xs text-gray-600 text-center pb-1">{day}</div>
        ))}
        
        {data.map((row, i) => (
          <React.Fragment key={row.time}>
            <div className="text-xs text-gray-600 pr-2 h-6 flex items-center">{row.time}</div>
            {days.map(day => (
              <div
                key={`${row.time}-${day}`}
                className={`h-6 rounded-sm ${getColorForValue(row[day] as number)}`}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};