import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";

// Define a type for the options object
type OptionType = "products" | "service" | "group";

// Define the options object
const options: Record<OptionType, string> = {
  products: API_URL.PRODUCTS,
  service: API_URL.SERVICE,
  group: API_URL.GROUP,
};
const responseKeys: Record<OptionType, string> = {
  products: "products",
  service: "services",
  group: "group",
};

export const getProducts = async (type: OptionType) => {
  try {
    const url = options[type];
    const { data } = await API.get(url);
    const key = responseKeys[type];
    return Promise.resolve(data[key]);
  } catch (error) {
    console.error(`Error fetching ${type}: `, error);
    return Promise.reject(error);
  }
};

export const getProductById = async (
  type: string | undefined,
  id: string | undefined,
) => {
  try {
    const url = options[type as OptionType];
    const { data } = await API.get(url, { params: { item_id: id } });
    const key = responseKeys[type as OptionType];
    return Promise.resolve(data[key][0]);
  } catch (error) {
    console.error(`Error fetching ${type} by id: `, error);
    return Promise.reject(error);
  }
};

export const getCoupon = async (coupon: string) => {
  try {
    const fromData = new FormData();
    fromData.append("pricing_rule", coupon);
    const { data } = await API.post(API_URL.COUPONGET, fromData);
    console.log("coupon data", data.message);
    return Promise.resolve(data.message);
  } catch (error) {
    console.error("Error fetching coupon: ", error);
    return Promise.reject(error);
  }
};
