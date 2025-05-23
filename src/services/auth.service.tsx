import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axios from "@/lib/config/axios-instance";
import tokenService from "./token.service";
import { errorType } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { userType } from "@/lib/types";
import {
  ChangePasswordType,
  ForgotEmailResponse,
  ForgotEmailType,
  LoginApiResponse,
  OtpVerificationResponseType,
  OtpVerificationType,
} from "@/lib/types/auth";

const AuthService = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const useHandleLoginInService = (reset: () => void) => {
    function handleLogInRequest(data: userType): Promise<LoginApiResponse> {
      return axios.post(`/auth/login`, data);
    }

    const onSuccess = (response: LoginApiResponse) => {
      console.log(response);

      tokenService.setUser(response?.data?.data?.user);

      tokenService.setTokenRetries(5);
      tokenService.saveLocalRefreshToken("");
      tokenService.saveLocalAccessToken(response?.data?.data?.access_token);
      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in!",
        placement: "topRight",
      });
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error);
      notification.error({
        message: "Login Failed",
        description: error?.response?.data?.message || "Login Failed",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleLogInRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };

  const useHandleForGotPassword = (reset: () => void) => {
    function handleForgotRequest(
      data: ForgotEmailType
    ): Promise<ForgotEmailResponse> {
      return axios.post(`/auth/forgot-password`, data);
    }
    const onSuccess = (response: ForgotEmailResponse) => {
      console.log(response);

      notification.success({
        message: "request Successful",
        description: "OTP Code send on your email account",
        placement: "topRight",
      });
      navigate("/otpforgetpassword");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error);
      notification.error({
        message: "Failed",
        description:
          error?.response?.data?.message || "Failed to Forget-password",
        placement: "topRight",
      });
      navigate("/auth/email-verification");
    };
    return useMutation({
      mutationFn: handleForgotRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleOTPValidate = (reset: () => void) => {
    function handleForgotRequest(
      data: OtpVerificationType
    ): Promise<OtpVerificationResponseType> {
      return axios.post(`/auth/forgot-password/validate-code`, data);
    }
    const onSuccess = (response: OtpVerificationResponseType) => {
      console.log(response);

      notification.success({
        message: "request Successful",
        description: "otp verified successfully",
        placement: "topRight",
      });
      navigate("/createnewpassword");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error);
      notification.error({
        message: "Request Failed",
        description: error?.response?.data?.message || "Something went wrong!",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleForgotRequest,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleChangePassword = (reset: () => void) => {
    function handleForgotRequest(
      data: ChangePasswordType
    ): Promise<OtpVerificationResponseType> {
      return axios.post(`/auth/forgot-password/change-password`, data);
    }
    const onSuccess = (response: OtpVerificationResponseType) => {
      console.log(response);

      notification.success({
        message: "request Successful",
        description: "password changed successfully",
        placement: "topRight",
      });

      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error);
      notification.error({
        message: "Failed",
        description:
          error?.response?.data?.message || "Failed to update the password",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleForgotRequest,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleVerifyEmail = (reset: () => void) => {
    function handleEmailVeriRequest(
      data: OtpVerificationType
    ): Promise<OtpVerificationResponseType> {
      return axios.post(`/auth/email-verification`, data);
    }
    const onSuccess = (response: OtpVerificationResponseType) => {
      console.log(response);

      notification.success({
        message: "request Successful",
        description: "Email verified successfully",
        placement: "topRight",
      });
      navigate("/login");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    };
    const onError = (error: errorType) => {
      console.log(error);
      notification.error({
        message: "Request Failed",
        description: error?.response?.data?.message || "Something went wrong!",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleEmailVeriRequest,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  return {
    useHandleLoginInService,
    useHandleForGotPassword,
    useHandleOTPValidate,
    useHandleChangePassword,
    useHandleVerifyEmail,
  };
};

export default AuthService;
