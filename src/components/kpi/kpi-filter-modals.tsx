import { Modal, Select } from "antd";
import "../../index.css";

const KpiFiltersModal: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  setUsersSelectedroleId,
}) => {
  const handleStatusChange = (value: string) => {
    // `value` is the id of the selected option
    console.log("Selected Role ID:", value);
    setUsersSelectedroleId(value); // Set the selected role ID in the state
    onClose(); // Close the modal after selection
  };

  console.log("data from user filter", data);
  const typeData = ["Sales", "Project"];
  const CustomerSegments = ["Export", "Projects"];
  const OperatingUnit = ["Faisalabad-OU", "Head Office/Plant-OU", "Quetta-OU"];
  const Regions = ["South", "North", "East"];
  const Kpis = ["Sales Trade", "DSO", "Active Dealer", "CM"];

  return (
    <Modal
      footer={null}
      title=" Filters"
      open={isOpen}
      onCancel={onClose}
      className=" lg:top-55"
    >
      <div className="w-full flex justify-between">
        <div className="w-[45%] ">
          <Select
            placeholder="Select Type"
            className="my-3 w-full"
            // style={{ width: 300 }}
            onChange={handleStatusChange} // Function to run on selection
          >
            {typeData?.map((role, ind) => (
              <Select.Option key={ind} value={role}>
                {role} {/* Display the role title */}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="w-[45%]">
          <Select
            placeholder="Select Customer Segment"
            className="my-3 w-full"
            // style={{ width: 300 }}
            onChange={handleStatusChange} // Function to run on selection
          >
            {CustomerSegments?.map((role, ind) => (
              <Select.Option key={ind} value={role}>
                {role} {/* Display the role title */}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>{" "}
      <div className="w-full flex justify-between">
        <div className="w-[45%]">
          <Select
            placeholder="Select Operating unit"
            className="my-3 w-full"
            // style={{ width: 300 }}
            onChange={handleStatusChange} // Function to run on selection
          >
            {OperatingUnit?.map((role, ind) => (
              <Select.Option key={ind} value={role}>
                {role} {/* Display the role title */}
              </Select.Option>
            ))}
          </Select>
        </div>{" "}
        <div className="w-[45%]">
          <Select
            placeholder="Select Region"
            className="my-3 w-full"
            // style={{ width: 300 }}
            onChange={handleStatusChange} // Function to run on selection
          >
            {Regions?.map((role, ind) => (
              <Select.Option key={ind} value={role}>
                {role} {/* Display the role title */}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>{" "}
      <div className="w-[45%]">
        <Select
          placeholder="Select Kpi"
          className="my-3 w-full"
          // style={{ width: 300 }}
          onChange={handleStatusChange} // Function to run on selection
        >
          {Kpis?.map((role, ind) => (
            <Select.Option key={ind} value={role}>
              {role} {/* Display the role title */}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default KpiFiltersModal;
