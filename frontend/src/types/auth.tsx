export type LoginRequest = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
}

export type RegisterUserRequest = {
    username: string
    email: string
    password: string
}

export type RegisterUserResponse = {
    username: string
    email: string
}