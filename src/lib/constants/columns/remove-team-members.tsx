import type { TableColumnsType } from "antd";
import { RemoveTeamMembers } from "@/lib/types/team";

const removeTeamMembersColumns = (): TableColumnsType<RemoveTeamMembers> => {
  return [
    {
      title: <span style={{ whiteSpace: "nowrap" }}> Id</span>,
      dataIndex: "id",
      className: "w-[10vw]",
      key: "id",
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>FirstName</span>,
      dataIndex: "firstName",
      className: "w-[20vw]",
      key: "firstName",
    },
    {
      title: "LastName",
      className: "w-[20vw]",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Designation",
      dataIndex: "designation",
      className: "w-[20vw]",
      key: "designation",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      className: "w-[20vw]",
      key: "isActive",
      render: (isActive: boolean) => (
        <div className="flex items-center space-x-2 w-fit  bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
          <div
            className={`h-3 w-3 rounded-full ${
              isActive ? "bg-green-500" : "bg-gray-500"
            }`}
          ></div>
          <span className="text-black">{isActive ? "Active" : "Inactive"}</span>
        </div>
      ),
    },
  ];
};

export default removeTeamMembersColumns;
