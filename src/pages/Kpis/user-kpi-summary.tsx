import BarChart from "@/components/kpi/kpi-bar-chart";
import KpiService from "@/services/kpi/kpi.service";
import { DatePicker } from "antd";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";

function UserKpiSummary() {
  const { useFetchKpiSummaryDetails, useFetchKpiDetails } = KpiService();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const [selectedType, setSelectedType] = useState("Sales");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);

  const { data } = useFetchKpiDetails(numericId);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const { data: UserKpiSummaryData } = useFetchKpiSummaryDetails(
    data?.data?.salesPerson?.id,
    startDate,
    endDate,
    selectedType
  );
  const kpiData = UserKpiSummaryData?.data?.kpiSummary[0];
  console.log("kpiData", kpiData);
  const handleStartDateChange = (date: moment.Moment | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setStartDate(formattedDate);
    } else {
      setStartDate(undefined);
    }
  };
  const handleEndDateChange = (date: moment.Moment | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setEndDate(formattedDate);
    } else {
      setEndDate(undefined);
    }
  };

  return (
    <div className="p-7 border-2 w-11/12 mx-auto mt-9">
      {" "}
      <div className="  flex ">
        <DatePicker
          onChange={handleStartDateChange}
          className="mx-1 md:mr-3  custom-select"
          placeholder=" Start Date"
          suffixIcon={<IoIosArrowDown />}
        />
        <DatePicker
          className="custom-select"
          onChange={handleEndDateChange}
          placeholder=" End Date "
          suffixIcon={<IoIosArrowDown />}
        />{" "}
        <div className="ml-auto ">
          {" "}
          <select
            // value={selectedPeriod}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mb-6 px-4 py-2 border  rounded-lg h-12 custom-select"
          >
            <option value="Sales">Sales</option>
            <option value="Project">Project</option>
          </select>
        </div>
      </div>
      {/* <select
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        className="mb-6 px-4 py-2 border rounded"
      >
        <option value="month">Monthly</option>
        <option value="week">Weekly</option>
        <option value="year">Yearly</option>
      </select> */}
      <BarChart kpiData={kpiData?.kpiData} selectedType={selectedType} />
    </div>
  );
}

export default UserKpiSummary;
