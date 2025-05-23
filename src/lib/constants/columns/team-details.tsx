import { Popover, Space, TableColumnsType } from "antd";
import { teamType } from "@/lib/types/team";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Member } from "@/lib/types/team";
import { Tooltip } from "antd";
import "../../../index.css";

import TeamsService from "@/services/teams/teams.service";
import { Spin } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";

const TeamManagementDetailsColumns = (): TableColumnsType<teamType> => {
  const navigate = useNavigate();
  // const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [selectedId, setselectedId] = useState<number | undefined>(undefined);

  const { useHandleDeleteTeams } = TeamsService();
  const { mutate: deleteTeam, isPending } = useHandleDeleteTeams(selectedId);
  const { handleSubmit, reset } = useForm<any>();

  // const toggleExpand = (teamId: number) => {
  //   setExpandedRowId((prev) => (prev === teamId ? null : teamId));
  // };
  const handleDetailsTeams = (teamId: number) => {
    navigate(`/team-details/${teamId}`);
  };
  // const handleDeleteTeams = (teamId: number) => {
  //   setTargetId(teamId);
  //   deleteTeam();
  // };
  const onSubmit: SubmitHandler<any> = (data) => {
    if (!selectedId) {
      console.error("No user ID selected!", data);
      return;
    }
    console.log("Deleting user with ID:", selectedId);
    deleteTeam();
  };
  return [
    {
      title: "Id",
      className: "w-[20vh] lg:w-fit text-sm",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Team Name",
      className: "w-[20vh] lg:w-fit text-sm",
      dataIndex: "name",
      key: "name",
      // sorter: (a, b) => a.name.localeCompare(b.name),
    },

    // {
    //   title: "Members count",
    //   className: " w-fit text-sm ",
    //   dataIndex: "members",
    //   key: "members",
    //   // sorter: (a, b) => a.members.length - b.members.length,

    //   render: (members: number) => {
    //     return <div className="w-fit">{members || "-"}</div>;
    //   },
    // },
    {
      title: "Customer-Segment",
      className: "w-[20vh] lg:w-fit text-sm",
      dataIndex: "customerSegment",
      key: "customerSegment",
      render: (customerSegment: string) => <div>{customerSegment || "-"}</div>,
    },
    {
      title: "Operating-Unit",
      className: "w-[20vh] lg:w-fit text-sm",
      dataIndex: "operatingUnit",
      key: "operatingUnit",
      render: (operatingUnit: any) => <div>{operatingUnit?.name || "-"}</div>,
    },
    // {
    //   title: "Reporting-Manager",
    //   className: "w-[20vh] lg:w-fit text-sm",
    //   dataIndex: "reportingManager",
    //   key: "reportingManager",
    //   render: (reportingManager: any) => (
    //     <div>
    //       {reportingManager?.firstName + " " + reportingManager?.lastName ||
    //         "-"}
    //     </div>
    //   ),
    // },
    {
      title: "Region",
      className: "w-[20vh] lg:w-fit text-sm",
      dataIndex: "operatingUnit",
      key: "operatingUnit",
      render: (operatingUnit: any) => (
        <div>{operatingUnit?.region.name || "-"}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      className: "w-[24vw] lg:w-fit",
      render: (record) => {
        const content = (
          <div className="flex items-center">
            <p
              className="text-lg cursor-pointer "
              // onClick={() => navigate(`/team-memebers-kpi/${record.id}`)}
            >
              <IoEyeOutline className="text-[#008444]" />
            </p>

            <p
              onClick={() => handleDetailsTeams(record.id)}
              className=" mx-2 text-lg cursor-pointer"
            >
              <FaRegEdit className="text-blue-400" />
            </p>
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
                {isPending ? (
                  <Spin />
                ) : (
                  <>
                    {" "}
                    <BsTrash3Fill className="text-red-400 text-lg" />
                  </>
                )}
              </button>
            </form>
          </div>
        );
        return (
          <Popover placement="right" content={content}>
            <BsThreeDotsVertical style={{ cursor: "pointer" }} />
          </Popover>
        );
      },
    },
    // {
    //   title: "Action",
    //   className: "w-fit lg:w-[9vw] action-column text-sm",
    //   key: "action",
    //   render: (record) => (
    //     <Space className="flex justify-start w-[33vw] sm:w-[20vw] md:w-[15vw]   lg:w-[9vw] xxl:w-fit">
    //       <div
    //         className={
    //           expandedRowId === record.id ? "flex justify-between" : "hidden"
    //         }
    //       >
    //         <div
    //           onClick={() => handleDetailsTeams(record.id)}
    //           className="h-10 w-10 cursor-pointer"
    //         >
    //           <div style={{ fontSize: "28px", color: "#6B6B6B" }}>
    //             <Edit />
    //           </div>
    //         </div>
    //         <div
    //           className="ml-2 h-10 w-10 cursor-pointer"
    //           onClick={() => handleDeleteTeams(record.id)}
    //         >
    //           {isPending ? (
    //             <>
    //               <div className="flex justify-center items-center">
    //                 <Spin className="h-full w-full flex justify-center items-center" />
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               {" "}
    //               <div style={{ fontSize: "28px", color: "#6B6B6B" }}>
    //                 <Delete />
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //       <div
    //         onClick={() => toggleExpand(record.id)}
    //         className="h-10 w-10  cursor-pointer"
    //       >
    //         <div style={{ fontSize: "28px", color: "#6B6B6B" }}>
    //           <ThreeDots />
    //         </div>{" "}
    //       </div>
    //     </Space>
    //   ),
    // },
  ];
};

export default TeamManagementDetailsColumns;
