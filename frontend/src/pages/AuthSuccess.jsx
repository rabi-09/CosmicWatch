import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const AuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { socialLoginSuccess } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            socialLoginSuccess(token);
            // Decode token or fetch user to set user state if needed
            // For now, redirect to dashboard
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [searchParams, navigate, socialLoginSuccess]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-cyan-500">
                <Loader2 className="w-10 h-10 animate-spin" />
                <p className="font-mono tracking-widest text-sm">AUTHENTICATING...</p>
            </div>
        </div>
    );
};

export default AuthSuccess;
