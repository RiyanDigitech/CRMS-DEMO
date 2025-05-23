import axios from "@/lib/config/axios-instance";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { buildUrlWithParams } from "@/lib/helpers";
import {
  ApiSurveyDetailsResponse,
  CreateMultiChiceQuestionType,
  CreateQuestionType,
  QuestionaireResponse,
  Survey,
  SurveyCreateResponse,
  SurveyCreateResponseApiResponse,
  SurveyCreateResponseType,
  SurveyResponse,
  SurveyResponseSummaryData,
  UpdateMultiChiceQuestionType,
} from "@/lib/types/survey";
import { useNavigate } from "react-router-dom";
export interface TargetedSurveyType {
  message: string;
  data: SurveyData;
}

export interface SurveyData {
  id: number;
  name: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  version: number;
  questions: Question[];
}

export interface Question {
  id: number;
  questionText: string;
  questionType: QuestionType;
  order: number;
  questionRequired: string;
  answerOptions: AnswerOption[];
}

export type QuestionType = "Multi Choice" | "Rating" | "Text" | "Single Choice";
export type QuestionRequired = "Required" | "Optional";

export interface AnswerOption {
  id: number;
  optionText: string;
  order: number;
}
//dashboard
interface SurveyDashoboard {
  Date: string;
  count: string;
}

interface Response {
  Date: string;
  count: string;
}

interface SurveyDataDashboard {
  Surveys: SurveyDashoboard[];
  Responses: Response[];
}

export interface ApiResponseDashboard {
  message: string;
  data: SurveyDataDashboard[];
}

