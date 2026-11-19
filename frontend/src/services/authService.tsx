import { api } from "./api";
import { type RegisterUserResponse, type LoginRequest, type LoginResponse, type RegisterUserRequest, type VerifyEmailRequest, type ResendVerificationEmailRequest, type ForgotPasswordRequest, type ResetPasswordRequest } from "../types/auth";

export async function login (data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", data)
    return response.data
}

export async function registerUser (data:RegisterUserRequest): Promise<RegisterUserResponse> {
    const response = await api.post<RegisterUserResponse>("/auth/register", data)
    return response.data
}

export async function verifyEmail(data:VerifyEmailRequest): Promise<void> {
    await api.post("/auth/verify-email", data);
}

export async function resendVerificationEmail(data:ResendVerificationEmailRequest): Promise<void> {
    await api.post("/auth/resend-verification-email", data);
}

export async function forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post("/auth/forgot-password", data);
}

export async function resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post("/auth/reset-password", data);
}