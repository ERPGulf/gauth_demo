import AddAmount from "@/components/accounts/AddAmount";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageTitle } from "@/hooks/usePageTitle";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const _accountsLayout = () => {
  const location = useLocation();
  usePageTitle("Account");
  const currTab = location.pathname.split("/")[3];
  return (
    <main className="flex h-screen flex-1 flex-col gap-6 overflow-y-scroll bg-muted/40 p-8">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Account</p>
        <AddAmount />
      </div>

      <Tabs value={currTab}>
        <TabsList className="bg-secondary text-white">
          {/* Billing Info tab */}
          <NavLink className="w-full" to={"billing-info"}>
            <TabsTrigger className="w-full  font-medium" value="billing-info">
              Billing Info
            </TabsTrigger>
          </NavLink>

          {/* Users & Grants tab */}
          <NavLink className="w-full" to={"users-grants"}>
            <TabsTrigger className="w-full font-normal" value="users-grants">
              Users & Grants
            </TabsTrigger>
          </NavLink>

          {/* Login History tab */}
          <NavLink className="w-full" to={"login-history"}>
            <TabsTrigger className="w-full font-normal" value="login-history">
              Login History
            </TabsTrigger>
          </NavLink>

          {/* Service Transfer tab */}
          <NavLink className="w-full" to={"service-transfer"}>
            <TabsTrigger
              className="w-full font-normal"
              value="service-transfer"
            >
              Service Transfer
            </TabsTrigger>
          </NavLink>

          {/* Maintenance tab */}
          <NavLink className="w-full" to={"maintenance"}>
            <TabsTrigger className="w-full font-normal" value="maintenance">
              Maintenance
            </TabsTrigger>
          </NavLink>

          {/* Settings tab */}
          <NavLink className="w-full" to={"settings"}>
            <TabsTrigger className="w-full font-normal" value="settings">
              Settings
            </TabsTrigger>
          </NavLink>
        </TabsList>
      </Tabs>
      <Outlet />
    </main>
  );
};

export default _accountsLayout;
