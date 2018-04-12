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
interface GetUserInfo {
    itWorked: (data: UserInfo) => void
    itFailed: (err: any) => void
}



export interface LoginInput extends GetUserInfo {
    username: string
    password: string
}
export interface UpdateInput extends GetUserInfo {
    f_name: string
    l_name: string
    email: string
    username: string
}
export interface CreateInput extends UpdateInput {
    password: string
}

export interface UpdatePasswordInput extends GetUserInfo {
    password: string
    old_password: string
}



class Auth {
    location: string
    constructor(prefix: string) { this.location = prefix + '/auth' }

    public login(vars: LoginInput) {
        return axios.post(this.location + '/login.php', { username: vars.username, password: vars.password })
            .then((res) => { vars.itWorked(res.data) })
            .catch((err) => { vars.itFailed(err) })
    }
    public logout() {
        return axios.post(this.location + '/logout.php')
            .then((res) => { console.log("logout success") })
            .catch((err) => { console.error("logout failure") })
    }
    public create(vars: CreateInput) {
        return axios.post(this.location + '/create.php', {
            f_name: vars.f_name,
            l_name: vars.l_name,
            username: vars.username,
            password: vars.password,
            email: vars.email
        })
            .then((res) => { vars.itWorked(res.data) })
            .catch((err) => { vars.itFailed(err) })
    }
    public update(vars: UpdateInput) {
        return axios.post(this.location + '/update.php', {
            f_name: vars.f_name,
            l_name: vars.l_name,
            username: vars.username,
            email: vars.email
        })
            .then((res) => { vars.itWorked(res.data) })
            .catch((err) => { vars.itFailed(err) })
    }
    public updatePassword(vars: UpdatePasswordInput) {
        return axios.post(this.location + '/update_password.php', {
            password: vars.password,
            old_password: vars.old_password
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



class User {
    location: string
    constructor(prefix: string) { this.location = prefix + '/user' }

    public text_list(searchText: string,
        itWorked: (userNames: Array<string>) => void,
        itFailed: (res: any) => void) {
        return axios.post(this.location + '/text.php', {
            searchText: searchText
        }).then((res) => { itWorked(res.data); })
            .catch(itFailed)

    }
    public user_list(searchText: string,
        itWorked: (userNames: Array<UserInfo>) => void,
        itFailed: (res: any) => void) {
        return axios.post(this.location + '/objects.php', {
            searchText: searchText
        }).then((res) => { itWorked(res.data); })
            .catch(itFailed)
    }


}


class Search {
    location: string
    User: User
    constructor(prefix: string) {
        this.location = prefix + '/search'
        this.User = new User(this.location)
    }
}

class Api {
    location: string = 'api'

    Auth: Auth
    Search: Search
    constructor() {
        this.Auth = new Auth(this.location)
        this.Search = new Search(this.location)
    }
}


const api = new Api();
export default api;
