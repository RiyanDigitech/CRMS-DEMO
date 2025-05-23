import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

import router from "./routes";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#008444",
          fontFamily: "Plus Jakarta Sans",
        },
        components: {
          Menu: {
            itemSelectedBg: "#ff8548",
            itemColor: "white",
            colorBgBase: "#FAFAF2",
          },
          Layout: {
            colorBgHeader: "#FAFAF2",
            colorBgBody: "#FAFAF2",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
