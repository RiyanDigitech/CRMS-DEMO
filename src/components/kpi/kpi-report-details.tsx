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
const KpiReportDetails: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
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
  const Kpis = ["DSO", "Active-Dealer", "Sales-Trade"];

  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`KPI Weightage`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="kpi"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  // validateStatus={errors?.positionId ? "error" : ""}
                  // help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="kpi"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Kpi
                  </label>

                  <Select
                    {...field}
                    id="kpi"
                    showSearch
                    placeholder="Select Kpi"
                    optionFilterProp="value"
                    className=" w-full mt-[3px] h-[42px]"
                    onChange={handleSalesPersonSelect} // Add the onChange handler
                  >
                    {Kpis?.map((role, ind) => (
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
              name="weightage"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
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
                    placeholder="Weightage"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="showactual"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="showactual"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Show Actual
                  </label>
                  <Select
                    {...field}
                    id="kpi"
                    showSearch
                    placeholder="Show Actual"
                    optionFilterProp="value"
                    className=" w-full mt-[3px] h-[42px]"
                  >
                    <Option key={1} value={"Yes"}>
                      <span className="ml-2 text-black font-extrabold">
                        {"Yes"}
                      </span>
                    </Option>{" "}
                    <Option key={2} value={"No"}>
                      <span className="ml-2 text-black font-extrabold">
                        {"No"}
                      </span>
                    </Option>
                  </Select>
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="showtarget"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="showtarget"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Show Target
                  </label>
                  <Select
                    {...field}
                    id="showtarget"
                    showSearch
                    placeholder="Show Target"
                    optionFilterProp="value"
                    className=" w-full mt-[3px] h-[42px]"
                  >
                    <Option key={3} value={"Yes"}>
                      <span className="ml-2 text-black font-extrabold">
                        {"Yes"}
                      </span>
                    </Option>{" "}
                    <Option key={4} value={"No"}>
                      <span className="ml-2 text-black font-extrabold">
                        {"No"}
                      </span>
                    </Option>
                  </Select>
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
                  "Add KPI Weightage"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default KpiReportDetails;
