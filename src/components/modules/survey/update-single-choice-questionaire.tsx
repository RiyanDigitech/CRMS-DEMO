import React, { useState, useEffect } from "react";
import { Input, Button, Spin, Radio, notification } from "antd";
import SurveysService from "@/services/survey/survey.services";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnswerOption, UpdateMultiChiceQuestionType } from "@/lib/types/survey";
import "../../../index.css";
import { SingleQuestionnaireProps } from "@/lib/types/survey";
import { useParams } from "react-router-dom";

const UpdateSingleChoiceQuestionnaire: React.FC<SingleQuestionnaireProps> = ({
  selectedOption,
  questionText,
  questionRequired,
  questionId,
  answerOptions,
  setIsChangedDataRefelected,
  setIsQuestionUpdate,
  isQuestionUpdate,
  isChangedDataRefelected,
  data,
  questionUpdateId,
}) => {
  const [options, setOptions] = useState<AnswerOption[]>([]);
  const [answerOptDelApiId, setAnswerOptDelApiId] = useState<
    number | undefined
  >(undefined);
  const [isUpdateStatus, setIsUpdateStatus] = useState<boolean>(true);

  const [updateOptions, setUpdateOptions] = useState(
    Array.from({ length: 2 }, (_, i) => ({ id: i + 1, text: "" }))
  );
  const { id } = useParams();
  const surveyId = id ? parseInt(id) : undefined;
  useEffect(() => {
    const sanitizedOptions = answerOptions.map(({ id, optionText }) => ({
      id,
      optionText,
    }));
    setOptions(sanitizedOptions);
  }, [answerOptions, isChangedDataRefelected]);

  const { handleSubmit: handleSubmitForm1 } =
    useForm<UpdateMultiChiceQuestionType>();

  const { handleSubmit, reset } = useForm<UpdateMultiChiceQuestionType>();

  const {
    useHandleUpdateSurveyQuestionaireService,
    useFetchDeletedAnswerOption,
  } = SurveysService();

  const { mutate, isPending } = useHandleUpdateSurveyQuestionaireService(
    reset,
    questionId
  );
  const { mutate: deleteAnswerOpt, isPending: isDeleteAnswerOptPending } =
    useFetchDeletedAnswerOption(answerOptDelApiId, setAnswerOptDelApiId);

  const handleInputChange = (id: number, value: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, optionText: value } : option
      )
    );
    setIsUpdateStatus(false);
    setIsQuestionUpdate(false);
  };

  const handleTextChange = (id: number, value: string) => {
    setUpdateOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, text: value } : option
      )
    );
  };
  const handleRemoveOption = (id: number, optionText: string) => {
    if (optionText.trim() !== "") {
      setAnswerOptDelApiId(id);
      deleteAnswerOpt();
    } else {
      //
      setOptions((prevOptions) =>
        prevOptions.filter((option) => option.id !== id)
      );
      setIsQuestionUpdate(false);
    }
  };

  const handleUpdateRemoveOption = (id: number) => {
    setUpdateOptions((prev) => prev.filter((option) => option.id !== id));
  };

  const handleAddOption = () => {
    const newOption: Partial<AnswerOption> = {
      id: Date.now(),
      optionText: "",
      order: options.length + 4,
    };
    setOptions((prevOptions) => [...prevOptions, newOption as AnswerOption]);
    setIsQuestionUpdate(false);
  };

  const handleUpdateAddOption = () => {
    setUpdateOptions((prev) => [...prev, { id: Date.now(), text: "" }]);
    setIsQuestionUpdate(false);
  };

  const onSubmit: SubmitHandler<UpdateMultiChiceQuestionType> = (data) => {
    if (options.length > 0) {
      const requestBody: UpdateMultiChiceQuestionType = {
        survey: surveyId,
        questionText,
        questionType: selectedOption || "Single Choice",
        questionRequired: questionRequired ? "Required" : "Optional",
        answerOptions: options.map((option) => {
          if (option.id < 1000) {
            return {
              id: option.id,
              optionText: option.optionText,
            };
          }
          return {
            optionText: option.optionText,
            // order: option.order ? option.order + 1 : 1,
          };
        }),
      };
      data = requestBody;
      mutate(data, {
        onSuccess: () => {
          setIsChangedDataRefelected((prev) => !prev);
          setIsQuestionUpdate(true);
          setIsUpdateStatus(true);
        },
      });
    }
  };

  const onSubmitForm1: SubmitHandler<UpdateMultiChiceQuestionType> = (data) => {
    const validOptions = updateOptions.filter(
      (option) => option.text.trim() !== ""
    );
    if (validOptions.length < options.length) {
      notification.error({
        message: "All Options Required",
        description: "Please Must  Filled All Options ",
        placement: "topRight",
      });
      return;
    }

    const answerOptions = validOptions.map((option) => ({
      optionText: option.text,
      // order: index + 4,
    }));

    const requestBody: UpdateMultiChiceQuestionType = {
      survey: surveyId,
      questionText: questionText,
      questionType: selectedOption || "Single Choice",
      questionRequired: questionRequired ? "Required" : "Optional",
      answerOptions,
    };

    data = requestBody;
    mutate(data, {
      onSuccess: () => {
        setIsChangedDataRefelected((prev) => !prev);
      },
    });
  };

  console.log(
    isQuestionUpdate,
    "isUpdateStatus",
    isUpdateStatus,
    "setQuestionUpdateId",
    questionUpdateId
  );
  return (
    <>
      {options.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="w-full mt-4  custom-survey-scrollbar">
            <Radio.Group className="w-10/12 block">
              {options.map((option, index) => (
                <div key={option.id} className="flex items-center mb-3 w-full ">
                  <Radio
                    value={option.id}
                    className="pointer-events-none opacity-50"
                  />
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option.optionText}
                    onChange={(e) =>
                      handleInputChange(option.id, e.target.value)
                    }
                    className="w-full border-0 border-b border-[#EBF0ED] rounded-none focus:ring-0 focus:border-gray-300 hover:border-gray-300"
                  />
                  <Button
                    type="text"
                    className="text-[#A1A7A3] text-[16px]"
                    onClick={() =>
                      handleRemoveOption(option.id, option.optionText)
                    }
                  >
                    {answerOptDelApiId === option.id &&
                    isDeleteAnswerOptPending ? (
                      <>
                        <Spin />
                      </>
                    ) : (
                      "X"
                    )}
                  </Button>
                </div>
              ))}
            </Radio.Group>
            <Button
              className="mt-2 border-none underline text-[#008444]"
              onClick={handleAddOption}
            >
              Add More Option
            </Button>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={
                data?.id === questionUpdateId || !isUpdateStatus ? false : true
              }
              className={`bg-[#ff8548] border-[1px] border-[#ff8548] py-2 px-4 text-white rounded-lg 
              ${
                data?.id === questionUpdateId || !isUpdateStatus
                  ? "hover:bg-white hover:text-[#ff8548]"
                  : " cursor-not-allowed bg-[#f7b493] border-[#f7b493]"
              }`}
            >
              {isPending && !isChangedDataRefelected ? (
                <div className="custom-spinner rounded-md">
                  <Spin />
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          <form onSubmit={handleSubmitForm1(onSubmitForm1)} className=" ">
            <div className="w-full mt-4">
              <Radio.Group className="w-10/12 block">
                {updateOptions?.map((option, index) => (
                  <div
                    key={option?.id}
                    className="flex items-center  mb-3 w-full"
                  >
                    <Radio value={option?.id} />
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option.text}
                      onChange={(e) =>
                        handleTextChange(option.id, e.target.value)
                      }
                      className="w-full  border-0 border-b border-[#EBF0ED] rounded-none  focus:ring-0 focus:border-gray-300 hover:border-gray-300"
                    />
                    {isDeleteAnswerOptPending ? (
                      <Button
                        type="text"
                        onClick={() => handleUpdateRemoveOption(option.id)}
                        className="text-[#A1A7A3] text-[16px]"
                      >
                        X
                      </Button>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                ))}
              </Radio.Group>
              <Button
                onClick={handleUpdateAddOption}
                className="mt-2 border-none underline text-[#008444]"
              >
                Add More Option
              </Button>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-[#ff8548] border-[1px] border-[#ff8548] py-2 px-4 text-white rounded-lg hover:bg-white hover:text-[#ff8548]"
              >
                {isPending ? (
                  <div className="custom-spinner rounded-md">
                    <Spin />
                  </div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default UpdateSingleChoiceQuestionnaire;
