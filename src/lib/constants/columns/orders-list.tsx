// import React, { useState } from "react";
// import { Tag, Popover, Spin } from "antd";
// import type { TableColumnsType } from "antd";
// import { FaRegEdit } from "react-icons/fa";
// import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
// import { SalesOrderList } from "@/lib/types/sales-orders";
// import { IoEyeOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// // const items: MenuProps["items"] = [
// //   {
// //     key: "1",
// //     label: (
// //       <span>
// //         <FaRegEdit className="text-blue-400" />
// //       </span>
// //     ),
// //   },
// //   {
// //     key: "2",
// //     label: (
// //       <span>
// //         <BsTrash3Fill className="text-red-400" />
// //       </span>
// //     ),
// //   },
// // ];
// const isPending = false;
// const OrderManagementColumns = (): TableColumnsType<SalesOrderList> => {
//   const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
//   const navigate = useNavigate();
//   const handleDeleteSurvey = (id: number) => {
//     setSelectedId(id);
//     // mutate();
//   };
//   return [
//     {
//       title: <span style={{ whiteSpace: "nowrap" }}>Order Id</span>,
//       dataIndex: "orderid",
//       key: "orderid",
//       width: "12%",
//     },
//     {
//       title: <span style={{ whiteSpace: "nowrap" }}>Customer</span>,
//       dataIndex: "customer",
//       key: "customer",
//       width: "15%",
//       // sorter: {
//       //   compare: (a, b) => a.customer.localeCompare(b.customer),
//       //   multiple: 3,
//       // },
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "amount",
//       width: "12%",
//       // sorter: {
//       //   compare: (a, b) => a.amount - b.amount,
//       //   multiple: 2,
//       // },
//     },
//     {
//       title: <span style={{ whiteSpace: "nowrap" }}>Payment Method</span>,
//       dataIndex: "paymentmethod",
//       key: "paymentmethod",
//       width: "17%",
//       // sorter: {
//       //   compare: (a, b) => a.paymentmethod.localeCompare(b.paymentmethod),
//       //   multiple: 1,
//       // },
//     },
//     {
//       title: <span style={{ whiteSpace: "nowrap" }}>Order Date</span>,
//       dataIndex: "orderdate",
//       key: "orderdate",
//       width: "15%",
//       // sorter: {
//       //   compare: (a, b) =>
//       //     new Date(a.orderdate).getTime() - new Date(b.orderdate).getTime(),
//       //   multiple: 1,
//       // },
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: "10%",
//       render: (status) => {
//         let color = "";
//         if (status === "New") {
//           color = "blue";
//         } else if (status === "Completed") {
//           color = "green";
//         } else if (status === "Cancelled") {
//           color = "volcano";
//         } else if (status === "In Progress") {
//           color = "orange";
//         }
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     {
//       title: "Action",
//       key: "action",
//       className: "w-[24vw] lg:w-fit",
//       render: (record) => {
//         const content = (
//           <div className="flex">
//             <p
//               className="text-lg cursor-pointer "
//               onClick={() => {
//                 navigate(`/survey/response-stats/${record.id}`);
//               }}
//             >
//               <IoEyeOutline className="text-[#008444]" />
//             </p>
//             <p
//               onClick={() => {
//                 navigate(`/survey/${record.id}`);
//               }}
//               className=" mx-2 text-lg cursor-pointer"
//             >
//               {" "}
//               <FaRegEdit className="text-blue-400" />
//             </p>
//             <p
//               onClick={() => {
//                 handleDeleteSurvey(record.id);
//               }}
//               className="text-lg cursor-pointer"
//             >
//               {isPending ? (
//                 <>
//                   <Spin />
//                 </>
//               ) : (
//                 <BsTrash3Fill className="text-red-400" />
//               )}
//             </p>
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

// export default OrderManagementColumns;
