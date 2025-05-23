import { useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import UsersService from "@/services/users/user.service";
import { UserType } from "@/lib/types/user";
import userManagmentDetailsColumns from "@/lib/constants/columns/user-details";
import "../../index.css";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { LuArrowDownToLine } from "react-icons/lu";
import UsersCreateModal from "@/components/users/create-users-modals";
import * as XLSX from "xlsx";
import RolesService from "@/services/roles/roles.services";
import { Filter } from "@/components/iconComponents";
import UserFiltersModal from "@/components/users/user-filter-modals";
export default function UsersManagment() {
  const PositionName = "Sales Representative (SR)";
  const { useFetchAllUsers } = UsersService();
  const { useFetchAllRoles } = RolesService();
  const [limit, setUsersLimit] = useState<number>(12);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [UsersLastPage, setUsersLastPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roleId, setUsersSelectedroleId] = useState<number | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);

  const { data: userData, isFetching: isUserDataLoading } = useFetchAllUsers(
    limit,
    page,
    roleId,
    query,
    PositionName
  );
  const { data: roleData } = useFetchAllRoles();

  const totalResults = userData?.total || 0;
  useEffect(() => {
    if (userData?.lastPage) {
      setUsersLastPage(userData?.lastPage);
    }
  }, [userData?.lastPage]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setUsersCurrentPage(page);
    if (pageSize) setUsersLimit(pageSize);
  };

  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;
  const ShowModal = () => {
    setIsModalOpen(true);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "UsersData.xlsx");
  };
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const GetAllUsers = () => {
    setUsersLimit(12);
    setUsersCurrentPage(1);
    setUsersSelectedroleId(undefined);
    setUsersQuery(undefined);
  };
  const ShowFilterModal = () => {
    setIsFilterModalOpen(true);
  };
  console.log("userData user", UsersLastPage);

  return (
    <div className="bg-white rounded-lg py-4 lg:p-4 ">
      {" "}
      {
        <UserFiltersModal
          isOpen={isFilterModalOpen}
          onClose={handleFilterCloseModal}
          data={roleData?.data}
          setUsersSelectedroleId={setUsersSelectedroleId}
        />
      }
      <div className="flex justify-between pl-1 ">
        <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[77%] mb-3">
          <Input
            className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
            onChange={handleSearchChange}
            size="large"
            placeholder="Search Users..."
            prefix={<IoSearchOutline className="text-[#008444] text-[14px]" />}
          />
        </div>
        <button
          onClick={exportToExcel}
          className="mb-3 w-[26%] sm:w-[15%] lg:w-[10%] flex items-center justify-center border-[2px] border-[#edf2ef] rounded-lg md:px-1 md:py-2 bg-[#fafafa] text-[#008444] font-medium lg:px-4 lg:py-3"
        >
          <LuArrowDownToLine />
          <span className="md:ml-2">Export</span>
        </button>{" "}
        {<UsersCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />}
        <button
          onClick={() => ShowModal()}
          className="mb-3 w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-3"
        >
          Create User
        </button>
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
                ({userData?.total})
              </div>
            </button>
          ) : (
            <button className="mb-4 md:mb-0 flex justify-between items-center">
              <div className="text-[#008444] text-md xsm:text-[10px] font-semibold md:text-[10px]">
                ALL USERS
              </div>
              <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
                ({userData?.total})
              </div>
            </button>
          )}
        </div>
        <div>
          <button
            onClick={() => ShowFilterModal()}
            className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] "
          >
            <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
              <Filter />
            </div>
            <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
          </button>
        </div>
      </div>
      <hr className="my-3 lg:my-6" />
      <div className="w-[99%] border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table  lg:mb-5">
        <Table<UserType>
          columns={userManagmentDetailsColumns()}
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
            current={page}
            pageSize={limit}
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
