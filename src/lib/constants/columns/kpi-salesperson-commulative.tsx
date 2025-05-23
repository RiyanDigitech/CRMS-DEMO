import { Popover, Spin, TableColumnsType } from "antd";
import { UpdateUserType } from "@/lib/types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { KpiApiResponse } from "@/lib/types/kpi";
import KpiUpdateModal from "@/components/kpi/kpi-update-modals";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

const KpiManagementSalesPersonCommulativeReportColumns =
  (): TableColumnsType<any> => {
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
        title: "Person Name",
        className: "w-fit",
        dataIndex: "salesperson",
        key: "salesperson",
        render: (salesperson) => (
          <div className="w-fit">{salesperson || "-"}</div>
        ),
      },
      {
        title: "Reporting Manager",
        className: "w-fit",
        dataIndex: "manager",
        key: "manager",
        render: (manager) => <div className="w-fit">{manager || "-"}</div>,
      },
      {
        title: "Designation",
        className: "w-fit",
        dataIndex: "designation",
        key: "designation",
        render: (designation) => (
          <div className="w-fit">{designation || "-"}</div>
        ),
      },
      {
        title: "KPI",
        dataIndex: "kpi",
        key: "kpi",
        render: (kpi) => <div className="w-fit">{kpi || "-"}</div>,
      },
      {
        title: "KPI-Type",
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
        title: "Weight",
        dataIndex: "weight",
        key: "weight",
        render: (weight: any) => weight || "-",
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        render: (rating: any) => rating || "-",
      },
      {
        title: "Action",
        key: "action",
        className: "w-[24vw] lg:w-fit",
        render: (record) => {
          const content = (
            <div className="flex items-center">
              {" "}
              {/* <p
                className="text-lg cursor-pointer mr-1"
                onClick={() =>
                  navigate(`/user-kpi-summary-details/${record.id}`)
                }
              >
                <CiCircleInfo className="text-[#f07136]" />
              </p> */}
              <p
                className="text-lg cursor-pointer"
                onClick={() =>
                  navigate(`/user-kpi-summary-details/${record.id}`)
                }
              >
                <IoEyeOutline className="text-[#008444]" />
              </p>
              <KpiUpdateModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                editData={editData}
              />
              {/* <p
                onClick={() => navigate(`/kpi-details/${record.id}`)}
                className="mx-2 text-lg cursor-pointer"
              >
                <FaRegEdit className="text-blue-400" />
              </p> */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setselectedId(record.id);
                  handleSubmit(onSubmit)();
                }}
                className="cursor-pointer"
              >
                <button
                  type="submit"
                  className="text-gray-600 flex items-center"
                >
                  {isPending ? (
                    <Spin />
                  ) : (
                    <BsTrash3Fill className="text-red-400 text-lg" />
                  )}
                </button>
              </form>
            </div>
          );
          return (
            <Popover placement="right" content={content}>
              <BsThreeDotsVertical style={{ cursor: "pointer" }} />
            </Popover>
          );
        },
      },
    ];
  };

export default KpiManagementSalesPersonCommulativeReportColumns;
