import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";

//Get Details
export const getDetails = async (): Promise<any> => {
  try {
    const id = localStorage.getItem("item_code");

    if (!id) {
      throw new Error("ID is missing from localStorage.");
    }
    const formData = new FormData();
    formData.append("id", id);
    const response = await API.post(API_URL.GETDETAILS, formData, {
      headers: await setUserTokenHeader(),
    });

    return Promise.resolve(response.data.message[0]);
  } catch (error) {
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
