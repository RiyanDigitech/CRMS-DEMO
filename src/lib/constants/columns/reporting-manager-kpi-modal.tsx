// import { TableColumnsType } from "antd";
// import "../../../index.css";
// export const getReportingManagerTableColumns = (): TableColumnsType<any> => [
//   {
//     title: "Repoting Manager",
//     dataIndex: "reportingManager",
//     key: "name",
//     render: (reportingManager: any) =>
//       `${reportingManager?.firstName ?? ""} ${
//         reportingManager?.lastName ?? ""
//       }`,
//   },
//   {
//     title: <div className="bg-gray-300">Sales Trade</div>,

//     children: [
//       {
//         title: "Weightage",
//         dataIndex: "salesTrade",
//         key: "salesTradeWeightage",
//         render: () => "40%", // static ya API se laa sakte ho
//       },
//       {
//         title: "Target",
//         dataIndex: ["salesTrade", "target"],
//         key: "salesTradeTarget",
//       },
//       {
//         title: "Actual",
//         dataIndex: ["salesTrade", "actual"],
//         key: "salesTradeActual",
//       },
//       {
//         title: "Score",
//         dataIndex: ["salesTrade", "score"],
//         key: "salesTradeScore",
//       },
//     ],
//   },
//   {
//     title: <div className="bg-gray-300">DSO</div>,
//     children: [
//       {
//         title: "Weightage",
//         dataIndex: "dso",
//         key: "dsoWeightage",
//         render: () => "45%", // static ya API se
//       },
//       {
//         title: "Target",
//         dataIndex: ["dso", "target"],
//         key: "dsoTarget",
//       },
//       {
//         title: "Actual",
//         dataIndex: ["dso", "actual"],
//         key: "dsoActual",
//       },
//       {
//         title: "Score",
//         dataIndex: ["dso", "score"],
//         key: "dsoScore",
//       },
//     ],
//   },
//   {
//     title: <div className="bg-gray-300">Active Dealer</div>,
//     children: [
//       {
//         title: "Weightage",
//         dataIndex: "activeDealer",
//         key: "activeDealerWeightage",
//         render: () => "15%", // static ya API se
//       },
//       {
//         title: "Target",
//         dataIndex: ["activeDealer", "target"],
//         key: "activeDealerTarget",
//       },
//       {
//         title: "Actual",
//         dataIndex: ["activeDealer", "actual"],
//         key: "activeDealerActual",
//       },
//       {
//         title: "Score",
//         dataIndex: ["activeDealer", "score"],
//         key: "activeDealerScore",
//       },
//     ],
//   },
// ];
// import { TableColumnsType } from "antd";
// import "../../../index.css";

// export const getReportingManagerTableColumns = (
//   type?: string
// ): TableColumnsType<any> => [
//   {
//     title: "Reporting Manager",
//     dataIndex: "reportingManager",
//     key: "reportingManager", // Align key with dataIndex
//     render: (reportingManager: any) =>
//       `${reportingManager?.firstName ?? ""} ${
//         reportingManager?.lastName ?? ""
//       }`,
//   },
//   {
//     title: <div className="bg-gray-300">Sales Trade</div>,
//     key: "salesTrade", // Parent column doesn't need dataIndex
//     children: [
//       {
//         title: "Weightage",
//         dataIndex: ["salesTrade", "weightage"], // Use actual data from API
//         key: "salesTradeWeightage",
//         render: (weightage: number) => `${weightage}%`, // Dynamic value
//       },
//       {
//         title: "Target",
//         dataIndex: ["salesTrade", "target"],
//         key: "salesTradeTarget",
//       },
//       {
//         title: "Actual",
//         dataIndex: ["salesTrade", "actual"],
//         key: "salesTradeActual",
//       },
//       {
//         title: "Score",
//         dataIndex: ["salesTrade", "score"],
//         key: "salesTradeScore",
//       },
//     ],
//   },
//   {
//     title: <div className="bg-gray-300">DSO</div>,
//     key: "dso", // Parent column doesn't need dataIndex
//     children: [
//       {
//         title: "Weightage",
//         dataIndex: ["dso", "weightage"],
//         key: "dsoWeightage",
//         render: (weightage: number) => `${weightage}%`,
//       },
//       {
//         title: "Target",
//         dataIndex: ["dso", "target"],
//         key: "dsoTarget",
//       },
//       {
//         title: "Actual",
//         dataIndex: ["dso", "actual"],
//         key: "dsoActual",
//       },
//       {
//         title: "Score",
//         dataIndex: ["dso", "score"],
//         key: "dsoScore",
//       },
//     ],
//   },

