import axios from "@/lib/config/axios-instance";
import { Tax } from "@/lib/types/settings";
import { fetchAllTaxApiResponse } from "@/lib/types/tax";

export const taxApi = {
  getTaxRules: async (
    page: number = 1,
    limit: number = 10
  ): Promise<fetchAllTaxApiResponse> => {
    return axios
      .get(`/tax?page=${page}&limit=${limit}`)
      .then((res) => res.data);
  },

  addTaxRule: async (taxRule: Omit<Tax, "id">): Promise<Tax> => {
    return axios.post("/tax", taxRule).then((res) => res.data);
  },

  updateTaxRule: async (id: number, taxRule: Omit<Tax, "id">): Promise<Tax> => {
    return axios.put(`/tax/${id}`, taxRule).then((res) => res.data);
  },

  deleteTaxRule: async (id: number): Promise<void> => {
    return axios.delete(`/tax/${id}`).then(() => {});
  },
};
