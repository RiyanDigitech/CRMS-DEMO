import { useState } from "react";
import { Popover, Spin } from "antd";
import type { TableColumnsType } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import OrdersService from "@/services/order/orders.services";
import { Order } from "@/lib/types/sales-orders";
const OrderManagementDetailsColumns = (): TableColumnsType<Order> => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const { useHandleDeleteOrder } = OrdersService();
  const { mutate: deleteOrder, isPending } = useHandleDeleteOrder(selectedId);

  const handleDeleteSurvey = (id: number) => {
    setSelectedId(id);
    deleteOrder();
  };
  return [
    {
      title: <span className="text-sm">Id</span>,
      dataIndex: "id",
      key: "id",
      width: "12%",
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Total Amount
        </span>
      ),
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: "15%",
      // sorter: {
      //   compare: (a, b) => a.customer.localeCompare(b.customer),
      //   multiple: 3,
      // },
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Estimated Tax
        </span>
      ),
      dataIndex: "estimatedTax",
      key: "estimatedTax",
      width: "12%",
      // ellipsis: true,
      // sorter: {
      //   compare: (a, b) => a.amount - b.amount,
      //   multiple: 2,
      // },
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Discount
        </span>
      ),
      dataIndex: "discount",
      key: "discount",
      width: "13%",
      // sorter: {
      //   compare: (a, b) => a.paymentmethod.localeCompare(b.paymentmethod),
      //   multiple: 1,
      // },
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Shipping Charge
        </span>
      ),
      dataIndex: "shippingCharge",
      key: "shippingCharge",
      width: "15%",
      // sorter: {
      //   compare: (a, b) =>
      //     new Date(a.orderdate).getTime() - new Date(b.orderdate).getTime(),
      //   multiple: 1,
      // },
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Shipping Method
        </span>
      ),
      dataIndex: "shippingMethod",
      key: "shippingMethod",
      width: "15%",
      // sorter: {
      //   compare: (a, b) =>
      //     new Date(a.orderdate).getTime() - new Date(b.orderdate).getTime(),
      //   multiple: 1,
      // },
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Customer
        </span>
      ),
      dataIndex: "customer",
      key: "customer",
      width: "10%",
      render: (_, record) => (
        <div className="flex items-center justify-around w-fit py-[1px] px-2 sm:w-fit lg:w-fit   rounded-full   lg:px-2 ">
          {record?.customer?.firstName} {record?.customer?.lastName}
        </div>
      ),
    },
    {
      title: (
        <span style={{ whiteSpace: "nowrap" }} className="text-sm">
          Status
        </span>
      ),
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <div className="flex items-center justify-around w-fit py-[1px] px-2 sm:w-fit lg:w-fit  bg-gray-100  rounded-full border border-gray-300  lg:px-2 ">
          <div
            className={`h-3 w-3 rounded-full  ${
              status === "Deleted" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></div>
          <span className="text-black mx-2  ">
            {status === "Deleted" ? "Inactive" : "Active"}
          </span>
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      className: "w-[24vw] lg:w-fit text-sm",
      render: (record) => {
        const content = (
          <div className="flex">
            <p
              onClick={() => {
                navigate(`/orders-details/${record.id}`);
              }}
              className=" mx-2 text-lg cursor-pointer"
            >
              {" "}
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
  ];
};

export default OrderManagementDetailsColumns;
