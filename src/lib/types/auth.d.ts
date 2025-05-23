export type LoginApiResponse = {
  message: string;
  data: {
    data: {
      user: {
        id: number;
        userName?: string;
        firstName: string;
        lastName: string;
        email: string;
        isVerified: boolean;
        designation: string;
        isActive?: boolean;
        roleId: number;
        customerSegmentIds: string[];
        operatingUnitIds: string[];
        role: string;
      };
      access_token: string;
    };
  };
};
export type ForgotEmailType = {
  email: string;
};
export type ForgotEmailResponse = {
  message: string;
  error: string;
  statusCode: number;
};
export type OtpVerificationType = {
  email: string;
  code: number | string;
};
export type OtpVerificationResponseType = {
  message: string;
};
export type ChangePasswordType = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};
