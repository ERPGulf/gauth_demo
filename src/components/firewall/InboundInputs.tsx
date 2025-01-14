import React from "react";
import { inboundSchema } from "@/utils/validation";
import { InboundRule } from "@/types/firewall-types";
import { sanitizeInboundData } from "@/utils/helper/firewall.helper";
import FirewallInput from "./FirewallInput";

interface InboundInputsProps {
  addNewRule: (data: InboundRule) => void;
}

const InboundInputs: React.FC<InboundInputsProps> = ({ addNewRule }) => {
  return (
    <FirewallInput<InboundRule>
      schema={inboundSchema}
      title="Add New Inbound Rule"
      sanitizeData={sanitizeInboundData}
      onSubmit={addNewRule}
    />
  );
};

export default InboundInputs;
