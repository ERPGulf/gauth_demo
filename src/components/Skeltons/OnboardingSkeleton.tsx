import { Skeleton } from "@/components/ui/skeleton";
import ProgressSkeleton from "./ProgressSkeleton";

const OnboardingSkeleton = () => {
  return (
    <div className="z-30 flex min-h-[650px] w-full flex-col items-center space-y-6 rounded-3xl bg-transparent shadow-sm">
      <ProgressSkeleton />
      <Skeleton className="h-10 w-72 bg-primary/20 dark:bg-primary/10" />
      <Skeleton className=" h-3 w-64 bg-primary/20 dark:bg-primary/10" />
      <Skeleton className=" h-40 w-full bg-primary/20 dark:bg-primary/10" />
      <Skeleton className=" h-10 w-full bg-primary/20 dark:bg-primary/10" />
      <div className="flex  pt-6">
        <Skeleton className=" h-5 w-5 rounded bg-primary/20 dark:bg-primary/10" />
        <Skeleton className=" ml-4 h-5 w-56 rounded bg-primary/20 dark:bg-primary/10 md:ml-6 md:w-80" />
      </div>
      <hr />
      <Skeleton className=" mt-10 h-10 w-full bg-primary/20 dark:bg-primary/10" />
      <Skeleton className=" mt-10 h-10 w-full bg-primary/20 dark:bg-primary/10" />
    </div>
  );
};

export default OnboardingSkeleton;
