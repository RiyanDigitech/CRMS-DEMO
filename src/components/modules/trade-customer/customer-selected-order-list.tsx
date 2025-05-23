import { Order } from "@/lib/types/sales-orders";
import type { TableColumnsType } from "antd";

const CustomerSelectedOrders = (): TableColumnsType<Order> => {
  return [
    {
      title: <span className="text-sm">Id</span>,
      dataIndex: "id",
      key: "id",
      width: "12%",
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Total Amount
        </span>
      ),
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: "15%",
      // sorter: {
      //   compare: (a, b) => a.customer.localeCompare(b.customer),
      //   multiple: 3,
      // },
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Order Date
        </span>
      ),
      dataIndex: "orderDate",
      key: "orderDate",
      width: "12%",
      // ellipsis: true,
      // sorter: {
      //   compare: (a, b) => a.amount - b.amount,
      //   multiple: 2,
      // },
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Order Status
        </span>
      ),
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: "10%",
      render: (status: string) => (
        <div className="flex items-center justify-around w-fit py-[1px] px-2 sm:w-fit lg:w-fit  bg-gray-100  rounded-full border border-gray-300  lg:px-2 ">
          <div
            className={`h-3 w-3 rounded-full  ${
              status === "Pending" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></div>
          <span className="text-black mx-2  ">{status}</span>
        </div>
      ),
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Payment Status
        </span>
      ),
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: "10%",
      render: (status: string) => (
        <div className="flex items-center justify-around w-fit py-[1px] px-2 sm:w-fit lg:w-fit  bg-gray-100  rounded-full border border-gray-300  lg:px-2 ">
          <div
            className={`h-3 w-3 rounded-full  ${
              status === "inactive" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></div>
          <span className="text-black mx-2  ">
            {status === "inactive" ? "Inactive" : "Active"}
          </span>
        </div>
      ),
    },
  ];
};

export default CustomerSelectedOrders;
