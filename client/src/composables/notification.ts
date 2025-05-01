import { ref } from "vue"

export interface Notification {
    message: string
    type: 'success' | 'danger' | 'warning' | 'info'
}

const notifications = ref<Notification[]>([])

export const refNotification = () => notifications

export function addNotification(notification: Notification) {
    const index = notifications.value.length;
    notifications.value.push(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        removeNotification(index);
    }, 5000);
}

export function removeNotification(index: number){
    notifications.value.splice(index, 1);
}