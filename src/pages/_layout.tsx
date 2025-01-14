import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const _layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex">
        <Outlet />
      </div>
    </div>
  );
};

export default _layout;
