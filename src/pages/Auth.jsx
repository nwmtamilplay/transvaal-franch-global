// src/pages/Auth.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { firestore as db } from "../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Auth() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user, signIn, register, resetPassword, signInGoogle } = useAuth();

    const [mode, setMode] = useState(state?.mode || "login"); // 'login' | 'signup' | 'reset'
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [showPass, setShowPass] = useState(false);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

    useEffect(() => {
        if (user) navigate("/dashboard", { replace: true });
    }, [user, navigate]);

    const isSignup = mode === "signup";
    const isLogin = mode === "login";
    const isReset = mode === "reset";

    // --- helper: ensure Firestore user doc exists/updated
    const ensureUserDoc = async (u, extra = {}) => {
        if (!u) return;
        const ref = doc(db, "users", u.uid);
        await setDoc(
            ref,
            {
                uid: u.uid,
                email: u.email || form.email,
                name: (u.displayName || form.name || "").trim(),
                photoURL: u.photoURL || "",
                // You can keep default editable profile fields here:
                phone: "",
                address: {
                    line1: "",
                    line2: "",
                    city: "",
                    state: "",
                    pincode: "",
                    country: "India",
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                ...extra, // e.g., { lastLoginAt: serverTimestamp() }
            },
            { merge: true }
        );
    };

    const passwordScore = useMemo(() => {
        const p = form.password || "";
        let score = 0;
        if (p.length >= 6) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[a-z]/.test(p)) score++;
        if (/[0-9]/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;
        return Math.min(score, 4);
    }, [form.password]);

    const validate = () => {
        const errors = [];
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push("Enter a valid email.");
        if (isSignup) {
            if (!form.name.trim()) errors.push("Name is required.");
            if ((form.password || "").length < 6) errors.push("Password must be at least 6 characters.");
            if (form.password !== form.confirm) errors.push("Passwords do not match.");
        }
        if (isLogin && !(form.password || "").length) errors.push("Password is required.");
        if (isReset) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push("Enter a valid email to reset.");
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setErr("");
        setMsg("");
        const errors = validate();
        if (errors.length) { setErr(errors.join(" ")); return; }
        try {
            setBusy(true);
            if (isSignup) {
                const newUser = await register(form.email, form.password, form.name.trim());
                await ensureUserDoc(newUser); // create the doc on first sign up
                setMsg("Account created. Redirecting…");
            } else if (isLogin) {
                const cred = await signIn(form.email, form.password);
                await ensureUserDoc(cred.user, { lastLoginAt: serverTimestamp() });
                setMsg("Welcome back! Redirecting…");
            } else if (isReset) {
                await resetPassword(form.email);
                setMsg("Password reset email sent. Check your inbox.");
            }
        } catch (e) {
            setErr(e?.message || "Something went wrong.");
        } finally {
            setBusy(false);
        }
    };

    const handleGoogle = async () => {
        setErr(""); setMsg("");
        try {
            setBusy(true);
            const cred = await signInGoogle(); // returns userCredential
            await ensureUserDoc(cred.user, { lastLoginAt: serverTimestamp() });
            setMsg("Signed in with Google. Redirecting…");
        } catch (e) {
            setErr(e?.message || "Google sign-in failed.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-6 shadow-xl text-slate-200">
                <h2 className="text-2xl font-bold text-center">Welcome</h2>
                <p className="text-center text-slate-400 mt-1">
                    {isLogin && "Sign in to continue"}
                    {isSignup && "Create your account"}
                    {isReset && "Reset your password"}
                </p>

                <div className="grid grid-cols-3 gap-2 bg-slate-900 rounded-xl mt-4 p-1">
                    <button onClick={() => setMode("login")} className={`py-2 rounded-lg ${isLogin ? "bg-slate-700 text-white" : "text-slate-400"}`}>Login</button>
                    <button onClick={() => setMode("signup")} className={`py-2 rounded-lg ${isSignup ? "bg-slate-700 text-white" : "text-slate-400"}`}>Sign Up</button>
                    <button onClick={() => setMode("reset")} className={`py-2 rounded-lg ${isReset ? "bg-slate-700 text-white" : "text-slate-400"}`}>Forgot?</button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-3 mt-4">
                    {isSignup && (
                        <input
                            type="text"
                            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        />
                    )}

                    <input
                        type="email"
                        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        required
                    />

                    {(isLogin || isSignup) && (
                        <div>
                            <div className="flex items-center gap-2">
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none"
                                    placeholder={isSignup ? "Create password" : "Password"}
                                    value={form.password}
                                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                    required
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="px-3 py-2 bg-slate-700 rounded-lg">
                                    {showPass ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {isSignup && (
                                <div className="h-1 w-full bg-slate-900 rounded mt-1 overflow-hidden">
                                    <div className="h-full bg-green-500 transition-all" style={{ width: `${(passwordScore + 1) * 20}%` }} />
                                </div>
                            )}
                        </div>
                    )}

                    {isSignup && (
                        <input
                            type={showPass ? "text" : "password"}
                            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none"
                            placeholder="Confirm password"
                            value={form.confirm}
                            onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                            required
                        />
                    )}

                    {err && <div className="bg-red-900 text-red-200 px-3 py-2 rounded-lg text-sm">{err}</div>}
                    {msg && <div className="bg-green-900 text-green-200 px-3 py-2 rounded-lg text-sm">{msg}</div>}

                    <button
                        type="submit"
                        disabled={busy}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg py-2 mt-2"
                    >
                        {busy ? "Please wait…" : isSignup ? "Create Account" : isReset ? "Send Reset Link" : "Login"}
                    </button>
                </form>

                {!isReset && (
                    <>
                        <div className="flex items-center gap-2 text-slate-400 my-4">
                            <span className="flex-1 h-px bg-slate-700"></span> OR <span className="flex-1 h-px bg-slate-700"></span>
                        </div>
                        <button onClick={handleGoogle} disabled={busy} className="bg-white text-slate-800 w-full rounded-lg py-2">
                            Continue with Google
                        </button>
                    </>
                )}

                {isLogin && (
                    <button className="text-blue-400 mt-2 text-sm" onClick={() => { setMode("reset"); setErr(""); setMsg(""); }}>
                        Forgot password?
                    </button>
                )}
                {isReset && (
                    <button className="text-blue-400 mt-2 text-sm" onClick={() => { setMode("login"); setErr(""); setMsg(""); }}>
                        Back to login
                    </button>
                )}

                <p className="text-center text-slate-400 mt-4 text-sm">
                    {isLogin ? (
                        <>New here? <button className="text-blue-400" onClick={() => setMode("signup")}>Create an account</button></>
                    ) : isSignup ? (
                        <>Already have an account? <button className="text-blue-400" onClick={() => setMode("login")}>Login</button></>
                    ) : null}
                </p>
            </div>
        </div>
    );
}
