import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SonnerToast from "./components/SonnerToast";
import Router from "./Router/Router";
import Notification from "./firebase/Notification";
import CloudPlatform from "./components/dashboard/CloudPlatform";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <PersistGate loading={<div>loading....</div>} persistor={persistor}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router />
            <SonnerToast />
            <Notification />
            <CloudPlatform />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
