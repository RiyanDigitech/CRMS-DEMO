// import { Input, Form, Spin } from "antd";
// import { Controller, useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import { useEffect, useState, useMemo } from "react";
// import { Table } from "antd";
// import "../../index.css";
// import TeamsService from "@/services/teams/teams.service";
// import tokenService from "@/services/token.service";
// import TeamMembersKpiDetailsColumns from "@/lib/constants/columns/team-members-kpi-columns";
// import { getReportingManagerTableColumns } from "@/lib/constants/columns/reporting-manager-kpi-modal";

// // Interface for the table data
// interface TableData {
//   key: string;
//   salesPerson: { firstName: string; lastName: string };
//   kpiItems: Array<{
//     kpiName: string;
//     weightage: string;
//     target: number;
//     actual: number;
//     score: number;
//   }>;
// }

// export default function TeamMembersKpiDetails() {
//   const { id } = useParams();
//   const numericId = id ? parseInt(id) : undefined;
//   const { useFetchKpiTeamMembers, useFetchKpiTeamReportingManager } =
//     TeamsService();

//   const [reportingManagerId, setReportingManagerId] = useState<
//     string | undefined
//   >(undefined);
//   const [type, setSelectedType] = useState("Sales");

//   const { data, isLoading } = useFetchKpiTeamMembers(numericId, type);
//   const { data: reportingManagerData } = useFetchKpiTeamReportingManager(
//     numericId,
//     type
//   );

//   // Memoize loggedinUserDetails to prevent new references on every render
//   const loggedinUserDetails = useMemo(() => tokenService.getUser(), []);

