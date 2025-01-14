import { BlockData } from "@/types/onboardingpages-types";

export const sortBlocks = (array: BlockData[] | null): BlockData[] => {
  if (!array) return [];

  // Create a shallow copy of the array before sorting
  const arrayCopy = [...array];
  return arrayCopy.sort((a, b) => a.block_order - b.block_order);
};

// Pond sign filter: Careful with the regex, it's a bit tricky

type FilterResultType = "heading" | "description";
export const filterPoundSign = (
  text: string,
  type: FilterResultType,
): string[] => {
  // Regular expression to match content wrapped with ##
  const regex = /##(.*?)##/g;

  // Find all matches
  const matches = [...text.matchAll(regex)];

  if (type === "heading") {
    // Extract all headings into an array
    return matches.map((match) => match[1]);
  } else if (type === "description") {
    // Extract descriptions following each heading
    if (matches.length === 0) return []; // No headings found

    // Initialize an array to hold descriptions
    const descriptions: string[] = [];

    // Iterate over all headings
    for (let i = 0; i < matches.length - 1; i++) {
      const headingEndIndex =
        text.indexOf(`##${matches[i][1]}##`) + `##${matches[i][1]}##`.length;
      const nextHeadingStartIndex = text.indexOf(
        `##${matches[i + 1][1]}##`,
        headingEndIndex,
      );

      // Extract the description between current heading and next heading
      const description = text
        .slice(headingEndIndex, nextHeadingStartIndex)
        .trim();
      descriptions.push(description);
    }

    // Handle the last description if there are no more headings after it
    const lastHeadingEndIndex =
      text.indexOf(`##${matches[matches.length - 1][1]}##`) +
      `##${matches[matches.length - 1][1]}##`.length;
    const lastDescription = text.slice(lastHeadingEndIndex).trim();
    descriptions.push(lastDescription);

    return descriptions;
  }

  // Default case
  return [];
};
