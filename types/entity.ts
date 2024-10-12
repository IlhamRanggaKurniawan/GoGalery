type TUser = {
    Id: number;
    Username: string;
    Email: string;
    Password: string;
    Role: string;
    ProfileUrl?: string | null;
    Bio?: string | null;
    Token?: string | null;
    Contents?: TContent[];
    LikeContents?: TLikeContent[];
    SaveContents?: TSaveContent[];
    Comments?: TComment[];
    Followers?: TFollow[];
    Following?: TFollow[];
    SentMessages?: TMessage[];
    ParticipantInDM1?: TDirectMessage[];
    ParticipantInDM2?: TDirectMessage[];
    GroupChats?: TGroupChat[];
    Notifications?: TNotification[];
    NotificationTrigger?: TNotification[];
    AiConversations?: TAIConversation[];
    AiMessages?: TAIMessage[];
    Feedbacks?: TFeedback[];
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TContent = {
    Id: number;
    UploaderId: number;
    Uploader: TUser;
    Caption: string;
    Url: string;
    Type: "image" | "video";
    Likes?: TLikeContent[];
    Save?: TSaveContent[];
    Comments?: TComment[];
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TLikeContent = {
    Id: number;
    UserId: number;
    ContentId: number;
    Content: TContent;
    User: TUser;
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TSaveContent = {
    Id: number;
    UserId: number;
    ContentId: number;
    Content: TContent;
    User: TUser;
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TComment = {
    Id: number;
    Comment: string;
    UserId: number;
    ContentId: number;
    User: TUser;
    Content: TContent;
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TFeedback = {
    Id: number;
    UserId: number;
    Message: string;
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TNotification = {
    Id: number;
    Content: string;
    IsChecked: boolean; 
    ReceiverId: number;
    TriggerId: number;
    Receiver: TUser;   
    Trigger: TUser;    
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TAIMessage = {
    Id: number;
    Message: string;
    Response?: string | null;
    SenderId: number;
    ConversationId: number;
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TAIConversation = {
    Id: number;
    UserId: number;
    Messages?: TAIMessage[];
    CreatedAt: Date;
    UpdatedAt: Date;
};

type TDirectMessage = {
    Id: number;
    Participant1Id: number;
    Participant2Id: number;
    Participant1: TUser;      
    Participant2: TUser;      
    Messages?: TMessage[];  
    CreatedAt: Date;
    UpdatedAt: Date;
};
  
type TGroupChat = {
    Id: number;
    Name: string;
    PictureUrl?: string | null; 
    Members: TUser[];           
    Messages?: TMessage[];      
    CreatedAt: Date;
    UpdatedAt: Date;
};
  
type TMessage = {
    Id: number;
    Message: string;
    IsRead: boolean;       
    SenderId: number;
    DirectMessageId?: number | null; 
    GroupChatId?: number | null;
    CreatedAt: Date;
    UpdatedAt: Date;
};
  
type TFollow = {
    Id: number;
    FollowerId: number;
    FollowingId: number;
    CreatedAt: Date;
    UpdatedAt: Date;
};
