import { Modal, notification, Select } from "antd";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form, Spin } from "antd";
import { CreateModalProps } from "@/lib/types/user";
import "../../index.css";
import { createTeamType } from "@/lib/types/team";
import TeamsService from "@/services/teams/teams.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCreateTeam } from "@/lib/schemas";
import UsersService from "@/services/users/user.service";
import { useState } from "react";
import tokenService from "@/services/token.service";
const AllKpiCreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createTeamType>({
    resolver: zodResolver(schemaCreateTeam),
  });

  const { useHandleCreateTeamService } = TeamsService();
  const { mutate, isPending } = useHandleCreateTeamService(reset, onClose);

  const onError = (errors: FieldErrors<createTeamType>) => {
    const allRequired = Object.values(errors).every(
      (error) => error?.message === "Required"
    );

    if (allRequired) {
      notification.error({
        message: "Failed",
        description: "All fields are required",
        placement: "topRight",
      });
    }
  };
  const { useFetchAllOperationUnitIds } = UsersService();
  const { useFetchAllSegments } = TeamsService();
  const { data: segmentsData } = useFetchAllSegments(50, 1);
  const { data: positingUnitsData } = useFetchAllOperationUnitIds(50, 1);
  const filteredOperatingUnitDat = positingUnitsData?.data.map(
    ({ id, name }) => ({
      id,
      name,
    })
  );
  const getUserData = tokenService.getUser()?.operatingUnitIds; // IDs as string
  const filteredOperatingUnitData = filteredOperatingUnitDat?.filter((user) =>
    getUserData?.includes(user?.id?.toString())
  );

  const [selectedId, setSelectedId] = useState<number | undefined>(undefined); // Single ID store karne ke liye
  const [bussinessSegment, setBussinessSegment] = useState<string | undefined>(
    undefined
  ); // Single ID store karne ke liye
  const [selectedreportingManager, setselectedreportingManager] = useState<
    number | undefined
  >(undefined); // Single ID store karne ke liye

  const handleChangeOperatingUnit = (value: number) => {
    setSelectedId(value); // Selected ID ko state mein store karega
  };
  const handleChangeBussinessSegment = (value: string) => {
    setBussinessSegment(value); // Selected ID ko state mein store karega
  };
  const handleChangeReportingManager = (value: number) => {
    setselectedreportingManager(value); // Selected ID ko state mein store karega
  };
  const { useFetchAllCustomerSegments } = UsersService();
  const { data: customerSegmentsData } = useFetchAllCustomerSegments();
  const [selectedCustomerSegmentIds, setSelectedCustomerSegmentIds] = useState<
    string | undefined
  >(undefined);
  const onSubmit: SubmitHandler<createTeamType> = (data) => {
    // if (selectedCustomerSegmentIds) {
    const updatedData = {
      ...data,
      operatingUnitId: selectedId,
      reportingManagerId: selectedreportingManager,
      customerSegment: selectedCustomerSegmentIds,

      businessSegment: bussinessSegment,
    }; // selectedId ko data me inject kiya
    mutate(updatedData);
    // } else {
    //   const updatedData = {
    //     ...data,
    //     operatingUnitId: selectedId,
    //     reportingManagerId: selectedreportingManager,
    //   }; // selectedId ko data me inject kiya
    //   mutate(updatedData);
    // }
  };
  const { useFetchAllUsers } = TeamsService();
  const [limit, setUsersLimit] = useState<number>(12);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const excludePositions = true;
  const { data: userData, isFetching: isUserDataLoading } = useFetchAllUsers(
    limit,
    page,
    excludePositions
  );

  console.log("segmentsData", segmentsData);
  const handleChange = (value: string) => {
    setSelectedCustomerSegmentIds(value); // Sirf IDs store ho rahi hain
  };

  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-32"
      title={`Filters`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="businessunit"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={errors?.operatingUnitIds ? "error" : ""}
                  help={errors?.operatingUnitIds?.message}
                >
                  <label
                    htmlFor="businessunit"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Business Segment
                  </label>

                  <Select
                    id="businessunit"
                    {...field}
                    placeholder="Select an bussiness segment"
                    className="w-full mt-[3px] custom-select"
                    onChange={handleChangeBussinessSegment}
                    value={selectedId}
                  >
                    <Select.Option value="wire_cable">
                      Wire & Cable
                    </Select.Option>
                    <Select.Option value="wire_accessories">
                      Wire & Accessories
                    </Select.Option>
                  </Select>
                </Form.Item>
              )}
            />
            <Controller
              name="operatingUnitIds"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={errors?.operatingUnitIds ? "error" : ""}
                  help={errors?.operatingUnitIds?.message}
                >
                  <label
                    htmlFor="operatingUnitIds"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Operating Units
                  </label>

                  <Select
                    id="operatingUnitIds"
                    {...field}
                    placeholder="Select a operating unit"
                    className="w-full mt-[3px]  custom-select"
                    onChange={handleChangeOperatingUnit}
                    value={selectedId} // Taake selected value show ho
                  >
                    {filteredOperatingUnitData?.map((role) => (
                      <Select.Option key={role.id} value={role.id}>
                        {role.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </div>
          <div className="flex justify-between">
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={errors?.operatingUnitIds ? "error" : ""}
                  help={errors?.operatingUnitIds?.message}
                >
                  <label
                    htmlFor="region"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Regions
                  </label>

                  <Select
                    id="region"
                    {...field}
                    placeholder="Select an region"
                    className="w-full mt-[3px] custom-select"
                    onChange={handleChangeBussinessSegment}
                    value={bussinessSegment}
                  >
                    <Select.Option value="South">South</Select.Option>
                    <Select.Option value="North">North</Select.Option>{" "}
                    <Select.Option value="East">East</Select.Option>{" "}
                    <Select.Option value="West">West</Select.Option>
                  </Select>
                </Form.Item>
              )}
            />
            <Controller
              name="customerSegment"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors?.operatingUnitIds ? "error" : ""}
                  // help={errors?.operatingUnitIds?.message}
                >
                  <label
                    htmlFor="customerSegment"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    customer Segments
                  </label>

                  <Select
                    id="customerSegment"
                    {...field}
                    placeholder="Select customer segments"
                    className="w-full mt-[3px]  custom-select"
                    onChange={handleChange}
                    value={selectedCustomerSegmentIds} // Taake selected value show ho
                  >
                    {customerSegmentsData?.data?.map((role) => (
                      <Select.Option key={role?.id} value={role?.name}>
                        {role?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />{" "}
          </div>
          {/* <div className="flex justify-between w-full flex-col lg:flex-row items-center">
            <div className="flex justify-center w-full lg:w-[60%]  mx-auto">
              <button
                type="submit"
                className="h-[42px] font-manrope  w-full  border-[1px] border-[#FF8548] bg-[#FF8548] text-white  rounded-md text-sm"
              >
                {isPending ? (
                  <Spin className="custom-spinner rounded-lg p-1" />
                ) : (
                  "Add Team"
                )}
              </button>
            </div>
          </div> */}
        </div>
      </form>
    </Modal>
  );
};

export default AllKpiCreateModal;
