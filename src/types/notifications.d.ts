// src/types/notifications.d.ts
declare interface NotificationOptions {
    actions?: Array<{
      action: string;
      title: string;
      icon?: string;
    }>;
  }