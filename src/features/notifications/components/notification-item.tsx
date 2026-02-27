"use client";

import { MoreHorizontal, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMarkNotificationReadMutation } from "@/features/notifications/mutations/use-mark-notification-read-mutation";
import { useDeleteNotificationMutation } from "@/features/notifications/mutations/use-delete-notification-mutation";
import { Notification } from "@/types/notification";
import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";

type Props = {
  notification: Notification;
};

export function NotificationItem({ notification }: Props) {
  const { mutate: markAsReadMutation, isPending: isMarkingAsRead } = useMarkNotificationReadMutation(notification.id);
  const { mutate: deleteNotificationMutation, isPending: isDeletingNotification } = useDeleteNotificationMutation(
    notification.id,
  );

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md px-3 py-3 transition-colors",
        !notification.isRead && "bg-muted/50",
      )}
    >
      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <p className={cn("truncate text-sm font-medium", !notification.isRead && "font-semibold")}>
            {notification.title}
          </p>
          {!notification.isRead && <span className="bg-primary h-2 w-2 shrink-0 rounded-full" />}
        </div>
        <p className="text-muted-foreground line-clamp-2 text-xs">{notification.content}</p>
        <p className="text-muted-foreground text-xs">{dayjs(notification.createdAt).fromNow()}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!notification.isRead && (
            <DropdownMenuItem
              onClick={() => markAsReadMutation()}
              disabled={isMarkingAsRead}
              className="cursor-pointer"
            >
              <Check className="mr-2 h-4 w-4" />
              Marcar como lida
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => deleteNotificationMutation()}
            disabled={isDeletingNotification}
            className="text-destructive cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
