import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";

export function useLogoutMutation() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete("/auth/sign-out");
    },
    onSuccess() {
      toast({
        description: "Logout realizado com sucesso",
      });
      router.replace("/login");
      router.refresh();
    },
    onError(err) {
      toast({
        variant: "destructive",
        description: getErrorMessage(err),
      });
    },
  });
}
