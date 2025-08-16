import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Register() {
    const { register, error, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(email, password, name);
            alert("Registration successful!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error.message}</p>}

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />
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

                <button type="submit" disabled={loading}>Register</button>
            </form>
        </div>
    );
}
