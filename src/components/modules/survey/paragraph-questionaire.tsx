import { CreateQuestionType } from "@/lib/types/survey";
import SurveysService from "@/services/survey/survey.services";
import { Spin } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface RatingQuestionnaireProps {
  selectedOption: string;
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>; // Pass the setter function as a prop
  questionRequired: boolean;
  setQuestionRequired: React.Dispatch<React.SetStateAction<boolean>>;

  questionsCount?: number;
  setIsChangedDataRefelected: React.Dispatch<React.SetStateAction<boolean>>;
}
const ParagrapghQuestionnaire: React.FC<RatingQuestionnaireProps> = ({
  selectedOption,
  questionText,
  setQuestionText,
  setQuestionRequired,
  questionRequired,
  // questionsCount,
  setIsChangedDataRefelected,
}) => {
  const { id } = useParams<{ id: string }>();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="w-full md:mt-4">
        <div className="w-10/12 block">
          <textarea
            placeholder="Enter your Answer here..."
            className=" w-11/12 md:ml-6 border-[1px] border-[#EBF0ED]  p-3 rounded-lg h-[70px] md:h-[120px]"
            // rows={4}
            disabled
          />
        </div>
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

export default ParagrapghQuestionnaire;
