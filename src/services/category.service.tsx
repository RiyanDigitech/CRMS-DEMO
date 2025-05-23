import axios from "@/lib/config/axios-instance";
import { fetchAllCategoryApiResponse } from "@/lib/types/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const CategoryService = () => {
  const useFetchAllCategories = () => {
    function fetchCategory(): Promise<fetchAllCategoryApiResponse> {
      return axios.get(`/product/categories`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchCategory,
      queryKey: ["category"],
    });
  };

  const useHandleAddCategory = (closeModal: any) => {
    const queryClient = useQueryClient();
    function handleAddProduct(data: { name: string }): Promise<any> {
      return axios.post(`/category`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleAddProduct,
      onSuccess: () => {
        notification.success({
          message: "Category added Successful",
          description: "You have successfully added the category!",
          placement: "topRight",
        });
        queryClient.invalidateQueries({ queryKey: ["category"] });
        closeModal();
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    });
  };
  const useHandleAddSubCategory = (closeModal: any) => {
    const queryClient = useQueryClient();
    function handleAddProduct(data: {
      parentId: number;
      name: string;
    }): Promise<any> {
      return axios.post(`/category/subcategory`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleAddProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
        notification.success({
          message: "Sub-Category added Successful",
          description: "You have successfully added the sub-category!",
          placement: "topRight",
        });
        closeModal();
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    });
  };
  return {
    useFetchAllCategories,
    useHandleAddCategory,
    useHandleAddSubCategory,
  };
};

export default CategoryService;
