import { PaginatedResponse } from ".";
import { schemaCreateTeam } from "../schemas";
import { ApiResponseLocation } from "./location";
export type InputCreateTeam = z.infer<typeof schemaCreateTeam>;
export type Member = {
  id: number;
  firstName: string;
  lastName: string;
  isVerified?: boolean;
  designation: string;
  isActive?: boolean;
  roleId?: number;
  role?: string;
};
export type teamType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  region: string;
  city: string;
  area: string;
  members: Member[];
  status: string;
};

export type createTeamType = {
  name?: string;
  region?: string;
  city?: string;
  area?: string;
  teamhead?: string;
  status?: string;
  operatingUnitId?: number | string;
  operatingUnitIds?: number[];
  reportingManager?: string;
};

export type updateTeamType = {
  name?: string;
  region?: string;
  city?: string;
  area?: string;
};

export type createTeamResponseType = {
  message: string;
} & teamType;

export interface TeamStoreState {
  TeamsId: string | number;
  setTeamsId: (value: string | number) => void;
}

export interface EditTeamModalProps {
  isOpen: boolean;
  teamId: number;
  onClose: () => void;
}

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  designation: string;
  isActive: boolean;
  roleId: number;
  role: string;
}
export interface updateTeamMemberType {
  teamId: number;
  userIds: number[];
}
export interface updateUserMultipleTeamsType {
  userId: number;
  teamId: number[];
}
export interface RemoveTeamMembers {
  id: number;
  userName?: string;
  firstName: string;
  lastName: string;
  key?: React.Key;

  designation: string;
}
export type fetchAllTeamsApiResponse = PaginatedResponse<teamType[]>;
type members = {
  id: number;
  firstName: string;
  lastName: string;
  isVerified?: boolean;
  designation: string;
  isActive?: boolean;
  roleId?: number;
  role?: string;
};
type Team = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  region: string;
  city: string;
  area: string;
  status?: string;
  members: members[];
};

type ApiTeamResponseFull = {
  message: string;
  data: [
    {
      id: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      region: string;
      city: string;
      area: string;
      members: [
        {
          id: number;
          firstName: string;
          lastName: string;
          isVerified?: boolean;
          designation: string;
          isActive?: boolean;
          roleId?: number;
          role?: string;
        }
      ];
    }
  ]; //
  page: number;
  total: number;
  lastPage: number;
};
type ApiTeamResponse = {
  message: string;
  data: {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    region: string;
    city: string;
    area: string;
    operatingUnitId: number;
    members: Array<{
      id: number;
      firstName: string;
      lastName: string;
      isVerified?: boolean;
      designation: string;
      isActive?: boolean;
      roleId?: number;
      role?: string;
    }>;
  };
  page?: number;
  total?: number;
  lastPage?: number;
};
export interface FilterModalTeam {
  isOpen: boolean;
  onClose: () => void;
  setTeamsArea: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTeamsRegion: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTeamsCity: React.Dispatch<React.SetStateAction<string | undefined>>;
  LocationData: ApiResponseLocation | undefined;
  isEmpty: boolean;
}
