import { Button, DatePicker, Modal, notification, Select } from "antd";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form, Spin } from "antd";
import { CreateModalProps } from "@/lib/types/user";
import "../../index.css";
import { createTeamType } from "@/lib/types/team";
import { useState } from "react";
import KpiService from "@/services/kpi/kpi.service";
import TextArea from "antd/es/input/TextArea";
const KpiItemsCreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  numericId,
  type,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<createTeamType>({});
  const { useFetchKpiDetails } = KpiService();
  const { data, refetch } = useFetchKpiDetails(numericId);
  const { useHandleCreateKpiItemsService } = KpiService();
  const { mutate, isPending } = useHandleCreateKpiItemsService(reset, refetch);
  const [limit, setUsersLimit] = useState<number>(1200);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [roleId, setUsersSelectedroleId] = useState<number | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<number | undefined>(undefined); // State to store selected IDs
  const [selectedKpiName, setSelectedKpiName] = useState<string | undefined>(
    undefined
  );
  const [selectedKpiItemName, setSelectedKpiItemsName] = useState<
    string | undefined
  >(data?.data?.type);
  const [salesitems, setSalesItems] = useState<any>([
    { value: "Sales Trade", label: "Sales Trade" },
    { value: "DSO", label: "DSO" },
    { value: "Active Dealer", label: "Active Dealer" },
  ]);
  const [projectitems, setProjectItems] = useState<any>([
    { value: "Sales Trade", label: "Sales Trade" },
    { value: "DSO", label: "DSO" },
    { value: "CM", label: "CM" },
  ]);
  const [kpiunits, setKpiUnits] = useState<any>([
    { value: "count", label: "count" },
    { value: "days", label: "days" },
    { value: "tons", label: "tons" },
    { value: "percentage", label: "percentage" },
  ]);

  const [customKpiUnit, setCustomKpiUnit] = useState("");

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

  const [selectedCustomerSegmentIds, setSelectedCustomerSegmentIds] =
    useState<string>();
  const onSubmit: SubmitHandler<any> = (data) => {
    const updatedData = {
      ...data,
      kpiId: numericId,
      target: +data.target, // Ensure actual is a string
    }; // selectedId ko data me inject kiya
    mutate(updatedData);
  };
  //   console.log("filteredOperatingUnitData", filteredOperatingUnitData);
  console.log("data", data);
  const getKpiUnitOptions = () => {
    return kpiunits;
  };
  const getKpiItemsOptions = () => {
    if (selectedKpiItemName === "Sales") {
      return salesitems;
    } else if (selectedKpiItemName === "Project") {
      return projectitems;
    } else {
      return [
        { value: "Sales Trade", label: "Sales Trade" },
        { value: "DSO", label: "DSO" },
        { value: "Active Dealer", label: "Active Dealer" },
        { value: "CM", label: "CM" },
      ]; // ya default options if needed
    }
  };
  const [kpiOptions, setKpiOptions] = useState(getKpiItemsOptions());
  const [customKpiInput, setCustomKpiInput] = useState("");
  const { TextArea } = Input;
  const description = watch("description") || "";

  const handleInsertSymbol = (symbol: string) => {
    setValue("description", description + symbol);
  };

  const symbols = ["+", "-", "*", "/", "(", ")", "^"];
  const [options, setOptions] = useState([
    { label: "KPI 1", value: "KPI 1" },
    { label: "KPI 2", value: "KPI 2" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState<string | undefined>();

  const handleAdd = () => {
    if (
      searchText &&
      !options.find(
        (opt) => opt.value.toLowerCase() === searchText.toLowerCase()
      )
    ) {
      const newOption = { label: searchText, value: searchText };
      setOptions([...options, newOption]);
      setSelected(searchText);
      setSearchText("");
    }
  };

  const handleDelete = (valueToDelete: string) => {
    const filtered = options.filter((opt) => opt.value !== valueToDelete);
    setOptions(filtered);
    if (selected === valueToDelete) {
      setSelected(undefined);
    }
  };
  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-16"
      title={`Create Kpi Items`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            {/* <Controller
              name=""
              control={control}
              rules={{ required: "KPI Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <label
                    htmlFor=""
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    KPI Type
                  </label>
                  <Select
                    {...field}
                    id=""
                    placeholder="Select KPI "
                    className="h-[38px] w-full mt-1"
                    onChange={(value) => {
                      field.onChange(value);
                      setSelectedKpiItemsName(value); // yahan pe value set ho rahi hai state me
                    }}
                    value={field.value} // yahan pe value set ho rahi hai state me
                    options={[
                      { value: "Sales", label: "Sales" },
                      { value: "Project", label: "Project" },
                    ]}
                  />
                </Form.Item>
              )}
            /> */}
            {/* <Controller
              name="kpiName"
              control={control}
              rules={{ required: "KPI Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[100%] mb-5"
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
                    onChange={(value) => {
                      field.onChange(value);
                      setSelectedKpiName(value); // yahan pe value set ho rahi hai state me
                    }}
                    value={field.value}
                    options={getKpiItemsOptions()}
                  />
                </Form.Item>
              )}
            /> */}
            <Controller
              name="kpiName"
              control={control}
              rules={{ required: "KPI Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[100%] mb-5"
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
                    showSearch
                    placeholder="Select KPI Name"
                    className="h-[38px] w-full mt-1"
                    onChange={(value) => {
                      field.onChange(value);
                      setSelectedKpiName(value);
                    }}
                    value={field.value}
                    options={kpiOptions}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <div className="px-2 py-2 border-t border-gray-200">
                          <input
                            type="text"
                            value={customKpiInput}
                            onChange={(e) => setCustomKpiInput(e.target.value)}
                            placeholder="Enter new KPI Item"
                            className="w-full px-2 py-1 border rounded mb-2 text-sm"
                          />
                          <button
                            type="button"
                            className="w-full border-green-600 border-[1px] text-green-800 hover:text-white text-sm py-1 rounded hover:bg-green-700"
                            onMouseDown={(e) => {
                              e.preventDefault(); // prevent dropdown close
                              if (
                                customKpiInput &&
                                !kpiOptions.find(
                                  (opt) =>
                                    opt.value.toLowerCase() ===
                                    customKpiInput.toLowerCase()
                                )
                              ) {
                                const newOption = {
                                  value: customKpiInput,
                                  label: customKpiInput,
                                };
                                setKpiOptions([...kpiOptions, newOption]);
                                setSelectedKpiName(customKpiInput);
                                field.onChange(customKpiInput);
                                setCustomKpiInput("");
                              }
                            }}
                          >
                            Add New Items
                          </button>
                        </div>
                      </>
                    )}
                  />
                </Form.Item>
              )}
            />
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            {/* <Controller
              name="kpiUnit"
              control={control}
              rules={{ required: "kpi Unit is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <label
                    htmlFor="kpiUnit"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Unit
                  </label>
                  <Select
                    {...field}
                    id="kpiUnit"
                    placeholder="Select kpi Unit"
                    className="h-[38px] w-full mt-1"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    options={getKpiUnitOptions()}
                  />
                </Form.Item>
              )}
            /> */}
            <Controller
              name="kpiUnit"
              control={control}
              rules={{ required: "kpi Unit is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <label
                    htmlFor="kpiUnit"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Unit
                  </label>
                  <Select
                    {...field}
                    id="kpiUnit"
                    placeholder="Select KPI Unit"
                    className="h-[38px] w-full mt-1"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    options={getKpiUnitOptions()}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <div className="px-2 py-2 border-t border-gray-200">
                          <input
                            type="text"
                            value={customKpiUnit}
                            onChange={(e) => setCustomKpiUnit(e.target.value)}
                            placeholder="Enter new unit"
                            className="w-full px-2 py-1 border rounded mb-2 text-sm"
                          />
                          <button
                            type="button"
                            className="w-full border-[1px] border-green-600 text-green-800 hover:text-white text-sm py-1 rounded hover:bg-green-800"
                            onMouseDown={(e) => {
                              e.preventDefault(); // to prevent dropdown from closing
                              if (
                                customKpiUnit &&
                                !kpiunits.some(
                                  (unit) =>
                                    unit.value.toLowerCase() ===
                                    customKpiUnit.toLowerCase()
                                )
                              ) {
                                const newUnit = {
                                  value: customKpiUnit,
                                  label: customKpiUnit,
                                };
                                setKpiUnits([...kpiunits, newUnit]);
                                field.onChange(customKpiUnit);
                                setCustomKpiUnit("");
                              }
                            }}
                          >
                            Add Unit
                          </button>
                        </div>
                      </>
                    )}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="weightage"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={errors.name ? "error" : ""}
                  help={errors.name?.message}
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
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1 "
                  />
                </Form.Item>
              )}
            />{" "}
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row ">
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
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
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
                    type="number"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
          </div>
          <div className="">
            {/* <div className="mb-3 flex flex-wrap gap-2">
              {symbols.map((sym) => (
                <Button key={sym} onClick={() => handleInsertSymbol(sym)}>
                  {sym}
                </Button>
              ))}
            </div>{" "} */}
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
            {/* <Controller
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
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold "
                  >
                    Formula
                  </label>
                  <TextArea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Enter Formula"
                    className="mt-1"
                  />
                </Form.Item>
              )}
            /> */}
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
                  "Add Items"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default KpiItemsCreateModal;
