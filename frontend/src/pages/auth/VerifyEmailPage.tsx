import { useEffect, useState } from "react"
import { verifyEmail } from "../../services/authService"
import { Card } from "../../components/ui/Card";

export default function VerifyEmailPage() {

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect (() => {
        async function confirmEmail() {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (!token) {
                setStatus("error");
                return
            }

            try {
                await verifyEmail({token});
                setStatus("success");
            } catch (error) {
                console.error("Error verifying email", error);
                setStatus("error");
            }            
        }

        confirmEmail();
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            {status === "loading" && 
            <Card className="max-w-lg text-center" padding="lg">
                <h1 className="mb-3 text-xl font-semibold text-text">Verifying your email</h1>
                <p className="text-sm text-text">Please wait while we confirm your email address.</p>
            </Card>
            }

            {status === "success" && 
            <Card className="max-w-lg text-center" padding="lg">
                <h1 className="mb-3 text-xl font-semibold text-text">Email verified!</h1>
                <p className="text-sm text-text">Your email has been successfully verified. You can now log in to your {" "}
                    <span className="font-medium text-primary">GameShelf</span> account.</p>
            </Card>
            }

            {status === "error" && 
            <Card className="max-w-lg text-center" padding="lg">
                <h1 className="mb-3 text-xl font-semibold text-text">Verification failed</h1>
                <p className="text-sm text-text">This verification link is invalid or has expired. Please request a new verification email.</p>
            </Card>
            }
        </div>
    );
}