import { CiMail } from "react-icons/ci";
import {
  useForm,
  SubmitHandler,
  Controller,
  SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoLock } from "react-icons/go";
import { Input, Form, notification } from "antd";
import AuthService from "@/services/auth.service";
import { Link } from "react-router-dom";
import { Inputs } from "@/lib/types";
import { schema } from "@/lib/schemas";
import { Divider } from "antd";

import { Spin } from "antd";
export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { useHandleLoginInService } = AuthService();
  const { mutate, isPending } = useHandleLoginInService(reset);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    mutate(data);
  };
  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    console.log("errors", errors);
    notification.error({
      message: "Failed",
      description: errors?.email?.message || errors?.password?.message,
      placement: "topRight",
    });
  };
  // Watch field values
  const email = watch("email");
  const password = watch("password");

  // Determine if the button should be disabled
  const isButtonDisabled = !email || !password || isPending;
  return (
    <>
      <div className="h-screen w-full flex ">
        <div className="left w-6/12 h-screen hidden lg:block">
          <img className="h-full object-cover" src="/loginimage.png" alt="" />
        </div>
        <div className="right  w-full border-[2px] bg-[#ecf6f2] h-full flex justify-center lg:w-6/12">
          <div className="  h-4/6 w-11/12 lg:w-6/12 my-auto lg:mt-20 flex flex-col items-center">
            <img className="h-[140px] w-[140px] " src="/logo.png" alt="logo" />
            <h1 className="font-extrabold text-[23px] lg:text-[34px] mt-3 font-jakartaSans">
              MEMBER LOGIN
            </h1>
            <p className="font-jakartaSans text-[#514E4E] font-bold text-[15px] my-1">
              Login to your account
            </p>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="font-jakartaSans w-full flex flex-col mt-3 "
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Item
                    className="w-11/12 sm:w-6/12 lg:w-full mx-auto mb-4"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email?.message}
                  >
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      className="h-[40px]"
                      type="email"
                      value={field.value} // Keep current value
                      onChange={(e) => field.onChange(e.target.value)} // Regular onChange
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault(); // Block space from being added
                        }
                      }}
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
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Item
                    className="w-11/12 sm:w-6/12 lg:w-full mx-auto mb-4"
                    validateStatus={errors?.password ? "error" : ""}
                    help={errors?.password?.message}
                  >
                    <Input.Password
                      {...field}
                      placeholder="Enter Password"
                      className="h-[40px]"
                      type="password"
                      value={field.value} // Keep current value
                      onChange={(e) => field.onChange(e.target.value)} // Regular onChange
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault(); // Block space from being added
                        }
                      }}
                      prefix={
                        <>
                          <GoLock className="text-[#B4B3B3] text-[22px] translate-x-[3px]" />
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
              <div className="w-11/12 sm:w-6/12 lg:w-full mx-auto flex justify-between mt-[-2px] ">
                <p className="text-[12px] text-[#B4B3B3]">
                  <Link to={"/admin/forgot-password"}>Forget Password?</Link>
                </p>
              </div>
              <button
                disabled={isButtonDisabled} // Button disabled logic
                type="submit"
                className={`font-jakartaSans shadow-lg w-11/12 sm:w-6/12 lg:w-full border-[1px] border-[#008444] mx-auto  mt-3 text-white py-2 rounded-md text-[14px] font-semibold ${
                  !isButtonDisabled ? "bg-[#1b8a54]" : "bg-[#008444]"
                }`}
              >
                {isPending ? (
                  <Spin className="  rounded-lg p-1 custom-spinner" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
