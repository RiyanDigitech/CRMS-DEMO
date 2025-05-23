import { Modal, Select } from "antd";
import "../../index.css";
import UsersService from "@/services/users/user.service";
import { useEffect, useState } from "react";
const TeamFiltersModal: React.FC<any> = ({
  isOpen,
  onClose,
  setTeamsregion,
  setTeamscustomerSegment,
  setTeamsoperatingUnitName,
  setTeamsbusinessSegment,
}) => {
  const handleStatusChange = (value: string) => {
    // `value` is the id of the selected option
    console.log("Selected Role ID:", value);
    setTeamsoperatingUnitName(value);
    onClose(); // Close the modal after selection
  };
  const handleStatussegmentChange = (value: string) => {
    // `value` is the id of the selected option
    console.log("Selected Role ID:", value);
    setTeamscustomerSegment(value);
    onClose(); // Close the modal after selection
  };
  //   handleStatussegmentChange;
  const handleStatusRegionChange = (value: string) => {
    // `value` is the id of the selected option
    console.log("Selected Role ID:", value);
    setTeamsregion(value);
    onClose(); // Close the modal after selection
  };
  const handleStatusSegmentChange = (value: string) => {
    // `value` is the id of the selected option
    console.log("Selected Role ID:", value);
    setTeamsbusinessSegment(value);
    onClose(); // Close the modal after selection
  };
  const { useFetchAllOperationUnitIds, useFetchAllCustomerSegments } =
    UsersService();
  const { data } = useFetchAllOperationUnitIds();
  const { data: segmentedData } = useFetchAllCustomerSegments();
  const [regions, setRegions] = useState([]);
  const [operatingUnits, setOperatingUnits] = useState([]);
  useEffect(() => {
    if (data?.data) {
      // Extract unique regions
      const uniqueRegions = [
        ...new Set(data.data.map((item) => item?.region.name)),
      ];
      setRegions(uniqueRegions);

      // Extract unique segments

      // Extract operating units with IDs
      const units = data.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setOperatingUnits(units);
    }
  }, [data]);
  const segments = ["Wire & Cable", "Wire Accessories"];
  console.log("segmented getted", segmentedData);
  return (
    <Modal
      footer={null}
      title=" Filters"
      open={isOpen}
      onCancel={onClose}
      className=" lg:top-55"
    >
      <div className="flex  items-center justify-between w-full">
        <Select
          placeholder="Operating unit"
          className="my-3 "
          style={{ width: 300 }}
          onChange={handleStatusChange} // Function to run on selection
        >
          {operatingUnits?.map((role, ind) => (
            <Select.Option key={ind} value={role?.name}>
              {role?.name}
            </Select.Option>
          ))}
        </Select>{" "}
        <Select
          placeholder="region"
          className="my-3  ml-2"
          style={{ width: 300 }}
          onChange={handleStatusRegionChange} // Function to run on selection
        >
          {regions?.map((role, ind) => (
            <Select.Option key={ind} value={role}>
              {role}
            </Select.Option>
          ))}
        </Select>
      </div>{" "}
      <div className="flex  items-center justify-between w-full">
        <Select
          placeholder="customer segment"
          className="my-3 "
          style={{ width: 300 }}
          onChange={handleStatussegmentChange} // Function to run on selection
        >
          {segmentedData?.data?.map((role, ind) => (
            <Select.Option key={ind} value={role?.name}>
              {role?.name}
            </Select.Option>
          ))}
        </Select>{" "}
        <Select
          placeholder="segment"
          className="my-3  ml-2"
          style={{ width: 300 }}
          onChange={handleStatusSegmentChange} // Function to run on selection
        >
          {segments?.map((role, ind) => (
            <Select.Option key={ind} value={role}>
              {role}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default TeamFiltersModal;
