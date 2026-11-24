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

export type VerifyEmailRequest = {
    token: string
}

export type ResendVerificationEmailRequest = {
    email: string
}

export type ForgotPasswordRequest = {
    email: string
}

export type ResetPasswordRequest = {
    token: string
    newPassword: string
}