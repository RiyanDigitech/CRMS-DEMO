import { useState } from "react";
import { Layout, Menu, Button, Tooltip, Space, Typography } from "antd";
import {
  SafetyCertificateOutlined,
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import RolesService from "@/services/roles/roles.services";
import RoleDialog from "./role-dialog";

const { Sider } = Layout;
const { Text } = Typography;

const roleIcons = {
  Admin: SafetyCertificateOutlined,
  User: UserOutlined,
  Distributor: UserOutlined,
  Retailer: UserOutlined,
  SalesRepresentative: UserOutlined,
};

interface Role {
  id: string;
  title: string;
  isAuthRequire: boolean;
}

interface RolesListProps {
  selectedRole: string;
  onRoleSelect: (roleId: string) => void;
}

export function RolesList({ selectedRole, onRoleSelect }: RolesListProps) {
  const { useFetchAllRoles } = RolesService();
  const { data: rolesData } = useFetchAllRoles();
  //   const { mutate: deleteRole } = useDeleteRole();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const getIconForRole = (roleTitle: string) => {
    const roleKey = roleTitle.replace(/\s+/g, "") as keyof typeof roleIcons;
    return roleIcons[roleKey] || UserOutlined;
  };

  const handleOpenDialog = (role?: Role) => {
    setEditingRole(role || null);
    setDialogOpen(true);
  };

  const handleDeleteRole = (roleId: number) => {
    // deleteRole(roleId);
  };

  const filteredRoles = rolesData?.data?.filter((role) =>
    ["Admin", "Manager", "Sales Representative"].includes(role.title)
  );
  const menuItems = filteredRoles?.map((role) => {
    const Icon = getIconForRole(role.title);
    return {
      key: role.id,
      icon: <Icon style={{ fontSize: "16px", color: "black" }} />,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          <span style={{ flex: 1 }}>{role.title}</span>
          <Space style={{ marginLeft: 8 }}>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined style={{}} />}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDialog(role);
              }}
            />
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined style={{}} />}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteRole(Number(role.id));
              }}
            />
          </Space>
        </div>
      ),
    };
  });

  return (
    <Sider
      width={350}
      theme="light"
      style={{
        borderRight: "1px solid #f0f0f0",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Text strong style={{ fontSize: "16px", color: "#000000" }}>
          Roles
        </Text>
        <Tooltip title="Add Role">
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleOpenDialog()}
            style={{ borderRadius: "4px" }}
          />
        </Tooltip>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedRole]}
        style={{
          borderRight: 0,
          padding: "8px",
        }}
        items={menuItems}
        onClick={({ key }) => onRoleSelect(key.toString())}
        className="roles-menu"
      />
      <RoleDialog
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
        role={editingRole}
      />
    </Sider>
  );
}
