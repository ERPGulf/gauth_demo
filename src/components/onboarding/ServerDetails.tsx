import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBlockDetails } from "@/hooks/useBlockDetails";
import { BlockData } from "@/types/onboardingpages-types";

type ServerDetailsProps = {
  currBlock: BlockData;
  xs?: boolean;
};

const ServerDetails = ({ currBlock, xs }: ServerDetailsProps) => {
  const { headings, descriptions } = useBlockDetails(currBlock);

  return (
    <Accordion type="single" collapsible className="w-full">
      {currBlock && (
        <AccordionItem value={currBlock.header}>
          <AccordionTrigger
            className={`${xs && "text-sm font-semibold"} flex flex-row-reverse justify-end gap-x-3 text-primary`}
          >
            {currBlock.header}
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {headings?.map((heading, index) => (
              <div key={index} className="space-y-1">
                <h3
                  className={`${xs ? "text-sm" : "text-base"} font-semibold text-primary`}
                >
                  {heading}
                </h3>
                {/* <p className={`${xs ? "text-xs" : "text-xs"} font-thin text-muted-foreground`}> */}
                <p className="text-xs font-thin text-primary">
                  {descriptions?.[index]}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default ServerDetails;
