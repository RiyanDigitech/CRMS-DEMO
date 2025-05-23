"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Modal, Form, Input, Button, Select, Row, Col } from "antd";
import { complaintFormSchema } from "@/lib/schemas";
import { ComplaintTypeEnum } from "@/lib/enums";
import CustomersService from "@/services/customers/customers.service";
import ComplaintService from "@/services/complaints.service";
import UsersService from "@/services/users/user.service";
import { UserType } from "@/lib/types/user";

const { TextArea } = Input;
const { Option } = Select;

export type ComplaintFormData = z.infer<typeof complaintFormSchema>;

const CreateComplaintModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { useFetchAllCustomers } = CustomersService();
  const { data: customerData } = useFetchAllCustomers(100000, 1);
  const { useFetchAllUsers } = UsersService();
  const { data: userData } = useFetchAllUsers(100000, 1);

  const availableAdmins: UserType[] = useMemo(() => {
    if (!userData || !userData.data) return [];
    return userData.data.filter(
      (el) => el.role === "Admin" || el.role === "Super Admin"
    );
  }, [userData]);

  console.log(userData, "User Data");
  console.log(availableAdmins, "Available admins");

  const { useHandleCreateComplaint } = ComplaintService();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: {
      subject: "",
      reference: "",
      description: "",
      customerId: undefined,
      assignedTo: undefined,
      type: undefined,
      priority: undefined,
    },
  });
  const {
    mutate: handleCreateComplaint,
    isPending,
    isSuccess,
  } = useHandleCreateComplaint();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (data: ComplaintFormData) => {
    console.log(data);
    handleCreateComplaint(data);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset(); // Reset form on cancel
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalVisible(false);
      reset(); // Reset form after submission
    }
  }, [isSuccess, reset]);

  console.log(customerData, "Customer Data");
  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={showModal}
        className="bg-[#ff8548] text-white py-3 px-4 py-4 w-[163px] h-[50px] border border-[#ff8548]"
      >
        Add New
      </Button>

      {/* Ant Design Modal */}
      <Modal
        title="New Ticket"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {/* Form Inside Modal */}
        <Form layout="vertical" onFinish={handleSubmit(handleOk)}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Subject *"
                validateStatus={errors.subject ? "error" : ""}
                help={errors.subject?.message}
              >
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={100}
                      placeholder="Subject"
                      className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Reference"
                validateStatus={errors.reference ? "error" : ""}
                help={errors.reference?.message}
              >
                <Controller
                  name="reference"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={50}
                      placeholder="Reference"
                      className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Customer"
                validateStatus={errors.customerId ? "error" : ""}
                help={errors.customerId?.message}
              >
                <Controller
                  name="customerId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Customer"
                      className="custom-select"
                    >
                      {customerData?.data?.map((el) => (
                        <Option key={el.id} value={String(el.id)}>
                          {el.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Assigned To"
                validateStatus={errors.assignedTo ? "error" : ""}
                help={errors.assignedTo?.message}
              >
                <Controller
                  name="assignedTo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Admin"
                      className="custom-select"
                    >
                      {availableAdmins?.map((user) => (
                        <Option key={user.id} value={String(user.id)}>
                          {user.firstName} {user.lastName}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Type *"
                validateStatus={errors.type ? "error" : ""}
                help={errors.type?.message}
              >
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Type"
                      className="custom-select"
                    >
                      {Object.values(ComplaintTypeEnum).map((type) => (
                        <Option key={type} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Priority *"
                validateStatus={errors.priority ? "error" : ""}
                help={errors.priority?.message}
              >
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Priority"
                      className="custom-select"
                    >
                      {["Low", "Medium", "High", "Critical"].map((priority) => (
                        <Option key={priority} value={priority}>
                          {priority}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Description *"
            validateStatus={errors.description ? "error" : ""}
            help={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={4}
                  maxLength={1000}
                  className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
                  placeholder="Description"
                />
              )}
            />
          </Form.Item>
          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateComplaintModal;
