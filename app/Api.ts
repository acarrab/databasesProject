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

export interface input$api$auth$update_info {
    f_name: string, l_name: string, username: string, email: string, channel: string
}

export interface input$api$auth$update_password {
    password: string, old_password: string
}


export interface input$api$users$contact_list { }

export interface input$api$users$search_object_matches {
    searchText: string
}

export interface input$api$users$search_text_matches {
    searchText: string
}

export interface input$api$users$update_relationship {
    username: string, status: string
}


export interface input$api$videos$get_all { }

export interface input$api$videos$get_category {
    category: string
}

export interface input$api$videos$get_mine { }

export interface input$api$videos$get_video {
    vid: string
}

export interface input$api$videos$upload {
    title: string, description: string, keywords: string, category: string, extension: string
}



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

export interface output$api$auth$update_info {
    f_name: string, l_name: string, username: string, email: string, channel: string
}

export interface output$api$auth$update_password {
    f_name: string, l_name: string, username: string, email: string, channel: string
}


export interface output$api$users$contact_list {
    uid: string, f_name: string, l_name: string, username: string, email: string
}

export interface output$api$users$search_object_matches {
    f_name: string, l_name: string, username: string, email: string, channel: string, is_contact: string
}

export interface output$api$users$search_text_matches {
    text: string
}

export interface output$api$users$update_relationship { }


export interface output$api$videos$get_all {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$get_category {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$get_mine {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$get_video {
    vid: string, username: string, f_name: string, l_name: string, channel: string, title: string, description: string, upload_date: string, video_path: string, image_path: string, last_access: string, category: string
}

export interface output$api$videos$upload {
    message: string, vid: string
}




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
        update_info: function (data: input$api$auth$update_info, success?: (res: output$api$auth$update_info) => void, failure?: (err: any) => void) {
            return post('api/auth/update_info.php', data, success, failure)
        },
        update_password: function (data: input$api$auth$update_password, success?: (res: output$api$auth$update_password) => void, failure?: (err: any) => void) {
            return post('api/auth/update_password.php', data, success, failure)
        }
    },
    users: {
        contact_list: function (data: input$api$users$contact_list, success?: (res: Array<output$api$users$contact_list>) => void, failure?: (err: any) => void) {
            return post('api/users/contact_list.php', data, success, failure)
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
        get_all: function (success?: (res: Array<output$api$videos$get_all>) => void, failure?: (err: any) => void) {
            return get('api/videos/get_all.php', success, failure)
        },
        get_category: function (data: input$api$videos$get_category, success?: (res: Array<output$api$videos$get_category>) => void, failure?: (err: any) => void) {
            return post('api/videos/get_category.php', data, success, failure)
        },
        get_mine: function (success?: (res: Array<output$api$videos$get_mine>) => void, failure?: (err: any) => void) {
            return get('api/videos/get_mine.php', success, failure)
        },
        get_video: function (data: input$api$videos$get_video, success?: (res: output$api$videos$get_video) => void, failure?: (err: any) => void) {
            return post('api/videos/get_video.php', data, success, failure)
        },
        upload: function (data: FormData, success?: (res: output$api$videos$upload) => void, failure?: (err: any) => void) {
            return post('api/videos/upload.php', data, success, failure)
        }
    }
}
