export interface IMessage {
    message: string
    success: boolean
    id: string
    delay?: number
    removeNotification?: any;
}