import { InboundRule } from "@/types/firewall-types";
import EditRuleForm from "./EditRuleForm";
import { sanitizeInboundData } from "@/utils/helper/firewall.helper";

import { inboundSchema } from "@/utils/validation";

interface EditRuleInboundProps {
  index: number;
  rule: InboundRule;
  setEditToggle: (val: boolean) => void;
  handleEditRule: (data: InboundRule, index: number) => void;
}

const EditRuleInbound: React.FC<EditRuleInboundProps> = ({
  rule,
  setEditToggle,
  handleEditRule,
  index,
}) => {
  return (
    <EditRuleForm
      rule={rule}
      schema={inboundSchema}
      sanitizeData={sanitizeInboundData}
      onSubmit={(data) => handleEditRule(data, index)}
      setEditToggle={setEditToggle}
    />
  );
};

export default EditRuleInbound;
