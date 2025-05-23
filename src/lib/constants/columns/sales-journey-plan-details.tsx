import { JourneyPlanTableData } from "@/lib/types/pjp";
import { TableColumnsType } from "antd";

const SalesJourneyPlanDetailsColumns =
  (): TableColumnsType<JourneyPlanTableData> => {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        className: "lg:w-[7vw]",
      },
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
        className: "lg:w-fit",
      },
      {
        title: "Tasks",
        dataIndex: "tasks",
        key: "tasks",
        className: "tasks",
      },
    ];
  };
export default SalesJourneyPlanDetailsColumns;
