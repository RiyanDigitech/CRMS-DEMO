import { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form, Spin, Select } from "antd";
import {
  fetchTargetedUsersApiResponse,
  UpdateUserType,
} from "@/lib/types/user";
import { useParams } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import { GetAllRolesTypes, GetRolesTypes } from "@/lib/types/role";

const { Option } = Select;
interface EditUserProfileFormsProps {
  fetchRolesData?: GetAllRolesTypes;
  targeUserData: fetchTargetedUsersApiResponse["data"];
}

const EditUserProfileForms = ({
  targeUserData,
  fetchRolesData,
}: EditUserProfileFormsProps) => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UpdateUserType>();
  const { id: idString } = useParams();
  const id = idString ? parseInt(idString, 10) : undefined;
  const [
    selectedFilteredCustomerSegmentNames,
    setSelectedfilteredCustomerSegmentNames,
  ] = useState<string[]>([]);
  const [
    selectedFilteredOperatingUnitIds,
    setSelectedFilteredOperatingUnitIds,
  ] = useState<string[]>([]);

  const [limit] = useState<number>(19);
  const [page] = useState<number>(1);

  const {
    useHandleUpdateUserService,
    useFetchAllCustomerSegments,
    useFetchAllOperationUnitIds,
    useFetchAllPositions,
  } = UsersService();
  const { mutate, isPending: isUserUpdatePending } = useHandleUpdateUserService(
    reset,
    id
  );
  const { data: CustomerSegmentData } = useFetchAllCustomerSegments();
  const { data: OperatingUnitData } = useFetchAllOperationUnitIds(20, 1);
  const { data: positionsData } = useFetchAllPositions(limit, page);

  const onError = (errors: FieldErrors<UpdateUserType>) => {
    console.error("Form errors:", errors);
  };
  const FilteredCustomerSegmenData = CustomerSegmentData?.data;
  const FilteredOperatingUnitsData = OperatingUnitData?.data;
  useEffect(() => {
    const selectedCustomerSegmentNames = FilteredCustomerSegmenData?.filter(
      (segment) =>
        (targeUserData?.customerSegmentIds ?? [])
          .map(String)
          .includes(segment?.id?.toString())
    ).map((segment) => segment.name);

    setSelectedfilteredCustomerSegmentNames(selectedCustomerSegmentNames || []); //idharslicelagasaktaiho
    const selectedOperatingUnitsNames = FilteredOperatingUnitsData?.filter(
      (segment) =>
        (targeUserData?.operatingUnitIds ?? [])
          .map(String)
          .includes(segment?.id?.toString())
    ).map((segment) => segment.name);

    setSelectedFilteredOperatingUnitIds(selectedOperatingUnitsNames || []); //idharslicelagasaktaiho

    if (targeUserData) {
      reset({
        firstName: targeUserData?.firstName,
        lastName: targeUserData?.lastName,
        roleId: targeUserData?.roleId,
        status: targeUserData?.status,
        positionId: targeUserData?.positionId,
        email: targeUserData?.email,
        resourceId: targeUserData?.resourceId || "-",
      });
    }
  }, [
    targeUserData,
    reset,
    FilteredCustomerSegmenData,
    FilteredOperatingUnitsData,
  ]);

  const handleChange = (selectedIds: string[]) => {
    setSelectedfilteredCustomerSegmentNames(selectedIds);
    setValue("customerSegmentIds", [1], { shouldDirty: true }); // Make form dirty
  };
  const handleOperatingUnitChange = (selectedIds: string[]) => {
    setSelectedFilteredOperatingUnitIds(selectedIds);
    setValue("operatingUnitIds", [2], { shouldDirty: true }); // Make form dirty
  };
  const selectedCustomerSegmentIdsTobeSubmitted = CustomerSegmentData?.data
    .filter((item) => selectedFilteredCustomerSegmentNames.includes(item.name))
    .map((item) => item.id);
  const selectedOperatingUnitIdsIdsTobeSubmitted = OperatingUnitData?.data
    .filter((item) => selectedFilteredOperatingUnitIds.includes(item.name))
    .map((item) => item.id);
  const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
    const payload = {
      ...data,
      ...{
        customerSegmentIds: selectedCustomerSegmentIdsTobeSubmitted,
      },
      ...{
        operatingUnitIds: selectedOperatingUnitIdsIdsTobeSubmitted,
      },
    };
    // mutate(payload);
    mutate(payload, {
      onSuccess: () => {
        reset({
          ...data,
          customerSegmentIds: selectedCustomerSegmentIdsTobeSubmitted,
          operatingUnitIds: selectedOperatingUnitIdsIdsTobeSubmitted,
        });
      },
    });
  };
  const filteredPositionData = positionsData?.data.map(({ name, id }) => ({
    name,
    id,
  }));
  console.log(
    "selectedFilteredOperatingUnitIds",
    selectedFilteredOperatingUnitIds
  );
  return (
    <>
      {isUserUpdatePending ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <>
          {" "}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
            <div className="font-manrope w-full flex flex-col mt-3 border-[1px] p-4 rounded-lg addusermodal">
              <div className="flex justify-between flex-col lg:flex-row w-full">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={targeUserData?.firstName || ""}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[49%] mb-3">
                      <label
                        htmlFor="firstName"
                        className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                      >
                        First Name
                      </label>
                      <Input
                        {...field}
                        id="firstName"
                        placeholder="First Name"
                        className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                      />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[49%] mb-3">
                      <label
                        htmlFor="lastName"
                        className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                      >
                        Last Name
                      </label>
                      <Input
                        {...field}
                        id="lastName"
                        placeholder="Last Name"
                        className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                      />
                    </Form.Item>
                  )}
                />
              </div>{" "}
              <Controller
                name="customerSegmentIds"
                control={control}
                render={({ field }) => (
                  <Form.Item className="w-full  mb-3">
                    <label
                      htmlFor="customerSegmentIds"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Customer Segment
                    </label>

                    <Select
                      {...field}
                      id="customerSegmentIds"
                      placeholder="Select a position"
                      value={selectedFilteredCustomerSegmentNames}
                      mode="multiple"
                      className=" w-full mt-[3px] overflow-auto custom-select"
                      onChange={handleChange}
                    >
                      {CustomerSegmentData?.data?.map((role) => (
                        <Option key={role?.id} value={role?.name}>
                          {role?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />
              <Controller
                name="operatingUnitIds"
                control={control}
                render={({ field }) => (
                  <Form.Item className="w-full  mb-3">
                    <label
                      htmlFor="operatingUnitIds"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Operating Units
                    </label>

                    <Select
                      {...field}
                      id="operatingUnitIds"
                      placeholder="Select a position"
                      value={selectedFilteredOperatingUnitIds}
                      mode="multiple"
                      className=" w-full mt-[3px] overflow-auto custom-select"
                      onChange={handleOperatingUnitChange}
                    >
                      {OperatingUnitData?.data?.map((role) => (
                        <Option key={role?.id} value={role?.name}>
                          {role?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />{" "}
              <Controller
                name="positionId"
                control={control}
                render={({ field }) => (
                  <Form.Item className="w-full sm:w-full mb-3">
                    <label
                      htmlFor="positionId"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Position
                    </label>
                    <Select
                      id="positionId"
                      placeholder="Select Role"
                      className="custom-select w-full h-[38px] mt-1 "
                      {...field}
                    >
                      {filteredPositionData?.map((role) => (
                        <Select.Option key={role?.id} value={role?.id}>
                          {role?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />{" "}
              <div className="flex justify-between flex-col lg:flex-row w-full">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[48%] mb-3">
                      <label
                        htmlFor="email"
                        className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                      >
                        Email
                      </label>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Email"
                        className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                      />
                    </Form.Item>
                  )}
                />{" "}
                <Controller
                  name="resourceId"
                  control={control}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[48%] mb-3">
                      <label
                        htmlFor="resourceId"
                        className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                      >
                        resourceId
                      </label>
                      <Input
                        {...field}
                        id="resourceId"
                        placeholder="resourceId"
                        className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-1"
                      />
                    </Form.Item>
                  )}
                />
              </div>{" "}
              <div className="flex justify-between w-full flex-col lg:flex-row lg:my-1">
                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[49%] mb-3">
                      <label
                        htmlFor="roleId"
                        className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                      >
                        Role
                      </label>
                      <Select
                        id="roleId"
                        placeholder="Select Role"
                        className="custom-select w-full h-[38px] mt-1 "
                        {...field}
                      >
                        {fetchRolesData?.data?.map((role: GetRolesTypes) => (
                          <Select.Option key={role?.id} value={role?.id}>
                            {role?.title}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Form.Item className="w-full sm:w-full lg:w-[49%] mb-3">
                      <label
                        htmlFor="status"
                        className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                      >
                        Status
                      </label>
                      <Select
                        id="status"
                        placeholder="Select Status"
                        className="custom-select w-full h-[38px] mt-1"
                        {...field}
                      >
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Deactivated">
                          Inactive
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <button
                  disabled={!isDirty}
                  type="submit"
                  className={`${
                    !isDirty
                      ? "bg-gray-100 opacity-50 cursor-not-allowed"
                      : "border-[#FF8548] bg-[#FF8548] text-white hover:text-[#FF8548] hover:bg-white"
                  } font-manrope w-full sm:w-3/12 lg:w-[22%] border-[1px] h-[38px] rounded-md text-[12px]`}
                >
                  {isUserUpdatePending ? "Loading..." : "Update Profile"}
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditUserProfileForms;
