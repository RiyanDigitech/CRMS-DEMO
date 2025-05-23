import { useEffect, useState, useCallback } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, Form, Spin } from "antd";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import CustomersService from "@/services/customers/customers.service";
import { Libraries } from "@googlemaps/js-api-loader";
import { CreateCustomerDetails } from "@/lib/types/customer";
const libraries: Libraries = ["places"];

const CustomerAddressForm = ({
  selectedCustomerData,
}: {
  selectedCustomerData: CreateCustomerDetails;
}) => {
  const { id } = useParams();
  const numericId = id ? parseInt(id) : undefined;
  const { useHandleUpdateCustomerService } = CustomersService();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm<CreateCustomerDetails>();
  const { mutate, isPending } = useHandleUpdateCustomerService(
    reset,
    numericId
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // Populate form with initial data
  useEffect(() => {
    if (selectedCustomerData) {
      reset(selectedCustomerData);
    }
  }, [selectedCustomerData, reset]);

  const handlePlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components || [];
      console.log("Address Components:", addressComponents); // Log the address components for debugging

      const updatedData: Partial<CreateCustomerDetails> = {
        address: place.formatted_address || "",
        city: "",
        district: "",
        province: "",
        country: "",
        postalCode: "", // Ensure postalCode is initialized
        latitude: "",
        longitude: "",
        division: "", // Initialize division
      };

      addressComponents.forEach((component) => {
        const types = component.types;
        if (types.includes("locality")) updatedData.city = component.long_name;
        if (types.includes("administrative_area_level_2"))
          updatedData.district = component.long_name;
        if (types.includes("administrative_area_level_1"))
          updatedData.province = component.long_name;
        if (types.includes("country"))
          updatedData.country = component.long_name;
        if (types.includes("postal_code"))
          updatedData.postalCode = component.long_name; // Capture postal code if available
        if (types.includes("administrative_area_level_1")) {
          updatedData.division = component.long_name;
        }
        if (types.includes("sublocality_level_1")) {
          updatedData.town = component.long_name; // 🆕 Extract town name
        }
      });

      // Extract latitude and longitude
      if (place.geometry?.location) {
        updatedData.latitude = place.geometry.location.lat().toFixed(6);
        updatedData.longitude = place.geometry.location.lng().toFixed(6);
      }

      // Update form values
      Object.entries(updatedData).forEach(([key, value]) => {
        setValue(key as keyof CreateCustomerDetails, value as string);
      });
    }
  }, [autocomplete, setValue]);

  // const onSubmit: SubmitHandler<CreateCustomerDetails> = (data) => {
  //   mutate(data);
  // };
  const onSubmit: SubmitHandler<CreateCustomerDetails> = (data) => {
    // Extract only the required fields
    const filteredData: Partial<CreateCustomerDetails> = {
      address: data?.address,
      district: data?.district,
      division: data?.division,
      city: data?.city,
      country: data?.country,
      latitude: data?.latitude,
      longitude: data?.longitude,
      province: data?.province,
      postalCode: data?.postalCode,
    };
    mutate(filteredData);
  };

  return (
    <div className="w-full flex flex-col justify-between lg:flex-row">
      <div className="right bg-white rounded-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="font-manrope w-full flex flex-col mt-6 border-[1px] border-[#EBF0ED] px-3 pt-3 pb-3 lg:pb-3 lg:pt-2 rounded-lg">
            <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
              {/* Google Maps Autocomplete */}
              {isLoaded && (
                <Autocomplete
                  onLoad={(auto) => setAutocomplete(auto)}
                  onPlaceChanged={handlePlaceChanged}
                  className="w-full "
                >
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Form.Item className="w-full mb-2 ">
                        <label
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <Input
                          {...field}
                          disabled={true} // Readonly jaisa behavior
                          id="address"
                          onBlur={handlePlaceChanged} // Trigger place change on blur (keyboard select)
                          placeholder="Search address"
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />
                      </Form.Item>
                    )}
                  />
                </Autocomplete>
              )}
            </div>

            {[
              ["country", "district"],
              ["city", "division"],
              ["province", "latitude"],
              ["longitude", "postalCode"],
            ].map((pair, index) => (
              <div
                key={index}
                className="flex justify-between w-full flex-col lg:flex-row lg:mb-2"
              >
                {pair.map((fieldName) => (
                  <Controller
                    key={fieldName}
                    name={fieldName as keyof CreateCustomerDetails}
                    control={control}
                    render={({ field }) => (
                      <Form.Item className="w-full lg:w-[48%] mb-2">
                        <label
                          className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                          htmlFor={fieldName}
                        >
                          {fieldName.charAt(0).toUpperCase() +
                            fieldName.slice(1)}
                        </label>
                        <Input
                          disabled={true} // Readonly jaisa behavior
                          {...field}
                          id={fieldName}
                          value={field.value ? String(field.value) : ""}
                          placeholder={`Enter ${fieldName}`}
                          className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        />
                      </Form.Item>
                    )}
                  />
                ))}
              </div>
            ))}

            {/* <Form.Item className="flex justify-center items-center mx-auto translate-y-3">
              <button
                className={`flex items-center justify-center py-2 px-7 w-full font-bold rounded-lg border-[1px] ${
                  !isDirty
                    ? "bg-gray-100 cursor-default text-[#a7a6a6]  "
                    : "border-[#ff8548] bg-[#ff8548] text-white"
                }`}
                disabled={!isDirty}
                type="submit"
              >
                {isPending ? <Spin className="custom-spinner" /> : "Update"}
              </button>
            </Form.Item> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerAddressForm;
