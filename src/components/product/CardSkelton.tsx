import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkelton = () => {
  return (
    <Card className="w-[275px]">
      <CardHeader className=" w-[275px]">
        <CardTitle className="truncate text-center text-xl">
          <Skeleton className="h-10 w-full" />
        </CardTitle>
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="h-[200px]">
        <Skeleton className="h-full w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default CardSkelton;
