import { DatePicker, Modal, notification, Select } from "antd";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form, Spin } from "antd";
import { CreateModalProps, UpdateModalProps } from "@/lib/types/user";
import "../../index.css";
import { createTeamType } from "@/lib/types/team";
import UsersService from "@/services/users/user.service";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import KpiService from "@/services/kpi/kpi.service";
const KpiUpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  editData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<createTeamType>({});

  const { useHandleUpdateKpiService } = KpiService();
  const { mutate, isPending } = useHandleUpdateKpiService(reset, editData?.id);
  const [limit, setUsersLimit] = useState<number>(1200);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [roleId, setUsersSelectedroleId] = useState<number | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<number | undefined>(undefined); // State to store selected IDs

  const onError = (errors: FieldErrors<createTeamType>) => {
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
  const {
    useFetchAllUsers,
    useFetchAllCustomerSegments,
    useFetchAllOperationUnitIds,
  } = UsersService();

  const onSubmit: SubmitHandler<createTeamType> = (data) => {
    mutate(data);
  };
  //   console.log("filteredOperatingUnitData", filteredOperatingUnitData);
  const { data: userData, isFetching: isUserDataLoading } = useFetchAllUsers(
    limit,
    page,
    roleId,
    query
  );
  const handleSalesPersonSelect = (selected: number) => {
    setSelectedIds(selected);
  };
  useEffect(() => {
    if (editData) {
      reset({
        salesPerson:
          editData?.salesPerson?.firstName + editData?.salesPerson?.lastName,
        startDate: editData?.startDate.slice(0, 10),
        endDate: editData?.startDate.slice(0, 10),
        customerSegments: editData?.customerSegments,
        operatingUnit: editData?.operatingUnit?.name || "-",
        // type: editData?.type || "-",
      });
    }
  }, [editData, reset]);
  console.log("editData", editData);
  const { data: customerSegmentsData } = useFetchAllCustomerSegments();
  const { data: positingUnitsData } = useFetchAllOperationUnitIds(50, 1);

  const filteredOperatingUnitData = positingUnitsData?.data.map(
    ({ id, name }) => ({
      id,
      name,
    })
  );
  const KpiTypes = ["Sales", "Project"];

  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl top-40 lg:top-16"
      title={`Update Kpi`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="salesPerson"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="salesPerson"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Sales Person Name
                  </label>

                  <Select
                    {...field}
                    id="salesPerson"
                    showSearch
                    placeholder="Select a position"
                    optionFilterProp="children"
                    className=" w-full mt-[3px] custom-select"
                    // onChange={handleSalesPersonSelect} // Add the onChange handler
                  >
                    {userData?.data?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.firstName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Form.Item className="w-full lg:w-[48%]  mb-2" {...field}>
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
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  //   validateStatus={errors?.endDate ? "error" : ""}
                  //   help={errors?.endDate?.message}
                >
                  <label
                    htmlFor="enddate"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    End Date *
                  </label>

                  <DatePicker
                    placeholder="Select start date"
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
            />{" "}
            <Controller
              name="customerSegments"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="customerSegments"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    customerSegments
                  </label>

                  <Select
                    {...field}
                    id="customerSegments"
                    showSearch
                    placeholder="customerSegments "
                    optionFilterProp="children"
                    className=" w-full mt-[3px] custom-select"
                    // onChange={handleSalesPersonSelect} // Add the onChange handler
                  >
                    {/* {userData?.data?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.firstName}
                      </Option>
                    ))} */}{" "}
                    {customerSegmentsData?.data?.map((role) => (
                      <Option key={role?.id} value={role?.name}>
                        {role?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="operatingUnit"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="customerSegments"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Operating Unit
                  </label>

                  <Select
                    {...field}
                    id="operatingUnit"
                    showSearch
                    placeholder="operatingUnit "
                    optionFilterProp="children"
                    className=" w-full mt-[3px] custom-select"
                    // onChange={handleSalesPersonSelect} // Add the onChange handler
                  >
                    {/* {userData?.data?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.firstName}
                      </Option>
                    ))} */}{" "}
                    {filteredOperatingUnitData?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
            {/* <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-2"
                  // validateStatus={errors?.customerSegmentIds ? "error" : ""}
                  // help={errors?.customerSegmentIds?.message}
                >
                  <label
                    htmlFor="operatingunit"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Type
                  </label>

                  <Select
                    {...field}
                    id="type"
                    placeholder="Type"
                    // mode="multiple"
                    className=" w-full mt-[3px]  custom-select"
                    // onChange={handleChangeKpiTypes}
                  >
                    {KpiTypes?.map((role, ind) => (
                      <Option key={ind} value={role}>
                        {role}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            /> */}
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row items-center mt-5">
            <div className="flex justify-center w-full lg:w-[60%]  mx-auto">
              <button
                type="submit"
                disabled={!isDirty}
                className={`font-manrope shadow-sm w-full  border-[1px] py-2 rounded-md text-sm ${
                  !isDirty
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-[#FF8548] bg-[#FF8548] text-white hover:bg-[#fa913a] "
                }`}
              >
                {isPending ? (
                  <Spin className="custom-spinner rounded-lg p-1" />
                ) : (
                  "Update Kpi"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default KpiUpdateModal;
