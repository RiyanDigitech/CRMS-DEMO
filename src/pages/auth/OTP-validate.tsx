import {
  useForm,
  SubmitHandler,
  Controller,
  SubmitErrorHandler,
} from "react-hook-form";
import { Input, Form, Spin, notification } from "antd";

import AuthService from "@/services/auth.service";
import { Flex } from "antd";
import { OtpVerificationType } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export const OtpPassword = z.object({
  code: z.string().length(5, "Code must be exactly 5 characters"),
});
export default function OtpForgetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OtpVerificationType>({
    resolver: zodResolver(OtpPassword),
  });
  const { useHandleOTPValidate } = AuthService();
  const { mutate, isPending } = useHandleOTPValidate(reset);

  const onSubmit: SubmitHandler<OtpVerificationType> = (data) => {
    const forgetemail = localStorage.getItem("lastpersonemail");

    if (forgetemail) {
      const payload = {
        code: String(data.code),
        email: forgetemail,
      };

      mutate(payload);
    } else {
      notification.error({
        message: "Error",
        description: "Email not found in local storage. Please try again.",
        placement: "topRight",
      });
    }
  };

  const onError: SubmitErrorHandler<OtpVerificationType> = (errors) => {
    console.log(errors);
    if (errors?.code) {
      notification.error({
        message: "Failed",
        description: errors?.code?.message,
        placement: "topRight",
      });
    }
  };
  return (
    <>
      <div className="h-screen w-full flex ">
        <div className=" left w-6/12  h-screen  hidden  lg:block">
          <img
            className=" h-screen object-cover"
            src="forgetimage.png"
            alt="Forget Password"
          />
        </div>
        <div className="right w-full  border-[2px] bg-[#ecf6f2] h-full flex justify-center items-center lg:w-6/12">
          <div className="w-full h-5/6  flex flex-col  items-center  justify-center">
            <img
              className=" h-[140px] w-[140px] mb-3"
              src="logo.png"
              alt="logo"
            />
            <h1 className=" font-extrabold text-[33px] lg:text-[31px] font-jakartaSans">
              OTP Verification
            </h1>
            <p className=" font-medium font-montserrat text-[14px] text-[#514E4E]">
              Enter code that has been sent on your email
            </p>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="font-montserrat w-full flex flex-col mt-4 items-center justify-center"
              action=""
            >
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-11/12 sm:w-6/12 lg:w-6/12 mx-auto mt-2 mb-2"
                    validateStatus={errors?.code ? "error" : ""}
                    help={errors?.code?.message}
                  >
                    <Flex gap="middle" vertical>
                      <Input.OTP
                        length={5}
                        value={field.value?.toString()} // Ensure it's a string
                        onChange={(value) => {
                          field.onChange(value.toString()); // Ensure value passed is a string
                        }}
                      />
                    </Flex>
                  </Form.Item>
                )}
              />

              <button
                type="submit"
                className="font-montserrat shadow-lg w-11/12 sm:w-6/12 lg:w-6/12 border-[1px] border-[#008444] mx-auto bg-[#008444] mt-3 text-white py-2 rounded-md text-[14px] font-semibold hover:bg-[#208152] "
              >
                {isPending ? (
                  <Spin className="custom-spinner  rounded-lg p-1 " />
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
