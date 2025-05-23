import { Table, Button, Space } from "antd";
import { Tax } from "@/lib/types/settings";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface TaxRulesTableProps {
  rules: Tax[];
  onEdit: (rule: Tax) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export function TaxRulesTable({
  rules,
  onEdit,
  onDelete,
  loading,
}: TaxRulesTableProps) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Yes" : "No"),
    },
    {
      title: "Min Amount",
      dataIndex: ["criteria", "minAmount"],
      key: "minAmount",
      render: (value: number) => value || "-",
    },
    {
      title: "Max Amount",
      dataIndex: ["criteria", "maxAmount"],
      key: "maxAmount",
      render: (value: number) => value || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Tax) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={rules}
      rowKey="id"
      pagination={false}
    />
  );
}
