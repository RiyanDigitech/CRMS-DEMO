import { useMemo, useState } from "react";
import { Table, Pagination } from "antd";
import "../../index.css";
import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import DiscountService from "@/services/discounts.service";
import { useNavigate } from "react-router-dom";
import { DiscountTableColumns } from "@/lib/constants/columns/discount-cols";
import { discountType } from "@/lib/types/discount";
import { BaseButton } from "@/components/ui/base-button";
import { PlusIcon } from "lucide-react";

export default function ViewDiscounts() {
  const { useFetchAllDiscounts } = DiscountService();
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  const { data: discountData, isLoading: isDiscountDataLoading } =
    useFetchAllDiscounts(limit, page, query);
  const totalResults = useMemo(() => {
    return discountData?.total || 0;
  }, [discountData]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize) setLimit(pageSize);
  };

  const showTotal = (total: number) =>
    `Showing ${Math.min(page * limit, totalResults)} of ${total} Results`;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: discountType[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys);
      console.log("selectedRows: ", selectedRows);
    },
  };
  return (
    <div className="bg-white rounded-lg py-4 lg:p-4 ">
      <div className="flex justify-between pl-1 ">
        <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[77%] mb-3">
          <Input
            className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4 border-[1px] border-[#EBF0ED]"
            onChange={handleSearchChange}
            size="large"
            placeholder="Search Users..."
            prefix={<IoSearchOutline className="text-[#008444] text-[14px]" />}
          />
        </div>
        <div>
          {/* <Dropdown menu={{ items }} placement="bottom" arrow>
            <button className="hidden xmd:flex  items-center justify-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3 lg:py-3  lg:w-[8vw] ">
              <div style={{ fontSize: "22px", color: "#6B6B6B" }}>
                <Filter />{" "}
              </div>
              <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
            </button>
          </Dropdown> */}
        </div>
        <BaseButton
          onClick={() => navigate(`/discounts-create`)}
          size={"xl"}
          className="flex gap-2 items-center"
        >
          <PlusIcon/>
          Create Discount
        </BaseButton>
      </div>

      <div className="w-[99%] border-[1px] lg:border-[1px] border-[#EBF0ED] rounded-lg mx-auto user-mgmt-table  lg:mb-5">
        <Table<discountType>
          //  className="border-[2px] rounded-lg overflow-auto ordertablecontainer"
          // rowSelection={{
          //     type: "checkbox",
          //     ...rowSelection,
          // }}
          columns={DiscountTableColumns()}
          dataSource={discountData?.data}
          loading={isDiscountDataLoading}
          pagination={false}
          className="overflow-auto "
        />
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
