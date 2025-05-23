import { Modal, Select } from "antd";
import "../../../index.css";
import { OrderFilterModalProps } from "@/lib/types/order";
import { useEffect } from "react";
const OrderFiltersModal: React.FC<OrderFilterModalProps> = ({
  isOpen,
  onClose,
  setSelectedStatus,
  setUsersQuery,
  isEmpty,
}) => {
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setUsersQuery(undefined);
    console.log("Selected Status:", value);
    onClose();
  };

  //   const statusEnum = ["Deleted", "Pending", "Deactivated", "Active"];
  const statusEnum = ["Pending", "Confirmed", "Completed", "Failed"];
  useEffect(() => {
    if (isEmpty) {
      console.log("ok");
    }
  }, [isEmpty]);
  return (
    <Modal
      footer={null}
      title="Customer Filters"
      open={isOpen}
      onCancel={onClose}
      className=" lg:top-55"
    >
      <div>
        <Select
          placeholder="Select Here"
          className="my-3"
          style={{ width: 300 }}
          onChange={handleStatusChange}
        >
          {statusEnum.map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default OrderFiltersModal;
