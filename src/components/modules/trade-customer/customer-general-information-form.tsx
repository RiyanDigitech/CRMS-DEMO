import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, Form, Spin, Select } from "antd";
import { useParams } from "react-router-dom";
import CustomersService from "@/services/customers/customers.service";
import { CreateCustomerDetails } from "@/lib/types/customer";

const CustomerGeneralInformationForm = ({
  selectedCustomerData,
}: {
  selectedCustomerData: CreateCustomerDetails;
}) => {
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useHandleUpdateCustomerService } = CustomersService();

  const {
    control,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CreateCustomerDetails>({});

  const { mutate, isPending } = useHandleUpdateCustomerService(
    reset,
    numericId
  );

  useEffect(() => {
    if (selectedCustomerData) {
      reset(selectedCustomerData);
    }
  }, [selectedCustomerData, reset]);

  const onSubmit: SubmitHandler<CreateCustomerDetails> = (data) => {
    const editedFields = Object.keys(dirtyFields).reduce(
      (acc, key) => ({
        ...acc,
        [key]: data[key as keyof CreateCustomerDetails],
      }),
      {} as Partial<CreateCustomerDetails>
    );

    mutate(editedFields);
  };
  return (
    <div className="w-full flex flex-col justify-between lg:flex-row ">
      <div className="right bg-white rounded-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)} className=" ">
          <div className="font-manrope w-full flex flex-col mt-2 border-[1px] border-[#EBF0ED] px-3 pt-3 pb-3 lg:pb-3  lg:pt-2 rounded-lg addusermodal">
            <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
              <Controller
                name="resourceId"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.resourceId ? "error" : ""}
                    help={errors?.resourceId?.message}
                  >
                    <label
                      htmlFor="resourceId"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Resource Id
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="resourceId"
                      placeholder="Resource Id"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.customerId ? "error" : ""}
                    help={errors?.customerId?.message}
                  >
                    <label
                      htmlFor="customerId"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Customer Id
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="customerId"
                      placeholder="Customer Id"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
              <Controller
                name="strn"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.strn ? "error" : ""}
                    help={errors?.strn?.message}
                  >
                    <label
                      htmlFor="strn"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Strn No #
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="strn"
                      placeholder="Strn Number"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />
              <Controller
                name="salesArea"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.salesArea ? "error" : ""}
                    help={errors?.salesArea?.message}
                  >
                    <label
                      htmlFor="salesArea"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Sales Area
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="salesArea"
                      placeholder="Sales Area"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />
                  </Form.Item>
                )}
              />
            </div>{" "}
            <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
              <Controller
                name="erpId"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.erpId ? "error" : ""}
                    help={errors?.erpId?.message}
                  >
                    <label
                      htmlFor="erpId"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Erp Id
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="erpId"
                      placeholder="Erp Id"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />{" "}
              <Controller
                name="strnStatus"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.strnStatus ? "error" : ""}
                    help={errors?.strnStatus?.message}
                  >
                    <label
                      htmlFor="strnStatus"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                    >
                      Strn Status
                    </label>
                    <Select
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="strnStatus"
                      placeholder="Enter Strn Status"
                      className="custom-select h-[38px] bg-[#fafafa]  mt-[3px] w-full"
                      onChange={(value) => field.onChange(value)} // React Hook Form ke field value update karega
                    >
                      <Select.Option value="No">No</Select.Option>
                      <Select.Option value="Yes">Yes</Select.Option>
                    </Select>{" "}
                  </Form.Item>
                )}
              />{" "}
            </div>{" "}
            <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
              <Controller
                name="cnic"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.cnic ? "error" : ""}
                    help={errors?.cnic?.message}
                  >
                    <label
                      htmlFor="cnic"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Cnic No #
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="cnic"
                      placeholder="Cnic"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />
              <Controller
                name="ntn"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.ntn ? "error" : ""}
                    help={errors?.ntn?.message}
                  >
                    <label
                      htmlFor="ntn"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                    >
                      Ntn No #
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="ntn"
                      placeholder="Ntn"
                      className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />{" "}
            </div>{" "}
            <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
              <Controller
                name="taxInfo"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.taxInfo ? "error" : ""}
                    help={errors?.taxInfo?.message}
                  >
                    <label
                      htmlFor="taxInfo"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Tax Info
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="taxInfo"
                      placeholder="Tax Info"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />
              <Controller
                name="preferredComChannel"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.preferredComChannel ? "error" : ""}
                    help={errors?.preferredComChannel?.message}
                  >
                    <label
                      htmlFor="preferredComChannel"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                    >
                      Preferred Com Channel
                    </label>
                    <Input
                      {...field}
                      id="preferredComChannel"
                      disabled={true} // Readonly jaisa behavior
                      placeholder="Preferred ComChannel"
                      className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />{" "}
            </div>{" "}
            <div className="flex  items-center justify-between w-full flex-col lg:flex-row ">
              <Controller
                name="regno"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.regno ? "error" : ""}
                    help={errors?.regno?.message}
                  >
                    <label
                      htmlFor="regno"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Registration Number Of Customer{" "}
                    </label>
                    <Input
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="regno"
                      placeholder="Registration No"
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />{" "}
              <Controller
                name="itFillerStatus"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-2"
                    validateStatus={errors?.itFillerStatus ? "error" : ""}
                    help={errors?.itFillerStatus?.message}
                  >
                    <label
                      htmlFor="itFillerStatus"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                    >
                      Income Tax Status
                    </label>
                    <Select
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      id="itFillerStatus"
                      placeholder=" Income Tax Status"
                      className="custom-select h-[38px] bg-[#fafafa]  mt-[3px] w-full"
                      onChange={(value) => field.onChange(value)} // React Hook Form ke field value update karega
                    >
                      <Select.Option value="No">No</Select.Option>
                      <Select.Option value="Yes">Yes</Select.Option>
                    </Select>{" "}
                  </Form.Item>
                )}
              />{" "}
            </div>{" "}
            {/* <Form.Item className="flex justify-center items-center mx-auto translate-y-4">
              <button
                className={`flex items-center justify-center py-2 px-7 w-full font-bold rounded-lg border-[1px] "
                   ${
                     !isDirty
                       ? "bg-gray-100 cursor-default text-[#a7a6a6]"
                       : "border-[#ff8548] bg-[#ff8548] text-white"
                   }`}
                disabled={!isDirty}
                type="submit"
              >
                {isPending ? <Spin className="custom-spinner" /> : "Update"}
              </button>
            </Form.Item> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerGeneralInformationForm;
