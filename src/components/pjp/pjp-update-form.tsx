import { Button, DatePicker, Input, Modal, notification, Select } from "antd";
import "../../index.css";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Form, Spin } from "antd";
import { CreateModalProps } from "@/lib/types/user";
import { createTeamType } from "@/lib/types/team";

import UsersService from "@/services/users/user.service";
import TeamsService from "@/services/teams/teams.service";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import KpiService from "@/services/kpi/kpi.service";
import TextArea from "antd/es/input/TextArea";
const PJPUpdate: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<createTeamType>({});
  const positionName = "Sales Representative (SR)";
  const { useHandleCreateKpiService } = KpiService();
  const { mutate, isPending } = useHandleCreateKpiService(reset);
  const [limit, setUsersLimit] = useState<number>(1200);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [roleId, setUsersSelectedroleId] = useState<number | undefined>(
    undefined
  );
  const [selectedOperatingUnitIds, setSelectedOperatingUnitIds] = useState<
    number[] | undefined
  >(undefined);
  const [selectedKpiType, setSelectedKpiTypes] = useState<string | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<number | undefined>(undefined); // State to store selected IDs
  const [selectedTeamsIds, setSelectedTeamsIds] = useState<number | undefined>(
    undefined
  ); // State to store selected IDs

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
  const { useFetchAllTeamsKpi, useFetchTargetedTeams } = TeamsService();
  const { data: AllTeamsData } = useFetchAllTeamsKpi(page, limit);
  const { data: targetedTeamData } = useFetchTargetedTeams(selectedTeamsIds);
  const [selectedCustomerSegmentIds, setSelectedCustomerSegmentIds] =
    useState<string>();

  const { data: userData, isFetching: isUserDataLoading } = useFetchAllUsers(
    limit,
    page,
    roleId,
    query,
    positionName
  );
  const handleSalesPersonTeamSelect = (selected: any) => {
    setSelectedTeamsIds(selected);
    console.log("Selected Team ID:", selected);
  };
  const handleSalesPersonSelect = (selected: any) => {
    setSelectedIds(selected);
    console.log("Selected salesperson ID:", selected);
  };

  const handleChange = (selectedIds: string) => {
    setSelectedCustomerSegmentIds(selectedIds); // Sirf IDs store ho rahi hain
  };
  const { data: customerSegmentsData } = useFetchAllCustomerSegments();
  const handleChangeOperatingUnit = (selectedIds: number[]) => {
    setSelectedOperatingUnitIds(selectedIds); // Sirf IDs store ho rahi hain
  };
  const handleChangeKpiTypes = (selectedIds: string) => {
    setSelectedKpiTypes(selectedIds); // Sirf IDs store ho rahi hain
  };
  const { data: positingUnitsData } = useFetchAllOperationUnitIds(50, 1);

  const filteredOperatingUnitData = positingUnitsData?.data.map(
    ({ id, name }) => ({
      id,
      name,
    })
  );
  const onSubmit: SubmitHandler<createTeamType> = (data) => {
    const updatedData = {
      ...data,
      salesPerson: selectedIds,
      customerSegments: selectedCustomerSegmentIds,
      operatingUnits: [selectedOperatingUnitIds],
      type: selectedKpiType,
      teamId: selectedTeamsIds,
    }; // selectedId ko data me inject kiya
    mutate(updatedData);
    onClose();
  };
  const KpiTypes = ["Sales", "Project"];
  const [customKpiValue, setCustomKpiValue] = useState("");
  const description = watch("description") || "";

  const [allKpiTypes, setAllKpiTypes] = useState(KpiTypes); // initialize with API data
  useEffect(() => {
    setAllKpiTypes(KpiTypes);
    console.log("allKpiTypes", allKpiTypes);
  }, []);
  const handleAddCustomKpiType = () => {
    if (customKpiValue && !allKpiTypes.includes(customKpiValue)) {
      setAllKpiTypes([...allKpiTypes, customKpiValue]);
      setCustomKpiValue("");
    }
  };
  const symbols = ["+", "-", "*", "/", "(", ")", "^"];
  const handleInsertSymbol = (symbol: string) => {
    setValue("description", description + symbol);
  };
  const SalesPersonLists = ["Kamran", "Akhtar", "Anwar"];
  const CustomersLists = ["Ikea", "Wallmart", "Sainsburry"];
  const Tasks = ["POS Survey", "Survey", "Stock Take"];
  //   useEffect(() => {
  //     if (targeUserData) {
  //       reset({
  //         firstName: targeUserData?.firstName,
  //         lastName: targeUserData?.lastName,
  //         roleId: targeUserData?.roleId,
  //         status: targeUserData?.status,
  //         positionId: targeUserData?.positionId,
  //         email: targeUserData?.email,
  //         resourceId: targeUserData?.resourceId || "-",
  //       });
  //     }
  //   }, [reset]);
  const selectedFilteredOperatingUnitIds = ["Survey", "Pos", "Stock Take"];
  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`Update Sales Journey Plan`}
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
                    id="salesperson"
                    showSearch
                    // mode="multiple"
                    placeholder="Select salesperson"
                    value={"Kamran"}
                    optionFilterProp="value"
                    className=" w-full mt-[3px] h-[42px]"
                    onChange={handleSalesPersonSelect} // Add the onChange handler
                  >
                    {SalesPersonLists?.map((role, ind) => (
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
                    id="customers"
                    value={"Ikea"}
                    showSearch
                    placeholder="Select customers"
                    // mode="multiple"
                    optionFilterProp="value"
                    className=" w-full mt-[3px] h-[42px]"
                    onChange={handleSalesPersonSelect} // Add the onChange handler
                  >
                    {CustomersLists?.map((role, ind) => (
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
                    value={selectedFilteredOperatingUnitIds}
                    className=" w-full mt-[3px] h-[42px]"
                    onChange={handleSalesPersonSelect} // Add the onChange handler
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
            {/* <Controller
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
                    type="number"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "} */}
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
                  "Update Sales Journey Plan"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PJPUpdate;
