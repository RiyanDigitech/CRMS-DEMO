import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Card,
  Button,
  Select,
  Space,
  Typography,
  Tooltip,
  Divider,
  message,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PercentageOutlined,
  TagOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { z } from 'zod';

// -------- Services & Schemas --------
import { discountFormDataSchema } from '@/lib/schemas';
import CategoryService from '@/services/category.service';
import ProductService from '@/services/product.service';
import LocationService from '@/services/Location/location';
import DiscountService from '@/services/discounts.service';
import { BaseButton } from '@/components/ui/base-button';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Define the types of conditions that can be added
type ConditionType = 'categoryIds' | 'productIds' | 'regionIds' | 'userIds';

// Condition type options (icons + labels)
const conditionTypeOptions = [
  {
    label: 'Categories',
    value: 'categoryIds',
    icon: <AppstoreOutlined style={{ color: '#008444' }} />,
  },
  {
    label: 'Products',
    value: 'productIds',
    icon: <TagOutlined style={{ color: '#008444' }} />,
  },
  {
    label: 'Regions',
    value: 'regionIds',
    icon: <GlobalOutlined style={{ color: '#008444' }} />,
  },
  // Add more if you want (like userIds)
];

// Each condition can store an optional `segmentId` specifically for `regionIds` type
interface Condition {
  type: ConditionType;
  // We only need `segmentId` if the type === 'regionIds'
  segmentId?: number | null;
  values: number[] | null; // We'll store selected IDs (categories, products, or region IDs)
}

