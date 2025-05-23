import React, { useState } from "react";
import { Modal, notification, Select } from "antd";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form, Spin } from "antd";
import Dropzone from "react-dropzone";
import "../../index.css";
import UsersService from "@/services/users/user.service";
import { errorType } from "@/lib/types";
import { createUserType } from "@/lib/types/user";
import { CreateModalProps } from "@/lib/types/user";
import RolesService from "@/services/roles/roles.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCreateUser } from "@/lib/schemas";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const UsersCreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<createUserType>({
    resolver: zodResolver(schemaCreateUser),
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRoleIdEnabled, setIsRoleIdEnabled] = useState(false); // State for Role ID field
  const {
    useHandleCreateUserService,
    useFetchAllPositions,
    useFetchAllOperationUnitIds,
    useFetchAllCustomerSegments,
  } = UsersService();
  const [limit, setUsersLimit] = useState<number>(19);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<number | undefined>(undefined); // State to store selected IDs
  const [selectedOperatingUnitIds, setSelectedOperatingUnitIds] = useState<
    number[] | undefined
  >(undefined);

  const { mutate, isPending } = useHandleCreateUserService(
    reset,
    setSelectedFile,
    onClose
  );
  const { useFetchAllRoles } = RolesService();
  const { data: rolesData } = useFetchAllRoles();
  const { data: positionsData } = useFetchAllPositions(limit, page);
  const { data: positingUnitsData } = useFetchAllOperationUnitIds(50, 1);
  const { data: customerSegmentsData } = useFetchAllCustomerSegments();
  const [selectedCustomerSegmentIds, setSelectedCustomerSegmentIds] = useState<
    number[]
  >([]);

  const handleChange = (selectedIds: number[]) => {
    console.log("Selected Unit IDs:", selectedIds); // Debugging ke liye
    setSelectedCustomerSegmentIds(selectedIds); // Sirf IDs store ho rahi hain
  };
  const handleChangeOperatingUnit = (selectedIds: number[]) => {
    console.log("Selected Unit IDs:", selectedIds); // Debugging ke liye
    setSelectedOperatingUnitIds(selectedIds); // Sirf IDs store ho rahi hain
  };
  console.log("positingUnitsData", positingUnitsData?.data);
  const onSubmit: SubmitHandler<createUserType> = (data) => {
    console.log("Form data:", data);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    // if (data.phone !== undefined) {
    formData.append("phone", String(data.phone));
    formData.append("resourceId", String(data.resourceId));

    // }
    // if (data.address !== undefined) {
    formData.append("address", String(data.address));
    // }
    formData.append("password", data.password);

    formData.append("designation", data.designation);
    if (data.roleId !== undefined) {
      formData.append("roleId", String(data.roleId));
    }
    if (selectedIds !== undefined) {
      formData.append("positionId", selectedIds?.toString());
    }
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (selectedOperatingUnitIds) {
      selectedOperatingUnitIds.forEach((item, index) => {
        formData.append(`operatingUnitIds[${index}]`, item?.toString());
      });
    }
    if (selectedCustomerSegmentIds) {
      selectedCustomerSegmentIds?.forEach((item, index) => {
        formData.append(`customerSegmentIds[${index}]`, item?.toString());
      });
    }
    console.log("FormData entries:", data, setUsersLimit, setUsersCurrentPage);
    mutate(formData);
  };

  const onError = (errors: FieldErrors<errorType>) => {
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

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      console.log("Selected file:", acceptedFiles[0]);
    }
  };

  const handleDesignationChange = (value: string) => {
    const selectedRole = rolesData?.data?.find((role) => role.title === value);

    if (selectedRole) {
      setValue("roleId", selectedRole.id);
      setIsRoleIdEnabled(true);
    } else {
      notification.error({
        message: "Invalid Designation",
        description: "Selected designation does not map to any role.",
      });
      setValue("roleId", undefined);
      setIsRoleIdEnabled(false);
    }
  };
  const filteredPositionData = positionsData?.data.map(({ name, id }) => ({
    name,
    id,
  }));
  const handlePositionChange = (selected: number) => {
    setSelectedIds(selected);
  };
  const filteredOperatingUnitData = positingUnitsData?.data.map(
    ({ id, name }) => ({
      id,
      name,
    })
  );

  return (
    <Modal
      footer={null}
      title="Add User"
      open={isOpen}
      onCancel={onClose}
      className=" top-1 lg:top-3"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        encType="multipart/form-data"
        className=" "
      >
        <div className="font-manrope w-full flex flex-col mt-2 border-[1px] border-[#EBF0ED] px-3 pt-3 pb-3 lg:pb-0  lg:pt-2 rounded-lg addusermodal">
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-2"
                  validateStatus={errors?.firstName ? "error" : ""}
                  help={errors?.firstName?.message}
                >
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
                    className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                  />{" "}
                </Form.Item>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-2"
                  validateStatus={errors?.lastName ? "error" : ""}
                  help={errors?.lastName?.message}
                >
                  <label
                    htmlFor="lastName"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                  >
                    Last Name
                  </label>
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Last Name"
                    className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                  />{" "}
                </Form.Item>
              )}
            />{" "}
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-2"
                  validateStatus={errors?.email ? "error" : ""}
                  help={errors?.email?.message}
                >
                  <label
                    htmlFor="email"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Email
                  </label>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                  />{" "}
                </Form.Item>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-2"
                  validateStatus={errors?.password ? "error" : ""}
                  help={errors?.password?.message}
                >
                  <label
                    htmlFor="password"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Password
                  </label>
                  <Input.Password
                    {...field}
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                  />
                </Form.Item>
              )}
            />
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-[6px]">
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%]  mb-3"
                  validateStatus={errors?.designation ? "error" : ""}
                  help={errors?.designation?.message}
                >
                  <label className="text-[13px] text-[#6B6B6B] font-manrope font-semibold">
                    Role
                  </label>

                  <Select
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      handleDesignationChange(value);
                    }}
                    placeholder="Select a role"
                    className="custom-select  h-[38px] mt-[3px]"
                  >
                    {rolesData?.data?.map((role) => (
                      <Option key={role.id} value={role.title}>
                        {role.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
            <Controller
              name="positionId"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-3"
                  validateStatus={errors?.positionId ? "error" : ""}
                  help={errors?.positionId?.message}
                >
                  <label
                    htmlFor="positionId"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    position
                  </label>

                  <Select
                    {...field}
                    id="positionId"
                    placeholder="Select a position"
                    className=" w-full mt-[3px] custom-select"
                    onChange={handlePositionChange} // Add the onChange handler
                  >
                    {filteredPositionData?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
            <div className="hidden">
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:w-[48%] mb-3"
                    validateStatus={errors?.roleId ? "error" : ""}
                    help={errors?.roleId?.message}
                  >
                    <label className="text-[13px] text-[#6B6B6B] font-manrope font-semibold ">
                      Role Id
                    </label>
                    <Input
                      {...field}
                      readOnly
                      disabled={!isRoleIdEnabled}
                      placeholder="Role ID"
                      className="h-[38px] bg-[#fafafa]  border-[#EBF0ED] mt-[3px]"
                    />
                  </Form.Item>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-2"
                  validateStatus={errors?.phone ? "error" : ""}
                  help={errors?.phone?.message}
                >
                  <label
                    htmlFor="phone"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Phone Number
                  </label>
                  <Input
                    {...field}
                    id="phone"
                    type="number"
                    placeholder="Enter phone"
                    className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                  />{" "}
                </Form.Item>
              )}
            />
            <Controller
              name="resourceId"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-2"
                  // validateStatus={errors?.lastName ? "error" : ""}
                  // help={errors?.lastName?.message}
                >
                  <label
                    htmlFor="resourceID"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                  >
                    Resource Id{" "}
                  </label>
                  <Input
                    {...field}
                    id="resourceId"
                    placeholder="Resource Id"
                    className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                  />{" "}
                </Form.Item>
              )}
            />{" "}
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row">
            <Controller
              name="customerSegmentIds"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full  mb-3"
                  validateStatus={errors?.customerSegmentIds ? "error" : ""}
                  help={errors?.customerSegmentIds?.message}
                >
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
                    mode="multiple"
                    className=" w-full mt-[3px] overflow-auto custom-select"
                    onChange={handleChange}
                  >
                    {customerSegmentsData?.data?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </div>{" "}
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-[4px]">
            <Controller
              name="operatingUnitIds"
              control={control}
              render={({ field }) => (
                <Form.Item
                  className="w-full mb-3"
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
                    {...field}
                    id="operatingUnitIds"
                    placeholder="Select a position"
                    mode="multiple"
                    className=" w-full mt-[3px] overflow-auto custom-select"
                    onChange={handleChangeOperatingUnit}
                  >
                    {filteredOperatingUnitData?.map((role) => (
                      <Option key={role?.id} value={role?.id}>
                        {role?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </div>{" "}
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Item
                className="w-full  mb-2"
                validateStatus={errors?.address ? "error" : ""}
                help={errors?.address?.message}
              >
                <label
                  htmlFor="address"
                  className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                >
                  Address
                </label>
                <TextArea
                  {...field}
                  id="address"
                  placeholder="Enter address.."
                  className="h-[30px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                />{" "}
              </Form.Item>
            )}
          />
          <Form.Item className="w-full lg:mb-3 mt-2  lg:mt-3">
            <Dropzone
              onDrop={handleDrop}
              multiple={false}
              accept={{ "image/*": [] }}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="flex flex-col justify-center items-center w-full h-24  rounded-lg bg-[#fafafa] cursor-pointer hover:bg-gray-50 border-[1px] border-[#EBF0ED]"
                >
                  <input {...getInputProps()} />
                  <div className="flex justify-center items-center">
                    <img
                      className={`flex justify-center h-9 ${
                        selectedFile ? "rounded-full" : ""
                      }`}
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : "/cloud-arrow-up.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="mt-1 flex justify-center">
                    {selectedFile ? selectedFile.name : "Upload"}
                  </div>
                </div>
              )}
            </Dropzone>
          </Form.Item>
          <Form.Item className="flex justify-center ">
            <button
              className="flex items-center justify-center py-2 px-7 w-full font-bold rounded-lg border-[1px] border-[#f8501a] bg-[#f8501a] text-white hover:bg-[#ff7741] hover:text-[#fafafa] lg:translate-y-2"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Spin className="custom-spinner" /> : "Submit"}
            </button>
          </Form.Item>
        </div>
      </form>
    </Modal>
  );
};

export default UsersCreateModal;
