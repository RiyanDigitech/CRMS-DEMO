import { Popover, Spin, TableColumnsType } from "antd";
import "../../../index.css";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Survey } from "@/lib/types/survey";
import { useState } from "react";
import SurveysService from "@/services/survey/survey.services";
import { IoEyeOutline } from "react-icons/io5";

const SurveyDetailsColumns = (): TableColumnsType<Survey> => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const { useFetchDeletedSurvey } = SurveysService();
  const { mutate, isPending } = useFetchDeletedSurvey(selectedId);
  const handleDeleteSurvey = (id: number) => {
    setSelectedId(id);
    mutate();
  };
  const navigate = useNavigate();
  return [
    {
      title: "Survey Id",
      className: "w-[20vh] lg:w-[7vw]",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Survey Name",
      className: "w-[20vh] lg:w-fit",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      className: "w-[20vh] lg:w-fit",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: " Start Date",
      className: "w-[20vh] lg:w-fit",
      dataIndex: "startDate",
      key: "startDate",
      responsive: ["lg"], // Only show on large screens and above
    },
    {
      title: " End Date",
      className: "w-[20vh] lg:w-fit",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Version",
      className: "w-[20vh] lg:w-[7vw]",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Action",
      key: "action",
      className: "w-[24vw] lg:w-fit",
      render: (record) => {
        const content = (
          <div className="flex">
            <p
              className="text-lg cursor-pointer "
              onClick={() => {
                navigate(`/survey-response-stats/${record.id}`);
              }}
            >
              <IoEyeOutline className="text-[#008444]" />
            </p>
            <p
              onClick={() => {
                navigate(`/survey-details/${record.id}`);
              }}
              className=" mx-2 text-lg cursor-pointer"
            >
              <FaRegEdit className="text-blue-400" />
            </p>
            <p
              onClick={() => {
                handleDeleteSurvey(record.id);
              }}
              className="text-lg cursor-pointer"
            >
              {isPending ? (
                <>
                  <Spin />
                </>
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
    // {
    //   title: "Response",
    //   className: "w-[20vh] lg:w-fit",
    //   key: "action",
    //   render: (record) => (
    //     <>
    //       <div>
    //         <button
    //           onClick={() => {
    //             navigate(`/survey/${record.id}/create-survey-response`);
    //           }}
    //           className=" p-2 text-[#008444] rounded-lg border-[1px] border-[#008444] hover:bg-[#008444] hover:text-white"
    //         >
    //           Send
    //         </button>
    //       </div>
    //     </>
    //   ),
    // },
  ];
};
export default SurveyDetailsColumns;
