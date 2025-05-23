import { discountType } from "@/lib/types/discount";
import { Tag } from "antd";
import type { TableColumnsType } from "antd";

export const DiscountTableColumns = (): TableColumnsType<discountType> => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `#${id}`,
      responsive: ["lg"], // Only show on large screens and above
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true, // Truncate long names
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => {
        return record.type === "Percentage" ? `${amount}%` : `$${amount}`;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Active" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Max Usage",
      dataIndex: "maxUsage",
      key: "maxUsage",
    },
    {
      title: "Used Count",
      dataIndex: "usedCount",
      key: "usedCount",
    },
    {
      title: "Valid From",
      dataIndex: "validFrom",
      key: "validFrom",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Valid Till",
      dataIndex: "validTill",
      key: "validTill",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    // {
    //   title: "Criteria",
    //   key: "criteria",
    //   render: (_, record) => {
    //     const { criteria } = record;
    //     return (
    //       <div>
    //         <div>
    //           <strong>Min Amount:</strong> ${criteria.minAmount}
    //         </div>
    //         <div>
    //           <strong>Category IDs:</strong>{" "}
    //           {criteria.categoryIds?.join(", ") || "None"}
    //         </div>
    //         <div>
    //           <strong>User IDs:</strong> {criteria.userIds?.join(", ") || "None"}
    //         </div>
    //         <div>
    //           <strong>Region IDs:</strong>{" "}
    //           {criteria.regionIds?.join(", ") || "None"}
    //         </div>
    //         <div>
    //           <strong>Product IDs:</strong>{" "}
    //           {criteria.productIds?.join(", ") || "None"}
    //         </div>
    //       </div>
    //     );
    //   },
    //   responsive: ["lg"], // Only show on large screens and above
    // },
  ];
};
