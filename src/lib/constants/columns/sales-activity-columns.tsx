import type { TableColumnsType } from "antd";
import { salesActivityType } from "@/lib/types/sales-activity";
import moment from "moment";
import { ThreeDots } from "@/components/iconComponents";

export const SalesActivityColumns = (): TableColumnsType<salesActivityType> => {
  return [
    {
      title: "SR No.",
      key: "serialNumber",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Sale Date",
      dataIndex: "date",
      key: "saledate",
      render: (date) => `${moment(date).format("MMM DD, YYYY")}`,

    },
    {
      title: "Next Activity",
      dataIndex: "order.orderDate",
      key: "nextactivity",
      render: (date) => `${moment(date).format("MMM DD, YYYY")}`
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => {
        return <p>{Number(amount).toLocaleString()}</p>;
      },
    },
    {
      title: "Customer",
      dataIndex: ["order", "customer"],
      key: "customer",
      render: (customer) => {
        return customer?.firstName && customer?.lastName
          ? `${customer.firstName} ${customer.lastName}`
          : "N/A";
      },
    },
    {
      title: "Full Name",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        return user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : "N/A";
      },
    },
    {
      title: "",
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

