const handleApiCall = async <dataType, state>(
  apiFunction: () => Promise<dataType>,
  setLoading: React.Dispatch<React.SetStateAction<state>>,
  successMessage?: string,
): Promise<dataType | null> => {
  setLoading(true as state);
  try {
    const response = await apiFunction();
    if (successMessage) alert(successMessage);
    return response;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      errorMessage = axiosError.response?.data?.message ?? errorMessage;
    }
    console.error("API Error:", error);
    alert(errorMessage);
    return null;
  } finally {
    setLoading(null as state);
  }
};
export default handleApiCall;
