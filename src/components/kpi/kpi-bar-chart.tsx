// import Chart from "react-apexcharts";

// interface KpiData {
//   DSO?: {
//     actual?: number;
//     target?: number;
//     score?: number;
//   };
//   CM?: {
//     actual?: number;
//     target?: number;
//     score?: number;
//   };
//   "Sales Trade"?: {
//     actual?: number;
//     target?: number;
//     score?: number;
//   };
// }

// const BarChart: React.FC<{ kpiData: KpiData }> = ({ kpiData }) => {
//   console.log("kpiData checking...", kpiData);
//   const labels = ["DSO", "CM", "Sales Trade"];

//   const actualData = [
//     kpiData?.DSO?.actual || 0,
//     kpiData?.CM?.actual || 0,
//     kpiData?.["Sales Trade"]?.actual || 0,
//   ];

//   const targetData = [
//     kpiData?.DSO?.target || 0,
//     kpiData?.CM?.target || 0,
//     kpiData?.["Sales Trade"]?.target || 0,
//   ];

//   const scoreData = [
//     kpiData?.DSO?.score || 0,
//     kpiData?.CM?.score || 0,
//     kpiData?.["Sales Trade"]?.score || 0,
//   ];

//   const chartOptions: ApexCharts.ApexOptions = {
//     chart: {
//       type: "bar",
//     },
//     title: {
//       text: "KPI Summary",
//     },
//     xaxis: {
//       categories: labels,
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "60%",
//       },
//     },
//     colors: ["#008444", "#ff8548", "#4287f5", "#ffc107"],
//     dataLabels: {
//       enabled: true,
//       style: {
//         fontSize: "13px",
//         colors: ["#000"],
//       },
//     },
//     legend: {
//       position: "top",
//     },
//   };

//   const series = [
//     {
//       name: "Actual",
//       data: actualData,
//     },
//     {
//       name: "Target",
//       data: targetData,
//     },
//     {
//       name: "Score",
//       data: scoreData,
//     },
//   ];

//   return (
//     <Chart options={chartOptions} series={series} type="bar" height={350} />
//   );
// };

// export default BarChart;
import ReactApexChart from "react-apexcharts";

interface BarChartProps {
  kpiData: Record<string, { actual?: number; target?: number; score?: number }>;
  selectedType: string;
}

const BarChart: React.FC<BarChartProps> = ({ kpiData, selectedType }) => {
  var categories;
  if (selectedType === "Project") {
    categories = ["DSO", "Sales Trade", "CM"];
  } else {
    categories = ["DSO", "Sales Trade", "Active Dealer"];
  }
  const actualData = categories?.map((key) => kpiData?.[key]?.actual ?? 0);
  const targetData = categories?.map((key) => kpiData?.[key]?.target ?? 0);
  const scoreData = categories?.map((key) => kpiData?.[key]?.score ?? 0);
  console.log("selectedType", selectedType);
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "Values",
      },
    },
    colors: ["#00E396", "#FEB019", "#008FFB"],
    legend: {
      position: "top",
    },
  };

  const chartSeries = [
    {
      name: "Actual",
      data: actualData,
    },
    {
      name: "Target",
      data: targetData,
    },
    {
      name: "Score",
      data: scoreData,
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
