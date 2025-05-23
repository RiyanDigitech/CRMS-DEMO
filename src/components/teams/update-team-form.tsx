import React, { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Select, Form, Spin, Input } from "antd";
import "../../index.css";
import { ApiTeamResponse, createTeamType } from "@/lib/types/team";
import TeamsService from "@/services/teams/teams.service";
import { useParams } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import tokenService from "@/services/token.service";

interface UpdateTeamFormProps {
  selectedTeamData?: ApiTeamResponse;
}

const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({
  selectedTeamData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<createTeamType>({});
  const { id: idString } = useParams();
  const id = idString ? parseInt(idString, 10) : undefined;
  const [type, setSelectedType] = useState("Sales");

  const { useHandleUpdateTeamsService, useFetchAllUsers } = TeamsService();
  const { mutate, isPending: isUserUpdatePending } =
    useHandleUpdateTeamsService(reset, id);

  const onSubmit: SubmitHandler<createTeamType> = (data) => {
    // Ensure operatingUnitId is sent as a number
    const updatedData = {
      ...data,
      operatingUnitId: Number(data.operatingUnitId), // Convert to number before submitting
    };
    mutate(updatedData);
  };

  const onError = (errors: FieldErrors<createTeamType>) => {
    console.log("errors", errors);
  };

  const { useFetchAllOperationUnitIds, useFetchAllCustomerSegments } =
    UsersService();
  const { data: customerSegmentsData } = useFetchAllCustomerSegments();

  const { data: positingUnitsData } = useFetchAllOperationUnitIds(50, 1);

  const [datas, setDatas] = useState<any[]>([]);
  const [limit, setUsersLimit] = useState<number>(12);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const excludePositions = true;
  const filteredOperatingUnitDat = positingUnitsData?.data.map(
    ({ id, name }) => ({
      id,
      name,
    })
  );
  const { data: userData, isFetching: isUserDataLoading } = useFetchAllUsers(
    limit,
    page,
    excludePositions
  );

  useEffect(() => {
    if (selectedTeamData) {
      const getUserData = tokenService.getUser()?.operatingUnitIds as string[];

      const filteredOperatingUnitData = filteredOperatingUnitDat?.filter(
        (user) => getUserData?.includes(user?.id?.toString())
      );

      console.log("selectedTeamData", selectedTeamData);
      setSelectedType(
        selectedTeamData?.data?.reportingManager?.firstName +
          selectedTeamData?.data?.reportingManager?.lastName
      );
      reset({
        name: selectedTeamData.data?.name || "",
        operatingUnitId: selectedTeamData.data?.operatingUnitId || "", // Use id instead of name, assuming id is a number
        customerSegment: selectedTeamData?.data?.customerSegment || "",
        reportingManagerId: selectedTeamData?.data?.reportingManagerId || "",
        // selectedTeamData?.data?.reportingManagerId ||  "",
        // type: selectedTeamData?.data?.type || "",
      });
      setDatas(filteredOperatingUnitData);
    }
  }, [selectedTeamData, reset]);
  const KpiTypes = ["Sales", "Project"];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="">
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] border-[#EBF0ED] px-4 pt-4 pb-4 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Team name is required" }}
              render={({ field }) => (
                <Form.Item
                  className="w-full sm:w-full lg:w-[48%] mb-6"
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
                    placeholder="Enter team name"
                    className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="operatingUnitId"
              control={control}
              rules={{ required: "operatingUnitId is required" }}
              render={({ field }) => (
                <div className="w-full lg:w-[48%] mb-6">
                  <label className="text-[14px] text-[#6B6B6B] font-manrope font-semibold  leading-[1.125rem]">
                    Operating Units
                  </label>
                  <Select
                    {...field}
                    id="operatingUnitId"
                    placeholder="Select operatingUnitId"
                    className="custom-select h-[38px] w-full mt-1"
                    options={datas?.map((data) => ({
                      label: data?.name,
                      value: data?.id, // This is already a number
                    }))}
                    onChange={(value) => field.onChange(value)} // Ensure the value is passed as is (number)
                  />
                </div>
              )}
            />
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row">
            <Controller
              name="customerSegment"
              control={control}
              rules={{ required: "customerSegment is required" }}
              render={({ field }) => (
                <div className="w-full lg:w-[48%] mb-6">
                  <label className="text-[14px] text-[#6B6B6B] font-manrope font-semibold  leading-[1.125rem]">
                    customer Segment
                  </label>
                  <Select
                    {...field}
                    id="customerSegment"
                    placeholder="Select customerSegment"
                    className="custom-select h-[38px] w-full mt-1"
                    options={customerSegmentsData?.data?.map((data) => ({
                      label: data?.name,
                      value: data?.name,
                    }))}
                  />
                </div>
              )}
            />
            <Controller
              name="reportingManagerId"
              control={control}
              rules={{ required: "reportingManagerId is required" }}
              render={({ field }) => (
                <div className="w-full lg:w-[48%] mb-6">
                  <label className="text-[14px] text-[#6B6B6B] font-manrope font-semibold  leading-[1.125rem]">
                    Reporting Manager
                  </label>
                  <Select
                    {...field}
                    id="reportingManagerId"
                    placeholder="Select reportingManagerId"
                    className="custom-select h-[38px] w-full mt-1"
                    value={type || field.value} // Use field.value directly for controlled form
                    onChange={(value) => {
                      field.onChange(value); // Update form state with selected ID
                      setSelectedType(""); // Reset the type state to empty string
                    }}
                    // value={type || field.value} // This will be the ID (e.g., 183)
                    // onChange={(value) => field.onChange(value)} // Update form state with selected ID
                    // value={type}
                    // onChange={(e) => setSelectedType(e.target.value)}
                    options={userData?.data?.map((data) => ({
                      label: data.firstName + data.lastName,
                      value: data?.id,
                    }))}
                  />
                </div>
              )}
            />
          </div>
          {/* <div className="flex justify-between w-full flex-col lg:flex-row"> */}{" "}
          {/* <Controller
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
                    // onChange={handleChangeKpiTypes}
                  >
                    {KpiTypes?.map((role, ind) => (
                      <Option key={ind} value={role}>
                        {role}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            /> */}
          {/* </div> */}
          <div className="flex justify-center mt-4 mb-1">
            <button
              type="submit"
              disabled={!isDirty}
              className={`font-manrope shadow-sm w-full sm:w-3/12 lg:w-2/12 border-[1px] py-2 rounded-md text-sm ${
                !isDirty
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-[#FF8548] bg-[#FF8548] text-white hover:bg-[#fa913a] "
              }`}
            >
              {isUserUpdatePending ? (
                <Spin className="custom-spinner rounded-lg p-1" />
              ) : (
                "Update Team"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTeamForm;
