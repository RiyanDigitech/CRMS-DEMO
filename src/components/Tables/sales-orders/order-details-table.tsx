import React from "react";
import { Table } from "antd";
import OrderDetailsTableColumns from "@/lib/constants/columns/orders-details";
import "../../../index.css";
import {
  TargetOrderItem,
  TransformedOrderProduct,
} from "@/lib/types/sales-orders";

const OrdersDetailsTable: React.FC<{ orderProducts: TargetOrderItem[] }> = ({
  orderProducts,
}) => {
  const transformedOrderProducts = orderProducts?.map((item) => ({
    key: item.id,
    product: item.product.sku,
    productId: item.product.id,
    price: parseFloat(item.unitPrice),
    quantity: item.quantity,
    total: parseFloat(item.unitPrice) * item.quantity,
    brand: item.product.brand,
    productCategory: item.product.productCategory,
    image: "/orders.png",
  }));
  console.log("orderProducts", orderProducts);
  return (
    <div className="order-details-table w-full overflow-auto">
      <Table<TransformedOrderProduct>
        columns={OrderDetailsTableColumns()}
        dataSource={transformedOrderProducts || []}
        pagination={false}
        className="my-[18px] text-[#6b6b6b] border-t-[1px] border-[#ebf0ed] overflow-auto rounded-b-lg md:my-2"
      />
    </div>
  );
};

export default OrdersDetailsTable;
