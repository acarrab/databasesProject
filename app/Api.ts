import axios from 'axios'
// Auto generated api - author: Angelo Carrabba

export interface input$api$auth$create {
    username: string, password: string, email: string, f_name: string, l_name: string, channel: string
}

export interface input$api$auth$login {
    username: string, password: string
}

export interface input$api$auth$logout { }

export interface input$api$auth$status { }

export interface input$api$auth$update { }

export interface input$api$auth$update_info {
    f_name: string, l_name: string, username: string, email: string, channel: string
}

export interface input$api$auth$update_password {
    password: string, old_password: string
}


export interface input$api$messaging$get {
    uid: string
}

export interface input$api$messaging$get_only_sent { }

export interface input$api$messaging$get_unread_count { }

export interface input$api$messaging$get_unread_from {
    contacts: string
}

export interface input$api$messaging$mark_as_read {
    uid: string
}

export interface input$api$messaging$send {
    text: string, uid: string
}


export interface input$api$playlists$add_to_favorites {
    vid: string
}

export interface input$api$playlists$add_to_playlist {
    name: string, vid: string
}

export interface input$api$playlists$create_playlist {
    name: string
}

export interface input$api$playlists$delete_from_playlist {
    vid: string, pid: string
}

export interface input$api$playlists$delete_playlist {
    pid: string
}

export interface input$api$playlists$get_favorites { }

export interface input$api$playlists$get_playlist {
    pid: string
}

export interface input$api$playlists$get_playlist_info {
    pid: string
}

export interface input$api$playlists$get_playlists { }

export interface input$api$playlists$playlist {
    vid: string, name: string
}

export interface input$api$playlists$remove_from_favorites {
    vid: string
}


export interface input$api$users$contact_list { }

export interface input$api$users$get {
    uid: string
}

export interface input$api$users$search_object_matches {
    searchText: string
}

export interface input$api$users$search_text_matches {
    searchText: string
}

export interface input$api$users$update_relationship {
    username: string, status: string
}


export interface input$api$videos$add_comment {
    vid: string, text: string
}

export interface input$api$videos$delete_comment {
    com_id: string
}

export interface input$api$videos$delete_video {
    vid: string
}

export interface input$api$videos$get_all { }

export interface input$api$videos$get_category {
    category: string
}

export interface input$api$videos$get_channel {
    uid: string
}

export interface input$api$videos$get_channels { }

export interface input$api$videos$get_comments {
    vid: string
}

export interface input$api$videos$get_mine { }

export interface input$api$videos$get_video {
    vid: string
}

export interface input$api$videos$search_channel {
    searchText: string
}

export interface input$api$videos$search_channel_only {
    searchText: string
}

export interface input$api$videos$search_keywords {
    searchText: string
}

export interface input$api$videos$search_keywords_only {
    searchText: string
}

export interface input$api$videos$upload {
    title: string, description: string, keywords: string, category: string, extension: string, thumbnail_png: string
}

export interface input$api$videos$video_selector { }



export interface output$api$auth$create {
    f_name: string, l_name: string, username: string, email: string, channel: string
}

export interface output$api$auth$login {
    f_name: string, l_name: string, username: string, email: string, channel: string
}

export interface output$api$auth$logout { }

export interface output$api$auth$status {
    f_name: string, l_name: string, username: string, email: string, channel: string
}

export interface output$api$auth$update { }

export interface output$api$auth$update_info {
    f_name: string, l_name: string, username: string, email: string, channel: string
}

export interface output$api$auth$update_password {
    f_name: string, l_name: string, username: string, email: string, channel: string
}


export interface output$api$messaging$get {
    sender: string, receiver: string, message: string, send_time: string
}

export interface output$api$messaging$get_only_sent {
    unread_messages: string, f_name: string, l_name: string, username: string, channel: string, uid: string, is_contact: string
}

export interface output$api$messaging$get_unread_count {
    unread_messages: string
}

export interface output$api$messaging$get_unread_from {
    unread_messages: string, f_name: string, l_name: string, username: string, channel: string, uid: string, is_contact: string
}

export interface output$api$messaging$mark_as_read { }

export interface output$api$messaging$send { }


export interface output$api$playlists$add_to_favorites { }

