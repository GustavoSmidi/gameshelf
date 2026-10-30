import { api } from "./api";
import { type RegisterUserResponse, type LoginRequest, type LoginResponse, type RegisterUserRequest } from "../types/auth";

export async function login (data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", data)
    return response.data
}

export async function registerUser (data:RegisterUserRequest): Promise<RegisterUserResponse> {
    const response = await api.post<RegisterUserResponse>("/auth/register", data)
    return response.data
}