"use client";

import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { useMarkAllNotificationsReadMutation } from "@/features/notifications/mutations/use-mark-all-notifications-read-mutation";
import { NotificationItem } from "./notification-item";

export function NotificationList() {
  const { data: notifications, isLoading } = useNotifications();
  const markAllAsRead = useMarkAllNotificationsReadMutation();

  const hasUnread = notifications?.some((n) => !n.isRead);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-1 pb-3">
        <h4 className="text-sm font-semibold">Notificações</h4>
        {hasUnread && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-auto px-2 py-1 text-xs"
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
          >
            <CheckCheck className="mr-1 h-3.5 w-3.5" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <Separator />

      <div className="max-h-[400px] overflow-y-auto">
        {isLoading && (
          <div className="space-y-3 p-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}

        {!isLoading && (!notifications || notifications.length === 0) && (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground text-sm">Nenhuma notificação</p>
          </div>
        )}

        {!isLoading &&
          notifications?.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
      </div>
    </div>
  );
}
