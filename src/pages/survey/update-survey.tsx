import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DatePicker, Input, Form, Spin } from "antd";
import "../../index.css";
import dayjs from "dayjs"; // dayjs import
import { Survey } from "@/lib/types/survey";
import CreateQuestionaire from "@/components/modules/survey/create-questionaire";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SurveysService from "@/services/survey/survey.services";
import TextArea from "antd/es/input/TextArea";
import UpdateQuestionaire from "@/components/modules/survey/update-questionaire";
const SurveyUpdate = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Survey>();
  const dateFormat = "YYYY-MM-DD";
  const [isQuestionCreated, setIsQuestionCreated] = useState<boolean>(false);
  const toggleQuestionCreated = () => {
    setIsQuestionCreated((prev) => !prev);
  };
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useFetchTargetedSurvey, useHandleUpdateSurveyService } =
    SurveysService();
  const [isChangedDataRefelected, setIsChangedDataRefelected] =
    useState<boolean>(false);
  const { data: selectedSurveyData, isLoading: isTargetedSurveyDataLoading } =
    useFetchTargetedSurvey(numericId, isChangedDataRefelected);
  const { mutate, isPending: isUserUpdatePending } =
    useHandleUpdateSurveyService(reset, numericId);

  useEffect(() => {
    if (selectedSurveyData?.data) {
      reset({
        name: selectedSurveyData.data.name,
        version: selectedSurveyData.data.version,
        startDate: selectedSurveyData.data.startDate
          ? dayjs(selectedSurveyData.data.startDate)
          : "",
        endDate: selectedSurveyData.data.endDate
          ? dayjs(selectedSurveyData.data.endDate)
          : "",
        description: selectedSurveyData.data.description,
      });
    }
    if (selectedSurveyData?.data?.questions?.length === 0) {
      setIsQuestionCreated(true);
    } else {
      setIsQuestionCreated(false);
    }
    if (isChangedDataRefelected) {
      console.log("yes cjanges reflected ");
      setIsChangedDataRefelected((prev) => !prev);
    }
  }, [selectedSurveyData, reset, isChangedDataRefelected]);
  const onSubmit: SubmitHandler<Survey> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <>
        <div className="bg-white  rounded-lg pt-1 pl-2 lg:pl-5 pb-3 mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className=" rounded-lg">
            <div className="font-manrope lg:w-10/12 flex flex-col mt-2   rounded-lg addusermodal">
              <div className="flex justify-between w-full flex-col lg:flex-row">
                <Controller
                  name="name"
                  defaultValue={selectedSurveyData?.data?.name}
                  control={control}
                  rules={{ required: "survey name is required" }}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[48%] mb-4">
                      <label
                        htmlFor="surveyname"
                        className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                      >
                        Survey Name
                      </label>
                      <Input
                        {...field}
                        id="surveyname"
                        placeholder="Enter surveyname"
                        className="h-[40px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                      />
                    </Form.Item>
                  )}
                />{" "}
                <Controller
                  name="version"
                  control={control}
                  rules={{ required: "Version is required" }}
                  defaultValue={selectedSurveyData?.data?.version}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[48%] mb-4">
                      <label
                        htmlFor="version"
                        className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                      >
                        Version
                      </label>
                      <Input
                        {...field}
                        id="version"
                        placeholder="version"
                        className="h-[40px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                      />
                    </Form.Item>
                  )}
                />
              </div>
              <div className="flex justify-between w-full flex-col lg:flex-row">
                <Controller
                  name="startDate" // Path for the start date field
                  defaultValue={
                    selectedSurveyData?.data?.startDate
                      ? dayjs(selectedSurveyData.data.startDate)
                      : ""
                  }
                  control={control}
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[48%] mb-4">
                      <label
                        htmlFor="startdate"
                        className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                      >
                        Start Date
                      </label>
                      <DatePicker
                        {...field}
                        id="startdate"
                        placeholder="Select start date"
                        format="YYYY-MM-DD"
                        className="h-[40px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                      />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="endDate"
                  defaultValue={
                    selectedSurveyData?.data?.endDate
                      ? dayjs(selectedSurveyData.data.endDate)
                      : ""
                  }
                  control={control}
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[48%] mb-4">
                      <label
                        htmlFor="enddate"
                        className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                      >
                        End Date
                      </label>
                      <DatePicker
                        {...field}
                        format={dateFormat}
                        placeholder="Select end date"
                        style={{
                          width: "100%",
                          height: "38px",
                        }}
                        className="bg-[#fafafa] mt-1"
                      />
                    </Form.Item>
                  )}
                />
              </div>{" "}
              <div className="flex justify-between w-full items-center flex-col md:flex-row">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Survey description is required" }}
                  defaultValue={selectedSurveyData?.data?.description}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[48%]  mb-4">
                      <label
                        htmlFor="description"
                        className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                      >
                        Survey Description *
                      </label>
                      <TextArea
                        id="description"
                        style={{ height: "40px" }}
                        className=" bg-[#fafafa] py-1 flex items-center  border border-[#EBF0ED] rounded-[10px] mt-1"
                        {...field}
                      />
                    </Form.Item>
                  )}
                />
                <div className=" w-full sm:w-full lg:w-[48%] flex items-center">
                  {" "}
                  <button
                    type="submit"
                    disabled={!isDirty}
                    className={`font-manrope mt-1 mr-3 shadow-sm w-9/12 sm:w-3/12 lg:w-3/12 border-[1px] h-[43px] rounded-md text-sm ${
                      !isDirty
                        ? "bg-[#FF8548] text-[#dddcdc]  cursor-not-allowed "
                        : "border-[#FF8548] bg-[#FF8548] text-white hover:bg-white hover:text-[#FF8548]"
                    }`}
                  >
                    {isUserUpdatePending || isTargetedSurveyDataLoading ? (
                      <Spin className=" rounded-lg p-1 custom-spinner" />
                    ) : (
                      "Update Survey"
                    )}
                  </button>
                  <button
                    onClick={toggleQuestionCreated}
                    className={` rounded-lg mt-1 w-40 h-[43px] border-[1px] border-[#EBF0ED]  ${
                      isQuestionCreated
                        ? "bg-[#fafafa]"
                        : " bg-[#fafafa] text-[#acacac] border-[1px] border-[#EBF0ED] hover:bg-white hover:text-[#ff8548] hover:border-[#ff8548]"
                    }`}
                    disabled={isQuestionCreated}
                  >
                    + Add Question
                  </button>{" "}
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
      <div className="mt-5">
        {isQuestionCreated ? (
          <CreateQuestionaire
            setIsChangedDataRefelected={setIsChangedDataRefelected}
            questionsCount={selectedSurveyData?.data?.questions.length || 0}
          />
        ) : (
          ""
        )}
      </div>
      {selectedSurveyData && selectedSurveyData?.data?.questions?.length > 0 ? (
        <UpdateQuestionaire
          isChangedDataRefelected={isChangedDataRefelected}
          setIsChangedDataRefelected={setIsChangedDataRefelected}
          QuestionsDetails={selectedSurveyData?.data?.questions}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SurveyUpdate;
