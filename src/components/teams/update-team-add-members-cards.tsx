import { SingleUser } from "../iconComponents";

interface UpdateTeamToAddMembersProps {
  onShowModals: () => void;
}
export default function UpdateTeamToAddMembers({
  onShowModals,
}: UpdateTeamToAddMembersProps) {
  return (
    <>
      <div className="bg-white font-manrope h-[89vh]">
        <div className="border-t-[1px] "></div>
        <div className=" h-[50vh] flex justify-center mt-11">
          <div
            className=" flex justify-center items-center w-64 h-40 bg-[#fafafa] shadow rounded-lg border border-gray-200 cursor-pointer"
            onClick={onShowModals}
          >
            <div className="flex justify-center flex-col items-center">
              <div style={{ fontSize: "38px", color: "#008444" }}>
                <SingleUser />{" "}
              </div>
              <p className="mt-2 text-sm text-[#18120f]">Add Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
