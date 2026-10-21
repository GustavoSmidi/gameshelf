import { Link } from "react-router"

import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { GoogleIcon } from "../../components/ui/GoogleIcon"
import { Input } from "../../components/ui/Input"

export default function LoginPage() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input
                        label="Email" type="email" placeholder="Enter your email" autoComplete="email"/>

                    <div className="flex flex-col gap-6">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex cursor-pointer items-center gap-2 text-text">
                                <input type="checkbox" className="accent-primary" />
                                Keep me signed in
                            </label>
                            <Link to="#" className="font-medium text-primary">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <Button type="submit" className="mt-3">
                        Log in
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