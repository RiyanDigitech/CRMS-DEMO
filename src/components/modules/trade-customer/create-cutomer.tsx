// import { notification, Select } from "antd";
// import {
//   useForm,
//   SubmitHandler,
//   Controller,
//   FieldErrors,
// } from "react-hook-form";
// import { Input, Form, Spin } from "antd";
// import "../../../index.css";
// import { errorType } from "@/lib/types";
// import { CreateCustomerDetails } from "@/lib/types/customer";

// import CustomersService from "@/services/customers/customers.service";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { schemaCreateCustomer } from "@/lib/schemas";
// import TextArea from "antd/es/input/TextArea";

// const CreateCustomer = () => {
//   const {
//     control,
//     handleSubmit,
//     reset,
//     // setValue,
//     formState: { errors },
//   } = useForm<CreateCustomerDetails>({
//     resolver: zodResolver(schemaCreateCustomer),
//   });

//   const random9Digit = Math.floor(
//     100000000 + Math.random() * 900000000
//   ).toString();
//   const { useHandleCreateCustomerService } = CustomersService();
//   const { mutate, isPending } = useHandleCreateCustomerService(reset);
//   const onSubmit: SubmitHandler<CreateCustomerDetails> = (data) => {
//     const datas = {
//       ...data,
//       erpId: random9Digit,
//     };
//     console.log("9-Digit Unique Number:", datas);

//     mutate(datas);
//   };

//   const onError = (errors: FieldErrors<errorType>) => {
//     const allRequired = Object.values(errors).every(
//       (error) => error?.message === "Required"
//     );
//     console.log("errors", errors);
//     if (allRequired) {
//       notification.error({
//         message: "Failed",
//         description: "All fields are required",
//         placement: "topRight",
//       });
//     }
//   };

//   return (
//     <div className="bg-white p-3 rounded-lg">
//       <div className="text-lg font-manrope font-semibold">Create-Customer</div>
//       <form onSubmit={handleSubmit(onSubmit, onError)} className=" ">
//         <div className="font-manrope w-full flex flex-col mt-2 border-[1px] border-[#EBF0ED] px-3 pt-3 pb-3 lg:pb-0  lg:pt-2 rounded-lg addusermodal">
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="firstName"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.firstName ? "error" : ""}
//                   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="firstName"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     First Name *
//                   </label>
//                   <Input
//                     {...field}
//                     id="firstName"
//                     placeholder="First Name"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="lastName"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.lastName ? "error" : ""}
//                   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="lastName"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Last Name *
//                   </label>
//                   <Input
//                     {...field}
//                     id="lastName"
//                     placeholder="Last Name"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             {" "}
//             <Controller
//               name="email"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.email ? "error" : ""}
//                   help={errors?.email?.message}
//                 >
//                   <label
//                     htmlFor="email"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Email *
//                   </label>
//                   <Input
//                     {...field}
//                     id="email"
//                     placeholder="a@gmail.com"
//                     type="email"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//             <Controller
//               name="segment"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.segment ? "error" : ""}
//                   help={errors?.segment?.message}
//                 >
//                   <label
//                     htmlFor="segment"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Segment *
//                   </label>

