import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setAppTokenHeader } from "@/utils/api/token/API-app";

export const getFeedback = async (): Promise<any> => {
  try {
    const response = await API.post(
      API_URL.FEEDBACK,
      {
        description:
          " I override a lot of default styles to try and make things our own, but the time we save with complex components like the Autocomplete and the Data Grid are so worth it. Every other library  Im looking for when it comes to complex use cases, Material UI has it all under one roof .",
        name: "Hiba",
      },
      {
        headers: await setAppTokenHeader(),
      },
    );

    console.log("feedback:", response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
