import { useEffect, useState } from "react"
import { verifyEmail } from "../../services/authService"

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
                await verifyEmail(token);
                setStatus("success");
            } catch (error) {
                console.error("Error verifying email", error);
                setStatus("error");
            }            
        }

        confirmEmail();
    }, []);

    return (
        <div>
            {status === "loading" && <p>Checking your email...</p>}

            {status === "success" && <p>User successfully verified!</p>}

            {status === "error" && <p>Unable to verify your email. The link may be invalid or expired.</p>}
        </div>
    );
}