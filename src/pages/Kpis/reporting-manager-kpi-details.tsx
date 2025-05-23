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
import CommulativeKpiDetailsReport from "./kpi-commulative-report";
import SalesPersonsKpiDetails from "../team-management/sales-persons-kpi-details";
import KpiDetails from "./kpi-details";
import KpiManagments from "./national-sales-manager-kpi";

export default function KpiManagmentReportingManager() {
  const { useFetchAllKpis } = KpiService();
  const { useFetchAllRoles } = RolesService();
  const [UsersLastPage, setUsersLastPage] = useState<number>(1);
  const [see, setSee] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roleId, setUsersSelectedroleId] = useState<string | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(2);
  const [limit, setLimit] = useState<number>(2);

  const { data: userData, isFetching: isUserDataLoading } = useFetchAllKpis(
    roleId,
    query,
    page,
    limit
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
  console.log("userData", userData);
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
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
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
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
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
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
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
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
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
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
    },
  ];
  return (
    <>
      <div className="bg-white rounded-lg py-4 lg:p-4 ">
        {
          <KpiFiltersModal
            isOpen={isFilterModalOpen}
            onClose={handleFilterCloseModal}
            data={roleData?.data}
            setUsersSelectedroleId={setUsersSelectedroleId}
          />
        }
        <div className="flex justify-between pl-1 ">
          <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[100%] mb-3">
            <Input
              className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
              onChange={handleSearchChange}
              size="large"
              placeholder="Search..."
              prefix={
                <IoSearchOutline className="text-[#008444] text-[14px]" />
              }
            />
          </div>
          {/* <button
            onClick={exportToExcel}
            className="mb-3 w-[26%] sm:w-[15%] lg:w-[10%] flex items-center justify-center border-[2px] border-[#edf2ef] rounded-lg md:px-1 md:py-2 bg-[#fafafa] text-[#008444] font-medium lg:px-4 lg:py-3"
          >
            <LuArrowDownToLine />
            <span className="md:ml-2">Export</span>
          </button>{" "} */}
          {<KpiCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />}
          {/* <button
            onClick={() => ShowModal()}
            className="mb-3 w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-3"
          >
            Create Kpi
          </button> */}
        </div>
        <div className="create-users-modals"></div>
        <div className="w-full flex justify-between items-center mt-2 flex-wrap ">
          <div
            className="w-full   xmd:w-[20vw]  ml-1 lg:w-[40vw] flex justify-between items-center
            text-[#6B6B6B] font-semibold  md:px-0"
          >
            {query ? (
              ""
            ) : roleId ? (
              <button className="mb-4 md:mb-0 flex justify-between items-center">
                <div className="text-[#008444] text-md font-semibold md:text-[12px]">
                  {userData?.data && userData?.data[0]?.role}
                </div>
                <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
                  ({userData?.total || 0})
                </div>
              </button>
            ) : (
              <button className="mb-4 md:mb-0 flex justify-between items-center">
                <div className="text-[#008444] text-md xsm:text-[10px] font-semibold md:text-[10px]">
                  KPIS
                </div>
                <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
                  ({userData?.total || 0})
                </div>
              </button>
            )}
          </div>
          <div className="flex justify-between items-center  ">
            {/* {see ? (
            <>
              <button
                onClick={() => GoToAllDetailsKpi()}
                className=" w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-5"
              >
                Get All Kpi
              </button>{" "}
            </>
          ) : (
            ""
          )} */}

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
        </div>
        <hr className="my-3 lg:my-6" />
        <div className=" border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table lg:mb-5">
          <Table<any>
            columns={KpiManagementDetailsColumns()}
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
    </>
  );
}
