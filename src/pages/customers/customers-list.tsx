import { useState } from "react";
import CustomersService from "@/services/customers/customers.service";
import "../../index.css";
import { Input, Pagination, Table } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { LuArrowDownToLine } from "react-icons/lu";
import { Filter } from "@/components/iconComponents";
import { CustomersListType } from "@/lib/types/customer";
import CustomerDetailsColumns from "@/lib/constants/columns/customer-columns";
// import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import CustomerFiltersModal from "@/components/modules/trade-customer/customer-filters";

export default function CustomersDetails() {
  const { useFetchAllCustomers } = CustomersService();
  const [limit, setUsersLimit] = useState<number>(5);
  const [page, setUsersCurrentPage] = useState<number>(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setSelectedStatus] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  // const navigate = useNavigate();
  const { data: getAllCustomers, isFetching: isUserDataLoading } =
    useFetchAllCustomers(limit, page, query, status);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersQuery(e.target.value);
    // setSelectedStatus("");
  };
  console.log(getAllCustomers, isUserDataLoading, "getAllCustomers");
  const totalResults = getAllCustomers?.total || 0;

  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;
  const handlePageChange = (page: number, pageSize?: number) => {
    setUsersCurrentPage(page);
    if (pageSize) setUsersLimit(pageSize);
  };
  const GetAllUsers = () => {
    setUsersLimit(5);
    setUsersCurrentPage(1);
    setUsersQuery(undefined);
    setSelectedStatus(undefined);
  };

  console.log("selectedStatus", getAllCustomers?.data);
  // const handleCreateCustomer = () => {
  //   navigate("/create-customer"); // Navigate to the desired route
  // };
  const exportToExcel = () => {
    if (!getAllCustomers?.data) return;

    const data = getAllCustomers.data.map((customer) => ({
      CustomerId: customer?.id,
      Name: customer?.name,
      Email: customer?.email,
      phoneNumber: customer?.phoneNumber,
      country: customer?.country,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "CustomerData.xlsx");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const ShowModal = () => {
    console.log("ok modals");
    setIsModalOpen(true);
  };
  return (
    <>
      {
        <CustomerFiltersModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setSelectedStatus={setSelectedStatus}
          setUsersQuery={setUsersQuery}
        />
      }

      <div className="bg-white rounded-lg py-4 lg:p-4 ">
        <div className="flex justify-between pl-1 ">
          <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[87%] mb-3">
            <Input
              className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
              onChange={handleSearchChange}
              size="large"
              placeholder="Search Customer..."
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
          </button>{" "}
          {/* {<UsersCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />} */}
          {/* <button
            onClick={handleCreateCustomer} // Call navigation function on click
            className="mb-3 w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px]  lg:px-4 lg:py-3"
          >
            Create Customer
          </button> */}
        </div>{" "}
        <div className=" flex justify-between items-center">
          {/* <div>ok</div> */}
          {status ? (
            <>
              {" "}
              <button className="mb-4 md:mb-0 flex justify-between items-center ml-2">
                <div className="text-[#008444] text-md xsm:text-[10px] font-semibold md:text-[10px]">
                  {status}
                </div>
                <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
                  ({getAllCustomers?.total})
                </div>
              </button>
            </>
          ) : (
            <button className="mb-4 md:mb-0 flex justify-between items-center ml-2">
              <div className="text-[#008444] text-md xsm:text-[10px] font-semibold md:text-[10px] lg:text-sm">
                All Customers
              </div>
              <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
                ({getAllCustomers?.total})
              </div>
            </button>
          )}

          <button
            onClick={() => ShowModal()}
            className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] "
          >
            <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
              <Filter />{" "}
            </div>
            <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
          </button>
        </div>
        <div className="create-users-modals"></div>
        <hr className="my-3 lg:my-6" />{" "}
        <div className="w-[99%] border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table  lg:mb-5">
          <Table<CustomersListType>
            columns={CustomerDetailsColumns()}
            dataSource={
              getAllCustomers?.data
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
                All
              </button>
            </div>
            <Pagination
              current={page}
              pageSize={limit}
              total={totalResults}
              onChange={handlePageChange}
              showSizeChanger={false} // Enable page size changer
              size="small"
            />
          </div>
        </div>
      </div>
    </>
  );
}
