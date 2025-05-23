import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";
// import RolesService from "@/services/roles/roles.services";
import { BaseButton } from "@/components/ui/base-button";

type Role = {
  id?: string;
  title?: string;
  isAuthRequire?: boolean;
};

type RoleDialogProps = {
  isOpen: boolean;
  setOpen: (isOpen?: boolean | undefined) => void;
  role?: Role;
};

const RoleDialog: React.FC<RoleDialogProps> = ({ isOpen, setOpen, role }) => {
  const [form] = Form.useForm();
  // const { useCreateRole, useUpdateRole } = RolesService();
  //   const { mutate: createRole, isPending: isCreatePending } = useCreateRole();
  //   const { mutate: updateRole, isPending: isUpdatePending } = useUpdateRole(
  //     role?.id || null
  //   );

  useEffect(() => {
    if (role) {
      form.setFieldsValue({
        title: role.title,
        isAuthRequire: role.isAuthRequire ?? true,
      });
    } else {
      form.resetFields();
    }
  }, [role, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (role) {
        // updateRole(values);
      } else {
        // createRole(values);
      }
      setOpen(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title={role ? "Edit Role" : "Add Role"}
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <BaseButton
          variant={"outline"}
          size={"sm"}
          key="cancel"
          onClick={handleCancel}
        >
          Cancel
        </BaseButton>,
        <BaseButton
          key="submit"
          variant={"default"}
          size={"sm"}
          className="ml-2"
          onClick={handleSubmit}
          //   loading={isCreatePending || isUpdatePending}
        >
          {/* {isCreatePending || isUpdatePending ? "Saving..." : "Save"} */}
          Save
        </BaseButton>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ isAuthRequire: true }}
      >
        <Form.Item
          name="title"
          label="Role Title"
          rules={[{ required: true, message: "Please input the role title!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleDialog;
