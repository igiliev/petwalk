export interface UserChat {
    id: string;
    data: ChatData
}

export interface ChatData {
    combinedId: string;
    date: string;
    username: string;
};

export interface PassedMessages {
    messages: [
        {
            text: string;
            userId: string;
            id: string;
        }
    ]
}

export interface ClickedUser {
    [ key: string ]: {
        userInfo: {
            id: string;
            displayName: string;
        }
    }
}