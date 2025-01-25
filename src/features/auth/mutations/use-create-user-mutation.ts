import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

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
    onError(err: AxiosError<{ message: string }>) {
      toast({
        variant: "destructive",
        description: err.response?.data ? err.response.data.message : "Erro ao criar conta",
      });
    },
  });
}
