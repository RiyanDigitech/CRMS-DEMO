// import { Popover, Spin, TableColumnsType } from "antd";
// import { UpdateUserType } from "@/lib/types/user";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UsersService from "@/services/users/user.service";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { KpiApiResponse } from "@/lib/types/kpi";
// import KpiUpdateModal from "@/components/kpi/kpi-update-modals";
// import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
// import { IoEyeOutline } from "react-icons/io5";
// import { FaRegEdit } from "react-icons/fa";
// const KpiManagementDetailsColumns = (): TableColumnsType<KpiApiResponse> => {
//   const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
//   const [selectedId, setselectedId] = useState<number | undefined>(undefined);
//   const [editData, setEditData] = useState();

//   const toggleExpand = (userId: number) => {
//     setExpandedRowId((prev) => (prev === userId ? null : userId));
//   };
//   const { useHandleDeleteUserService } = UsersService();
//   const { handleSubmit, reset } = useForm<UpdateUserType>();
//   const { mutate, isPending } = useHandleDeleteUserService(reset, selectedId);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };
//   const navigate = useNavigate();
//   const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
//     if (!selectedId) {
//       return;
//     }
//     mutate();
//   };
//   const ShowModal = (record: any) => {
//     setIsModalOpen(true);
//     setEditData(record);
//     // console.log("record", record);
//   };
//   return [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       render: (id) => `${id}`,
//       className: " lg:w-[5vw]",
//     },
//     {
//       title: "Name",
//       className: " w-fit",

//       dataIndex: "salesPerson",
//       key: "salesPerson",
//       render: (salesPerson) => (
//         <div className="w-fit">
//           {salesPerson?.firstName}
//           {" " + salesPerson?.lastName}
//         </div>
//       ),
//     },
//     {
//       title: "Email",
//       className: " w-fit",
//       dataIndex: "salesPerson",
//       key: "salesPerson",
//       render: (salesPerson) => (
//         <div className="w-fit">{salesPerson?.email}</div>
//       ),
//     },
//     {
//       title: "Start Date",
//       dataIndex: "startDate",
//       key: "startDate",
//       render: (startDate) => `${startDate?.slice(0, 10)}`,
//     },
//     {
//       title: "End Date",
//       dataIndex: "endDate",
//       key: "endDate",
//       render: (endDate) => `${endDate?.slice(0, 10)}`,
//     },
//     {
//       title: "kpiRating",
//       dataIndex: "kpiRating",
//       key: "kpiRating",
//       render: (kpiRating) => `${Number(kpiRating).toFixed(2)}`,
//     },
//     {
//       title: "Action",
//       key: "action",
//       className: "w-[24vw] lg:w-fit",
//       render: (record) => {
//         const content = (
//           <div className="flex items-center">
//             <p
//               className="text-lg cursor-pointer "
//               onClick={() => navigate(`/kpi-details/${record.id}`)}
//             >
//               <IoEyeOutline className="text-[#008444]" />
//             </p>
//             {
//               <KpiUpdateModal
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 editData={editData}
//               />
//             }
//             <p
//               onClick={() => ShowModal(record)}
//               className=" mx-2 text-lg cursor-pointer"
//             >
//               <FaRegEdit className="text-blue-400" />
//             </p>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setselectedId(record.id);
//                 handleSubmit(onSubmit)();
//               }}
//               className="cursor-pointer"
//             >
//               <button
//                 type="submit"
//                 className="text-gray-600  flex items-center"
//               >
//                 {isPending ? (
//                   <Spin />
//                 ) : (
//                   <>
//                     {" "}
//                     <BsTrash3Fill className="text-red-400 text-lg" />
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         );
//         return (
//           <Popover placement="right" content={content}>
//             <BsThreeDotsVertical style={{ cursor: "pointer" }} />
//           </Popover>
//         );
//       },
//     },
//   ];
// };

// export default KpiManagementDetailsColumns;
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

