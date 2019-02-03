import { IUser } from "./user";

export interface ITrack{
    artwork_url?: string
    attachments_uri?: string
    bpm?:  any;
    comment_count?: number
    commentable?: boolean
    created_at?: string
    description?: string
    download_count?: number
    download_url?: string
    downloadable?: false
    duration: number
    embeddable_by?:string
    favoritings_count?: number
    genre: string
    id: number
    isrc: string
    key_signature?:string
    kind: string
    label_id?: any
    label_name?:string
    last_modified?:string
    license?: string
    likes_count?: number
    original_content_size?: number
    original_format?: string
    permalink?: string
    permalink_url?: string
    playback_count?: number
    purchase_title?: string
    purchase_url?: string
    release?: string
    release_day?: string
    release_month?: string
    release_year?: string
    reposts_count?: number
    sharing?: string
    state?: string
    stream_url?: string
    streamable?: boolean
    tag_list?: string
    title?: string
    track_type?: string
    uri?: string
    user?: number | IUser
    user_favorite?: boolean
    user_id?: number
    user_playback_count?: string
    video_url?: string
    waveform_url?: string
}

export class Track implements ITrack{
    public artworkUrl?: string | undefined;    
    public attachmentsUri?: string | undefined;
    public bpm?: any;
    public commentCount?: number | undefined;
    public commentable?: boolean | undefined;
    public createdAt?: string | undefined;
    public  description?: string | undefined;
    public downloadCount?: number | undefined;
    public downloadUrl?: string | undefined;
    public downloadable?: false | undefined;
    public duration: number;
    public embeddableBy?: string | undefined;
    public favoritingsCount?: number | undefined;
    public genre: string;
    public id: number;
    public isrc: string;
    public keySignature?: string | undefined;
    public kind: string;
    public labelId?: any;
    public labelName?: string | undefined;
    public lastModified?: string | undefined;
    public license?: string | undefined;
    public likesCount?: number | undefined;
    public originalContentSize?: number | undefined;
    public originalFormat?: string | undefined;
    public permalink?: string | undefined;
    public permalinkUrl?: string | undefined;
    public playbackCount?: number | undefined;
    public purchaseTitle?: string | undefined;
    public purchaseUrl?: string | undefined;
    public release?: string | undefined;
    public releaseDay?: string | undefined;
    public releaseMonth?: string | undefined;
    public releaseYear?: string | undefined;
    public repostsCount?: number | undefined;
    public sharing?: string | undefined;
    public state?: string | undefined;
    public streamUrl?: string | undefined;
    public streamable?: boolean | undefined;
    public tagList?: string | undefined;
    public title?: string | undefined;
    public trackType?: string | undefined;
    public uri?: string | undefined;
    public user?: number | undefined;
    public userFavorite?: boolean | undefined;
    public userId?: number | undefined;
    public userPlaybackCount?: string | undefined;
    public videoUrl?: string | undefined;
    public waveformUrl?: string | undefined;
}