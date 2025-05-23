import { Modal } from "antd";
import { AddTeamModalProps } from "@/lib/types/customer";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import "../../index.css";
import { Switch } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import UsersService from "@/services/users/user.service";
import TeamsService from "@/services/teams/teams.service";
import { updateUserMultipleTeamsType } from "@/lib/types/team";
import SvgDelete from "../iconComponents/Delete";
interface TeamDetails {
  id?: number | undefined;
  name?: string;
}
const AddMultipleTeamModals: React.FC<AddTeamModalProps> = ({
  isOpen,
  onClose,
}) => {
  const onChange = (checked: boolean) => {
    setshowselectedteams(checked);
  };
  const [showselectedmembers, setshowselectedteams] = useState(false);
  const [TeamsLimit, setTeamsLimit] = useState<number>(14);
  const [TeamsCurrentPage] = useState<number>(1);
  const [TeamsRegion] = useState<string | undefined>(undefined);
  const [TeamsQuery, setTeamsQuery] = useState<string | undefined>(undefined);
  const [selectedMembersDetails, setSelectedMembersDetails] = useState<
    TeamDetails[]
  >([]);
  const [TeamsCity] = useState<string | undefined>(undefined);
  const [TeamsArea] = useState<string | undefined>(undefined);
  const { useFetchAllTeams } = TeamsService();
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useHandleTargetedUsers, useHandleAddTeamsService } = UsersService();

  const { data: allTeamData, isLoading: isAllTeamDataLoading } =
    useFetchAllTeams(
      TeamsLimit,
      TeamsCurrentPage,
      TeamsRegion,
      TeamsQuery,
      TeamsCity,
      TeamsArea
    );
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const loadmore = () => {
    setTeamsLimit((prev) => prev + 10);
  };
  const { data: targetUserData } = useHandleTargetedUsers(numericId);
  const handleButtonClick = (id: number, teamDetails: TeamDetails) => {
    setshowselectedteams(true);
    if (selectedButtons.includes(id)) {
      setSelectedButtons(selectedButtons.filter((buttonId) => buttonId !== id));
      setSelectedMembersDetails((prev) =>
        prev.filter((member) => member?.id !== id)
      );
    } else {
      setSelectedButtons([...selectedButtons, id]);
      setSelectedMembersDetails((prev) => [...prev, teamDetails]);
    }
  };
  const { handleSubmit, reset } = useForm();
  const { mutate, isPending } = useHandleAddTeamsService(reset, onClose);

  const onSubmit = () => {
    const payload: updateUserMultipleTeamsType = {
      userId: Number(numericId),
      teamId: selectedButtons,
    };
    mutate(payload);
    setSelectedButtons([]);
    setshowselectedteams(false);
    setSelectedMembersDetails([]);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamsQuery(e.target.value);
  };
  console.log("allteamdata", allTeamData?.data);
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
          <div className="text-[#18120f] text-md font-semibold font-manrope">
            Add Teams
          </div>
          <div className="p-2 border-[1px] rounded-lg mt-2">
            <div className="w-[100%]">
              <Input
                className="w-full text-[12px] md:py-3 lg:px-4 lg:py-3"
                size="large"
                placeholder="Search Team..."
                prefix={
                  <IoSearchOutline className="text-[#008444] text-[14px]" />
                }
                onChange={handleSearchChange}
              />
            </div>
            {targetUserData && targetUserData?.data?.teams?.length > 0 ? (
              <>
                {" "}
                <div className="mt-3 flex justify-end">
                  <div className="flex">
                    <div className="mr-2 text-[#6B6B6B]">Show Existing</div>
                    <Switch size="small" onChange={onChange} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="overflow-auto h-[47vh]">
              {allTeamData?.data
                ?.filter(
                  (user) =>
                    !targetUserData?.data?.teams?.some(
                      (member) => member?.id === user?.id
                    )
                )
                .map((item) => (
                  <div
                    key={item?.id}
                    className="flex justify-between mt-4 items-center w-full"
                  >
                    <div className="flex items-center w-10/12">
                      <img
                        src="/groupteam.png"
                        alt="logo"
                        className="h-7 w-7"
                      />
                      <div className="ml-2 leading-4 w-9/12 text-[#18120f]">
                        <div>{item?.name}</div>
                      </div>
                    </div>
                    <div
                      className={`w-7 h-7 border-[1px] rounded-lg flex justify-center items-center ${
                        selectedButtons.includes(item?.id)
                          ? "bg-gray-200"
                          : "bg-[#fafafa]"
                      }`}
                    >
                      <button
                        onClick={() =>
                          handleButtonClick(item?.id, {
                            id: item?.id,
                            name: item?.name,
                          })
                        }
                        className="flex justify-center items-center mb-1"
                      >
                        {selectedButtons.includes(item?.id) ? "✔" : "+"}
                      </button>
                    </div>
                  </div>
                ))}
              <button
                onClick={loadmore}
                className={`${
                  TeamsLimit >= Number(allTeamData?.total) ? "hidden" : "block"
                } bg-orange-500 text-white flex justify-center mx-auto p-2 mt-2 rounded-lg`}
              >
                {isAllTeamDataLoading ? "loading..." : "Load More"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-[98%] lg:w-[49%] mt-3 lg:mt-0">
          <div className="text-[#18120f] text-md font-semibold font-manrope">
            Selected Teams
          </div>
          <div
            className={`${
              (targetUserData?.data?.teams?.length || 0) === 0
                ? "border-none "
                : "border-[1px] "
            } pt-2 px-2  rounded-lg mt-2 overflow-auto`}
          >
            {showselectedmembers ? (
              <div className="h-[40vh]">
                {selectedMembersDetails?.map((item, ind) => (
                  <div
                    key={ind}
                    className="flex justify-between items-center mt-2  "
                  >
                    <div className="flex items-center w-10/12">
                      <img
                        src="/groupteam.png"
                        alt="logo"
                        className="h-7 w-7"
                      />
                      <div className="ml-2 leading-4 w-9/12">
                        <div className="text-[#18120f]">{item?.name}</div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleButtonClick(item?.id || 0, { name: item?.name })
                        }
                      >
                        <SvgDelete className="h-7 w-7" />
                      </button>
                    </div>
                  </div>
                ))}

                {targetUserData?.data?.teams?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mt-2  "
                  >
                    <div className="flex items-center w-10/12">
                      <img
                        src="/groupteam.png"
                        alt="logo"
                        className="h-7 w-7"
                      />
                      <div className="ml-2 leading-4 w-9/12">
                        <div className="text-[#18120f]">{item?.name}</div>
                        <div className="text-[#6B6B6B]"></div>
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

export default AddMultipleTeamModals;