export interface output$api$playlists$add_to_playlist { }

export interface output$api$playlists$create_playlist { }

export interface output$api$playlists$delete_from_playlist { }

export interface output$api$playlists$delete_playlist { }

export interface output$api$playlists$get_favorites {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string, is_favorite: string
}

export interface output$api$playlists$get_playlist {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string, is_favorite: string
}

export interface output$api$playlists$get_playlist_info {
    pid: string, name: string
}

export interface output$api$playlists$get_playlists {
    pid: string, name: string
}

export interface output$api$playlists$playlist { }

export interface output$api$playlists$remove_from_favorites { }


export interface output$api$users$contact_list {
    uid: string, f_name: string, l_name: string, username: string, email: string, channel: string, is_contact: string
}

export interface output$api$users$get {
    uid: string, f_name: string, l_name: string, username: string, channel: string, is_contact: string
}

export interface output$api$users$search_object_matches {
    uid: string, f_name: string, l_name: string, username: string, channel: string, is_contact: string
}

export interface output$api$users$search_text_matches {
    text: string
}

export interface output$api$users$update_relationship { }


export interface output$api$videos$add_comment { }

export interface output$api$videos$delete_comment {
    deleted: string
}

export interface output$api$videos$delete_video {
    deleted: string
}

export interface output$api$videos$get_all {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string, is_favorite: string
}

export interface output$api$videos$get_category {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string, is_favorite: string
}

