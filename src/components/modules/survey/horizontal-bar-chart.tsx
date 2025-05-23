import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { StaticOption } from "@/lib/types/survey";
interface HorizontalBarChartProps {
  horizontalbarchartdata: StaticOption[];
}
const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  horizontalbarchartdata,
}) => {
  const series = [
    {
      data: horizontalbarchartdata.map((item) => parseFloat(item?.count)),
    },
  ];
  const labels = horizontalbarchartdata.map((item) => {
    const maxLength = 10; // Maximum length for the label
    return item?.option.length > maxLength
      ? item?.option.slice(0, maxLength) + "..."
      : item?.option;
  });
  const options: ApexOptions = {
    chart: { type: "bar" },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        borderRadius: 10,
      },
    },
    dataLabels: { enabled: true },
    xaxis: {
      categories: labels,
    },
    colors: ["#008444", "#008444", "#008444"],
    legend: {
      show: true,
      fontSize: "9px",
      position: "bottom",
      horizontalAlign: "center",

      fontFamily: "Manrope, sans-serif",
      labels: {
        colors: "#6B6B6B",
      },
    },
  };
  console.log(horizontalbarchartdata, "horizontalbarchartdata");
  return (
    <div className="w-full lg:w-10/12 mx-auto">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="220"
      />
    </div>
  );
};

export default HorizontalBarChart;
