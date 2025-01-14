import BillingInfo from "@/components/accounts/BillingInfo";
import LoginHistory from "@/components/accounts/LoginHistory";
import Settings from "@/components/accounts/Settings";
import AddAmount from "@/components/accounts/AddAmount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Account = () => {
  return (
    <main className="no_scrollbar flex h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-y-6 overflow-y-scroll bg-muted p-8">
      <div className="flex justify-between">
        <p className="text-lg font-bold">Account</p>
        <AddAmount />
      </div>

      <Tabs defaultValue="Billing Info">
        <TabsList className="w-full text-white ">
          <TabsTrigger className="w-full" value="Billing Info">
            Billing Info
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Users & Grants">
            Users & Grants
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Login History">
            Login History
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Service Transfer">
            Service Transfer
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Maintenance">
            Maintenance
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Billing Info">
          <BillingInfo />
        </TabsContent>
        <TabsContent value="Users & Grants">Users & Grants.</TabsContent>
        <TabsContent value="Login History">
          <LoginHistory />
        </TabsContent>
        <TabsContent value="Service Transfer">Service Transfer.</TabsContent>
        <TabsContent value="Maintenance">Maintenance.</TabsContent>
        <TabsContent value="Settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Account;
