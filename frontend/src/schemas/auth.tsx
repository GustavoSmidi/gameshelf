import { z } from "zod"

export const loginSchema = z.object({
    email: z.email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(8, "Password must be between 8 and 128 characters").max(128, "Password must be between 8 and 128 characters")
})

export type LoginFormData = z.infer<typeof loginSchema>