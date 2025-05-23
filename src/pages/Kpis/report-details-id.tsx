import { createTeamType } from "@/lib/types/team";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Select,
  Spin,
  Table,
} from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Option } from "antd/es/mentions";
import UsersService from "@/services/users/user.service";
import TextArea from "antd/es/input/TextArea";
import KpiService from "@/services/kpi/kpi.service";
import KpiReportDetails from "@/components/kpi/kpi-report-details";
import KpiReportDetailsColumns from "@/lib/constants/columns/report-details";
import { useNavigate } from "react-router-dom";
function ReportDetailsId() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<createTeamType>({});
  const {
    useFetchAllUsers,
    useFetchAllCustomerSegments,
    useFetchAllOperationUnitIds,
  } = UsersService();
  const { data: customerSegmentsData } = useFetchAllCustomerSegments();
  const [selectKey, setSelectKey] = useState<number>(0); // To force re-render Select

  const [selectedOperatingUnitIds, setSelectedOperatingUnitIds] = useState<
    number[] | undefined
  >(undefined);
  const [selectedCustomerSegmentIds, setSelectedCustomerSegmentIds] =
    useState<string>();

  const handleChangeOperatingUnit = (selectedIds: number[]) => {
    setSelectedOperatingUnitIds(selectedIds); // Sirf IDs store ho rahi hain
  };
  const handleChange = (selectedIds: string) => {
    setSelectedCustomerSegmentIds(selectedIds); // Sirf IDs store ho rahi hain
  };
  const { data: positingUnitsData } = useFetchAllOperationUnitIds(50, 1);
  const { useHandleCreateKpiService } = KpiService();

  const { mutate, isPending } = useHandleCreateKpiService(reset);

  const filteredOperatingUnitData = positingUnitsData?.data.map(
    ({ id, name }) => ({
      id,
      name,
    })
  );
  const [kpis, setKpis] = useState<string[]>([
    "DSO",
    "Active-Dealer",
    "Sales-Trade",
  ]); // KPI names from API
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const dataTable = [
    {
      id: 1,
      salesperson: "Ahmed",
      manager: "Khan",
      target: 45,
      actual: 42,
      score: 107.1,
      weight: 25,
      rating: "A+",
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
      name: "DSO",
      unit: "days",
      formula: "(a+b)/(a-b)",
      reportname: "kpi-stockist",
      showactual: true,
      showtarget: false,
    },
    {
      id: 2,
      name: "Active Dealer",
      unit: "count",
      formula: "(a+b)(a-b)",
      salesperson: "Wasim",
      manager: "Khan",
      target: 45,
      actual: 47,
      score: 95.7,
      weight: 25,
      rating: "A",
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
      reportname: "kpi-stockist",
      showactual: false,
      showtarget: true,
    },
    {
      id: 3,
      salesperson: "Javed",
      manager: "Muhammad Faisal",
      kpi: "Sales Trade",
      target: 200,
      actual: 185,
      score: 92.5,
      weight: 30,
      rating: "A",
      startdate: "2-3-2025",
      enddate: "3-3-2025",
      customersegment: "Export",
      operatingunit: "faisalabad-OU",
      name: "Sales Trade",
      unit: "tons",
      formula: "(a+b)(a-b)/(a-b)",
      reportname: "kpi-stockist",
      showactual: true,
      showtarget: true,
    },
  ];
  const { useFetchAllKpis } = KpiService();
  const [roleId, setUsersSelectedroleId] = useState<string | undefined>(
    undefined
  );
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(2);
  const [limit, setLimit] = useState<number>(2);

  const { data: userData, isFetching: isUserDataLoading } = useFetchAllKpis(
    roleId,
    query,
    page,
    limit
  );
  const GetAllUsers = () => {
    setUsersSelectedroleId(undefined);
    setUsersQuery(undefined);
  };
  const handlePageChange = (page: number, pageSize?: number) => {};
  const totalResults = userData?.total || 0;
  const showTotal = (total: number) => `Showing 10 of 20 Results`;
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="bg-white p-3 rounded-lg my-5">
        {" "}
        {<KpiReportDetails isOpen={isModalOpen} onClose={handleCloseModal} />}
        <div className="flex justify-between items-center">
          {" "}
          <div className="text-lg font-bold ">KPI-Selection</div>
          <button
            onClick={() => ShowModal()}
            className="mb-3 w-[25%] sm:w-[15%] lg:w-fit bg-[#ff8548] text-[11px] leading-3 rounded-lg md:px-3 md:py-2 text-white lg:text-[12px]  lg:px-4 lg:py-4 font-semibold"
          >
            Add KPI Weightage
          </button>
        </div>
        <div className=" border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table lg:mb-5">
          <Table<any>
            columns={KpiReportDetailsColumns()}
            dataSource={
              dataTable
              // ?.filter((user) => user?.status !== "Deactivated")
              // .map((user) => ({
              //   ...user,
              //   key: user?.id,
              // }))
            }
            loading={isUserDataLoading}
            pagination={false}
            className="overflow-auto"
          />
          <div className="flex justify-between items-center mt-4 p-4 border-t flex-col md:flex-row">
            <div className="text-sm text-gray-600 mb-5 md:mb-0">
              {showTotal(totalResults)}
              <button
                onClick={GetAllUsers}
                className="ml-2 text-[#008444] cursor-pointer"
              >
                View All
              </button>
            </div>
            <Pagination
              current={1}
              pageSize={10}
              total={totalResults}
              onChange={handlePageChange}
              showSizeChanger={false} // Enable page size changer
              size="small"
              className="custom-pagination"
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-3 rounded-lg">
        {" "}
        <div className="text-lg font-bold mb-4">Report-Description</div>{" "}
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
                  Start Date
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
                  End Date
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
        <div className="flex justify-between w-full flex-col lg:flex-row ">
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
          />{" "}
          <Controller
            name="reportdescription"
            control={control}
            render={({ field }) => (
              <Form.Item
                className="w-full sm:w-full lg:w-[48%] mb-2"
                // validateStatus={errors?.customerSegmentIds ? "error" : ""}
                // help={errors?.customerSegmentIds?.message}
              >
                <label
                  htmlFor="reportdescription"
                  className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                >
                  Description
                </label>

                <Input
                  {...field}
                  id="reportdescription"
                  placeholder="Report Description"
                  // mode="multiple"
                  className=" w-full mt-[3px]  h-[42px] "
                />
              </Form.Item>
            )}
          />
        </div>{" "}
        <div className="flex justify-between w-full flex-col lg:flex-row ">
          {/* <Controller
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
          />{" "} */}
        </div>{" "}
        <div className="my-4">
          <div className="flex justify-between w-full flex-col lg:flex-row">
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-5"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <label
                    htmlFor="description"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    <div>Report Formula</div>
                    <div>
                      <div className="my-2 flex flex-wrap gap-2">
                        <Select
                          key={selectKey} // Reset Select on KPI selection
                          placeholder="KPI"
                          showSearch
                          optionFilterProp="value"
                          className="inline !w-[120px]"
                          onChange={(value) => handleInsertSymbol(value)}
                          options={kpis.map((kpi) => ({
                            label: kpi,
                            value: kpi,
                          }))}
                          allowClear // Optional: Allow clearing selection
                        />
                        {/* <Select
                          key={`restricted-${selectKey}`} // Unique key to reset with KPI selection
                          placeholder="Restricted Fields"
                          showSearch
                          optionFilterProp="value"
                          className="inline !w-[150px]"
                          onChange={(value) => handleInsertSymbol(value)}
                          options={[
                            { label: "DSO-R1", value: "DSO-R1" },
                            { label: "DSO-R2", value: "DSO-R2" },
                            { label: "DSO-R3", value: "DSO-R3" },
                          ]}
                          allowClear // Optional: Allow clearing selection
                        /> */}
                        <Select
                          placeholder="Restricted Fields"
                          showSearch
                          optionFilterProp="value"
                          className="inline !w-[150px]"
                          onChange={(value) => {
                            if (value) {
                              handleInsertSymbol(value);
                            }
                          }}
                          value={null} // Clear selection after each pick
                          options={[
                            { label: "DSO-R1", value: "DSO-R1" },
                            { label: "DSO-R2", value: "DSO-R2" },
                            { label: "DSO-R3", value: "DSO-R3" },
                          ]}
                          allowClear
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
            />{" "}
            <Controller
              name="reportresulttitlename"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-2"
                  // validateStatus={errors?.customerSegmentIds ? "error" : ""}
                  // help={errors?.customerSegmentIds?.message}
                >
                  <label
                    htmlFor="reportresulttitlename"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Report Result Title Name
                  </label>

                  <Input
                    {...field}
                    id="reportresulttitlename"
                    placeholder="Report Result Title Column Name"
                    // mode="multiple"
                    className=" w-full mt-[3px]  h-[42px] "
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
              onClick={() => navigate("/KPI-report")}
              className="h-[42px] font-manrope  w-fit p-2 border-[1px] border-[#FF8548] bg-[#FF8548] text-white  rounded-md text-sm"
            >
              {isPending ? (
                <Spin className="custom-spinner rounded-lg p-1" />
              ) : (
                "Add Report Details Description"
              )}
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default ReportDetailsId;
