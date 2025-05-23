// import React, { useState } from "react";
// import { Table, Dropdown, Menu, Button } from "antd";
// import { ColumnsType } from "antd/es/table";
// import { DownOutlined } from "@ant-design/icons";
// import { LuArrowDownToLine } from "react-icons/lu";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// // Interfaces
// interface KpiData {
//   target: number;
//   actual: number;
//   percentage: string;
//   weight: number;
// }

// interface SalesPersonData {
//   key: string;
//   salesPerson: string;
//   region: string;
//   kpis: Record<string, KpiData>;
//   ratingScore: string;
//   slya: string;
//   slyt?: string;
// }

// // Dummy Data
// const dummyData: SalesPersonData[] = [
//   {
//     key: "1",
//     salesPerson: "Ahmed Wasim",
//     region: "Karachi",
//     kpis: {
//       Sales: { target: 30, actual: 50, percentage: "33.3%", weight: 40 },
//       DSO: { target: 18.0, actual: 16.0, percentage: "88.8%", weight: 30 },
//       CM: { target: 41, actual: 42, percentage: "41.2%", weight: 30 },
//     },
//     ratingScore: "41.2%",
//     slya: "23",
//     slyt: "20",
//   },
//   {
//     key: "2",
//     salesPerson: "Javed Ahsan",
//     region: "Karachi",
//     kpis: {
//       Sales: { target: 20, actual: 37, percentage: "15.0%", weight: 40 },
//       DSO: { target: 18.0, actual: 20.0, percentage: "157.7%", weight: 30 },
//       CM: { target: 61, actual: 51, percentage: "61.9%", weight: 30 },
//     },
//     ratingScore: "51.9%",
//     slya: "43",
//     slyt: "20",
//   },
// ];

// const NationalSalesManagerKPIDetails: React.FC = () => {
//   const [showSlya, setShowSlya] = useState(true);
//   const [showSlyt, setShowSlyt] = useState(true);

//   const allKpis = Array.from(
//     new Set(dummyData.flatMap((item) => Object.keys(item.kpis)))
//   );

//   const columns: ColumnsType<SalesPersonData> = [
//     {
//       title: "Sales Person",
//       dataIndex: "salesPerson",
//       key: "salesPerson",
//     },
//     {
//       title: "Location",
//       dataIndex: "region",
//       key: "region",
//     },
//     ...allKpis.map((kpi) => ({
//       title: `${kpi} (Wt: ${dummyData[0].kpis[kpi]?.weight || 15}%)`,
//       children: [
//         {
//           title: "Target",
//           dataIndex: ["kpis", kpi, "target"],
//           key: `${kpi}-target`,
//           render: (value: number) => (value ? value.toFixed(2) : "-"),
//         },
//         {
//           title: "Actual",
//           dataIndex: ["kpis", kpi, "actual"],
//           key: `${kpi}-actual`,
//           render: (value: number) => (value ? value.toFixed(2) : "-"),
//         },
//         {
//           title: "(%)",
//           dataIndex: ["kpis", kpi, "percentage"],
//           key: `${kpi}-percentage`,
//           render: (value: string) => value || "-",
//         },
//       ],
//     })),
//     ...(showSlya
//       ? [
//           {
//             title: "Sales Last Year Actual",
//             dataIndex: "slya",
//             key: "slya",
//           },
//         ]
//       : []),
//     ...(showSlyt
//       ? [
//           {
//             title: "Sales Last Year Target",
//             dataIndex: "slyt",
//             key: "slyt",
//           },
//         ]
//       : []),
//     {
//       title: "Rating",
//       dataIndex: "ratingScore",
//       key: "ratingScore",
//     },
//   ];

//   const exportToPDF = () => {
//     console.log("Export button clicked!");
//     console.log("Dummy Data:", dummyData);

//     if (!dummyData || dummyData.length === 0) {
//       alert("No data available to export.");
//       return;
//     }

//     try {
//       const pdf = new jsPDF("p", "mm", "a4");

//       // Add title
//       pdf.setFontSize(16);
//       pdf.text("PAKISTAN CABLES LIMITED", 105, 15, { align: "center" });
//       pdf.setFontSize(12);
//       pdf.text("SALES PERSON KPI's - Trade", 105, 25, { align: "center" });
//       pdf.text("From 01-MAR-25 To 06-MAR-25", 105, 35, { align: "center" });

