import { notification, Select } from "antd";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Input, Form, Spin } from "antd";
import "../../index.css";
import { errorType } from "@/lib/types";

import {
  CreateCustomerDetails,
  createCustomerNote,
  UpdateCustomerDetails,
} from "@/lib/types/customer";
import { useParams } from "react-router-dom";
import CustomersService from "@/services/customers/customers.service";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CustomerAddressForm from "@/components/modules/trade-customer/customer-address-form";
import CustomerGeneralInformationForm from "@/components/modules/trade-customer/customer-general-information-form";

export interface Note {
  id: number;
  note: string;
}

const CustomerEditProfile = () => {
  const { id } = useParams();
  const [limit] = useState<number>(2);
  const [page] = useState<number>(1);
  const [deleteNotesId, setDeleteNotesId] = useState<number>(0);
  const numericId = id ? parseInt(id) : undefined;

  const {
    useFetchTargetedCustomer,
    useHandleUpdateCustomerService,
    useHandleCreateCustomerNoteService,
    useHandleDeleteCustomerNotes,
  } = CustomersService();
  const {
    data: selectedCustomerData,
    isLoading: isCustomerDataLoading,
    refetch,
  } = useFetchTargetedCustomer(numericId, limit, page);

  const {
    control,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<UpdateCustomerDetails>({});

  const {
    control: control1,
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm<createCustomerNote>({});
  const { mutate, isPending } = useHandleUpdateCustomerService(
    reset,
    numericId
  );
  const {
    mutate: DeleteCustomerNotesMuatate,
    isPending: isCustomerNotesMuatate,
  } = useHandleDeleteCustomerNotes(deleteNotesId);
  const { mutate: createCustomerNotes, isPending: isCreatedCustomerPending } =
    useHandleCreateCustomerNoteService(reset1);
  const onSubmit: SubmitHandler<CreateCustomerDetails> = (data) => {
    const editedFields = Object.keys(dirtyFields).reduce(
      (acc, key) => ({
        ...acc,
        [key]: data[key as keyof CreateCustomerDetails],
      }),
      {} as Partial<CreateCustomerDetails>
    );

    mutate(editedFields);
  };

  const onSubmit1: SubmitHandler<createCustomerNote> = (data) => {
    const datas = { note: data?.note, customer: numericId };
    createCustomerNotes(datas);
  };
  const onError = (errors: FieldErrors<errorType>) => {
    const allRequired = Object.values(errors).every(
      (error) => error?.message === "Required"
    );
    console.log("errors", errors);
    if (allRequired) {
      notification.error({
        message: "Failed",
        description: "All fields are required",
        placement: "topRight",
      });
    }
  };
  useEffect(() => {
    if (selectedCustomerData?.data) {
      const formData = Object.fromEntries(
        Object.entries(selectedCustomerData?.data).map(([key, value]) => [
          key,
          value ?? "",
        ])
      ) as Partial<UpdateCustomerDetails>; // Ensure correct type

      reset(formData);
    }
  }, [selectedCustomerData, reset]);

  console.log(selectedCustomerData?.data, "selectedcustomerdata");
  const handleDelete = (id: number) => {
    console.log("id deleted customer geted", id);
    setDeleteNotesId(id);
    DeleteCustomerNotesMuatate(undefined, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <>
      {isCustomerDataLoading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-between lg:flex-row">
          <div className="left w-[100%] lg:w-[29%] ">
            {" "}
            <div className=" bg-white p-6 rounded-lg font-manrope">
              <h2 className="text-xl font-bold mb-4 text-[#18120f]">
                My Profile
              </h2>
              <div className="flex items-center mb-6  lg:translate-x-[-7px]  ">
                <div className="w-20 h-20 rounded-full relative ">
                  {" "}
                  <img
                    src={"/logo.png"}
                    alt="Profile"
                    className="h-full w-full rounded-full "
                    onLoad={(e) =>
                      URL.revokeObjectURL((e.target as HTMLImageElement).src)
                    }
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-[#18120f]">
                    {selectedCustomerData?.data?.name}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm">Customer</p>
                </div>
              </div>
              <div className="flex justify-between border-b-[1px] pb-3 mt-3">
                <div className="text-[#6B6B6B] w-fit">Full Name:</div>
                <div className="text-[#18120f] ">
                  {selectedCustomerData?.data?.name}{" "}
                </div>
              </div>
              <div className="flex justify-between border-b-[1px] pb-3 mt-4  w-full">
                <div className="text-[#6B6B6B] w-fit">Email :</div>
                <div className="text-[#18120f] text-sm w-9/12 text-right  break-words">
                  {selectedCustomerData?.data?.email
                    ? selectedCustomerData?.data?.email
                    : "-"}
                </div>
              </div>{" "}
              <div className="flex justify-between border-b-[1px] pb-3 mt-4  w-full">
                <div className="text-[#6B6B6B] w-fit">Phone Number :</div>
                <div className="text-[#18120f] text-sm w-fit text-right  break-words">
                  {selectedCustomerData?.data?.phoneNumber
                    ? selectedCustomerData?.data?.phoneNumber
                    : "-"}
                </div>
              </div>{" "}
            </div>
            <form
              onSubmit={handleSubmit1(onSubmit1, onError)}
              className="bg-white py-4 px-3 mt-5 rounded-lg font-manrope"
            >
              <Controller
                name="note"
                control={control1}
                render={({ field }) => (
                  <Form.Item className="w-full  mb-2">
                    <label
                      htmlFor="note"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Notes On Customer
                    </label>
                    <TextArea
                      {...field}
                      disabled={true} // Readonly jaisa behavior
                      // defaultValue={
                      //   selectedCustomerData?.data?.notes[0]?.note || ""
                      // }
                      id="note"
                      rows={4}
                      placeholder="customer note..."
                      className=" w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                    />{" "}
                  </Form.Item>
                )}
              />{" "}
              <Form.Item className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="bg-[#ff8548] p-2 rounded-lg text-white hover:bg-[#f79359]"
                  disabled={isCreatedCustomerPending}
                >
                  {isCreatedCustomerPending ? (
                    <>
                      <Spin className="custom-spinner" />
                    </>
                  ) : (
                    "Add Note"
                  )}
                </button>
              </Form.Item>
              {selectedCustomerData?.data?.notes?.map(
                (data: Note, index: number) => (
                  <>
                    <div
                      key={index}
                      className="border-b-[1px] mb-6  w-full break-words "
                    >
                      <div className="mb-2"> {data?.note}</div>
                      <div
                        onClick={() => handleDelete(data.id)}
                        className="flex justify-end cursor-pointer pb-2"
                      >
                        {isCustomerNotesMuatate && data.id === deleteNotesId ? (
                          <Spin />
                        ) : (
                          <>
                            {" "}
                            <img src="/Delete.png" alt="" />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )
              )}
            </form>
          </div>
          <div className="right bg-white   lg:w-[69%] right  rounded-lg p-2 lg:p-6">
            <div className="font-manrope text-lg font-semibold">
              Customer-Edit-Profile
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)} className=" ">
              <div className="font-manrope w-full flex flex-col mt-2 border-[1px] border-[#EBF0ED] px-3 pt-3 pb-3 lg:pb-3  lg:pt-2 rounded-lg addusermodal">
                <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.name ? "error" : ""}
                        help={errors?.name?.message}
                      >
                        <label
                          htmlFor="name"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Name
                        </label>
                        <Input
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="name"
                          placeholder="Name"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                  <Controller
                    name="classification"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.classification ? "error" : ""}
                        help={errors?.classification?.message}
                      >
                        <label
                          htmlFor="classification"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Classification
                        </label>
                        <Input
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="classification"
                          placeholder="classification"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />
                </div>
                <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
                  {" "}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.email ? "error" : ""}
                        help={errors?.email?.message}
                      >
                        <label
                          htmlFor="email"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Email
                        </label>
                        <Input
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="email"
                          placeholder="Email"
                          type="email"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                  <Controller
                    name="segment"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.segment ? "error" : ""}
                        help={errors?.segment?.message}
                      >
                        <label
                          htmlFor="segment"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Segment
                        </label>
                        <Input
                          {...field}
                          // readOnly={true}
                          disabled={true} // Readonly jaisa behavior
                          id="segment"
                          placeholder="Segment"
                          type="text"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                </div>
                <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.phoneNumber ? "error" : ""}
                        help={errors?.phoneNumber?.message}
                      >
                        <label
                          htmlFor="phonenumber"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Phone Number
                        </label>
                        <Input
                          {...field}
                          readOnly={true}
                          disabled={true} // Readonly jaisa behavior
                          id="phonenumber"
                          placeholder="Phone Number"
                          // type="number"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                  <Controller
                    name="customerType"
                    control={control}
                    render={({ field }) => (
                      <Form.Item className="w-full lg:w-[48%] mb-2">
                        <label
                          htmlFor="customerType"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                        >
                          Customer Type
                        </label>
                        <Select
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="customerType"
                          placeholder="Select Customer Type"
                          className="custom-select h-[38px]   mt-[3px] w-full"
                          onChange={(value) => field.onChange(value)} // React Hook Form ke field value update karega
                        >
                          <Select.Option value="Retailer">
                            Retailer
                          </Select.Option>
                          <Select.Option value="Wholesaler">
                            Wholesaler
                          </Select.Option>
                          <Select.Option value="Distributor">
                            Distributor
                          </Select.Option>
                        </Select>{" "}
                      </Form.Item>
                    )}
                  />{" "}
                </div>{" "}
                <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
                  {" "}
                  <Controller
                    name="paymentTerms"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.paymentTerms ? "error" : ""}
                        help={errors?.paymentTerms?.message}
                      >
                        <label
                          htmlFor="paymentTerms"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Payment Term
                        </label>
                        <Input
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="paymentTerms"
                          placeholder="Payment Terms"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                  <Controller
                    name="creditLimit"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.creditLimit ? "error" : ""}
                        help={errors?.creditLimit?.message}
                      >
                        <label
                          htmlFor="creditLimit"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Credit Limit
                        </label>
                        <Input
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="creditLimit"
                          placeholder="Credit Limit"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                </div>
                <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
                  {" "}
                  <Controller
                    name="shippingAddress"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.shippingAddress ? "error" : ""}
                        help={errors?.shippingAddress?.message}
                      >
                        <label
                          htmlFor="shippingAddress"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Shipping Address
                        </label>
                        <Input
                          {...field}
                          id="shippingAddress"
                          disabled={true} // Readonly jaisa behavior
                          placeholder="Shipping Address"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                  <Controller
                    name="billingAddress"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.billingAddress ? "error" : ""}
                        help={errors?.billingAddress?.message}
                      >
                        <label
                          htmlFor="billingAddress"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Billing Addrress
                        </label>
                        <Input
                          {...field}
                          id="billingAddress"
                          disabled={true} // Readonly jaisa behavior
                          placeholder="Billing Address"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />
                </div>
                <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
                  <Controller
                    name="contactPersonName"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={
                          errors?.contactPersonName ? "error" : ""
                        }
                        help={errors?.contactPersonName?.message}
                      >
                        <label
                          htmlFor="contactPersonName"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Contact Person
                        </label>
                        <Input
                          {...field}
                          id="contactPersonName"
                          disabled={true} // Readonly jaisa behavior
                          placeholder="Contact PersonName"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                  <Controller
                    name="specialPricingAgreements"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={
                          errors?.specialPricingAgreements ? "error" : ""
                        }
                        help={errors?.specialPricingAgreements?.message}
                      >
                        <label
                          htmlFor="specialPricingAgreements"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                        >
                          Special Pricing Agreement
                        </label>
                        <Input
                          {...field}
                          id="specialPricingAgreements"
                          disabled={true} // Readonly jaisa behavior
                          placeholder="Special Pricing Agreements"
                          className="h-[38px] bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />
                </div>
                <div className="flex  items-center w-full flex-col lg:flex-row ">
                  <Controller
                    name="operatingUnitId"
                    control={control}
                    render={({ field }) => (
                      <Form.Item
                        className="w-full lg:w-[48%] mb-2"
                        validateStatus={errors?.operatingUnitId ? "error" : ""}
                        help={errors?.operatingUnitId?.message}
                      >
                        <label
                          htmlFor="operatingUnitId"
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                        >
                          Operating Unit Id
                        </label>
                        <Input
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="operatingUnitId"
                          placeholder="Pperating Unit Id"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />{" "}
                      </Form.Item>
                    )}
                  />{" "}
                  {/* <Form.Item className="flex justify-center items-center mx-auto translate-y-5">
                    <button
                      className={`flex items-center justify-center py-2 px-7 w-full font-bold rounded-lg border-[1px] "
                   ${
                     !isDirty
                       ? "bg-gray-100 cursor-default text-[#a7a6a6]"
                       : "border-[#ff8548] bg-[#ff8548] text-white"
                   }`}
                      disabled={!isDirty}
                      type="submit"
                    >
                      {isPending ? (
                        <Spin className="custom-spinner" />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </Form.Item> */}
                </div>
              </div>
            </form>{" "}
            <div className="w-full mt-12">
              <CustomerGeneralInformationForm
                selectedCustomerData={selectedCustomerData?.data}
              />
            </div>
            <div className="w-full mt-8">
              <CustomerAddressForm
                selectedCustomerData={selectedCustomerData?.data}
              />
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default CustomerEditProfile;
