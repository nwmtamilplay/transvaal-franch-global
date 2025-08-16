import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const { signIn, signInGoogle, resetPassword, error, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            alert("Login successful!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = async () => {
        if (!email) return alert("Enter your email first.");
        try {
            await resetPassword(email);
            alert("Password reset link sent to your email!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error.message}</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />

                <button type="submit" disabled={loading}>Login</button>
            </form>

            <br />
            <button onClick={signInGoogle} disabled={loading}>
                Sign in with Google
            </button>

            <br /><br />
            <button onClick={handleReset} disabled={loading}>
                Forgot Password?
            </button>
        </div>
    );
}
