import "../../../index.css";
import { useParams } from "react-router-dom";
import CustomersService from "@/services/customers/customers.service";
import { Pagination, Table } from "antd";
import CustomerSelectedOrders from "@/components/modules/trade-customer/customer-selected-order-list";
import { useState } from "react";
import { Order } from "@/lib/types/sales-orders";
import { Note } from "@/pages/customers/customer-edit-profile";

const CustomerDetailsProfile = () => {
  const { id } = useParams();
  const [limit, setCustomersLimit] = useState<number>(10);
  const [page, setCustomersCurrentPage] = useState<number>(1);

  const numericId = id ? parseInt(id) : undefined;

  const { useFetchTargetedCustomer } = CustomersService();
  const { data: selectedCustomerData, isLoading: isCustomerDataLoading } =
    useFetchTargetedCustomer(numericId, limit, page);

  // console.log(
  //   "customerdetailspage",
  //   selectedCustomerData?.data?.orders[0]?.length
  // );
  const totalResults = selectedCustomerData?.total || 0;

  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;
  const GetAllOrders = () => {
    setCustomersLimit(totalResults);
    setCustomersCurrentPage(1);
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setCustomersCurrentPage(page);
    if (pageSize) setCustomersLimit(pageSize);
  };
  const flattenedOrders = selectedCustomerData?.data?.orders?.flat() || [];
  console.log(
    "checking type",
    "page",
    page,
    typeof page,
    "limit",
    limit,
    typeof limit
  );
  return (
    <div className="w-full flex flex-col justify-between lg:flex-row">
      <div className="left w-[100%] lg:w-[29%] ">
        {" "}
        <div className=" bg-white p-6 rounded-lg font-manrope">
          <h2 className="text-xl font-bold mb-4 text-[#18120f]">My Profile</h2>
          <div className="flex items-center mb-6 translate-x-[-7px]">
            <div className="w-20 h-20 rounded-full  relative">
              {" "}
              <img
                src={"/logo.png"}
                alt="Profile"
                className="h-full w-full rounded-full obj"
                onLoad={(e) =>
                  URL.revokeObjectURL((e.target as HTMLImageElement).src)
                }
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-[#18120f]">
                {selectedCustomerData?.data?.name}
              </h3>
              <p className="text-[#6B6B6B] text-sm">Customer</p>
            </div>
          </div>
          <div className="flex justify-between border-b-[1px] pb-3 mt-3">
            <div className="text-[#6B6B6B]">Full Name:</div>
            <div className="text-[#18120f]">
              {" "}
              {selectedCustomerData?.data?.name}
            </div>
          </div>
          <div className="flex justify-between border-b-[1px] pb-3 mt-4  w-full">
            <div className="text-[#6B6B6B] w-fit">Email :</div>
            <div className="text-[#18120f] text-sm w-fit text-right  break-words">
              {selectedCustomerData?.data?.email}
            </div>
          </div>{" "}
          <div className="flex justify-between border-b-[1px] pb-3 mt-4  w-full">
            <div className="text-[#6B6B6B] w-fit">Phone Number :</div>
            <div className="text-[#18120f] text-sm w-fit text-right  break-words">
              {selectedCustomerData?.data?.phoneNumber}
            </div>
          </div>{" "}
        </div>
        <div className="bg-white py-4 px-3 mt-5 rounded-lg font-manrope">
          <div className="text-lg font-bold text-[#18120f]">
            Notes On Customer
          </div>
          <div>
            <textarea
              name=""
              rows={4}
              placeholder="Add Notes"
              id=""
              className="w-full border-[1px] p-2 mt-2 rounded-lg bg-[#fafafa] border-[#ebf0ed] focus:border-[#ebf0ed]"
            ></textarea>
          </div>{" "}
          {selectedCustomerData?.data?.notes?.map(
            (data: Note, index: number) => (
              <>
                <div
                  key={index}
                  className="border-b-[1px] mb-6  w-full break-words mt-2"
                >
                  <div className="mb-2"> {data?.note}</div>
                </div>
              </>
            )
          )}
        </div>
      </div>
      <div className="right bg-white p  lg:w-[69%] right  rounded-lg p-2 lg:p-6">
        <div className="font-manrope text-lg font-semibold mb-2">
          Customer-Selected-Orders
        </div>
        <div className="border-[1px] rounded-lg border-[#ebf0ed]">
          {" "}
          <Table<Order>
            columns={CustomerSelectedOrders()}
            dataSource={flattenedOrders}
            loading={isCustomerDataLoading}
            pagination={false}
            className="overflow-auto "
          />{" "}
          <div className="flex justify-between items-center mt-4 p-4 border-t flex-col md:flex-row">
            <div className="text-sm text-gray-600 mb-5 md:mb-0">
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
              showSizeChanger={false} // Enable page size changer
              size="small"
            />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CustomerDetailsProfile;
