export interface FilterType {
  name: string;
  count: number;
}

export enum MARKETING_STATUS {
  // Archived = 'Archived',
  Expired = "Expired",
  Active = "Active",
}

export interface FilterState {
  types: MARKETING_TYPE[];
  isActive?: boolean;
  isExpired?: boolean;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
  createDate?: string;
  status: MARKETING_STATUS;
}

import React, { SetStateAction, useState } from "react";
import { Modal, Button, Checkbox, Tag, Select } from "antd";
import { DatePicker } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { MARKETING_TYPE } from "@/lib/enums";
import dayjs from "dayjs";
import Base from "antd/es/typography/Base";
import { BaseButton } from "@/components/ui/base-button";
const { RangePicker } = DatePicker;
const { Option } = Select;

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  setGlobalFilters: React.Dispatch<SetStateAction<FilterState>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  setGlobalFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    startDate: "",
    endDate: "",
    status: MARKETING_STATUS.Active,
  });

  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const types: FilterType[] = [
    { name: "HTML", count: 145 },
    { name: "Text", count: 15 },
    { name: "Media", count: 458 },
  ];

  const handleTypeChange = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      types: checked
        ? [...prev.types, value]
        : prev.types.filter((type) => type !== value),
    }));
  };

  const clearFilter = (filterKey: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: Array.isArray(prev[filterKey]) ? [] : "",
    }));
  };

  const clearAll = () => {
    setFilters({
      types: [],
      isActive: undefined,
      isExpired: undefined,
      searchQuery: "",
      startDate: "",
      endDate: "",
      createDate: "",
      status: MARKETING_STATUS.Active,
    });
    setDateRange(null);
  };

  const getActiveTags = () => {
    const tags: { key: keyof FilterState; value: string }[] = [];

    if (filters.types.length > 0) {
      filters.types.forEach((type) => tags.push({ key: "types", value: type }));
    }
    if (filters.searchQuery) {
      tags.push({
        key: "searchQuery",
        value: `Search: ${filters.searchQuery}`,
      });
    }
    if (filters.startDate && filters.endDate) {
      tags.push({
        key: "startDate",
        value: `Date Range: ${filters.startDate} - ${filters.endDate}`,
      });
    }
    if (filters.createDate) {
      tags.push({ key: "createDate", value: `Created: ${filters.createDate}` });
    }

    return tags;
  };

  return (
    <Modal
      title="Filters"
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <BaseButton
          key="apply"
          // type="primary"
          // className="bg-[#FF7F50] hover:bg-[#FF6347] text-white"
          // className="button-small-primary"
        variant={"default"}
        size={"lg"}
          onClick={() => {
            setGlobalFilters(filters);
            onClose();
          }}
        >
          Apply
        </BaseButton>,
      ]}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {getActiveTags().map(({ key, value }) => (
          <Tag
            key={`${key}-${value}`}
            closable
            onClose={() => clearFilter(key)}
            className="px-3 py-1 rounded-full bg-gray-100"
          >
            {value}
          </Tag>
        ))}
        {getActiveTags().length > 0 && (
          <Button
            type="link"
            onClick={clearAll}
            className="text-[#FF7F50] hover:text-[#FF6347]"
          >
            CLEAR ALL
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* <div>
                    <h3 className="text-lg font-medium mb-4">Search</h3>
                    <Input
                        className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        placeholder="Search..."
                        value={filters.searchQuery}
                        onChange={(e) => {
                            setFilters(prev => ({ ...prev, searchQuery: e.target.value }))
                        }}
                        prefix={<Search className="h-4 w-4 text-gray-400" />}
                    />
                </div> */}

        <div>
          <h3 className="text-lg font-medium mb-4">Date Range</h3>
          <RangePicker
            value={
              dateRange ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : null
            }
            onChange={(_, dateString) => {
              setDateRange(dateString as [string, string]);
              setFilters((prev) => ({
                ...prev,
                startDate: dateString[0],
                endDate: dateString[1],
              }));

              // setFilters(prev => ({ ...prev, startDate: dateString[0] }))
              // setFilters(prev => ({ ...prev, endDate: dateString[1] }))
            }}
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            placeholder={["Start Date", "End Date"]}
          />
        </div>

        {/* <div>
                    <h3 className="text-lg font-medium mb-4">Type</h3>
                    <div className="space-y-3">
                        {types.map(type => (
                            <div key={type.name} className="flex justify-between items-center">
                                <Checkbox
                                    value={type.name}
                                    checked={filters.types.includes(type.name)}
                                    onChange={handleTypeChange}
                                >
                                    {type.name}
                                </Checkbox>
                                <span className="text-gray-500">{type.count}</span>
                            </div>
                        ))}
                    </div>
                </div> */}

        <div className="w-full">
          <h3 className="text-lg font-medium mb-4">Status</h3>
          <Select
            placeholder="Select Campaign Status"
            className="custom-select !w-full !mb-4"
            value={filters.status}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, status: e }));
            }}
          >
            <Option value={MARKETING_STATUS.Active}>Active</Option>
            {/* <Option value={MARKETING_STATUS.Archived}>Archived</Option> */}
            <Option value={MARKETING_STATUS.Expired}>Expired</Option>
          </Select>
        </div>

        {/* <div className="space-y-4 mb-10">
                    <h3 className="text-lg font-medium mb-4">Status</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-base">Active</span>
                        <Switch checked={filters.isActive} onChange={(checked) => setFilters(prev => ({ ...prev, isActive: checked }))} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-base">Expired</span>
                        <Switch checked={filters.isExpired} onChange={(checked) => setFilters(prev => ({ ...prev, isExpired: checked }))} />
                    </div>
                </div> */}
      </div>
    </Modal>
  );
};

export default FilterModal;
