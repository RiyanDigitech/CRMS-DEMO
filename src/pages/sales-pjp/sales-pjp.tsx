import SalesJourneyPlanColumns from "@/lib/constants/columns/sales-journey-plan-columns";
import { Pagination, Table } from "antd";
import { useState } from "react";
import PJP from "@/components/pjp/pjp";
import PJPService from "@/services/pjp/pjp";
const SalesPjp = () => {
  const [limit, setSurveysLimit] = useState<number>(7);
  const [page, setSurveysCurrenPage] = useState<number>(1);
  const { useFetchAllPJP } = PJPService();
  const {
    data: PJPData,
    isLoading: isPJPDataLoading,
    refetch,
  } = useFetchAllPJP(limit, page);
  const totalResults = PJPData?.total || 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;
  const GetAllSurveys = () => {
    setSurveysLimit(10);
    setSurveysCurrenPage(1);
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setSurveysCurrenPage(page);
    if (pageSize) setSurveysLimit(pageSize);
  };

  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {" "}
      {
        <PJP
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          refetch={refetch}
        />
      }{" "}
      <div className="col-span-8  rounded-md survey-details-table  bg-white p-2 md:p-4 h-fit">
        <div className="flex justify-between items-center mt-3">
          <div className="text-[#18120f] text-xl font-manrope font-semibold">
            Sales Journey Plan
          </div>
          <button
            onClick={() => ShowModal()}
            className="bg-[#ff8548] border-[1px] border-[#ff8548] text-white py-3 px-4 rounded-lg hover:text-orange-500 hover:bg-white"
          >
            Create PJP
          </button>
        </div>
        <div className=" w-full  border-[#EBF0ED] rounded-lg mt-4 lg:mt-4 team-mgmt-table ">
          <Table<any>
            columns={SalesJourneyPlanColumns()}
            dataSource={PJPData?.data}
            className="h-full overflow-auto rounded-lg border-[1px] border-[#EBF0ED]"
            loading={isPJPDataLoading}
            pagination={false}
          />{" "}
          <div className="flex justify-between flex-col sm:flex-row items-center mt-4 p-4 border-t">
            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
              {showTotal(totalResults)}
              <button
                onClick={GetAllSurveys}
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
  );
};

export default SalesPjp;
