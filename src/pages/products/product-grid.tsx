import ProductService from "@/services/product.service";
import "../../index.css";
import { Input, Tag } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { LuArrowDownToLine } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import CustomerFiltersModal from "@/components/modules/trade-customer/customer-filters";

export default function ProductGrid() {
  const navigate = useNavigate();
  const { useFetchAllProducts } = ProductService();
  const [limit] = useState<number>(12);
  const [page] = useState<number>(1);
  const [query, setUsersQuery] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setSelectedStatus] = useState<string | undefined>(undefined);

  const { data: productData } = useFetchAllProducts(limit, page, query);
  // Flatten out paginated data (if you are using react-query's 'infinite' pages)
  const products = useMemo(() => {
    return productData?.data?.flatMap((page) => page || []);
  }, [productData]);
  console.log(productData);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersQuery(e.target.value);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const ShowModal = () => {
    console.log("ok modals");
    setIsModalOpen(true);
  };
  console.log(status);
  return (
    <div className=" bg-white shadow-sm p-4 rounded-md">
      {" "}
      {
        <CustomerFiltersModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setSelectedStatus={setSelectedStatus}
          setUsersQuery={setUsersQuery}
        />
      }
      <div className="flex justify-between pl-1">
        <div className="w-[45%] sm:w-[60%] xmd:w-[65%] lg:w-[77%] mb-3">
          <Input
            className="w-full text-[12px] md:py-3 lg:px-4 lg:py-4"
            size="large"
            placeholder="Search Products..."
            prefix={<IoSearchOutline className="text-[#008444] text-[14px]" />}
            onChange={handleSearchChange}
          />
        </div>
        <button className="mb-3 w-[26%] sm:w-[15%] lg:w-[15%] flex items-center justify-center border-[2px] border-[#edf2ef] rounded-lg md:px-1 md:py-2 bg-[#fafafa] text-[#008444] font-medium lg:px-4 lg:py-3">
          <LuArrowDownToLine />
          <span className="md:ml-2">Export Products</span>
        </button>
      </div>
      {/* Top Bar (All Products, etc.) */}
      <div className="w-full flex justify-between items-center mt-2 flex-wrap lg:mb-4">
        <div
          className="w-[100%] ml-1 lg:w-[49%] flex justify-between items-center 
            text-[#6B6B6B] font-semibold md:px-0"
        >
          <button className="mb-4 md:mb-0 flex justify-between items-center">
            <div className="text-[#008444] text-[8px] xsm:text-[10px] font-semibold md:text-[10px]">
              ALL PRODUCTS
            </div>
            <div className="text-[10px] ml-1 md:text-[12px] md:ml-2 text-[#008444] border-[1px] rounded-lg border-[#008444] p-1 md:p-2  bg-[#fafafa]">
              ({productData?.total ?? 0})
            </div>
          </button>
        </div>

        <div>
          <button
            onClick={() => ShowModal()}
            className="hidden lg:flex items-center border-[2px] border-[#edf2ef] rounded-lg px-2 py-2 bg-[#fafafa] text-[#008444] font-medium xmd:px-4 xmd:py-3"
          >
            <svg
              width="23"
              height="17"
              viewBox="0 0 23 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.0234 0.375C21.832 0.375 22.5 1.04297 22.5 1.85156C22.5 2.20312 22.3594 2.51953 22.1836 2.76562L17.4375 8.84766V13.875C17.4375 14.8242 16.3477 15.3516 15.6094 14.7539L12.3398 12.1875C11.9883 11.9414 11.8125 11.5195 11.8125 11.0977V8.84766L7.03125 2.76562C6.85547 2.51953 6.75 2.20312 6.75 1.85156C6.75 1.04297 7.38281 0.375 8.19141 0.375H21.0234ZM13.5 8.53125V10.957L15.75 12.7148V8.53125C15.75 8.35547 15.7852 8.17969 15.9258 8.03906L20.5664 2.0625H8.64844L13.2891 8.03906C13.4297 8.17969 13.5 8.35547 13.5 8.53125ZM6.15234 3.46875L6.82031 4.3125H1.89844L6.53906 10.2891C6.67969 10.4297 6.75 10.6055 6.75 10.7812V12.082L9 13.8398V10.7812C9 10.6055 9.03516 10.4297 9.17578 10.2891L10.3359 8.77734L10.6875 9.23438V15C10.6875 15.9492 9.59766 16.4766 8.85938 15.8789L5.58984 13.3125C5.23828 13.0664 5.0625 12.6445 5.0625 12.2227V11.0977L0.28125 5.01562C0.105469 4.76953 0 4.45312 0 4.10156C0 3.29297 0.632812 2.625 1.44141 2.625H5.73047C5.83594 2.94141 5.97656 3.22266 6.15234 3.46875Z"
                fill="#6B6B6B"
              />
            </svg>
            <span className="text-[#6B6B6B] pl-2 font-semibold">Filters</span>
          </button>
        </div>
      </div>
      <hr className="my-3 lg:my-6" />
      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/stock-management?inventoryItemId=${product.inventoryItemId}`, { state: product })}
            className="hover:opacity-70 transition-all duration-500 border cursor-pointer rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={"/product-mockup.png"}
                alt={"Product"}
                width={300}
                height={300}
                className="w-full h-auto"
              />
              <Tag
                className="absolute top-2 left-2"
                // Compare your product.status with whichever enum or string you use
                color={product.status === "Active" ? "success" : "error"}
              >
                {product.status === "Active" ? "Available" : "Disabled"}
              </Tag>
            </div>
            <div className="p-4">
              {/* Replace productName with whichever field makes sense (e.g., sku or description) */}
              <p className="text-sm text-gray-500">{product.productCategory}</p>
              <h3 className="font-semibold mt-1">{product?.sku ?? "No SKU"}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {product?.brand ?? "No Brand"}
                </p>
                <p className="font-bold">
                  Rs: {Number(product?.price ?? 0)?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
