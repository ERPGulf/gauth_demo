import { PortalSection } from "@/types/onboardingpages-types";
import API_URL from "@/utils/api/API-URL";
import API from "@/utils/api/API-axios";

export const getOnboardingPages = async (): Promise<PortalSection> => {
  try {
    const { data } = await API.get(API_URL.ONBOARDINGPAGES);
    return Promise.resolve(data);
  } catch (error) {
    console.error("Error getting onboarding pages:", error);
    return Promise.reject(error);
  }
};
