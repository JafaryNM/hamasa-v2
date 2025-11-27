import { useMutation } from "@tanstack/react-query";
import authService from "../service/authService";
import { SignType } from "../types";

export const useSign = () => {
  return useMutation({
    mutationFn: async (payload: SignType) => {
      console.log("payload sent to API:", payload);

      const res = await authService.create(payload, "/login");

      console.log("API response:", res.data);
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.access_token) {
        localStorage.setItem("access", data.access_token);
      }

      if (data?.refresh_token) {
        localStorage.setItem("refresh", data.refresh_token);
      }
    },

    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });
};
