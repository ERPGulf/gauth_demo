import { PricingDetails } from "@/types/onboardingPricing-types";

export const calculateServiceCoverAmount = (
  options: PricingDetails["options"],
) => {
  return options
    .filter((option) => option.enable === 1 && option.included === 1)
    .reduce((total, option) => total + option.option_price_monthly, 0);
};

export const calculateAdditionalAmount = (
  options: PricingDetails["options"],
  selectedOptions: string[],
) => {
  return options
    .filter(
      (option) =>
        option.enable === 1 &&
        option.included === 0 &&
        selectedOptions.includes(option.option_name),
    )
    .reduce((total, option) => total + option.option_price_monthly, 0);
};
