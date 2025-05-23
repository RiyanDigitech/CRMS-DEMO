import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal, Form, Input, Button, Select, DatePicker } from "antd";
import TeamsService from "@/services/teams/teams.service";
import UsersService from "@/services/users/user.service";
import SalesTargetService from "@/services/sales-target.service";

const { Option } = Select;

const salesTargetSchema = z.object({
  type: z.enum(["Individual", "Team"], { required_error: "Type is required" }),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  assignedUser: z.number().optional(),
  // .refine((value) => value !== undefined || false, {
  //   message: "Assigned User is required for Individual type",
  // }),
  assignedTeam: z.number().optional(),
  // .refine((value) => value !== undefined || false, {
  //   message: "Assigned Team is required for Team type",
  // }),
  targetValue: z
    .number({ required_error: "Target value is required" })
    .positive("Target value must be a positive number"),
  measurementUnit: z.enum(["Ammount", "Percentage"], {
    required_error: "Measurement Unit is required",
  }),
});

// Form Data Type
export type salesTargetFormData = z.infer<typeof salesTargetSchema>;

const CreateSalesTargetModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { useFetchAllUsers } = UsersService();
  const { data: userData } = useFetchAllUsers(100000, 1);
  const { useFetchAllTeams } = TeamsService();
  const { data: teamData } = useFetchAllTeams(100000, 1);
  const { useHandleCreateSalesTarget } = SalesTargetService();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<salesTargetFormData>({
    resolver: zodResolver(salesTargetSchema),
    defaultValues: {
      type: "Individual",
      startDate: "",
      endDate: "",
      assignedUser: undefined,
      assignedTeam: undefined,
      targetValue: 0,
      measurementUnit: "Ammount",
    },
  });
  console.log(errors, "Err");
  const {
    mutate: handleCreateSalesTarget,
    isPending,
    isSuccess,
  } = useHandleCreateSalesTarget();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (data: salesTargetFormData) => {
    handleCreateSalesTarget({
      ...data,
    });
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
  }, [isSuccess]);
  const selectedType = watch("type");

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
        title="Add New Target"
        open={isModalVisible}
        loading={isPending}
        onCancel={handleCancel}
        footer={null} // Custom footer with form submission
      >
        {/* Form Inside Modal */}
        <Form layout="vertical" onFinish={handleSubmit(handleOk)}>
          <div className="w-full grid grid-cols-1 gap-x-4 lg:grid-cols-2">
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
                    placeholder="Select sales target type"
                    className="custom-select"
                  >
                    <Option value="Individual">Individual</Option>
                    <Option value="Team">Team</Option>
                  </Select>
                )}
              />
            </Form.Item>

            <div className="flex items-center gap-2">
              <Form.Item
                label="Target Period"
                validateStatus={errors.startDate ? "error" : ""}
                help={errors.startDate?.message}
              >
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="custom-date-picker"
                      onChange={(date, dateString) =>
                        field.onChange(dateString)
                      }
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                label=" "
                validateStatus={errors.startDate ? "error" : ""}
                help={errors.startDate?.message}
              >
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="custom-date-picker"
                      onChange={(date, dateString) =>
                        field.onChange(dateString)
                      }
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Form.Item>
            </div>

            {selectedType === "Individual" && (
              <Form.Item
                label="Target Assignee *"
                validateStatus={errors.assignedUser ? "error" : ""}
                help={errors.assignedUser?.message}
              >
                <Controller
                  name="assignedUser"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select User"
                      className="custom-select"
                    >
                      {userData?.data?.map((el) => {
                        return (
                          <Option key={el.id} value={el.id}>
                            {el.firstName + " " + el.lastName}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                />
              </Form.Item>
            )}

            {selectedType === "Team" && (
              <Form.Item
                label="Target Assignee *"
                validateStatus={errors.assignedTeam ? "error" : ""}
                help={errors.assignedTeam?.message}
              >
                <Controller
                  name="assignedTeam"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Team"
                      className="custom-select"
                    >
                      {teamData?.data?.map((el) => {
                        return (
                          <Option key={el.id} value={el.id}>
                            {el.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                />
              </Form.Item>
            )}

            <Form.Item
              label="Target Value *"
              validateStatus={errors.targetValue ? "error" : ""}
              help={errors.targetValue?.message}
            >
              <Controller
                name="targetValue"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type="number"
                    className="bg-[#fafafa] py-2 border border-[#EBF0ED] rounded-[10px]"
                    placeholder="Enter Target Value"
                    style={{ width: "100%" }}
                    autoFocus
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Measurement Unit"
              validateStatus={errors.measurementUnit ? "error" : ""}
              help={errors.measurementUnit?.message}
            >
              <Controller
                name="measurementUnit"
                control={control}
                render={({ field }) => (
                  <Select
                    className="custom-select"
                    {...field}
                    placeholder="Select Unit"
                  >
                    <Option value="Ammount">Amount</Option>
                    <Option value="Percentage">Percentage</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <Form.Item className="w-full mt-4 flex gap-2 justify-center items-center">
            <Button
              className="w-[125px] bg-[#FF8548] h-[40px] rounded-[10px]"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateSalesTargetModal;
