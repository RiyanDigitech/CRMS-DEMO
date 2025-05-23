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
import KpiReportDetails from "./kpi-report-details";
import { useNavigate } from "react-router-dom";
const KpiReportMaster: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
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

  const handleChange = (selectedIds: string) => {
    setSelectedCustomerSegmentIds(selectedIds); // Sirf IDs store ho rahi hain
  };
  const { data: customerSegmentsData } = useFetchAllCustomerSegments();
  const handleChangeOperatingUnit = (selectedIds: number[]) => {
    setSelectedOperatingUnitIds(selectedIds); // Sirf IDs store ho rahi hain
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

  const [allKpiTypes, setAllKpiTypes] = useState(KpiTypes); // initialize with API data
  useEffect(() => {
    setAllKpiTypes(KpiTypes);
    console.log("allKpiTypes", allKpiTypes);
  }, []);

  const symbols = [
    "+",
    "-",
    "*",
    "/",
    "(",
    ")",
    "^",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "⌫",
  ];
  const description = watch("description") || "";

  const [kpis, setKpis] = useState<string[]>([
    "DSO",
    "Active-Dealer",
    "Sales-Trade",
  ]); // KPI names from API
  const [selectKey, setSelectKey] = useState<number>(0); // To force re-render Select
  const handleInsertSymbol = (symbol: string) => {
    if (symbol === "⌫") {
      setValue("description", description.slice(0, -1));
    } else {
      setValue("description", description + symbol);
    }
    // Reset Select after KPI selection
    if (kpis.includes(symbol)) {
      setSelectKey((prev) => prev + 1); // Change key to reset Select
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const kpinameValue = watch("kpiname");
  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();

  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`Create Report `}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {" "}
      {<KpiReportDetails isOpen={isModalOpen} onClose={handleCloseModal} />}
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="kpiname"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[100%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="target"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Report Name
                  </label>
                  <Input
                    {...field}
                    id="target"
                    placeholder="Report Name"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                  {kpinameValue && kpinameValue?.trim() !== "" && (
                    <>
                      <button
                        onClick={() => navigate("/report-master/123")}
                        className="mt-5 bg-[#008444] p-2 rounded-lg text-white hover:bg-[#144e32]"
                      >
                        Submit
                      </button>{" "}
                      {/* <div
                        onClick={() => ShowModal()}
                        className=" text-blue-600 my-2 underline cursor-pointer"
                      >
                        Report Details
                      </div> */}
                    </>
                  )}
                </Form.Item>
              )}
            />{" "}
          </div>{" "}
          {/* <div className="flex justify-between w-full flex-col lg:flex-row ">
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
          </div>{" "}
          <div className="my-4">
            <div className="flex justify-between w-full flex-col lg:flex-row">
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
                        <div className="my-2 flex flex-wrap gap-2">
                          <Select
                            key={selectKey} // Reset Select on KPI selection
                            placeholder="KPI"
                            className="inline !w-[120px]"
                            onChange={(value) => handleInsertSymbol(value)}
                            options={kpis.map((kpi) => ({
                              label: kpi,
                              value: kpi,
                            }))}
                            allowClear // Optional: Allow clearing selection
                          />
                          {symbols.map((sym) => (
                            <Button
                              key={sym}
                              onClick={() => handleInsertSymbol(sym)}
                            >
                              {sym}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </label>
                    <TextArea
                      {...field}
                      id="description"
                      rows={4}
                      placeholder="Enter Formula"
                      className=""
                      readOnly
                    />
                  </Form.Item>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row items-center">
            <div className="flex justify-center w-full lg:w-[60%]  mx-auto">
              <button
                type="submit"
                className="h-[42px] font-manrope  w-full  border-[1px] border-[#FF8548] bg-[#FF8548] text-white  rounded-md text-sm"
              >
                {isPending ? (
                  <Spin className="custom-spinner rounded-lg p-1" />
                ) : (
                  "Add Report Master"
                )}
              </button>
            </div>
          </div> */}
        </div>
      </form>
    </Modal>
  );
};

export default KpiReportMaster;
