import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

type MutationFnProps = {
  name: string;
  email: string;
  password: string;
};

export function useCreateUserMutation() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: MutationFnProps) => {
      return apiClient.post("/users", data);
    },
    onSuccess() {
      toast({
        description: "Conta criada com sucesso",
      });
      router.push("/login");
    },
    onError(err) {
      toast({
        variant: "destructive",
        description: getErrorMessage(err),
      });
    },
  });
}
