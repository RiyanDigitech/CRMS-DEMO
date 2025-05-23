import SingleChoiceQuestionaire from "./single-choice-questionaire";
import { useState } from "react";
import { Select } from "antd";
import MultipleChoiceQuestionnaire from "./multiple-choice-questionaire";
import ParagrapghQuestionnaire from "./paragraph-questionaire";
import RatingQuestionnaire from "./rating-questonaire";
import { Switch } from "antd";
import { GoArrowRight } from "react-icons/go";

const { Option } = Select;

const CreateQuestionaire = ({
  setIsChangedDataRefelected,
  questionsCount,
}: {
  setIsChangedDataRefelected: React.Dispatch<React.SetStateAction<boolean>>;
  questionsCount: number;
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("Multi Choice");
  const [questionText, setQuestionText] = useState<string>("");
  const [questionRequired, setQuestionRequired] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };
  const handleQuestionTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionText(e.target.value);
  };
  const toggleSwitch = (checked: boolean) => {
    setQuestionRequired(checked);
  };
  return (
    <div className="bg-white pl-5 py-5 rounded-lg grid grid-cols-12  mb-2 h-full">
      <div className="col-span-12 md:col-span-6  order-2 md:order-1 h-full mt-2 md:mt-0  ">
        <div className="text-[#008444] leading-[14.52px] font-semibold mb-2 md:mb-4  flex items-center">
          <p>{questionsCount + 1}</p>
          <p>
            {" "}
            <GoArrowRight />
          </p>
          <p className="ml-3">Enter Question Here</p>
        </div>
        <textarea
          placeholder="Description Here"
          className="outline-none w-full  md:w-10/12 resize-none  md:ml-9"
          rows={1}
          value={questionText}
          onChange={handleQuestionTextChange}
        />
        {selectedOption === "Multi Choice" && (
          <>
            <MultipleChoiceQuestionnaire
              selectedOption={selectedOption}
              questionText={questionText}
              setQuestionText={setQuestionText}
              questionRequired={questionRequired}
              setQuestionRequired={setQuestionRequired}
              questionsCount={questionsCount}
              setIsChangedDataRefelected={setIsChangedDataRefelected}
            />
          </>
        )}
        {selectedOption === "Single Choice" && (
          <SingleChoiceQuestionaire
            selectedOption={selectedOption}
            questionText={questionText}
            setQuestionText={setQuestionText}
            questionRequired={questionRequired}
            setQuestionRequired={setQuestionRequired}
            questionsCount={questionsCount}
            setIsChangedDataRefelected={setIsChangedDataRefelected}
          />
        )}
        {selectedOption === "Text" && (
          <ParagrapghQuestionnaire
            selectedOption={selectedOption}
            questionText={questionText}
            setQuestionText={setQuestionText}
            setQuestionRequired={setQuestionRequired}
            questionsCount={questionsCount}
            questionRequired={questionRequired}
            setIsChangedDataRefelected={setIsChangedDataRefelected}
          />
        )}
        {selectedOption === "Rating" && (
          <RatingQuestionnaire
            selectedOption={selectedOption}
            questionText={questionText}
            setQuestionText={setQuestionText}
            setQuestionRequired={setQuestionRequired}
            questionsCount={questionsCount}
            questionRequired={questionRequired}
            setIsChangedDataRefelected={setIsChangedDataRefelected}
          />
        )}
      </div>
      <div className="col-span-12 md:col-span-4 relative md:order-2 h-full md:ml-5">
        <span className=" hidden absolute top-3 md:block left-4 z-999">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8.89526" cy="8.89526" r="8.39526" stroke="#D9D9D9" />
          </svg>
        </span>
        {
          <Select
            defaultValue={selectedOption}
            onChange={handleChange}
            className="w-7/12 md:w-9/12  h-[40px]  border-[1px] border-[#EBF0ED] rounded-lg focus:ring-0 focus:border-[#EBF0ED] hover:border-[#EBF0ED]"
          >
            <Option value="Multi Choice">
              <div className="flex items-center md:ml-9">
                <div> Multiple Choices</div>
              </div>
            </Option>
            <Option value="Single Choice">
              <div className="flex items-center md:ml-9">
                <div> Single Choice</div>
              </div>
            </Option>
            <Option value="Text">
              <div className="flex items-center md:ml-9">
                <div> Paragraph</div>
              </div>
            </Option>
            <Option value="Rating">
              <div className="flex items-center md:ml-9">
                <div> Rating</div>
              </div>
            </Option>
          </Select>
        }{" "}
        {/* md:w-[70%] flex justify-between items-center */}
        <div className=" absolute bottom-2 right-1 md:right-0 md:left-2 md:bottom-0 z-999 md:w-[70%] flex justify-between items-center  ">
          <span className="">Required</span>
          <Switch
            size="small"
            className="ml-3 md:ml-6"
            checked={questionRequired} // Reflect the current state
            onChange={toggleSwitch} // Update state on toggle
          />
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionaire;
