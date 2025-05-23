import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DataPoint {
  Date: string;
  count: string;
}

interface Data {
  Surveys: DataPoint[];
  Responses: DataPoint[];
}

export interface TrendsChartProps {
  apiData: {
    message: string;
    data: Data[];
  };
}

const TrendsChart: React.FC<TrendsChartProps> = ({ apiData }) => {
  const [chartData, setChartData] = useState<{
    months: string[];
    surveys: number[];
    responses: number[];
  }>({
    months: [],
    surveys: [],
    responses: [],
  });

  // Process Data
  useEffect(() => {
    if (apiData?.data) {
      const currentYear = new Date().getFullYear(); // Dynamically fetch the current year
      const monthlyData = getMonthlyData(apiData?.data, currentYear);
      setChartData(monthlyData);
    }
  }, [apiData]);

  const getMonthlyData = (data: Data[], year: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const surveyCounts = new Array(12).fill(0);
    const responseCounts = new Array(12).fill(0);

    data.forEach((item) => {
      // Process Surveys
      item.Surveys.forEach((survey) => {
        const date = new Date(survey.Date);
        if (date.getFullYear() === year) {
          const monthIndex = date.getMonth(); // 0-based index
          surveyCounts[monthIndex] += parseInt(survey?.count, 10);
        }
      });

      // Process Responses
      item.Responses.forEach((response) => {
        const date = new Date(response?.Date);
        if (date.getFullYear() === year) {
          const monthIndex = date.getMonth(); // 0-based index
          responseCounts[monthIndex] += parseInt(response?.count, 10);
        }
      });
    });

    return { months, surveys: surveyCounts, responses: responseCounts };
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: 0.8 },

    xaxis: {
      categories: chartData.months,
    },
    yaxis: {
      title: {
        text: "Counts",
      },
    },
    grid: {
      show: true,
      borderColor: "#f7f7f7",
      strokeDashArray: 4,
    },
    colors: ["#008444", "#ff8548"],

    fill: { type: "solid", opacity: 0.08 },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  const chartSeries = [
    {
      name: "Surveys",
      data: chartData.surveys,
    },
    {
      name: "Responses",
      data: chartData.responses,
    },
  ];
  console.log(apiData, "apidata");
  return (
    <div className="w-full">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={250}
      />
    </div>
  );
};

export default TrendsChart;