//   const { control, handleSubmit, reset } = useForm<any>({
//     defaultValues: {
//       teamName: data?.data?.name || "-",
//       memberCount: data?.data?.members?.length || "-",
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       reset({
//         teamName: data?.data?.name || "-",
//         memberCount: data?.data?.members?.length || "-",
//       });
//       if (
//         loggedinUserDetails?.positionId === 8 ||
//         loggedinUserDetails?.positionId === 10
//       ) {
//         if (reportingManagerId !== undefined) {
//           setReportingManagerId(undefined);
//         }
//       } else {
//         if (reportingManagerId !== loggedinUserDetails?.id) {
//           setReportingManagerId(loggedinUserDetails?.id);
//         }
//       }
//     }
//   }, [data, loggedinUserDetails, reportingManagerId]);

//   // Transform the members data for the first Table
//   const transformedData: TableData[] =
//     data?.data?.members?.map((member: any, index: number) => ({
//       key: `${member.id}-${index}`,
//       salesPerson: {
//         firstName: member.firstName,
//         lastName: member.lastName,
//       },
//       kpiItems: member.kpis?.[0]?.kpiItems || [],
//     })) || [];

//   // Transform the reporting manager data for the second Table
//   // const transformedReportingManagerData = reportingManagerData
//   //   ? [
//   //       {
//   //         key: reportingManagerData.data.teamId,
//   //         salesTrade: reportingManagerData.data.kpiData["Sales Trade"] || {},
//   //         dso: reportingManagerData.data.kpiData["DSO"] || {},
//   //         activeDealer:
//   //           reportingManagerData.data.kpiData["Active Dealer"] || {},
//   //         reportingManager: reportingManagerData.data.reportingManager,
//   //         teamName: reportingManagerData.data.name,
//   //         kpiRating: reportingManagerData.data.kpiRating,
//   //       },
//   //     ]
//   //   : [];
//   // Transform the reporting manager data for the second Table
//   const transformedReportingManagerData = reportingManagerData
//     ? [
//         {
//           key: reportingManagerData.data.teamId,
//           salesTrade: reportingManagerData.data.kpiData["Sales Trade"] || {},
//           dso: reportingManagerData.data.kpiData["DSO"] || {},
//           ...(type === "Sales"
//             ? {
//                 activeDealer:
//                   reportingManagerData.data.kpiData["Active Dealer"] || {},
//               }
//             : { cm: reportingManagerData.data.kpiData["CM"] || {} }), // Conditionally add activeDealer or cm
//           reportingManager: reportingManagerData.data.reportingManager,
//           teamName: reportingManagerData.data.name,
//           kpiRating: reportingManagerData.data.kpiRating,
//         },
//       ]
//     : [];
//   return (
//     <>
//       <div>
//         {isLoading ? (
//           <div className="flex justify-center items-center">
//             <Spin />
//           </div>
//         ) : (
//           <>
//             <div className="border-[1px] rounded-lg p-3">
//               <div className="flex justify-between w-full flex-col lg:flex-row">
//                 <Controller
//                   name="teamName"
//                   control={control}
//                   rules={{ required: "Team name is required" }}
//                   render={({ field }) => (
//                     <Form.Item className="w-full sm:w-full lg:w-[48%] mb-6">
//                       <label
//                         htmlFor="teamName"
//                         className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
//                       >
//                         Team Name
//                       </label>
//                       <Input
//                         {...field}
//                         defaultValue={data?.data?.name}
//                         disabled={true}
//                         id="teamName"
//                         placeholder="Enter team name"
//                         className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
//                       />
//                     </Form.Item>
//                   )}
//                 />
//                 <Controller
//                   name="memberCount"
//                   control={control}
//                   rules={{ required: "Team name is required" }}
//                   render={({ field }) => (
//                     <Form.Item className="w-full sm:w-full lg:w-[48%] mb-6">
//                       <label
//                         htmlFor="memberCount"
//                         className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
//                       >
//                         Members Count
//                       </label>
//                       <Input
//                         {...field}
//                         id="memberCount"
//                         defaultValue={data?.data?.members?.length}
//                         disabled={true}
//                         placeholder="Enter team name"
//                         className="h-[38px] w-full bg-[#fafafa] border-[1-px] border-[#EBF0ED] mt-1"
//                       />
//                     </Form.Item>
//                   )}
//                 />
//               </div>
//             </div>
//             <div className="mt-4">
//               {" "}
//               <select
//                 value={type}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="mb-6 px-4 py-2 border  rounded-lg h-12 custom-select"
//               >
//                 <option value="Sales">Sales</option>
//                 <option value="Project">Project</option>
//               </select>
//             </div>
//           </>
//         )}
//       </div>
//       <div className="rounded-lg py-4">
//         <div className="w-[100%] border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table lg:mb-5">
//           <Table
//             columns={TeamMembersKpiDetailsColumns(type)}
//             dataSource={transformedData}
//             loading={isLoading}
//             pagination={false}
//             className="overflow-auto"
//           />
//           <Table
//             columns={getReportingManagerTableColumns(type)}
//             dataSource={transformedReportingManagerData}
//             loading={isLoading}
//             pagination={false}
//             className="overflow-auto mt-7"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import "../../index.css";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { LuArrowDownToLine } from "react-icons/lu";
import * as XLSX from "xlsx";
import RolesService from "@/services/roles/roles.services";
import { Filter } from "@/components/iconComponents";
import UserFiltersModal from "@/components/users/user-filter-modals";
import KpiService from "@/services/kpi/kpi.service";
import KpiManagementDetailsColumns from "@/lib/constants/columns/kpi-columns";
import { KpiApiResponse } from "@/lib/types/kpi";
import KpiCreateModal from "@/components/kpi/kpi-create-modals";
import tokenService from "@/services/token.service";
import { useNavigate } from "react-router-dom";
import KpiFiltersModal from "@/components/kpi/kpi-filter-modals";
import KpiManagementDetailsReportColumns from "@/lib/constants/columns/kpi-details-report";
import KpiCommulativeManagementDetailsReportColumns from "@/lib/constants/columns/kpi-commulative-reporting-manager";

export default function TeamMembersKpiDetails() {
  const { useFetchAllKpis } = KpiService();
  const { useFetchAllRoles } = RolesService();
  const [UsersLastPage, setUsersLastPage] = useState<number>(1);
  const [see, setSee] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roleId, setUsersSelectedroleId] = useState<string | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);

  const { data: userData, isFetching: isUserDataLoading } = useFetchAllKpis(
    roleId,
    query
  );
  const { data: roleData } = useFetchAllRoles();

  const totalResults = userData?.total || 0;
  const loggedinUserDetails = tokenService.getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData?.lastPage) {
      setUsersLastPage(userData?.lastPage);
    }
    if (
      loggedinUserDetails?.positionId === 8 ||
      loggedinUserDetails?.positionId === 10
    ) {
      setSee(true);
    } else {
      setSee(false);
    }
  }, [userData?.lastPage]);

  const handlePageChange = (page: number, pageSize?: number) => {};

  const showTotal = (total: number) => `Showing 10 of 20 Results`;
  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const GoToAllDetailsKpi = () => {
    navigate("/all-kpi-details");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleFilterCloseModal = () => {
    setIsFilterModalOpen(false);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersQuery(e.target.value);
  };
  const exportToExcel = () => {
    if (!userData?.data) return;

    const data = userData.data.map((user) => ({
      UserId: user?.id,
      Name: user?.firstName + user?.lastName,
      Email: user?.email,
      Designation: user?.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kpis");
    XLSX.writeFile(workbook, "KpiData.xlsx");
  };
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const GetAllUsers = () => {
    setUsersSelectedroleId(undefined);
    setUsersQuery(undefined);
  };
  const ShowFilterModal = () => {
    setIsFilterModalOpen(true);
  };
  const tabs = [
    { id: 1, label: "Head of Sales" },
    { id: 2, label: "National Sales Manager" },
    { id: 3, label: "Regional Manager" },
    { id: 4, label: "Branch Manager" },
  ];

  // Set "Head of Sales" as default selected tab
  const [activeTab, setActiveTab] = useState(1);
  const dataTable = [
    {
      id: 1,
      salesperson: "Ahmed",
      manager: "Khan",
      kpi: "DSO",
      target: 45,
      actual: 42,
      score: 107.1,
      weight: 25,
      rating: "A+",
      type: "Sales",
    },
    {
      id: 2,
      salesperson: "Wasim",
      manager: "Khan",
      kpi: "DSO",
      target: 45,
      actual: 47,
      score: 95.7,
      weight: 25,
      rating: "A",
      type: "Sales",
    },
    {
      id: 3,
      salesperson: "Javed",
      manager: "Muhammad Faisal",
      kpi: "Sales Trade",
      target: 200,
      actual: 185,
      score: 92.5,
      weight: 30,
      rating: "A",
      type: "Sales",
    },
    {
      id: 4,
      salesperson: "Ahsan",
      manager: "Muhammad Faisal",
      kpi: "CM",
      target: 25,
      actual: 22,
      score: 88.0,
      weight: 25,
      rating: "B",
      type: "Project",
    },
    {
      id: 5,
      salesperson: "Ahsan",
      manager: "Muhammad Faisal",
      kpi: "Active Dealers",
      target: 50,
      actual: 45,
      score: 90.0,
      weight: 20,
      rating: "B",
      type: "Sales",
    },
  ];
  const reportingmangerdataTable = [
    {
      id: 1,
      salesperson: "Ahmed",
      manager: "salman",
      kpi: "DSO",
      target: 45,
      actual: 42,
      score: 107.1,
      weight: 25,
      rating: "A+",
      type: "Sales",
    },
    {
      id: 2,
      salesperson: "Wasim",
      manager: "salman",
      kpi: "Active Dealer",
      target: 45,
      actual: 47,
      score: 95.7,
      weight: 25,
      rating: "A",
      type: "Sales",
    },
    {
      id: 3,
      salesperson: "Javed",
      manager: "salman",
      kpi: "Sales Trade",
      target: 200,
      actual: 185,
      score: 92.5,
      weight: 30,
      rating: "A",
      type: "Sales",
    },
    {
      id: 4,
      salesperson: "mukhtiar",
      manager: "salman",
      kpi: "CM",
      target: 25,
      actual: 22,
      score: 88.0,
      weight: 25,
      rating: "B",
      type: "Project",
    },
  ];
  return (
    <div className="bg-white rounded-lg py-4 lg:p-4 ">
      {" "}
      {
        <KpiFiltersModal
          isOpen={isFilterModalOpen}
          onClose={handleFilterCloseModal}
          data={roleData?.data}
          setUsersSelectedroleId={setUsersSelectedroleId}
        />
      }
      <div className="flex justify-between pl-1 ">
        {/* <button
          onClick={exportToExcel}
          className="mb-3 w-[26%] sm:w-[15%] lg:w-[10%] flex items-center justify-center border-[2px] border-[#edf2ef] rounded-lg md:px-1 md:py-2 bg-[#fafafa] text-[#008444] font-medium lg:px-4 lg:py-3"
        >
          <LuArrowDownToLine />
          <span className="md:ml-2">Export</span>
        </button>{" "} */}
        {<KpiCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />}
      </div>
      <div className="create-users-modals"></div>
      <div className="w-full flex justify-end items-center mt-2 flex-wrap ">
        <div className="flex justify-between items-center  "></div>
      </div>{" "}
      <div className=" border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table lg:mb-5">
        <div className="flex justify-between items-center p-4">
          <div className="">
            <div>
              <span className="text-lg font-bold ">Reporting Manager</span>{" "}
            </div>
            <div> Salman Tahir</div>
          </div>{" "}
          <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[60%] ">
            <Input
              className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
              onChange={handleSearchChange}
              size="large"
              placeholder="Search..."
              prefix={
                <IoSearchOutline className="text-[#008444] text-[14px]" />
              }
            />
          </div>{" "}
          <button
            onClick={() => ShowFilterModal()}
            className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] "
          >
            <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
              <Filter />{" "}
            </div>
            <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
          </button>
        </div>
        <Table<any>
          columns={KpiCommulativeManagementDetailsReportColumns(
            reportingmangerdataTable
          )}
          dataSource={
            reportingmangerdataTable
            // ?.filter((user) => user?.status !== "Deactivated")
            // .map((user) => ({
            //   ...user,
            //   key: user?.id,
            // }))
          }
          loading={isUserDataLoading}
          pagination={false}
          className="overflow-auto custom-bordered-table"
        />
      </div>
      <div className=" border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table lg:mb-5">
        <div className="flex justify-between items-center p-4">
          <div className="">
            <div>
              <span className="text-lg font-bold ">Members Details</span>{" "}
            </div>
          </div>{" "}
          <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[60%] ">
            <Input
              className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
              onChange={handleSearchChange}
              size="large"
              placeholder="Search..."
              prefix={
                <IoSearchOutline className="text-[#008444] text-[14px]" />
              }
            />
          </div>{" "}
          <button
            onClick={() => ShowFilterModal()}
            className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] "
          >
            <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
              <Filter />{" "}
            </div>
            <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
          </button>
        </div>
        <Table<any>
          columns={KpiManagementDetailsReportColumns()}
          dataSource={
            dataTable
            // ?.filter((user) => user?.status !== "Deactivated")
            // .map((user) => ({
            //   ...user,
            //   key: user?.id,
            // }))
          }
          loading={isUserDataLoading}
          pagination={false}
          className="overflow-auto"
        />
        <div className="flex justify-between items-center mt-4 p-4 border-t flex-col md:flex-row">
          <div className="text-sm text-gray-600 mb-5 md:mb-0">
            {showTotal(totalResults)}
            <button
              onClick={GetAllUsers}
              className="ml-2 text-[#008444] cursor-pointer"
            >
              View All
            </button>
          </div>
          <Pagination
            current={1}
            pageSize={10}
            total={totalResults}
            onChange={handlePageChange}
            showSizeChanger={false} // Enable page size changer
            size="small"
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  );
}
