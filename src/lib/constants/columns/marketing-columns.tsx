// src/lib/constants/columns/marketing-columns.ts

import { Tag, Dropdown } from "antd";
import { useState } from "react";
import type { TableColumnsType, MenuProps } from "antd";
import { FaRegEdit } from "react-icons/fa";
import MarketingService from "@/services/marketing/marketing.service";
import { BsTrash3Fill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MarketingType, deleteMarketingType } from "@/lib/types/marketing";
import { useForm } from "react-hook-form";

interface MarketingDetailsColumnsProps {
  onEdit: (record: MarketingType) => void;
}

const MarketingDetailsColumns = ({
  onEdit,
}: MarketingDetailsColumnsProps): TableColumnsType<MarketingType> => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const { useHandleDeleteMarketingService } = MarketingService();
  const { reset } = useForm<deleteMarketingType>();

  const { mutate, isPending } = useHandleDeleteMarketingService(selectedId);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    mutate(undefined, {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error("Error deleting record:", error);
      },
    });
  };

  const getMenuItems = (record: MarketingType): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <FaRegEdit className="text-blue-400" />
          <span>Edit</span>
        </span>
      ),
      onClick: () => onEdit(record),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <BsTrash3Fill className="text-red-400" />
          <span>Delete</span>
        </span>
      ),
      onClick: () => handleDelete(record.id),
      disabled: isPending,
    },
  ];

  return [
    {
      title: <span style={{ whiteSpace: "nowrap" }}>ID</span>,
      dataIndex: "id",
      key: "id",
      width: "6%",
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Heading</span>,
      dataIndex: "heading",
      key: "heading",
      width: "12%",
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Description</span>,
      dataIndex: "description",
      key: "description",
      width: "20%",
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Type</span>,
      dataIndex: "type",
      key: "type",
      width: "8%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status) => {
        const colorMap: Record<string, string> = {
          New: "blue",
          Completed: "green",
          Active: "green",
          High: "green",
          Low: "volcano",
          Expired: "red",
          Medium: "yellow",
          Archived: "yellow",
        };
        return <Tag color={colorMap[status] || "default"}>{status}</Tag>;
      },
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Start And End Date</span>,
      dataIndex: "startDate",
      key: "startEndDate",
      width: "20%",

      render: (_, record) => (
        <span>
          {new Date(record.startDate).toLocaleDateString()} -{" "}
          {new Date(record.endDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Dropdown
          menu={{ items: getMenuItems(record) }}
          placement="topLeft"
          arrow={{ pointAtCenter: true }}
        >
          <BsThreeDotsVertical style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];
};

export default MarketingDetailsColumns;
