import { Modal, Select } from "antd";
import "../../index.css";
import { FilterModalUser } from "@/lib/types/user";

const UserFiltersModal: React.FC<FilterModalUser> = ({
  isOpen,
  onClose,
  data,
  setUsersSelectedroleId,
}) => {
  const handleStatusChange = (value: number) => {
    // `value` is the id of the selected option
    console.log("Selected Role ID:", value);
    setUsersSelectedroleId(Number(value)); // Set the selected role ID in the state
    onClose(); // Close the modal after selection
  };

  console.log("data from user filter", data);

  return (
    <Modal
      footer={null}
      title=" Filters"
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
          {data?.map((role) => (
            <Select.Option key={role.id} value={role.id}>
              {role.title} {/* Display the role title */}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default UserFiltersModal;
