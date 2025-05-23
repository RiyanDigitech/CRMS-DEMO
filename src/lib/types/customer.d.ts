export interface CustomersListType {
  id: number;
  status: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  salesArea: string | null;
  strnStatus: string | null;
  itFillerStatus: string | null;
  country: string;
}

// Response type for the entire response structure
export interface CustomersResponseType {
  message: string;
  data: CustomersListType[];
  page: number;
  total: number;
  lastPage: number;
}
export interface EditCustomerModalProps {
  isOpen: boolean;
  customerId: number;
  onClose: () => void;
}
export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUsersQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  setstockStaus: React.Dispatch<React.SetStateAction<string>>;
}
export interface AddTeamMembersModalss {
  isOpen: boolean;
  onClose: () => void;
}
export interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface CustomersDeleteResponseType {
  message: string;
  data: null;
}
//create
export interface CreateCustomerData {
  message: string;
  data: CreateCustomerDetails;
}
export interface CreateCustomerDatas {
  message: string;
  data: {
    details: CreateCustomerDetails;
  };
}

export interface CreateCustomerDetail {
  data: {
    id?: number;
    status?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    phoneNumber: string;
    creditLimit?: number;
    paymentTerms?: string;
    specialPricingAgreements?: string;
    latitude?: number | string;
    longitude?: number | string;
    contactPersonName?: string;
    billingAddress?: string;
    shippingAddress?: string;
    segment?: string;
    preferredComChannel?: string;
    erpId?: string;
    taxInfo?: string;
    customerType?: string;
    classification?: string;
    operatingUnitId?: string;
    resourceId?: string;
    itFillerStatus?: string;
    strn?: string;
    ntn?: string;
    cnic?: string;
    strnStatus?: string;
    regno?: string;
    town?: string;
    province?: string;
    district?: string;
    division?: string;
    salesArea?: string;
    newNotes?: string[];
    orders?: OrderGroup[];
  };
}
export interface CreateCustomerDetails {
  id?: number;
  status?: string;
  name?: string;
  customerId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  regno?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phoneNumber: string;
  creditLimit?: number;
  paymentTerms?: string;
  specialPricingAgreements?: string;
  latitude?: number | string;
  longitude?: number | string;
  contactPersonName?: string;
  billingAddress?: string;
  shippingAddress?: string;
  segment?: string;
  preferredComChannel?: string;
  erpId?: string;
  taxInfo?: string;
  customerType?: string;
  classification?: string;
  operatingUnitId?: string;
  resourceId?: string;
  itFillerStatus?: string;
  strn?: string;
  ntn?: string;
  cnic?: string;
  strnStatus?: string;
  town?: string;
  province?: string;
  district?: string;
  division?: string;
  salesArea?: string;
  newNotes?: string[];
  orders?: OrderGroup[];
}
export interface CustomerDetailsAddressForm {
  selectedCustomerData: {
    id?: number;
    status?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    phoneNumber: string;
    creditLimit?: number;
    paymentTerms?: string;
    specialPricingAgreements?: string;
    classification?: string;
    latitude?: number;
    longitude?: number;
    contactPersonName?: string;
    billingAddress?: string;
    shippingAddress?: string;
    segment?: string;
    preferredComChannel?: string;
    erpId?: string;
    taxInfo?: string;
    customerType?: string;
    operatingUnitId?: string;
    resourceId?: string;
    itFillerStatus?: string;
    strn?: string;
    ntn?: string;
    cnic?: string;
    strnStatus?: string;
    town?: string;
    province?: string;
    district?: string;
    division?: string;
    salesArea?: string;
    newNotes?: string[];
    orders?: OrderGroup[];
  };
}
export interface OrderGroup {
  id?: number;
  orderDate?: string;
  totalAmount?: string;
  paymentStatus?: string;
  orderStatus?: string;
}
export interface TargetedCustomerData {
  message: string;
  data: CustomerData;
  page: number;
  total: number;
  lastPage: number;
}
export type UpdateCustomerDetails = {
  status?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phoneNumber: string;
  creditLimit?: number;
  paymentTerms?: string;
  specialPricingAgreements?: string;
  classification?: string;

  latitude?: number;
  longitude?: number;
  contactPersonName?: string;
  billingAddress?: string;
  shippingAddress?: string;
  segment?: string;
  preferredComChannel?: string;
  erpId?: string;
  taxInfo?: string;
  customerType?: string;
  operatingUnitId?: string;
  resourceId?: string;
  itFillerStatus?: string;
  strn?: string;
  ntn?: string;
  cnic?: string;
  strnStatus?: string;
  town?: string;
  province?: string;
  district?: string;
  division?: string;
  salesArea?: string;
};
export interface createCustomerNote {
  note: string;
  customer: number | undefined;
}
export interface updateCustomerNote {
  note: string;
}
export interface updateCustomerNoteResponse {
  message: string;
  data: {
    id: number;
    note: string;
    updatedAt: string;
  };
}
export interface createCustomerNoteReponse {
  message: string;
  data: {
    note: string;
    customer: UpdateCustomerDetails;
    id: number;
    createdAt: string;
    updatedAt: string;
  };
}