//   {
//     title: <div className="bg-gray-300">Active Dealer</div>,
//     key: "activeDealer", // Parent column doesn't need dataIndex
//     children: [
//       {
//         title: "Weightage",
//         dataIndex: ["activeDealer", "weightage"],
//         key: "activeDealerWeightage",
//         render: (weightage: number) => `${weightage}%`,
//       },
//       {
//         title: "Target",
//         dataIndex: ["activeDealer", "target"],
//         key: "activeDealerTarget",
//       },
//       {
//         title: "Actual",
//         dataIndex: ["activeDealer", "actual"],
//         key: "activeDealerActual",
//       },
//       {
//         title: "Score",
//         dataIndex: ["activeDealer", "score"],
//         key: "activeDealerScore",
//       },
//     ],
//   },
// ];
import { TableColumnsType } from "antd";
import "../../../index.css";

export const getReportingManagerTableColumns = (
  type?: string
): TableColumnsType<any> => {
  const columns: TableColumnsType<any> = [
    {
      title: "Reporting Manager",
      dataIndex: "reportingManager",
      key: "reportingManager",
      render: (reportingManager: any) =>
        `${reportingManager?.firstName ?? ""} ${
          reportingManager?.lastName ?? ""
        }`,
    },
    {
      title: <div className="bg-gray-300">Sales Trade</div>,
      key: "salesTrade",
      children: [
        {
          title: "Weightage",
          dataIndex: ["salesTrade", "weightage"],
          key: "salesTradeWeightage",
          render: (weightage: number) => `${weightage}%`,
        },
        {
          title: "Target",
          dataIndex: ["salesTrade", "target"],
          key: "salesTradeTarget",
        },
        {
          title: "Actual",
          dataIndex: ["salesTrade", "actual"],
          key: "salesTradeActual",
        },
        {
          title: "Score",
          dataIndex: ["salesTrade", "score"],
          key: "salesTradeScore",
        },
      ],
    },
    {
      title: <div className="bg-gray-300">DSO</div>,
      key: "dso",
      children: [
        {
          title: "Weightage",
          dataIndex: ["dso", "weightage"],
          key: "dsoWeightage",
          render: (weightage: number) => `${weightage}%`,
        },
        {
          title: "Target",
          dataIndex: ["dso", "target"],
          key: "dsoTarget",
        },
        {
          title: "Actual",
          dataIndex: ["dso", "actual"],
          key: "dsoActual",
        },
        {
          title: "Score",
          dataIndex: ["dso", "score"],
          key: "dsoScore",
        },
      ],
    },
  ];

  // Conditionally add either Active Dealer or CM based on type
  if (type === "Sales") {
    columns.push({
      title: <div className="bg-gray-300">Active Dealer</div>,
      key: "activeDealer",
      children: [
        {
          title: "Weightage",
          dataIndex: ["activeDealer", "weightage"],
          key: "activeDealerWeightage",
          render: (weightage: number) => `${weightage}%`,
        },
        {
          title: "Target",
          dataIndex: ["activeDealer", "target"],
          key: "activeDealerTarget",
        },
        {
          title: "Actual",
          dataIndex: ["activeDealer", "actual"],
          key: "activeDealerActual",
        },
        {
          title: "Score",
          dataIndex: ["activeDealer", "score"],
          key: "activeDealerScore",
        },
      ],
    });
  } else if (type === "Project") {
    columns.push({
      title: <div className="bg-gray-300">CM</div>,
      key: "cm",
      children: [
        {
          title: "Weightage",
          dataIndex: ["cm", "weightage"],
          key: "cmWeightage",
          render: (weightage: number) => `${weightage}%`,
        },
        {
          title: "Target",
          dataIndex: ["cm", "target"],
          key: "cmTarget",
        },
        {
          title: "Actual",
          dataIndex: ["cm", "actual"],
          key: "cmActual",
        },
        {
          title: "Score",
          dataIndex: ["cm", "score"],
          key: "cmScore",
        },
      ],
    });
  }

  return columns;
};
