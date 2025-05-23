import { schemaCreateSurvey } from "@/lib/schemas";
import { Survey } from "@/lib/types/survey";
import SurveysService from "@/services/survey/survey.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, notification, Form, DatePicker, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const CreateSalesPjP = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Survey>({
    resolver: zodResolver(schemaCreateSurvey),
  });

  const { useHandleCreateSurveyService } = SurveysService();

  const { mutate, isPending } = useHandleCreateSurveyService(reset);

  const onSubmit: SubmitHandler<Survey> = (data) => {
    mutate(data);
  };
  const onError: SubmitErrorHandler<Survey> = (errors) => {
    const allRequired = Object.values(errors).every(
      (error) => error?.message === "Required"
    );

    if (allRequired) {
      notification.error({
        message: "Failed",
        description: "All fields are required",
        placement: "topRight",
      });
    }
  };

  return (
    <form
      className=" rounded-lg bg-white py-1 px-5"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="w-full lg:w-10/12">
        <div className="font-manrope w-full flex flex-col mt-2 lg:flex-row lg:justify-between rounded-lg ">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item
                className="w-full lg:w-[48%] mb-2"
                validateStatus={errors.name ? "error" : ""}
                help={errors?.name?.message}
              >
                <label
                  htmlFor="name"
                  className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                >
                  Plan Name
                </label>
                <Input
                  {...field}
                  id="name"
                  placeholder="Enter name"
                  className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                />
              </Form.Item>
            )}
          />{" "}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item
                className="w-full lg:w-[48%] mb-2"
                validateStatus={errors.name ? "error" : ""}
                help={errors?.name?.message}
              >
                <label
                  htmlFor="name"
                  className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                >
                  Sales Target
                </label>
                <Input
                  {...field}
                  id="name"
                  placeholder="Enter target"
                  className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                />
              </Form.Item>
            )}
          />{" "}
        </div>
        <div className="font-manrope w-full flex flex-col mt-2 lg:flex-row lg:justify-between rounded-lg ">
          {" "}
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Form.Item
                className="w-full lg:w-[48%]  mb-2"
                validateStatus={errors.startDate ? "error" : ""}
                help={errors?.startDate?.message}
              >
                <label
                  htmlFor="startdate"
                  className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                >
                  Start Date *
                </label>

                <DatePicker
                  placeholder="Select start date"
                  id="startdate"
                  style={{ width: "100%", height: "38px" }}
                  className="bg-[#fafafa] mt-1"
                  onChange={(date) => {
                    if (date) {
                      const formattedDate = date.format("YYYY-MM-DD");
                      console.log("Selected Date:", formattedDate);
                      field.onChange(formattedDate);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  allowClear
                />
              </Form.Item>
            )}
          />{" "}
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Form.Item
                className="w-full lg:w-[48%] mb-3"
                validateStatus={errors?.endDate ? "error" : ""}
                help={errors?.endDate?.message}
              >
                <label
                  htmlFor="enddate"
                  className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                >
                  End Date *
                </label>

                <DatePicker
                  placeholder="Select end date"
                  id="enddate"
                  style={{ width: "100%", height: "38px" }}
                  className="bg-[#fafafa] mt-1"
                  onChange={(date) => {
                    if (date) {
                      const formattedDate = date.format("YYYY-MM-DD");
                      field.onChange(formattedDate);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  allowClear
                />
              </Form.Item>
            )}
          />
        </div>
        <div
          className={`font-manrope w-full  flex flex-col  lg:flex-row lg:justify-between rounded-lg mt-2`}
        >
          <Controller
            name="version"
            control={control}
            render={({ field }) => (
              <Form.Item
                className="w-full lg:w-[48%] mb-3"
                validateStatus={errors?.version ? "error" : ""}
                help={errors?.version?.message}
              >
                <label
                  htmlFor="version"
                  className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                >
                  Sales Territory
                </label>
                <Input
                  {...field}
                  id="version"
                  min={1}
                  type="text"
                  placeholder="Territory"
                  className="h-[38px] w-full  bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                />{" "}
              </Form.Item>
            )}
          />
          <div className="w-full lg:w-[48%]  mb-4 relative">
            <button className="md:absolute md:bottom-0 border-[1px] border-[#ff8548] bg-[#ff8548] h-[42px] w-[23%] rounded-lg font-manrope text-[#FFFFFF] hover:bg-white hover:text-[#ff8548]">
              {isPending ? (
                <>
                  <Spin className="custom-spinner" />
                </>
              ) : (
                "Create Plan"
              )}
            </button>
          </div>{" "}
        </div>
      </div>
    </form>
  );
};

export default CreateSalesPjP;