//       // Prepare the table headers
//       const head = [
//         [
//           "Sales Person",
//           "Location",
//           ...allKpis.flatMap((kpi) => [
//             `${kpi} (Wt: ${dummyData[0].kpis[kpi]?.weight || 15}%) Target`,
//             `${kpi} (Wt: ${dummyData[0].kpis[kpi]?.weight || 15}%) Actual`,
//             `${kpi} (Wt: ${dummyData[0].kpis[kpi]?.weight || 15}%) (%)`,
//           ]),
//           ...(showSlya ? ["Sales Last Year Actual"] : []),
//           ...(showSlyt ? ["Sales Last Year Target"] : []),
//           "Rating",
//         ],
//       ];

//       // Prepare the table data
//       const body = dummyData.map((item) => [
//         item.salesPerson,
//         item.region,
//         ...allKpis.flatMap((kpi) => [
//           item.kpis[kpi].target.toFixed(2),
//           item.kpis[kpi].actual.toFixed(2),
//           item.kpis[kpi].percentage,
//         ]),
//         ...(showSlya ? [item.slya] : []),
//         ...(showSlyt ? [item.slyt || "-"] : []),
//         item.ratingScore,
//       ]);

//       console.log("Table Headers:", head);
//       console.log("Table Body:", body);

//       // Use autoTable as a standalone function
//       autoTable(pdf, {
//         head: head,
//         body: body,
//         startY: 45,
//         theme: "grid",
//         styles: { fontSize: 8, cellPadding: 2 },
//         headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
//         margin: { top: 45, left: 10, right: 10 },
//         columnStyles: {
//           0: { cellWidth: 25 }, // Sales Person
//           1: { cellWidth: 20 }, // Location
//         },
//       });

//       pdf.save("Sales_Person_KPI_Report.pdf");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to export PDF. Check the console for details.");
//     }
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="1" onClick={() => setShowSlya(!showSlya)}>
//         {showSlya ? "Hide" : "Show"} Last Year Actual
//       </Menu.Item>
//       <Menu.Item key="2" onClick={() => setShowSlyt(!showSlyt)}>
//         {showSlyt ? "Hide" : "Show"} Last Year Target
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div>
//       <div className="mb-4 flex justify-between items-center">
//         <Dropdown overlay={menu}>
//           <Button>
//             Hide Columns
//             <DownOutlined />
//           </Button>
//         </Dropdown>
//         <div>
//           <button
//             className="mb-3 flex items-center justify-center border-[2px] bg-white border-[#edf2ef] rounded-lg md:px-1 md:py-2 text-[#008444] font-medium lg:px-4 lg:py-3"
//             onClick={exportToPDF}
//           >
//             <LuArrowDownToLine />
//             <span className="md:ml-2">Export</span>
//           </button>
//         </div>
//       </div>
//       <div>
//         <Table
//           columns={columns}
//           dataSource={dummyData}
//           bordered
//           pagination={false}
//           scroll={{ x: "max-content" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default NationalSalesManagerKPIDetails;

// import React, { useRef, useState } from "react";
// import { Table, Dropdown, Menu, Button } from "antd";
// import { ColumnsType } from "antd/es/table";
// import { DownOutlined } from "@ant-design/icons";
// import { LuArrowDownToLine } from "react-icons/lu";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const dummyData: any[] = [
//   {
//     key: "1",
//     salesPerson: "Ahmed Wasim",
//     region: "Karachi",
//     kpis: {
//       Sales: { target: 30, actual: 50, percentage: "33.3%", weight: 40 },
//       DSO: { target: 18.0, actual: 16.0, percentage: "88.8%", weight: 30 },
//       CM: { target: 41, actual: 42, percentage: "41.2%", weight: 30 },
//     },
//     ratingScore: "41.2%",
//     slya: "23",
//     slyt: "20",
//   },
//   {
//     key: "2",
//     salesPerson: "Javed Ahsan",
//     region: "Karachi",
//     kpis: {
//       Sales: { target: 20, actual: 37, percentage: "15.0%", weight: 40 },
//       DSO: { target: 18.0, actual: 20.0, percentage: "157.7%", weight: 30 },
//       CM: { target: 61, actual: 51, percentage: "61.9%", weight: 30 },
//     },
//     ratingScore: "51.9%",
//     slya: "43",
//     slyt: "20",
//   },
//   {
//     key: "3",
//     salesPerson: "Ahmed Wasim",
//     region: "Karachi",
//     kpis: {
//       Sales: { target: 30, actual: 50, percentage: "33.3%", weight: 40 },
//       DSO: { target: 18.0, actual: 16.0, percentage: "88.8%", weight: 30 },
//       ActiveDealer: { target: 41, actual: 42, percentage: "41.2%", weight: 30 },
//     },
//     ratingScore: "81.2%",
//     slya: "23",
//     slyt: "20",
//   },
// ];

