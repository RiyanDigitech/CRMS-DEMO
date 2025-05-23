import { Progress, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { salesTargetType } from "@/lib/types/sales-target";
import moment from "moment";
import { ThreeDots } from "@/components/iconComponents";
const formatDateRange = (startDate: string, endDate: string) => {
  const startFormatted = moment(startDate).format("MMM DD, YYYY");
  const endFormatted = moment(endDate).format("MMM DD, YYYY");

  return `${startFormatted} - ${endFormatted}`;
};
export const SalesTargetColumns = (): TableColumnsType<salesTargetType> => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `#${id}`,
      responsive: ["lg"], // Only show on large screens and above
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      ellipsis: true,
    },
    {
      title: "Target Value",
      dataIndex: "targetValue",
      key: "targetValue",
      render: (targetValue) => {
        return <p>{Number(targetValue).toLocaleString()}</p>;
      },
    },
    {
      title: "Target Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Complete"
            ? "green"
            : status === "Incomplete"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Start & End Dates",
      dataIndex: "date",
      key: "date",
      render: (status, record) => {
        return <div>{formatDateRange(record.startDate, record.endDate)}</div>;
      },
    },
    {
      title: "Historical Performance",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "#fda729"; // Default color if less than 50
        let percent = 34;

        if (percent > 50) {
          color = "green"; // Set to green if greater than 50
        }

        return (
          <div className="flex flex-col justify-center items-start">
            <Progress percent={percent} status="active" strokeColor={color} />
            <p className="font-semibold">PKR 1000 / PKR 1000</p>
          </div>
        );
      },
      width: 300,
    },
    {
      title: "Kpi ",
      dataIndex: "kpi",
      key: "kpi",
      render: (status, record) => {
        return <div>{record?.kpi || "4.5"}</div>;
      },
    },
    {
      title: "Slaes Comission ",
      dataIndex: "comission",
      key: "kpi",
      render: (status, record) => {
        return <div>{record?.comission || "4000"}</div>;
      },
    },
    {
      title: "Action",
      className: "w-fit lg:w-[12.5vw] action-column text-xs",
      key: "action",
      render: () => (
        <div style={{ fontSize: "40px", color: "#6B6B6B" }}>
          <ThreeDots />
        </div>
      ),
      width: 20,
    },
  ];
};
