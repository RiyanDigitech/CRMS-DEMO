import axios from "@/lib/config/axios-instance";
import { fetchAllMarketingApiResponse } from "@/lib/types/marketing";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildUrlWithParams } from "@/lib/helpers";
import { notification } from "antd";
import { z } from "zod";
import { discountFormDataSchema } from "@/lib/schemas";
import { useNavigate } from "react-router-dom";
import { fetchAllDiscountsAPIResponse } from "@/lib/types/discount";

const DiscountService = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const useFetchAllDiscounts = (
        limit?: number,
        page?: number,
        query?: string,
    ) => {
        async function fetchDiscounts(): Promise<fetchAllDiscountsAPIResponse> {
            const url = buildUrlWithParams("/discount", {
                page,
                limit,
                query,
            });
            return axios.get(url).then((res) => res.data);
        }
        return useQuery({
            queryFn: fetchDiscounts,
            queryKey: ["discount", page, limit, query],
            retry: 1,
            refetchOnWindowFocus: false,
        });
    };
    const useHandleCreateDiscount = () => {
        function handleCreateDiscount(data: z.infer<typeof discountFormDataSchema>): Promise<any> {
            return axios.post(`/discount`, data);
        }
        const onSuccess = () => {
            notification.success({
                message: "Success",
                description: "Discount Created Successfully",
                placement: "topRight",
            });
            queryClient.invalidateQueries({ queryKey: ["discounts"] });
            navigate("/discounts")
        };

        return useMutation({
            mutationFn: handleCreateDiscount,
            onSuccess,
            onError: (error) => {
                notification.error({
                    message: "Error",
                                    //@ts-ignore

                    description: error.response.data.message,
                    placement: "topRight",
                });
            },
            retry: 0,
        });
    };

    return {
        useFetchAllDiscounts,
        useHandleCreateDiscount
    };
};
export default DiscountService;
