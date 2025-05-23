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
import KpiNationalSalesManagerManagementDetailsColumns from "@/lib/constants/columns/national-sales-manager-columns";

export default function KpiManagments() {
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
  return (
    <div className="bg-white rounded-lg py-4 lg:p-4 ">
      {
        <KpiFiltersModal
          isOpen={isFilterModalOpen}
          onClose={handleFilterCloseModal}
          data={roleData?.data}
          setUsersSelectedroleId={setUsersSelectedroleId}
        />
      }
      <div className="flex justify-end pl-1 ">
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
          className=" w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-5"
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
            // <button className="mb-4 md:mb-0 flex justify-between items-center">
            //   <div className="text-[#008444] text-md xsm:text-[10px] font-semibold md:text-[10px]">
            //     KPIS
            //   </div>
            //   <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
            //     ({userData?.total || 0})
            //   </div>
            // </button>
            ""
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
          {/* <button
        onClick={() => navigate(`/commulative-report`)}
        className="mb-3 w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-3 mr-3"
      >
        Commulative Report
      </button> */}
          {/* <button
        onClick={() => ShowFilterModal()}
        className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] "
      >
        <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
          <Filter />{" "}
        </div>
        <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
      </button> */}
        </div>
      </div>
      {/* <hr className="my-3 " /> */}
      {/* <SalesPersonsKpiDetails /> */}{" "}
      <div className="flex justify-between items-center my-2">
        {" "}
        <div className="p-2 font-bold text-lg">National Sales Manager</div>{" "}
        <div className=" w-7/12">
          <Input
            className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
            onChange={handleSearchChange}
            size="large"
            placeholder="Search..."
            prefix={<IoSearchOutline className="text-[#008444] text-[14px]" />}
          />
        </div>
        <button
          onClick={() => ShowFilterModal()}
          className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  "
        >
          <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
            <Filter />{" "}
          </div>
          <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
        </button>
      </div>
      <div className="w-[99%] border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table  lg:mb-5">
        <Table<KpiApiResponse>
          columns={KpiNationalSalesManagerManagementDetailsColumns()}
          dataSource={
            userData?.data
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
      </div>{" "}
      <CommulativeKpiDetailsReport />{" "}
    </div>
  );
}
