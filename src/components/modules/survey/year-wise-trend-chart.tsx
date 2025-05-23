import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs"; // Ensure dayjs is imported for date manipulation

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

const TrendsChartYearWise: React.FC<TrendsChartProps> = ({ apiData }) => {
  const [chartData, setChartData] = useState<{
    dates: string[];
    surveys: number[];
    responses: number[];
  }>({
    dates: [],
    surveys: [],
    responses: [],
  });

  // Process Data
  useEffect(() => {
    if (apiData?.data) {
      const yearWiseData = getYearWiseData(apiData?.data);
      setChartData(yearWiseData);
    }
  }, [apiData]);

  const getYearWiseData = (data: Data[]) => {
    const years: string[] = [];
    const surveyCounts: number[] = [];
    const responseCounts: number[] = [];

    data.forEach((item) => {
      // Process Surveys
      item.Surveys.forEach((survey) => {
        const year = dayjs(survey.Date).year().toString(); // Convert Date to Year
        if (!years.includes(year)) {
          years.push(year);
          surveyCounts.push(parseInt(survey.count, 10));
          responseCounts.push(0); // Add 0 initially for responses
        } else {
          const index = years.indexOf(year);
          surveyCounts[index] += parseInt(survey.count, 10);
        }
      });

      // Process Responses
      item.Responses.forEach((response) => {
        const year = dayjs(response.Date).year().toString(); // Convert Date to Year
        if (!years.includes(year)) {
          years.push(year);
          responseCounts.push(parseInt(response.count, 10));
          surveyCounts.push(0); // Add 0 initially for surveys
        } else {
          const index = years.indexOf(year);
          responseCounts[index] += parseInt(response.count, 10);
        }
      });
    });

    console.log("Years:", years);
    console.log("Survey Counts:", surveyCounts);
    console.log("Response Counts:", responseCounts);

    return { dates: years, surveys: surveyCounts, responses: responseCounts };
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: 0.8 },

    xaxis: {
      categories: chartData.dates,
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

export default TrendsChartYearWise;
