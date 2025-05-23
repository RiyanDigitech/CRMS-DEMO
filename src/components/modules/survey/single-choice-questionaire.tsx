import React, { useState } from "react";
import { Input, Button, Spin, notification, Radio } from "antd";
import SurveysService from "@/services/survey/survey.services";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateMultiChiceQuestionType } from "@/lib/types/survey";
import { useParams } from "react-router-dom";

interface SingleQuestionnaireProps {
  selectedOption: string;
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>; // Pass the setter function as a prop
  questionRequired: boolean;
  setQuestionRequired: React.Dispatch<React.SetStateAction<boolean>>;
  questionsCount?: number;
  setIsChangedDataRefelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleChoiceQuestionnaire: React.FC<SingleQuestionnaireProps> = ({
  selectedOption,
  questionText,
  setQuestionText,
  questionRequired,
  setQuestionRequired,
  questionsCount,
  setIsChangedDataRefelected,
}) => {
  const [options, setOptions] = useState(
    Array.from({ length: 2 }, (_, i) => ({ id: i + 1, text: "" }))
  );

  const handleTextChange = (id: number, value: string) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, text: value } : option
      )
    );
  };

  const handleRemoveOption = (id: number) => {
    setOptions((prev) => prev.filter((option) => option.id !== id));
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, { id: Date.now(), text: "" }]);
  };

  const { id } = useParams<{ id: string }>();

  const { useHandleCreateQuestionService } = SurveysService();
  const { handleSubmit, reset } = useForm<CreateMultiChiceQuestionType>();
  const { mutate, isPending } = useHandleCreateQuestionService(reset);

  const onSubmit: SubmitHandler<CreateMultiChiceQuestionType> = (data) => {
    const validOptions = options.filter((option) => option.text.trim() !== "");
    if (validOptions.length < options.length) {
      notification.error({
        message: "All Options Required",
        description: "Please Must  Filled All Options ",
        placement: "topRight",
      });
      return;
    }
    const uniqueOptions = new Set(
      validOptions?.map((option) => option?.text?.trim())
    );
    if (uniqueOptions?.size < validOptions?.length) {
      notification.error({
        message: "Duplicate Options",
        description: "Each option should be unique. Please check again.", // ADDED CODE
        placement: "topRight",
      });
      return;
    }
    const answerOptions = validOptions.map((option) => ({
      optionText: option.text,
      // order: index + 1,
    }));

    const requestBody: CreateMultiChiceQuestionType = {
      survey: parseInt(id || "1"),
      questionText: questionText,
      questionType: selectedOption,
      // order: questionsCount ? questionsCount + 2 : 1,
      questionRequired: questionRequired ? "Required" : "Optional",
      answerOptions,
    };

    data = requestBody;
    mutate(data, {
      onSuccess: () => {
        setQuestionText("");
        setQuestionRequired(false);
        setIsChangedDataRefelected((prev) => !prev);
        setOptions(
          Array.from({ length: 2 }, (_, i) => ({ id: i + 1, text: "" }))
        );
      },
    });
  };
  console.log(questionsCount);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" ">
      <div className="w-full md:mt-4">
        <Radio.Group className="w-10/12 block">
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center  mb-3 w-full">
              <Radio
                value={option.id}
                className="pointer-events-none opacity-50"
              />
              <Input
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleTextChange(option.id, e.target.value)}
                className="w-full  border-0 border-b border-[#EBF0ED] rounded-none  focus:ring-0 focus:border-gray-300 hover:border-gray-300"
              />
              <Button
                type="text"
                onClick={() => handleRemoveOption(option.id)}
                className="text-[#A1A7A3] text-[16px]"
              >
                X
              </Button>
            </div>
          ))}
        </Radio.Group>
        <Button
          onClick={handleAddOption}
          className="md:mt-2 border-none underline text-[#008444]"
        >
          Add More Option
        </Button>
      </div>
      <div className="mt-3 md:mt-8">
        <button
          type="submit"
          className="bg-[#ff8548] border-[1px] border-[#ff8548] py-2 px-4 text-white rounded-lg hover:bg-white hover:text-[#ff8548]"
        >
          {isPending ? (
            <div className="custom-spinner rounded-md">
              <Spin />
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default SingleChoiceQuestionnaire;
