import React from "react";
// import OrdersService from "@/services/order/orders.services";
interface OrdersCardsProps {
  text: string;
  color: string;
  ordersvg: string;
  pendingsvg: string;
  completesvg: string;
  progresssvg: string;
  allorders: string;
  pending: string;
  completed: string;
  progress: string;
  pendingStatsData: number;
  completedStatsData: number;
  confirmedStatsData: number;
  cancelledStatsData: number;
}
const OrdersCards: React.FC<OrdersCardsProps> = ({
  text,
  color,
  ordersvg,
  pendingsvg,
  completesvg,
  progresssvg,
  allorders,
  pending,
  completed,
  progress,
  pendingStatsData,
  completedStatsData,
  confirmedStatsData,
  cancelledStatsData,
}) => {
  console.log("pendingStatsData from props", pendingStatsData);
  return (
    <div
      style={{ backgroundColor: color }}
      className={`font-manrope w-full font-medium px-[14px]  pt-[8px] pb-[11px] md:pt-[18px] md:pb-[18px] md:px-[18px] mb-5 rounded-lg lg:w-[49.3%] `}
    >
      <div>
        <div className="text-[10px] md:text-[13px] text-white font-manrope">
          {text}
        </div>
        <div className="bg-white w-full flex justify-around  rounded-lg mt-[2px] px-1 md:px-2">
          <div className="flex my-2 md:my-3  items-start ">
            <div>
              <img
                className={`mr-3 h-[15px] w-[15px] md:h-[20px] md:w-[20px] md:mt-4`}
                src={`/${ordersvg}`}
                alt="logo"
              />
            </div>
            <div className="">
              <div className="font-extrabold  text-[20px]  md:text-[24px] xmd:text-[24px] lg:text-[30px]  xl:text-[33px] text-[#18120F]">
                {" "}
                {pending === "Pending" ? pendingStatsData : 0}
              </div>
              <div className="text-[9px] text-[#6B6B6B] font-manrope font-semibold">
                {" "}
                {pending}
              </div>
            </div>
          </div>
          <div className=" w-[2px] h-[50px] my-auto border border-[#ebf0ed]  "></div>

          <div className="flex my-2 md:my-3  items-start ">
            <div>
              <img
                className={`mr-3 h-[15px] w-[15px] md:h-[20px] md:w-[20px] md:mt-4`}
                src={`/${completesvg}`}
                alt="logo"
              />
            </div>
            <div className="">
              <div className="font-extrabold  text-[20px]  md:text-[24px] xmd:text-[24px] lg:text-[30px]  xl:text-[33px] text-[#18120F]">
                {" "}
                {completed === "Completed" ? completedStatsData : 0}
              </div>
              <div className="text-[9px] text-[#6B6B6B] font-manrope font-semibold">
                {" "}
                {completed}
              </div>
            </div>
          </div>
          <div className=" w-[2px] h-[50px] my-auto border border-[#ebf0ed]  "></div>
          <div className="flex my-2 md:my-3  items-start ">
            <div>
              <img
                className={`mr-3 h-[15px] w-[15px] md:h-[20px] md:w-[20px] md:mt-4`}
                src={`/${progresssvg}`}
                alt="logo"
              />
            </div>
            <div className="">
              <div className="font-extrabold  text-[20px]  md:text-[24px] xmd:text-[24px] lg:text-[30px]  xl:text-[33px] text-[#18120F]">
                {" "}
                {progress === "Cancelled" ? cancelledStatsData : 0}
              </div>
              <div className="text-[9px] text-[#6B6B6B] font-manrope font-semibold">
                {" "}
                {progress}
              </div>
            </div>
          </div>
          <div className=" w-[2px] h-[50px] my-auto border border-[#ebf0ed]  "></div>

          <div className="flex my-2 md:my-3  items-start ">
            <div>
              <img
                className={`mr-3 h-[15px] w-[15px] md:h-[20px] md:w-[20px] md:mt-4`}
                src={`/${pendingsvg}`}
                alt="logo"
              />
            </div>
            <div className="">
              <div className="font-extrabold  text-[20px]  md:text-[24px] xmd:text-[24px] lg:text-[30px]  xl:text-[33px] text-[#18120F]">
                {" "}
                {allorders === "Confirmed" ? confirmedStatsData : 0}
              </div>
              <div className="text-[9px] text-[#6B6B6B] font-manrope font-semibold">
                {" "}
                {allorders}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCards;
