import { Skeleton } from "../ui/skeleton";

const RulesItemSkeleton = () => {
  return (
    <div className="flex h-12 w-full space-x-1 rounded-sm bg-secondary p-1">
      <div className="flex flex-[1] items-center justify-center rounded-[5px] bg-background px-2">
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-[2.5] items-center justify-center rounded-[5px] bg-background px-2">
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-[3] items-center justify-center rounded-[5px] bg-background px-2">
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-[1] items-center justify-end rounded-[5px] bg-background px-2">
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
};

export default RulesItemSkeleton;