// const NationalSalesManagerKPIDetails: React.FC = () => {
//   const [showSlya, setShowSlya] = useState(true);
//   const [showSlyt, setShowSlyt] = useState(true);
//   const tableRef = useRef<HTMLDivElement>(null);
//   const pdfTableRef = useRef<HTMLDivElement>(null); // New ref for PDF rendering

//   const allKpis = Array.from(
//     new Set(dummyData.flatMap((item) => Object.keys(item.kpis)))
//   );

//   const columns: ColumnsType<any> = [
//     {
//       title: "Sales Person",
//       dataIndex: "salesPerson",
//       key: "salesPerson",
//       width: 120, // Fixed width for better control
//     },
//     {
//       title: "Location",
//       dataIndex: "region",
//       key: "region",
//       width: 100,
//     },
//     ...allKpis.map((kpi) => ({
//       title: `${kpi} (Wt: ${dummyData[0].kpis[kpi]?.weight || 15}%)`,
//       children: [
//         {
//           title: "Target",
//           dataIndex: ["kpis", kpi, "target"],
//           key: `${kpi}-target`,
//           width: 80,
//           render: (value: number) => (value ? value.toFixed(2) : "-"),
//         },
//         {
//           title: "Actual",
//           dataIndex: ["kpis", kpi, "actual"],
//           key: `${kpi}-actual`,
//           width: 80,
//           render: (value: number) => (value ? value.toFixed(2) : "-"),
//         },
//         {
//           title: "(%)",
//           dataIndex: ["kpis", kpi, "percentage"],
//           key: `${kpi}-percentage`,
//           width: 80,
//           render: (value: string) => value || "-",
//         },
//       ],
//     })),
//     ...(showSlya
//       ? [
//           {
//             title: "Sales Last Year Actual",
//             dataIndex: "slya",
//             key: "slya",
//             width: 100,
//           },
//         ]
//       : []),
//     ...(showSlyt
//       ? [
//           {
//             title: "Sales Last Year Target",
//             dataIndex: "slyt",
//             key: "slyt",
//             width: 100,
//           },
//         ]
//       : []),
//     {
//       title: "Rating",
//       dataIndex: "ratingScore",
//       key: "ratingScore",
//       width: 80,
//     },
//   ];

//   const menu = (
//     <Menu>
//       <Menu.Item key="1" onClick={() => setShowSlya(!showSlya)}>
//         {showSlya ? "Hide" : "Show"} Last Year Actual
//       </Menu.Item>
//       <Menu.Item key="2" onClick={() => setShowSlyt(!showSlyt)}>
//         {showSlyt ? "Hide" : "Show"} Last Year Target
//       </Menu.Item>
//     </Menu>
//   );

//   const handleExportPDF = () => {
//     const input = pdfTableRef.current;
//     if (!input) return;

//     // Temporarily remove scroll and set table to full width
//     input.style.width = "auto";
//     input.style.overflow = "visible";

//     html2canvas(input, {
//       scale: 1, // Reduced scale for better fit
//       useCORS: true,
//       width: input.scrollWidth, // Capture full table width
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("l", "mm", "a4"); // Landscape mode

//       // Get image dimensions
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth(); // 297mm
//       const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm
//       const imgWidth = imgProps.width;
//       const imgHeight = imgProps.height;

