import { useEffect, useState } from "react";
import { Table, Pagination, MenuProps } from "antd";
import "../../index.css"; // or wherever your CSS is
import MarketingService from "@/services/marketing/marketing.service";
import RolesService from "@/services/roles/roles.services";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { Filter } from "@/components/iconComponents";
import MarketingCreateModal from "@/components/modules/marketing/create-marketing-modals";
import MarketingFilters, {
  FilterState,
  MARKETING_STATUS,
} from "@/components/modules/marketing/marketing-filter";
import MarketingDetailsColumns from "@/lib/constants/columns/marketing-columns";
import { MarketingType } from "@/lib/types/marketing";
import { MARKETING_TYPE } from "@/lib/enums";
import { BaseButton } from "@/components/ui/base-button";
import { PlusIcon } from "lucide-react";

export default function MarketingManagment() {
  const [filters, setFilters] = useState<FilterState>({
    types: [MARKETING_TYPE.Text, MARKETING_TYPE.Media, MARKETING_TYPE.Html],
    startDate: "",
    endDate: "",
    status: MARKETING_STATUS.Active,
  });

  const { useFetchAllMarketing } = MarketingService();
  const { useFetchAllRoles } = RolesService();

  const [limit, setMarketingLimit] = useState<number>(12);
  const [page, setUsersCurrentPage] = useState<number>(1);
  const [UsersLastPage, setUsersLastPage] = useState<number>(1);
  const [query, setMarketingQuery] = useState<string | null>(null);

  // Create/Edit Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<MarketingType | null>(null);

  // For filter side panel
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Roles (just leftover from your code)
  const [roleId, setUsersSelectedroleId] = useState<number | undefined>(
    undefined
  );
  const { data: roleData } = useFetchAllRoles();

  // Data from server
  const { data: marketingData, isFetching: isMarketingDataLoading } =
    useFetchAllMarketing(
      limit,
      page,
      query,
      filters.startDate,
      filters.endDate,
      filters.status
    );

  const totalResults = marketingData?.total || 0;

  useEffect(() => {
    if (marketingData?.lastPage) {
      setUsersLastPage(marketingData.lastPage);
    }
  }, [marketingData?.lastPage]);

  const handlePageChange = (newPage: number, pageSize?: number) => {
    setUsersCurrentPage(newPage);
    if (pageSize) setMarketingLimit(pageSize);
  };

  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;

  // Modal Handlers
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditRecord(null);
  };

  const showCreateModal = () => {
    setEditRecord(null); // ensure we are in create mode
    setIsModalOpen(true);
  };

  // Called from the table columns
  const handleEditModal = (record: MarketingType) => {
    setEditRecord(record); // store the record to be edited
    setIsModalOpen(true);
  };

  // Searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketingQuery(e.target.value || null);
  };

  // Role selection
  const items: MenuProps["items"] =
    roleData?.data.map((role) => ({
      key: role.id.toString(),
      label: <p onClick={() => handleSelectChange(role.id)}>{role.title}</p>,
    })) || [];

  const handleSelectChange = (value: number) => {
    setUsersSelectedroleId(Number(value));
  };

  // Table row selection (if needed)
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: MarketingType[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys);
      console.log("selectedRows: ", selectedRows);
    },
  };

  return (
    <div className="bg-white rounded-lg py-4 lg:p-4 ">
      {/* The filter drawer/modal */}
      <MarketingFilters
        setGlobalFilters={setFilters}
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      {/* Create/Edit Modal */}
      <MarketingCreateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editRecord={editRecord}
      />

      {/* Top controls */}
      <div className="flex justify-between pl-1 ">
        <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[77%] mb-3">
          <Input
            className="w-full lg:w-[90%] text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
            onChange={handleSearchChange}
            size="large"
            placeholder="Search Marketing..."
            prefix={<IoSearchOutline className="text-[#008444] text-[14px]" />}
          />
        </div>

        <div className="flex gap-4">
          <BaseButton
            onClick={() => setIsFilterModalOpen(true)}
            // variant={"outline"}
            size={"lg"}
            className=" border-[2px] bg-[#FAFAFA] border-gray-300  py-6 hover:bg-[#FAFAFA]"
            // className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw]"
          >
            <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
              <Filter />
            </div>
            <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
          </BaseButton>

          <BaseButton
            onClick={showCreateModal}
            // variant="default"
            size={"lg"}
            className="py-6"
            // className="flex gap-2 items-center"
          >
            <PlusIcon />
            Create
          </BaseButton>
        </div>
      </div>

      {/* Main Table */}
      <div className="w-[99%] border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table  lg:mb-5">
        <Table<MarketingType>
          // rowSelection={{
          //   type: "checkbox",
          //   ...rowSelection,
          // }}
          // Pass the custom columns, providing our onEdit callback
          columns={MarketingDetailsColumns({ onEdit: handleEditModal })}
          dataSource={
            marketingData?.data
              ?.filter((market) => market.status !== "Deactivated")
              .map((market) => ({
                ...market,
                key: market.id,
              })) || []
          }
          loading={isMarketingDataLoading}
          pagination={false}
          className="overflow-auto "
        />

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 p-4 border-t flex-col md:flex-row">
          <div className="text-sm text-gray-600 mb-5 md:mb-0">
            {showTotal(totalResults)}
          </div>
          <Pagination
            current={page}
            pageSize={limit}
            total={totalResults}
            onChange={handlePageChange}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
