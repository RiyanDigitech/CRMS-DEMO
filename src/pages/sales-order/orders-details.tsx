import "../../index.css";
// import OrderTrack from "@/components/common/cards/sales-orders/order-track";
import OrdersDetailsTable from "@/components/Tables/sales-orders/order-details-table";
import OrdersService from "@/services/order/orders.services";
import { Spin } from "antd";
import { useParams } from "react-router-dom";

const OrdersDetails = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useFetchTargetedOrder } = OrdersService();
  const { data: selectedOrderData, isLoading: isOrderDataLoading } =
    useFetchTargetedOrder(numericId);
  console.log("selectedorderdata", selectedOrderData);
  return (
    <>
      {isOrderDataLoading ? (
        <>
          <Spin className="flex justify-center" />
        </>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between w-full font-manrope mb-5">
          <div className="w-full  md:w-[60%] xmd:w-[68%] orders-details-table ">
            <div className="bg-white rounded-lg ml-1 md:ml-0">
              <div className="flex justify-between items-center px-[18px] pt-4">
                <div className="font-semibold text-[16px] text-[#18120F] ">
                  Order #{selectedOrderData?.data?.id}
                </div>
                <button className="bg-[#FF8548] font-semibold text-[12px] py-3 px-7 rounded-lg text-white cursor-default">
                  Invoice
                </button>
              </div>
              <div className="text-[#6b6b6b] overflow-auto">
                <OrdersDetailsTable
                  orderProducts={selectedOrderData?.data?.orderItems || []}
                />
              </div>
            </div>
            <div className="hidden  w-[100%] mt-[32px] md:flex flex-col md:mt-8 xmd:flex-row xmd:justify-between xmd:mt-8">
              <div className="hidden w-[49%] md:w-[100%] lg:block xmd:w-[49%]">
                <div className=" bg-white px-[18px] py-[14px] md:px-[10px] md:py-[7px] xmd:px-3 xmd:py-3 rounded-lg ">
                  <h2 className="text-lg font-semibold mb-2 md:mb-1 xmd:mb-2 text-[#18120F]">
                    Comment
                  </h2>
                  <textarea
                    className="w-full p-3 border md:px-1 md:py-6 xmd:py-3 border-gray-300 bg-[#fafafa] rounded-lg"
                    placeholder="Add a Note - This is a small notes section that only the seller can see."
                    rows={3}
                    disabled
                  ></textarea>
                </div>
              </div>
              <div className="w-[49%] md:w-[100%] md:order-1  md:mt-3 xmd:mt-0 xmd:w-[49%] xmd:order-0">
                <div className="w-full">
                  <img
                    src="/orders-details.png"
                    alt="img"
                    className=" object-cover rounded-lg h-[160px] xmd:h-39 w-full"
                  />
                </div>
              </div>
              {/* <div className="w-[49%]  md:w-[100%] xmd:w-[49%] xmd:order-1">
                <div className="bg-white px-[18px] py-[14px] rounded-lg   md:w-[100%] xmd:px-3 xmd:py-3">
                  <h2 className="text-lg font-semibold mb-2 md:mb-1 md:text-lg xmd:mb-2 ">
                    Shipping Details
                  </h2>
                  <div className="mb-1 flex justify-between w-full  text-[13px] font-manrope">
                    <p className="w-[40%] text-[#6b6b6b]">Full Name</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {" "}
                      {selectedOrderData?.data?.customer?.firstName}{" "}
                      {selectedOrderData?.data?.customer?.lastName}
                    </p>
                  </div>{" "}
                  <div className="mb-1 flex justify-between w-full  text-[13px]">
                    <p className="w-[40%] text-[#6b6b6b]">Address</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {" "}
                      {selectedOrderData?.data?.customer?.address}
                    </p>
                  </div>{" "}
                  <div className="mb-1 flex justify-between w-full  text-[13px]">
                    <p className="w-[40%] text-[#6b6b6b]">Phone Number</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {" "}
                      {selectedOrderData?.data?.customer?.phoneNumber}
                    </p>
                  </div>
                  <div className="mb-1 flex justify-between w-full  text-[13px]">
                    <p className="w-[40%] text-[#6b6b6b]">Email</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {selectedOrderData?.data?.customer?.email}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="hidden md:flex flex-col w-full mt-[32px] md:mt-3 xmd:flex-row xmd:justify-between xmd:mt-7">
              {/* <div className="w-[49%] md:w-[100%] md:order-1  md:mt-3 xmd:mt-0 xmd:w-[49%] xmd:order-0">
                <div className="w-full">
                  <img
                    src="../../../src/assets/sales-orders/orders-details.png"
                    alt="img"
                    className=" object-cover rounded-lg h-[160px] xmd:h-39 w-full"
                  />
                </div>
              </div> */}
            </div>
          </div>

          <div className="w-full md:w-[38%] xmd:w-[30.3%] mt-4 md:mt-0">
            <div className="righttop">
              <div className="bg-white px-[18px] pt-[18px] pb-[10px] rounded-lg  w-full md:px-4 md:pb-4  md:mb-13">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between my-2 ">
                  <span className="">Amount:</span>
                  <span>{selectedOrderData?.data?.totalAmount}</span>
                </div>
                <hr />
                <div className="flex justify-between my-2">
                  <span>Discount:</span>
                  <span>{selectedOrderData?.data?.discount}</span>
                </div>
                <hr />
                <div className="flex justify-between my-2">
                  <span>Shipping Charges:</span>
                  <span>{selectedOrderData?.data?.shippingCharge}</span>
                </div>
                <hr />
                <div className="flex justify-between my-2 ">
                  <span>Estimated Tax:</span>
                  <span>{selectedOrderData?.data?.estimatedTax}</span>
                </div>{" "}
                <hr />
                <div className="flex justify-between font-semibold text-sm mt-4">
                  <span>Total :</span>
                  <span>{selectedOrderData?.data?.subTotal}</span>
                </div>
              </div>
              <div className="mt-4 md:hidden ">
                {/* <div className="bg-white px-[18px] py-[14px] rounded-lg   md:w-[100%] xmd:px-3 xmd:py-3">
                  <h2 className="text-lg font-semibold mb-2 md:mb-1 md:text-lg xmd:mb-2 ">
                    Finance
                  </h2>

                  <div
                    // key={index}
                    className="mb-1 flex justify-between w-full  text-[13px]"
                  >
                    <p className="w-[40%]">name</p>
                    <p className="w-[55%]">Mriyansadiq</p>
                  </div>
                </div> */}
                <div className="bg-white px-[18px] py-[14px] rounded-lg   md:w-[100%] xmd:px-3 xmd:py-3">
                  <h2 className="text-lg font-semibold mb-2 md:mb-1 md:text-lg xmd:mb-2 ">
                    Payment Details
                  </h2>
                  <div className="mb-1 flex justify-between w-full  text-[13px] font-manrope">
                    <p className="w-[40%] text-[#6b6b6b]">Payment Method</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {" "}
                      {selectedOrderData?.data?.shippingMethod}
                    </p>
                  </div>{" "}
                  <div className="mb-1 flex justify-between w-full  text-[13px]">
                    <p className="w-[40%] text-[#6b6b6b]">Address</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {" "}
                      {selectedOrderData?.data?.customer?.address}
                    </p>
                  </div>{" "}
                  <div className="mb-1 flex justify-between w-full  text-[13px]">
                    <p className="w-[40%] text-[#6b6b6b]">Phone Number</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {" "}
                      {selectedOrderData?.data?.customer?.phoneNumber}
                    </p>
                  </div>
                  <div className="mb-1 flex justify-between w-full  text-[13px]">
                    <p className="w-[40%] text-[#6b6b6b]">Email</p>
                    <p className="w-[55%] text-[#18120f] font-semibold">
                      {selectedOrderData?.data?.customer?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[49%]  md:w-[100%]  ">
              <div className="bg-white px-[18px] py-[14px] rounded-lg   md:w-[100%] xmd:px-3 xmd:py-3">
                <h2 className="text-lg font-semibold mb-2 md:mb-1 md:text-lg xmd:mb-2 ">
                  Shipping Details
                </h2>
                <div className="mb-1 flex justify-between w-full  text-[13px] font-manrope">
                  <p className="w-[40%] text-[#6b6b6b]">Full Name</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {" "}
                    {selectedOrderData?.data?.customer?.firstName}{" "}
                    {selectedOrderData?.data?.customer?.lastName}
                  </p>
                </div>{" "}
                <div className="mb-1 flex justify-between w-full  text-[13px]">
                  <p className="w-[40%] text-[#6b6b6b]">Address</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {" "}
                    {selectedOrderData?.data?.customer?.address}
                  </p>
                </div>{" "}
                <div className="mb-1 flex justify-between w-full  text-[13px]">
                  <p className="w-[40%] text-[#6b6b6b]">Phone Number</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {" "}
                    {selectedOrderData?.data?.customer?.phoneNumber}
                  </p>
                </div>
                <div className="mb-1 flex justify-between w-full  text-[13px]">
                  <p className="w-[40%] text-[#6b6b6b]">Email</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {selectedOrderData?.data?.customer?.email}
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="w-[49%]  md:w-[100%] mt-5">
              <div className="bg-white px-[18px] py-[14px] rounded-lg   md:w-[100%] xmd:px-3 xmd:py-3">
                <h2 className="text-lg font-semibold mb-2 md:mb-1 md:text-lg xmd:mb-2 ">
                  Payment Details
                </h2>
                <div className="mb-1 flex justify-between w-full  text-[13px] font-manrope">
                  <p className="w-[40%] text-[#6b6b6b]">Payment Method</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {" "}
                    {selectedOrderData?.data?.shippingMethod}
                  </p>
                </div>{" "}
                <div className="mb-1 flex justify-between w-full  text-[13px]">
                  <p className="w-[40%] text-[#6b6b6b]">Address</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {" "}
                    {selectedOrderData?.data?.customer?.address}
                  </p>
                </div>{" "}
                <div className="mb-1 flex justify-between w-full  text-[13px]">
                  <p className="w-[40%] text-[#6b6b6b]">Phone Number</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {" "}
                    {selectedOrderData?.data?.customer?.phoneNumber}
                  </p>
                </div>
                <div className="mb-1 flex justify-between w-full  text-[13px]">
                  <p className="w-[40%] text-[#6b6b6b]">Email</p>
                  <p className="w-[55%] text-[#18120f] font-semibold">
                    {selectedOrderData?.data?.customer?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersDetails;
