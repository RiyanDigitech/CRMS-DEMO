import { useState } from "react";
import SurveysService from "@/services/survey/survey.services";
import { Checkbox, Input, Radio, Spin, Form } from "antd";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Survey,
  SurveyCreateQuestionResponse,
  SurveyCreateResponse,
} from "@/lib/types/survey";
import TextArea from "antd/es/input/TextArea";

type AnswerValue = string | number | number[] | string[];
const CreateResponse = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useFetchTargetedSurvey } = SurveysService();
  const { handleSubmit, reset } = useForm<SurveyCreateResponse>();
  const { useHandleCreateSurveyResponseService } = SurveysService();
  const { mutate, isPending } = useHandleCreateSurveyResponseService(reset);
  const [answers, setAnswers] = useState<{ [key: number]: AnswerValue }>({});
  const { control } = useForm<Survey>();

  const { data: selectedSurveyData, isLoading: isSurveyDataLoading } =
    useFetchTargetedSurvey(numericId);

  if (isSurveyDataLoading) {
    return (
      <div className="flex justify-center">
        <Spin />
      </div>
    );
  }

  const handleAnswerChange = (questionId: number, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const onSubmit = () => {
    const responseDetail = selectedSurveyData?.data?.questions.map((item) => {
      const response: SurveyCreateQuestionResponse = { question: item.id };

      if (answers[item.id]) {
        if (
          item.questionType === "Multi Choice" ||
          item.questionType === "Single Choice"
        ) {
          response.option = Array.isArray(answers[item.id])
            ? (answers[item.id] as string[])
            : [answers[item.id] as string];
        } else if (item.questionType === "Text") {
          response.answerText = answers[item.id] as string;
        } else if (item.questionType === "Rating") {
          response.rating = answers[item.id] as number;
        }
      }
      return response;
    });

    const responseData: SurveyCreateResponse = {
      survey: numericId,
      responseDetail,
    };
    console.log(responseData, "responseData");
    mutate(responseData);
  };

  const CurrentUser = localStorage.getItem("lastpersonemail");
  console.log(answers, "answers");
  const emojis = ["😞", "😐", "🙂", "😊", "😍"];

  return (
    <div className="">
      <form className="rounded-lg bg-white pt-3 pl-5">
        <div className="font-manrope lg:w-[90%] flex flex-col rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row">
            <Controller
              name="name"
              control={control}
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
                    disabled={true}
                    value={selectedSurveyData?.data?.name}
                    id="surveyname"
                    placeholder="Enter surveyname"
                    className="h-[40px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1 disabled:cursor-text"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Form.Item className="w-full sm:w-full lg:w-[47%] mb-4">
                  <label
                    htmlFor="description"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    Survey Description
                  </label>
                  <TextArea
                    id="description"
                    disabled={true}
                    style={{ height: "40px" }}
                    className="bg-[#fafafa] py-1 disabled:cursor-text flex items-center border border-[#EBF0ED] rounded-[10px] mt-1"
                    {...field}
                    value={selectedSurveyData?.data?.description}
                  />
                </Form.Item>
              )}
            />
          </div>

          <div className="flex justify-between w-full items-center flex-col md:flex-row">
            <Controller
              name="email"
              control={control}
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
                    disabled={true}
                    value={CurrentUser ?? ""}
                    id="email"
                    placeholder="Enter email"
                    className="h-[40px] w-full disabled:cursor-text bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Form.Item className="w-full sm:w-full lg:w-[47%] mb-4">
                  <label
                    htmlFor="surveyname"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    Survey Version
                  </label>
                  <Input
                    {...field}
                    value={selectedSurveyData?.data?.version}
                    disabled={true}
                    id="surveyname"
                    placeholder="Enter surveyname"
                    className="h-[40px] w-full disabled:cursor-text bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />
          </div>
        </div>
      </form>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg font-manrope"
      >
        <div className="w-full flex justify-between flex-wrap mt-3">
          {selectedSurveyData?.data?.questions.map((item, index) => (
            <div
              key={item.id}
              id={`${item.id}`}
              className="w-full lg:w-[49%] bg-white my-2 px-5 py-4 rounded-lg"
            >
              <h4 className="text-[#008444] font-manrope font-semibold">
                <span className="mr-1">{index + 1}. </span> {item.questionText}
                {item.questionRequired === "Required" && (
                  <span className="ml-1"> * </span>
                )}
              </h4>
              <div className="mt-4">
                {item.questionType === "Single Choice" && (
                  <>
                    {item.answerOptions.map((option) => (
                      <div
                        key={option?.id}
                        id={`${option?.id}`}
                        className="flex items-center  mb-3"
                      >
                        <Radio
                          value={option.id}
                          checked={answers[item.id] === option.id}
                          onChange={(e) =>
                            handleAnswerChange(item.id, e.target.value)
                          }
                        />
                        <Input
                          value={option?.optionText}
                          className="w-7/12"
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
                  </>
                )}
                {item.questionType === "Multi Choice" && (
                  <>
                    {item.answerOptions.map((option) => (
                      <div
                        key={option?.id}
                        id={`${option?.id}`}
                        className="flex items-center gap-2 mb-3"
                      >
                        <Checkbox
                          checked={
                            Array.isArray(answers[item.id]) &&
                            (answers[item.id] as number[]).includes(option.id)
                          }
                          onChange={(e) => {
                            const selectedOptions = Array.isArray(
                              answers[item.id]
                            )
                              ? [...(answers[item.id] as number[])]
                              : [];
                            if (e.target.checked) {
                              selectedOptions.push(option.id);
                            } else {
                              const index = selectedOptions.indexOf(option.id);
                              if (index > -1) {
                                selectedOptions.splice(index, 1);
                              }
                            }
                            handleAnswerChange(item.id, selectedOptions);
                          }}
                        />
                        <Input
                          value={option?.optionText}
                          className="w-7/12"
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
                  </>
                )}
                {item.questionType === "Text" && (
                  <textarea
                    value={(answers[item.id] || "") as string[]}
                    onChange={(e) =>
                      handleAnswerChange(item.id, e.target.value)
                    }
                    // rows={4}
                    className="md:w-9/12 ml-3 bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1 h-[70px] md:h-[90px] focus:outline-none focus:border-[#b4b4b4] rounded-lg p-2"
                  />
                )}
                {/* {item.questionType === "Rating" && (
                  <Rate
                    className="flex justify-center mt-12"
                    value={
                      typeof answers[item.id] === "number"
                        ? (answers[item.id] as number)
                        : undefined
                    }
                    onChange={(value) => handleAnswerChange(item.id, value)}
                  />
                )} */}
                {item.questionType === "Rating" && (
                  <div className="flex  justify-around w-full md:w-7/12 md:mx-auto  items-center mt-4 md:mt-5">
                    {emojis.map((emoji, index) => (
                      <>
                        <div
                          key={index}
                          className={`flex flex-col items-center rounded-md px-1 pb-1
                            `}
                          onClick={() => handleAnswerChange(item.id, index + 1)}
                        >
                          <div className="text-[#6B6B6B] ">{index + 1}</div>
                          <div
                            className={`text-xl bg-[#fafafa] hover:bg-gray-200 border-[1px] border-[#EBF0ED] py-2 px-1 rounded-lg cursor-pointer ${
                              answers[item.id] === index + 1
                                ? "bg-green-100 border border-green-400"
                                : "bg-gray-100 border border-gray-300"
                            }`}
                          >
                            {emoji}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-5 mb-3 ">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#008444] text-white px-6 py-2 rounded-lg"
          >
            {isPending ? (
              <Spin size="small" className=" custom-spinner" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateResponse;
