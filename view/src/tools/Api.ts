import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

/*
  All api calls in the same place
*/

export class UserInfo {
    f_name: string
    l_name: string
    username: string
    email: string
    constructor(f_name: string, l_name: string, username: string, email: string) {
        this.f_name = f_name
        this.l_name = l_name
        this.username = username
        this.email = email
    }
}
export interface LoginInput {
    username: string
    password: string
    itWorked: (data: UserInfo) => void
    itFailed: (err: any) => void
}
export interface CreateInput {
    f_name: string
    l_name: string
    username: string
    password: string
    email: string
    itWorked: (data: UserInfo) => void
    itFailed: (err: any) => void
}


class Auth {
    prefix: string = 'api/auth'

    public login(vars: LoginInput) {
        return axios.post(this.prefix + '/login.php', { username: vars.username, password: vars.password })
            .then((res) => { vars.itWorked(res.data) })
            .catch((err) => { vars.itFailed(err) })
    }
    public logout() {
        return axios.post(this.prefix + '/logout.php')
            .then((res) => { console.log("logout success") })
            .catch((err) => { console.error("logout failure") })
    }
    public create(vars: CreateInput) {
        return axios.post(this.prefix + '/create.php', {
            f_name: vars.f_name,
            l_name: vars.l_name,
            username: vars.username,
            password: vars.password,
            email: vars.email
        })
            .then((res) => { vars.itWorked(res.data) })
            .catch((err) => { vars.itFailed(err) })
    }
}


export interface SearchInput {
    searchText: string
    itWorked: (res: any) => void
    itFailed: (res: any) => void
}


export interface VideoInfo {
    img: string
    title: string
    summary: string
    author: string
    date: string
}



export interface ListInput {
    itWorked: (data: VideoInfo) => void
    itFailed: (res: any) => void
}
export interface TextlistInput {
    itWorked: (data: Array<string>) => void
    itFailed: (res: any) => void
}


class Videos {
    prefix: string = 'api/videos'
    public search(vars: SearchInput) {
        return axios.post(this.prefix + '/search.php', { searchText: vars.searchText })
            .then((res) => { vars.itWorked(res) }).catch((err) => { vars.itFailed(err) })
    }
    public list(vars: ListInput) {
        return axios.get(this.prefix + '/list.php')
            .then((res) => { vars.itWorked(res.data) }).catch((err) => { vars.itFailed(err) })
    }
    public textlist(vars: TextlistInput) {
        return axios.get(this.prefix + '/textlist.php')
            .then((res) => { vars.itWorked(res.data) }).catch((err) => { vars.itFailed(err) })
    }
}

class Api {
    Auth: Auth
    Videos: Videos
    constructor() {
        this.Auth = new Auth()
        this.Videos = new Videos()
    }
}


const api = new Api();
export default api;