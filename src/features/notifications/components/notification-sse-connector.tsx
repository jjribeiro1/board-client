"use client";

import { useNotificationSSE } from "@/features/notifications/hooks/use-notification-sse";

export function NotificationSSEConnector() {
  useNotificationSSE();
  return null;
}