//       // Calculate scaling factor to fit within PDF page
//       const scaleFactor =
//         Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.9; // 90% to add margin

//       // Calculate scaled dimensions
//       const scaledImgWidth = imgWidth * scaleFactor;
//       const scaledImgHeight = imgHeight * scaleFactor;

//       // Center the image
//       const xOffset = (pdfWidth - scaledImgWidth) / 2;
//       const yOffset = (pdfHeight - scaledImgHeight) / 2;

//       // Add image to PDF
//       pdf.addImage(
//         imgData,
//         "PNG",
//         xOffset,
//         yOffset,
//         scaledImgWidth,
//         scaledImgHeight
//       );
//       pdf.save("sales_kpi_report.pdf");

//       // Restore original styles
//       input.style.width = "";
//       input.style.overflow = "";
//     });
//   };

//   return (
//     <div>
//       <div className="mb-4 flex justify-between items-center">
//         <Dropdown overlay={menu}>
//           <Button>
//             Hide Columns
//             <DownOutlined />
//           </Button>
//         </Dropdown>
//         <div>
//           <button
//             onClick={handleExportPDF}
//             className="mb-3 flex items-center justify-center border-[2px] bg-white border-[#edf2ef] rounded-lg md:px-1 md:py-2 text-[#008444] font-medium lg:px-4 lg:py-3"
//           >
//             <LuArrowDownToLine />
//             <span className="md:ml-2">Export PDF</span>
//           </button>
//         </div>
//       </div>

//       {/* Main table for display */}
//       <div ref={tableRef} className="pdf-table">
//         <Table
//           columns={columns}
//           dataSource={dummyData}
//           bordered
//           pagination={false}
//           scroll={{ x: "max-content" }}
//         />
//       </div>

//       {/* Hidden table for PDF rendering */}
//       <div
//         ref={pdfTableRef}
//         style={{
//           position: "absolute",
//           top: "-9999px",
//           left: "-9999px",
//           width: "auto",
//         }}
//       >
//         <Table
//           columns={columns}
//           dataSource={dummyData}
//           bordered
//           pagination={false}
//           scroll={false} // Disable scroll for PDF
//         />
//       </div>
//     </div>
//   );
// };

