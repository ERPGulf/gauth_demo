import { InboundRule } from "@/types/firewall-types";
import RulesItem from "./RulesItem";
import RulesItemSkeleton from "./RulesItemSkeleton";
interface InboundTableProps {
  data: InboundRule[];
  isLoading: boolean;
  isError: boolean;
  handleDeleteRule: (index: number) => void;
  handleEditRule: (data: InboundRule, index: number) => void;
}
const InboundTable: React.FC<InboundTableProps> = ({
  data,
  isError,
  isLoading,
  handleDeleteRule,
  handleEditRule,
}) => {
  return (
    <div className="flex w-full flex-col rounded-md border bg-secondary">
      <div className="flex h-10 w-full space-x-2 rounded-t-sm bg-muted/40">
        <div className="flex flex-[1] items-center justify-start px-2">
          <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-sm">
            Protocol
          </p>
        </div>
        <div className="flex flex-[2.5] items-center justify-start px-2">
          <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-sm">
            Source
          </p>
        </div>
        <div className="flex flex-[2.5] items-center justify-start px-2">
          <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-sm">
            Source Port Range
          </p>
        </div>
        <div className="flex flex-[2.5] items-center justify-start px-2">
          <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-sm">
            Destination
          </p>
        </div>
        <div className="flex flex-[2.5] items-center justify-start px-2">
          <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-sm">
            Destination Port Range
          </p>
        </div>
        <div className="flex flex-[3] items-center justify-start px-2">
          <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-sm">
            Description
          </p>
        </div>
        <div className="flex flex-[1] items-center justify-end px-2">
          <p className="w-11/12 overflow-hidden truncate whitespace-nowrap text-right text-sm">
            Actions
          </p>
        </div>
      </div>
      <div className="w-full -space-y-1">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <RulesItemSkeleton key={index} />
          ))}
        {isError ? (
          <div className="rounded-b-md bg-background py-4 text-center text-sm text-red-500">
            Something went wrong!
          </div>
        ) : (
          data.map((item, index) => (
            <RulesItem
              rule={item}
              key={index}
              index={index}
              deleteRule={handleDeleteRule}
              handleEditRule={handleEditRule}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InboundTable;
