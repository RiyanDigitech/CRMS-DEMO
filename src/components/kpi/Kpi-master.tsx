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
const KpiMasterCreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
}) => {
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
  const symbols = [
    "+",
    "-",
    "*",
    "/",
    "(",
    ")",
    "^",
    "Actual",
    "Target",
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
    "⌫",
  ];
  const handleInsertSymbol = (symbol: string) => {
    if (symbol === "⌫") {
      setValue("description", description.slice(0, -1)); // last character remove
    } else {
      setValue("description", description + symbol); // add symbol
    }
  };
  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`KPI Master`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="kpiname"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="target"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    KPI Name
                  </label>
                  <Input
                    {...field}
                    id="target"
                    placeholder="kpi name"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="actual"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Unit
                  </label>
                  <Input
                    {...field}
                    id="actual"
                    placeholder="Unit"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
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
                    readOnly
                  />
                </Form.Item>
              )}
            />
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="r1"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="r1"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    R1
                  </label>
                  <Input
                    {...field}
                    id="r1"
                    placeholder="Restricted Fields r1 Optional"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="r2"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="r2"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    R2
                  </label>
                  <Input
                    {...field}
                    id="r2"
                    placeholder="Restricted Fields r2 Optional"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="r3"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="r3"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    R3
                  </label>
                  <Input
                    {...field}
                    id="r3"
                    placeholder="Restricted Fields r1 Optional"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="r4"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="r4"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    R4
                  </label>
                  <Input
                    {...field}
                    id="r4"
                    placeholder="Restricted Fields r4 Optional"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="r5"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="r5"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    R5
                  </label>
                  <Input
                    {...field}
                    id="r5"
                    placeholder="Restricted Fields r1 Optional"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="r6"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-3"
                  // validateStatus={errors.name ? "error" : ""}
                  // help={errors.name?.message}
                >
                  <label
                    htmlFor="r6"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    R6
                  </label>
                  <Input
                    {...field}
                    id="r6"
                    placeholder="Restricted Fields r4 Optional"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
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
                  "Add KPI Master"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default KpiMasterCreateModal;
