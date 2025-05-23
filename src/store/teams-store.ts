import { create } from "zustand";
import { TeamStoreState } from "@/lib/types/team";

const TeamStore = create<TeamStoreState>((set) => ({
  TeamsId: "",
  setTeamsId: (value: string | number) => set({ TeamsId: value }),
}));

export default TeamStore;
