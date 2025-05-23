import { Popover, Spin, TableColumnsType } from "antd";
import { StockData } from "@/lib/types/stock";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical, BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";
import StockTakeCreateModal from "@/components/stock-take/stock-take";
import { StockTake } from "@/lib/types/stock-take";
import StockTakeService from "@/services/stock-take/stock-take.service";
const StockTakeDetailsColumns = (): TableColumnsType<StockData> => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<StockData | null>(null);
  const { useHandleDeleteStockTakeService } = StockTakeService();
  const { mutate: deleteStockTake, isPending: isdeleteStockPending } =
    useHandleDeleteStockTakeService(selectedId);
  const handleDeleteStockTake = (teamId: number) => {
    setSelectedId(teamId);
    deleteStockTake();
  };

  const handleEditClick = (record: StockData) => {
    setEditData(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Modal band karna
    setEditData(null); // State reset karna
  };
  console.log(selectedId);
  return [
    {
      title: "Id",
      className: "w-[7%]",
      key: "id",
      ellipsis: true,
      render: (record) => <div className="w-fit">{record?.id}</div>,
    },
    {
      title: "Stock Take",
      className: "w-[140px] lg:w-fit",
      dataIndex: "stockTake",
      key: "stockTake",
      ellipsis: true,
      render: (stockTake) => <div className="rounded-md">{stockTake}</div>,
    },
    {
      title: "Take Date",
      className: "w-[130px] lg:w-fit",
      dataIndex: "takeDate",
      key: "takeDate",
      render: (takeDate) => (
        <div className="rounded-md">
          {takeDate ? takeDate.slice(0, 10) : "-"}
        </div>
      ),
    },
    {
      title: "Stock Status",
      className: "w-[130px] lg:w-[13vw] xxl:w-fit",
      dataIndex: "stockStatus",
      key: "stockStatus",
      render: (stockStatus: string) => (
        <div className="flex items-center justify-around w-fit rounded-full border border-[#008444] bg-[#F4FFFF] text-[#008444] px-2 py-2 lg:py-1 lg:px-3 text-xs lg:w-fit">
          {stockStatus}
        </div>
      ),
    },
    {
      title: "Counted QTY",
      className: "w-[130px] lg:w-fit",
      dataIndex: "countedQTY",
      key: "countedQTY",
      render: (countedQTY: string) => (
        <div>{countedQTY ? countedQTY : "-"}</div>
      ),
    },
    {
      title: "System QTY",
      className: "w-[130px] lg:w-fit",
      dataIndex: "systemQTY",
      key: "systemQTY",
      render: (systemQTY: string) => <div>{systemQTY ? systemQTY : "-"}</div>,
    },
    {
      title: "Action",
      key: "action",
      className: "w-[140px] lg:w-fit",
      render: (record) => {
        const content = (
          <div className="flex">
            <p
              onClick={() => handleEditClick(record)}
              className="mx-2 text-lg cursor-pointer"
            >
              <FaRegEdit className="text-blue-400" />
            </p>
            <p
              onClick={() => handleDeleteStockTake(record?.id)}
              className="text-lg cursor-pointer"
            >
              {isdeleteStockPending ? (
                <Spin />
              ) : (
                <BsTrash3Fill className="text-red-400" />
              )}
            </p>
          </div>
        );

        return (
          <Popover placement="right" content={content}>
            <BsThreeDotsVertical style={{ cursor: "pointer" }} />
          </Popover>
        );
      },
    },
    {
      title: "Status",
      className: "w-[130px] lg:w-fit",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div>{status === "Deactivated" ? "Inactive" : status}</div>
      ),
    },
    {
      title: "",
      key: "modal",
      className: "w-[0px]", // Ye width chhoti kar dega
      render: () => (
        <StockTakeCreateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editData={editData as StockTake | null}
        />
      ),
    },
  ];
};

export default StockTakeDetailsColumns;