const DiscountForm: React.FC = () => {
  // ------------------ FETCH DATA -------------------
  const { useFetchAllCategories } = CategoryService();
  const { data: categoryData } = useFetchAllCategories();

  const { useFetchProductsList } = ProductService();
  const { data: productData } = useFetchProductsList(100000, 1);

  const { useFetchAllSegments } = LocationService();
  // For clarity, `regionData` actually contains "segment" objects,
  // each with an internal `regions` array.
  const { data: regionData } = useFetchAllSegments();

  // ----- Category Options -----
  const categoryOptions = useMemo(() => {
    if (!categoryData?.data) return [];
    return categoryData.data.map((cat) => ({
      label: cat,
      value: cat,
    }));
  }, [categoryData]);

  // ----- Product Options -----
  const productOptions = useMemo(() => {
    if (!productData?.data) return [];
    return productData.data.map((product: any) => ({
      label: product.description,
      value: product.id,
    }));
  }, [productData]);

  // NOTE: The API returns something like:
  // data: [
  //   {
  //     id: 1,
  //     name: "Wire & Cable",
  //     regions: [
  //       { id: 1, name: "South", operatingUnit: [...] },
  //       { id: 2, name: "Central-I", operatingUnit: [...] },
  //       ...
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: "Wire Accessories",
  //     regions: [...]
  //   }
  // ]
  // So each top-level object is actually a "segment" (e.g. "Wire & Cable"),
  // and within that, there's an array "regions".

  // ------------------ FORM SETUP -------------------
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof discountFormDataSchema>>({
    resolver: zodResolver(discountFormDataSchema),
    defaultValues: {
      name: '',
      type: 'Percentage',
      amount: 10,
      maxUsage: 100,
      dateRange: [],
      criteria: {
        categoryIds: [],
        productIds: [],
        regionIds: [],
        minAmount: 5000,
      },
    },
  });

  // ------------------ DYNAMIC CONDITIONS -------------------
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [conditionErrors, setConditionErrors] = useState<(string | null)[]>([]);

  // Add a new condition row
  const handleAddCondition = () => {
    // Find the first available type that's not already used
    const availableTypes = conditionTypeOptions.filter(
      (opt) => !conditions.some((c) => c.type === opt.value)
    );

    // Default to 'categoryIds' if no more available
    const newType = (availableTypes[0]?.value as ConditionType) || 'categoryIds';

    setConditions((prev) => [
      ...prev,
      {
        type: newType,
        // For regionIds, we store segmentId: null, otherwise undefined is fine
        segmentId: newType === 'regionIds' ? null : undefined,
        values: null,
      },
    ]);
    setConditionErrors((prev) => [...prev, null]);
  };

  // Remove a condition row
  const handleRemoveCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
    setConditionErrors((prev) => prev.filter((_, i) => i !== index));
  };

  // Change condition type
  const handleConditionTypeChange = (index: number, newType: ConditionType) => {
    setConditions((prev) => {
      const updated = [...prev];
      updated[index] = {
        type: newType,
        // If we switch to regionIds, reset segmentId; if not, remove it
        segmentId: newType === 'regionIds' ? null : undefined,
        values: null,
      };
      return updated;
    });
    setConditionErrors((prev) => {
      const updated = [...prev];
      updated[index] = null; // reset error
      return updated;
    });
  };

  // Change condition values
  const handleConditionValuesChange = (
    index: number,
    newValues: number[] | null
  ) => {
    setConditions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], values: newValues };
      return updated;
    });
    setConditionErrors((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  // When the user picks a segment for a region-based condition
  const handleConditionSegmentChange = (index: number, segmentId: number | null) => {
    setConditions((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        segmentId,
        // Reset the region list when segment changes
        values: [],
      };
      return updated;
    });
    setConditionErrors((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  // ------------------ CREATE DISCOUNT MUTATION -------------------
  const { useHandleCreateDiscount } = DiscountService();
  const { mutate: handleCreateDiscount } = useHandleCreateDiscount();

  // ------------------ SUBMIT HANDLER -------------------
  const onSubmit = (formData: z.infer<typeof discountFormDataSchema>) => {
    // 1. Convert the RangePicker array to [validFrom, validTill]
    const [start, end] = formData.dateRange || [];
    const validFrom = start || null;
    const validTill = end || null;

    // 2. Validate dynamic conditions (if any exist)
    const newConditionErrors = conditions.map((cond) => {
      if (!cond.values || cond.values.length === 0) {
        return 'Please select at least one item or remove this condition.';
      }
      return null;
    });
    if (newConditionErrors.some((err) => err !== null)) {
      setConditionErrors(newConditionErrors);
      message.error('Please fix empty condition(s) before submitting.');
      return;
    }

    // 3. Build the final criteria object.
    //    Start with the default from the form (which includes minAmount).
    const finalCriteria = {
      categoryIds: null as number[] | null,
      productIds: null as number[] | null,
      regionIds: null as number[] | null,
      minAmount: formData.criteria.minAmount || 0,
    };

    conditions.forEach((cond) => {
      if (!cond.values || cond.values.length === 0) return;
      if (cond.type === 'categoryIds') {
        finalCriteria.categoryIds = cond.values;
      } else if (cond.type === 'productIds') {
        finalCriteria.productIds = cond.values;
      } else if (cond.type === 'regionIds') {
        // Only send the region IDs to backend (no segment ID)
        finalCriteria.regionIds = cond.values;
      }
    });

    // 4. Build final payload
    const payload = {
      name: formData.name,
      type: formData.type,
      amount: formData.amount,
      maxUsage: formData.maxUsage,
      validFrom,
      validTill,
      criteria: finalCriteria,
    };

    // 5. Submit
    handleCreateDiscount(payload);
  };

  // --------------- RENDER UI ----------------
  return (
    <div className="min-h-[calc(100vh-180px)]">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl rounded-2xl border-0">
          <div className="flex items-center gap-3 mb-8">
            <TagOutlined className="text-2xl text-[#008444]" />
            <Title level={3} style={{ margin: 0 }}>
              Create New Discount
            </Title>
          </div>

          <Form layout="vertical" onFinish={handleSubmit(onSubmit)} size="large">
            {/* ====== GENERAL DISCOUNT INFO ====== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Discount Name */}
              <Form.Item
                label={
                  <Space>
                    <span>Discount Name</span>
                    <Tooltip title="Enter a unique name for your discount">
                      <InfoCircleOutlined className="text-gray-400" />
                    </Tooltip>
                  </Space>
                }
                required
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name?.message as string}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                      placeholder="e.g., Summer Sale 2024"
                    />
                  )}
                />
              </Form.Item>

              {/* Discount Type */}
              <Form.Item
                label={
                  <Space>
                    <span>Discount Type</span>
                    <Tooltip title="Choose between percentage or flat amount discount">
                      <InfoCircleOutlined className="text-gray-400" />
                    </Tooltip>
                  </Space>
                }
                required
                validateStatus={errors.type ? 'error' : ''}
                help={errors.type?.message as string}
              >
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full custom-select"
                      options={[
                        {
                          label: (
                            <Space>
                              <PercentageOutlined />
                              <span>Percentage Off</span>
                            </Space>
                          ),
                          value: 'Percentage',
                        },
                        {
                          label: (
                            <Space>
                              <div>Rs.</div>
                              <span>Flat Amount</span>
                            </Space>
                          ),
                          value: 'Flat',
                        },
                      ]}
                    />
                  )}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Discount Amount */}
              <Form.Item
                label={
                  <Space>
                    <span>Discount Amount</span>
                    <Tooltip
                      title={
                        watch('type') === 'Percentage'
                          ? 'Enter a percentage between 0-100'
                          : 'Enter discount amount'
                      }
                    >
                      <InfoCircleOutlined className="text-gray-400" />
                    </Tooltip>
                  </Space>
                }
                required
                validateStatus={errors.amount ? 'error' : ''}
                help={errors.amount?.message as string}
              >
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                      min={0}
                      max={watch('type') === 'Percentage' ? 100 : undefined}
                      prefix={
                        watch('type') === 'Percentage' ? (
                          <PercentageOutlined />
                        ) : (
                          <p>Rs.</p>
                        )
                      }
                    />
                  )}
                />
              </Form.Item>

              {/* Maximum Usage */}
              <Form.Item
                label={
                  <Space>
                    <span>Maximum Usage</span>
                    <Tooltip title="Maximum number of times this discount can be used">
                      <InfoCircleOutlined className="text-gray-400" />
                    </Tooltip>
                  </Space>
                }
                required
                validateStatus={errors.maxUsage ? 'error' : ''}
                help={errors.maxUsage?.message as string}
              >
                <Controller
                  name="maxUsage"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                      min={1}
                      placeholder="Max number of redemptions"
                    />
                  )}
                />
              </Form.Item>
            </div>

            {/* Validity Period */}
            <Form.Item
              label="Validity Period"
              required
              validateStatus={errors.dateRange ? 'error' : ''}
              help={errors.dateRange?.message as string}
            >
              <Controller
                name="dateRange"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RangePicker
                    value={
                      value && value.length === 2
                        ? [dayjs(value[0]), dayjs(value[1])]
                        : []
                    }
                    onChange={(dates) => {
                      if (dates && dates.length === 2) {
                        onChange([dates[0].toISOString(), dates[1].toISOString()]);
                      } else {
                        onChange([]);
                      }
                    }}
                    format="YYYY-MM-DD"
                    placeholder={['Start Date', 'End Date']}
                    suffixIcon={<CalendarOutlined />}
                  />
                )}
              />
            </Form.Item>

            <Divider />

            {/* ====== DISCOUNT CRITERIA ====== */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <Space align="center">
                  <Text strong className="text-lg">
                    Discount Criteria
                  </Text>
                  <Tooltip title="Add conditions to limit discount usage (e.g., by region, category, or product)">
                    <InfoCircleOutlined className="text-gray-400" />
                  </Tooltip>
                </Space>

                {conditions.length < conditionTypeOptions.length && (
                  <BaseButton type="button" variant="outline" onClick={handleAddCondition}>
                    <PlusOutlined />
                    Add Condition
                  </BaseButton>
                )}
              </div>

              {/* Dynamic Condition Rows */}
              <div className="space-y-4">
                {conditions.map((condition, idx) => {
                  // For categoryIds or productIds, we just have a single multi-select
                  let options = [];
                  if (condition.type === 'categoryIds') {
                    options = categoryOptions;
                  } else if (condition.type === 'productIds') {
                    options = productOptions;
                  }

                  // "segmentOptions" represent the top-level "Wire & Cable", "Wire Accessories", etc.
                  const segmentOptions =
                    regionData?.data?.map((segment) => ({
                      label: segment.name,
                      value: segment.id,
                    })) || [];

                  // Once a segment is chosen, we can filter out the "regions" from that segment
                  let regionOptions: { label: string; value: number }[] = [];
                  if (condition.type === 'regionIds' && condition.segmentId) {
                    const foundSegment = regionData?.data?.find(
                      (seg) => seg.id === condition.segmentId
                    );
                    regionOptions =
                      foundSegment?.regions?.map((r) => ({
                        label: r.name,
                        value: r.id,
                      })) || [];
                  }

                  // Condition Type metadata (icon + label)
                  const typeMeta = conditionTypeOptions.find(
                    (t) => t.value === condition.type
                  );

                  return (
                    <Card key={idx} size="small" className="border-gray-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* ---------------- Condition Type Select ---------------- */}
                        <div className="flex-1 min-w-[200px]">
                          <Text className="block mb-1 font-semibold">Condition Type</Text>
                          <Select
                            className="w-full custom-select"
                            value={condition.type}
                            onChange={(val) =>
                              handleConditionTypeChange(idx, val as ConditionType)
                            }
                            options={conditionTypeOptions
                              .filter((opt) => {
                                // allow current type or any type not already used
                                return (
                                  opt.value === condition.type ||
                                  !conditions.some((c) => c.type === opt.value)
                                );
                              })
                              .map((opt) => ({
                                label: (
                                  <Space>
                                    {opt.icon}
                                    {opt.label}
                                  </Space>
                                ),
                                value: opt.value,
                              }))}
                          />
                        </div>

                        {/* ---------------- If Condition Type is regionIds ---------------- */}
                        {condition.type === 'regionIds' && (
                          <>
                            {/* Segment Select */}
                            <div className="flex-1 min-w-[200px]">
                              <Text className="block mb-1 font-semibold">Segment</Text>
                              <Select
                                className="w-full custom-select"
                                placeholder="Select a Segment"
                                value={condition.segmentId ?? undefined}
                                options={segmentOptions}
                                onChange={(segId) => handleConditionSegmentChange(idx, segId)}
                              />
                            </div>

                            {/* Region(s) Select */}
                            <div className="flex-1 min-w-[250px]">
                              <Text className="block mb-1 font-semibold">Regions</Text>
                              <Select
                                className="w-full custom-select"
                                mode="multiple"
                                disabled={!condition.segmentId} // must pick a segment first
                                placeholder="Select Region(s)"
                                value={condition.values || []}
                                onChange={(vals) => handleConditionValuesChange(idx, vals)}
                                options={regionOptions}
                                maxTagCount={3}
                              />
                            </div>
                          </>
                        )}

                        {/* ---------------- Category or Product Condition ---------------- */}
                        {(condition.type === 'categoryIds' ||
                          condition.type === 'productIds') && (
                          <div className="flex-1 min-w-[250px]">
                            <Text className="block mb-1 font-semibold">
                              {typeMeta?.label || 'Values'}
                            </Text>
                            <Select
                              className="w-full custom-select"
                              mode="multiple"
                              placeholder={`Select ${typeMeta?.label || 'Items'}`}
                              value={condition.values || []}
                              onChange={(vals) =>
                                handleConditionValuesChange(idx, vals as number[])
                              }
                              options={options}
                              maxTagCount={3}
                              showArrow
                            />
                          </div>
                        )}

                        {/* Delete Condition Button */}
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveCondition(idx)}
                        />
                      </div>

                      {/* Condition error message (if any) */}
                      {conditionErrors[idx] && (
                        <div style={{ color: 'red', marginTop: '4px' }}>
                          {conditionErrors[idx]}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Minimum Order Amount (always visible) */}
              <div className="mt-6">
                <Form.Item
                  label={
                    <Space>
                      <span>Minimum Order Amount</span>
                      <Tooltip title="Minimum cart value required to apply this discount">
                        <InfoCircleOutlined className="text-gray-400" />
                      </Tooltip>
                    </Space>
                  }
                  required
                  validateStatus={errors.criteria?.minAmount ? 'error' : ''}
                  help={(errors.criteria?.minAmount?.message as string) || ''}
                >
                  <Controller
                    name="criteria.minAmount"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        className="h-[38px] w-full bg-[#fafafa] border-[1px] border-[#EBF0ED] mt-[3px]"
                        min={0}
                        step={100}
                        prefix={<div>Rs.</div>}
                      />
                    )}
                  />
                </Form.Item>
              </div>
            </div>

            {/* ====== ACTION BUTTONS ====== */}
            <div className="flex justify-end pt-6">
              <Space size="middle">
                <BaseButton variant="default" type="submit" size="lg">
                  Create Discount
                </BaseButton>
              </Space>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default DiscountForm;
