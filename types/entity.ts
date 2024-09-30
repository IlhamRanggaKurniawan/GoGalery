
export interface IUserPreview {
    ID: number,
    Username: string,
    ProfileUrl: string
}
export interface INotification {
    ID: number,
    Content: string,
    IsChecked: boolean,
    ReceiverID: number,
    TriggerID: number,
    CreatedAt: Date,
    UpdatedAt: Date,
}