
interface UserInfo {
    username: string

    name: string
    firstname: string
    lastname: string

    id: string
}
export default interface GlobalVariables {
    baseUrl: string
    userInfo?: UserInfo
}


export interface GlobalProps {
    globals: GlobalVariables
}