//                   <Select
//                     {...field}
//                     id="segment"
//                     placeholder="High value"
//                     className="w-full  mt-[2px] custom-select h-[38px]"
//                     options={[
//                       { label: "High Value", value: "High Value" },
//                       { label: "Medium Value", value: "Medium Value" },
//                       { label: "Low Value", value: "Low Value" },
//                     ]}
//                   />
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="country"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.country ? "error" : ""}
//                   help={errors?.country?.message}
//                 >
//                   <label
//                     htmlFor="country"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Country *
//                   </label>
//                   <Input
//                     {...field}
//                     id="country"
//                     placeholder="country"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//             <Controller
//               name="phoneNumber"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.phoneNumber ? "error" : ""}
//                   help={errors?.phoneNumber?.message}
//                 >
//                   <label
//                     htmlFor="phonenumber"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     phone Number *
//                   </label>
//                   <Input
//                     {...field}
//                     id="phonenumber"
//                     placeholder="+923346767765"
//                     // type="number"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="city"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   //   validateStatus={errors?.firstName ? "error" : ""}
//                   //   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="city"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     City
//                   </label>
//                   <Input
//                     {...field}
//                     id="city"
//                     placeholder="city"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="customerType"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   //   validateStatus={errors?.lastName ? "error" : ""}
//                   //   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="customertype"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Customer Type
//                   </label>{" "}
//                   <Select
//                     {...field}
//                     id="customertype"
//                     placeholder="Distributor"
//                     className="w-full  mt-[2px] custom-select h-[38px]"
//                     options={[
//                       { label: "Retailer", value: "Retailer" },
//                       { label: "Wholesaler", value: "Wholesaler" },
//                       { label: "Distributor", value: "Distributor" },
//                     ]}
//                   />
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="contactPersonName"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   //   validateStatus={errors?.firstName ? "error" : ""}
//                   //   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="contactperson"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Contact Person
//                   </label>
//                   <Input
//                     {...field}
//                     id="contactperson"
//                     placeholder="contactperson"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//             <Controller
//               name="specialPricingAgreements"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   //   validateStatus={errors?.lastName ? "error" : ""}
//                   //   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="specialpricingagreement"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Special Pricing Agreement
//                   </label>
//                   <Input
//                     {...field}
//                     id="specialpricingagreement"
//                     placeholder="specialpricingagreement"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//           </div>
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="latitude"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.latitude ? "error" : ""}
//                   help={errors?.latitude?.message}
//                 >
//                   <label
//                     htmlFor="latitude"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Latitude
//                   </label>
//                   <Input
//                     {...field}
//                     id="latitude"
//                     placeholder="latitude"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="longitude"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.longitude ? "error" : ""}
//                   help={errors?.longitude?.message}
//                 >
//                   <label
//                     htmlFor="longitude"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Longitude
//                   </label>
//                   <Input
//                     {...field}
//                     id="longitude"
//                     placeholder="longitude"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             {" "}
//             <Controller
//               name="paymentTerms"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   //   validateStatus={errors?.firstName ? "error" : ""}
//                   //   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="paymentterm"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     payment Term
//                   </label>
//                   <Input
//                     {...field}
//                     id="paymentterm"
//                     placeholder="paymentterm"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//             <Controller
//               name="creditLimit"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   //   validateStatus={errors?.firstName ? "error" : ""}
//                   //   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="creditLimit"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     credit Limit
//                   </label>
//                   <Input
//                     {...field}
//                     id="creditLimit"
//                     placeholder="creditLimit"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="cnic"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.firstName ? "error" : ""}
//                   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="cnic"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Cnic #
//                   </label>
//                   <Input
//                     {...field}
//                     id="cnic"
//                     placeholder="cnic"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="ntn"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.lastName ? "error" : ""}
//                   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="ntn"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Ntn #
//                   </label>
//                   <Input
//                     {...field}
//                     id="ntn"
//                     placeholder="ntn"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="province"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.firstName ? "error" : ""}
//                   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="province"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Province
//                   </label>
//                   <Input
//                     {...field}
//                     id="province"
//                     placeholder="province"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="division"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.lastName ? "error" : ""}
//                   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="division"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Division
//                   </label>
//                   <Input
//                     {...field}
//                     id="division"
//                     placeholder="division"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="district"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.firstName ? "error" : ""}
//                   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="district"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     District
//                   </label>
//                   <Input
//                     {...field}
//                     id="district"
//                     placeholder="district"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="postalCode"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.lastName ? "error" : ""}
//                   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="postalCode"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Postal Code
//                   </label>
//                   <Input
//                     {...field}
//                     id="postalCode"
//                     placeholder="postalCode"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="taxInfo"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.firstName ? "error" : ""}
//                   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="taxInfo"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Tax Info
//                   </label>
//                   <Input
//                     {...field}
//                     id="taxInfo"
//                     placeholder="taxInfo"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="preferredComChannel"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.lastName ? "error" : ""}
//                   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="preferredComChannel"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Preferred Com Channel
//                   </label>
//                   <Input
//                     {...field}
//                     id="preferredComChannel"
//                     placeholder="preferredComChannel"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="operatingUnitId"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.firstName ? "error" : ""}
//                   help={errors?.firstName?.message}
//                 >
//                   <label
//                     htmlFor="operatingUnitId"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Operating Unit Id
//                   </label>
//                   <Input
//                     {...field}
//                     id="operatingUnitId"
//                     placeholder="operatingUnitId"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="strnStatus"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.lastName ? "error" : ""}
//                   help={errors?.lastName?.message}
//                 >
//                   <label
//                     htmlFor="strnStatus"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Strn Status
//                   </label>
//                   <Input
//                     {...field}
//                     id="strnStatus"
//                     placeholder="strnStatus"
//                     className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             <Controller
//               name="erpId"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.erpId ? "error" : ""}
//                   help={errors?.erpId?.message}
//                 >
//                   <label
//                     htmlFor="erpId"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     erpId
//                   </label>
//                   <Input
//                     {...field}
//                     id="erpId"
//                     placeholder="e.g: 196742935"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//             <Controller
//               name="address"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.address ? "error" : ""}
//                   help={errors?.address?.message}
//                 >
//                   <label
//                     htmlFor="address"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
//                   >
//                     Address
//                   </label>
//                   <TextArea
//                     {...field}
//                     id="address"
//                     placeholder="address"
//                     className=" bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//           </div>{" "}
//           <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
//             {" "}
//             <Controller
//               name="shippingAddress"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.shippingAddress ? "error" : ""}
//                   help={errors?.shippingAddress?.message}
//                 >
//                   <label
//                     htmlFor="shippingaddress"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Shipping Address
//                   </label>
//                   <TextArea
//                     {...field}
//                     id="shippingaddress"
//                     placeholder="shippingaddress"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />{" "}
//             <Controller
//               name="billingAddress"
//               control={control}
//               render={({ field }) => (
//                 <Form.Item
//                   className="w-full lg:w-[48%] mb-2"
//                   validateStatus={errors?.billingAddress ? "error" : ""}
//                   help={errors?.billingAddress?.message}
//                 >
//                   <label
//                     htmlFor="billingaddress"
//                     className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
//                   >
//                     Billing Addrress
//                   </label>
//                   <TextArea
//                     {...field}
//                     id="billingaddress"
//                     placeholder="billingaddress"
//                     className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
//                   />{" "}
//                 </Form.Item>
//               )}
//             />
//           </div>{" "}
//           <Form.Item className="flex justify-center ">
//             <button
//               className="flex items-center justify-center py-2 px-7 w-full font-bold rounded-lg border-[1px] border-[#f8501a] bg-[#f8501a] text-white hover:bg-[#ff7741] hover:text-[#fafafa] lg:translate-y-2"
//               type="submit"
//               disabled={isPending}
//             >
//               {isPending ? <Spin className="custom-spinner" /> : "Add"}
//             </button>
//           </Form.Item>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCustomer;
