import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

type MutationProps = {
  name: string;
  email: string;
  password: string;
};

export function useCreateUserMutation() {
  return useMutation({
    mutationFn: (data: MutationProps) => {
      return apiClient.post("/users", data);
    },
  });
}
