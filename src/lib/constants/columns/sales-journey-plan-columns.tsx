// import { Popover, Spin, TableColumnsType } from "antd";
// import "../../../index.css";
// import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
// import { FaRegEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Survey } from "@/lib/types/survey";
// import { useState } from "react";
// import SurveysService from "@/services/survey/survey.services";
// import { IoEyeOutline } from "react-icons/io5";
// import PJP from "@/components/pjp/pjp";
// import PJPUpdate from "@/components/pjp/pjp-update-form";

import { Popover, Spin, TableColumnsType } from "antd";
import "../../../index.css";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SurveysService from "@/services/survey/survey.services";
import { IoEyeOutline } from "react-icons/io5";
import PJPUpdate from "@/components/pjp/pjp-update-form";
import { Task, TaskAssignment } from "@/lib/types/pjp";

const SalesJourneyPlanColumns = (): TableColumnsType<TaskAssignment> => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useFetchDeletedSurvey } = SurveysService();
  const { mutate, isPending } = useFetchDeletedSurvey(selectedId);
  const navigate = useNavigate();

  const handleDeleteSurvey = (id: number) => {
    setSelectedId(id);
    mutate();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return [
    {
      title: "ID",
      className: "lg:w-[7vw]",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sales Person",
      className: "lg:w-fit",
      key: "salesPerson",
      render: (record: TaskAssignment) =>
        `${record.salesPerson.firstName} ${record.salesPerson.lastName}`,
    },
    {
      title: "Customer",
      className: "lg:w-fit",
      key: "customer",
      render: (record: TaskAssignment) => record.customer.name,
      responsive: ["lg"],
    },
    {
      title: "Tasks",
      className: "tasks",
      dataIndex: "tasks",
      key: "tasks",
      render: (tasks: Task[]) =>
        tasks?.length > 0
          ? tasks
              .slice(0, 2)
              .map((task) => task.name)
              .join(", ")
          : "No tasks",
    },
    {
      title: "Start Date",
      className: "lg:w-fit",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: string) =>
        new Date(startDate).toLocaleDateString("en-GB"), // Format: DD/MM/YYYY
    },
    {
      title: "End Date",
      className: "lg:w-fit",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: string) =>
        new Date(endDate).toLocaleDateString("en-GB"), // Format: DD/MM/YYYY
    },
    {
      title: "Action",
      key: "action",
      className: "w-[24vw] lg:w-fit",
      render: (record: TaskAssignment) => {
        const content = (
          <div className="flex">
            <p
              className="text-lg cursor-pointer"
              onClick={() =>
                navigate(
                  `/sales-journey-plan/details/${record?.salesPerson?.id}`
                )
              }
            >
              <IoEyeOutline className="text-[#008444]" />
            </p>
            <p onClick={showModal} className="mx-2 text-lg cursor-pointer">
              <FaRegEdit className="text-blue-400" />
            </p>
            <p
              onClick={() => handleDeleteSurvey(record.id)}
              className="text-lg cursor-pointer"
            >
              {isPending && selectedId === record.id ? (
                <Spin />
              ) : (
                <BsTrash3Fill className="text-red-400" />
              )}
            </p>
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

export default SalesJourneyPlanColumns;
