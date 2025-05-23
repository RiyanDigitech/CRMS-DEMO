import { DatePicker, Modal, notification, Select } from "antd";
import "../../index.css";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Form, Spin } from "antd";
import { createTeamType } from "@/lib/types/team";

import UsersService from "@/services/users/user.service";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import CustomersService from "@/services/customers/customers.service";
import PJPService from "@/services/pjp/pjp";
const PJP: React.FC<any> = ({ isOpen, onClose, refetch }) => {
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<createTeamType>({});
  const positionName = "Sales Representative (SR)";
  const { useHandleCreatePJPService } = PJPService();
  const { mutate, isPending } = useHandleCreatePJPService(reset, refetch);
  const [limit, setUsersLimit] = useState<number>(1200);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [roleId, setUsersSelectedroleId] = useState<number | undefined>(
    undefined
  );

  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<number | undefined>(undefined); // State to store selected IDs
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<
    number | undefined
  >(undefined); // State to store selected IDs

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
  const { useFetchAllUsers } = UsersService();

  const { data: userData, isFetching: isUserDataLoading } = useFetchAllUsers(
    limit,
    page,
    roleId,
    query,
    positionName
  );
  console.log("userDataSalesPerson", userData?.data);

  const handleSalesPersonSelect = (selected: any) => {
    setSelectedIds(selected);
    console.log("Selected salesperson/customers ID:", selected);
  };
  const handleCustomersSelect = (selected: any) => {
    setSelectedCustomerIds(selected);
    console.log("Selected salesperson/customers ID:", selected);
  };
  const handleTasksSelect = (value: string[]) => {
    setSelectedTasks(value); // ["one", "two"]
  };
  const onSubmit: SubmitHandler<createTeamType> = (data) => {
    const updatedData = {
      ...data,
      customerId: selectedCustomerIds,
      salesPersonId: selectedIds,
      tasks: selectedTasks,
    };
    // selectedId ko data me inject kiya
    mutate(updatedData);
    onClose();
    console.log("final data", data);
  };
  const KpiTypes = ["Sales", "Project"];

  const [allKpiTypes, setAllKpiTypes] = useState(KpiTypes); // initialize with API data
  useEffect(() => {
    setAllKpiTypes(KpiTypes);
    console.log("allKpiTypes", allKpiTypes);
  }, []);

  const Tasks = ["POS Survey", "Survey", "Stock Take"];
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const { useFetchAllCustomers } = CustomersService();
  const { data: getAllCustomers, isFetching: iscustomerDataLoading } =
    useFetchAllCustomers(limit, page, query);
  console.log("seletedtask", selectedTasks);
  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`Create Sales Journey Plan`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="salesperson"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="salesperson"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Sales Person
                  </label>
                  <Select
                    {...field}
                    showSearch
                    placeholder="Select Sales Person"
                    className="w-full mt-[3px] h-[42px]"
                    optionFilterProp="label"
                    onChange={handleSalesPersonSelect}
                    options={userData?.data?.map((role) => ({
                      label: role.firstName + role?.lastName,
                      value: role.id,
                    }))}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="customers"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="customers"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Customers
                  </label>
                  <Select
                    {...field}
                    showSearch
                    placeholder="Select customers"
                    className="w-full mt-[3px] h-[42px]"
                    optionFilterProp="label"
                    onChange={handleCustomersSelect}
                    options={getAllCustomers?.data?.map((role) => ({
                      label: role.name,
                      value: role.id,
                    }))}
                  />
                </Form.Item>
              )}
            />
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="tasks"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[100%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="tasks"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Tasks
                  </label>

                  <Select
                    {...field}
                    id="tasks"
                    showSearch
                    placeholder="Select tasks"
                    mode="multiple"
                    optionFilterProp="value"
                    className="w-full mt-[3px] h-[42px]"
                    onChange={handleTasksSelect}
                    value={selectedTasks}
                  >
                    {Tasks?.map((role, ind) => (
                      <Option key={ind} value={role}>
                        <span className="ml-2 text-black font-extrabold">
                          {role}
                        </span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%]  mb-2"
                  // validateStatus={errors.startDate ? "error" : ""}
                  // help={errors?.startDate?.message}
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
                    style={{
                      width: "100%",
                      height: "38px",
                      backgroundColor: "white",
                    }}
                    className=" mt-1 dateselected"
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
                    placeholder="Select end date"
                    id="enddate"
                    style={{ width: "100%", height: "38px" }}
                    className="dateselected mt-1"
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
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row items-center">
            <div className="flex justify-center w-full lg:w-[60%]  mx-auto">
              <button
                type="submit"
                className="h-[42px] font-manrope  w-full  border-[1px] border-[#FF8548] bg-[#FF8548] text-white  rounded-md text-sm"
              >
                {isPending ? (
                  <Spin className="custom-spinner rounded-lg p-1" />
                ) : (
                  "Add Sales Journey Plan"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PJP;
