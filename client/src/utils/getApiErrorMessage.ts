import axios from "axios";

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError<{ error?: string }>(error)) {
    return fallback;
  }

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  if (error.response) {
    return fallback;
  }

  return "Cannot reach the API. Check that the server is running and CORS is allowed.";
};
