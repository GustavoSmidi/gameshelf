import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router"

import { forgotPassword } from "../../services/authService";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../../schemas/auth";

import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function ForgotPasswordPage() {

    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    });

    async function handleForgotPassword(data: ForgotPasswordFormData) {
        try {
            await forgotPassword(data);
            setSuccess(true);
        } catch (error) {
            console.error("Error requesting password reset", error);

            setError("root", {
                message: "Unable to send the reset email. Please try again."
            });
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="max-w-lg text-center" padding="lg">

                {!success ? (
                    <>
                        <h1 className="mb-3 text-xl font-semibold text-text">
                            Forgot Password
                        </h1>

                        <p className="mb-5 text-sm text-text-secondary">
                            Enter your email to reset your password
                        </p>

                        <form onSubmit={handleSubmit(handleForgotPassword)} className="text-left">

                            <Input label="Email" type="email" placeholder="Enter your email" {...register("email")} error={errors.email?.message} />

                            {errors.root && (<p className="mt-3 text-sm text-red-500"> {errors.root.message}</p>)}

                            <Button type="submit" className="mt-7 mb-5" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send"}
                            </Button>
                        </form>
                        <Link to="/login" className="font-medium text-primary">
                            Go back to login
                        </Link>
                    </>
                ) : (
                    <>
                        <h1 className="mb-3 text-xl font-semibold text-text">
                            Check your email
                        </h1>

                        <p className="text-sm text-text-secondary">
                            If an account exists with this email address, you will receive instructions to reset your password.
                        </p>
                    </>
                )}

            </Card>
        </div>
    );
}