import { CiMail } from "react-icons/ci";
import {
  useForm,
  SubmitHandler,
  Controller,
  SubmitErrorHandler,
} from "react-hook-form";
import { Input, Form, Divider, Spin, notification } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForgotPassword } from "@/lib/schemas";
import { InputsForgotPassword } from "@/lib/types";
import AuthService from "@/services/auth.service";
export default function Forgetpassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsForgotPassword>({
    resolver: zodResolver(schemaForgotPassword),
  });
  const { useHandleForGotPassword } = AuthService();
  const { mutate, isPending } = useHandleForGotPassword(reset);
  const onSubmit: SubmitHandler<InputsForgotPassword> = (data) => {
    console.log(data, "forgetpassword data");
    localStorage.setItem("lastpersonemail", data?.email);

    mutate(data);
  };
  const onError: SubmitErrorHandler<InputsForgotPassword> = (errors) => {
    if (errors?.password || errors?.email) {
      notification.error({
        message: "Failed",
        description: "Email field is missing",
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
            src="/loginimage.png"
            alt="Forget Password"
          />
        </div>
        <div className="right w-full  border-[2px] bg-[#ecf6f2] h-full flex justify-center items-center lg:w-6/12">
          <div className="w-full h-5/6  flex flex-col  items-center  justify-center">
            <img
              className=" h-[140px] w-[140px] mb-3"
              src="/logo.png"
              alt="logo"
            />
            <h1 className=" font-extrabold text-[33px] lg:text-[31px] font-jakartaSans">
              FORGET PASSWORD
            </h1>
            <p className=" font-medium font-montserrat text-[14px] text-[#514E4E]">
              Enter email address to receive OTP
            </p>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="font-montserrat w-full flex flex-col mt-4"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-11/12 sm:w-6/12 lg:w-6/12 mx-auto mt-2 mb-2"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email?.message}
                  >
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email..."
                      className="rounded-lg h-[42px] w-full focus:border-[#008444] focus:outline-none border-[1px]"
                      prefix={
                        <>
                          <CiMail className="text-[#B4B3B3] text-[22px] translate-x-[3px]" />
                          <Divider
                            className="h-[22px] bg-[#C0C0C0] translate-x-[-3px]"
                            type="vertical"
                          />
                        </>
                      }
                    />
                  </Form.Item>
                )}
              />
              <button
                type="submit"
                className="font-montserrat shadow-lg w-11/12 sm:w-6/12 lg:w-6/12 border-[1px] border-[#008444] mx-auto bg-[#008444] mt-3 text-white py-2 rounded-md text-[14px] font-semibold hover:bg-[#249960]  "
              >
                {isPending ? (
                  <Spin className="custom-spinner rounded-lg p-1 " />
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
