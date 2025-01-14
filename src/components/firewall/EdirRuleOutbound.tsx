import { OutboundRule } from "@/types/firewall-types";
import EditRuleForm from "./EditRuleForm";
import { sanitizeOutboundData } from "@/utils/helper/firewall.helper";

import { outboundSchema } from "@/utils/validation";

interface EditRuleOutboundProps {
  index: number;
  rule: OutboundRule;
  setEditToggle: (val: boolean) => void;
  handleEditRule: (data: OutboundRule, index: number) => void;
}

const EditRuleOutbound: React.FC<EditRuleOutboundProps> = ({
  rule,
  setEditToggle,
  handleEditRule,
  index,
}) => {
  return (
    <EditRuleForm
      rule={rule}
      schema={outboundSchema}
      sanitizeData={sanitizeOutboundData}
      onSubmit={(data) => handleEditRule(data, index)}
      setEditToggle={setEditToggle}
    />
  );
};

export default EditRuleOutbound;
