export const mockPermissions = {
  data: [
    {
      id: 1,
      name: "View Dashboard",
      description: "Access to view the main dashboard",
      module: "Dashboard",
    },
    {
      id: 2,
      name: "Create Users",
      description: "Ability to create new user accounts",
      module: "User Management",
    },
    {
      id: 3,
      name: "Edit Users",
      description: "Ability to modify existing user accounts",
      module: "User Management",
    },
    {
      id: 4,
      name: "Delete Users",
      description: "Ability to remove user accounts",
      module: "User Management",
    },
    {
      id: 5,
      name: "View Sales",
      description: "Access to view sales reports",
      module: "Sales",
    },

    {
      id: 7,
      name: "Manage Settings",
      description: "Access to system settings",
      module: "Settings",
    },
    {
      id: 8,
      name: "View Products",
      description: "Access to view product catalog",
      module: "Products",
    },
    {
      id: 9,
      name: "Edit Products",
      description: "Ability to modify product details",
      module: "Products",
    },
    {
      id: 10,
      name: "Delete Products",
      description: "Ability to remove products",
      module: "Products",
    },
  ],
};

export const mockRolePermissions = {
  data: {
    permissions: [
      {
        id: 1,
        name: "View Dashboard",
        description: "Access to view the main dashboard",
        module: "Dashboard",
      },
      {
        id: 5,
        name: "View Sales",
        description: "Access to view sales reports",
        module: "Sales",
      },
      {
        id: 8,
        name: "View Products",
        description: "Access to view product catalog",
        module: "Products",
      },
    ],
  },
};
