import { TableColumnsType } from "antd";
import { KpiApiResponse } from "@/lib/types/kpi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UsersService from "@/services/users/user.service";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateUserType } from "@/lib/types/user";

const AllTeamMembersKpiDetailsColumns = ({
  datas,
  kpiNames,
}: {
  datas: any;
  kpiNames: string[];
}): TableColumnsType<KpiApiResponse> => {
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
      title: "Kpi Id",
      dataIndex: "id",
      key: "id",
      render: (id) => `${id}`,
      className: "w-fit",
    },
    {
      title: "Name",
      dataIndex: "salesPerson",
      key: "salesPerson",
      render: (salesPerson) =>
        `${salesPerson?.firstName ?? ""} ${salesPerson?.lastName ?? ""}`,
      className: "w-fit",
    },
    ...kpiColumns,
  ];
};

export default AllTeamMembersKpiDetailsColumns;
