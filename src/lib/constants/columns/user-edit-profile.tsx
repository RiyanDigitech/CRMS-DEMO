import { TableColumnsType } from "antd";
import { UserInvolvedInTeamsType } from "@/lib/types/user";
import "../../../index.css";

const userEditProfileTeamsColumns =
  (): TableColumnsType<UserInvolvedInTeamsType> => {
    return [
      {
        title: "Id",
        dataIndex: "id",
        className: "w-fit lg:w-[3vw]  xxl:w-fit",
        key: "id",
        render: (id: string) => (
          <div className="lg:w-fit  rounded-md ">{id}</div>
        ),
      },
      {
        title: "TeamName",
        dataIndex: "name",
        className: "w-fit lg:w-[15vw]",
        key: "name",
        render: (name: string) => (
          <div className="lg:w-fit  rounded-md ">{name}</div>
        ),
      },

      {
        title: "Status",
        dataIndex: "status",
        className: "w-fit lg:w-[12vw] xxl:w-fit",
        key: "status",
        render: (status: string) => (
          <div className="flex items-center justify-around w-fit py-[1px] px-2 sm:w-fit lg:w-fit  bg-gray-100  rounded-full border border-gray-300  lg:px-2 ">
            <div
              className={`h-3 w-3 rounded-full  ${
                status === "Deactivated" ? "bg-gray-500" : "bg-green-500"
              }`}
            ></div>
            <span className="text-black mx-2  ">
              {status === "Deactivated" ? "Inactive" : "Active"}
            </span>
          </div>
        ),
      },
    ];
  };

export default userEditProfileTeamsColumns;
