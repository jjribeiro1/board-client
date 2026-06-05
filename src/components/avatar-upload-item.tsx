"use client";

import { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUploadAvatarMutation } from "@/features/users/mutations/use-upload-avatar-mutation";

const ACCEPTED_IMAGE_TYPES = "image/png, image/jpeg, image/webp";

export function AvatarUploadItem() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAvatar = useUploadAvatarMutation();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadAvatar.mutate(file);

    // Reset input so the same file can be selected again
    e.target.value = "";
  }

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        disabled={uploadAvatar.isPending}
        onSelect={(e) => {
          e.preventDefault();
          fileInputRef.current?.click();
        }}
      >
        {uploadAvatar.isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Camera className="mr-2 h-4 w-4" />
        )}
        {uploadAvatar.isPending ? "Enviando..." : "Alterar foto"}
      </DropdownMenuItem>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
