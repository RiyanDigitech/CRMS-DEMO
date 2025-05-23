export interface Survey {
  id?: number;
  name?: string;
  description?: string;
  startDate?: string | dayjs.Dayjs;
  endDate?: string | dayjs.Dayjs;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
}

export interface SurveyData {
  TotalSurveys: number;
  TotalResponses: number;
  AverageRating: number;
  Surveys: Survey[];
}
export interface SurveyResponse {
  message: string;
  data: SurveyData[];
  page: number;
  total: number;
  lastPage: number;
}
export interface SurveyCreateResponseType {
  data: {
    data: {
      createdAt: string;
      description: string;
      endDate: string;
      id: number;
      name: string;
      startDate: string;
      updatedAt: string;
      version: number;
    };
  };
}
//dashboardsurvey
export interface SurveyCount {
  Date: string;
  count: string;
}

export interface ResponseCount {
  Date: string;
  count: string;
}

export interface SurveyResponseData {
  Surveys: SurveyCount[];
  Responses: ResponseCount[];
}
export interface TrendsChartProps {
  apiData: {
    message: string;
    data: SurveyResponseData[];
  };
}
export interface SurveyDashboard {
  message: string;
  data: SurveyResponseData[];
}

interface CreateQuestionType {
  survey?: number;
  questionText?: string;
  questionType?: string;
  order?: number;
  questionRequired?: string;
}

interface QuestionData {
  survey?: Survey;
  questionText?: string;
  questionType?: string;
  order?: number;
  questionRequired?: "Optional" | "Required";
  id?: number;
}

export interface QuestionaireResponse {
  message: string;
  data: QuestionData;
}
export interface AnswerOptionType {
  optionText: string;
  order?: number;
}
export interface UpdateAnswerOptionType {
  optionText: string;
  id?: number;
  order?: number;
}
export interface CreateMultiChiceQuestionType {
  survey?: number;
  questionText?: string;
  questionType?: string;
  order?: number;
  questionRequired?: string;
  answerOptions?: AnswerOptionType[];
}
export interface UpdateMultiChiceQuestionType {
  survey?: number | undefined;
  order?: number;
  id?: number;
  questionText?: string;
  questionType?: string;
  questionRequired?: string | boolean; // ✅ Allow both string & boolean
  answerOptions?: UpdateAnswerOptionType[];
}

export interface SurveyCreateQuestionResponse {
  question: number;
  option?: string[];
  answerText?: string;
  rating?: number;
}
export interface SurveyCreateResponse {
  survey: number | undefined;
  responseDetail: SurveyCreateQuestionResponse[] | undefined;
}

//create response
interface SurveyCreateResponseApiResponse {
  message: string;
  data: SurveyCreateResponseData;
}

interface SurveyCreateResponseData {
  survey: SurveyCreateResponseDetails;
  participant: ParticipantDetails;
  responseDetails: CreateResponseDetail[];
  id: number;
  timestamp: string;
}

interface SurveyCreateResponseDetails {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface ParticipantDetails {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  location: string;
  consent: boolean;
}

interface CreateResponseDetail {
  id: number;
  question: QuestionDetails;
  option?: OptionDetails[];
  answerText?: string | null;
  rating?: number | null;
}

interface QuestionDetails {
  id: number;
  questionText: string;
  questionType: string;
  order?: number;
  questionRequired: string;
}

interface OptionDetails {
  id: number;
  optionText: string;
  order?: number;
}
export interface AnswerOption {
  id: number;
  optionText: string;
  order?: number;
}
export interface SingleQuestionnaireProps {
  selectedOption: string;
  questionText: string | undefined;
  questionRequired: string | boolean;

  questionsCount?: number;
  questionId: number | undefined;
  answerOptions: AnswerOption[];
  setIsChangedDataRefelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsQuestionUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isQuestionUpdate?: boolean;
  isChangedDataRefelected: boolean;
  data: UpdateMultiChiceQuestionType;
  questionUpdateId?: number | undefined;
  setQuestionUpdateId?:
    | React.Dispatch<React.SetStateAction<number | undefined>>
    | undefined;
}
export interface RatingQuestionnaireProps {
  selectedOption: string;
  questionText: string | undefined;
  questionRequired: string | boolean;
  questionsCount?: number;
  questionId: number | undefined;
  setIsQuestionUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isQuestionUpdate: boolean;
  setIsChangedDataRefelected: React.Dispatch<React.SetStateAction<boolean>>;
  data: UpdateMultiChiceQuestionType;
  // specificQuestionId: number | undefined;
}
//ResposeDetaisl
export interface ApiSurveyDetailsResponse {
  message: string;
  data: ParticipantData[];
  page: number;
  total: number;
  lastPage: number;
}

interface ParticipantData {
  participant: string;
  surveyName: string;
  surveyDescription: string;
  responseDetail?: ResponseSurveyDetail[];
}

interface ResponseSurveyDetail {
  question: Question;
}

interface Question {
  questionText: string;
  questionType: "Multi Choice" | "Single Choice" | "Text" | "Rating";
  options?: SurveyDetailsOption[];
  answerText?: string;
  rating?: number;
}

interface SurveyDetailsOption {
  id: number;
  optionText: string;
}

// Option Type
export interface StaticOption {
  optionId: number;
  option: string;
  count: string;
}

// Multi Choice Question Type
interface MultiChoiceStaticQuestion {
  questionId: number;
  question: string;
  type: "Multi Choice";
  options: StaticOption[];
}

// Single Choice Question Type
interface SingleChoiceStaticQuestion {
  questionId: number;
  question: string;
  type: "Single Choice";
  options: StaticOption[];
}

// Rating Type
interface RatingStaticPercent {
  rating: number;
  percent: string;
}

interface RatingStaticQuestion {
  AverageRating: {
    questionId: number;
    question: string;
    type: "Rating";
    average: string;
    ratingPercent: RatingStaticPercent[];
  }[];
}

// Text Type
interface TextQuestion {
  answers: {
    questionid: number;
    question: string;
    type: "Text";
    answers: string[];
  }[];
}

// Total Responses Type
interface TotalResponses {
  totalResponses: number;
}

// Combine All Types
type SurveyResponseSummaryItem =
  | TotalResponses
  | MultiChoiceStaticQuestion
  | SingleChoiceStaticQuestion
  | RatingStaticQuestion
  | TextQuestion;

// Full API Response Type
export interface SurveyResponseSummaryData {
  message: string;
  data: SurveyResponseSummaryItem[];
}
