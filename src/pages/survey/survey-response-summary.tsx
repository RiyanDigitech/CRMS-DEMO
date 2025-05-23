import HorizontalBarChart from "@/components/modules/survey/horizontal-bar-chart";
import PieChart from "@/components/modules/survey/pie-chart";
import VerticalBarChart from "@/components/modules/survey/vertical-bar-chart";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SurveysService from "@/services/survey/survey.services";
import { Spin } from "antd";
const SurveyResponseSummary = () => {
  const location = useLocation();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;

  const emojis = ["😞", "😐", "🙂", "😊", "😍"];
  const { useFetchSurveyResponseSummary } = SurveysService();
  const {
    data: surveyResponseSummaryData,
    isLoading: surveyResponseSummaryDataLoading,
  } = useFetchSurveyResponseSummary(numericId);
  let uniqueNumber = 1;
  console.log("surveyResponseSummaryData", surveyResponseSummaryData);
  return (
    <>
      {surveyResponseSummaryDataLoading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="w-full lg:w-[60%] flex flex-col justify-between items-center lg:flex-row">
              <div className="text-lg md:text-2xl text-[#18120f] font-semibold mb-4 lg:mb-0">
                Survey Name (
                {surveyResponseSummaryData?.data &&
                  surveyResponseSummaryData.data[0] &&
                  "totalResponses" in surveyResponseSummaryData.data[0] &&
                  surveyResponseSummaryData.data[0].totalResponses}
                <span className="ml-1">Responses</span>)
              </div>
              <div className=" bg-[#f6f8fa] py-[9px] px-[1px] border-[1px] rounded-lg">
                <Link
                  to={`/survey-response-stats/${id}`}
                  className={`mr-2  py-2 px-3 hover:bg-white hover:text-[#008444] rounded-lg border-[1px]  ${
                    location.pathname === `/survey-response-stats/${id}`
                      ? "bg-white text-[#008444]"
                      : "text-[#8e918f] bg-transparent"
                  }`}
                >
                  Summary
                </Link>
                <Link
                  to={`/survey-response/${id}`}
                  className={`  py-2 px-3 hover:bg-white hover:text-[#008444] rounded-lg   ${
                    location.pathname === `/survey-response/${id}`
                      ? "bg-white text-[#008444]"
                      : "text-[#8e918f] bg-transparent"
                  }`}
                >
                  Individual
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2 flex-wrap">
              {surveyResponseSummaryData?.data?.map((item, index) => {
                if ("totalResponses" in item) {
                  return null;
                }
                if ("type" in item && item.type === "Multi Choice") {
                  return (
                    <div
                      key={index}
                      className="w-full lg:w-[49%] px-5 pt-5 pb-5 bg-white rounded-lg my-3 font-semibold font-manrope h-[350px]"
                    >
                      <div className="text-[#18120f] leading-[30px]   text-2xl">
                        {uniqueNumber++}
                        <span className="mr-1">-</span>
                        {item?.question}
                      </div>
                      <div className="text-[#6B6B6B] leading-[16px] text-sm mt-3 tracking-wider">
                        Responses
                      </div>
                      <div className="mt-3 ">
                        <PieChart piechartdata={item?.options} />
                      </div>
                    </div>
                  );
                }
                if ("type" in item && item.type === "Single Choice") {
                  return (
                    <div
                      key={index}
                      className="w-full lg:w-[49%] px-5 pt-5 pb-5 bg-white rounded-lg my-3 font-semibold font-manrope h-[350px]"
                    >
                      <div className="text-[#18120f] leading-[30px]   text-2xl">
                        {uniqueNumber++}
                        <span className="mr-1">-</span>
                        {item?.question}
                      </div>
                      <div className="text-[#6B6B6B] leading-[16px] text-sm mt-3 tracking-wider">
                        Response
                      </div>
                      <div className="mt-3 ">
                        <HorizontalBarChart
                          horizontalbarchartdata={item?.options}
                        />
                      </div>
                    </div>
                  );
                }
                if ("AverageRating" in item && item.AverageRating) {
                  return (
                    <>
                      {item.AverageRating.map((data, ind) => (
                        <div
                          key={ind}
                          className="w-full lg:w-[49%] px-5 pt-5 bg-white rounded-lg my-3 font-semibold font-manrope"
                        >
                          <div className="text-[#18120f] leading-[30px]   text-2xl">
                            {uniqueNumber++}
                            <span className="mr-1">-</span>
                            {data?.question}
                          </div>
                          <div className="text-[#6B6B6B] leading-[16px] text-sm mt-3 tracking-wider">
                            Response
                          </div>

                          <div className="flex flex-col items-center bg-[#fafafa] border-[1px] border-[#EBF0ED] rounded-lg md:p-3 mt-8">
                            <div className="leading-[18px] font-manrope font-medium text-[#18120F] mb-2">
                              Average Rating ({data?.average}) %
                            </div>
                            <div className="flex justify-between w-full lg:w-7/12">
                              {emojis.map((emoji, emojiIndex) => (
                                <div
                                  key={emojiIndex}
                                  className="flex flex-col items-center rounded-md px-1"
                                >
                                  <div className="text-[#6B6B6B] mb-1">
                                    {emojiIndex + 1}
                                  </div>
                                  <div className="text-xl bg-[#f8f7fa] hover:bg-gray-100 border-[1px] border-[#EBF0ED] py-3 px-1 rounded-lg cursor-pointer">
                                    {emoji}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Vertical Bar Chart */}
                          <div className="mt-3">
                            <VerticalBarChart
                              VerticalBarChartData={data?.ratingPercent}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  );
                }

                if ("answers" in item && item.answers) {
                  return (
                    <>
                      {item?.answers.map((data, indexes) => (
                        <div
                          key={indexes}
                          className="lg:w-[49%] px-5 pt-5 pb-3 bg-white rounded-lg my-3 font-semibold font-manrope"
                        >
                          <div className="text-[#18120f] leading-[30px] text-2xl">
                            {uniqueNumber++}
                            <span>-</span> {data?.question}
                          </div>
                          <div className="text-[#6B6B6B] leading-[16px] text-sm mt-3 tracking-wider">
                            Response
                          </div>
                          {data?.answers.map((answer, inde) => (
                            <div
                              key={inde}
                              className="bg-[#FAFAFA] text-[#18120F] font-manrope font-medium leading-[20px] p-3 rounded-lg border-[1px] border-[#EBF0ED] mt-3"
                            >
                              {answer}
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  );
                }
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SurveyResponseSummary;
