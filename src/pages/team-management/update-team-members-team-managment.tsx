import { useForm } from "react-hook-form";
import TeamsService from "@/services/teams/teams.service";
import { useState } from "react";
import { LuArrowDownToLine } from "react-icons/lu";
import { Table } from "antd";
import { TableProps } from "antd";
import { updateTeamMemberType } from "@/lib/types/team";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import * as XLSX from "xlsx";

export interface DataType {
  id: number;
  userName?: string;
  firstName: string;
  lastName: string;
  key?: React.Key;

  designation: string;
}
export interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  designation: string;
  isActive?: boolean;
  key?: React.Key;
}
import "../../index.css";
import AddTeamMembersModalss from "@/components/teams/add-team-members-modals";
import UpdateTeamToAddMembers from "@/components/teams/update-team-add-members-cards";
import { Import } from "@/components/iconComponents";
import removeTeamMembersColumns from "@/lib/constants/columns/remove-team-members";
import UpdateTeamForm from "@/components/teams/update-team-form";

export default function UpdateTeamMembers() {
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const [TeamsQuery, setTeamsQuery] = useState<string>("");
  const { useHandleRemoveTeamMembersService, useFetchTargetedTeams } =
    TeamsService();
  const { data: selectedTeamData, isLoading: isTeamDataLoading } =
    useFetchTargetedTeams(numericId, TeamsQuery);
  const { handleSubmit, reset } = useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isPending } = useHandleRemoveTeamMembersService(reset);

  const data = selectedTeamData?.data?.members?.map((member: TeamMember) => ({
    ...member,
    key: member.id,
  }));
  console.log("data from targeted teams", selectedTeamData);
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const onSubmit = () => {
    const payload: updateTeamMemberType = {
      teamId: Number(numericId),
      userIds: selectedRowKeys.map((key) => Number(key)),
    };
    mutate(payload);
    setSelectedRowKeys([]);
  };
  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const exportToExcel = () => {
    if (!selectedTeamData?.data) return;

    const data = selectedTeamData?.data?.members.map((team) => ({
      FirstName: team.firstName,
      LastName: team.lastName,
      designation: team.designation,
      role: team.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersData.xlsx");
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamsQuery(e.target.value);
    console.log(e);
  };
  console.log("datas", data);
  return (
    <div className="pl-2 lg:pl-4 bg-white py-4 lg:pr-2 rounded-lg">
      <h2 className="mb-1 font-bold text-lg">{selectedTeamData?.data?.name}</h2>
      {
        <AddTeamMembersModalss
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      }

      <>
        <div>
          <UpdateTeamForm selectedTeamData={selectedTeamData} />
        </div>
        <>
          <div>
            <div
              className={`w-full flex items-center flex-col  mt-2 lg:mt-3 lg:mb-3  `}
            >
              <div className="flex w-full justify-between    my-4">
                <div className="w-[45%] sm:w-[60%] lg:w-[77%]  mb-3 ">
                  <Input
                    className="w-full text-[12px] md:py-4 border-[1px] border-[#EBF0ED]"
                    size="large"
                    placeholder="Search members..."
                    onChange={handleSearchChange}
                    prefix={
                      <IoSearchOutline className="text-[#008444] text-[14px]" />
                    }
                  />
                </div>
                <button
                  onClick={exportToExcel}
                  className="mb-3 w-[26%] sm:w-[15%] lg:w-[10%] flex items-center justify-center border-[1px] border-[#EBF0ED] rounded-lg md:px-1 md:py-3 bg-[#fafafa] text-[#008444] font-medium"
                >
                  <LuArrowDownToLine />
                  <span className="md:ml-2">Export</span>
                </button>
                <button
                  onClick={() => ShowModal()}
                  className="mb-3  w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-xs  rounded-lg md:px-3 md:py-3 text-white lg:text-[12px] font-normal md:font-semibold"
                >
                  Add Members
                </button>
              </div>
              <div
                className={`w-full   flex justify-start items-center pl-1 flex-wrap
            text-[#6B6B6B] font-semibold `}
              >
                {selectedRowKeys.length > 0 ? (
                  <>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                      <button className=" md:mb-0 flex  justify-between items-center mr-4">
                        <div className=" text-[#008444] text-[12px] font-semibold md:text-lg">
                          <AiOutlineDelete className=" text-[#008444] text-2xl font-bold md:text-lg" />
                        </div>
                        <div className="text-[12px] ml-1 md:text-[13px] mt-1 md:ml-2 text-[#6B6B6B]  ">
                          {isPending ? "loading..." : "Deleted"}
                        </div>
                      </button>
                    </form>
                  </>
                ) : (
                  ""
                )}

                <button
                  onClick={exportToExcel}
                  className=" md:mb-0 flex  justify-between items-center "
                >
                  <div style={{ fontSize: "21px", color: "#008444" }}>
                    <Import />
                  </div>
                  <div className=" text-[#6B6B6B] ml-2 text-xs font-semibold md:text-[12px]">
                    EXPORT
                  </div>
                </button>
              </div>
            </div>
          </div>
          <Table<DataType>
            className="border-[1px] rounded-lg overflow-auto ordertablecontainer mt-2 border-[#EBF0ED] h-[60vh]"
            loading={isTeamDataLoading || isPending}
            pagination={false}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={removeTeamMembersColumns()}
            dataSource={data}
            onChange={onChange}
            style={{
              backgroundColor: "#ffffff",
            }}
          />
        </>
        <div
          className={` hidden ${
            selectedTeamData && selectedTeamData?.data?.members?.length > 0
              ? ""
              : "block"
          }`}
        >
          <UpdateTeamToAddMembers onShowModals={ShowModal} />
        </div>
      </>
    </div>
  );
}
