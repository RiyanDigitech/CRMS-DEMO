import { Popover, Spin, TableColumnsType } from "antd";
import { UpdateUserType } from "@/lib/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { CustomersListType } from "@/lib/types/customer";
import CustomersService from "@/services/customers/customers.service";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
const CustomerDetailsColumns = (): TableColumnsType<CustomersListType> => {
  // const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [selectedId, setselectedId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  // const toggleExpand = (userId: number) => {
  //   setExpandedRowId((prev) => (prev === userId ? null : userId));
  // };
  const { useHandleDeleteCustomer } = CustomersService();
  const { reset } = useForm<UpdateUserType>();
  const { mutate: deleteCustomer, isPending } = useHandleDeleteCustomer(
    reset,
    selectedId
  );

  const handleDeleteTeams = (teamId: number) => {
    setselectedId(teamId);
    deleteCustomer();
  };
  return [
    {
      title: "Name",
      className: "w-[30vw] sm:w-fit lg:w-fit",
      key: "name",
      ellipsis: true,
      render: (record) => (
        <div className="flex items-center w-fit lg:w-fit  pr-5 sm:pr-0 ">
          <div className="hidden md:block rounded-full h-10 w-10">
            <img className="h-full w-full" src="/users.png" alt="users" />
          </div>
          <div className="ml-2">{`${record?.name}`}</div>
        </div>
      ),
    },
    {
      title: "Email ",
      className: "w-[140px] lg:w-fit  ",
      dataIndex: "email",
      key: "email",
      // ellipsis: true,

      render: (email) => (
        <div className="  rounded-md pr-4 lg:pr-0 ">{email ? email : "-"}</div>
      ),
    },
    {
      title: "City",
      className: "w-[130px] lg:w-[9vw] xxl:w-fit",

      dataIndex: "city",
      key: "city",

      render: (city) => (
        <div className="  rounded-md pr-4 lg:pr-0 w-fit ">{city}</div>
      ),
    },

    {
      title: "Status",
      className: "w-[130px] lg:w-fit  ",
      dataIndex: "status",
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
    {
      title: "Country",
      className: "w-[130px] lg:w-fit  ",

      dataIndex: "country",
      key: "country",

      render: (country: string) => <div className="">{country}</div>,
    },
    {
      title: "Action",
      key: "action",
      className: "w-[140px] lg:w-fit",
      render: (record) => {
        const content = (
          <div className="flex">
            <p
              className="text-lg cursor-pointer "
              onClick={() => {
                navigate(`/customer-details/${record.id}`);
              }}
            >
              <IoEyeOutline className="text-[#008444]" />
            </p>
            <p
              onClick={() => {
                navigate(`/customer-edit-profile/${record.id}`);
              }}
              className=" mx-2 text-lg cursor-pointer"
            >
              {" "}
              <FaRegEdit className="text-blue-400" />
            </p>
            <p
              onClick={() => {
                handleDeleteTeams(record.id);
              }}
              className="text-lg cursor-pointer"
            >
              {isPending ? (
                <>
                  <Spin />
                </>
              ) : (
                <BsTrash3Fill className="text-red-400" />
              )}
            </p>
          </div>
        );
        return (
          <Popover placement="right" content={content}>
            <BsThreeDotsVertical style={{ cursor: "pointer" }} />
          </Popover>
        );
      },
    },
  ];
};

export default CustomerDetailsColumns;
