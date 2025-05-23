import { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { Switch } from "antd";
import UpdateParagrapghQuestionnaire from "./update-paragraph-questionaire";
import UpdateratingQuestionnaire from "./update-rating-questionaire";
import UpdateSingleChoiceQuestionnaire from "./update-single-choice-questionaire";
import UpdateMultiChoiceQuestionaire from "./update-multichoice-questionaire";
import SurveysService from "@/services/survey/survey.services";
import { GoArrowRight } from "react-icons/go";
import { UpdateMultiChiceQuestionType } from "@/lib/types/survey";

const { Option } = Select;
type AnswerOption = {
  id: number;
  optionText: string;
  order: number;
};
type Question = {
  id: number;
  questionText: string;
  questionType: string;
  order: number;
  questionRequired: string | boolean;
  answerOptions: AnswerOption[];
};
interface UpdateQuestionaireProps {
  QuestionsDetails: Question[];
  isChangedDataRefelected: boolean;
  setIsChangedDataRefelected: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateQuestionaire: React.FC<UpdateQuestionaireProps> = ({
  QuestionsDetails,
  setIsChangedDataRefelected,
  isChangedDataRefelected,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const [questionText, setQuestionText] = useState<string | undefined>("");

  const [questionRequired, setQuestionRequired] = useState<boolean>(false);

  const [targetedId, setTargetedId] = useState<number | undefined>(undefined);

  const [questionTypeId, setQuestionTypeId] = useState<number | undefined>(
    undefined
  );
  const [textQuestionId, settextQuestionId] = useState<number | undefined>(
    undefined
  );
  const [questionId, setQuestionId] = useState<number | undefined>(undefined);
  const [questionUpdateId, setQuestionUpdateId] = useState<number | undefined>(
    undefined
  );

  const [requiredId, setSwitchRequiredId] = useState<number | undefined>(
    undefined
  );

  const { useFetchDeletedSurveyQuestionaire } = SurveysService();
  const [isQuestionUpdate, setIsQuestionUpdate] = useState<boolean>(true);
  const handleChange = (value: string, data: UpdateMultiChiceQuestionType) => {
    setSelectedOption(value);
    setQuestionTypeId(data?.id);
    setQuestionId(data?.id);
    setQuestionUpdateId(data?.id);
    if (!questionText) {
      setQuestionText(data?.questionText);
    }
    setIsQuestionUpdate(false);
  };
  const handleQuestionTextChange = (
    id: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionText(e.target.value);
    settextQuestionId(id);
    setQuestionId(id);
    setQuestionUpdateId(id);
    setIsQuestionUpdate(false);
  };
  const toggleSwitch = (
    data: UpdateMultiChiceQuestionType,
    checked: boolean
  ) => {
    setQuestionId(data?.id);
    setSwitchRequiredId(data?.id);
    setQuestionRequired(checked);
    setIsQuestionUpdate(false);
    if (!questionText) {
      setQuestionText(data?.questionText);
    }
    console.log(checked, "checked boolean");
    setQuestionUpdateId(data?.id);
  };

  const { mutate: deleteQuestion, isPending } =
    useFetchDeletedSurveyQuestionaire(targetedId);

  const handleDeleteQuestion = (
    e: React.MouseEvent<HTMLButtonElement>,
    questionId: number
  ) => {
    e.preventDefault();
    setTargetedId(questionId);
    deleteQuestion();
  };
  useEffect(() => {
    setQuestionTypeId(undefined);
    setQuestionId(undefined);
    setSelectedOption("");
    setQuestionRequired((prev) => !prev);
    setQuestionText("");
    setQuestionUpdateId(undefined);
  }, [isChangedDataRefelected]);
  console.log(QuestionsDetails, "QuestionsDetails");
  return (
    <>
      {QuestionsDetails.map((data, ind) => (
        <div
          key={ind}
          id={`${data?.id}`}
          className="bg-white  pl-5 pt-5 rounded-lg grid grid-cols-12  my-4 pb-5"
        >
          <div className="col-span-12 md:col-span-6  order-2 md:order-1 h-full mt-2 md:mt-0">
            <div className="text-[#008444] leading-[14.52px] font-semibold mb-2 md:mb-4  flex items-center">
              <p className="mr-1 font-bold text-lg flex items-center">
                {" "}
                {ind + 1}
                <GoArrowRight />
              </p>{" "}
              <p className="ml-1">Update Question Here</p>
            </div>
            <textarea
              placeholder="Enter your Question Details here"
              className="outline-none w-full  md:w-10/12 resize-none  md:ml-9"
              rows={1}
              value={
                questionId === data.id && textQuestionId === data.id
                  ? questionText
                  : data?.questionText
              }
              onChange={(e) => handleQuestionTextChange(data.id, e)} // Update only the specific question text
            />

            {questionTypeId === data.id ? (
              selectedOption === "Text" ? (
                <UpdateParagrapghQuestionnaire
                  selectedOption={selectedOption}
                  questionText={
                    questionId === data.id ? questionText : data?.questionText
                  }
                  questionRequired={
                    requiredId === data?.id
                      ? questionRequired
                      : data?.questionRequired
                  }
                  questionId={questionId}
                  setIsQuestionUpdate={setIsQuestionUpdate}
                  isQuestionUpdate={isQuestionUpdate}
                  setIsChangedDataRefelected={setIsChangedDataRefelected}
                  data={data}
                />
              ) : selectedOption === "Multi Choice" ? (
                <UpdateMultiChoiceQuestionaire
                  selectedOption={selectedOption}
                  questionText={
                    questionId === data.id ? questionText : data?.questionText
                  }
                  questionRequired={
                    requiredId === data?.id
                      ? questionRequired
                      : data?.questionRequired
                  }
                  questionId={data?.id}
                  answerOptions={data?.answerOptions}
                  setIsChangedDataRefelected={setIsChangedDataRefelected}
                  setIsQuestionUpdate={setIsQuestionUpdate}
                  isQuestionUpdate={isQuestionUpdate}
                  isChangedDataRefelected={isChangedDataRefelected}
                  data={data}
                  questionUpdateId={questionUpdateId}
                />
              ) : selectedOption === "Single Choice" ? (
                <UpdateSingleChoiceQuestionnaire
                  selectedOption={selectedOption}
                  questionText={
                    questionId === data.id ? questionText : data?.questionText
                  }
                  questionRequired={
                    requiredId === data?.id
                      ? questionRequired
                      : data?.questionRequired
                  }
                  questionId={data?.id}
                  answerOptions={data?.answerOptions}
                  setIsChangedDataRefelected={setIsChangedDataRefelected}
                  setIsQuestionUpdate={setIsQuestionUpdate}
                  isQuestionUpdate={isQuestionUpdate}
                  isChangedDataRefelected={isChangedDataRefelected}
                  data={data}
                  questionUpdateId={questionUpdateId}
                  setQuestionUpdateId={setQuestionUpdateId}
                />
              ) : (
                <UpdateratingQuestionnaire
                  selectedOption={selectedOption}
                  questionText={
                    questionId === data.id ? questionText : data?.questionText
                  }
                  questionRequired={
                    requiredId === data?.id
                      ? questionRequired
                      : data?.questionRequired
                  }
                  questionId={questionId}
                  setIsQuestionUpdate={setIsQuestionUpdate}
                  isQuestionUpdate={isQuestionUpdate}
                  setIsChangedDataRefelected={setIsChangedDataRefelected}
                  data={data}
                />
              )
            ) : data?.questionType === "Text" ? (
              <UpdateParagrapghQuestionnaire
                selectedOption={selectedOption}
                questionText={
                  questionId === data.id ? questionText : data?.questionText
                }
                questionRequired={
                  requiredId === data?.id
                    ? questionRequired
                    : data?.questionRequired
                }
                questionId={questionId}
                setIsQuestionUpdate={setIsQuestionUpdate}
                isQuestionUpdate={isQuestionUpdate}
                setIsChangedDataRefelected={setIsChangedDataRefelected}
                data={data}
              />
            ) : data?.questionType === "Multi Choice" ? (
              <UpdateMultiChoiceQuestionaire
                selectedOption={selectedOption}
                questionText={
                  questionId === data.id ? questionText : data?.questionText
                }
                questionRequired={
                  requiredId === data?.id
                    ? questionRequired
                    : data?.questionRequired
                }
                questionId={data?.id}
                answerOptions={data?.answerOptions}
                setIsChangedDataRefelected={setIsChangedDataRefelected}
                setIsQuestionUpdate={setIsQuestionUpdate}
                isQuestionUpdate={isQuestionUpdate}
                isChangedDataRefelected={isChangedDataRefelected}
                data={data}
                questionUpdateId={questionUpdateId}
              />
            ) : data?.questionType === "Single Choice" ? (
              <UpdateSingleChoiceQuestionnaire
                selectedOption={selectedOption}
                questionText={
                  questionId === data.id ? questionText : data?.questionText
                }
                questionRequired={
                  requiredId === data?.id
                    ? questionRequired
                    : data?.questionRequired
                }
                questionId={data?.id}
                answerOptions={data?.answerOptions}
                setIsChangedDataRefelected={setIsChangedDataRefelected}
                setIsQuestionUpdate={setIsQuestionUpdate}
                isQuestionUpdate={isQuestionUpdate}
                isChangedDataRefelected={isChangedDataRefelected}
                data={data}
                questionUpdateId={questionUpdateId}
              />
            ) : (
              <UpdateratingQuestionnaire
                selectedOption={selectedOption}
                questionText={
                  questionId === data.id ? questionText : data?.questionText
                }
                questionRequired={
                  requiredId === data?.id
                    ? questionRequired
                    : data?.questionRequired
                }
                questionId={questionId}
                setIsQuestionUpdate={setIsQuestionUpdate}
                isQuestionUpdate={isQuestionUpdate}
                setIsChangedDataRefelected={setIsChangedDataRefelected}
                data={data}
              />
            )}
          </div>
          <div className="col-span-12 md:col-span-4 relative md:order-2 h-full md:ml-5 ">
            <span className="hidden absolute top-3 md:block left-4 z-999">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8.89526"
                  cy="8.89526"
                  r="8.39526"
                  stroke="#D9D9D9"
                />
              </svg>
            </span>
            {
              <Select
                onChange={(value) => handleChange(value, data)}
                value={
                  questionTypeId === data.id
                    ? selectedOption
                    : data?.questionType
                }
                className="w-5/12 md:w-9/12 flex items-center h-[40px]  border-[1px] border-[#EBF0ED] rounded-lg focus:ring-0 focus:border-[#EBF0ED] hover:border-[#EBF0ED]"
              >
                <Option value="Multi Choice">
                  <div className="flex items-center ml-2 md:ml-9">
                    <div> Multiple Choices</div>
                  </div>
                </Option>
                <Option value="Single Choice">
                  <div className="flex items-center ml-2 md:ml-9">
                    <div> Single Choice</div>
                  </div>
                </Option>
                <Option value="Text">
                  <div className="flex items-center ml-2 md:ml-9">
                    <div> Paragraph</div>
                  </div>
                </Option>
                <Option value="Rating">
                  <div className="flex items-center ml-2 md:ml-9">
                    <div> Rating</div>
                  </div>
                </Option>
              </Select>
            }
            <form className=" absolute bottom-0 right-1 md:right-0 md:left-2 z-999 md:w-[70%] flex justify-between items-center">
              <button
                onClick={(e) => handleDeleteQuestion(e, data.id)} // Pass the id to the handler function
                className=" cursor-pointer border-[1px] border-[EBF0ED] bg-[#FAFAFA] h-[36px] w-[36px] rounded-lg flex justify-center items-center"
              >
                {targetedId === data.id && isPending ? (
                  <>
                    <Spin />
                  </>
                ) : (
                  <img src="/Delete.png" alt="pic" />
                )}
              </button>
              <div>
                <span className="text-[#18120f] font-manrope font-semibold mx-2 md:mx-0">
                  Required
                </span>
                <Switch
                  className="md:ml-6"
                  size="small"
                  checked={
                    requiredId === data?.id
                      ? questionRequired
                      : data?.questionRequired === "Required"
                      ? true
                      : false
                  }
                  onChange={(checked) => toggleSwitch(data, checked)}
                />
              </div>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default UpdateQuestionaire;
