import { Table } from "antd";
import type { TableProps } from "antd";
import "../../../index.css";
import { complaintType } from "@/lib/types/complaints";
import { ComplaintTableColumns } from "@/lib/constants/columns/complaint-columns";

const onChange: TableProps<complaintType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

interface ComplaintTableProps {
  data: complaintType[] | undefined;
  isLoading: boolean;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
}

const ComplaintTable = ({
  data,
  isLoading,
  onEdit,
  onView,
}: ComplaintTableProps) => {
  const columns = ComplaintTableColumns(onEdit, onView);

  return (
    <Table<complaintType>
      loading={isLoading}
      className="border-[2px] border-[#EBF0ED] rounded-xl overflow-auto ordertablecontainer"
      columns={columns}
      dataSource={data}
      onChange={onChange}
      style={{
        backgroundColor: "#ffffff",
      }}
    />
  );
};
export default ComplaintTable;
