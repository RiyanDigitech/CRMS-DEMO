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

const TrendsChartDateWise: React.FC<TrendsChartProps> = ({ apiData }) => {
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
      const dateWiseData = getDateWiseData(apiData?.data);
      setChartData(dateWiseData);
    }
  }, [apiData]);

  const getDateWiseData = (data: Data[]) => {
    const dates: string[] = [];
    const surveyCounts: number[] = [];
    const responseCounts: number[] = [];

    data.forEach((item) => {
      // Process Surveys
      item.Surveys.forEach((survey) => {
        const date = survey.Date;
        if (!dates.includes(date)) {
          dates.push(date);
          surveyCounts.push(parseInt(survey.count, 10));
          responseCounts.push(0); // Add 0 initially for responses
        } else {
          const index = dates.indexOf(date);
          surveyCounts[index] += parseInt(survey.count, 10);
        }
      });

      // Process Responses
      item.Responses.forEach((response) => {
        const date = response.Date;
        if (!dates.includes(date)) {
          dates.push(date);
          responseCounts.push(parseInt(response.count, 10));
          surveyCounts.push(0); // Add 0 initially for surveys
        } else {
          const index = dates.indexOf(date);
          responseCounts[index] += parseInt(response.count, 10);
        }
      });
    });

    console.log("Dates:", dates);
    console.log("Survey Counts:", surveyCounts);
    console.log("Response Counts:", responseCounts);

    return { dates, surveys: surveyCounts, responses: responseCounts };
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

export default TrendsChartDateWise;
