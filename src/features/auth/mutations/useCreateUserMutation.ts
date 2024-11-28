import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

type MutationProps = {
  name: string;
  email: string;
  password: string;
};

export function useCreateUserMutation() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: MutationProps) => {
      return apiClient.post("/users", data);
    },
    onSuccess() {
      toast({
        description: "Conta criada com sucesso",
      });
      router.push("/login");
    },
    onError() {
      toast({
        variant: "destructive",
        description: "Erro inesperado ao criar conta",
      });
    },
  });
}
