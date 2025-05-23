import { Popover, Spin, TableColumnsType } from "antd";
import { UpdateUserType } from "@/lib/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import { SubmitHandler, useForm } from "react-hook-form";

const KpiCommulativeManagementDetailsReportColumns = (
  reportingmangerdataTable: any[]
): TableColumnsType<any> => {
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
  };
  console.log("editData", editData);
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `${id}`,
      className: "lg:w-[5vw]",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      className: "w-fit",
      render: (text, row, index) => {
        const sameManagerRows = reportingmangerdataTable.filter(
          (item) => item.manager === row.manager
        );

        const firstIndex = reportingmangerdataTable.findIndex(
          (item) => item.manager === row.manager
        );

        const rowSpan = index === firstIndex ? sameManagerRows.length : 0;

        return {
          children: (
            <div className=" text-lg font-bold capitalize ">{text}</div>
          ),
          props: {
            rowSpan,
          },
        };
      },
    },

    // {
    //   title: "Name",
    //   className: "w-fit",
    //   dataIndex: "manager",
    //   key: "manager",
    //   render: (manager) => <div className="w-fit">{manager || "-"}</div>,
    // },

    {
      title: "KPI",
      dataIndex: "kpi",
      key: "kpi",
      render: (kpi) => <div className="w-fit">{kpi || "-"}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <div className="w-fit">{type || "-"}</div>,
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: (target) => <div className="w-fit">{target || "-"}</div>,
    },
    {
      title: "Actual",
      dataIndex: "actual",
      key: "actual",
      render: (actual) => actual || "-",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score: any) => score || "-",
    },
    {
      title: "Operating Unit",
      dataIndex: "operatingunit",
      key: "operatingunit",
      render: (operatingunit: any) => operatingunit || "Quetta-OU",
    },
    {
      title: "Customer Segment",
      dataIndex: "customersegment",
      key: "customersegment",
      render: (customersegment: any) => customersegment || "Export",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (region: any) => region || "South",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: any) => rating || "-",
    },
  ];
};

export default KpiCommulativeManagementDetailsReportColumns;
