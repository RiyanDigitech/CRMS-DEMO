import { Table, Pagination } from "antd";
import TeamsService from "@/services/teams/teams.service";
import { teamType } from "@/lib/types/team";
import TeamManagementDetailsColumns from "@/lib/constants/columns/team-details";
import { useEffect, useState } from "react";
import { LuArrowDownToLine } from "react-icons/lu";
import * as XLSX from "xlsx";
import { Input } from "antd";
import TeamCreateModal from "@/components/teams/team-create-modals";
import LocationService from "@/services/Location/location";
import { IoSearchOutline } from "react-icons/io5";
import { Filter } from "@/components/iconComponents";
import tokenService from "@/services/token.service";
import UserFiltersModal from "@/components/users/user-filter-modals";
import TeamFiltersModal from "@/components/teams/team-filter";
export default function TeamManagement() {
  const [limit, setTeamsLimit] = useState<number>(5);
  const [page, setTeamsCurrentPage] = useState<number>(1);
  const [operatingUnitName, setTeamsoperatingUnitName] = useState<
    string | undefined
  >(undefined);
  const { useFetchAllTeamsKpi } = TeamsService();
  const [region, setTeamsregion] = useState<string | undefined>(undefined);
  const [customerSegment, setTeamscustomerSegment] = useState<
    string | undefined
  >(undefined);
  const [segment, setTeamsbusinessSegment] = useState<string | undefined>(
    undefined
  );
  const [reportingManagerId, setreportingManagerId] = useState<
    string | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [query, setUsersQuery] = useState<string | undefined>(undefined);

  const { useFetchAllLocations } = LocationService();
  const { data: LocationData, isLoading: isLocationDataLoading } =
    useFetchAllLocations();

  console.log("locationdata", LocationData);
  const loggedinUserDetails = tokenService.getUser();
  const { data: teamData, isLoading: isTeamDataLoading } = useFetchAllTeamsKpi(
    page,
    limit,
    reportingManagerId,
    operatingUnitName,
    customerSegment,
    region,
    segment,
    query
  );
  const exportToExcel = () => {
    if (!teamData?.data) return;

    const data = teamData?.data?.map((team) => ({
      TeamName: team.name,
      city: team.city,
      Region: team.region,
      Members: team?.members?.length,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "UsersData.xlsx");
  };
  useEffect(() => {
    if (
      loggedinUserDetails?.positionId === 8 ||
      loggedinUserDetails?.positionId === 10
    ) {
      setreportingManagerId(undefined);
    } else {
      setreportingManagerId(loggedinUserDetails?.id);
    }
  }, [teamData?.lastPage, LocationData]);

  const totalResults = teamData?.total || 0;

  const handlePageChange = (page: number, pageSize?: number) => {
    setTeamsCurrentPage(page);
    if (pageSize) setTeamsLimit(pageSize);
  };

  // const showTotal = (total: number) => {
  //   return `Showing ${Math.min(
  //     page * limit,
  //     totalResults
  //   )} of ${total} Results`;
  // };
  const showTotal = (
    total: number
    // page: number,
    // limit: number,
    // totalResults: number,
  ) => {
    const resultText = `Showing ${Math.min(
      page * limit,
      totalResults
    )} of ${total} Results`;
    return resultText;
  };
  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersQuery(e.target.value);
    console.log(e.target.value, "value");
  };

  const ShowFilterModal = () => {
    console.log("ok modals");
    setIsFilterModalOpen(true);
  };
  const handleFilterCloseModal = () => {
    setIsFilterModalOpen(false);
  };
  console.log(reportingManagerId, "reporting manager id");
  const GetAllUsers = () => {
    setUsersQuery(undefined);
    setTeamsLimit(5);
    setTeamsCurrentPage(1);
  };
  return (
    <>
      <div className=" font-manrope">
        {/* <div className="p-2 bg-white rounded-lg mb-4 lg:p-4 w-full  "> */}
        {/* <TeamFilters
            setTeamsCity={setTeamsCity}
            setTeamsArea={setTeamsArea}
            setTeamsRegion={setTeamsRegion}
            LocationData={LocationData}
          /> */}
        {/* </div> */}{" "}
        {
          <TeamFiltersModal
            isOpen={isFilterModalOpen}
            onClose={handleFilterCloseModal}
            setTeamsregion={setTeamsregion}
            setTeamscustomerSegment={setTeamscustomerSegment}
            setTeamsoperatingUnitName={setTeamsoperatingUnitName}
            setTeamsbusinessSegment={setTeamsbusinessSegment}
          />
        }
        <div className="p-2 bg-white rounded-lg mb-4 lg:p-4 w-full  ">
          <div className="flex justify-between   w-full ">
            <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[77%] mb-3">
              <Input
                className="w-full text-[12px] md:py-4 border-[#EBF0ED]"
                size="large"
                onChange={handleSearchChange}
                placeholder="Search Team..."
                prefix={
                  <IoSearchOutline className="text-[#008444] text-[14px]" />
                }
              />
            </div>
            <button
              onClick={exportToExcel}
              className="mb-3 w-[26%] sm:w-[15%] lg:w-[10%] flex items-center justify-center border-[2px] border-[#edf2ef] rounded-lg md:px-1 md:py-2 bg-[#fafafa] text-[#008444] font-medium lg:px-4 lg:py-3"
            >
              <LuArrowDownToLine />
              <span className="md:ml-2">Export</span>
            </button>
            <button
              onClick={() => ShowModal()}
              className="mb-3 w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-3"
            >
              Create Team
            </button>
          </div>
          {<TeamCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />}
          <div className="w-full  flex justify-between items-center mt-2 lg:mt-3 flex-wrap ">
            <div
              className="w-[40%] md:w-[38%] lg:w-[100%] flex justify-between items-center pl-1 flex-wrap 
            text-[#6B6B6B] font-semibold md:px-0"
            >
              <button className=" md:mb-0 flex  justify-between items-center">
                <div className=" text-[#008444] text-[8px] font-semibold md:text-[12px]">
                  ALL TEAMS
                </div>
                <div className="text-[10px] ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2  bg-[#fafafa]">
                  ({teamData?.total})
                </div>
              </button>
              <button
                onClick={() => ShowFilterModal()}
                className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] "
              >
                <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
                  <Filter />{" "}
                </div>
                <span className="text-[#6B6B6B] pl-2 font-semibold">
                  Filters
                </span>
              </button>
            </div>
          </div>
          <div className=" w-full border-[1px] border-[#EBF0ED] rounded-lg mt-4 lg:mt-6 team-mgmt-table ">
            <Table<teamType>
              columns={TeamManagementDetailsColumns()}
              dataSource={teamData?.data}
              className="h-full overflow-auto rounded-lg"
              loading={isTeamDataLoading || isLocationDataLoading}
              pagination={false}
            />
            <div className="flex justify-between flex-col sm:flex-row items-center mt-4 p-4 border-t">
              <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                {showTotal(totalResults)}
                <button
                  onClick={GetAllUsers}
                  className="ml-2 text-[#008444] cursor-pointer"
                >
                  All
                </button>
              </div>

              <Pagination
                current={page}
                pageSize={limit}
                total={totalResults}
                onChange={handlePageChange}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
