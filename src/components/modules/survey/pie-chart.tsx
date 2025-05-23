import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { StaticOption } from "@/lib/types/survey";
interface PieChartProps {
  piechartdata: StaticOption[];
}
const PieChart: React.FC<PieChartProps> = ({ piechartdata }) => {
  const labels = piechartdata.map((item) => item.option);
  const series = piechartdata.map((item) => parseFloat(item.count));
  const options: ApexOptions = {
    chart: { type: "pie" },
    labels: labels,
    colors: ["#fec600", "#44a6e9", "#e2362f", "#269660"],
    legend: {
      position: "right",
      offsetY: 10,
      offsetX: 0,
      itemMargin: {
        vertical: 20,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: "100%",
            height: "260",
          },
          legend: {
            position: "bottom",
            offsetY: -10,
            offsetX: 0,
            itemMargin: {
              vertical: 0,
            },
          },
        },
      },
    ],
  };
  console.log("piechartdata", piechartdata);
  return (
    <div className=" w-full md:w-11/12 ">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height="220"
      />
    </div>
  );
};

export default PieChart;
