import axios from "@/lib/config/axios-instance";
import {
  ApiResponseLocation,
  fetchAllRegionApiResponse,
  fetchAllSegmentsApiResponse,
  fetchOperatingUnitTypeApiResponse,
} from "@/lib/types/location";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const LocationService = () => {
  const queryClient = useQueryClient();

  const useFetchAllLocations = () => {
    async function fetchLocation(): Promise<ApiResponseLocation> {
      return axios.get(`/location`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchLocation,
      queryKey: ["location"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useFetchAllRegions = () => {
    async function fetchRegions(): Promise<fetchAllRegionApiResponse> {
      return axios.get(`/location/regions`).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchRegions,
      queryKey: ["regions"],
    });
  };


  
  const useFetchAllSegments = () => {
    async function fetchRegions(): Promise<fetchAllSegmentsApiResponse> {
      return axios.get(`/location/segments`).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchRegions,
      queryKey: ["segments"],
    });
  };


  const useFetchOperatingUnit = (id: number | string) => {
    async function fetchOperatingUnit(): Promise<fetchOperatingUnitTypeApiResponse> {
      return axios
        .get(`/location/operating-unit/${id}`)
        .then((res) => res.data);
    }
    return useQuery({
      queryFn: () => fetchOperatingUnit(),
      queryKey: ["operatingUnit", id],
      enabled: !!id,
    });
  };

  const useHandleCreateRegion = () => {
    function handleAddRegion(data: any) {
      return axios.post(`/location/regions`, data).then((res) => res.data);
    }
    return useMutation({
      mutationFn: handleAddRegion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["regions"] });
        notification.success({
          message: "Region added successfully",
          placement: "topRight",
        });
      },
      onError: (error: any) => {
        notification.error({
          message: "Failed to add region",
          description: error.response?.data?.message || "Failed to add region",
          placement: "topRight",
        });
      },
      retry: 0,
    });
  };

  const useHandleUpdateRegion = (id: number | string) => {
    function handleUpdateRegion(data: any) {
      return axios.put(`/location/regions/${id}`, data).then((res) => res.data);
    }
    return useMutation({
      mutationFn: handleUpdateRegion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["regions"] });
        notification.success({
          message: "Region updated successfully",
          placement: "topRight",
        });
      },
      onError: (error: any) => {
        notification.error({
          message: "Failed to update region",
          description:
            error.response?.data?.message || "Failed to update region",
          placement: "topRight",
        });
      },
      retry: 0,
    });
  };

  const useHandleDeleteRegion = () => {
    async function deleteRegion(id: number | string) {
      return axios.delete(`/location/regions/${id}`).then((res) => res.data);
    }
    return useMutation({
      mutationFn: deleteRegion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["regions"] });
        notification.success({
          message: "Region deleted successfully",
          placement: "topRight",
        });
      },
      onError: (error: any) => {
        notification.error({
          message: "Failed to delete region",
          description:
            error.response?.data?.message || "Failed to delete region",
          placement: "topRight",
        });
      },
      retry: 0,
    });
  };

  const useHandleCreateOperatingUnit = () => {
    function handleAddOperatingUnit(data: any) {
      return axios
        .post(`/location/operating-unit`, data)
        .then((res) => res.data);
    }
    return useMutation({
      mutationFn: handleAddOperatingUnit,
      onSuccess: () => {
        notification.success({
          message: "Operating Unit added successfully",
          placement: "topRight",
        });
      },
      onError: (error: any) => {
        notification.error({
          message: "Failed to add operating unit",
          description:
            error.response?.data?.message || "Failed to add operating unit",
          placement: "topRight",
        });
      },
      retry: 0,
    });
  };

  const useHandleUpdateOperatingUnit = (id: number | string) => {
    function handleUpdateOperatingUnit(data: any) {
      return axios
        .put(`/location/operating-unit/${id}`, data)
        .then((res) => res.data);
    }
    return useMutation({
      mutationFn: handleUpdateOperatingUnit,
      onSuccess: () => {
        notification.success({
          message: "Operating Unit updated successfully",
          placement: "topRight",
        });
      },
      onError: (error: any) => {
        notification.error({
          message: "Failed to update operating unit",
          description:
            error.response?.data?.message || "Failed to update operating unit",
          placement: "topRight",
        });
      },
      retry: 0,
    });
  };

  const useHandleDeleteOperatingUnit = () => {
    const queryClient = useQueryClient();
    async function deleteOperatingUnit(id: number | string) {
      return axios
        .delete(`/location/operating-unit/${id}`)
        .then((res) => res.data);
    }
    return useMutation({
      mutationFn: deleteOperatingUnit,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["operatingUnit"] });
        notification.success({
          message: "Operating Unit deleted successfully",
          placement: "topRight",
        });
      },
      onError: (error: any) => {
        notification.error({
          message: "Failed to delete operating unit",
          description:
            error.response?.data?.message || "Failed to delete operating unit",
          placement: "topRight",
        });
      },
      retry: 0,
    });
  };

  return {
    useFetchOperatingUnit,
    useFetchAllRegions,
    useHandleCreateRegion,
    useHandleUpdateRegion,
    useHandleDeleteRegion,
    useHandleCreateOperatingUnit,
    useHandleUpdateOperatingUnit,
    useHandleDeleteOperatingUnit,
    useFetchAllLocations,
    useFetchAllSegments
  };
};

export default LocationService;
