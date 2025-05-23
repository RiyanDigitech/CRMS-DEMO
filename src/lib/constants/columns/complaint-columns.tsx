import { Dropdown } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { complaintType } from "@/lib/types/complaints";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";

export const ComplaintTableColumns = (
  onEdit: (id: number) => void,
  onView: (id: number) => void
): TableColumnsType<complaintType> => {
  const getMenuItems = (record: complaintType): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <IoEyeOutline className="text-blue-400" />
          <span>View</span>
        </span>
      ),
      onClick: () => onView(record.id),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <FaRegEdit className="text-blue-400" />
          <span>Edit</span>
        </span>
      ),
      onClick: () => onEdit(record.id),
    },
    // {
    //   key: "3",
    //   label: (
    //     <span className="flex items-center gap-2">
    //       <BsTrash3Fill className="text-red-400" />
    //       <span>Delete</span>
    //     </span>
    //   ),
    // },
  ];

  return [
    {
      title: "ID",
      dataIndex: "complaintNo",
      key: "complaintNo",
      render: (id) => `${id}`,
      responsive: ["lg"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      className: "w-[130px] lg:w-fit",
      dataIndex: "complaintStatus",
      key: "complaintStatus",
      render: (status: string) => (
        <div
          className={`flex items-center  justify-around w-fit sm:w-fit lg:w-fit ${
            status.toLocaleLowerCase() === "pending"
              ? "bg-[#feefcb]"
              : status.toLocaleLowerCase() === "inprogress"
              ? "bg-[#d9f5fd]"
              : status.toLocaleLowerCase() === "closed"
              ? "bg-[#ffebee]"
              : status.toLocaleLowerCase() === "resolved"
              ? "bg-[#e9f5ce]"
              : "bg-[#ffecee]"
          } px-3 py-1 rounded-full border border-gray-300`}
        >
          <div
            className={`h-3 w-3 rounded-full ${
              status.toLocaleLowerCase() === "pending"
                ? "bg-[#FFF176]"
                : status.toLocaleLowerCase() === "inprogress"
                ? "bg-[#FFB74D]"
                : status.toLocaleLowerCase() === "resolved"
                ? "bg-[#81C784]"
                : status.toLocaleLowerCase() === "closed"
                ? "bg-[#FF8A65]"
                : status.toLocaleLowerCase() === "rejected"
                ? "bg-[#E57373]"
                : "bg-[#FF8A65]"
            }`}
          ></div>
          <span className="text-black text-[12px] mx-2">{status}</span>
        </div>  
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return <div>{moment(createdAt).format("MMM DD, YYYY")}</div>;
      },
    },
    {
      title: "Days Open",
      dataIndex: "daysOpen",
      key: "daysOpen",
      render: (daysOpen: number) => (
        <div className={` ${daysOpen > 10 ? "text-red-500" : ""}`}>
          {daysOpen}
        </div>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (assignedTo) =>
        assignedTo
          ? `${assignedTo.firstName} ${assignedTo.lastName}`
          : "Unassigned",
    },
    {
      title: "",
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