// export default NationalSalesManagerKPIDetails;
import React, { useRef, useState } from "react";
import { Table, Dropdown, Menu, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import { LuArrowDownToLine } from "react-icons/lu";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const dummyData: any[] = [
  {
    key: "1",
    salesPerson: "Ahmed Wasim",
    region: "Karachi",
    kpis: {
      Sales: { target: 30, actual: 50, percentage: "33.3%", weight: 40 },
      DSO: { target: 18.0, actual: 16.0, percentage: "88.8%", weight: 30 },
      CM: { target: 41, actual: 42, percentage: "41.2%", weight: 30 },
    },
    ratingScore: "41.2%",
    slya: "23",
    slyt: "20",
  },
  {
    key: "2",
    salesPerson: "Javed Ahsan",
    region: "Karachi",
    kpis: {
      Sales: { target: 20, actual: 37, percentage: "15.0%", weight: 40 },
      DSO: { target: 18.0, actual: 20.0, percentage: "157.7%", weight: 30 },
      CM: { target: 61, actual: 51, percentage: "61.9%", weight: 30 },
    },
    ratingScore: "51.9%",
    slya: "43",
    slyt: "20",
  },
  // {
  //   key: "3",
  //   salesPerson: "Ahmed Wasim",
  //   region: "Karachi",
  //   kpis: {
  //     Sales: { target: 30, actual: 50, percentage: "93.3%", weight: 40 },
  //     DSO: { target: 18.0, actual: 16.0, percentage: "88.8%", weight: 30 },
  //     ActiveDealer: { target: 41, actual: 42, percentage: "91.2%", weight: 15 },
  //   },
  //   ratingScore: "81.2%",
  //   slya: "23",
  //   slyt: "20",
  // },
];

const NationalSalesManagerKPIDetails: React.FC = () => {
  const [showSlya, setShowSlya] = useState(true);
  const [showSlyt, setShowSlyt] = useState(true);
  const tableRef = useRef<HTMLDivElement>(null);
  const pdfTableRef = useRef<HTMLDivElement>(null);

  // Get all unique KPIs from dummyData
  const allKpis = Array.from(
    new Set(dummyData.flatMap((item) => Object.keys(item.kpis)))
  );

  // Function to get weight for a KPI dynamically
  const getKpiWeight = (kpi: string) => {
    // Find the first occurrence of the KPI in dummyData and return its weight
    const itemWithKpi = dummyData.find((item) => item.kpis[kpi]);
    return itemWithKpi?.kpis[kpi]?.weight || 15; // Default to 15 if not found
  };

  const columns: ColumnsType<any> = [
    {
      title: "Sales Person",
      dataIndex: "salesPerson",
      key: "salesPerson",
      width: 120,
    },
    {
      title: "Location",
      dataIndex: "region",
      key: "region",
      width: 100,
    },
    ...allKpis.map((kpi) => ({
      title: `${kpi} (Wt: ${getKpiWeight(kpi)}%)`, // Dynamic weight
      children: [
        {
          title: "Target",
          dataIndex: ["kpis", kpi, "target"],
          key: `${kpi}-target`,
          width: 80,
          render: (value: number) =>
            value !== undefined ? value.toFixed(2) : "-",
        },
        {
          title: "Actual",
          dataIndex: ["kpis", kpi, "actual"],
          key: `${kpi}-actual`,
          width: 80,
          render: (value: number) =>
            value !== undefined ? value.toFixed(2) : "-",
        },
        {
          title: "(%)",
          dataIndex: ["kpis", kpi, "percentage"],
          key: `${kpi}-percentage`,
          width: 80,
          render: (value: string) => value || "-",
        },
      ],
    })),
    ...(showSlya
      ? [
          {
            title: "Sales Last Year Actual",
            dataIndex: "slya",
            key: "slya",
            width: 100,
          },
        ]
      : []),
    ...(showSlyt
      ? [
          {
            title: "Sales Last Year Target",
            dataIndex: "slyt",
            key: "slyt",
            width: 100,
          },
        ]
      : []),
    {
      title: "Rating",
      dataIndex: "ratingScore",
      key: "ratingScore",
      width: 80,
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setShowSlya(!showSlya)}>
        {showSlya ? "Hide" : "Show"} Last Year Actual
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setShowSlyt(!showSlyt)}>
        {showSlyt ? "Hide" : "Show"} Last Year Target
      </Menu.Item>
    </Menu>
  );

  const handleExportPDF = () => {
    const input = pdfTableRef.current;
    if (!input) return;

    // Temporarily remove scroll and set table to full width
    input.style.width = "auto";
    input.style.overflow = "visible";

    html2canvas(input, {
      scale: 1,
      useCORS: true,
      width: input.scrollWidth,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;

      const scaleFactor =
        Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.9;

      const scaledImgWidth = imgWidth * scaleFactor;
      const scaledImgHeight = imgHeight * scaleFactor;

      const xOffset = (pdfWidth - scaledImgWidth) / 2;
      const yOffset = (pdfHeight - scaledImgHeight) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        xOffset,
        yOffset,
        scaledImgWidth,
        scaledImgHeight
      );
      pdf.save("sales_kpi_report.pdf");

      input.style.width = "";
      input.style.overflow = "";
    });
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Dropdown overlay={menu}>
          <Button>
            Hide Columns
            <DownOutlined />
          </Button>
        </Dropdown>
        <div>
          <button
            onClick={handleExportPDF}
            className="mb-3 flex items-center justify-center border-[2px] bg-white border-[#edf2ef] rounded-lg md:px-1 md:py-2 text-[#008444] font-medium lg:px-4 lg:py-3"
          >
            <LuArrowDownToLine />
            <span className="md:ml-2">Export PDF</span>
          </button>
        </div>
      </div>

      <div ref={tableRef} className="pdf-table">
        <Table
          columns={columns}
          dataSource={dummyData}
          bordered
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </div>

      <div
        ref={pdfTableRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "auto",
        }}
      >
        <Table
          columns={columns}
          dataSource={dummyData}
          bordered
          pagination={false}
          scroll={false}
        />
      </div>
    </div>
  );
};

export default NationalSalesManagerKPIDetails;
