import React from "react";

interface Field {
  label: string;
  value: string;
}

interface OrderDetailsCardProps {
  ordetailscardsname: string;
  fields: Field[];
}

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({
  ordetailscardsname,
  fields,
}) => {
  return (
    <div className="bg-white px-[18px] py-[14px] rounded-lg   md:w-[100%] xmd:px-3 xmd:py-3">
      <h2 className="text-lg font-semibold mb-2 md:mb-1 md:text-lg xmd:mb-2 ">
        {ordetailscardsname}
      </h2>
      {fields.map((field, index) => (
        <div
          key={index}
          className="mb-1 flex justify-between w-full  text-[13px]"
        >
          <p className="w-[40%]">{field.label}</p>
          <p className="w-[55%]">{field.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsCard;
