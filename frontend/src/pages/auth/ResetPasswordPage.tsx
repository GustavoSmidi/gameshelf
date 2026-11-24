
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPassword } from "../../services/authService";
import { resetPasswordSchema, type ResetPasswordFormData } from "../../schemas/auth";

import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function ResetPasswordPage() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            repeatPassword: ""
        }
    });

    async function handleResetPassword(data: ResetPasswordFormData) {
        if (!token) return;

        try {
            await resetPassword({
                token,
                newPassword: data.newPassword
            });

            setSuccess(true);
        } catch (error) {
            console.error("Error resetting password", error);

            setError("root", {
                message: "Unable to reset your password. The link may be invalid or expired. Please try again."
            });
        }
    }

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
                <Card className="max-w-sm text-center" padding="lg">
                    <h1 className="mb-3 text-xl font-semibold text-text">
                        Invalid reset link
                    </h1>

                    <p className="mb-5 text-sm text-text-secondary">
                        This password reset link is invalid. Please request a new one.
                    </p>

                    <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        Request a new reset link
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="max-w-lg text-center" padding="lg">

                {!success ? (
                    <>
                        <h1 className="mb-3 text-xl font-semibold text-text">
                            Reset Password
                        </h1>

                        <p className="mb-5 text-sm text-text-secondary">
                            Enter your new password below.
                        </p>

                        <form
                            onSubmit={handleSubmit(handleResetPassword)}
                            className="text-left"
                        >
                            <div className="flex flex-col gap-4">
                                <Input label="New Password" type="password" placeholder="Enter your new password" autoComplete="new-password" {...register("newPassword")} error={errors.newPassword?.message} />

                                <Input label="Confirm New Password" type="password" placeholder="Confirm your new password" autoComplete="new-password"  {...register("repeatPassword")} error={errors.repeatPassword?.message} />
                            </div>

                            {errors.root && (<p className="mt-3 text-sm text-red-500"> {errors.root.message} </p>)}

                            <Button type="submit" className="mt-7" disabled={isSubmitting}>
                                {isSubmitting ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <>
                        <h1 className="mb-3 text-xl font-semibold text-text">
                            Password Reset Successful!
                        </h1>

                        <p className="mb-5 text-sm text-text-secondary">
                            Your password has been successfully changed. You can now log in with your new password.
                        </p>

                        <Link
                            to="/login"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Back to login
                        </Link>
                    </>
                )}

            </Card>
        </div>
    );
}
