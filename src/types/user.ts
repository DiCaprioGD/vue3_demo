export interface UserType {
    name?: string;
    token?: string;
    password?: string | number;
    isLoggedIn?: boolean;
    rememberMe?: boolean;
}