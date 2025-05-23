import OrdersCards from "@/components/common/cards/sales-orders/orders-card";
import { Input, Pagination, Table } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { LuArrowDownToLine } from "react-icons/lu";
// import OrderTable from "@/components/Tables/sales-orders/order-table";
import OrdersService from "@/services/order/orders.services";
import { useState } from "react";
import { Order } from "@/lib/types/sales-orders";
import OrderManagementDetailsColumns from "@/components/modules/sales-order/order-list";
import * as XLSX from "xlsx";
import OrderFiltersModal from "@/components/modules/sales-order/order-filters";

const OrdersList = () => {
  const { useFetchAllOrders } = OrdersService();
  const [limit, setTeamsLimit] = useState<number>(5);
  const [page, setTeamsCurrentPage] = useState<number>(1);
  const [status, setSelectedStatus] = useState<string>("");
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const { useFetchOrdersStats } = OrdersService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const { data: statsData, isLoading } = useFetchOrdersStats();
  const { data: orderData, isLoading: isOrderDataLoading } = useFetchAllOrders(
    limit,
    page,
    status,
    query
  );
  const totalResults = orderData?.data?.total || 0;
  const GetAllOrders = () => {
    setTeamsLimit(50);
    setTeamsCurrentPage(1);
    setSelectedStatus("");
    setIsEmpty(true);
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setTeamsCurrentPage(page);
    if (pageSize) setTeamsLimit(pageSize);
  };
  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;

  const exportToExcel = () => {
    if (!orderData?.data) return;

    const data = orderData.data?.orders.map((order) => ({
      OrderId: order?.id,
      TotalAmount: order?.totalAmount,
      discount: order?.discount,
      estimatedTax: order?.estimatedTax,
      shippingCharge: order?.shippingCharge,
      subTotal: order?.subTotal,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "orders");
    XLSX.writeFile(workbook, "orderData.xlsx");
  };
  console.log("orderdata from orders", orderData);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersQuery(e.target.value);
  };
  console.log(statsData?.data, "statsdata");
  const ShowModal = () => {
    console.log("ok modals");
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {" "}
      {
        <OrderFiltersModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setSelectedStatus={setSelectedStatus}
          setUsersQuery={setUsersQuery}
          isEmpty={isEmpty}
        />
      }
      <div className=" px-2 font-manrope">
        <div className=" w-full lg:flex lg:justify-between ">
          <OrdersCards
            text="ORDER-STATUSES"
            color="#008444"
            ordersvg="orders.png"
            pendingsvg="orders-pending.png"
            completesvg="orders-completed.png"
            progresssvg="orders-progressive.png"
            allorders="Confirmed"
            pending="Pending"
            completed="Completed"
            progress="Cancelled"
            pendingStatsData={
              statsData?.data.pending ? statsData?.data.pending : 0
            }
            completedStatsData={
              statsData?.data.completed ? statsData?.data.completed : 0
            }
            confirmedStatsData={
              statsData?.data.confirmed ? statsData?.data.confirmed : 0
            }
            cancelledStatsData={
              statsData?.data.cancelled ? statsData?.data.cancelled : 0
            }
          />
          <OrdersCards
            text="FAILED ORDERS"
            color="#44a6e9"
            ordersvg="orders-abanded.png"
            pendingsvg="orders-returned.png"
            completesvg="orders-cancelled.png"
            progresssvg="orders-demaged.png"
            allorders="Abanded"
            pending="Returned"
            completed="Canceled"
            progress="Damaged"
            pendingStatsData={
              statsData?.data.pending ? statsData?.data.pending : 0
            }
            completedStatsData={
              statsData?.data.completed ? statsData?.data.completed : 0
            }
            confirmedStatsData={
              statsData?.data.confirmed ? statsData?.data.confirmed : 0
            }
            cancelledStatsData={
              statsData?.data.cancelled ? statsData?.data.cancelled : 0
            }
          />
        </div>
        <div className="  py-[18px] w-full bg-white rounded-lg ">
          <div className="flex justify-between px-[11px] md:px-[18px]  ">
            <div className="w-[65%] sm:w-[60%] lg:w-[88%]  mb-3">
              <Input
                className="w-full text-[12px] md:py-3.5 border-[1px] border-[#EBF0ED]"
                size="large"
                onChange={handleSearchChange}
                placeholder="Search Order..."
                prefix={
                  <IoSearchOutline className="text-[#008444] text-[14px]" />
                }
              />
            </div>
            <button
              onClick={exportToExcel}
              className="mb-3 w-[30%] sm:w-[15%] lg:w-[10%] flex items-center justify-center border-[2px] border-[#edf2ef] rounded-lg md:px-1 md:py-2.5 bg-[#fafafa] text-[#008444] font-medium"
            >
              <LuArrowDownToLine />
              <span className="md:ml-2 font-manrope font-normal border-[1px] border-[#fafafa]">
                Export
              </span>
            </button>
            {/* <button className="font-manrope mb-3 w-[24%] sm:w-[15%] lg:w-[10%] bg-[#ff8548] text-[12px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px]">
              Create Order
            </button> */}
          </div>
          <div className="w-full flex justify-between items-center mt-2 flex-wrap md:px-[18px]">
            <div
              className="w-[100%] md:w-[38%] lg:w-[49%] flex justify-between items-center px-[11px] flex-wrap 
            text-[#6B6B6B] font-semibold md:px-0"
            >
              {status ? (
                <>
                  {" "}
                  <button className="mb-4 md:mb-0 flex  justify-between items-center">
                    <div className=" text-[#008444] text-[8px] font-semibold md:text-[12px]">
                      {status}
                    </div>
                    <div className="text-[10px] ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2  bg-[#fafafa]">
                      ({orderData?.data?.total})
                    </div>
                  </button>
                </>
              ) : (
                <button className="mb-4 md:mb-0 flex  justify-between items-center">
                  <div className=" text-[#008444] text-[8px] font-semibold md:text-[12px]">
                    ALL ORDERS
                  </div>
                  <div className="text-[10px] ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2  bg-[#fafafa]">
                    ({orderData?.data?.total})
                  </div>
                </button>
              )}
            </div>
            <div>
              {/* <Dropdown menu={{ items }} placement="bottom" arrow> */}
              <button
                onClick={() => ShowModal()}
                className="hidden md:flex items-center border-[2px] border-[#edf2ef] rounded-lg px-3.5 py-2.5 bg-[#fafafa] text-[#008444] font-medium"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0234 0.375C21.832 0.375 22.5 1.04297 22.5 1.85156C22.5 2.20312 22.3594 2.51953 22.1836 2.76562L17.4375 8.84766V13.875C17.4375 14.8242 16.3477 15.3516 15.6094 14.7539L12.3398 12.1875C11.9883 11.9414 11.8125 11.5195 11.8125 11.0977V8.84766L7.03125 2.76562C6.85547 2.51953 6.75 2.20312 6.75 1.85156C6.75 1.04297 7.38281 0.375 8.19141 0.375H21.0234ZM13.5 8.53125V10.957L15.75 12.7148V8.53125C15.75 8.35547 15.7852 8.17969 15.9258 8.03906L20.5664 2.0625H8.64844L13.2891 8.03906C13.4297 8.17969 13.5 8.35547 13.5 8.53125ZM6.15234 3.46875L6.82031 4.3125H1.89844L6.53906 10.2891C6.67969 10.4297 6.75 10.6055 6.75 10.7812V12.082L9 13.8398V10.7812C9 10.6055 9.03516 10.4297 9.17578 10.2891L10.3359 8.77734L10.6875 9.23438V15C10.6875 15.9492 9.59766 16.4766 8.85938 15.8789L5.58984 13.3125C5.23828 13.0664 5.0625 12.6445 5.0625 12.2227V11.0977L0.28125 5.01562C0.105469 4.76953 0 4.45312 0 4.10156C0 3.29297 0.632812 2.625 1.44141 2.625H5.73047C5.83594 2.94141 5.97656 3.22266 6.15234 3.46875Z"
                    fill="#6B6B6B"
                  />
                </svg>
                <span className="text-[#6B6B6B] pl-2 font-semibold">
                  Filters
                </span>
              </button>
              {/* </Dropdown> */}
            </div>
          </div>
          <hr className=" my-[18px] hidden md:block bg-[#ebf0ed]" />
          <div className=" w-[97%] mx-auto border-[1px] border-[#EBF0ED] rounded-lg mt-4 lg:mt-6 team-mgmt-table ">
            <Table<Order>
              columns={OrderManagementDetailsColumns()}
              dataSource={orderData?.data?.orders}
              // dataSource={orderData?.data?.orders}
              className="h-full overflow-auto rounded-lg"
              loading={isOrderDataLoading || isLoading}
              pagination={false}
            />
            <div className="flex justify-between flex-col sm:flex-row items-center mt-4 p-4 border-t">
              <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                {showTotal(totalResults)}
                <button
                  onClick={GetAllOrders}
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
                showSizeChanger={false} // Size changer ko hide karta hai
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersList;
