import { DatePicker, Modal, notification, Select } from "antd";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form, Spin } from "antd";
// import { CreateModalProps } from "@/lib/types/user";
import "../../index.css";
import { useEffect, useState } from "react";
import KpiService from "@/services/kpi/kpi.service";
const KpiItemsModals: React.FC<any> = ({
  isOpen,
  onClose,
  numericId,
  updateKpiItemsData,
  setIsFilterModalOpen,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<any>({});
  const { useFetchKpiDetails } = KpiService();
  const { refetch } = useFetchKpiDetails(numericId);
  const { useHandleUpdateKpiItemsService } = KpiService();
  //   const { mutate, isPending } = useHandleCreateKpiItemsService(reset, refetch);

  const [itemsId, setItemsId] = useState<number | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<number | undefined>(undefined); // State to store selected IDs

  const onError = (errors: FieldErrors<any>) => {
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

  const [selectedCustomerSegmentIds, setSelectedCustomerSegmentIds] =
    useState<string>();
  const { mutate, isPending } = useHandleUpdateKpiItemsService(
    reset,
    itemsId,
    refetch
  );

  const onSubmit: SubmitHandler<any> = (data) => {
    const transformedData = {
      ...data,
      actual: data.actual.toString(), // Ensure actual is a string
    };
    mutate(transformedData);
    setIsFilterModalOpen(false);
  };
  //   console.log("filteredOperatingUnitData", filteredOperatingUnitData);
  console.log("updateKpiItemsData agya hai ", updateKpiItemsData);
  useEffect(() => {
    if (updateKpiItemsData && updateKpiItemsData.length > 0) {
      const kpi = updateKpiItemsData[0];
      setItemsId(kpi?.id);
      reset({
        kpiName: kpi.kpiName || "",
        actual: kpi.actual || "",
        kpiUnit: kpi.kpiUnit || "",
        weightage: kpi.weightage || "",
        target: kpi.target || "",
      });
    }
  }, [updateKpiItemsData, reset]);

  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`Update Kpi Items`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="kpiName"
              control={control}
              rules={{ required: "KPI Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <label
                    htmlFor="kpiname"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    KPI Name
                  </label>
                  <Select
                    {...field}
                    id="kpiname"
                    placeholder="Select KPI Name"
                    className="h-[38px] w-full mt-1"
                    onChange={(value) => field.onChange(value)}
                    // value={field.value}
                    options={[
                      { value: "Active Dealer", label: "Active Dealer" },
                      { value: "DSO", label: "DSO" },
                      { value: "Sales Trade", label: "Sales Trade" },
                    ]}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="actual"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="actual"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Actual
                  </label>
                  <Input
                    {...field}
                    id="actual"
                    placeholder="Enter actual"
                    className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="kpiUnit"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="kpiUnit"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Kpi Unit
                  </label>
                  <Input
                    {...field}
                    id="kpiUnit"
                    placeholder="Enter kpiUnit"
                    className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="weightage"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={errors.name ? "error" : ""}
                  //   help={errors.name?.message}
                >
                  <label
                    htmlFor="weightage"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Weightage
                  </label>
                  <Input
                    {...field}
                    id="weightage"
                    placeholder="Enter weightage"
                    className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row mb-5">
            <Controller
              name="target"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="target"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Target
                  </label>
                  <Input
                    {...field}
                    type="number"
                    id="target"
                    placeholder="Enter target"
                    className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row items-center">
            <div className="flex justify-center w-full lg:w-[60%]  mx-auto">
              <button
                type="submit"
                disabled={!isDirty}
                className={`h-[42px] font-manrope  w-full  border-[1px]   rounded-md text-sm 
                    ${
                      !isDirty
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-[#FF8548] bg-[#FF8548] text-white hover:bg-[#fa913a] "
                    }`}
              >
                {isPending ? (
                  <Spin className="custom-spinner rounded-lg p-1" />
                ) : (
                  "Update "
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default KpiItemsModals;
