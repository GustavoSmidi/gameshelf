import { Link } from "react-router"
import { useForm } from "react-hook-form"
import Axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { GoogleIcon } from "../../components/ui/GoogleIcon"
import { Input } from "../../components/ui/Input"
import { login } from "../../services/authService"
import { loginSchema, type LoginFormData } from "../../schemas/auth"

export default function LoginPage() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })


    async function onSubmit(data: LoginFormData) {
        try {
            const { token } = await login(data)
            localStorage.setItem("token", token)
            console.log("logado!")
        } catch (err) {
            if (Axios.isAxiosError(err) && err.response) {
                setError("root", { message: "Invalid email or password" })
            } else {
                setError("root", { message: "Could not reach the server" })
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="max-w-lg" padding="lg">
                <div className="mb-8 text-center">
                    <h1 className="mb-3 text-xl font-semibold text-text">Welcome Back</h1>
                    <p className="text-sm text-text">
                        Log in to continue your journey on{" "}
                        <span className="font-medium text-primary">GameShelf</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                    <Input
                        label="Email" type="email" placeholder="Enter your email" autoComplete="email" error={errors.email?.message} {...register("email")}/>

                    <div className="flex flex-col gap-6">
                        <Input label="Password" type="password" placeholder="Enter your password" autoComplete="current-password" error={errors.password?.message} {...register("password")}/>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex cursor-pointer items-center gap-2 text-text">
                                <input type="checkbox" className="accent-primary" />
                                Keep me signed in
                            </label>
                            <Link to="/forgot-password" className="font-medium text-primary">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}  

                    <Button type="submit" className="mt-3" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </Button>
                </form>

                <div className="my-5 flex items-center gap-4 text-sm text-text-secondary">
                    <div className="h-px flex-1 bg-border" />
                    or
                    <div className="h-px flex-1 bg-border" />
                </div>

                <Button variant="contrast">
                    Login with Google
                    <GoogleIcon className="size-5" />
                </Button>

                <p className="mt-6 text-center text-sm text-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-primary">
                        Sign up
                    </Link>
                </p>
            </Card>
        </div>
    )
}