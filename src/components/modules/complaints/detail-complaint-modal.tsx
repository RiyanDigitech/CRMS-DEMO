import { useEffect } from "react";
import { format, differenceInDays, isValid } from "date-fns";
import { AlertCircle, ArrowRight, UserCircle } from "lucide-react";
import { Modal, Card, Avatar, Tag, Space, Typography, Form } from "antd";
import type { complaintType } from "@/lib/types/complaints";
import type { z } from "zod";
import { complaintAdminFormSchema } from "@/lib/schemas";

const { Title, Text, Paragraph } = Typography;

interface ComplaintDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaintData: complaintType;
  onUpdateSubmit: (values: z.infer<typeof complaintAdminFormSchema>) => void;
  isUpdating: boolean;
}

export function ComplaintDetailsModal({
  isOpen,
  onClose,
  complaintData,
}: ComplaintDetailsModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (complaintData) {
      form.setFieldsValue({
        status: complaintData.status,
        resolutionDetail: "",
      });
    }
  }, [complaintData, form]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isValid(date) ? format(date, "PPpp") : "Invalid Date";
  };

  const isOverTenDays = () => {
    if (!complaintData?.createdAt) return false;
    const createdDate = new Date(complaintData.createdAt);
    return (
      isValid(createdDate) && differenceInDays(new Date(), createdDate) > 10
    );
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "in progress":
      case "inprogress":
        return "processing";
      case "resolved":
        return "success";
      case "closed":
        return "default";
      default:
        return "default";
    }
  };
  
  // const getStatusColor = (status: string) => {
  //   switch (status?.toLowerCase()) {
  //     case "pending":
  //       return "#FFF176";
  //     case "inprogress":
  //     case "#FFB74D":
  //       return "processing";
  //     case "resolved":
  //       return "#81C784";
  //     case "closed":
  //       return "#FF8A65";
  //     case "rejected":
  //       return "#E57373";
  //     default:
  //       return "default";
  //   }
  // };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "error";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={1000}
      title={<Title level={4}>Ticket Details</Title>}
    >
      <div className="space-y-8">
        <Card>
          <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
            <div className="space-y-1">
              <Space align="center">
                <Title level={4} style={{ marginRight: 20 }}>
                  {complaintData?.subject}
                </Title>
                {/* <Tag>{complaintData?.id}</Tag> */}
              </Space>
              <Space>
                <Tag
                  color={getStatusColor(complaintData?.complaintStatus || "")}
                >
                  {complaintData?.complaintStatus}
                </Tag>
                <Tag color={getPriorityColor(complaintData?.priority || "")}>
                  {complaintData?.priority}
                </Tag>
              </Space>
            </div>
            <Space align="center" className="bg-gray-50 p-3 rounded-lg">
              <Avatar
                size={48}
                src="/placeholder.svg?height=40&width=40"
                style={{ border: "2px solid white" }}
              >
                {complaintData?.createdBy?.firstName?.[0]}
                {complaintData?.createdBy?.lastName?.[0]}
              </Avatar>
              <div>
                <Text strong>
                  {complaintData?.createdBy?.firstName}{" "}
                  {complaintData?.createdBy?.lastName}
                </Text>
                <br />
                <Text type="secondary">{complaintData?.createdBy?.email}</Text>
              </div>
            </Space>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <Space direction="vertical" size="large">
              <Card size="small" title="Category">
                <Text>{complaintData?.type || "No category"}</Text>
              </Card>
              <Card size="small" title="Assigned To">
                <Text>
                  {complaintData?.assignedTo?.firstName
                    ? `${complaintData.assignedTo.firstName} ${complaintData.assignedTo.lastName}`
                    : "No Assignee"}
                </Text>
              </Card>
            </Space>
            <Space direction="vertical" size="large">
              <Card size="small" title="Created">
                <Text type={isOverTenDays() ? "danger" : undefined}>
                  {formatDate(complaintData?.createdAt) || "--"}
                </Text>
              </Card>
              <Card size="small" title="Last Updated">
                <Text>{formatDate(complaintData?.updatedAt) || "--"}</Text>
              </Card>
            </Space>
          </div>

          <div className="mt-6 ml-1">
            <Title level={5}>Description</Title>
            <Card size="small">
              <Paragraph>
                {complaintData?.description || "No description"}
              </Paragraph>
            </Card>
          </div>
        </Card>

        <Card title="Resolution History">
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            {complaintData?.resolutionHistory
              ?.slice()
              .reverse()
              .map((resolution: any, index: number) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Avatar
                      icon={<AlertCircle />}
                      style={{ backgroundColor: "#e6f4ff" }}
                    />
                  </div>
                  <div className="flex-grow">
                    <Card size="small">
                      <Space
                        className="mb-2"
                        style={{ width: "100%" }}
                        justify="space-between"
                      >
                        <Space>
                          <Tag
                            color={getStatusColor(resolution.previousStatus)}
                          >
                            {resolution.previousStatus}
                          </Tag>
                          <ArrowRight className="mx-2 w-4 h-4" />
                          <Tag color={getStatusColor(resolution.newStatus)}>
                            {resolution.newStatus}
                          </Tag>
                        </Space>
                        <Text type="secondary">
                          {formatDate(resolution.updatedAt)}
                        </Text>
                      </Space>
                      <Paragraph>
                        {resolution.resolutionComment || "No comment provided"}
                      </Paragraph>
                      <Space>
                        <UserCircle className="w-4 h-4" />
                        <Text type="secondary">
                          Updated by Admin: {resolution.adminName}
                        </Text>
                      </Space>
                    </Card>
                  </div>
                </div>
              ))}
            {complaintData?.resolutionHistory?.length === 0 && (
              <Text
                type="secondary"
                style={{ textAlign: "center", display: "block" }}
              >
                No resolution history available.
              </Text>
            )}
          </Space>
        </Card>
      </div>
    </Modal>
  );
}
