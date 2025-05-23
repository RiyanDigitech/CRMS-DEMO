"use client";

import { useMemo, useState } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Checkbox,
  Tag,
  Space,
  Card,
  Slider,
  Popover,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ThreeDots } from "@/components/iconComponents";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

interface DataType {
  id: number | string;
  description: string;
  price: string;
  status: string;
  quantity: number;
  sku: string;
  productGroup: string;
  productDescription: string;
  productCategory: string;
  brand?: string;
  productColor?: string;
}

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

function ProductList() {
  const navigate = useNavigate();
  const { useFetchAllCategories } = CategoryService();
  const { data: categoryData } = useFetchAllCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const columns: ColumnType<DataType>[] = [
    {
      title: "PRODUCT",
      dataIndex: "sku",
      key: "sku",
      render: (text: string, record: DataType) => (
        <Space>
          <div>
            <div>{text}</div>
            <div style={{ color: "#8c8c8c", fontSize: 12 }}>
              {record.productGroup}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (price: string) => `PKR ${Number.parseFloat(price).toFixed(2)}`,
      sorter: (a: DataType, b: DataType) =>
        Number.parseFloat(a.price) - Number.parseFloat(b.price),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "success" : "error"}>{status}</Tag>
      ),
    },
    // {
    //   title: "QUANTITY",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   render: (qty: number) => `${qty} ${qty === 1 ? "pc" : "pcs"}`,
    // },
    {
      title: "CATEGORY",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    {
      title: "Action",
      key: "action",
      className: "w-[140px] lg:w-fit",
      render: (record: DataType) => {
        const content = (
          <div className="flex">
            <p
              className="text-lg cursor-pointer "
              onClick={() => {
                navigate(`/stock-management?inventoryItemId=${products?.filter((p) => p.id === record.id)[0]?.inventoryItemId}`, {
                  state: products?.filter((p) => p.id === record.id)[0],
                });
              }}
            >
              <IoEyeOutline className="text-[#008444]" />
            </p>
          </div>
        );
        return (
          <Popover placement="right" content={content}>
            <div style={{ fontSize: "30px", color: "#6B6B6B" }}>
              <ThreeDots />
            </div>
          </Popover>
        );
      },
    },
    // {
    //   title: "",
    //   key: "action",
    //   render: () => (

    //     <div style={{ fontSize: "30px", color: "#6B6B6B" }}>
    //       <ThreeDots />
    //     </div>
    //   ),
    //   width: 20,
    // },
  ];
  const { useFetchAllProducts } = ProductService();
  const { data: productData } = useFetchAllProducts(
    limit,
    page,
    query,
    Array.isArray(selectedCategories)
      ? selectedCategories
      : [selectedCategories],
    priceRange[0],
    priceRange[1]
  );
  const products = useMemo(() => {
    return productData?.data?.flatMap((page) => page || []);
  }, [productData]);
  console.log(productData);

  const categoryOptions =
    categoryData?.data.map((el) => ({
      label: el,
      value: el,
    })) || [];
  console.log(categoryOptions);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const FilterSection = ({
    title,
    selectedValues,
    onChange,
  }: {
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
  }) => (
    <div className="mb-4" bordered={false}>
      <h3 className="text-base font-medium mb-3">{title}</h3>
      {categoryOptions.map((item) => (
        <div
          key={String(item.value)}
          className="flex justify-between items-center mb-2"
        >
          <Checkbox
            checked={selectedValues.includes(item.value as unknown as string)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...selectedValues, item.value as unknown as string]);
              } else {
                onChange(
                  selectedValues.filter(
                    (v) => v !== (item.value as unknown as string)
                  )
                );
              }
            }}
          >
            {String(item.label)}
          </Checkbox>
          {/* <span style={{ color: "#8c8c8c" }}>{item.count}</span> */}
        </div>
      ))}
    </div>
  );

  const ActiveFilters = () => {
    const allFilters = [
      ...selectedCategories.map((c) => ({
        type: "Category",
        value: categoryOptions.find((cat) => String(cat.value) === c)?.label,
      })),
    ];

    if (allFilters.length === 0) return null;

    return (
      <Space wrap className="mb-4">
        {allFilters.map((filter, index) => (
          <Tag
            key={index}
            closable
            onClose={() => {
              // Remove the filter based on its type
              switch (filter.type) {
                case "Category":
                  setSelectedCategories((prev) =>
                    prev.filter(
                      (c) =>
                        categoryOptions.find((cat) => String(cat.value) === c)
                          ?.label !== filter.value
                    )
                  );
                  break;
                // case "Brand":
                //   setSelectedBrands((prev) =>
                //     prev.filter(
                //       (b) =>
                //         brands.find((brand) => brand.value === b)?.label !==
                //         filter.value
                //     )
                //   );
                //   break;
                // case "Color":
                //   setSelectedColors((prev) =>
                //     prev.filter(
                //       (c) =>
                //         colors.find((color) => color.value === c)?.label !==
                //         filter.value
                //     )
                //   );
                //   break;
              }
            }}
          >
            {`${filter.type}: ${filter.value}`}
          </Tag>
        ))}
        <Button
          type="link"
          onClick={() => {
            setSelectedCategories([]);
          }}
        >
          Clear All
        </Button>
      </Space>
    );
  };

  return (
    <Layout style={{ background: "", padding: "24px" }}>
      <Layout.Content>
        <div style={{ display: "flex", gap: "24px" }}>
          {/* Filters Section */}
          <Card style={{ width: 350 }} bordered={false}>
            <div className="mb-4">
              <Space>
                {/* <FilterOutlined /> */}
                <h2 className="text-xl font-bold mb-4 mr-2">Filters</h2>
              </Space>
              <ActiveFilters />
            </div>

            <FilterSection
              title="Category"
              options={categoryOptions}
              selectedValues={selectedCategories}
              onChange={setSelectedCategories}
            />

            <Card className="mb-4" bordered={false}>
              <h3 className="text-base font-medium mb-3">Price Range</h3>
              <Slider
                range
                min={0}
                max={10000}
                value={priceRange}
                onChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex justify-between mt-2">
                <span>PKR {priceRange[0]}</span>
                <span>PKR {priceRange[1]}</span>
              </div>
            </Card>
          </Card>

          {/* Content Section */}
          <div style={{ flex: 1 }} className="bg-white p-6 rounded-lg">
            {/* <ActiveFilters /> */}

            <div className="flex justify-between items-center mb-6 b">
              <Space>
                <Input
                  placeholder="Search Products..."
                  prefix={<SearchOutlined />}
                  onChange={handleSearchChange}
                  style={{
                    flex: "1", // Makes it grow
                    minWidth: "700px",
                    maxWidth: "100%", // Ensures it doesn't exceed the container
                    height: "49px",
                  }}
                />
                {/* <Button className="buttons-secondary">
                  <BsThreeDotsVertical />
                  Bulk Actions
                </Button>
                <Button className="buttons-secondary bg-[#008444]">
                  <TbArrowBarToDown />
                  Export Products
                </Button>
                <Button className="buttons-primary" type="primary">
                  Add Product
                </Button> */}
              </Space>
            </div>

            <Table
              columns={columns}
              dataSource={products}
              // loading={isLoading}
              pagination={{
                total: productData?.total || 0,
                pageSize: limit,
                current: page,
                onChange: (newPage) => setPage(newPage),
                showSizeChanger: false,
                showTotal: (total) =>
                  `Showing ${Math.min(limit, total)} of ${total} results`,
                className: "custom-pagination",
              }}
            />
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default ProductList;
