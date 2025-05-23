import { Space, Spin, TableColumnsType } from "antd";
import { UpdateUserType, UserType } from "@/lib/types/user";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots, Delete, Edit } from "@/components/iconComponents";
import UsersService from "@/services/users/user.service";
import { SubmitHandler, useForm } from "react-hook-form";

const UserManagementDetailsColumns = (): TableColumnsType<UserType> => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [selectedId, setselectedId] = useState<number | undefined>(undefined);
  const toggleExpand = (userId: number) => {
    setExpandedRowId((prev) => (prev === userId ? null : userId));
  };

  const { useHandleDeleteUserService } = UsersService();
  const { handleSubmit, reset } = useForm<UpdateUserType>();
  const { mutate, isPending } = useHandleDeleteUserService(reset, selectedId);

  const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
    if (!selectedId) {
      console.error("No user ID selected!", data);
      return;
    }
    console.log("Deleting user with ID:", selectedId);
    mutate();
  };

  return [
    {
      title: "User Name",
      className: "w-[30vw] sm:w-fit lg:w-fit",
      key: "firstName",
      ellipsis: true,
      render: (record) => (
        <div className="flex items-center w-full lg:w-fit pr-5 sm:pr-0">
          <div className="hidden md:block rounded-full h-10 w-10">
            <img className="h-full w-full" src="/users.png" alt="users" />
          </div>
          <div>{`${record?.firstName}${" " + record?.lastName}`}</div>
        </div>
      ),
    },
    {
      title: "Email",
      className: "w-[140px] lg:w-fit",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      // sorter: (a, b) =>
      //   a.email.localeCompare(b.email, undefined, { sensitivity: "base" }),

      render: (email) => (
        <div className="  rounded-md pr-4 lg:pr-0 ">{email}</div>
      ),
    },
    {
      title: "Position",
      key: "position",
      render: (record) => (
        <div className="rounded-md pr-4 lg:pr-0">
          {record.position?.name ?? "-"}
        </div>
      ),
    },

    {
      title: "Status",
      className: "w-[130px] lg:w-fit",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="flex items-center justify-around w-fit py-[1px] px-2 sm:w-fit lg:w-fit bg-gray-100 rounded-full border border-gray-300 lg:px-2">
          <div
            className={`h-3 w-3 rounded-full ${
              status === "Deactivated" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></div>
          <span className="text-black mx-2">
            {status === "Deactivated" ? "Inactive" : "Active"}
          </span>
        </div>
      ),
    },
    {
      title: "Role",
      className: "w-[130px] lg:w-fit",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <div
          className={`flex items-center justify-around w-fit sm:w-fit lg:w-fit ${
            role === "Admin"
              ? "bg-[#f1f7ff]"
              : role === "Manager"
              ? "bg-white"
              : role?.toLowerCase()?.includes("sales")
              ? "bg-[#fff6f2]"
              : "bg-white"
          } px-3 py-1 rounded-full border border-gray-300`}
        >
          <div
            className={`h-3 w-3 rounded-full ${
              role === "Admin"
                ? "bg-[#44a6e9]"
                : role === "Manager"
                ? "bg-[#fec600]"
                : role?.toLowerCase()?.includes("sales")
                ? "bg-[#ff8548]"
                : "bg-gray-600"
            }`}
          ></div>
          <span className="text-black  text-[12px] mx-2 ">
            {" "}
            {role?.toLowerCase()?.includes("sales") ? "Sales Person" : role}
          </span>
        </div>
      ),
    },
    {
      title: "Action",
      className: "w-[140px] sm:w-[140px] lg:w-fit",
      key: "action",
      render: (record) => {
        return (
          <Space className="flex items-center w-[25vw] sm:w-fit lg:w-fit text-[30px]">
            <div
              className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
                expandedRowId === record?.id ? "flex" : "hidden"
              }`}
            >
              <Link
                to={`/edit-profile/${record?.id}`}
                className="cursor-pointer"
              >
                <div className="text-gray-600 ">
                  <Edit />
                </div>
              </Link>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setselectedId(record.id);
                  handleSubmit(onSubmit)();
                }}
                className="cursor-pointer"
              >
                <button
                  type="submit"
                  className="text-gray-600  flex items-center"
                >
                  {isPending ? <Spin /> : <Delete />}
                </button>
              </form>
            </div>

            <div
              onClick={() => toggleExpand(record.id)}
              className="cursor-pointer text-gray-600"
            >
              <ThreeDots />
            </div>
          </Space>
        );
      },
    },
  ];
};

export default UserManagementDetailsColumns;