const KpiNationalSalesManagerManagementDetailsColumns =
  (): TableColumnsType<KpiApiResponse> => {
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
        title: "Manager Name",
        className: "w-fit",
        dataIndex: "salesPerson",
        key: "salesPerson",
        render: (salesPerson) => (
          <div className="w-fit">
            {salesPerson?.firstName
              ? `${salesPerson.firstName} ${salesPerson.lastName || ""}`
              : "-"}
          </div>
        ),
      },
      {
        title: "KPI-Type",
        dataIndex: "kpiname",
        key: "kpiname",
        render: (kpiname) => kpiname || "Sales",
      },
      {
        title: "Region",
        dataIndex: "region",
        key: "region",
        render: (region) => region || "South",
      },
      // {
      //   title: "Email",
      //   className: "w-fit",
      //   dataIndex: "salesPerson",
      //   key: "salesPerson",
      //   render: (salesPerson) => (
      //     <div className="w-fit">{salesPerson?.email || "-"}</div>
      //   ),
      // },
      // {
      //   title: "Start Date",
      //   dataIndex: "startDate",
      //   key: "startDate",
      //   render: (startDate) => (startDate ? startDate.slice(0, 10) : "-"),
      // },

      // {
      //   title: "End Date",
      //   dataIndex: "endDate",
      //   key: "endDate",
      //   render: (endDate) => (endDate ? endDate.slice(0, 10) : "-"),
      // },
      {
        title: "Customer-Segment",
        dataIndex: "customerSegments",
        key: "customerSegments",
        render: (customerSegments) => customerSegments || "-",
      },
      {
        title: "Operating-Unit",
        dataIndex: "operatingUnit",
        key: "operatingUnit",
        render: (operatingUnit: any) => operatingUnit?.name || "-",
      },
      {
        title: "KPI Rating",
        dataIndex: "kpiRating",
        key: "kpiRating",
        render: (kpiRating) =>
          kpiRating !== undefined && kpiRating !== null
            ? Number(kpiRating).toFixed(2)
            : "-",
      },
      // {
      //   title: "Type",
      //   dataIndex: "type",
      //   key: "type",
      //   render: (type) => type || "-",
      // },
      // {
      //   title: "Report",
      //   dataIndex: "report",
      //   key: "report",
      //   render: () => (
      //     <>
      //       <div>
      //         <button
      //           className="bg-[#008444] p-2 rounded-lg hover:bg-green-800 text-white"
      //           onClick={() => navigate(`/kpi-report/${164}`)}
      //         >
      //           Report
      //         </button>
      //       </div>
      //     </>
      //   ),
      // },
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
                  navigate(`/KPI-national-sales-manager-details/${record.id}`)
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
              onClick={() => ShowModal(record)}
              className="mx-2 text-lg cursor-pointer"
            >
              <FaRegEdit className="text-blue-400" />
            </p> */}
              {/* <form
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
            </form> */}
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

export default KpiNationalSalesManagerManagementDetailsColumns;

// import { Popover, Spin, TableColumnsType } from "antd";
// import { UpdateUserType } from "@/lib/types/user";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UsersService from "@/services/users/user.service";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { KpiApiResponse } from "@/lib/types/kpi";
// import KpiUpdateModal from "@/components/kpi/kpi-update-modals";
// import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
// import { IoEyeOutline } from "react-icons/io5";
// import { FaRegEdit } from "react-icons/fa";
// import { CiCircleInfo } from "react-icons/ci";

// const KpiManagementDetailsColumns = (): TableColumnsType<any> => {
//   const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
//   const [selectedId, setselectedId] = useState<number | undefined>(undefined);
//   const [editData, setEditData] = useState();

//   const toggleExpand = (userId: number) => {
//     setExpandedRowId((prev) => (prev === userId ? null : userId));
//   };

