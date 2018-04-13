import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

/*
  All api calls in the same place
*/

export class UserInfo {
    f_name: string
    l_name: string
    username: string
    email: string
    is_contact?: boolean
    constructor(f_name: string, l_name: string, username: string, email: string) {
        this.f_name = f_name
        this.l_name = l_name
        this.username = username
        this.email = email
    }
}
interface WorkFail { itWorked: (data: any) => void, itFailed: (err: any) => void }
interface GetUserInfo { itWorked: (data: UserInfo) => void, itFailed: (err: any) => void }

function Debug(res) { console.log(res); }
function DebugErr(err) { console.error(err); }

export interface LoginInput extends GetUserInfo {
    username: string, password: string
}
export interface UpdateInput extends GetUserInfo {
    f_name: string, l_name: string, email: string, username: string
}
export interface CreateInput extends UpdateInput {
    password: string
}

export interface UpdatePasswordInput extends GetUserInfo {
    password: string, old_password: string
}
/*
  allows you to create generic paths for the api that map the way the api directory is laid out
*/
abstract class ApiBranch {
    location: string
    post(route: string, data: any, success?: (res: any) => any, failure?: (err: any) => any) {
        if (success === undefined)
            success = (res) => { console.log("POST success: " + this.location + "/" + route); console.log(res); }
        if (failure === undefined)
            failure = (err) => { console.error("POST failure: " + this.location + "/" + route); console.log(err); }


        return axios.post(this.location + '/' + route, data).then(res => success(res.data)).catch(failure)
    }
    get(route: string, success?: (res: any) => any, failure?: (err: any) => any) {
        if (success === undefined)
            success = (res) => { console.log("GET success: " + this.location + "/" + route); console.log(res); }
        if (failure === undefined)
            failure = (err) => { console.error("GET failure: " + this.location + "/" + route); console.log(err); }

        return axios.get(this.location + '/' + route).then(res => success(res.data)).catch(failure)
    }

    constructor(prefix: string, suffix: string) { this.location = prefix + '/' + suffix }
}


class Auth extends ApiBranch {
    constructor(p: string) { super(p, 'auth') } //'api/auth'

    public login(vars: LoginInput) {
        return this.post(
            'login.php', //api/auth/login.php
            {
                username: vars.username,
                password: vars.password
            },
            vars.itWorked,
            vars.itFailed
        )
    }

    public logout() { return this.post('logout.php', {}) }

    public create(vars: CreateInput) {
        return this.post(
            'create.php',
            {
                f_name: vars.f_name,
                l_name: vars.l_name,
                username: vars.username,
                password: vars.password,
                email: vars.email
            },
            vars.itWorked,
            vars.itFailed
        )
    }
    public update(vars: UpdateInput) {
        return this.post(
            'update.php',
            {
                f_name: vars.f_name,
                l_name: vars.l_name,
                username: vars.username,
                email: vars.email
            },
            vars.itWorked,
            vars.itFailed
        )
    }
    public updatePassword(vars: UpdatePasswordInput) {
        return this.post(
            'update_password.php',
            {
                password: vars.password,
                old_password: vars.old_password
            },
            vars.itWorked,
            vars.itFailed
        )
    }

}


export interface SearchInput extends ApiBranch {
    searchText: string
    itWorked: (res: any) => void
    itFailed: (res: any) => void
}



class User extends ApiBranch {
    constructor(p: string) { super(p, 'user') }

    public text_list(searchText: string, itWorked: (userNames: Array<string>) => void, itFailed: (res: any) => void) {
        return this.post(
            'text.php',
            {
                searchText: searchText
            },
            itWorked,
            itFailed
        )
    }
    public user_list(searchText: string, itWorked: (userNames: Array<UserInfo>) => void, itFailed: (res: any) => void) {
        return this.post(
            'objects.php',
            {
                searchText: searchText
            },
            (users: Array<UserInfo>) => {
                users.map((user: any) => {
                    user.is_contact = user.is_contact === '1' ? true : false;
                    return user
                })
                itWorked(users)
            },
            itFailed
        )
    }
}

class Search extends ApiBranch {
    User: User
    constructor(p: string) {
        super(p, 'search')
        this.User = new User(this.location)
    }
}


class Users extends ApiBranch {
    constructor(p: string) { super(p, 'users') }
    add_relationship(username: string, success: (any) => void) {
        console.log("username: " + username);
        return this.post('update_rel.php', { username: username, status: "1" }, success)
    }
    remove_relationship(username: string, success: (any) => void) {
        return this.post('update_rel.php', { username: username, status: "0" }, success)
    }
    get_contacts(itWorked: (contacts: Array<UserInfo>) => void, itFailed?: (any) => void) {
        return this.get('contacts_list.php', itWorked, itFailed)
    }
}
class Api extends ApiBranch {
    location: string = 'api'

    Auth: Auth
    Search: Search
    Users: Users
    constructor() {
        super('', 'api')
        this.Auth = new Auth(this.location)
        this.Search = new Search(this.location)
        this.Users = new Users(this.location)
    }
}



const api = new Api();
export default api;