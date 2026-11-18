import { useState } from "react";
import { useLocation } from "react-router";
import { resendVerificationEmail } from "../../services/authService";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Mail } from "lucide-react";

export default function CheckYourEmailPage() {
    const location = useLocation();
    const email = location.state?.email;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleResendEmail() {
        if (!email) {
            setMessage("Email address not found. Please register again.");
            return;
        } try {
        setLoading(true);
        setMessage("");

        await resendVerificationEmail(email);

        setMessage("A new verification email has been sent.");
        } catch {
        setMessage("Unable to resend the email. Please try again.");
        } finally {
        setLoading(false);
     }

}


return (
    <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-lg text-center" padding="lg">
            <Mail className="mx-auto mb-3 text-primary" size={64} strokeWidth={1.3} />
            <h1 className="mb-3 text-xl font-semibold text-text">Check your email</h1>
            <p className="text-sm text-text">We've sent a verification link to your email address.</p>
            <p className="text-sm text-text">Didn't receive the email? Check your spam folder</p>

            <Button className="mt-5" onClick={handleResendEmail} disabled={loading || !email}>
                {loading ? "Sending..." : "Resend email"}
            </Button>
             {message && (<p className="mt-3 text-sm text-text">{message}</p>)}
        </Card>
    </div>
);
}