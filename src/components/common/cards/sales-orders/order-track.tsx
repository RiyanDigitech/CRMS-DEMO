import React from "react";

interface OrdersCardsProps {
  iconpath: string;
  orderstatus: string;
  orderstatusdetails: string;
  time: string;
}

const OrderTrack: React.FC<OrdersCardsProps> = ({
  iconpath,
  orderstatus,
  orderstatusdetails,
  time,
}) => {
  return (
    <div>
      <div className="flex items-start mb-6 relative">
        <div
          className={`absolute left-7 top-15 w-[2px] h-[25px] md:h-15 bg-gray-300 md:left-8 md:top-17 xmd:top-15 xmd:h-[25px] ${
            orderstatus === "Delivered" ? "hidden" : "block"
          }`}
        ></div>
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-15 h-15 md:w-17 md:h-17 xmd:w-15 xmd:h-15 border-[1px] border-green-500   rounded-lg">
            <span className="text-xl">
              <svg
                width="60"
                height="60"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="70"
                  height="70"
                  rx="10"
                  fill="white"
                  stroke="#008444"
                />
                <path d={iconpath} fill="#008444" />
              </svg>
            </span>
          </div>
        </div>
        <div className="ml-4">
          <h4 className="text-md font-semibold">{orderstatus}</h4>
          <p className="text-sm text-gray-500">{orderstatusdetails}</p>
          <p className="text-sm text-gray-400">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTrack;
