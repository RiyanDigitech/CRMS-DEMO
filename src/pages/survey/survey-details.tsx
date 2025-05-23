import TrendsChart from "@/components/modules/survey/survey-trend-chart";
import { Pagination, Spin, Table } from "antd";
import SurveyDetailsColumns from "@/lib/constants/columns/survey-details";
import { useState } from "react";
import SurveysService from "@/services/survey/survey.services";
import { Survey } from "@/lib/types/survey";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export type surveyCreateType = {
  surveyId: string;
  surveyName: string;
  surveyDescription: string;
  surveyDate: string;
  surveyStatus: string;
};
import { DatePicker } from "antd";
import moment from "moment";
import TrendsChartDateWise from "@/components/modules/survey/date-wise-trend-chart";
import TrendsChartYearWise from "@/components/modules/survey/year-wise-trend-chart";
const SurveyDetails = () => {
  const [limit, setSurveysLimit] = useState<number>(7);
  const [page, setSurveysCurrenPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [isMonthSelected, setIsMonthSelected] = useState<boolean>(true);
  const [isYearSelected, setIsYearSelected] = useState<boolean>(false);
  const [isDatewiseSelected, setIsDatewiseSelected] = useState<boolean>(false);
  const handleStartDateChange = (date: moment.Moment | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setStartDate(formattedDate);
      checkDateDifference(formattedDate, endDate);
    } else {
      setStartDate(undefined);
    }
  };

  const handleEndDateChange = (date: moment.Moment | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setEndDate(formattedDate);
      checkDateDifference(startDate, formattedDate);
    } else {
      setEndDate(undefined);
    }
  };

  const checkDateDifference = (
    start: string | undefined,
    end: string | undefined
  ) => {
    if (start && end) {
      const startDateObj = moment(start);
      const endDateObj = moment(end);
      const diffInDays = endDateObj.diff(startDateObj, "days");

      setIsDatewiseSelected(false);
      setIsMonthSelected(false);
      setIsYearSelected(false);

      if (diffInDays < 31) {
        setIsDatewiseSelected(true);
      } else if (diffInDays >= 31 && diffInDays < 365) {
        setIsMonthSelected(true);
      } else if (diffInDays >= 365) {
        setIsYearSelected(true);
      }
    }
  };

  const navigate = useNavigate();

  const { useFetchAllSurveys, useFetchAllDashboardSurveyAndResponses } =
    SurveysService();
  const { data: surveyData, isLoading: isSurveyDataLoading } =
    useFetchAllSurveys(limit, page);
  const {
    data: surveyDashboardSurveysAndResponsesData,
    isLoading: isSurveyDashboardSurveysAndResponsesDataLoading,
  } = useFetchAllDashboardSurveyAndResponses(startDate, endDate);
  const totalResults = surveyData?.total || 0;

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
  const handleNavigate = () => {
    navigate("/survey-create");
  };
  const isPageLoading =
    isSurveyDataLoading && isSurveyDashboardSurveysAndResponsesDataLoading;
  console.log(isPageLoading);

  return (
    <div className="grid grid-cols-8 gap-5 w-full ">
      <>
        {isPageLoading ? (
          <>
            <Spin />
          </>
        ) : (
          <div className="col-span-8 lg:col-span-3  bg-white rounded-lg p-2 sm:p-0 md:py-5 md:pl-5 md:pr-6 ">
            <div className="font-semibold text-lg">Survey Overview</div>
            <div className=" flex mt-5 lg:mt-10 justify-between   w-full">
              <div className="flex bg-[#008444] justify-center  items-center w-[48%] rounded-lg px-2 h-17 text-white cursor-pointer">
                <div className="w-full  flex items-center ">
                  <div className=" mx-4 text-3xl font-extrabold font-manrope leading-[48px]">
                    {isSurveyDataLoading ? (
                      <div className="text-white bg-white w-7 flex justify-center h-9 items-center">
                        <Spin />
                      </div>
                    ) : (
                      <>{surveyData?.data[0]?.TotalSurveys}</>
                    )}
                  </div>
                  <div className="  leading-4">
                    Survey <br /> Created
                  </div>
                </div>
              </div>
              <div className="flex bg-[#ff8548] justify-center  items-center w-[48%] rounded-lg px-2 h-17 text-white cursor-pointer">
                <div className="w-full  flex items-center ">
                  <div className="mx-4  text-3xl font-extrabold font-manrope leading-[48px]">
                    {isSurveyDataLoading ? (
                      <div className="text-white bg-white w-7 flex justify-center h-9 items-center">
                        <Spin />
                      </div>
                    ) : (
                      <>{surveyData?.data[0]?.TotalResponses}</>
                    )}
                  </div>
                  <div className="  leading-4">
                    Survey <br /> Response
                  </div>
                </div>
              </div>
            </div>
            <div className="border-[1px] border-[#AFC6C4] w-full flex items-center justify-between mt-3 md:mt-8 py-2 px-6 rounded-lg">
              <div className="text-[#008444] text-lg font-manrope font-bold leading-[48px] ">
                Average Rating
              </div>
              <div className="leading-[18px] text-[#008444] font-manrope font-semibold text-lg">
                {surveyData?.data[0]?.AverageRating} %
              </div>
            </div>
          </div>
        )}
      </>
      {isPageLoading ? (
        ""
      ) : (
        <div className="col-span-8 bg-white  rounded-lg lg:col-span-5 p-2 sm:p-0 lg:pt-5 lg:px-4 flex flex-col ">
          {isSurveyDashboardSurveysAndResponsesDataLoading ? (
            <>
              <Spin />
            </>
          ) : (
            <>
              {" "}
              <div className="flex justify-between w-full items-center ">
                <div className="font-semibold text-lg">Surveys</div>
                <div className="  flex ">
                  <DatePicker
                    onChange={handleStartDateChange}
                    className="mx-1 md:mr-3  custom-select"
                    placeholder=" Start Date"
                    suffixIcon={<IoIosArrowDown />}
                  />
                  <DatePicker
                    className="custom-select"
                    onChange={handleEndDateChange}
                    placeholder=" End Date "
                    suffixIcon={<IoIosArrowDown />}
                  />
                </div>
              </div>
              <div className="">
                {surveyDashboardSurveysAndResponsesData &&
                  !isSurveyDashboardSurveysAndResponsesDataLoading && (
                    <>
                      {isMonthSelected &&
                        !isDatewiseSelected &&
                        !isYearSelected && (
                          <TrendsChart
                            apiData={{
                              message:
                                surveyDashboardSurveysAndResponsesData.message,
                              data: surveyDashboardSurveysAndResponsesData.data, // Ensure this matches the expected `Data[]` structure
                            }}
                          />
                        )}
                      {isDatewiseSelected &&
                        !isYearSelected &&
                        !isMonthSelected && (
                          <TrendsChartDateWise
                            apiData={{
                              message:
                                surveyDashboardSurveysAndResponsesData.message,
                              data: surveyDashboardSurveysAndResponsesData.data,
                            }}
                          />
                        )}
                      {isYearSelected &&
                        !isDatewiseSelected &&
                        !isMonthSelected && (
                          <TrendsChartYearWise
                            apiData={{
                              message:
                                surveyDashboardSurveysAndResponsesData.message,
                              data: surveyDashboardSurveysAndResponsesData.data,
                            }}
                          />
                        )}
                    </>
                  )}
              </div>
            </>
          )}
        </div>
      )}

      <div className="col-span-8  rounded-md survey-details-table  bg-white p-2 md:p-4 h-fit">
        <div className="flex justify-between items-center mt-3">
          <div className="text-[#18120f] text-xl font-manrope font-semibold">
            Survey List
          </div>
          <button
            onClick={handleNavigate}
            className="bg-[#ff8548] border-[1px] border-[#ff8548] text-white py-3 px-4 rounded-lg hover:text-orange-500 hover:bg-white"
          >
            Create Survey
          </button>
        </div>
        <div className=" w-full  border-[#EBF0ED] rounded-lg mt-4 lg:mt-4 team-mgmt-table ">
          <Table<Survey>
            columns={SurveyDetailsColumns()}
            dataSource={surveyData?.data[0]?.Surveys}
            className="h-full overflow-auto rounded-lg border-[1px] border-[#EBF0ED]"
            loading={isSurveyDataLoading}
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

export default SurveyDetails;
