import { Link, useNavigate } from "react-router";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { registerSchema, type RegisterFormData } from "../../schemas/auth";
import { registerUser } from "../../services/authService";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    async function onSubmit(data: RegisterFormData) {
        try {
            await registerUser({
                username: data.username,
                email: data.email,
                password: data.password
            })
            navigate("/login")
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const alreadyExists = err.response.status === 409
                setError("root", {
                    message: alreadyExists ? "Email or username already in use" : "Could not create your account. Try again.",
                })
            } else {
                setError("root", { message: "Could not reach the server" })
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="max-w-lg" padding="lg">
                <div className="mb-8 text-center">
                    <h1 className="mb-3 text-xl font-semibold text-text"> Create your account </h1>
                    <p className="text-sm text-text">
                        Join {" "}
                        <span className="font-medium text-primary"> GameShelf</span> {" "}
                        and start your journey
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                    <Input label="Username" placeholder="Enter your username" autoComplete="username" autoCapitalize="none" spellCheck={false} error={errors.username?.message} {...register("username")} />
                    <Input label="Email" type="email" placeholder="Enter your email" autoComplete="email" error={errors.email?.message} {...register("email")} />
                    <Input label="Password" type="password" placeholder="Enter your password" autoComplete="new-password" error={errors.password?.message} {...register("password")} />
                    <Input label="Repeat Password" type="password" placeholder="Repeat your password" autoComplete="new-password" error={errors.repeatPassword?.message} {...register("repeatPassword")} />

                    {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

                    <Button type="submit" className="mt-3" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Register"}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-text">
                    Already have an account? {" "}
                    <Link to="/login" className="font-medium text-primary">
                        Log in
                    </Link>
                </p>
            </Card>
        </div>
    )
}