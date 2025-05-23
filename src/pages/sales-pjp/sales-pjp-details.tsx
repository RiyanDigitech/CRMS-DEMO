import SurveysService from "@/services/survey/survey.services";
import { Pagination, Spin, Table } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PJP from "@/components/pjp/pjp";
import SalesJourneyPlanDetailsColumns from "@/lib/constants/columns/sales-journey-plan-details";
import SalesPersonLocation from "@/components/modules/sales-route-location/sales-person-location";
import SalesPersonList from "@/components/modules/sales-route-location/sales-person-list";
import PJPService from "@/services/pjp/pjp";
import { useParams } from "react-router-dom";
import { JourneyPlanTableData, TaskAssignment } from "@/lib/types/pjp";
const SalesPjpDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id ? parseInt(id) : undefined;
  const [limit, setSurveysLimit] = useState<number>(7);
  const [page, setSurveysCurrenPage] = useState<number>(1);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const { useFetchAllPJP } = PJPService();
  const {
    data: PJPData,
    isLoading: isPJPDataLoading,
    refetch,
  } = useFetchAllPJP(limit, page, userId);
  const totalResults = PJPData?.total || 0;

  console.log("PJPData Details", PJPData);
  const transformedData: JourneyPlanTableData[] = useMemo(() => {
    return (
      (PJPData?.data as TaskAssignment[])?.map((item: TaskAssignment) => ({
        key: item.id,
        id: item.id,
        customer: item.customer.name,
        tasks: item.tasks.map((task) => task.name).join(", "),
      })) || []
    );
  }, [PJPData]);

  return (
    <>
      <div className="grid grid-cols-3 gap-6 mb-5">
        <div className="col-span-2 bg-white rounded-lg shadow-sm px-4 py-6">
          <h2 className="text-lg font-semibold mb-4">Customer location</h2>
          <SalesPersonLocation data={PJPData?.data || []} />
        </div>
        <div>
          {isPJPDataLoading ? (
            <>
              <div className="flex justify-center items-center ">
                <Spin />
              </div>
            </>
          ) : (
            <>
              {" "}
              <SalesPersonList data={PJPData?.data || []} />
            </>
          )}
        </div>
      </div>
      <div>
        {" "}
        {<PJP isOpen={isModalOpen} onClose={handleCloseModal} />}{" "}
        <div className="col-span-8  rounded-md survey-details-table  bg-white p-2 md:p-4 h-fit">
          <div className="flex justify-between items-center mt-3">
            <div className="text-[#18120f] text-xl font-manrope font-semibold">
              Sales Journey Plan Details
            </div>
          </div>
          <div className=" w-full  border-[#EBF0ED] rounded-lg mt-4 lg:mt-4 team-mgmt-table ">
            <Table<JourneyPlanTableData>
              columns={SalesJourneyPlanDetailsColumns()}
              dataSource={transformedData}
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
    </>
  );
};

export default SalesPjpDetails;
