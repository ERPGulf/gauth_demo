import { Separator } from "@radix-ui/react-separator";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OnboardingPricingSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="mb-6 flex items-center justify-center ">
        <Skeleton className="h-6 w-64 bg-gray-200 dark:bg-gray-100" />
      </div>
      <Card className="border-0 border-l-[4.5px] border-l-primary bg-gray-200 dark:bg-gray-100">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-40 rounded bg-gray-100 dark:bg-gray-200" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-60 rounded bg-gray-100 dark:bg-gray-200" />
        </CardContent>
      </Card>

      <div className="mt-4 rounded-xl bg-gray-200 p-4 dark:bg-gray-100">
        <div className="flex justify-between pb-6 pt-2">
          <Skeleton className="h-4 w-28 rounded bg-gray-100 dark:bg-gray-200" />
          <Skeleton className="h-4 w-20 rounded bg-gray-100 dark:bg-gray-200" />
        </div>
        <Separator className="h-[1px] w-full bg-gray-100 dark:bg-gray-200" />
        <div className="w-full">
          <Skeleton className="w-ful my-2 h-8 bg-gray-100 dark:bg-gray-200" />
          <Separator className="h-[1px] w-full bg-gray-100 dark:bg-gray-200" />
          <Skeleton className="my-2 h-8 w-full bg-gray-100 dark:bg-gray-200" />
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-gray-200 p-4 dark:bg-gray-100">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-4 w-36 bg-gray-100 dark:bg-gray-200" />
            <Skeleton className="mt-1 h-4 w-20 bg-gray-100 dark:bg-gray-200" />
            <Skeleton className="mt-5 h-4 w-36 bg-gray-100 dark:bg-gray-200" />
          </div>
          <div>
            <Skeleton className="h-5 w-20 bg-gray-100 dark:bg-gray-200" />
            <Skeleton className="mt-1 h-5 w-20 bg-gray-100 dark:bg-gray-200" />
            <Skeleton className="mt-5 h-5 w-20 bg-gray-100 dark:bg-gray-200" />
          </div>
        </div>
        <div className="mt-4 space-y-3 rounded-xl bg-gray-100 p-4 dark:bg-gray-200">
          <Skeleton className="h-5 w-40 bg-gray-200 dark:bg-gray-100" />
          <div className="flex justify-between">
            <Skeleton className="h-10 w-40 bg-gray-200 dark:bg-gray-100" />
            <Skeleton className="h-10 w-20 bg-gray-200 dark:bg-gray-100" />
          </div>
        </div>
        <div className="my-5 flex items-center">
          <Skeleton className="mr-2 h-5 w-5 rounded bg-gray-100 dark:bg-gray-200" />
          <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-200" />
        </div>

        <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-200" />

        <div className="flex  items-center justify-center">
          <div>
            <Skeleton className="mb-1 mt-5 h-3 w-48 bg-gray-100 dark:bg-gray-200" />
            <Skeleton className="mb-4 ml-3 h-3 w-40 bg-gray-100 dark:bg-gray-200" />
          </div>
        </div>
        <Skeleton className=" mx-auto h-2 w-72 bg-gray-100 dark:bg-gray-200" />
      </div>
    </div>
  );
};

export default OnboardingPricingSkeleton;
