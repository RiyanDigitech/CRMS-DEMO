import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Form, Spin } from "antd";
import "../../index.css";
import { StockTakeCreate, StockTakeModalProps } from "@/lib/types/stock-take";
import StockTakeService from "@/services/stock-take/stock-take.service";
import ProductService from "@/services/product.service";
import LocationService from "@/services/Location/location";
const StockTakeCreateModal: React.FC<StockTakeModalProps> = ({
  isOpen,
  onClose,
  editData,
}) => {
  const { control, handleSubmit, reset } = useForm<StockTakeCreate>();
  const [limit] = useState<number>(1000000);
  const [page] = useState<number>(1);
  const [query, setUsersQuery] = useState<string | undefined>(undefined);

  const { useFetchAllProducts } = ProductService();
  const { useHandleCreateStockTakeService, useHandleUpdateStockTakeService } =
    StockTakeService();
  const { mutate: createMutate, isPending } = useHandleCreateStockTakeService(
    reset,
    onClose
  );
  const { useFetchAllLocations } = LocationService();
  const { data: locationData } = useFetchAllLocations();
  const { data: productData, isFetching: isProductDataLoading } =
    useFetchAllProducts(limit, page, query);
  const cities = locationData?.data.map((item) => item.city);

  useEffect(() => {
    if (editData) {
      reset({
        stockTake: editData?.stockTake,
        stockStatus: editData?.stockStatus,
        location: editData?.location,
      });
    }
  }, [editData, reset]);
  const { mutate: updateMutate, isPending: isUserUpdatePending } =
    useHandleUpdateStockTakeService(reset, editData?.id);
  const onSubmit: SubmitHandler<StockTakeCreate> = (data) => {
    if (editData) {
      updateMutate(data);
    } else {
      createMutate(data);
    }
  };
  console.log("locationData", setUsersQuery);
  const statusEnum = ["Manual Counting", "Barcode Scanning"];
  return (
    <>
      <Modal
        footer={null}
        title="Create New"
        open={isOpen}
        onCancel={onClose}
        className=" "
      >
        {" "}
        {isProductDataLoading ? (
          <Spin />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className=" ">
            <div className="font-manrope w-full flex flex-col mt-2 border-[1px] border-[#EBF0ED] px-3 pt-3 pb-3 lg:pb-0  lg:pt-2 rounded-lg addusermodal">
              <Controller
                name="stockTake"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:mb-4"
                    // validateStatus={errors?.stocktake ? "error" : ""}
                    // help={errors?.stocktake?.message}
                  >
                    <label
                      htmlFor="stockTake"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Stock Take
                    </label>

                    <Select
                      placeholder="Stock Take"
                      id="stockTake"
                      {...field}
                      className="custom-select h-[38px] w-full mt-1"
                      options={productData?.data.map((data) => ({
                        label: data?.sku, // Jo dikhana hai
                        value: data?.sku, // Jo select hoga
                      }))}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="stockStatus"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    className="w-full lg:mb-4"
                    // validateStatus={errors?.stockStatus ? "error" : ""}
                    // help={errors?.stockStatus?.message}
                  >
                    <label
                      htmlFor="stockStatus"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Stock Take Type
                    </label>{" "}
                    <Select
                      placeholder="Stock Status"
                      id="stockStatus"
                      {...field}
                      className="custom-select h-[38px] w-full mt-1"
                      options={statusEnum?.map((data) => ({
                        label: data, // Jo dikhana hai
                        value: data, // Jo select hoga
                      }))}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Form.Item className="w-full lg:mb-4">
                    <label
                      htmlFor="location"
                      className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                    >
                      Location
                    </label>
                    <Select
                      placeholder="location"
                      id="location"
                      {...field}
                      className="custom-select h-[38px] w-full mt-1"
                      options={cities?.map((data) => ({
                        label: data,
                        value: data,
                      }))}
                    />{" "}
                  </Form.Item>
                )}
              />
              <Form.Item className="flex justify-end font-manrope">
                <button className=" py-2 px-7 mr-1  font-semibold rounded-lg border-[1px] border-[#EBF0ED] bg-[#FAFAFA] text-[#008444]  ">
                  Cancel
                </button>{" "}
                <button
                  className=" py-2 px-7  font-semibold rounded-lg border-[1px] border-[#FF8548] bg-[#FF8548] text-white hover:bg-[#ff7741] hover:text-[#fafafa] "
                  type="submit"
                  disabled={isPending}
                >
                  {isPending || isUserUpdatePending ? (
                    <Spin className="custom-spinner" />
                  ) : editData ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </Form.Item>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default StockTakeCreateModal;
