import axios from "axios";
import tokenService from "@/services/token.service";

let isNotificationShown = false;

const pcsmInstance = axios.create({
  baseURL: import.meta.env.VITE_PCSM_API,
});

pcsmInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-api-key"] = `PCLb8Po3wr2NfkiI5Mp1K6HrV3pujV9UNtJb0eI0D5SAK840MiPQ1AZ09FOWenMgTDPRHiXaHAthJM4JfhWUEo8rLgkLSb6X03gPryZSiaAi0cs9N2hZrAWZxeNcnuWO,`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

pcsmInstance.interceptors.response.use(
  (response) => {
    isNotificationShown = false;
    return response;
  },
  (error) => {
    if (!isNotificationShown) {
      isNotificationShown = true;

      if (error.response?.status === 401) {
        console.log(error?.response?.data?.message);
      } else {
        console.log(error?.response?.data?.message);
      }

      setTimeout(() => {
        isNotificationShown = false;
      }, 3000);
    }
    return Promise.reject(error);
  }
);

export default pcsmInstance;