//   const { useHandleDeleteUserService } = UsersService();
//   const { handleSubmit, reset } = useForm<UpdateUserType>();
//   const { mutate, isPending } = useHandleDeleteUserService(reset, selectedId);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const navigate = useNavigate();

//   const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
//     if (!selectedId) {
//       return;
//     }
//     mutate();
//   };

//   const ShowModal = (record: any) => {
//     setIsModalOpen(true);
//     setEditData(record);
//   };
//   console.log("editData", editData);
//   return [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       render: (id) => `${id}`,
//       className: "lg:w-[5vw]",
//     },
//     // {
//     //   title: "Person Name",
//     //   className: "w-fit",
//     //   dataIndex: "salesperson",
//     //   key: "salesperson",
//     //   render: (salesperson) => (
//     //     <div className="w-fit">{salesperson || "-"}</div>
//     //   ),
//     // },
//     {
//       title: "Manager",
//       className: "w-fit",
//       dataIndex: "manager",
//       key: "manager",
//       render: (manager) => <div className="w-fit">{manager || "-"}</div>,
//     },
//     // {
//     //   title: "Email",
//     //   className: "w-fit",
//     //   dataIndex: "salesPerson",
//     //   key: "salesPerson",
//     //   render: (salesPerson) => (
//     //     <div className="w-fit">{salesPerson?.email || "-"}</div>
//     //   ),
//     // },
//     {
//       title: "kpi",
//       dataIndex: "kpi",
//       key: "kpi",
//       render: (kpi) => <div className="w-fit">{kpi || "-"}</div>,
//     },

//     {
//       title: "Target",
//       dataIndex: "target",
//       key: "target",
//       render: (target) => <div className="w-fit">{target || "-"}</div>,
//     },
//     {
//       title: "Actual",
//       dataIndex: "actual",
//       key: "actual",
//       render: (actual) => actual || "-",
//     },
//     {
//       title: "Score",
//       dataIndex: "score",
//       key: "score",
//       render: (score: any) => score || "-",
//     },
//     {
//       title: "Weight",
//       dataIndex: "weight",
//       key: "weight",
//       render: (weight: any) => weight || "-",
//     },
//     {
//       title: "Rating",
//       dataIndex: "rating",
//       key: "rating",
//       render: (rating: any) => rating || "-",
//     },
//     {
//       title: "Action",
//       key: "action",
//       className: "w-[24vw] lg:w-fit",
//       render: (record) => {
//         const content = (
//           <div className="flex items-center">
//             {" "}
//             <p
//               className="text-lg cursor-pointer mr-1"
//               onClick={() => navigate(`/user-kpi-summary-details/${record.id}`)}
//             >
//               <CiCircleInfo className="text-[#f07136]" />
//             </p>
//             <p
//               className="text-lg cursor-pointer"
//               onClick={() => navigate(`/kpi-details/${record.id}`)}
//             >
//               <IoEyeOutline className="text-[#008444]" />
//             </p>
//             <KpiUpdateModal
//               isOpen={isModalOpen}
//               onClose={handleCloseModal}
//               editData={editData}
//             />
//             <p
//               onClick={() => ShowModal(record)}
//               className="mx-2 text-lg cursor-pointer"
//             >
//               <FaRegEdit className="text-blue-400" />
//             </p>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setselectedId(record.id);
//                 handleSubmit(onSubmit)();
//               }}
//               className="cursor-pointer"
//             >
//               <button type="submit" className="text-gray-600 flex items-center">
//                 {isPending ? (
//                   <Spin />
//                 ) : (
//                   <BsTrash3Fill className="text-red-400 text-lg" />
//                 )}
//               </button>
//             </form>
//           </div>
//         );
//         return (
//           <Popover placement="right" content={content}>
//             <BsThreeDotsVertical style={{ cursor: "pointer" }} />
//           </Popover>
//         );
//       },
//     },
//   ];
// };

// export default KpiManagementDetailsColumns;
