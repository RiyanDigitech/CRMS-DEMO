import { Modal, Select } from "antd";
import { CreateModalProps } from "@/lib/types/customer";
import "../../index.css";
const StockTakeFiltersModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  setSelectedStatus,
  setUsersQuery,
  setstockStaus,
}) => {
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value); // Save the selected value in state
    setUsersQuery(undefined);
    setstockStaus(value);
    console.log("Selected Status:", value); // Run your function or perform any logic here
    onClose();
  };

  const statusEnum = ["Barcode Scanning", "Manual Counting"];

  return (
    <Modal
      footer={null}
      title="Stock-Take Filters"
      open={isOpen}
      onCancel={onClose}
      className=" lg:top-55"
    >
      <div>
        <Select
          placeholder="Select Here"
          className="my-3"
          style={{ width: 300 }}
          onChange={handleStatusChange} // Function to run on selection
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

export default StockTakeFiltersModal;
