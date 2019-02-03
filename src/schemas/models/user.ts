export interface IUser{
    avatar_url?:string
    id: number
    kind: string
    last_modified?: string
    permalink: string
    permalink_url?: string
    uri: string
    username: string
}

export class User implements IUser {
    public avatarUrl: string;    
    public id: number;
    public kind: string;
    public lastModified: string;
    public permalink: string;
    public permalinkUrl: string;
    public uri: string;
    public username: string;
}