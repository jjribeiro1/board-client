"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Notification } from "@/types/notification";

export function useNotificationSSE() {
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/stream`;
    const eventSource = new EventSource(url, { withCredentials: true });
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const notification: Notification = JSON.parse(event.data);

        if (!notification?.id || !notification?.title) return;

        const prev = queryClient.getQueryData<Notification[]>(["notifications"]);
        const isDuplicate = prev?.some((n) => n.id === notification.id) ?? false;

        queryClient.setQueryData<Notification[]>(["notifications"], (current) => {
          if (!current) return [notification];
          if (isDuplicate) return current;
          return [notification, ...current];
        });

        if (!isDuplicate) {
          queryClient.setQueryData<number>(["notifications-unread-count"], (count) => (count ?? 0) + 1);
        }
      } catch (err) {
        console.error("[SSE] Failed to parse notification event:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("[SSE] Connection error:", err);
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [queryClient]);
}
