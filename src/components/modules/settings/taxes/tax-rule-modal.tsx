import { useEffect } from "react";
import { Modal, Form, Input, Checkbox, Select, InputNumber } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import CategoryService from "@/services/category.service";
import LocationService from "@/services/Location/location";
import { BaseButton } from "@/components/ui/base-button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.number().min(0, "Value must be non-negative"),
  isActive: z.boolean(),
  criteria: z.object({
    categories: z.array(z.string()).nullable().optional(),
    userIds: z.array(z.string()).nullable().optional(),
    regionIds: z.array(z.string()).nullable().optional(),
    productIds: z.array(z.string()).nullable().optional(),
    minAmount: z
      .number()
      .min(0, "Minimum amount must be non-negative")
      .optional(),
    maxAmount: z
      .number()
      .min(0, "Maximum amount must be non-negative")
      .optional(),
  }),
});

interface TaxRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rule: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema> | null;
}

export function TaxRuleModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TaxRuleModalProps) {
  const { useFetchAllCategories } = CategoryService();
  const { data: categoryData } = useFetchAllCategories();
  const { useFetchAllRegions } = LocationService();
  const { data: regionData } = useFetchAllRegions();
  const [form] = Form.useForm();

  console.log(categoryData, "Category Data");
  console.log(categoryData?.data, "Category Data.data");
  const { control, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: 0,
      isActive: false,
      criteria: {
        categories: [],
        regionIds: [],
        minAmount: 0,
        maxAmount: 0,
      },
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        value: Number(initialData.value),
        isActive: initialData.isActive,
        criteria: {
          ...initialData.criteria,
          minAmount: Number(initialData.criteria.minAmount),
          maxAmount: Number(initialData.criteria.maxAmount),
        },
      });
      form.setFieldsValue({
        ...initialData,
        value: Number(initialData.value),
        isActive: initialData?.isActive,
        criteria: {
          ...initialData.criteria,
          minAmount: Number(initialData.criteria.minAmount),
          maxAmount: Number(initialData.criteria.maxAmount),
        },
      });
    } else {
      reset({
        name: "",
        value: 0,
        isActive: false,
        criteria: {
          categories: [],
          regionIds: [],
          minAmount: 0,
          maxAmount: 0,
        },
      });
      form.resetFields();
    }
  }, [initialData, isOpen, reset, form]);

  const categoryOptions =
    categoryData?.data.map((el) => ({
      label: el,
      value: el,
    })) || [];

  const regionOptions =
    regionData?.data.map((el) => ({
      label: el.name,
      value: String(el.id),
    })) || [];

  const handleClose = () => {
    reset();
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title={initialData ? "Edit Tax Rule" : "Add New Tax Rule"}
      open={isOpen}
      onCancel={handleClose}
      // onOk={handleSubmit(onSubmit)}
      footer={[
        <div className="space-x-4">
          <BaseButton
            key="cancel"
            variant={"outline"}
            size={"lg"}
            onClick={handleClose}
          >
            Cancel
          </BaseButton>
          ,
          <BaseButton
            key="save"
            variant={"default"}
            size={"lg"}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </BaseButton>
          ,
        </div>,
      ]}
      width={800}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Form.Item label="Name">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  placeholder="Tax title"
                  {...field}
                  status={fieldState.error ? "error" : ""}
                  className="activity-type-field bg-[#fafafa] border border-[#EBF0ED] rounded-[10px] hover:bg-transparent"
                  style={{ height: "35px" }}
                />
              )}
            />
          </Form.Item>

          <Form.Item label="Value (%)">
            <Controller
              name="value"
              control={control}
              render={({ field, fieldState }) => (
                <InputNumber
                  {...field}
                  style={{ width: "100%", height: "35px" }}
                  className="activity-type-field bg-[#fafafa] border border-[#EBF0ED] rounded-[10px] hover:bg-transparent"
                  status={fieldState.error ? "error" : ""}
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Controller
            name="isActive"
            control={control}
            render={({ field: { value, onChange } }) => {
              console.log("Checkbox Value:", value); // Debugging
              return (
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Active
                </Checkbox>
              );
            }}
          />
        </Form.Item>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Form.Item label="Regions">
            <Controller
              name="criteria.regionIds"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  options={regionOptions}
                  placeholder="Select Specific Regions"
                  style={{ height: "35px" }}
                  className="activity-type-field bg-[#fafafa] border border-[#EBF0ED] rounded-[10px] hover:bg-transparent"
                  maxTagCount={3}
                />
              )}
            />
          </Form.Item>

          <Form.Item label="Categories">
            <Controller
              name="criteria.categories"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  options={categoryOptions}
                  placeholder="Select Specific Categories"
                  maxTagCount={3}
                  className="activity-type-field bg-[#fafafa] border border-[#EBF0ED] rounded-[10px] hover:bg-transparent"
                  style={{ height: "35px" }}
                />
              )}
            />
          </Form.Item>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Form.Item label="Min Amount">
            <Controller
              name="criteria.minAmount"
              control={control}
              render={({ field, fieldState }) => (
                <InputNumber
                  {...field}
                  style={{ width: "100%", height: "35px" }}
                  className="activity-type-field bg-[#fafafa] border border-[#EBF0ED] rounded-[10px] hover:bg-transparent"
                  status={fieldState.error ? "error" : ""}
                />
              )}
            />
          </Form.Item>

          <Form.Item label="Max Amount">
            <Controller
              name="criteria.maxAmount"
              control={control}
              render={({ field, fieldState }) => (
                <InputNumber
                  {...field}
                  style={{ width: "100%", height: "35px" }}
                  className="activity-type-field bg-[#fafafa] border border-[#EBF0ED] rounded-[10px] hover:bg-transparent"
                  status={fieldState.error ? "error" : ""}
                />
              )}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
