import { Modal } from "antd";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import "../../index.css";
import { Switch } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import TeamsService from "@/services/teams/teams.service";
import { updateTeamMemberType } from "@/lib/types/team";
import SvgDelete from "../iconComponents/Delete";
import { AddTeamMembersModalss } from "@/lib/types/customer";
interface membersDetails {
  id?: number | undefined;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const AddTeamMembersModals: React.FC<AddTeamMembersModalss> = ({
  isOpen,
  onClose,
}) => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setshowselectedmembers(checked);
  };
  const [showselectedmembers, setshowselectedmembers] = useState(false);
  const [UsersLimit, setUsersLimit] = useState<number | undefined>(20);

  const [UsersCurrentPage, setUserCurrentPage] = useState<number | undefined>(
    1
  );
  const [UsersSelectedroleId] = useState<number | undefined>(undefined);
  const [UsersQuery, setUsersQuery] = useState<string>("");
  const { useFetchTargetedTeams, useHandleAddTeamMembersService } =
    TeamsService();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useFetchAllUsers } = UsersService();
  const { data: userData, isLoading: isUserDataLoading } = useFetchAllUsers(
    UsersLimit,
    UsersCurrentPage,
    UsersSelectedroleId,
    UsersQuery
  );
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const [selectedMembersDetails, setSelectedMembersDetails] = useState<
    membersDetails[]
  >([]);

  const loadmore = () => {
    setUsersLimit((prev) => prev + 10);
  };
  const { data: teamData } = useFetchTargetedTeams(numericId);
  const handleButtonClick = (id: number, memberDetails: membersDetails) => {
    setshowselectedmembers(true);
    if (selectedButtons.includes(id)) {
      setSelectedButtons(selectedButtons.filter((buttonId) => buttonId !== id));
      setSelectedMembersDetails((prev) =>
        prev.filter((member) => member.id !== id)
      );
    } else {
      setSelectedButtons([...selectedButtons, id]);
      setSelectedMembersDetails((prev) => [...prev, memberDetails]);
    }
  };
  const { handleSubmit, reset } = useForm();
  const { mutate, isPending } = useHandleAddTeamMembersService(reset, onClose);

  const onSubmit = () => {
    const payload: updateTeamMemberType = {
      teamId: Number(numericId),
      userIds: selectedButtons,
    };
    mutate(payload);
    setSelectedButtons([]);
    setshowselectedmembers(false);
    setSelectedMembersDetails([]);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersQuery(e.target.value);
    // setUserCurrentPage(undefined);
    // setUsersLimit(undefined);
  };

  console.log("userData", userData?.data[0]);

  return (
    <Modal
      className="shadow-none drop-shadow-none font-manrope text-xl edit-profile-add-teams-modal top-15 lg:top-9"
      open={isOpen}
      closable={false}
      footer={null}
    >
      <div
        onClick={onClose}
        className="flex justify-end cursor-pointer text-[#18120f] text-lg font-semibold"
      >
        X
      </div>
      <div className="flex justify-between w-full flex-col lg:flex-row">
        <div className="w-[98%] lg:w-[49%]">
          <div className="text-[#18120f] text-md font-semibold">
            Add Members
          </div>
          <div className="p-2 border-[1px] rounded-lg mt-2">
            <div className="w-[100%]">
              <Input
                className="w-full text-[12px] md:py-3 lg:px-4 lg:py-3"
                size="large"
                placeholder="Search Members..."
                prefix={
                  <IoSearchOutline className="text-[#008444] text-[14px]" />
                }
                onChange={handleSearchChange}
              />
            </div>
            {teamData && teamData?.data?.members?.length > 0 ? (
              <>
                <div className="mt-3 flex justify-end">
                  <div className="flex items-center  mr-5">
                    <div className="mr-2 text-[#6B6B6B]">Show Existing</div>
                    <Switch size="small" onChange={onChange} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="overflow-auto  h-[47vh] custom-survey-scrollbar">
              {userData?.data
                ?.filter(
                  (user) =>
                    !teamData?.data?.members?.some(
                      (member) => member.id === user.id
                    )
                )
                .map((item) => (
                  <div
                    key={item?.id}
                    className="flex justify-between mt-4 pb-4 items-center w-full border-b-[1px] pr-3"
                  >
                    <div className="flex items-center w-10/12">
                      <img src="/users.png" alt="logo" className="h-10 w-10" />
                      <div className="ml-4 leading-4 w-9/12">
                        <div className="text-[#18120f] font-semibold mb-[1px]">
                          {item?.firstName + " " + item?.lastName}
                        </div>
                        <div className="text-[#6B6B6B]">{item?.email}</div>{" "}
                        <div className="text-[#18120f] mt-2 text-xs">
                          {item?.position?.name}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-7 h-7 border-[1px] rounded-lg flex justify-center items-center ${
                        selectedButtons.includes(item.id)
                          ? "bg-gray-200"
                          : "bg-[#fafafa]"
                      }`}
                    >
                      <button
                        onClick={() =>
                          handleButtonClick(item.id, {
                            id: item.id,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            email: item.email,
                          })
                        }
                      >
                        {selectedButtons.includes(item.id) ? "✔" : "+"}
                      </button>
                    </div>
                  </div>
                ))}
              <button
                onClick={loadmore}
                className={`${
                  UsersLimit >= Number(userData?.total) ? "hidden" : "block"
                } bg-orange-500 text-white flex justify-center mx-auto p-2 mt-2 rounded-lg`}
              >
                {isUserDataLoading ? "loading..." : "Load More"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-[98%] lg:w-[49%] mt-3 lg:mt-0">
          <div className="text-[#18120f] text-md font-semibold">
            Selected Members
          </div>
          <div
            className={`${
              teamData?.data?.members?.length === 0
                ? "border-none "
                : "border-[1px] "
            } pt-2 px-2  rounded-lg mt-2 overflow-auto custom-survey-scrollbar`}
          >
            {showselectedmembers ? (
              <div className="h-[40vh]">
                {selectedMembersDetails.map((item, index) => (
                  <>
                    {" "}
                    <div
                      key={index}
                      className="flex justify-between items-center my-4 border-b-[1px] pb-3"
                    >
                      <div className="flex items-center w-10/12">
                        <img
                          src="/users.png"
                          alt="logo"
                          className="h-10 w-10"
                        />
                        <div className="ml-4 leading-4 w-9/12">
                          <div className="text-[#18120f] font-semibold mb-[1px]">
                            {item?.firstName || "" + item?.lastName}
                          </div>
                          <div className="text-[#6B6B6B]">{item?.email}</div>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            handleButtonClick(item.id || 0, {
                              id: item.id,
                              firstName: item.firstName,
                              lastName: item.lastName,
                              email: item.email,
                            })
                          }
                        >
                          <SvgDelete className="h-7 w-7" />
                        </button>
                      </div>
                    </div>
                  </>
                ))}

                {teamData?.data?.members?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center my-4 border-b-[1px] pb-3"
                  >
                    <div className="flex items-center w-10/12">
                      <img src="/users.png" alt="logo" className="h-10 w-10" />
                      <div className="ml-4 leading-4 w-9/12">
                        <div className="text-[#18120f] font-semibold mb-[1px]">
                          {item?.firstName + item?.lastName}
                        </div>
                        <div className="text-[#6B6B6B]">
                          {item?.designation}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className=" flex justify-center flex-col items-center my-14">
                  <img
                    className="h-25 w-40"
                    src="/usereditunselectteams.png"
                    alt=""
                  />
                  <div className="text-[#6B6B6B] mt-4 text-xs">
                    No groups selected
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-2 flex justify-center">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <button
                type="submit"
                disabled={selectedButtons.length === 0}
                className={`${
                  selectedButtons.length > 0
                    ? "bg-orange-400 text-white"
                    : "bg-[#fafafa]"
                } text-[#B8ACAC] h-10 w-24 rounded-lg border-[1px]`}
              >
                {isPending ? "Loading..." : "Submit"}
              </button>
            </form>
            <button
              className="bg-[#ffffff]  text-[#B8ACAC] border-[1px] text-md px-5 py-2 rounded-md ml-3"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTeamMembersModals;
