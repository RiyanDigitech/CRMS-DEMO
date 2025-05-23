import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axios-instance";
import { fetchAllProductsApiResponse, fetchAllStockDataAPIResponse } from "@/lib/types/product";
import { buildUrlWithParams, buildUrlWithParams_ } from "@/lib/helpers";
import pcsmInstance from "@/lib/config/pcsm-instance";

const ProductService = () => {
  // const useFetchAllProducts = (searchQuery: string = "GREEN") => {
  //   function fetchProducts({
  //     pageParam = 1,
  //   }): Promise<fetchAllProductsApiResponse> {
  //     return axiosInstance
  //       .get(`/product?page=${pageParam}&limit=10`)
  //       .then((res) => res.data);
  //   }

  //   return useInfiniteQuery({
  //     queryKey: ["products", searchQuery],
  //     refetchOnWindowFocus: false,
  //     queryFn: fetchProducts,
  //     initialPageParam: 1,
  //     getNextPageParam: (lastPage) => lastPage.page + 1,
  //   });
  // };
  const useFetchAllProducts = (
    limit?: number,
    page?: number,
    query?: string,
    category?: string[],
    min?: number,
    max?: number
  ) => {
    async function fetchProducts(): Promise<fetchAllProductsApiResponse> {
      const url = buildUrlWithParams_("/product", {
        page,
        limit,
        query,
        category: category
          ? Array.isArray(category)
            ? category
            : [category] // Convert single string to array
          : undefined,
        min,
        max,
      });
      return axiosInstance.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchProducts,
      queryKey: ["products", limit, page, query, category, min, max],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useFetchProductsList = (limit?: number, page?: number) => {
    async function fetchProductts(): Promise<fetchAllProductsApiResponse> {
      const url = buildUrlWithParams("/product", { page, limit });
      return axiosInstance.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchProductts,
      queryKey: ["products", limit, page],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };

  const useFetchStockBreakdown = (inventoryItemId: string) => {
    async function fetchProductts(): Promise<fetchAllStockDataAPIResponse> {
      const url = `/product/stock/${inventoryItemId}`
      return axiosInstance.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchProductts,
      queryKey: ["stock", inventoryItemId],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useFetchAllProducts,
    useFetchProductsList,
    useFetchStockBreakdown
  };
};

export default ProductService;
