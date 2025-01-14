import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CircleX } from "lucide-react";
import CardPricing from "./CardPricing";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/api/product/API-products";
import CardSkelton from "./CardSkelton";

interface Props {
  type: "products" | "service" | "group";
}
const options = {
  products: "Products",
  service: "Service",
  group: "Group",
};
const ProductSection = ({ type }: Props) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const handleScroll = (offset: number) => {
    try {
      if (scrollContainer.current) {
        scrollContainer.current.scrollTo({
          left: scrollContainer.current.scrollLeft + offset,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [type],
    queryFn: () => getProducts(type),
  });
  return (
    <section className="flex w-[80vw] flex-col space-y-2 self-center px-2">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-medium">{options[type]}</span>
        <div className="space-x-2">
          <Button
            variant={"outline"}
            onClick={() => handleScroll(-600)}
            size={"icon"}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => handleScroll(600)}
            size={"icon"}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainer}
        className="no_scrollbar flex h-[400px] flex-row gap-x-3 overflow-x-scroll"
      >
        {isError && (
          <div className="flex h-[400px] w-full flex-col items-center justify-center space-x-2">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-xl text-red-600">Something went wrong</h1>{" "}
              <CircleX className="text-2xl text-red-600" />
            </div>
            <Button
              onClick={async () => {
                await refetch();
              }}
              variant={"link"}
            >
              Refresh page
            </Button>
          </div>
        )}
        {isLoading && (
          <>
            {Array.from({ length: 7 }).map((_, index) => (
              <CardSkelton key={index} />
            ))}
          </>
        )}
        {data?.map((product: any, index: number) => (
          <CardPricing key={index} {...product} type={type} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