export interface output$api$videos$get_channel {
    is_favorite: string, vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$get_channels {
    uid: string, channel: string, username: string, video_count: string
}

export interface output$api$videos$get_comments {
    uid: string, vid: string, com_id: string, f_name: string, l_name: string, username: string, channel: string, text: string, submit_time: string
}

export interface output$api$videos$get_mine {
    is_favorite: string, vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$get_video {
    is_favorite: string, vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$search_channel {
    uid: string, channel: string, username: string, video_count: string
}

export interface output$api$videos$search_channel_only {
    channel: string
}

export interface output$api$videos$search_keywords {
    is_favorite: string, vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$search_keywords_only {
    word: string
}

export interface output$api$videos$upload {
    message: string, vid: string
}

export interface output$api$videos$video_selector { }




function post(route: string, data: any, success?: (res: any) => any, failure?: (err: any) => any) {

    if (success === undefined)

        success = (res) => { console.log("POST success: " + route); console.log(res); }

    if (failure === undefined)

        failure = (err) => { console.error("POST failure: " + route); console.log(err); }



    return axios.post(route, data).then(res => success(res.data)).catch(failure)

}

function get(route: string, success?: (res: any) => any, failure?: (err: any) => any) {

    if (success === undefined)

        success = (res) => { console.log("GET success: " + route); console.log(res); }

    if (failure === undefined)

        failure = (err) => { console.error("GET failure: " + route); console.log(err); }



    return axios.get(route).then(res => success(res.data)).catch(failure)

}

export const api = {
    auth: {
        create: function (data: input$api$auth$create, success?: (res: output$api$auth$create) => void, failure?: (err: any) => void) {
            return post('api/auth/create.php', data, success, failure)
        },
        login: function (data: input$api$auth$login, success?: (res: output$api$auth$login) => void, failure?: (err: any) => void) {
            return post('api/auth/login.php', data, success, failure)
        },
        logout: function (success?: (res: output$api$auth$logout) => void, failure?: (err: any) => void) {
            return get('api/auth/logout.php', success, failure)
        },
        status: function (success?: (res: output$api$auth$status) => void, failure?: (err: any) => void) {
            return get('api/auth/status.php', success, failure)
        },
        update: function (data: input$api$auth$update, success?: (res: output$api$auth$update) => void, failure?: (err: any) => void) {
            return post('api/auth/update.php', data, success, failure)
        },
        update_info: function (data: input$api$auth$update_info, success?: (res: output$api$auth$update_info) => void, failure?: (err: any) => void) {
            return post('api/auth/update_info.php', data, success, failure)
        },
        update_password: function (data: input$api$auth$update_password, success?: (res: output$api$auth$update_password) => void, failure?: (err: any) => void) {
            return post('api/auth/update_password.php', data, success, failure)
        }
    },
    messaging: {
        get: function (data: input$api$messaging$get, success?: (res: Array<output$api$messaging$get>) => void, failure?: (err: any) => void) {
            return post('api/messaging/get.php', data, success, failure)
        },
        get_only_sent: function (success?: (res: Array<output$api$messaging$get_only_sent>) => void, failure?: (err: any) => void) {
            return get('api/messaging/get_only_sent.php', success, failure)
        },
        get_unread_count: function (success?: (res: output$api$messaging$get_unread_count) => void, failure?: (err: any) => void) {
            return get('api/messaging/get_unread_count.php', success, failure)
        },
        get_unread_from: function (data: input$api$messaging$get_unread_from, success?: (res: Array<output$api$messaging$get_unread_from>) => void, failure?: (err: any) => void) {
            return post('api/messaging/get_unread_from.php', data, success, failure)
        },
        mark_as_read: function (data: input$api$messaging$mark_as_read, success?: (res: output$api$messaging$mark_as_read) => void, failure?: (err: any) => void) {
            return post('api/messaging/mark_as_read.php', data, success, failure)
        },
        send: function (data: input$api$messaging$send, success?: (res: output$api$messaging$send) => void, failure?: (err: any) => void) {
            return post('api/messaging/send.php', data, success, failure)
        }
    },
    playlists: {
        add_to_favorites: function (data: input$api$playlists$add_to_favorites, success?: (res: Array<output$api$playlists$add_to_favorites>) => void, failure?: (err: any) => void) {
            return post('api/playlists/add_to_favorites.php', data, success, failure)
        },
        add_to_playlist: function (data: input$api$playlists$add_to_playlist, success?: (res: output$api$playlists$add_to_playlist) => void, failure?: (err: any) => void) {
            return post('api/playlists/add_to_playlist.php', data, success, failure)
        },
        create_playlist: function (data: input$api$playlists$create_playlist, success?: (res: output$api$playlists$create_playlist) => void, failure?: (err: any) => void) {
            return post('api/playlists/create_playlist.php', data, success, failure)
        },
        delete_from_playlist: function (data: input$api$playlists$delete_from_playlist, success?: (res: output$api$playlists$delete_from_playlist) => void, failure?: (err: any) => void) {
            return post('api/playlists/delete_from_playlist.php', data, success, failure)
        },
        delete_playlist: function (data: input$api$playlists$delete_playlist, success?: (res: Array<output$api$playlists$delete_playlist>) => void, failure?: (err: any) => void) {
            return post('api/playlists/delete_playlist.php', data, success, failure)
        },
        get_favorites: function (success?: (res: Array<output$api$playlists$get_favorites>) => void, failure?: (err: any) => void) {
            return get('api/playlists/get_favorites.php', success, failure)
        },
        get_playlist: function (data: input$api$playlists$get_playlist, success?: (res: Array<output$api$playlists$get_playlist>) => void, failure?: (err: any) => void) {
            return post('api/playlists/get_playlist.php', data, success, failure)
        },
        get_playlist_info: function (data: input$api$playlists$get_playlist_info, success?: (res: output$api$playlists$get_playlist_info) => void, failure?: (err: any) => void) {
            return post('api/playlists/get_playlist_info.php', data, success, failure)
        },
        get_playlists: function (success?: (res: Array<output$api$playlists$get_playlists>) => void, failure?: (err: any) => void) {
            return get('api/playlists/get_playlists.php', success, failure)
        },
        playlist: function (data: input$api$playlists$playlist, success?: (res: Array<output$api$playlists$playlist>) => void, failure?: (err: any) => void) {
            return post('api/playlists/playlist.php', data, success, failure)
        },
        remove_from_favorites: function (data: input$api$playlists$remove_from_favorites, success?: (res: Array<output$api$playlists$remove_from_favorites>) => void, failure?: (err: any) => void) {
            return post('api/playlists/remove_from_favorites.php', data, success, failure)
        }
    },
    users: {
        contact_list: function (success?: (res: Array<output$api$users$contact_list>) => void, failure?: (err: any) => void) {
            return get('api/users/contact_list.php', success, failure)
        },
        get: function (data: input$api$users$get, success?: (res: output$api$users$get) => void, failure?: (err: any) => void) {
            return post('api/users/get.php', data, success, failure)
        },
        search_object_matches: function (data: input$api$users$search_object_matches, success?: (res: Array<output$api$users$search_object_matches>) => void, failure?: (err: any) => void) {
            return post('api/users/search_object_matches.php', data, success, failure)
        },
        search_text_matches: function (data: input$api$users$search_text_matches, success?: (res: Array<output$api$users$search_text_matches>) => void, failure?: (err: any) => void) {
            return post('api/users/search_text_matches.php', data, success, failure)
        },
        update_relationship: function (data: input$api$users$update_relationship, success?: (res: output$api$users$update_relationship) => void, failure?: (err: any) => void) {
            return post('api/users/update_relationship.php', data, success, failure)
        }
    },
    videos: {
        add_comment: function (data: input$api$videos$add_comment, success?: (res: Array<output$api$videos$add_comment>) => void, failure?: (err: any) => void) {
            return post('api/videos/add_comment.php', data, success, failure)
        },
        delete_comment: function (data: input$api$videos$delete_comment, success?: (res: output$api$videos$delete_comment) => void, failure?: (err: any) => void) {
            return post('api/videos/delete_comment.php', data, success, failure)
        },
        delete_video: function (data: input$api$videos$delete_video, success?: (res: output$api$videos$delete_video) => void, failure?: (err: any) => void) {
            return post('api/videos/delete_video.php', data, success, failure)
        },
        get_all: function (success?: (res: Array<output$api$videos$get_all>) => void, failure?: (err: any) => void) {
            return get('api/videos/get_all.php', success, failure)
        },
        get_category: function (data: input$api$videos$get_category, success?: (res: Array<output$api$videos$get_category>) => void, failure?: (err: any) => void) {
            return post('api/videos/get_category.php', data, success, failure)
        },
        get_channel: function (data: input$api$videos$get_channel, success?: (res: Array<output$api$videos$get_channel>) => void, failure?: (err: any) => void) {
            return post('api/videos/get_channel.php', data, success, failure)
        },
        get_channels: function (success?: (res: Array<output$api$videos$get_channels>) => void, failure?: (err: any) => void) {
            return get('api/videos/get_channels.php', success, failure)
        },
        get_comments: function (data: input$api$videos$get_comments, success?: (res: Array<output$api$videos$get_comments>) => void, failure?: (err: any) => void) {
            return post('api/videos/get_comments.php', data, success, failure)
        },
        get_mine: function (success?: (res: Array<output$api$videos$get_mine>) => void, failure?: (err: any) => void) {
            return get('api/videos/get_mine.php', success, failure)
        },
        get_video: function (data: input$api$videos$get_video, success?: (res: output$api$videos$get_video) => void, failure?: (err: any) => void) {
            return post('api/videos/get_video.php', data, success, failure)
        },
        search_channel: function (data: input$api$videos$search_channel, success?: (res: Array<output$api$videos$search_channel>) => void, failure?: (err: any) => void) {
            return post('api/videos/search_channel.php', data, success, failure)
        },
        search_channel_only: function (data: input$api$videos$search_channel_only, success?: (res: Array<output$api$videos$search_channel_only>) => void, failure?: (err: any) => void) {
            return post('api/videos/search_channel_only.php', data, success, failure)
        },
        search_keywords: function (data: input$api$videos$search_keywords, success?: (res: Array<output$api$videos$search_keywords>) => void, failure?: (err: any) => void) {
            return post('api/videos/search_keywords.php', data, success, failure)
        },
        search_keywords_only: function (data: input$api$videos$search_keywords_only, success?: (res: Array<output$api$videos$search_keywords_only>) => void, failure?: (err: any) => void) {
            return post('api/videos/search_keywords_only.php', data, success, failure)
        },
        upload: function (data: FormData, success?: (res: output$api$videos$upload) => void, failure?: (err: any) => void) {
            return post('api/videos/upload.php', data, success, failure)
        },
        video_selector: function (success?: (res: output$api$videos$video_selector) => void, failure?: (err: any) => void) {
            return get('api/videos/video_selector.php', success, failure)
        }
    }
}
