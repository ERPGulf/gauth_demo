import React from "react";
import { outboundSchema } from "@/utils/validation";
import { OutboundRule } from "@/types/firewall-types";
import { sanitizeOutboundData } from "@/utils/helper/firewall.helper";
import FirewallInput from "./FirewallInput";

interface OutboundInputsProps {
  addNewRule: (data: OutboundRule) => void;
}

const OutboundInputs: React.FC<OutboundInputsProps> = ({ addNewRule }) => {
  return (
    <FirewallInput<OutboundRule>
      schema={outboundSchema}
      title="Add New Outbound Rule"
      sanitizeData={sanitizeOutboundData}
      onSubmit={addNewRule}
    />
  );
};

export default OutboundInputs;
