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

export interface GetStoreData {
    dataStore: {
        data: any;
        step: number;
        userLoggedin: boolean; 
        currentUserId: string; 
        combinedId: string;
        chatData: {};
        userChatNames: string[];
    };
}

export interface ChatInpData {
    id: string;
    data: {
        displayName: string;
        id: string;
    } ;
}

export interface CurrentUserImpl {
    accessToken: string;
    auth: any;
    displayName: any;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: any;
    phoneNumber: any;
    photoURL: any;
    proactiveRefresh: any;
    providerData: any[];
    providerId: string;
    reloadListener: any;
    reloadUserInfo: any;
    stsTokenManager: any;
    tenantId: any;
    uid: string;
}

export interface SitterProps {
    dailyRate: string; 
    dailyRateOption: string;
    id: string;
    mail: string;
    name: string;
    selectedHoods: any[];
    selectedServices: string[];
    selectedUser: 'sitter' | 'owner';
    uid: string;
    userImage: any;
}