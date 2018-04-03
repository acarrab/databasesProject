export interface VideoInfo {
    id: string;
    img: string;
    title: string;
    summary: string;
    author: string;
    date: string;
}

export interface Channel {
    img: string;
    owner: string;
    array: VideoInfo;
}

export interface Video {
    id: string;
    data: string;
    info: VideoInfo;
}

export interface