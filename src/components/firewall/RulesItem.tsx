import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { InboundRule } from "@/types/firewall-types";
import React, { useState } from "react";
import EditRuleInbound from "./EditRuleInbound";

interface RulesItemProps {
  index: number;
  rule: InboundRule;
  deleteRule: (index: number) => void;
  handleEditRule: (data: InboundRule, index: number) => void;
}

const RulesItem: React.FC<RulesItemProps> = ({
  rule,
  index,
  deleteRule,
  handleEditRule,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  return (
    <React.Fragment>
      {editToggle ? (
        <EditRuleInbound
          rule={rule}
          index={index}
          handleEditRule={handleEditRule}
          setEditToggle={setEditToggle}
        />
      ) : (
        <div className="flex h-12 w-full space-x-1 rounded-sm bg-secondary p-1">
          <div className="flex flex-[1] items-center justify-center rounded-[5px] bg-background px-2">
            <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-gray-500">
              {rule.protocol}
            </p>
          </div>
          <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
            <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-gray-500">
              {rule.source}
            </p>
          </div>
          <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
            <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-gray-500">
              {rule.source_port_range}
            </p>
          </div>
          <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
            <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-gray-500">
              {rule.destination}
            </p>
          </div>
          <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
            <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-gray-500">
              {rule.destination_port_range}
            </p>
          </div>
          <div className="flex flex-[3] items-center justify-center rounded-[5px] bg-background px-2">
            <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-gray-500">
              {rule.description}
            </p>
          </div>
          <div className="flex flex-[1] items-center justify-end space-x-2 rounded-[5px] bg-background px-2">
            <Button
              onClick={() => setEditToggle(true)}
              size={"icon"}
              variant={"outline"}
              className="size-7 rounded-sm"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              onClick={() => deleteRule(index)}
              size={"icon"}
              variant={"destructive"}
              className="size-7 rounded-sm"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RulesItem;
