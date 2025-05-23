import axios from "@/lib/config/axios-instance";
import {
  CustomersResponseType,
  CreateCustomerData,
  CreateCustomerDetails,
  TargetedCustomerData,
  createCustomerNoteReponse,
  createCustomerNote,
  updateCustomerNoteResponse,
  updateCustomerNote,
  CreateCustomerDetail,
} from "@/lib/types/customer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { buildUrlWithParams } from "@/lib/helpers";
import { updateUserResponseType, updateUserType } from "@/lib/types/user";
import { useNavigate } from "react-router-dom";
import { ApiTeamResponse } from "@/lib/types/team";
const CustomersService = () => {
  // const navigate = useNavigate();

  // const queryClient = useQueryClient();
  const useFetchAllCustomers = (
    limit?: number,
    page?: number,
    query?: string,
    status?: string
  ) => {
    async function fetchTeam(): Promise<CustomersResponseType> {
      const url = buildUrlWithParams("/customer", {
        page,
        limit,
        query,
        status,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["customer", limit, page, query, status],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleDeleteCustomer = (reset: () => void, selectedId?: number) => {
    // const dat = { status: "Deactivated" };
    const queryClient = useQueryClient();

    function handleDeleteUserRequest(): Promise<updateUserResponseType> {
      return axios.delete(`/customer/${selectedId}`);
    }

    const onSuccess = (response: updateUserResponseType) => {
      notification.success({
        message: "Customer Deleted",
        description: "Customer Deleted",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      console.log(response);
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Delete Customer",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteUserRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };

  const useHandleCreateCustomerService = (reset: () => void) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    function handleCreateCustomerRequest(
      data: CreateCustomerDetail
    ): Promise<CreateCustomerData> {
      console.log("data from frontend", data);

      return axios.post(`/customer`, data);
    }

    const onSuccess = (response: CreateCustomerData) => {
      console.log(
        response,
        "data from scuss response from sever after create user"
      );
      notification.success({
        message: "Customer created Successful",
        description: "You have successfully created the customer!",
        placement: "topRight",
      });
      navigate(`/customer-edit-profile/${response?.data?.data?.id}`);
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error, "error from create customer");
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "customer Not Created",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateCustomerRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchTargetedCustomer = (
    id?: number,
    limit?: number,
    page?: number
  ) => {
    async function fetchTargetedCustomer(): Promise<TargetedCustomerData> {
      const url = buildUrlWithParams(`/customer/${id}`, {
        limit,
        page,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchTargetedCustomer,
      queryKey: ["customer", id, page, limit],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleUpdateCustomerService = (reset: () => void, id?: number) => {
    const queryClient = useQueryClient();

    function handleUpdateCustomerRequest(
      data: FormData | CreateCustomerDetails | updateUserType
    ): Promise<updateUserResponseType> {
      console.log(data, "data from update customer");
      return axios.put(`/customer/${id}`, data);
    }
    const onSuccess = (response: updateUserResponseType) => {
      console.log(
        "update customer response form server you can check it",
        response
      );
      notification.success({
        message: "customer Profile Updated Successfully",
        description: "You have successfully updated the customer Profile!",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["customer", id] });
    };
    const onError = (error: errorType) => {
      console.log("error", error);
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Update customer",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateCustomerRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleCreateCustomerNoteService = (reset: () => void) => {
    const queryClient = useQueryClient();

    function handleCreateCustomerNoteRequest(
      data: createCustomerNote
    ): Promise<createCustomerNoteReponse> {
      console.log("data from frontend", data);

      return axios.post(`/customer/note`, data);
    }

    const onSuccess = (response: createCustomerNoteReponse) => {
      console.log(
        response,
        "data from scuss response from sever after create notes"
      );
      notification.success({
        message: "Customer notes created  Successful",
        description: "You have successfully created the customer notes",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error, "error from create customer");
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "customer notes Not Created",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateCustomerNoteRequest,
      onSuccess,
      onError,

      retry: 0,
    });
  };
  const useHandleUpdateCustomerNoteService = (
    reset: () => void,
    id?: number
  ) => {
    const queryClient = useQueryClient();

    function handleUpdateCustomerNoteRequest(
      data: updateCustomerNote
    ): Promise<updateCustomerNoteResponse> {
      console.log(data, "data from update customer note");
      return axios.put(`/customer/note/${id}`, data);
    }
    const onSuccess = (response: updateCustomerNoteResponse) => {
      console.log(
        "update customer notes response form server you can check it",
        response
      );
      notification.success({
        message: "customer notes updated  Successfully",
        description: "You have successfully updated the customer notes ",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["customer", id] });
    };
    const onError = (error: errorType) => {
      console.log("error", error);
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Update customer notes",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateCustomerNoteRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleDeleteCustomerNotes = (id?: number) => {
    async function handleDeleteCustomer(): Promise<ApiTeamResponse> {
      return axios.delete(`/customer/note/${id}`).then((res) => res.data);
    }
    const queryClient = useQueryClient();

    const onSuccess = (response: ApiTeamResponse) => {
      console.log("response form server Customer notes", response);

      notification.success({
        message: "Team Deleted",
        description: "You have successfully Deleted Customer notes",
        placement: "topRight",
      });

      queryClient.invalidateQueries({
        queryKey: ["customer", id],
      });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Customer failed to delete",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteCustomer,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  return {
    useFetchAllCustomers,
    useHandleDeleteCustomer,
    useHandleCreateCustomerService,
    useFetchTargetedCustomer,
    useHandleUpdateCustomerService,
    useHandleCreateCustomerNoteService,
    useHandleUpdateCustomerNoteService,
    useHandleDeleteCustomerNotes,
  };
};

export default CustomersService;
