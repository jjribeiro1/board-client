import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

type MutationProps = {
  email: string;
  password: string;
};

type MutationFnResponse = {
  accessToken: string;
};

export function useLoginMutation() {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: MutationProps) => {
      const res = await apiClient.post<MutationFnResponse>(
        "/auth/sign-in",
        data
      );
      return res;
    },
    onSuccess(data) {
      const accessToken = data.data.accessToken;
      localStorage.setItem("token", accessToken);
      toast({
        description: "Usuário logado com sucesso",
      });
      router.replace("/");
    },
    onError() {
      toast({
        description: "Credenciais inválidas",
      });
    },
  });
}
