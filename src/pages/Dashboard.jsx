// src/pages/Dashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts.js";
import useStorageUpload from "../hooks/useStorage.js";
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    orderBy,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import { firestore as db } from "../firebase/config"; // or: import { firestore as db } from "../firebase/config";

export default function Dashboard() {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const { products, loading: prodLoading } = useProducts();
    const [tab, setTab] = useState("profile"); // profile | address | cart

    // Profile state
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        photoURL: "",
    });
    const [savingProfile, setSavingProfile] = useState(false);

    // Address state (basic shipping info)
    const [address, setAddress] = useState({
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
    });
    const [savingAddress, setSavingAddress] = useState(false);

    // Cart & Favorites
    const [cart, setCart] = useState([]);
    const [favs, setFavs] = useState([]);
    const [addingDemo, setAddingDemo] = useState(false);

    // Upload avatar
    const { upload, progress, error: uploadErr } = useStorageUpload(`avatars/${user?.uid}`);

    useEffect(() => {
        if (!loading) {
            console.log("yes")
            if (!user) navigate("/auth", { replace: true });
        }
    }, [user, navigate, loading]);

    // Load profile + address once, and subscribe to cart/favorites
    useEffect(() => {
        if (!user) return;
        (async () => {
            const uref = doc(db, "users", user.uid);
            const snap = await getDoc(uref);
            if (snap.exists()) {
                const u = snap.data();
                setProfile((p) => ({
                    ...p,
                    name: u.name || user.displayName || "",
                    email: u.email || user.email || "",
                    phone: u.phone || "",
                    photoURL: u.photoURL || user.photoURL || "",
                }));
                setAddress((a) => ({
                    ...a,
                    ...(u.address || {}),
                }));
            } else {
                // Ensure a minimal doc exists so rules with == uid work seamlessly
                await setDoc(uref, {
                    email: user.email,
                    name: user.displayName || "",
                    createdAt: serverTimestamp(),
                }, { merge: true });
            }
        })();

        const cartQ = query(collection(db, "users", user.uid, "cart"), orderBy("createdAt", "desc"));
        const unsubCart = onSnapshot(cartQ, (snap) => setCart(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));

        const favQ = query(collection(db, "users", user.uid, "favorites"), orderBy("createdAt", "desc"));
        const unsubFav = onSnapshot(favQ, (snap) => setFavs(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));

        return () => { unsubCart(); unsubFav(); };
    }, [user]);

    // Save profile
    const saveProfile = async () => {
        if (!user) return;
        setSavingProfile(true);
        const uref = doc(db, "users", user.uid);
        await setDoc(uref, {
            name: profile.name.trim(),
            email: profile.email.trim(),
            phone: profile.phone.trim(),
            photoURL: profile.photoURL || "",
            updatedAt: serverTimestamp(),
        }, { merge: true });
        setSavingProfile(false);
    };

    // Save address
    const saveAddress = async () => {
        if (!user) return;
        setSavingAddress(true);
        const uref = doc(db, "users", user.uid);
        await setDoc(uref, { address: { ...address }, updatedAt: serverTimestamp() }, { merge: true });
        setSavingAddress(false);
    };

    // Avatar upload handler
    const onAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const { downloadURL } = await upload(file);
        setProfile((p) => ({ ...p, photoURL: downloadURL }));
    };

    // Cart ops
    const addDemoItem = async () => {
        if (!user) return;
        setAddingDemo(true);
        const items = [
            { productId: "demo-1", title: "Demo Product A", price: 499, qty: 1 },
            { productId: "demo-2", title: "Demo Product B", price: 799, qty: 2 },
        ];
        for (const it of items) {
            await addDoc(collection(db, "users", user.uid, "cart"), { ...it, createdAt: serverTimestamp() });
        }
        setAddingDemo(false);
    };

    const updateQty = async (id, qty) => {
        if (!user) return;
        const ref = doc(db, "users", user.uid, "cart", id);
        await updateDoc(ref, { qty });
    };

    const removeCartItem = async (id) => {
        if (!user) return;
        const ref = doc(db, "users", user.uid, "cart", id);
        await deleteDoc(ref);
    };

    // Favorites ops
    const toggleFav = async (product) => {
        if (!user) return;
        const existing = favs.find((f) => f.productId === product.productId);
        if (existing) {
            await deleteDoc(doc(db, "users", user.uid, "favorites", existing.id));
        } else {
            await addDoc(collection(db, "users", user.uid, "favorites"), { ...product, createdAt: serverTimestamp() });
        }
    };

    const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0), [cart]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-5xl mx-auto">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-slate-400">{user.email}</div>
                        <button onClick={logout} className="rounded-lg bg-slate-800 px-3 py-1.5 hover:bg-slate-700">Logout</button>
                    </div>
                </header>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900 p-1 rounded-xl">
                    {[
                        { id: "profile", label: "Profile" },
                        { id: "address", label: "Address" },
                        { id: "cart", label: "Cart & Favorites" },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`py-2 rounded-lg text-sm font-medium ${tab === t.id ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`}
                        >{t.label}</button>
                    ))}
                </div>

                {tab === "profile" && (
                    <section className="mt-6 grid gap-6 md:grid-cols-[280px_1fr]">
                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-24 w-24 rounded-full bg-slate-800 overflow-hidden grid place-items-center">
                                    {profile.photoURL ? (
                                        <img src={profile.photoURL} alt="avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-3xl">👤</span>
                                    )}
                                </div>
                                <label className="text-sm">
                                    <input type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
                                    <span className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 hover:bg-slate-700">Upload avatar</span>
                                </label>
                                {progress > 0 && progress < 100 && (
                                    <div className="w-full h-2 bg-slate-800 rounded">
                                        <div className="h-full bg-emerald-500 rounded" style={{ width: `${progress}%` }} />
                                    </div>
                                )}
                                {uploadErr && <p className="text-xs text-rose-300">{String(uploadErr)}</p>}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 grid gap-3">
                            <div>
                                <label className="text-sm text-slate-300">Name</label>
                                <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-300">Email</label>
                                <input value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500" type="email" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-300">Phone</label>
                                <input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={saveProfile} disabled={savingProfile} className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500 disabled:opacity-60">{savingProfile ? "Saving…" : "Save profile"}</button>
                            </div>
                        </div>
                    </section>
                )}

                {tab === "address" && (
                    <section className="mt-6 bg-slate-900 rounded-xl p-4 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { key: "line1", label: "Address Line 1", auto: "address-line1" },
                            { key: "line2", label: "Address Line 2", auto: "address-line2" },
                            { key: "city", label: "City", auto: "address-level2" },
                            { key: "state", label: "State", auto: "address-level1" },
                            { key: "pincode", label: "PIN Code", auto: "postal-code" },
                            { key: "country", label: "Country", auto: "country-name" },
                        ].map((f) => (
                            <div key={f.key}>
                                <label className="text-sm text-slate-300">{f.label}</label>
                                <input
                                    value={address[f.key]}
                                    onChange={(e) => setAddress((a) => ({ ...a, [f.key]: e.target.value }))}
                                    autoComplete={f.auto}
                                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                        ))}
                        <div className="md:col-span-2 flex gap-3">
                            <button onClick={saveAddress} disabled={savingAddress} className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500 disabled:opacity-60">{savingAddress ? "Saving…" : "Save address"}</button>
                        </div>
                    </section>
                )}

                {tab === "cart" && (
                    <section className="mt-6 grid gap-6 md:grid-cols-[1fr_340px]">
                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-medium">Cart Items</h3>
                                <button onClick={addDemoItem} disabled={addingDemo} className="rounded-lg bg-slate-800 px-3 py-1.5 hover:bg-slate-700">{addingDemo ? "Adding…" : "Add demo items"}</button>
                            </div>
                            <ul className="divide-y divide-slate-800">
                                {cart.length === 0 && <li className="py-6 text-slate-400">Your cart is empty.</li>}
                                {cart.map((item) => (
                                    <li key={item.id} className="py-4 flex items-center justify-between gap-3">
                                        <div>
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-sm text-slate-400">₹{item.price} · ID: {item.productId}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQty(item.id, Math.max(1, (item.qty || 1) - 1))} className="h-8 w-8 grid place-items-center rounded bg-slate-800">-</button>
                                            <input value={item.qty || 1} onChange={(e) => updateQty(item.id, Math.max(1, Number(e.target.value) || 1))} className="w-12 text-center rounded bg-slate-900 border border-slate-800 py-1" />
                                            <button onClick={() => updateQty(item.id, (item.qty || 1) + 1)} className="h-8 w-8 grid place-items-center rounded bg-slate-800">+</button>
                                            <button onClick={() => removeCartItem(item.id)} className="ml-2 rounded bg-rose-700 px-3 py-1.5">Remove</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <aside className="bg-slate-900 rounded-xl p-4 border border-slate-800 grid gap-3 h-max">
                            <h3 className="text-lg font-medium">Summary</h3>
                            <div className="flex items-center justify-between text-slate-300">
                                <span>Items</span>
                                <span>{cart.length}</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-300">
                                <span>Total</span>
                                <span className="text-xl font-semibold">₹{cartTotal}</span>
                            </div>

                            <div className="mt-2">
                                <h4 className="font-medium mb-2">Favorites</h4>
                                <ul className="grid gap-2">
                                    {favs.length === 0 && <li className="text-slate-400">No favorites yet.</li>}
                                    {favs.map((f) => (
                                        <li key={f.id} className="flex items-center justify-between gap-2">
                                            <span className="truncate">{f.title}</span>
                                            <button onClick={() => toggleFav(f)} className="text-amber-400 hover:text-amber-300">★</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </section>
                )}

                <section className="mt-6 bg-slate-800 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold mb-3">Products</h3>
                    {prodLoading && <div className="text-slate-400">Loading products…</div>}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {products.map((p) => {
                            const isFav = (profile.favorites || []).includes(p.id);
                            return (
                                <div key={p.id} className="rounded-xl border border-slate-700 p-3 flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{p.title}</div>
                                        <div className="text-sm text-slate-400">₹{p.price}</div>
                                    </div>
                                    <button
                                        className={isFav ? "text-amber-400" : "text-slate-400 hover:text-amber-300"}
                                        onClick={async () => {
                                            const ref = doc(db, "users", user.uid);
                                            await updateDoc(ref, {
                                                favorites: isFav ? arrayRemove(p.id) : arrayUnion(p.id),
                                            });
                                            // local echo:
                                            setProfile((s) => ({
                                                ...s,
                                                favorites: isFav ? (s.favorites || []).filter((id) => id !== p.id) : [...(s.favorites || []), p.id],
                                            }));
                                        }}
                                    >{isFav ? "★" : "☆"}</button>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

// --- Suggested Firestore schema (for reference) ---
// users/{uid} {
//   name: string,
//   email: string,
//   phone: string,
//   photoURL: string,
//   address: {
//     line1, line2, city, state, pincode, country
//   },
//   createdAt, updatedAt
// }
// users/{uid}/cart/{autoId} {
//   productId, title, price, qty, createdAt
// }
// users/{uid}/favorites/{autoId} {
//   productId, title, price?, createdAt
// }
