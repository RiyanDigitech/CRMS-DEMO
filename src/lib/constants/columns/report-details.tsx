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

const KpiReportDetailsColumns = (): TableColumnsType<KpiApiResponse> => {
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
    // {
    //   title: "Name",
    //   className: "w-fit",
    //   dataIndex: "salesperson",
    //   key: "salesperson",
    //   render: (salesperson) => (
    //     <div className="w-fit">{salesperson || "-"}</div>
    //   ),
    // },

    // {
    //   title: "StartDate",
    //   dataIndex: "startdate",
    //   key: "startdate",
    //   render: (startdate) => startdate || "-",
    // },
    // {
    //   title: "EndDate",
    //   dataIndex: "enddate",
    //   key: "enddate",
    //   render: (enddate) => enddate || "-",
    // },
    {
      title: "Kpi Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name || "-",
    },
    // {
    //   title: "Report Name",
    //   dataIndex: "reportname",
    //   key: "reportname",
    //   render: (reportname) => reportname || "-",
    // },
    // {
    //   title: "Target",
    //   dataIndex: "target",
    //   key: "target",
    //   render: (target) => target || "-",
    // },
    // {
    //   title: "Actual",
    //   dataIndex: "actual",
    //   key: "actual",
    //   render: (actual) => actual || "-",
    // },

    {
      title: "Weightage",
      dataIndex: "weight",
      key: "weight",
      render: (weight) => weight || "-",
    },
    {
      title: "Show Actual",
      dataIndex: "showactual",
      key: "showactual",
      render: (showactual) => (showactual ? "Yes" : "No"),
    },
    {
      title: "Show Target",
      dataIndex: "showtarget",
      key: "showtarget",
      render: (showtarget) => (showtarget ? "Yes" : "No"),
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
              onClick={() => navigate(`/user-kpi-summary-details/${record.id}`)}
            >
              <CiCircleInfo className="text-[#f07136]" />
            </p> */}
            <p
              className="text-lg cursor-pointer"
              onClick={() =>
                navigate(`/kpi-national-sales-manager-details/${record.id}`)
              }
            >
              <IoEyeOutline className="text-[#008444]" />
            </p>{" "}
            <p
              onClick={() => navigate(`/kpi-details/${record.id}`)}
              className="mx-2 text-lg cursor-pointer"
            >
              <FaRegEdit className="text-blue-400" />
            </p>
            <KpiUpdateModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              editData={editData}
            />
            {/* <p
              onClick={() => ShowModal(record)}
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
              <button type="submit" className="text-gray-600 flex items-center">
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

export default KpiReportDetailsColumns;
