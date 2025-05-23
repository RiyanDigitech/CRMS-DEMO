import {
  RatingQuestionnaireProps,
  UpdateMultiChiceQuestionType,
} from "@/lib/types/survey";
import SurveysService from "@/services/survey/survey.services";
import { Spin } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateratingQuestionnaire: React.FC<RatingQuestionnaireProps> = ({
  selectedOption,
  questionText,
  questionRequired,
  questionId,
  setIsQuestionUpdate,
  setIsChangedDataRefelected,
  isQuestionUpdate,
  data,
}) => {
  const { useHandleUpdateSurveyQuestionaireService } = SurveysService();
  const { handleSubmit, reset } = useForm<UpdateMultiChiceQuestionType>();
  const { mutate, isPending } = useHandleUpdateSurveyQuestionaireService(
    reset,
    questionId
  );
  const { id } = useParams();
  const surveyId = id ? parseInt(id) : undefined;
  console.log("questionText in rating", questionText);

  const onSubmit: SubmitHandler<UpdateMultiChiceQuestionType> = (data) => {
    const requestBody: UpdateMultiChiceQuestionType = {
      survey: surveyId,
      questionText: questionText,
      questionType: selectedOption ? selectedOption : "Rating",
      questionRequired: questionRequired ? "Required" : "Optional",
    };
    data = requestBody;
    mutate(data, {
      onSuccess: () => {
        setIsChangedDataRefelected((prev) => !prev);

        setIsQuestionUpdate(true);
      },
    });
  };
  const emojis = ["😞", "😐", "🙂", "😊", "😍"];
  console.log("isQuestionUpdate", isQuestionUpdate);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="w-full block mt-3  md:h-16 md:mt-1">
        {" "}
        <div className="flex justify-between w-full lg:w-5/12 ">
          {emojis.map((emoji, emojiIndex) => (
            <div
              key={emojiIndex}
              className="flex flex-col items-center rounded-md px-1"
            >
              <div className="text-[#6B6B6B] mb-1">{emojiIndex + 1}</div>
              <div className="text-xl bg-[#f8f7fa] hover:bg-gray-100 border-[1px] border-[#EBF0ED] py-3 px-1 rounded-lg cursor-pointer">
                {emoji}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 md:mt-8">
        <button
          type="submit"
          disabled={data?.id === questionId ? false : true}
          className={`bg-[#ff8548] border-[1px] border-[#ff8548] py-2 px-4 text-white rounded-lg 
              ${
                data?.id === questionId
                  ? "hover:bg-white hover:text-[#ff8548]"
                  : " cursor-not-allowed bg-[#f7b493] border-[#f7b493]"
              }`}
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
  );
};

export default UpdateratingQuestionnaire;
