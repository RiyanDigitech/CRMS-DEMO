import { GoLock } from "react-icons/go";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Form, Divider, Spin, message } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/auth.service";

// Define Zod schema
const ChangePasswordSchema = z.object({
  newPassword: z.string().min(1, "New Password is required"),
  confirmPassword: z.string().min(1, "New Password is required"),
});

type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

export default function CreateNewPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { useHandleChangePassword } = AuthService();
  const { mutate, isPending } = useHandleChangePassword(reset);

  const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
    const forgetemail = localStorage.getItem("lastpersonemail");
    if (forgetemail) {
      const payload = {
        email: forgetemail,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };
      console.log("payload", payload);
      mutate(payload);
    }
  };

  const onError = () => {
    message.error("Please fill in all required fields and fix errors.");
  };

  return (
    <div className="h-screen w-full flex">
      <div className="left w-6/12 h-screen hidden lg:block">
        <img
          className="h-screen object-cover"
          src="forgetimage.png"
          alt="Forget Password"
        />
      </div>
      <div className="right w-full border-[2px] bg-[#ecf6f2] h-full flex justify-center items-center lg:w-6/12">
        <div className="w-full h-4/6 flex flex-col items-center justify-center ">
          <img className="h-[140px] w-[140px] mb-3" src="logo.png" alt="logo" />
          <h1 className="font-extrabold text-[33px] lg:text-[31px] font-jakartaSans">
            Create New Password
          </h1>
          <p className="font-medium font-montserrat text-[14px] text-[#514E4E]">
            Change Your Password
          </p>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="font-montserrat w-full flex flex-col"
          >
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Item
                  label="New Password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="w-11/12 sm:w-6/12 lg:w-6/12 mx-auto mt-2 "
                  htmlFor="newpassword"
                  validateStatus={errors.newPassword ? "error" : ""}
                  help={errors.newPassword?.message}
                >
                  <Input.Password
                    {...field}
                    id="newpassword"
                    type="password"
                    placeholder="Enter new password..."
                    className="rounded-lg h-[42px] w-full focus:border-[#008444] focus:outline-none border-[1px] mt-[-7px]"
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

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Item
                  label="Confirm Password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="w-11/12 sm:w-6/12 lg:w-6/12 mx-auto  "
                  htmlFor="confirmPassword"
                  validateStatus={errors.confirmPassword ? "error" : ""}
                  help={errors.confirmPassword?.message}
                >
                  <Input.Password
                    {...field}
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter confirm Password..."
                    className="rounded-lg h-[42px] w-full focus:border-[#008444] focus:outline-none border-[1px] mt-[-7px]"
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
            <button
              type="submit"
              className="font-montserrat shadow-lg w-11/12 sm:w-6/12 lg:w-6/12 border-[1px] border-[#008444] mx-auto bg-[#008444] mt-3 text-white py-2 rounded-md text-[14px] font-semibold hover:bg-[#258d5b] ]"
            >
              {isPending ? (
                <Spin className="custom-spinner  rounded-lg p-1" />
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
