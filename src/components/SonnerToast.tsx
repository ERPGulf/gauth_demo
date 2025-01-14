import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "./theme-provider";

const SonnerToast = () => {
  const { theme } = useTheme();
  return <Toaster richColors theme={theme} toastOptions={{}} />;
};

export default SonnerToast;
