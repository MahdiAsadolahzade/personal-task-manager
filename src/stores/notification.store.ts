import { createPersistedStore } from "./createPersistedStore";

interface NotificationStoreModel {
    notifications: Notification[];
    pushNotification: (notification: Notification) => void;
    removeNotification: (id: string) => void;
    updateNotification: (notification: Notification) => void;
    clearNotifications: () => void;
    setNotifications: (notifications: Notification[]) => void;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    scheduledTime?: Date;
}

export const useNotificationStore = createPersistedStore<NotificationStoreModel>(
    "notification-store",
    (set) => ({
        notifications: [],
        pushNotification: (notification) =>
            set((state) => ({ notifications: [notification, ...state.notifications] })),
        removeNotification: (id) =>
            set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
        updateNotification: (notification) =>
            set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === notification.id ? notification : n
                ),
            })),
        clearNotifications: () => set({ notifications: [] }),
        setNotifications: (notifications) => set({ notifications }),
    }),
    (state) => ({ notifications: state.notifications })
);

export const notificationList = () => {
    const store = useNotificationStore.getState();
    return store.notifications;
};

export const postNotification = (notif: Notification) => {
    console.log("Posting notification:", notif.id, notif.scheduledTime);
    useNotificationStore.getState().pushNotification(notif);
};

export const removeNotification = (id: string) => {
    useNotificationStore.getState().removeNotification(id);
  };
  