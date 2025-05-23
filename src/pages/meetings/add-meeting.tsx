import type React from "react";
import { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Modal,
  Space,
  Spin,
} from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { meetingFormSchema } from "@/lib/schemas/index";

import MeetingService from "@/services/meetings/meetings.service";
import { useNavigate } from "react-router-dom";
import {
  AddMeetingFormProps,
  MeetingFormData,
  meetingType,
} from "@/lib/types/meeting";
import dayjs from "dayjs";
import CustomersService from "@/services/customers/customers.service";
import UsersService from "@/services/users/user.service";
import moment from "moment";
import { BaseButton } from "@/components/ui/base-button";

const { TextArea } = Input;

const {
  useHandleCreateMeeting,
  useHandleUpdateMeeting,
  useFetchMeetingById,
  useHandleDeleteMeeting,
} = MeetingService();

const { useFetchAllCustomers } = CustomersService();
const { useFetchAllUsers } = UsersService();

const AddMeetingForm: React.FC<AddMeetingFormProps> = ({
  onSubmit,
  meetingId,
  onCloseDrawer,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<MeetingFormData>();
  const { data: meetingData, isLoading: isMeetingDataLoading } =
    useFetchMeetingById(meetingId ? Number(meetingId) : null);
  const isEditMode = !!meetingId;
  // const schema = isEditMode ? updateMeetingFormSchema : meetingFormSchema;

  const { data: customerData } = useFetchAllCustomers(100000, 1);
  const { data: userData } = useFetchAllUsers(100000, 1);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      eventType: "",
      customerIds: [],
      attendeesIds: [],
      startTime: "",
      endTime: "",
      date: "",
      description: "",
      subject: "",
      location: "",
      // reminder: false,
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      reset();
    } else if (meetingData?.data && isEditMode) {
      console.log("Fetched Meeting Data:", meetingData.data); // Debugging

      const meeting = meetingData?.data as unknown as meetingType;
      reset({
        eventType: meeting.eventType || meeting.activityType,
        customerIds: meeting.customerIds,
        attendeesIds: meeting.attendeesIds,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
        date: meeting.date,
        description: meeting.description || meeting.notes,
        subject: meeting.subject,
        location: meeting.location,

        // reminder: meeting.reminder,
      });
    }
  }, [isEditMode, meetingData, reset]);

  useEffect(() => {
    // Reset form when the drawer is closed
    if (!meetingId) {
      reset({
        eventType: "",
        customerIds: undefined,
        attendeesIds: undefined,
        startTime: "",
        endTime: "",
        date: "",
        description: "",
        subject: "",
        location: "",
        // reminder: false,
      });
    }
  }, [meetingId, onCloseDrawer, reset]);

  const {
    mutate: handleCreateMeeting,
    isPending: isHandleCreateMeetingPending,
  } = useHandleCreateMeeting(reset);
  const {
    mutate: handleUpdateMeeting,
    isPending: isHandleUpdateMeetingPending,
  } = useHandleUpdateMeeting(meetingId ?? null);

  const { mutate: deleteMeeting, isPending } = useHandleDeleteMeeting();

  const onFinish = (values: MeetingFormData) => {
    if (isEditMode) {
      handleUpdateMeeting(values, {
        onSuccess: () => {
          onSubmit(values);
          navigate("/meetings");
        },
      });
    } else {
      handleCreateMeeting(values, {
        onSuccess: () => {
          onSubmit(values);
          navigate("/meetings");
        },
      });
    }
  };

  const handleDelete = () => {
    deleteMeeting(meetingId as string | number, {
      onSuccess: () => {
        // setOpen(false);
        // if (onDelete) {
        //   onDelete();
        // }
        if (onCloseDrawer) {
          onCloseDrawer(); // Close the drawer on success
        }
        navigate("/meetings");
      },
    });
  };

  if (isMeetingDataLoading && isEditMode) {
    return <Spin size="large" />;
  }

  return (
    <Form form={form} onFinish={handleSubmit(onFinish)} layout="vertical">
      <Controller
        name="eventType"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Event Type"
            validateStatus={errors.eventType ? "error" : ""}
            help={errors.eventType?.message}
          >
            <Select
              {...field}
              value={field.value || undefined}
              placeholder="Select event type"
              className="custom-select"
            >
              <Select.Option value="Customer">Customer</Select.Option>
              <Select.Option value="Architect">Architect</Select.Option>
              <Select.Option value="Consultant">Consultant</Select.Option>
              <Select.Option value="Site Engineer">Site Engineer</Select.Option>
              <Select.Option value="Customer Meetingr">
                Customer Meeting
              </Select.Option>
            </Select>
          </Form.Item>
        )}
      />

      <Controller
        name="customerIds"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Customer *"
            validateStatus={errors.customerIds ? "error" : ""}
            help={errors.customerIds?.message}
          >
            <Select
              {...field}
              placeholder="Select Customer"
              className="custom-select"
              mode="multiple"
            >
              {customerData?.data?.map((el) => {
                return (
                  <Select.Option key={el.id} value={el.id}>
                    {el.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
      />

      <Controller
        name="attendeesIds"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Attendees *"
            validateStatus={errors.attendeesIds ? "error" : ""}
            help={errors.attendeesIds?.message}
          >
            <Select
              {...field}
              mode="multiple"
              placeholder="Select Attendees"
              className="custom-select"
            >
              {userData?.data?.map((el) => {
                return (
                  <Select.Option key={el.id} value={el.id}>
                    {el.firstName} {el.lastName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Date"
            validateStatus={errors.date ? "error" : ""}
            help={errors.date?.message}
          >
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY-MM-DD") : null)
              }
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />

      <Controller
        name="startTime"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Start Time"
            validateStatus={errors.startTime ? "error" : ""}
            help={errors.startTime?.message}
          >
            <TimePicker
              {...field}
              value={field.value ? dayjs(field.value, "hh:mm a") : null}
              onChange={(time) =>
                field.onChange(time ? time.format("hh:mm a") : null)
              }
              format="h:mm a"
              use12Hours
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />

      <Controller
        name="endTime"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="End Time"
            validateStatus={errors.endTime ? "error" : ""}
            help={errors.endTime?.message}
          >
            <TimePicker
              {...field}
              value={field.value ? dayjs(field.value, "hh:mm a") : null}
              onChange={(time) =>
                field.onChange(time ? time.format("hh:mm a") : null)
              }
              format="h:mm a"
              use12Hours
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="location"
            validateStatus={errors.location ? "error" : ""}
            help={errors.location?.message}
          >
            <Input
              {...field}
              placeholder="Enter meeting location"
              className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
            />
          </Form.Item>
        )}
      />

      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Subject"
            validateStatus={errors.subject ? "error" : ""}
            help={errors.subject?.message}
          >
            <Input
              {...field}
              placeholder="Enter meeting subject"
              className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
            />
          </Form.Item>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Description"
            validateStatus={errors.description ? "error" : ""}
            help={errors.description?.message}
          >
            <TextArea
              {...field}
              rows={4}
              placeholder="Enter meeting description"
              className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
            />
          </Form.Item>
        )}
      />

      {/* {!meetingData && (

        <Controller
          name="reminder"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Set Reminder"
              validateStatus={errors.reminder ? "error" : ""}
              help={errors.reminder?.message}
            >
              <Switch {...field} checked={field.value} />
            </Form.Item>
          )}
        />
      )} */}
      <Form.Item>
        <Space>
          <BaseButton variant="default" size="lg" type="submit">
            {isEditMode ? "Update Meeting" : "Create Meeting"}
          </BaseButton>
          {/* <Button
            // type="primary"
            htmlType="submit"
            className="button-small-primary"
            loading={
              isHandleCreateMeetingPending || isHandleUpdateMeetingPending
            }
          >
            {isEditMode ? "Update Meeting" : "Create Meeting"}
          </Button> */}
          {isEditMode && (
            <BaseButton
              // danger
              size="lg"
              type="button"
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to delete this meeting?",
                  onOk: () => {
                    handleDelete();
                  },
                });
              }}
            >
              Delete Meeting
            </BaseButton>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default AddMeetingForm;
