export type CreateUserParams = {
    username: string,
    password: string,
    email: string,
    confirmPassword: string
}
export type UpdateUserParams = {
    username?: string,
    password?: string,
    email?: string,
    confirmPassword?: string
}
export type LoginDataParams = {
    email: string,
    password: string
}