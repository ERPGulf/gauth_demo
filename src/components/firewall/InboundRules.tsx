import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import InboundInputs from "./InboundInputs";
import { getSecurityList } from "@/utils/api/firewall/API-getSecurity";
import InboundTable from "./InboundTable";
import { InboundRule } from "@/types/firewall-types";
import { useEffect, useState } from "react";
import { updateSecurityList } from "@/utils/api/firewall/API-updateSecurity";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { selectedHostname } from "@/redux/slices/CloudserverSlice";
import { useSelector } from "react-redux";

const InboundRules = () => {
  const hostName = useSelector(selectedHostname);
  const queryClient = useQueryClient();

  const [inboundRules, setInboundRules] = useState<InboundRule[]>([]);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["firewall"],
    queryFn: () => {
      if (hostName) {
        return getSecurityList(hostName);
      }
      return Promise.resolve({
        inbound_rules: [],
        outbound_rules: [],
      });
    },
  });
  useEffect(() => {
    if (!isLoading) {
      setInboundRules(data?.inbound_rules || []);
    }
  }, [data, isLoading]);
  const handleEditRule = (data: InboundRule, index: number) => {
    setInboundRules((prev) => {
      const updatedRules = prev.map((rule, i) =>
        i === index ? { ...data } : rule,
      );
      return updatedRules;
    });
  };
  const handleAddNewRule = (data: InboundRule) => {
    setInboundRules((prev) => {
      const updatedRules = prev.map((rule) => ({ ...rule }));

      // Create a copy of the new rule to avoid reference issues
      const newRule = { ...data };

      return [...updatedRules, newRule];
    });
  };
  const handleDeleteRule = (index: number) => {
    setInboundRules((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutateAsync: updateMutateFn, isPending } = useMutation({
    mutationFn: () => {
      if (!data || !hostName) return Promise.reject(new Error("No data found"));
      return updateSecurityList(
        {
          data: {
            inbound_rules: inboundRules,
            outbound_rules: data.outbound_rules,
          },
        },
        hostName,
      );
    },
    onError: (error) => {
      console.error("Error updating security rules:", error);
      toast.error("Error updating security rules");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["firewall"],
      });
      toast.success("Security rules updated successfully");
    },
  });
  return (
    <Card className="min-w-[720px]">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-normal">InBound Rules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <InboundTable
          data={inboundRules}
          isError={isError}
          isLoading={isLoading}
          handleDeleteRule={handleDeleteRule}
          handleEditRule={handleEditRule}
        />
        <InboundInputs addNewRule={handleAddNewRule} />
      </CardContent>
      <CardFooter>
        {isLoading || isPending ? (
          <Button className="h-12 w-[200px]">
            <Loader className="size-6 animate-spin" />
          </Button>
        ) : (
          <Button
            onClick={() => updateMutateFn()}
            variant={"secondary"}
            className="h-12 w-[200px]"
          >
            Update security
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default InboundRules;
