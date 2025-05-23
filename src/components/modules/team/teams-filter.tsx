import { Modal, Select } from "antd";
import "../../../index.css";
import { FilterModalTeam } from "@/lib/types/team";
import { useEffect, useState } from "react";

const TeamsFiltersModal: React.FC<FilterModalTeam> = ({
  isOpen,
  onClose,
  setTeamsCity,
  setTeamsArea,
  setTeamsRegion,
  LocationData,
  isEmpty,
}) => {
  console.log("data from teams filter", LocationData);
  const Regions = LocationData?.data[0].regions.map((region) => region.name);
  const City = LocationData?.data[0]?.city;

  // State for selected values
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
  const [selectedArea, setSelectedArea] = useState<string | undefined>();
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  // State for Areas
  const [areas, setAreas] = useState<string[]>([]);

  // Handlers
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value); // Update local state
    setTeamsRegion(value); // Update region in parent state

    const regionData = LocationData?.data[0].regions.find(
      (region) => region.name === value
    );
    setAreas(regionData ? regionData.areas : []); // Update areas
    onClose();
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value); // Update local state
    setTeamsCity(value); // Update city in parent state
    onClose();
  };

  const handleAreaChange = (value: string) => {
    setSelectedArea(value); // Update local state
    setTeamsArea(value); // Update area in parent state
    onClose();
  };
  useEffect(() => {
    if (isEmpty) {
      setSelectedRegion(undefined);
      setSelectedArea(undefined);
      setSelectedCity(undefined);
      setAreas([]);
    }
  }, [isEmpty]);
  return (
    <Modal
      footer={null}
      title="Team Filters"
      open={isOpen}
      onCancel={onClose}
      className=" lg:top-55"
    >
      <div className="flex justify-between flex-wrap">
        {/* Region Dropdown */}
        <Select
          placeholder="Select Region"
          className="my-3 w-[48%]"
          onChange={handleRegionChange}
          value={selectedRegion} // Bind selected value
        >
          {Regions?.map((region, ind) => (
            <Select.Option key={ind} value={region}>
              {region}
            </Select.Option>
          ))}
        </Select>

        {/* Area Dropdown */}
        <Select
          placeholder="Select Area"
          className="my-3 w-[48%]"
          onChange={handleAreaChange}
          value={selectedArea} // Bind selected value
        >
          {areas.map((area, ind) => (
            <Select.Option key={ind} value={area}>
              {area}
            </Select.Option>
          ))}
        </Select>

        {/* City Dropdown */}
        <Select
          placeholder="Select City"
          className="my-3 w-[48%] mx-auto"
          onChange={handleCityChange}
          value={selectedCity} // Bind selected value
        >
          <Select.Option value={City}>{City}</Select.Option>
        </Select>
      </div>
    </Modal>
  );
};

export default TeamsFiltersModal;
