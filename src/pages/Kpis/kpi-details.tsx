import { useState } from "react";

import "../../index.css";
import KpiService from "@/services/kpi/kpi.service";
import { useParams } from "react-router-dom";
import KpiItemsCreateModal from "@/components/kpi/kpi-items";
import { FaRegEdit } from "react-icons/fa";
import KpiItemsModals from "@/components/kpi/kpi-items-modals";
export default function KpiDetails() {
  const { useFetchAllKpis } = KpiService();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useFetchKpiDetails } = KpiService();
  const { data, isLoading } = useFetchKpiDetails(numericId);

  const [roleId, setUsersSelectedroleId] = useState<number | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [updateKpiItemsData, setUpdateKpiItemsData] = useState<any>(null);
  const { data: userData, isFetching: isUserDataLoading } = useFetchAllKpis();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const handleFilterCloseModal = () => {
    setIsFilterModalOpen(false);
  };
  const handleFilterOpenModal = (items: any) => {
    console.log("items", items);
    setIsFilterModalOpen(true);
    setUpdateKpiItemsData(items);
  };
  const totalResults = userData?.total || 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const groupedItems: Record<string, any[]> =
    data?.data?.kpiItems?.reduce((acc: Record<string, any[]>, item: any) => {
      if (!acc[item.kpiName]) {
        acc[item.kpiName] = [];
      }
      acc[item.kpiName].push(item);
      return acc;
    }, {}) || {};
  console.log("data", data?.data?.type);
  return (
    <div className=" rounded-lg py-4 lg:p-4 ">
      {
        <KpiItemsCreateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          numericId={numericId}
          type={data?.data?.type}
        />
      }
      {
        <KpiItemsModals
          isOpen={isFilterModalOpen}
          onClose={handleFilterCloseModal}
          numericId={numericId}
          updateKpiItemsData={updateKpiItemsData}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
      }
      <div className="create-users-modals"></div>
      <div className="w-full flex justify-between items-center mt-2 flex-wrap ">
        <div
          className="w-full   xmd:w-[20vw]  ml-1 lg:w-full flex justify-between items-center 
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
                ({userData?.total || 0})
              </div>
            </button>
          ) : (
            <div className="flex justify-end items-center w-full">
              <button
                onClick={() => ShowModal()}
                className=" w-[25%] sm:w-[15%] lg:w-[8vw] bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px] font-semibold lg:px-4 lg:py-3"
              >
                Create Kpi Items
              </button>
            </div>
          )}
        </div>
      </div>{" "}
      {!groupedItems || Object.entries(groupedItems).length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8 font-bold text-lg">
          <img src="/usereditunselectteams.png" alt="" className="" />
          <div>No Data Found</div>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex justify-between mt-6 flex-wrap">
            {groupedItems &&
              Object.entries(groupedItems).map(([kpiName, items], ind) => (
                <div
                  key={ind}
                  className="border-[1px] rounded-lg bg-white w-[48%] mb-5 h-34 overflow-y-auto"
                >
                  <div className="flex justify-end">
                    <div className="flex justify-between  items-center pt-2 text-lg font-semibold w-7/12 ml-auto pr-2">
                      <div> {kpiName}</div>{" "}
                      <button onClick={() => handleFilterOpenModal(items)}>
                        {" "}
                        <FaRegEdit className="text-blue-400" />
                      </button>
                    </div>
                  </div>
                  {items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center mt-4 p-4 border-t flex-col md:flex-row"
                    >
                      <div>
                        <p className="text-gray-600">Target</p>
                        <p className="text-green-600 font-semibold">
                          {item?.target}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Actual</p>
                        <p className="text-black font-semibold">
                          {item?.actual}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Score</p>
                        <p className="text-blue-600 font-semibold">
                          {item?.score?.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">KpiUnit</p>
                        <p className="text-black font-semibold">
                          {item?.kpiUnit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Weightage</p>
                        <p className="text-red-500 font-semibold">
                          {item?.weightage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
