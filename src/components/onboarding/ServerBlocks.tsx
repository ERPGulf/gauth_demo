import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlockData } from "@/types/onboardingpages-types";

type ServerBlocksProps = {
  handleBlockSelect: (val: string) => void;
  currBlock: BlockData;
  sortedBlocks: BlockData[];
};

const ServerBlocks = ({
  handleBlockSelect,
  currBlock,
  sortedBlocks,
}: ServerBlocksProps) => {
  // Error handling for empty blocks
  try {
    if (sortedBlocks.length === 0) {
      return <div>error</div>;
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <Tabs
      onValueChange={handleBlockSelect}
      value={currBlock?.block_order.toString()}
      className="w-full"
    >
      <TabsList className="min-h-42 flex h-fit w-full flex-wrap items-start justify-start gap-1.5 rounded-lg bg-transparent shadow-none ">
        {sortedBlocks?.map(
          (block, index) =>
            block.hide != 1 && (
              <TabsTrigger
                disabled={block.disable === 1}
                key={index}
                value={block.block_order.toString()}
                className="flex h-20 w-[calc(50%-0.3em)] flex-col rounded-[2rem] bg-white data-[state=active]:bg-primary/25 "
              >
                <span className="w-full text-wrap text-sm font-semibold text-primary">
                  {block.header}
                  {block.disable === 1 && (
                    <div className="relative flex overflow-x-hidden pt-2">
                      <div className="animate-marquee whitespace-nowrap">
                        <p className="text-xs font-light text-red-500">
                          {" "}
                          We are currently experiencing a shortage of resources
                          for this server. Please contact our support team for
                          assistance with this service.
                        </p>
                      </div>
                    </div>
                  )}
                </span>
                <p className="w-11/12 truncate text-xs font-light">
                  {block.short_description}
                </p>
              </TabsTrigger>
            ),
        )}
      </TabsList>
    </Tabs>
  );
};

export default ServerBlocks;
