import { z } from "zod"

export const loginSchema = z.object({
    email: z.email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(8, "Password must be between 8 and 128 characters").max(128, "Password must be between 8 and 128 characters")
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required").min(4, "Username must be between 4 and 20 characters").max(20, "Username must be between 4 and 20 characters"),
    email: z.email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(1, "Password is required").min(8, "Password must be between 8 and 128 characters").max(128, "Password must be between 8 and 128 characters"),
    repeatPassword: z.string().min(1, "Repeat your password")
}).refine ((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
})

export type RegisterFormData = z.infer<typeof registerSchema>