import { Link } from "react-router";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";

export default function RegisterPage() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="max-w-lg" padding="lg">
                <div className="mb-8 text-center">
                    <h1 className="mb-3 text-xl font-semibold text-text"> Welcome </h1>
                    <p className="text-sm text-text">
                        Log in to continue your journey on {" "}
                        <span className="font-medium text-primary">
                            GameShelf
                        </span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input label="Username" placeholder="Enter your username" autoComplete="username" autoCapitalize="none" spellCheck={false} />
                        <Input label="Email" type="email" placeholder="Enter your email" autoComplete="email" />
                        <Input label="Password" type="password" placeholder="Enter your password" autoComplete="new-password" />
                        <Input label="Repeat Password" type="password" placeholder="Repeat your password" autoComplete="new-password" />
                    <Button type="submit" className="mt-3">
                        Register
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