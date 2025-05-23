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
import "../../index.css";
import { createTeamType } from "@/lib/types/team";

import UsersService from "@/services/users/user.service";
import TeamsService from "@/services/teams/teams.service";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import KpiService from "@/services/kpi/kpi.service";
import TextArea from "antd/es/input/TextArea";
const KpiCreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
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
  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`Create Kpi`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="teamId"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[100%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="teamId"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Reporting Manager
                  </label>

                  <Select
                    {...field}
                    id="teamId"
                    showSearch
                    placeholder="Reporting Manager"
                    optionFilterProp="children"
                    className=" w-full mt-[3px] h-[42px] "
                    onChange={handleSalesPersonTeamSelect} // Add the onChange handler
                  >
                    {AllTeamsData?.data?.map((role, ind) => (
                      <Option key={ind} value={role?.id}>
                        {role?.name}
                        {/* <span className="ml-2 text-black font-extrabold">
                          {role?.position?.name}
                        </span> */}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="salespersonname"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="salespersonname"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Person Name
                  </label>

                  <Select
                    {...field}
                    id="salespersonname"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    className=" w-full mt-[3px] h-[42px]"
                    onChange={handleSalesPersonSelect} // Add the onChange handler
                  >
                    {targetedTeamData?.data?.members?.map((role, ind) => (
                      <Option key={ind} value={role?.id}>
                        {role?.firstName}
                        <span className="ml-2 text-black font-extrabold">
                          {role?.lastName}
                        </span>
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
            <Controller
              name="customerSegments"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-2"
                  // validateStatus={errors?.customerSegmentIds ? "error" : ""}
                  // help={errors?.customerSegmentIds?.message}
                >
                  <label
                    htmlFor="customerSegments"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Customer Segment
                  </label>

                  <Select
                    {...field}
                    id="customerSegments"
                    placeholder="Customer Segment"
                    // mode="multiple"
                    className=" w-full mt-[3px]  h-[42px] "
                    onChange={handleChange}
                  >
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
          <div className="flex justify-between w-full flex-col lg:flex-row mb-5">
            <Controller
              name="operatingunit"
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
                    Operating Unit
                  </label>

                  <Select
                    {...field}
                    id="operatingunit"
                    placeholder="Operating Unit"
                    // mode="multiple"
                    className=" w-full mt-[3px]  h-[42px] "
                    onChange={handleChangeOperatingUnit}
                  >
                    {filteredOperatingUnitData?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />{" "}
            <Controller
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
                  </label>{" "}
                  <Select
                    {...field}
                    id="type"
                    placeholder="Type"
                    className="w-full mt-[3px] h-[42px]"
                    onChange={handleChangeKpiTypes}
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
                        <div className="p-2 border-t flex w-full justify-between items-center gap-2">
                          <Input
                            value={customKpiValue}
                            onChange={(e) => setCustomKpiValue(e.target.value)}
                            placeholder="Enter new type"
                            className="w-8/12 border"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            onClick={handleAddCustomKpiType}
                            className="w-3/12 border rounded text-xs"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  >
                    {allKpiTypes?.map((role, ind) => (
                      <Option key={ind} value={role}>
                        {role}
                      </Option>
                    ))}
                  </Select>
                  {/* <Select
                    {...field}
                    id="type"
                    placeholder="Type"
                    // mode="multiple"
                    className=" w-full mt-[3px]  custom-select"
                    onChange={handleChangeKpiTypes}
                  >
                    {KpiTypes?.map((role, ind) => (
                      <Option key={ind} value={role}>
                        {role}
                      </Option>
                    ))}
                  </Select> */}
                </Form.Item>
              )}
            />
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            {" "}
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full mb-5"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <label
                    htmlFor="description"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    <div>Formula</div>
                    <div>
                      {" "}
                      <div className="my-2 flex flex-wrap gap-2">
                        {symbols.map((sym) => (
                          <Button
                            key={sym}
                            onClick={() => handleInsertSymbol(sym)}
                          >
                            {sym}
                          </Button>
                        ))}
                      </div>{" "}
                    </div>
                  </label>
                  <TextArea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Enter Formula"
                    className=""
                  />
                </Form.Item>
              )}
            />
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
                  "Add Kpi"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default KpiCreateModal;
