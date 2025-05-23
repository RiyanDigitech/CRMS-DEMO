import { useMemo, useState } from "react";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { PermissionType } from "@/lib/types/permissions";
import {
  Collapse,
  Input,
  Switch,
  Tooltip,
  Typography,
  Space,
  Card,
} from "antd";
import { beautifyModuleName } from "@/lib/helpers";
import { BaseButton } from "@/components/ui/base-button";
import { mockPermissions, mockRolePermissions } from "./mockData";

const { Panel } = Collapse;
const { Title, Text } = Typography;

interface PermissionsListProps {
  roleId: string;
  grantPermissions: number[];
  removePermissions: number[];
  onToggleGrantPermission: (permissionId: number) => void;
  onToggleRemovePermission: (permissionId: number) => void;
}

// interface RolePermissionsResponse {
//   data: {
//     permissions: PermissionType[];
//   };
// }

interface GroupedPermissions {
  [key: string]: PermissionType[];
}

export function PermissionsList({
  roleId,
  grantPermissions,
  removePermissions,
  onToggleGrantPermission,
  onToggleRemovePermission,
}: PermissionsListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Use mock data instead of API calls
  const permissionsData = mockPermissions;
  const rolePermissions = mockRolePermissions;

  const groupedPermissions = useMemo(() => {
    if (!permissionsData?.data) return {};
    return permissionsData.data.reduce(
      (acc: GroupedPermissions, permission) => {
        if (!acc[permission.module]) {
          acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
      },
      {}
    );
  }, [permissionsData]);

  const filteredGroupedPermissions = useMemo(() => {
    if (searchTerm === "") return groupedPermissions;

    const filtered: GroupedPermissions = {};
    Object.entries(groupedPermissions).forEach(([module, permissions]) => {
      const filteredPermissions = permissions.filter(
        (permission) =>
          permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          module.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredPermissions.length > 0) {
        filtered[module] = filteredPermissions;
      }
    });
    return filtered;
  }, [groupedPermissions, searchTerm]);

  const Submit = () => {
    console.log("Saving permissions:", {
      grantPermissions,
      removePermissions,
      roleId,
    });
  };

  const isPermissionChecked = (permission: PermissionType) => {
    const isInRolePermissions = rolePermissions?.data?.permissions?.some(
      (p: PermissionType) => p.id === permission.id
    );
    const isInRemovePermissions = removePermissions.includes(permission.id);
    const isInGrantPermissions = grantPermissions.includes(permission.id);
    return (
      (isInRolePermissions && !isInRemovePermissions) || isInGrantPermissions
    );
  };

  const handlePermissionToggle = (permission: PermissionType) => {
    if (
      rolePermissions?.data?.permissions.some((p) => p.id === permission.id)
    ) {
      if (removePermissions.includes(permission.id)) {
        onToggleRemovePermission(permission.id);
      } else {
        onToggleRemovePermission(permission.id);
      }
    } else {
      onToggleGrantPermission(permission.id);
    }
  };

  return (
    <div style={{ padding: 24, height: "100%", overflow: "auto" }}>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Permissions
            </Title>
            <Text type="secondary">Manage role permissions</Text>
          </div>
          <BaseButton variant={"default"} size={"lg"} onClick={Submit}>
            Save Changes
          </BaseButton>
        </div>

        <Input
          prefix={<SearchOutlined />}
          style={{
            flex: "1",
            minWidth: "700px",
            maxWidth: "100%",
            height: "49px",
          }}
          placeholder="Search modules or permissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {Object.keys(filteredGroupedPermissions).length === 0 ? (
          <Text
            type="secondary"
            style={{ textAlign: "center", display: "block", padding: "16px 0" }}
          >
            No permissions found matching your search.
          </Text>
        ) : (
          <Collapse defaultActiveKey={["Dashboard"]}>
            {Object.entries(filteredGroupedPermissions).map(
              ([module, permissions]) => (
                <Panel
                  header={beautifyModuleName(module)}
                  key={module}
                  style={{
                    marginBottom: 16,
                    border: "1px solid #f0f0f0",
                    borderRadius: 8,
                  }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {permissions.map((permission) => (
                      <Card
                        key={permission.id}
                        size="small"
                        bodyStyle={{ padding: "12px" }}
                        style={{ borderRadius: 6 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Space>
                            <Switch
                              checked={isPermissionChecked(permission)}
                              onChange={() =>
                                handlePermissionToggle(permission)
                              }
                            />
                            <Text strong>{permission.name}</Text>
                          </Space>
                          <Tooltip title={permission.description}>
                            <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
                          </Tooltip>
                        </div>
                      </Card>
                    ))}
                  </Space>
                </Panel>
              )
            )}
          </Collapse>
        )}
      </Space>
    </div>
  );
}

//////////////////////
// import { useMemo, useState } from "react";
// import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
// import { PermissionType } from "@/lib/types/permissions";
// import PermissionService from "@/services/permissions/permissions.service";
// import {
//   Collapse,
//   Input,
//   Switch,
//   Button,
//   Tooltip,
//   Typography,
//   Space,
//   Card,
// } from "antd";
// import { beautifyModuleName } from "@/lib/helpers";
// import { BaseButton } from "@/components/ui/base-button";

// const { Panel } = Collapse;
// const { Title, Text } = Typography;

// interface PermissionsListProps {
//   roleId: string;
//   grantPermissions: number[];
//   removePermissions: number[];
//   onToggleGrantPermission: (permissionId: number) => void;
//   onToggleRemovePermission: (permissionId: number) => void;
// }

// interface RolePermissionsResponse {
//   data: {
//     permissions: PermissionType[];
//   };
// }

// interface GroupedPermissions {
//   [key: string]: PermissionType[];
// }

// export function PermissionsList({
//   roleId,
//   grantPermissions,
//   removePermissions,
//   onToggleGrantPermission,
//   onToggleRemovePermission,
// }: PermissionsListProps) {
//   const {
//     useFetchAllPermissions,
//     useFetchPermissionsByRoleId,
//     useHandleGrantPermission,
//     useHandleRemovePermission,
//   } = PermissionService();
//   const { data: permissionsData } = useFetchAllPermissions();
//   const { data: rolePermissions } = useFetchPermissionsByRoleId(
//     Number(roleId)
//   ) as {
//     data?: RolePermissionsResponse;
//   };

//   const { mutate: handleGrantPermission } = useHandleGrantPermission();
//   const { mutate: handleRemovePermission } = useHandleRemovePermission();

//   const [searchTerm, setSearchTerm] = useState("");

//   const groupedPermissions = useMemo(() => {
//     if (!permissionsData?.data) return {};
//     return permissionsData.data.reduce(
//       (acc: GroupedPermissions, permission) => {
//         if (!acc[permission.module]) {
//           acc[permission.module] = [];
//         }
//         acc[permission.module].push(permission);
//         return acc;
//       },
//       {}
//     );
//   }, [permissionsData]);

//   const filteredGroupedPermissions = useMemo(() => {
//     if (searchTerm === "") return groupedPermissions;

//     const filtered: GroupedPermissions = {};
//     Object.entries(groupedPermissions).forEach(([module, permissions]) => {
//       const filteredPermissions = permissions.filter(
//         (permission) =>
//           permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           permission.description
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           module.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       if (filteredPermissions.length > 0) {
//         filtered[module] = filteredPermissions;
//       }
//     });
//     return filtered;
//   }, [groupedPermissions, searchTerm]);

//   const Submit = () => {
//     if (grantPermissions.length > 0) {
//       const data = {
//         permissionIds: grantPermissions,
//         roleId: roleId,
//       };
//       handleGrantPermission(data);
//     }
//     if (removePermissions.length) {
//       const data = {
//         permissionIds: removePermissions,
//         roleId: roleId,
//       };
//       handleRemovePermission(data);
//     }
//   };

//   const isPermissionChecked = (permission: PermissionType) => {
//     const isInRolePermissions = rolePermissions?.data?.permissions?.some(
//       (p: PermissionType) => p.id === permission.id
//     );
//     const isInRemovePermissions = removePermissions.includes(permission.id);
//     const isInGrantPermissions = grantPermissions.includes(permission.id);
//     return (
//       (isInRolePermissions && !isInRemovePermissions) || isInGrantPermissions
//     );
//   };

//   const handlePermissionToggle = (permission: PermissionType) => {
//     if (
//       rolePermissions?.data?.permissions.some((p) => p.id === permission.id)
//     ) {
//       if (removePermissions.includes(permission.id)) {
//         onToggleRemovePermission(permission.id);
//       } else {
//         onToggleRemovePermission(permission.id);
//       }
//     } else {
//       onToggleGrantPermission(permission.id);
//     }
//   };

//   return (
//     <div style={{ padding: 24, height: "100%", overflow: "auto" }}>
//       <Space direction="vertical" style={{ width: "100%" }} size="large">
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <Title level={4} style={{ margin: 0 }}>
//               Permissions
//             </Title>
//             <Text type="secondary">Manage role permissions</Text>
//           </div>
//           <BaseButton variant={"default"} size={"lg"} onClick={Submit}>
//             Save Changes
//           </BaseButton>
//         </div>

//         <Input
//           prefix={<SearchOutlined />}
//           style={{
//             flex: "1", // Makes it grow
//             minWidth: "700px",
//             maxWidth: "100%", // Ensures it doesn't exceed the container
//             height: "49px",
//           }}
//           placeholder="Search modules or permissions..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {Object.keys(filteredGroupedPermissions).length === 0 ? (
//           <Text
//             type="secondary"
//             style={{ textAlign: "center", display: "block", padding: "16px 0" }}
//           >
//             No permissions found matching your search.
//           </Text>
//         ) : (
//           <Collapse>
//             {Object.entries(filteredGroupedPermissions).map(
//               ([module, permissions]) => (
//                 <Panel header={beautifyModuleName(module)} key={module}>
//                   <Space direction="vertical" style={{ width: "100%" }}>
//                     {permissions.map((permission) => (
//                       <Card
//                         key={permission.id}
//                         size="small"
//                         bodyStyle={{ padding: "12px" }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                           }}
//                         >
//                           <Space>
//                             <Switch
//                               checked={isPermissionChecked(permission)}
//                               onChange={() =>
//                                 handlePermissionToggle(permission)
//                               }
//                             />
//                             <Text strong>{permission.name}</Text>
//                           </Space>
//                           <Tooltip title={permission.description}>
//                             <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
//                           </Tooltip>
//                         </div>
//                       </Card>
//                     ))}
//                   </Space>
//                 </Panel>
//               )
//             )}
//           </Collapse>
//         )}
//       </Space>
//     </div>
//   );
// }
