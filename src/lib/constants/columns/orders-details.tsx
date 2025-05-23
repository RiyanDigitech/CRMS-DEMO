import type { TableColumnsType } from "antd";
import { TransformedOrderProduct } from "@/lib/types/sales-orders";
import "../../../index.css";

const OrderDetailsTableColumns =
  (): TableColumnsType<TransformedOrderProduct> => {
    return [
      {
        title: "Product",
        dataIndex: "product",
        key: "product",
        className: "w-[25vw] lg:w-fit text-[12px] text-[#6B6B6B]",
        // ellipsis: true,
        responsive: ["lg"], // Visible on all breakpoints

        render: (text, record) => (
          <div className="flex items-center">
            <img
              className="hidden md:block"
              src={record.image}
              alt="product"
              style={{ width: 40, marginRight: 10 }}
            />
            <div>
              <div className="text-[#18120F] font-semibold text-[12px] mt-1">
                {record?.productCategory}
              </div>
              <div style={{ fontSize: "12px", color: "#6B6B6B" }}>
                Product ID: {record.productId}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
        className: "text-[#18120f] text-sm w-full lg:w-fit font-bold",
      },
      // {
      //   title: "Category",
      //   dataIndex: "productCategory",
      //   key: "productCategory",
      //   className: "text-[#18120f] text-sm w-full lg:w-fit font-bold",
      //   responsive: ["lg"], // Visible on all breakpoints
      // },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        className: "text-[#18120f] text-[12px] w-full lg:w-fit font-bold",
        render: (price) => (
          <div style={{ fontWeight: "bold" }} className="text-sm">
            {price.toFixed(2)}
          </div>
        ),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        className: "text-[#18120f] text-sm w-full lg:w-fit font-bold",
      },
      {
        title: "Total ",
        dataIndex: "total",
        key: "total",
        className: "text-[#18120f] text-sm w-full lg:w-fit xl:w-fit font-bold",
        render: (total) => (
          <div
            style={{ fontWeight: "bold" }}
            className="w-[25vw] lg:w-fit xl:w-fit"
          >
            {total.toFixed(2)}
          </div>
        ),
      },
    ];
  };

export default OrderDetailsTableColumns;
