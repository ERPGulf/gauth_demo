import { PricingDetails } from "@/types/onboardingPricing-types.ts";
import API_URL from "@/utils/api/API-URL";
import API from "@/utils/api/API-axios";

export const getOnboardingPricing = async (
  item_code: string,
): Promise<PricingDetails> => {
  try {
    const formData = new FormData();
    formData.append("item_code", item_code);
    const { data } = await API.post(API_URL.ONBOARDINGPRICING, formData);
    return Promise.resolve(data.itemDetails);
  } catch (error) {
    console.error("Error getting onboarding pricing:", error);
    return Promise.reject(
      (error as Error) || new Error("An unknown error occurred"),
    );
  }
};
