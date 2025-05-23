import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Spin, Table } from "antd";
import { useParams } from "react-router-dom";
import {
  createUserType,
  updateUserToRemoveTeamType,
  UserInvolvedInTeamsType,
} from "@/lib/types/user";
import EditUserProfileForms from "@/components/users/edit-users-profile-form";
import UpdateUserPassword from "@/components/users/update-password-from";
import userEditProfileTeamsColumns from "@/lib/constants/columns/user-edit-profile";
import RolesService from "@/services/roles/roles.services";
import AddMultipleTeamModals from "@/components/users/add-multiple-teams-modals";
import Dropzone from "react-dropzone";
import UsersService from "@/services/users/user.service";
import { AiOutlineDelete } from "react-icons/ai";

export default function UpdateUserManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { control, reset } = useForm<createUserType>();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;

  // const numericId = idString ? parseInt(idString) : undefined;
  const {
    useHandleTargetedUsers,
    useHandleUpdateUserService,
    useHandleRemoveTeamsService,
  } = UsersService();
  const { mutate, isPending: isHandleUpdateUserLoading } =
    useHandleUpdateUserService(reset, numericId);
  const {
    mutate: RemoveTemsMutate,
    isPending: isHandleUpdateUsersRemoveTeamsLoading,
  } = useHandleRemoveTeamsService(reset, setSelectedRowKeys);
  const { data: targeUserData, isLoading: istargeUserDataLoading } =
    useHandleTargetedUsers(numericId);
  const { useFetchAllRoles } = RolesService();
  const { data: fetchRolesData } = useFetchAllRoles();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const ShowModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: updateUserToRemoveTeamType = {
      userId: Number(numericId),
      teamId: selectedRowKeys.map((key) => Number(key)),
    };
    RemoveTemsMutate(payload);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between lg:flex-row mb-6">
        {" "}
        {
          <AddMultipleTeamModals
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        }
        {istargeUserDataLoading || isHandleUpdateUserLoading ? (
          <div className="w-full flex justify-center items-center mt-[40vh]">
            <Spin className="h-20 w-20" />
          </div>
        ) : (
          <>
            <div className="left w-[100%] lg:w-[29%] font-manrope">
              <div className=" bg-white p-6 rounded-lg font-manrope">
                <h2 className="text-xl font-bold mb-4 text-[#18120f]">
                  My Profile
                </h2>
                <div className="flex items-center mb-6 ">
                  <div className="w-20 h-20 rounded-full  relative">
                    <form encType="multipart/form-data">
                      <Controller
                        name="file"
                        control={control}
                        rules={{
                          required: "Please upload an image",
                        }}
                        render={() => (
                          <Dropzone
                            onDrop={(acceptedFiles) => {
                              if (acceptedFiles.length > 0) {
                                const newFile = acceptedFiles[0];
                                setSelectedFile(newFile);

                                const formData = new FormData();
                                formData.append("image", newFile);

                                mutate(formData);
                              }
                            }}
                            multiple={false}
                            accept={{ "image/*": [] }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div
                                {...getRootProps()}
                                className="flex flex-col overflow-hidden justify-center items-center w-20 h-20 border border-gray-300 rounded-full bg-[#fafafa] cursor-pointer hover:bg-gray-50"
                              >
                                <img
                                  src={
                                    selectedFile
                                      ? URL.createObjectURL(selectedFile)
                                      : targeUserData?.data?.image ||
                                        "https://cdn.pixabay.com/photo/2024/03/12/15/42/greylag-goose-8629040_640.jpg"
                                  }
                                  alt="Profile"
                                  className="h-full w-full  obj"
                                  onLoad={(e) =>
                                    URL.revokeObjectURL(
                                      (e.target as HTMLImageElement).src
                                    )
                                  }
                                />
                                <input {...getInputProps()} />
                                <div className="text-sm text-gray-500 flex justify-center items-center flex-col"></div>
                                <img
                                  src="/UserEditImage.png"
                                  alt="Edit Icon"
                                  className="absolute right-0 bottom-0 cursor-pointer"
                                />
                              </div>
                            )}
                          </Dropzone>
                        )}
                      />
                    </form>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#18120f]">
                      {targeUserData?.data?.firstName + " "}
                      {targeUserData?.data?.lastName}
                    </h3>
                    <p className="text-[#6B6B6B] text-sm">
                      {targeUserData?.data?.role}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between border-b-[1px] pb-3 mt-3">
                  <div className="text-[#6B6B6B]">Full Name:</div>
                  <div className="text-[#18120f]">
                    {" "}
                    {targeUserData?.data?.firstName + " "}
                    {targeUserData?.data?.lastName}
                  </div>
                </div>
                <div className="flex justify-between border-b-[1px] pb-3 mt-4  w-full">
                  <div className="text-[#6B6B6B] w-2/12">Email :</div>
                  <div className="text-[#18120f] text-sm w-9/12 text-right  break-words">
                    {targeUserData?.data?.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] lg:w-[69%] right bg-white rounded-lg p-2 lg:p-6 ">
              <div className="text-[#18120f] text-xl font-bold">
                Edit Profile
              </div>
              {targeUserData?.data && fetchRolesData ? (
                <EditUserProfileForms
                  fetchRolesData={fetchRolesData || { data: [] }}
                  targeUserData={targeUserData?.data}
                />
              ) : (
                <div>Loading user data...</div>
              )}
              <UpdateUserPassword />
              <div className="">
                <div className="w-full flex justify-between items-center mt-5 flex-wrap lg:mb-4 border-b-[1px] pb-4">
                  <div
                    className="w-[100%]   xmd:w-[70%]  ml-1 lg:w-[25%] flex justify-between items-center
            text-[#6B6B6B] font-semibold  md:px-0 "
                  >
                    {selectedRowKeys.length > 0 ? (
                      <>
                        <form onSubmit={onSubmit}>
                          <button
                            type="submit"
                            className=" md:mb-0 flex  justify-between items-center mr-4"
                          >
                            <div className=" text-[#008444] text-[12px] font-semibold md:text-lg">
                              <AiOutlineDelete className=" text-[#008444] text-2xl font-bold md:text-lg" />
                            </div>
                            <div className="text-[12px] ml-1 md:text-[13px] mt-1 md:ml-2 text-[#6B6B6B]  ">
                              Deleted
                            </div>
                          </button>
                        </form>
                      </>
                    ) : (
                      ""
                    )}
                    <button
                      className="text-[#008444] flex mr-4"
                      onClick={() => ShowModal()}
                    >
                      <span className="mr-1">+</span> <span>Add</span>
                    </button>
                    <button className="mt-1  flex  justify-between items-center">
                      <div className="   font-semibold text-xs">
                        Total Teams
                      </div>
                      <div className=" ml-1  md:ml-2  border-[1px] rounded-lg p-1  text-xs bg-[#fafafa]">
                        ({targeUserData?.data?.teams?.length})
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <Table<UserInvolvedInTeamsType>
                    columns={userEditProfileTeamsColumns()}
                    dataSource={targeUserData?.data?.teams?.map((team) => ({
                      ...team,
                      key: team.id,
                    }))}
                    loading={isHandleUpdateUsersRemoveTeamsLoading}
                    pagination={false}
                    rowSelection={{
                      type: "checkbox",
                      ...rowSelection,
                    }}
                    className="overflow-auto border-[1px] rounded-lg"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
