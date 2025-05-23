import { useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import "../../index.css";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { Filter } from "@/components/iconComponents";
import { StockData } from "@/lib/types/stock";
import StockTakeDetailsColumns from "@/lib/constants/columns/stock-take-columns";
import StockTakeCreateModal from "@/components/stock-take/stock-take";
import StockTakeService from "@/services/stock-take/stock-take.service";
import StockTakeFiltersModal from "@/components/stock-take/stock-take-filters";
export default function StockTakeManagment() {
  const { useFetchStockTakes } = StockTakeService();
  const [limit, setUsersLimit] = useState<number>(12);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [UsersLastPage, setUsersLastPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockStatus, setstockStaus] = useState("");

  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [editData, setEditData] = useState(null);

  const { data: stockTake, isFetching: isStockTakeLoading } =
    useFetchStockTakes(limit, page, query, stockStatus);

  const totalResults = stockTake?.total || 0;
  useEffect(() => {
    if (stockTake?.lastPage) {
      setUsersLastPage(stockTake?.lastPage);
    }
  }, [stockTake?.lastPage]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setUsersCurrentPage(page);
    if (pageSize) setUsersLimit(pageSize);
    console.log(UsersLastPage);
  };

  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;
  const ShowModal = () => {
    console.log("ok modals");
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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [status, setSelectedStatus] = useState<string | undefined>(undefined);
  const GetAllUsers = () => {
    setUsersLimit(12);
    setUsersCurrentPage(1);
    setUsersQuery(undefined);
  };
  console.log("stockTake", stockTake?.data, setEditData);
  const ShowFilterModal = () => {
    console.log("ok modals");
    setIsFilterModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg py-4 lg:p-4 ">
      {" "}
      {
        <StockTakeFiltersModal
          isOpen={isFilterModalOpen}
          onClose={handleFilterCloseModal}
          setSelectedStatus={setSelectedStatus}
          setUsersQuery={setUsersQuery}
          setstockStaus={setstockStaus}
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
        <div>
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
        {
          <StockTakeCreateModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            editData={editData}
          />
        }
        <button
          onClick={() => ShowModal()}
          className="mb-3 w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-3"
        >
          Create Stock
        </button>
      </div>
      <div className="create-users-modals"></div>
      <div className=" flex justify-between items-center">
        {status ? (
          <>
            {" "}
            <button className="mb-4 md:mb-0 flex justify-between items-center ml-2">
              <div className="text-[#008444] text-md xsm:text-[10px] font-semibold md:text-[10px]">
                {status}
              </div>
              <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
                ({stockTake?.total})
              </div>
            </button>
          </>
        ) : (
          <button className="mb-4 md:mb-0 flex justify-between items-center ml-2">
            <div className="text-[#008444] text-md xsm:text-[10px] font-semibold md:text-[10px] lg:text-sm">
              Stock Take
            </div>
            <div className="text-sm ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2 bg-[#fafafa]">
              ({stockTake?.total})
            </div>
          </button>
        )}
      </div>
      <hr className="my-3 lg:my-6" />
      <div className="w-[99%] border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table  lg:mb-5">
        <Table<StockData>
          columns={StockTakeDetailsColumns()}
          dataSource={
            stockTake?.data
            // ?.filter((user) => user?.status !== "Deactivated")
            // .map((user) => ({
            //   ...user,
            //   key: user?.id,
            // }))
          }
          loading={isStockTakeLoading}
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
            showSizeChanger={false}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
