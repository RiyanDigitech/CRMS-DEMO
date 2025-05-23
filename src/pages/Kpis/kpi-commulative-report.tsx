import { useEffect, useState } from "react";
import { Table, Pagination, Input } from "antd";
import "../../index.css";
import KpiService from "@/services/kpi/kpi.service";
import tokenService from "@/services/token.service";
import KpiManagementCommulativeReportColumns from "@/lib/constants/columns/kpi-commulative-report";
import KpiManagementSalesPersonCommulativeReportColumns from "@/lib/constants/columns/kpi-salesperson-commulative";
import { Weight } from "lucide-react";
import { Filter } from "@/components/iconComponents";
import KpiFiltersModal from "@/components/kpi/kpi-filter-modals";
import RolesService from "@/services/roles/roles.services";
import { IoSearchOutline } from "react-icons/io5";

export default function CommulativeKpiDetailsReport() {
  const { useFetchAllKpis } = KpiService();
  const [UsersLastPage, setUsersLastPage] = useState<number>(1);
  const [see, setSee] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const ShowFilterModal = () => {
    setIsFilterModalOpen(true);
  };
  const [roleId, setUsersSelectedroleId] = useState<string | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);

  const { data: userData, isFetching: isUserDataLoading } = useFetchAllKpis(
    roleId,
    query
  );

  const totalResults = userData?.total || 0;
  const loggedinUserDetails = tokenService.getUser();
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

  const GetAllUsers = () => {
    setUsersSelectedroleId(undefined);
    setUsersQuery(undefined);
  };

  const tabs = [
    { id: 1, label: "Reporting Manager" },
    { id: 2, label: "Sales Person" },
  ];

  // Set "Head of Sales" as default selected tab
  const [activeTab, setActiveTab] = useState(1);
  const dataTable = [
    {
      id: 1,
      salesperson: "Ahmed",
      manager: "Khan",
      //   kpi: "DSO",
      satrtDate: "2023-01-01",
      endDate: "2023-12-31",
      operatingunit: "Faisalabad-OU	",
      region: "South",
      customersegment: "Export",
      rating: "A+",
      designation: "Nationals Sales Manager",
      type: "Sales",
    },

    {
      id: 3,
      salesperson: "Javed",
      manager: "Muhammad Faisal",
      //   kpi: "Sales Trade",
      satrtDate: "2023-01-01",
      endDate: "2023-12-31",
      operatingunit: "Faisalabad-OU	",
      region: "South",
      customersegment: "Export",
      rating: "A",
      designation: "Regional Manager",
      type: "Sales",
    },
    {
      id: 4,
      salesperson: "Ahsan",
      manager: "Muhammad Faisal",
      //   kpi: "CM",
      satrtDate: "2023-01-01",
      endDate: "2023-12-31",
      operatingunit: "Faisalabad-OU	",
      region: "South",
      customersegment: "Export",
      rating: "B",
      designation: "Regional Manager",
      type: "Project",
    },
    {
      id: 5,
      salesperson: "Ahsan",
      manager: "Muhammad Faisal",
      //   kpi: "Active Dealers",
      satrtDate: "2023-01-01",
      endDate: "2023-12-31",
      operatingunit: "Faisalabad-OU	",
      region: "South",
      customersegment: "Export",
      rating: "B",
      designation: "Branch Manager",
      type: "Sales",
    },
  ];
  const salespersonDataTable = [
    {
      id: 4,
      salesperson: "Ahsan",
      manager: "Muhammad Faisal",
      kpi: "CM",
      target: 12,
      actual: 24,
      score: 85,
      weight: 15,
      //   satrtDate: "2023-01-01",
      //   endDate: "2023-12-31",
      //   operatingunit: "Faisalabad-OU	",
      //   region: "South",
      //   customersegment: "Export",
      rating: "B",
      designation: "Regional Manager",
      type: "Project",
    },
    {
      id: 5,
      salesperson: "Ahsan",
      manager: "Muhammad Faisal",
      kpi: "DSO",
      target: 12,
      actual: 24,
      score: 85,
      weight: 45,
      rating: "B",
      designation: "Regional Manager",
      type: "Project",
    },
    {
      id: 6,
      salesperson: "Ahsan",
      manager: "Muhammad Faisal",
      kpi: "Sales Trade",
      target: 12,
      actual: 24,
      score: 85,
      weight: 40,
      rating: "A",
      designation: "Branch Manager",
      type: "Project",
    },
  ];
  const handleFilterCloseModal = () => {
    setIsFilterModalOpen(false);
  };
  const { useFetchAllRoles } = RolesService();

  const { data: roleData } = useFetchAllRoles();

  console.log(activeTab, "activeTab");
  return (
    <div className="bg-white rounded-lg py-4  ">
      {" "}
      {
        <KpiFiltersModal
          isOpen={isFilterModalOpen}
          onClose={handleFilterCloseModal}
          data={roleData?.data}
          setUsersSelectedroleId={setUsersSelectedroleId}
        />
      }
      <div className=" border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg  user-mgmt-table lg:mb-5 py-5">
        <div className="flex justify-between  items-center">
          {" "}
          <div>
            {tabs.map((tab) => (
              <>
                <button
                  key={tab.id}
                  className={`px-5 py-2 rounded-md cursor-pointer text-base transition-colors duration-300 ml-3 ${
                    activeTab === tab.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>{" "}
              </>
            ))}
          </div>{" "}
          <div className=" w-5/12">
            <Input
              className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
              // onChange={handleSearchChange}
              size="large"
              placeholder="Search..."
              prefix={
                <IoSearchOutline className="text-[#008444] text-[14px]" />
              }
            />
          </div>
          <div>
            {" "}
            <button
              onClick={() => ShowFilterModal()}
              className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] mr-4"
            >
              <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
                <Filter />{" "}
              </div>
              <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
            </button>
          </div>
        </div>
        {activeTab === 1 ? (
          <>
            <Table<any>
              columns={KpiManagementCommulativeReportColumns()}
              dataSource={dataTable}
              loading={isUserDataLoading}
              pagination={false}
              className="overflow-auto"
            />
          </>
        ) : (
          <>
            <Table<any>
              columns={KpiManagementSalesPersonCommulativeReportColumns()}
              dataSource={salespersonDataTable}
              loading={isUserDataLoading}
              pagination={false}
              className="overflow-auto"
            />
          </>
        )}
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
