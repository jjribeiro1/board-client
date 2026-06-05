import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/error-message";
import axios from "axios";

type UploadUrlResponse = {
  uploadUrl: string;
  key: string;
  publicUrl: string;
};

export function useUploadAvatarMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const { data } = await apiClient.patch<UploadUrlResponse>("/users/me/avatar/upload-url", {
        contentType: file.type,
        filename: file.name,
      });

      await axios.put(data.uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      await apiClient.patch("/users/me/avatar/confirm", {
        key: data.key,
      });

      return data.key;
    },
    onSuccess() {
      toast({
        description: "Foto de perfil atualizada com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["logged-user-info"] });
    },
    onError(err) {
      console.error(err); 
      toast({
        variant: "destructive",
        description: getErrorMessage(err, "Erro ao atualizar foto de perfil"),
      });
    },
  });
}
