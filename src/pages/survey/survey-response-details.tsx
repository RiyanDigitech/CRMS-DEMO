import { Survey } from "@/lib/types/survey";
import { Checkbox, Form, Input, Radio, Spin } from "antd";
import { Pagination } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SurveysService from "@/services/survey/survey.services";
import { useState } from "react";
const SurveyResponseDetails = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;

  const location = useLocation();
  const { control } = useForm<Survey>();
  const [query] = useState<number | undefined>(numericId);
  const [limit, setSurveyLimit] = useState<number>(1);
  const [page, setSurveyCurrentPage] = useState<number>(1);

  const { useFetchAllSurveyResponses } = SurveysService();
  const { data: surveyResponseData, isLoading: isSurveyDataLoading } =
    useFetchAllSurveyResponses(limit, page, query);
  const totalResults = surveyResponseData?.total || 0;
  const handlePageChange = (page: number) => {
    setSurveyCurrentPage(page);
    setSurveyLimit(1);
  };
  const emojis = ["😞", "😐", "🙂", "😊", "😍"];
  console.log("surveyResponseData", surveyResponseData?.data[0]);
  return (
    <div>
      {" "}
      <div className="w-full lg:w-[60%] flex flex-col justify-between items-center lg:flex-row mb-4 md:mb-4">
        <div className="text-lg md:text-2xl text-[#18120f] font-semibold mb-4 md:mb-0">
          Survey Name ({surveyResponseData?.total} Responses)
        </div>
        <div className=" bg-[#f6f8fa] py-[9px] px-[1px] border-[1px] rounded-lg">
          <Link
            to={`/survey-response-stats/${id}`}
            className={`mr-2  py-2 px-3 hover:bg-white hover:text-[#008444] rounded-lg   ${
              location.pathname === `/survey-response-stats/${id}`
                ? "  bg-white text-[#008444]"
                : "text-[#8e918f] bg-transparent"
            }`}
          >
            Summary
          </Link>
          <Link
            to={`/survey-response/${id}`}
            className={`  py-2 px-3 hover:bg-white hover:text-[#008444] rounded-lg border-[1px]  ${
              location.pathname === `/survey-response/${id}`
                ? "bg-white text-[#008444]"
                : "text-[#8e918f] bg-transparent"
            }`}
          >
            Individual
          </Link>
        </div>
      </div>
      <form className=" rounded-lg bg-white pt-3 pl-5 pb-3 md:pb-0">
        <div className="font-manrope lg:w-[90%] flex flex-col    rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row">
            <Controller
              name="name"
              control={control}
              rules={{ required: "survey name is required" }}
              render={({ field }) => (
                <Form.Item className="w-full sm:w-full lg:w-[47%] mb-4">
                  <label
                    htmlFor="surveyname"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    Survey Name
                  </label>
                  <Input
                    {...field}
                    id="surveyname"
                    value={surveyResponseData?.data[0]?.surveyName}
                    placeholder="Enter surveyname"
                    className="h-[40px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="description"
              control={control}
              rules={{ required: "Survey description is required" }}
              render={({ field }) => (
                <Form.Item className="w-full sm:w-full lg:w-[47%]  mb-4">
                  <label
                    htmlFor="description"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    Survey Description
                  </label>
                  <Input
                    id="description"
                    style={{ height: "40px" }}
                    className=" bg-[#fafafa] py-1 flex items-center  border border-[#EBF0ED] rounded-[10px] mt-1 "
                    {...field}
                    value={
                      field.value ||
                      surveyResponseData?.data[0]?.surveyDescription ||
                      ""
                    }
                  />
                </Form.Item>
              )}
            />
          </div>

          <div className="flex justify-between w-full items-center flex-col md:flex-row">
            <Controller
              name="email"
              control={control}
              rules={{ required: "survey email is required" }}
              render={({ field }) => (
                <Form.Item className="w-full sm:w-full lg:w-[47%] mb-4">
                  <label
                    htmlFor="surveyname"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    Individual Email
                  </label>
                  <Input
                    {...field}
                    value={surveyResponseData?.data[0]?.participant}
                    id="email"
                    placeholder="Enter email"
                    className="h-[40px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
            <div className=" w-full sm:w-full lg:w-[48%] flex items-center">
              {isSurveyDataLoading ? (
                <>
                  <Spin />
                </>
              ) : (
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={totalResults}
                  onChange={handlePageChange}
                  size="small"
                />
              )}
            </div>
          </div>
        </div>
      </form>
      <div className="w-full flex justify-between flex-wrap mt-3">
        {surveyResponseData?.data[0]?.responseDetail &&
        surveyResponseData.data[0].responseDetail.length > 0 ? (
          <>
            {surveyResponseData?.data[0]?.responseDetail?.map((item, index) => (
              <div
                key={index}
                className="w-full lg:w-[49%] bg-white my-2 p-6 h-[140px] rounded-lg"
              >
                <h4 className="text-[#008444] font-manrope font-semibold">
                  {index + 1} - {item?.question?.questionText}
                </h4>
                <div className="mt-3">
                  {item?.question?.questionType === "Single Choice" &&
                    item?.question?.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center  mb-4">
                        <Radio checked={true} />
                        <Input
                          disabled={true}
                          value={option?.optionText}
                          readOnly
                          className="w-8/12"
                          style={{
                            backgroundColor: "#ffffff",
                            border: "none",
                            borderBottom: "1px solid #EBF0ED",
                            borderRadius: "0",
                            color: "black",
                          }}
                        />
                      </div>
                    ))}
                  {item?.question?.questionType === "Multi Choice" &&
                    item?.question?.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center  mb-4">
                        <Checkbox checked={true} />
                        <Input
                          disabled
                          value={option?.optionText}
                          readOnly
                          className="w-8/12"
                          style={{
                            backgroundColor: "#ffffff",
                            border: "none",
                            borderBottom: "1px solid #EBF0ED",
                            borderRadius: "0",
                            color: "black",
                          }}
                        />
                      </div>
                    ))}
                  {item?.question?.questionType === "Rating" && (
                    <div className="flex justify-center items-center ">
                      {/* <Rate
                        className=""
                        value={
                          typeof item?.question?.rating === "number"
                            ? item?.question?.rating
                            : 0
                        }
                        disabled
                      /> */}{" "}
                      <div className="flex justify-between w-full lg:w-7/12 cursor-default">
                        {emojis.map((emoji, emojiIndex) => (
                          <div
                            key={emojiIndex}
                            className="flex flex-col items-center rounded-md px-1"
                          >
                            <div className="text-[#6B6B6B] mb-1">
                              {emojiIndex + 1}
                            </div>
                            <div
                              className={`text-xl   border-[1px]  py-2 px-1 rounded-lg  ${
                                typeof item?.question?.rating === "number" &&
                                item?.question?.rating === emojiIndex + 1
                                  ? "bg-green-100 border border-green-400"
                                  : "bg-[#f8f7fa] border-[#EBF0ED]"
                              }`}
                            >
                              {emoji}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {item?.question?.questionType === "Text" && (
                    <p className="ml-4  border-b-[1px] w-8/12">
                      {item?.question?.answerText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="  mx-auto">No Response Created</div>
        )}
      </div>
    </div>
  );
};

export default SurveyResponseDetails;
