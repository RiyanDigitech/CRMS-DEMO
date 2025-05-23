import { TableColumnsType } from "antd";

const TeamMembersKpiDetailsColumns = (type: any): TableColumnsType<any> => {
  // Static KPI types
  var kpiNames;
  if (type === "Project") {
    kpiNames = ["Sales Trade", "DSO", "CM"];
  } else {
    kpiNames = ["Sales Trade", "DSO", "Active Dealer"];
  }
  const kpiColumns = kpiNames.map((name) => ({
    title: (
      <div className="flex flex-col items-center border-[1px] bg-gray-200">
        <div>{name}</div>
      </div>
    ),
    key: name,
    children: [
      {
        title: "Weightage",
        key: `weightage-${name}`,
        align: "center",
        render: (record: any) => {
          const kpi = record.kpiItems.find(
            (item: any) => item.kpiName === name
          );
          return <div>{kpi?.weightage ? `${kpi.weightage}%` : "-"}</div>;
        },
      },
      {
        title: "Target",
        key: `target-${name}`,
        align: "center",
        render: (record: any) => {
          const kpi = record.kpiItems.find(
            (item: any) => item.kpiName === name
          );
          return <div>{kpi?.target ?? "-"}</div>;
        },
      },
      {
        title: "Actual",
        key: `actual-${name}`,
        align: "center",
        render: (record: any) => {
          const kpi = record.kpiItems.find(
            (item: any) => item.kpiName === name
          );
          return <div>{kpi?.actual ?? "-"}</div>;
        },
      },
      {
        title: "Score",
        key: `score-${name}`,
        align: "center",
        render: (record: any) => {
          const kpi = record.kpiItems.find(
            (item: any) => item.kpiName === name
          );
          return <div>{kpi?.score?.toFixed(2) ?? "-"}</div>;
        },
      },
    ],
  }));

  return [
    {
      title: "Name",
      dataIndex: "salesPerson",
      key: "salesPerson",
      render: (salesPerson: any) =>
        `${salesPerson?.firstName ?? ""} ${salesPerson?.lastName ?? ""}`,
      className: "w-fit",
    },
    ...kpiColumns,
  ];
};

export default TeamMembersKpiDetailsColumns;
