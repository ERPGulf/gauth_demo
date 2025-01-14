import { BlockData } from "@/types/onboardingpages-types";
import { filterPoundSign } from "@/utils/helper/onboarding-helper";
import { useEffect, useState } from "react";

export const useBlockDetails = (currBlock: BlockData) => {
  const [headings, setHeadings] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);

  useEffect(() => {
    if (currBlock) {
      const headings = filterPoundSign(currBlock.long_description, "heading");
      const descriptions = filterPoundSign(
        currBlock.long_description,
        "description",
      );
      setHeadings(headings);
      setDescriptions(descriptions);
    }
  }, [currBlock]);

  return { headings, descriptions };
};
