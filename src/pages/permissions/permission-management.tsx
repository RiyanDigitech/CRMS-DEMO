import { useState } from "react";
import { Layout, Typography } from "antd";
import { RolesList } from "@/components/modules/permissions/role-list";
import { PermissionsList } from "@/components/modules/permissions/permission-list";

const { Header, Content } = Layout;
const { Title } = Typography;

function PermissionManagement() {
  const [selectedRole, setSelectedRole] = useState<string>("2");
  const [grantPermissions, setGrantPermissions] = useState<number[]>([]);
  const [removePermissions, setRemovePermissions] = useState<number[]>([]);

  const handleToggleGrantPermission = (permissionId: number) => {
    setGrantPermissions((prevGrantPermissions) => {
      if (prevGrantPermissions.includes(permissionId)) {
        return prevGrantPermissions.filter((id) => id !== permissionId);
      } else {
        return [...prevGrantPermissions, permissionId];
      }
    });
  };

  const handleToggleRemovePermission = (permissionId: number) => {
    setRemovePermissions((prevRemovePermissions) => {
      if (prevRemovePermissions.includes(permissionId)) {
        return prevRemovePermissions.filter((id) => id !== permissionId);
      } else {
        return [...prevRemovePermissions, permissionId];
      }
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Title level={4} style={{ margin: 5, lineHeight: "64px" }}>
          Role Management
        </Title>
      </Header>
      <Layout>
        <RolesList selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
        <Content style={{ background: "#fff" }}>
          <PermissionsList
            roleId={selectedRole}
            grantPermissions={grantPermissions}
            removePermissions={removePermissions}
            onToggleGrantPermission={handleToggleGrantPermission}
            onToggleRemovePermission={handleToggleRemovePermission}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PermissionManagement;
