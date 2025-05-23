import { Modal, Select, Input, Button, Form, Space } from "antd";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import type { z } from "zod";
import { complaintAdminFormSchema } from "@/lib/schemas";
import { BaseButton } from "@/components/ui/base-button";

const { TextArea } = Input;

interface UpdateComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: z.infer<typeof complaintAdminFormSchema>) => void;
  defaultValues?: z.infer<typeof complaintAdminFormSchema>;
  isLoading?: boolean;
  complaintId: number | null;
}

export function UpdateComplaintModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isLoading,
}: UpdateComplaintModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        complaintStatus: defaultValues.complaintStatus,
        resolutionDetail: "",
      });
    }
  }, [defaultValues, form]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title="Update Ticket Status"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={500}
    >
      <p className="text-gray-500 mb-4">
        Update the status and resolution details for this ticket.
      </p>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        initialValues={defaultValues}
      >
        <Form.Item
          name="complaintStatus"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select className="custom-select" placeholder="Select a status">
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="InProgress">In Progress</Select.Option>
            <Select.Option value="Resolved">Resolved</Select.Option>
            <Select.Option value="Closed">Closed</Select.Option>
            <Select.Option value="Rejected">Rejected</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="resolutionDetail"
          label="Resolution Details"
          rules={[
            { required: true, message: "Please enter resolution details" },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Enter resolution details"
            className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
          />
        </Form.Item>

        <div className="flex justify-between items-center mt-6">
          <Space>
            <BaseButton
              type="button"
              variant={"outline"}
              size={"sm"}
              onClick={onClose}
            >
              Cancel
            </BaseButton>
            <BaseButton
              variant={"default"}
              size={"sm"}
              htmlType="submit"
              disabled={isLoading}
              icon={
                isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null
              }
            >
              {isLoading ? "Updating..." : "Update"}
            </BaseButton>
          </Space>
        </div>
      </Form>
    </Modal>
  );
}
