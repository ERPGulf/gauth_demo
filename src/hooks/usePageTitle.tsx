import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTitle = (title: string) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} - Claudion`;
  }, [location, title]);
};
