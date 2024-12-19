import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

type MutationFnProps = {
  email: string;
  password: string;
};

export function useLoginMutation() {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: MutationFnProps) => {
      const res = await apiClient.post("/auth/sign-in", data);
      return res;
    },
    onSuccess() {
      toast({
        description: "Usuário logado com sucesso",
      });
      router.replace("/select-org");
    },
    onError() {
      toast({
        description: "Credenciais inválidas",
      });
    },
  });
}
