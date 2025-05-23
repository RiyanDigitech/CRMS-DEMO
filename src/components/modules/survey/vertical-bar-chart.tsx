import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface VerticalBarChartDatum {
  percent: string;
  rating: number;
}

interface VerticalBarChartProps {
  VerticalBarChartData: VerticalBarChartDatum[];
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
  VerticalBarChartData,
}) => {
  // Define the ratings range
  const ratings = [1, 2, 3, 4, 5];

  // Prepare the data for the chart
  const chartSeries = [
    {
      name: "Responses",
      data: ratings.map((rating) => {
        // Find the corresponding data for the rating, if any
        const found = VerticalBarChartData.find(
          (item) => item.rating === rating
        );
        return found ? parseFloat(found.percent) : 0; // If not found, set it to 0
      }),
    },
  ];

  // Chart options
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 5, // Rounded corners
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
    },
    xaxis: {
      categories: ratings.map(String), // Ensure categories are 1 to 5
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${Math.round(value)}`,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`,
      },
    },
    colors: ["#008444"], // Green color
  };

  return (
    <div className="mx-auto w-full md:w-11/12">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height="150"
      />
    </div>
  );
};

export default VerticalBarChart;
