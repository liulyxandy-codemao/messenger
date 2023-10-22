export interface UserGeneralInformation {
    sex: 'male' | 'female' | 'other',
    age: number,
    phone: string,
    email: string
}

export interface Friend {
    username: string,
    avatar: string,
    nickname: string,
    generalInformation: UserGeneralInformation
}

export interface User {
    username: string,
    password: string,
    nickname: string,
    avatar: string,
    generalInformation: UserGeneralInformation,
    friends: Friend[]
}

export interface GroupMember {
    username: string,
    nickname: string,
    avatar: string,
    generalInformation: UserGeneralInformation,
    isAdmin: boolean,
    isOwner: boolean
}

export interface Group {
    groupname: string,
    groupid: string,
    avatar: string,
    members: GroupMember[]
}

export interface MessageElement {
    type: 'text' | 'image' | 'audio' | 'video' | 'file' | 'history',
    content?: string, //type=text
    file_url?: string //type=image|audio|video|file
    history?: History //type=history
}

export interface Message {
    from: 'group' | 'private',
    time: number,
    groupObject?: Group, //from=group
    userObject: Friend | GroupMember,
    content: MessageElement[]
}

export interface History {
    from: 'group' | 'private',
    fromObject: Friend | GroupMember,
    messages: Message[]
}