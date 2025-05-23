import { Modal } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Form, Spin } from "antd";
import TeamsService from "@/services/teams/teams.service";
import { updateTeamType } from "@/lib/types/team";
// import TeamStore from "@/store/teams-store";
// import { useEffect } from "react";
import { CreateModalProps } from "@/lib/types/customer";
const CustomersCreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<updateTeamType>();
  //   const { setTeamsId } = TeamStore();

  const { useHandleUpdateTeamService } = TeamsService();
  const { mutate, isPending } = useHandleUpdateTeamService(reset);

  const onSubmit: SubmitHandler<updateTeamType> = (data) => {
    mutate(data);
    console.log("Form submitted with data:", data);
  };

  //   useEffect(() => {
  //     if (isOpen) {
  //       setTeamsId(customerId);
  //     }
  //   }, [isOpen, customerId, setTeamsId]);
  return (
    <Modal
      className=" shadow-none drop-shadow-none "
      title={`Create Customer `}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      style={{ top: "8%" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-jakartaSans w-full flex flex-col mt-3 "
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item className="w-full sm:w-full lg:w-full mx-auto mb-4">
              <label htmlFor="Team Name">Customer Name</label>
              <Input
                {...field}
                id="Team Name"
                placeholder="Enter Team Name"
                className="h-[40px] mt-2 w-full"
              />
            </Form.Item>
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Form.Item className="w-full sm:w-full lg:w-full mx-auto mb-4">
              <label htmlFor="Enter City">Enter City</label>
              <Input
                {...field}
                id="Enter City"
                placeholder="Enter City"
                className="h-[40px] mt-2"
              />
            </Form.Item>
          )}
        />

        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <Form.Item className="w-full sm:w-full lg:w-full mx-auto mb-4">
              <label htmlFor="Enter Region">Enter Region</label>
              <Input
                {...field}
                id="Enter Region"
                placeholder="E.g: east/west/north/south"
                className="h-[40px] mt-2"
              />
            </Form.Item>
          )}
        />

        <Controller
          name="area"
          control={control}
          render={({ field }) => (
            <Form.Item className="w-full sm:w-full lg:w-full mx-auto mb-4">
              <label htmlFor="Area">Area</label>
              <Input.TextArea
                {...field}
                id="Area"
                placeholder="Enter Area"
                className="h-[70px] mt-2"
                rows={3}
              />
            </Form.Item>
          )}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="font-jakartaSans shadow-lg w-full sm:w-3/12 lg:w-2/12 border-[1px] border-[#008444] bg-[#008444] mt-3 text-white py-3 rounded-md text-[14px] font-semibold hover:bg-white hover:text-[#008444]"
          >
            {isPending ? (
              <Spin className="bg-white rounded-lg p-1" />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CustomersCreateModal;
