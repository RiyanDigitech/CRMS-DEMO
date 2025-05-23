import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form } from "antd";
import { UpdateUserType } from "@/lib/types/user";
import { useParams } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import "../../index.css";
const UpdateUserPassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserType>();

  const { id: idString } = useParams();
  const id = idString ? parseInt(idString, 10) : undefined;

  const { useHandleUpdateUserService } = UsersService();
  const { mutate, isPending } = useHandleUpdateUserService(reset, id);

  const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
    console.log("Form submitted with data:", data);
    mutate(data);
    console.log("data", data);
  };
  const onError = (errors: FieldErrors<UpdateUserType>) => {
    console.log("errors", errors);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className=" font-manrope w-full flex flex-col mt-3 border-[1px] p-4 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <Form.Item
                  className=" w-full sm:w-full lg:w-[49%]  mb-3 "
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password?.message}
                >
                  <label
                    htmlFor="password "
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    New Password
                  </label>
                  <Input
                    {...field}
                    id="password"
                    placeholder="password"
                    className="h-[38px] mt-1 w-full bg-[#fafafa]"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[49%]  mb-3"
                  validateStatus={errors.confirmPassword ? "error" : ""}
                  help={errors.confirmPassword?.message}
                >
                  <label
                    htmlFor="confirmPassword"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Repeat New Password
                  </label>
                  <Input
                    {...field}
                    id="confirmPassword"
                    placeholder="confirmPassword "
                    className="h-[38px] mt-1 bg-[#fafafa]"
                  />
                </Form.Item>
              )}
            />
          </div>

          <div className="flex justify-end  ">
            <button
              type="submit"
              className="font-manrope  w-full sm:w-3/12 lg:w-[22%] border-[1px] border-[#FF8548] bg-[#FF8548]  text-white h-[38px] rounded-md text-[12px]  hover:bg-white hover:text-[#FF8548]"
            >
              {isPending ? "Loading..." : "Change Password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPassword;
