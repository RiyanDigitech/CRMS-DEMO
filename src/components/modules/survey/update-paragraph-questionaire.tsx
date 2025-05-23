import {
  RatingQuestionnaireProps,
  UpdateMultiChiceQuestionType,
} from "@/lib/types/survey";
import SurveysService from "@/services/survey/survey.services";
import { Spin } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateParagrapghQuestionnaire: React.FC<RatingQuestionnaireProps> = ({
  selectedOption,
  questionText,
  questionRequired,
  questionId,
  setIsQuestionUpdate,
  isQuestionUpdate,
  setIsChangedDataRefelected,
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
  const onSubmit: SubmitHandler<UpdateMultiChiceQuestionType> = (data) => {
    const requestBody: UpdateMultiChiceQuestionType = {
      survey: surveyId,
      questionText: questionText,
      questionType: selectedOption ? selectedOption : "Text",
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
  console.log("data payload", isQuestionUpdate);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="w-full mt-3 md:mt-3">
        <div className="w-10/12 block">
          {" "}
          <textarea
            placeholder="Enter your Answer here..."
            className=" w-full border-[1px] border-[#EBF0ED]  p-3 rounded-lg md:ml-7 h-[70px] md:h-[120px]"
            // rows={2}
            disabled={true}
          />
        </div>
      </div>
      <div className="mt-4 md:mt-4">
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
            <div className=" rounded-md custom-spinner">
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

export default UpdateParagrapghQuestionnaire;
