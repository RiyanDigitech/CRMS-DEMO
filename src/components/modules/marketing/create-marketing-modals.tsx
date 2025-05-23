import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Spin, DatePicker, Select, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import moment from "moment";
import FileUploader from "./file-uploader";
import { MarketingType, createMarketingType } from "@/lib/types/marketing";
import { CreateModalProps } from "@/lib/types/customer";
import MarketingService from "@/services/marketing/marketing.service";
import { BaseButton } from "@/components/ui/base-button";

const { TextArea } = Input;

interface MarketingCreateModalProps extends CreateModalProps {
  /**
   * If present, the modal is in Edit Mode. Otherwise, it's in Create Mode.
   */
  editRecord?: MarketingType | null;
}

const MarketingCreateModal: React.FC<MarketingCreateModalProps> = ({
  isOpen,
  onClose,
  editRecord,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MarketingType>();

  // Decide if we are in edit mode or create mode
  const isEditMode = !!editRecord;

  // Services
  const { useHandleCreateMarketingService, useHandleUpdateMarketingService } =
    MarketingService();

  // Create mutation
  const {
    mutate: handleCreateMarketing,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useHandleCreateMarketingService(() => reset());

  // Update mutation
  const {
    mutate: handleUpdateMarketing,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useHandleUpdateMarketingService(editRecord?.id, () => reset());

  // FILE MANAGEMENT:
  // ------------------------------------------------------------------
  // 1) 'filesFromServer' represents the "server attachments"
  //    as an array of UploadFile objects. This will fill
  //    the Dragger with existing attachments.
  // 2) 'newFiles' will store the newly uploaded files (File objects).
  // 3) We combine them into a single 'fileList' for Dragger.
  // ------------------------------------------------------------------
  const [filesFromServer, setFilesFromServer] = useState<UploadFile[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // Helper to convert a URL into an UploadFile
  const convertUrlToUploadFile = (url: string, index: number): UploadFile => {
    // Extract a filename from the URL if you wish
    const fileName = url.split("/").pop() || `File-${index}`;

    return {
      uid: String(index),
      name: fileName,
      status: "done",
      url, // so Dragger can display a link/preview
    };
  };

  // If editing, pre-populate the form and the attachments
  useEffect(() => {
    if (isEditMode && editRecord && isOpen) {
      // Set form fields
      setValue("heading", editRecord.heading);
      setValue("description", editRecord.description);
      setValue("startDate", editRecord.startDate);
      setValue("endDate", editRecord.endDate);
      setValue("type", editRecord.type);

      // Convert existing attachment URLs to UploadFile objects
      if (editRecord.attachments && editRecord.attachments.length > 0) {
        const existingFiles = editRecord.attachments.map((url, idx) =>
          convertUrlToUploadFile(url, idx)
        );
        setFilesFromServer(existingFiles);
      }
    }
  }, [editRecord, isOpen]);

  // If successful create or update, close the modal
  useEffect(() => {
    if ((isEditMode && isUpdateSuccess) || (!isEditMode && isCreateSuccess)) {
      reset();
      onClose();
    }
  }, [isUpdateSuccess, isCreateSuccess]);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      reset();
      setFilesFromServer([]);
      setNewFiles([]);
    }
  }, [isOpen]);

  // Called when user clicks "Cancel"
  const handleCancel = () => {
    onClose();
    reset();
    setFilesFromServer([]);
    setNewFiles([]);
  };

  // Called when form is submitted
  const onSubmit: SubmitHandler<createMarketingType> = (data) => {
    const formData = new FormData();
    formData.append("heading", data.heading);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("description", data.description);
    formData.append("type", data.type);
    // formData.append("tags", data.tags);

    // 1) Append newly uploaded files
    newFiles.forEach((file) => {
      formData.append("attachments", file);
    });

    // 2) Potentially handle existing attachments
    //    If your backend requires you to re-send the original attachments
    //    or a "keep these files" array, you might do something like:
    //
    // filesFromServer.forEach((file) => {
    //   if (file.url) formData.append("existingUrls", file.url);
    // });

    // CREATE or UPDATE
    if (isEditMode && editRecord?.id) {
      handleUpdateMarketing(formData);
    } else {
      handleCreateMarketing(formData);
    }
  };

  // ------------------------------------------------------------------
  // Combine the existing attachments and newly uploaded files
  // into one array of UploadFile for Dragger.
  // For newly uploaded files, we can store them in 'newFiles' state.
  // ------------------------------------------------------------------
  // We pass this combined list to Dragger below:
  const combinedFileList: UploadFile[] = [
    ...filesFromServer,
    // Convert each File in 'newFiles' to a minimal UploadFile object
    ...newFiles.map((file, idx) => ({
      uid: `new-${idx}`,
      name: file.name,
      status: "done",
      originFileObj: file,
    })),
  ];

  // This is called whenever user adds or removes files in Dragger
  // We want to split them into "existing" vs "new" again
  const handleDraggerChange = (updatedFileList: UploadFile[]) => {
    // 1) Separate existing server files from newly added
    const serverFiles: UploadFile[] = [];
    const newFileObjs: File[] = [];

    updatedFileList.forEach((file) => {
      if (file.url) {
        // means it's an existing file from server
        serverFiles.push(file);
      } else if (file.originFileObj) {
        // newly uploaded file
        newFileObjs.push(file.originFileObj as File);
      }
    });

    setFilesFromServer(serverFiles);
    setNewFiles(newFileObjs);
  };

  return (
    <Modal
      footer={null}
      title={isEditMode ? "Edit Marketing" : "Create New"}
      open={isOpen}
      onCancel={handleCancel}
      destroyOnClose
      className="top-1 lg:top-3"
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div className="font-manrope w-full flex flex-col mt-2 pt-3 pb-3 lg:pb-0 lg:pt-2 rounded-lg ">
          {/* Heading */}
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2">
            <Controller
              name="heading"
              control={control}
              rules={{
                required: "Heading is required",
                minLength: {
                  value: 3,
                  message: "Heading must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Heading cannot exceed 100 characters",
                },
              }}
              render={({ field }) => (
                <Form.Item
                  className="w-full mb-2"
                  validateStatus={errors.heading ? "error" : ""}
                  help={errors.heading?.message}
                >
                  <label
                    htmlFor="heading"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    NAME
                  </label>
                  <Input
                    {...field}
                    id="heading"
                    placeholder="Campaign Title"
                    className="h-[38px] w-full  border-[1px] border-[#EBF0ED] mt-[3px]"
                  />
                </Form.Item>
              )}
            />
          </div>
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-2 items-center">
            {/* <Controller
              name="tags"
              control={control}
              rules={{
                required: "tags is required",
                minLength: {
                  value: 3,
                  message: "tags must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "tags cannot exceed 100 characters",
                },
              }}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%] mb-2"
                  validateStatus={errors.tags ? "error" : ""}
                  help={errors.tags?.message}
                >
                  <label
                    htmlFor="tags"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                  >
                    Tags
                  </label>
                  <Input
                    {...field}
                    id="tags"
                    placeholder="Tags"
                    className="h-[38px] w-full  border-[1px] border-[#EBF0ED] mt-2"
                  />
                </Form.Item>
              )}
            />{" "}
            <Controller
              name="targetaudience"
              control={control}
              rules={{
                required: "targetaudience is required",
                minLength: {
                  value: 3,
                  message: "targetaudience must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "targetaudience cannot exceed 100 characters",
                },
              }}
              render={({ field }) => (
                <Form.Item
                  className="w-full lg:w-[48%]  mt-3"
                  validateStatus={errors.targetaudience ? "error" : ""}
                  help={errors.targetaudience?.message}
                >
                  <label
                    htmlFor="targetaudience"
                    className="text-[13px] text-[#6B6B6B] font-manrope font-semibold "
                  >
                    Target Audience
                  </label>
                  <Select
                    {...field}
                    value={field.value || undefined}
                    placeholder="Select targetaudience"
                    className="h-[40px] mt-2"
                  >
                    <Select.Option value="Professionals">
                      Professionals
                    </Select.Option>
                    <Select.Option value="High-income">
                      High-income
                    </Select.Option>
                    <Select.Option value="Millennials">
                      Millennials
                    </Select.Option>
                    <Select.Option value="Seasonal Campaign">
                      Seasonal Campaign
                    </Select.Option>
                  </Select>
                </Form.Item>
              )}
            />{" "} */}
            {/* <Controller
              name="targetaudience"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Target Audience"
                  validateStatus={errors.targetaudience ? "error" : ""}
                  help={errors.targetaudience?.message}
                  className="w-full lg:w-[48%]"
                >
                  <Select
                    {...field}
                    value={field.value || undefined}
                    placeholder="Select targetaudience"
                    className="custom-select "
                  >
                    <Select.Option value="Social Media Compaign">
                      Social Media Compaign
                    </Select.Option>
                    <Select.Option value="Email Marketing Campaign">
                      Email Marketing Campaign
                    </Select.Option>
                    <Select.Option value="Event Marketing Campaign">
                      Event Marketing Campaign
                    </Select.Option>
                    <Select.Option value="Seasonal Campaign">
                      Seasonal Campaign
                    </Select.Option>
                  </Select>
                </Form.Item>
              )}
            /> */}
          </div>
          {/* File Uploader */}
          {/* We pass the combinedFileList and the handleDraggerChange callback */}
          <FileUploader
            fileList={combinedFileList}
            onFileListChange={handleDraggerChange}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            }}
            render={({ field }) => (
              <Form.Item
                className="w-full mb-2 mt-3"
                validateStatus={errors.description ? "error" : ""}
                help={errors.description?.message}
              >
                <label
                  htmlFor="description"
                  className="text-[13px] text-[#6B6B6B] font-manrope font-semibold"
                >
                  DESCRIPTION*
                </label>
                <TextArea
                  className=" py-1 border border-[#EBF0ED] rounded-[10px] mt-1"
                  rows={4}
                  {...field}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Activity Type"
                validateStatus={errors.type ? "error" : ""}
                help={errors.type?.message}
              >
                <Select
                  {...field}
                  value={field.value || undefined}
                  placeholder="Select type"
                  className="custom-select"
                >
                  {/* <Select.Option value="Social Media Compaign">
                    Social Media Compaign
                  </Select.Option>
                  <Select.Option value="Email Marketing Campaign">
                    Email Marketing Campaign
                  </Select.Option>
                  <Select.Option value="Event Marketing Campaign">
                    Event Marketing Campaign
                  </Select.Option>
                  <Select.Option value="Seasonal Campaign">
                    Seasonal Campaign
                  </Select.Option> */}
                  <Select.Option value="media">media</Select.Option>
                  <Select.Option value="text">text</Select.Option>
                  <Select.Option value="html">html</Select.Option>
                </Select>
              </Form.Item>
            )}
          />

          {/* Dates */}
          <div className="flex justify-between w-full flex-col lg:flex-row lg:mb-[14px] gap-3">
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <Form.Item className="w-full mb-5">
                  <label
                    htmlFor="startdate"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    Start Date
                  </label>
                  <DatePicker
                    {...field}
                    placeholder="Day, month, year"
                    id="startdate"
                    style={{ width: "100%", height: "38px" }}
                    className="bg-[#fafafa] mt-1"
                    value={
                      field.value ? moment(field.value, "YYYY-MM-DD") : null
                    }
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : null);
                    }}
                    disabledDate={(current) =>
                      current && current < moment().startOf("day")
                    }
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </Form.Item>
              )}
            />

            <Controller
              name="endDate"
              control={control}
              rules={{ required: "End date is required" }}
              render={({ field }) => (
                <Form.Item className="w-full mb-5">
                  <label
                    htmlFor="enddate"
                    className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[18px]"
                  >
                    End Date
                  </label>
                  <DatePicker
                    {...field}
                    id="enddate"
                    placeholder="Day, month, year"
                    style={{ width: "100%", height: "38px" }}
                    className="bg-[#fafafa] mt-1"
                    value={
                      field.value ? moment(field.value, "YYYY-MM-DD") : null
                    }
                    onChange={(date) => {
                      field.onChange(date ? date.format("YYYY-MM-DD") : null);
                    }}
                    disabledDate={(current) =>
                      current && current < moment().startOf("day")
                    }
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.endDate.message}
                    </p>
                  )}
                </Form.Item>
              )}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2">
            <Form.Item>
              <BaseButton
                type="button"
                onClick={handleCancel}
                variant={"outline"}
                size={"lg"}
              >
                Cancel
              </BaseButton>
            </Form.Item>

            <Form.Item>
              <BaseButton
                type="submit"
                disabled={isCreatePending || isUpdatePending}
                variant={"default"}
                size={"lg"}
              >
                {isCreatePending || isUpdatePending ? (
                  <Spin />
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </BaseButton>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default MarketingCreateModal;
