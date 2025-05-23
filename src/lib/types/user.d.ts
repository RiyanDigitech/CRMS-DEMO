import { PaginatedResponse } from ".";
import { GetRolesTypes } from "./role";

export type UserType = {
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  roleId?: number;
  userName?: string | null;
  id?: number;
  status: string;
  isVerified?: boolean;
  isActive?: boolean;
  role: string;
  updatedAt?: string;
  image?: string | null;
  operatingUnitIds?: number[] | string[];
};
export type CreateUserResponseType = {
  message: string;
  data: {
    user: UserType;
    access_token: string;
  };
};
export interface UpdateUserType {
  firstName: string;
  lastName: string;
  roleId: number;
  status: string;
  positionId?: number; // Added positionId
  password?: string;
  confirmPassword?: string;
  operatingUnitIds?: number[];
  customerSegmentIds?: number[];
}
export type createUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  designation: string;
  roleId?: string | number;
  positionId?: number | undefined;
  operatingUnitIds?: number[];
  resourceId?: string;
  customerSegmentIds?: number[];
  // departement?: string;
  file?: string;
  phonenumber?: number | string;
  phone?: number | string;
  city?: string;
  postalcode?: string;
  newpassword?: string;
  repeatnewpassword?: string;
  profileImage?: string;
  status?: string;
  address?: string;
  erpid?: number;
};
export type updateUserType = {
  firstName?: string;
  lastName?: string;
  image?: string;
};
export interface updateUserToRemoveTeamType {
  teamId: number[];
  userId: number;
}
export interface AddUserModalsProps {
  isOpen: boolean;
  userId: number;
  onClose: () => void;
}
export type UserEditTeamsType = { designation: string; role: string };
export type UserInvolvedInTeamsType = {
  id?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  region?: string;
  city?: string;
  area?: string;
};

export type updateUserResponseType = {
  message: sting;
  data: {
    id: number;
    firstName: string;
    designation: string;
    lastName: string;
    role: string;
    userName: null;
    updatedAt: string;
  };
};
export type fetchAllUsersApiResponse = PaginatedResponse<userType[]>;
export type fetchTargetedUsersApiResponse = {
  message: string;
  data: {
    id: number;
    status: string;
    userName: null;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    roleId: number;
    role: string;
    image?: string;
    positionId: number;
    customerSegmentIds?: number[] | string[];
    operatingUnitIds?: number[] | string[];
    teams: [
      {
        id: number;
        status: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        region: string;
        city: string;
        area: string;
      }
    ];
  };
};
export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  numericId?: number | undefined;
  type?: string;

  // editData: any;
}
export interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
}
export interface FilterModalUser {
  isOpen: boolean;
  onClose: () => void;
  data: GetRolesTypes[] | undefined;
  setUsersSelectedroleId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}
export interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  setTeamsregion: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTeamscustomerSegmets: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setTeamsoperatingUnitName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}
