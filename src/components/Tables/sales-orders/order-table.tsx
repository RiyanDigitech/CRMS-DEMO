import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import "../../../index.css";
import OrderTableColumns from "@/lib/constants/columns/orders-list";
interface DataType {
  key: React.Key;
  orderid: number;
  customer: string;
  amount: number;
  paymentmethod: string;
  orderdate: string;
  status: string;
}

const data: DataType[] = [
  {
    key: "1",
    orderid: 1001,
    customer: "John Brown",
    amount: 120,
    paymentmethod: "Card",
    orderdate: "2023-04-02",
    status: "New",
  },
  {
    key: "2",
    orderid: 1002,
    customer: "Jim Green",
    amount: 90,
    paymentmethod: "Cash",
    orderdate: "2023-04-01",
    status: "Completed",
  },
  {
    key: "3",
    orderid: 1003,
    customer: "Joe Black",
    amount: 60,
    paymentmethod: "Card",
    orderdate: "2023-03-30",
    status: "Cancelled",
  },
  {
    key: "4",
    orderid: 1004,
    customer: "Jim Red",
    amount: 140,
    paymentmethod: "Cash",
    orderdate: "2023-03-25",
    status: "In Progress",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log("selectedRowKeys: ", selectedRowKeys);
    console.log("selectedRows: ", selectedRows);
  },
};

const OrderTable: React.FC = () => (
  <Table<DataType>
    className="border-[1px] border-[#EBF0ED] rounded-lg overflow-auto ordertablecontainer"
    rowSelection={{
      type: "checkbox",
      ...rowSelection,
    }}
    columns={OrderTableColumns()}
    dataSource={data}
    onChange={onChange}
    style={{
      backgroundColor: "#ffffff",
    }}
  />
);

export default OrderTable;
