import { Table } from "antd";
import { salesActivityType } from "@/lib/types/sales-activity";
import { SalesActivityColumns } from "@/lib/constants/columns/sales-activity-columns";
import { TableProps } from "antd/es/table";
import "../../../index.css";



const onChange: TableProps<salesActivityType>["onChange"] = (
  pagination,
  sorter,
  extra
) => {
  console.log("params", pagination, sorter, extra);
};


const SalesTargetTable = ({
  data,
  isLoading,
}: {
  data: salesActivityType[] | undefined;
  isLoading: boolean;
}) => (
  <Table<salesActivityType>
    loading={isLoading}
    className="border-[2px] border-[#EBF0ED] rounded-xl overflow-auto ordertablecontainer"
   
    columns={SalesActivityColumns()}
    dataSource={data}
    scroll={{ x: "max-content" }} 
    onChange={onChange}
    style={{
      backgroundColor: "#ffffff",
    }}
  />
);

export default SalesTargetTable;
