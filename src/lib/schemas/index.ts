//I defined zod schema for  login page
import { z } from "zod";
import { ComplaintTypeEnum } from "@/lib/enums";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

// const complaintSchema = z.object({
//   subject: z.string().optional(),
//   customerId: z
//     .number()
//     .int()
//     .positive()
//     .describe("Unique identifier for the customer"),
//   productId: z
//     .number()
//     .int()
//     .positive()
//     .describe("Unique identifier for the product"),
//   assignedTo: z
//     .string()
//     .min(1, "Assigned team is required")
//     .describe("Team assigned to resolve the complaint"),
//   description: z
//     .string()
//     .min(1, "Description is required")
//     .describe("Detailed description of the complaint"),
//   complaintType: z
//     .array(z.string().min(1, "Complaint type cannot be empty"))
//     .nonempty("At least one complaint type must be provided")
//     .describe("List of complaint types"),
//   priority: z.enum(["Low", "Medium", "High", "Critical"]),
//   resolutionDetail: z
//     .string()
//     .optional()
//     .describe("Details of how the complaint was resolved"),
// });

const complaintFormSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(100, "Subject cannot exceed 100 characters"),
  reference: z
    .string()
    .max(50, "Reference cannot exceed 50 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),
  customerId: z.string().regex(/^\d+$/, "Select a customer").optional(),
  assignedTo: z
    .string()
    .regex(/^\d+$/, "Assign the complaint to an admin")
    .optional(),
  type: z.nativeEnum(ComplaintTypeEnum),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
});

export const complaintAdminFormSchema = z.object({
  complaintStatus: z
    .string()
    .max(50, "Subject cannot exceed 100 characters")
    .optional(),
  resolutionDetail: z
    .string()
    .max(1000, "Resolution Detail cannot exceed 1000 characters")
    .optional()
    .nullable(),
});

const schemaForgotPassword = z.object({
  email: z.string().email("Invalid email address"),
});
const schemaCreateTeam = z.object({
  name: z.string().min(1, "Name is required"),
  // operatingUnitId: z.string().min(1, "Name is required"),
  // city: z.string().min(1, "City is required"),
  // region: z.string().min(1, "Region is required"),
  // area: z.string().min(1, "Area is required"),
});
const schemaCreateSurvey = z.object({
  name: z
    .string()
    .nonempty("Survey name must be required")
    .regex(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
  // startDate: z.date({ required_error: "Start date is required" }),
  // endDate: z.date({ required_error: "End date is required" }),

  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),

  // startDate: z
  //   .string()
  //   .nullable()
  //   .refine((date) => !!date, "Start date is required"),
  // endDate: z
  //   .string()
  //   .nullable()
  //   .refine((date) => !!date, "End date is required"),
  version: z
    .string()
    .min(1, "Version Number required")
    .regex(/^[0-9.]+$/, "Version must only contain numbers and dots"),
  description: z
    .string()
    .min(6, "Description must be at least 6 characters")
    .nonempty("Description is required"),
});
const schemaCreateUser = z.object({
  firstName: z.string().nonempty("First name must be required"),
  lastName: z.string().nonempty("Last name must be required"),

  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  designation: z.string().nonempty("position must be required"),
  roleId: z.number().optional(),
  positionId: z.number().optional(),
  // operatingUnitIds: z.array(z.number()).optional(),
});
const OtpPassword = z.object({
  code: z.number().min(1, "Version Number required"),
});
const schemaCreateCustomer = z.object({
  firstName: z.string().min(1, "first name required is required"),
  lastName: z.string().min(1, "last name required "),
  email: z.string().email("email address should be valid"),
  country: z.string().min(1, "country name is required"),
  phoneNumber: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, {
    message:
      "Invalid phone number format. Please enter a valid international number.",
  }),
  segment: z.enum(["High Value", "Low Value", "Medium Value"]),
  latitude: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^-?\d+(\.\d+)?$/.test(value),
      "must be a number"
    ),
  longitude: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^-?\d+(\.\d+)?$/.test(value),
      "must be a number"
    ),
  creditLimit: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^\d+(\.\d+)?$/.test(value),
      "must be a positive number"
    ),
});

const discountCriteriaSchema = z.object({
  categories: z.array(z.number()).nullable().optional(),
  userIds: z.array(z.number()).nullable().optional(),
  regionIds: z.array(z.number()).optional(),
  productIds: z.array(z.number()).optional(),
  categoryIds: z.array(z.number()).optional(),
  minAmount: z.number().nonnegative(),
});


export enum DiscountTypeEnum {
  Flat = 'Flat',
  Percenatge = 'Percentage',
}

 const discountFormDataSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    type: z.nativeEnum(DiscountTypeEnum),
    amount: z.number().positive("Amount must be greater than 0"),
    criteria: discountCriteriaSchema,
    maxUsage: z.number().int().positive("Max usage must be a positive integer"),

    // Use an array of exactly 2 valid date-strings
    dateRange: z
      .array(
        z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
          message: "Invalid date",
        })
      )
      .length(2, "You must select both start and end date"),
  })
  // Transform the schema output to include "validFrom" and "validTill"
  .transform((data) => {
    const [start, end] = data.dateRange;
    return {
      ...data,
      validFrom: start,
      validTill: end,
    };
  });

const meetingFormSchema = z.object({
  eventType: z
    .string()
    .min(1, "Activity type is required")
    .describe("Type of the activity, e.g., Customer, Architect, Consultant"),
  customerIds: z
    .array(z.number().int().positive("Customer ID must be a positive integer"))
    .nonempty("At least one customer ID is required")
    .describe("List of customer IDs attending the meeting"),
  attendeesIds: z
    .array(z.number().int().positive("Attendee ID must be a positive integer"))
    .nonempty("At least one attendee ID is required")
    .describe("List of attendee IDs attending the meeting"),
  startTime: z
    .string()
    .refine((time) => /^([0-9]{1,2}:[0-9]{2} (AM|PM|am|pm))$/.test(time), {
      message: "Start time must be in the format hh:mm am/pm",
    })
    .describe("Start time of the meeting"),
  endTime: z
    .string()
    .refine((time) => /^([0-9]{1,2}:[0-9]{2} (AM|PM|am|pm))$/.test(time), {
      message: "End time must be in the format hh:mm am/pm",
    })
    .describe("End time of the meeting"),
  date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Date must be in a valid format (YYYY-MM-DD)",
    })
    .describe("Date of the meeting"),
  description: z
    .string()
    .optional()
    .describe("Optional description or details about the meeting"),
  subject: z
    .string()
    .min(5, "Subject is required of at least 5 characters")
    .describe("Subject of the meeting"),
  location: z.string().describe("Location  of the meeting").optional().nullable(),
  // reminder: z
  //   .boolean()
  //   .describe("Indicates whether a reminder is set for the meeting")
  //   .nullable(),
});

// const updateMeetingFormSchema = meetingFormSchema.omit({ reminder: true });

export {
  schema,
  meetingFormSchema,
  // updateMeetingFormSchema,
  schemaForgotPassword,
  schemaCreateTeam,
  complaintFormSchema,
  schemaCreateSurvey,
  schemaCreateUser,
  OtpPassword,
  schemaCreateCustomer,
  discountCriteriaSchema,
  discountFormDataSchema,
};