const SurveysService = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const useFetchAllSurveys = (limit?: number, page?: number) => {
    async function fetchSurvey(): Promise<SurveyResponse> {
      const url = buildUrlWithParams("/survey", {
        limit,
        page,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchSurvey,
      queryKey: ["survey", limit, page],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchAllSurveysResponse = (limit?: number, page?: number) => {
    async function fetchSurveyResponse(): Promise<SurveyResponse> {
      const url = buildUrlWithParams("/survey/response", {
        limit,
        page,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchSurveyResponse,
      queryKey: ["survey", limit, page],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateSurveyService = (reset: () => void) => {
    function handleCreateSurveyRequest(
      data: Survey
    ): Promise<SurveyCreateResponseType> {
      return axios.post(`/survey`, data);
    }

    const onSuccess = (response: SurveyCreateResponseType) => {
      notification.success({
        message: "Survey created Successful",
        description: `You have successfully created the Survey!`,
        placement: "topRight",
      });

      navigate(`/survey-details/${response?.data?.data?.id}`);
      queryClient.invalidateQueries({ queryKey: ["survey"] });
      reset();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Survey Not Created",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateSurveyRequest,
      onSuccess,
      onError,

      retry: 0,
    });
  };
  const useFetchTargetedSurvey = (
    id?: number,
    isChangedDataRefelected?: boolean
  ) => {
    async function fetchTargetedSurvey(): Promise<TargetedSurveyType> {
      return axios.get(`/survey/${id}`).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchTargetedSurvey,
      queryKey: ["survey", id, isChangedDataRefelected],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleUpdateSurveyService = (reset: () => void, id?: number) => {
    function handleUpdateSurveyRequest(data: Survey): Promise<SurveyResponse> {
      return axios.put(`/survey/${id}`, data);
    }

    const onSuccess = (response: SurveyResponse) => {
      notification.success({
        message: "Survey Profile Updated Successfully",
        description: "You have successfully updated the Survey Profile!",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({
        queryKey: ["survey"],
      });
      console.log(response);
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Update Survey",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateSurveyRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleCreateQuestionService = (reset: () => void) => {
    function handleCreateSurveyRequest(
      data: CreateQuestionType | CreateMultiChiceQuestionType
    ): Promise<QuestionaireResponse> {
      return axios.post(`/survey/question`, data);
    }

    const onSuccess = (response: QuestionaireResponse) => {
      console.log("response form server", response);
      notification.success({
        message: "Questionaire created Successful",
        description: "You have successfully created the Questionaire!",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["survey"] });
      reset();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Question Not Created",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateSurveyRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleUpdateSurveyQuestionaireService = (
    reset: () => void,
    id?: number
  ) => {
    function handleUpdateSurveyQuestionaireRequest(
      data: UpdateMultiChiceQuestionType
    ): Promise<SurveyResponse> {
      return axios.put(`/survey/question/${id}`, data);
    }
    const onSuccess = () => {
      notification.success({
        message: "Survey Questionaire Updated Successfully",
        description: "You have successfully updated the Questionaire",
        placement: "topRight",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["survey", id] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Update Survey Question",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateSurveyQuestionaireRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleCreateSurveyResponseService = (reset: () => void) => {
    function handleCreateSurveyResponseRequest(
      data: SurveyCreateResponse
    ): Promise<SurveyCreateResponseApiResponse> {
      return axios.post(`/survey/response`, data);
    }
    const onSuccess = (response: SurveyCreateResponseApiResponse) => {
      console.log("response form server", response);

      notification.success({
        message: "Survey Response created Successful",
        description: "You have successfully submitted the response ",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["survey"] });
      reset();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Survey Not Created",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateSurveyResponseRequest,
      onSuccess,
      onError,

      retry: 0,
    });
  };
  const useFetchDeletedSurveyQuestionaire = (selectedId?: number) => {
    function handleDeleteSurveyQuestionaireRequest(): Promise<SurveyResponse> {
      return axios.delete(`/survey/question/${selectedId}`);
    }
    const onSuccess = () => {
      notification.success({
        message: "Survey Questionaire Deleted Successfully",
        description: "You have successfully Deleted the Questionaire",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["survey"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Delete Question",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteSurveyQuestionaireRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchDeletedAnswerOption = (
    selectedId?: number,
    setAnswerOptDelApiId?: React.Dispatch<
      React.SetStateAction<number | undefined>
    >
  ) => {
    function handleDeleteSurveyAnswerOpt(): Promise<SurveyResponse> {
      return axios.delete(`/survey/answerOpt/${selectedId}`);
    }
    const onSuccess = () => {
      notification.success({
        message: "Answer Option Deleted Successfully",
        description: "You have successfully Deleted the Options",
        placement: "topRight",
      });
      if (setAnswerOptDelApiId) {
        setAnswerOptDelApiId(undefined);
      }
      queryClient.invalidateQueries({ queryKey: ["survey"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Delete Answer Option",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteSurveyAnswerOpt,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchDeletedSurvey = (selectedId?: number) => {
    function handleDeleteSurveyRequest(): Promise<SurveyResponse> {
      return axios.delete(`/survey/${selectedId}`);
    }
    const onSuccess = () => {
      notification.success({
        message: "Survey  Deleted Successfully",
        description: "You have successfully Deleted the ",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["survey"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Delete Survey",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteSurveyRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchAllDashboardSurveyAndResponses = (
    startDate?: string,
    endDate?: string
  ) => {
    async function fetchSurveyDashboardData(): Promise<ApiResponseDashboard> {
      const url = buildUrlWithParams("/survey/dashboard", {
        startDate,
        endDate,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchSurveyDashboardData,
      queryKey: ["survey", endDate],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchAllSurveyResponses = (
    limit?: number,
    page?: number,
    query?: number
  ) => {
    async function fetchSurveResponses(): Promise<ApiSurveyDetailsResponse> {
      const url = buildUrlWithParams("/survey/response", {
        limit,
        page,
        query,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchSurveResponses,
      queryKey: ["survey", limit, page, query],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchSurveyResponseSummary = (surveyId?: number) => {
    async function fetchSurveResponseSummary(): Promise<SurveyResponseSummaryData> {
      const url = buildUrlWithParams("/survey/response-stat", {
        surveyId,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchSurveResponseSummary,
      queryKey: ["survey", surveyId],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useFetchAllSurveys,
    useFetchAllSurveysResponse,
    useHandleCreateSurveyService,
    useFetchTargetedSurvey,
    useHandleUpdateSurveyService,
    useHandleCreateQuestionService,
    useHandleUpdateSurveyQuestionaireService,
    useHandleCreateSurveyResponseService,
    useFetchDeletedSurveyQuestionaire,
    useFetchDeletedAnswerOption,
    useFetchDeletedSurvey,
    useFetchAllDashboardSurveyAndResponses,
    useFetchAllSurveyResponses,
    useFetchSurveyResponseSummary,
  };
};
export default SurveysService;
