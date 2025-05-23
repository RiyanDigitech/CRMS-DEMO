import { Popover, Spin, TableColumnsType } from "antd";
import { UpdateUserType } from "@/lib/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { KpiApiResponse } from "@/lib/types/kpi";

const KpiDetailsColumns = (): TableColumnsType<KpiApiResponse> => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [selectedId, setselectedId] = useState<number | undefined>(undefined);
  const [editData, setEditData] = useState();

  const toggleExpand = (userId: number) => {
    setExpandedRowId((prev) => (prev === userId ? null : userId));
  };
  const { useHandleDeleteUserService } = UsersService();
  const { handleSubmit, reset } = useForm<UpdateUserType>();
  const { mutate, isPending } = useHandleDeleteUserService(reset, selectedId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
    if (!selectedId) {
      return;
    }
    mutate();
  };
  const ShowModal = (record: any) => {
    setIsModalOpen(true);
    setEditData(record);
    // console.log("record", record);
  };
  return [
    {
      title: "ID #",
      dataIndex: "id",
      key: "id",
      render: (id) => `${id}`,
      className: " lg:w-[5vw]",
    },
    {
      title: (
        <div className="flex flex-col items-center border-[1px] bg-gray-200">
          <div>DSO</div>
          <div className="text-xs text-gray-500">40%</div>
        </div>
      ),
      key: "kpiItems",
      children: [
        {
          title: "Target",
          key: "target",
          align: "center",
          render: (record: any) => {
            console.log("Record data aaaaaaaaaaaaaaaaaaaaaaa", record); // Yeh har row ke liye record log karega
            return (
              <div className="rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
                {record?.kpiName === "DSO" ? record?.target : "-"}
              </div>
            );
          },
        },

        {
          title: "Actual",
          key: "actual",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "DSO" ? record?.actual : "-"}
            </div>
          ),
        },

        {
          title: "Score",
          key: "score",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "DSO" ? record?.score : "-"}
            </div>
          ),
        },
      ],
    },
    {
      title: (
        <div className="flex flex-col items-center border-[1px] bg-gray-200">
          <div>Sales</div>
          <div className="text-xs text-gray-500">40%</div>
        </div>
      ),
      key: "kpiItems",
      children: [
        {
          title: "Target",
          key: "target",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "Sales Trade" ? record?.target : "-"}
            </div>
          ),
        },
        {
          title: "Actual",
          key: "actual",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "Sales Trade" ? record?.actual : "-"}
            </div>
          ),
        },
        {
          title: "Score",
          key: "score",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "Sales Trade" ? record?.score : "-"}
            </div>
          ),
        },
      ],
    },
    {
      title: (
        <div className="flex flex-col items-center border-[1px] bg-gray-200">
          <div>Active Dealer</div>
          <div className="text-xs text-gray-500">30%</div>
        </div>
      ),
      key: "kpiItems",
      children: [
        {
          title: "Target",
          key: "target",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "Active Dealer" ? record?.target : "-"}
            </div>
          ),
        },
        {
          title: "Actual",
          key: "actual",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "Active Dealer" ? record?.actual : "-"}
            </div>
          ),
        },
        {
          title: "Score",
          key: "score",
          align: "center",
          render: (record: any) => (
            <div className="  rounded-md pr-4 lg:pr-0 w-fit lg:w-fit">
              {record?.kpiName === "Active Dealer" ? record?.score : "-"}
            </div>
          ),
        },
      ],
    },
  ];
};

export default KpiDetailsColumns;
