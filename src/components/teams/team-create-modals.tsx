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
const TeamCreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
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
  const [selectedreportingManager, setselectedreportingManager] = useState<
    number | undefined
  >(undefined); // Single ID store karne ke liye

  const handleChangeOperatingUnit = (value: number) => {
    setSelectedId(value); // Selected ID ko state mein store karega
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
      // type: selectedKpiType,
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
  const [limit, setUsersLimit] = useState<number>(100000000);
  const [page, setUsersCurrentPage] = useState<number>(1);
  // const [selectedKpiType, setSelectedKpiTypes] = useState<string | undefined>(
  //   undefined
  // );
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
  const KpiTypes = ["Sales", "Project"];
  const handleChangeKpiTypes = (selectedIds: string) => {
    // setSelectedKpiTypes(selectedIds); // Sirf IDs store ho rahi hain
  };
  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl Create-users-modal top-40 lg:top-32"
      title={`Add Team`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] px-3 pt-3 pb-3 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row ">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  validateStatus={errors.name ? "error" : ""}
                  help={errors.name?.message}
                >
                  <label
                    htmlFor="teamname"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
                  >
                    Team Name
                  </label>
                  <Input
                    {...field}
                    id="teamname"
                    placeholder="Enter Team name"
                    className="h-[38px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />{" "}
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
                    className="w-full mt-[3px]  h-[38px]"
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
            {/* <Controller
              name="reportingManager"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-5"
                  // validateStatus={errors?.operatingUnitIds ? "error" : ""}
                  // help={errors?.operatingUnitIds?.message}
                >
                  <label
                    htmlFor="reportingManager"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Reporting Managers
                  </label>

                  <Select
                    id="reportingManager"
                    {...field}
                    placeholder="Select reporting manager"
                    className="w-full mt-[3px]  custom-select"
                    onChange={handleChangeReportingManager}
                    value={selectedreportingManager} // Taake selected value show ho
                  >
                    {userData?.data?.map((role) => (
                      <Select.Option key={role.id} value={role.id}>
                        {role.firstName} {role.lastName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />{" "} */}
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
                    placeholder="Select reporting manager"
                    className="w-full mt-[3px]  h-[38px]"
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
          </div>{" "}
          {/* <div className="flex justify-between w-full flex-col lg:flex-row mb-5">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-2"
                  // validateStatus={errors?.customerSegmentIds ? "error" : ""}
                  // help={errors?.customerSegmentIds?.message}
                >
                  <label
                    htmlFor="operatingunit"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Type
                  </label>

                  <Select
                    {...field}
                    id="type"
                    placeholder="Type"
                    // mode="multiple"
                    className=" w-full mt-[3px]  custom-select"
                    onChange={handleChangeKpiTypes}
                  >
                    {KpiTypes?.map((role, ind) => (
                      <Select.Option key={ind} value={role}>
                        {role}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </div>{" "} */}
          <div className="flex justify-between w-full flex-col lg:flex-row items-center">
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
          </div>{" "}
        </div>
      </form>
    </Modal>
  );
};

export default TeamCreateModal;
