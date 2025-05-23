import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import "../../../index.css";
import { salesTargetType } from "@/lib/types/sales-target";
import { SalesTargetColumns } from "@/lib/constants/columns/sales-target-columns";

const onChange: TableProps<salesTargetType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: salesTargetType[]) => {
    console.log("selectedRowKeys: ", selectedRowKeys);
    console.log("selectedRows: ", selectedRows);
  },
};

const SalesTargetTable = ({
  data,
  isLoading,
}: {
  data: salesTargetType[] | undefined;
  isLoading: boolean;
}) => (
  <Table<salesTargetType>
    loading={isLoading}
    className="border-[1px] border-[#EBF0ED] rounded-xl overflow-auto ordertablecontainer"
    columns={SalesTargetColumns()}
    dataSource={data}
    scroll={{ x: "max-content" }} // Enables horizontal scroll for overflow
    onChange={onChange}
    style={{
      backgroundColor: "#ffffff",
    }}
  />
);

export default SalesTargetTable;
