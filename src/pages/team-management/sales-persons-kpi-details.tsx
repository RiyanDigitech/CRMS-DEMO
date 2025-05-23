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

export default function SalesPersonsKpiDetails() {
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
  return (
    <div className="bg-white rounded-lg py-4  ">
      {" "}
      {/* <hr className="my-3 lg:my-6" /> */}
      <div className=" border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table lg:mb-5">
        <div className="p-2">
          <div>
            <span className="text-lg font-bold ">Reporting Manager</span>{" "}
          </div>
          <div> Salman Tahir</div>
        </div>{" "}
        {/* <div className="flex p-2 gap-2 ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2 rounded-md cursor-pointer text-base transition-colors duration-300 ${
                activeTab === tab.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>{" "} */}
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
