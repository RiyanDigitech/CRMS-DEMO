import { Rate, Spin } from "antd";
import SurveysService from "@/services/survey/survey.services";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateQuestionType } from "@/lib/types/survey";
import { useParams } from "react-router-dom";
interface RatingQuestionnaireProps {
  selectedOption: string;
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>; // Pass the setter function as a prop
  questionRequired: boolean;
  questionsCount?: number;
  setQuestionRequired: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChangedDataRefelected: React.Dispatch<React.SetStateAction<boolean>>;
}
const RatingQuestionnaire: React.FC<RatingQuestionnaireProps> = ({
  selectedOption,
  questionText,
  setQuestionText,
  questionRequired,
  setQuestionRequired,
  // questionsCount,
  setIsChangedDataRefelected,
}) => {
  const { id } = useParams<{ id: string }>(); // Extract ID from URL params

  const { useHandleCreateQuestionService } = SurveysService();
  const { handleSubmit, reset } = useForm<CreateQuestionType>();
  const { mutate, isPending } = useHandleCreateQuestionService(reset);
  const onSubmit: SubmitHandler<CreateQuestionType> = (data) => {
    const requestBody: CreateQuestionType = {
      survey: parseInt(id || "1"),
      questionText: questionText,
      questionType: selectedOption,
      // order: questionsCount ? questionsCount + 2 : 1,
      questionRequired: questionRequired ? "Required" : "Optional",
    };
    data = requestBody;
    mutate(data, {
      onSuccess: () => {
        setQuestionText("");
        setQuestionRequired(false);
        setIsChangedDataRefelected((prev) => !prev);
      },
    });
  };
  const emojis = ["😞", "😐", "🙂", "😊", "😍"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="w-full block mt-2 md:mt-4 md:ml-7">
        {" "}
        <div className="flex justify-between w-full lg:w-5/12 cursor-default">
          {emojis.map((emoji, emojiIndex) => (
            <div
              key={emojiIndex}
              className="flex flex-col items-center rounded-md px-1"
            >
              <div className="text-[#6B6B6B] mb-1">{emojiIndex + 1}</div>
              <div className="text-xl bg-[#f8f7fa] hover:bg-gray-100 border-[1px] border-[#EBF0ED] py-3 px-1 rounded-lg ">
                {emoji}
              </div>
            </div>
          ))}
        </div>
        {/* <Rate value={5} disabled={true} className=" cursor-default" /> */}
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

export default RatingQuestionnaire;
