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
} from "firebase/firestore";
import { firestore as db } from "../firebase/config";
import MaskImage from "../tools/MaskImage.jsx";

export default function Dashboard() {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const [tab, setTab] = useState("profile"); // profile | address | cart
    const [search, setSearch] = useState("");

    // Products from Firestore (active only; change onlyActive if you want)
    const { products, loading: prodLoading } = useProducts({
        onlyActive: false,
        search,
        pageSize: 200,
    });

    useEffect(() => {
        console.log(products, prodLoading)
    }, [products, prodLoading])

    const productMap = useMemo(() => {
        const m = new Map();
        for (const p of products) m.set(p.id, p);
        return m;
    }, [products]);
    // Fast join map productId -> product

    // Profile
    const [profile, setProfile] = useState({ name: "", email: "", phone: "", photoURL: "" });
    const [savingProfile, setSavingProfile] = useState(false);

    // Address
    const [address, setAddress] = useState({
        line1: "", line2: "", city: "", state: "", pincode: "", country: "India",
    });
    const [savingAddress, setSavingAddress] = useState(false);

    // Cart & Favorites (subcollections)
    const [cart, setCart] = useState([]); // [{id, productId, qty, title?, price?, imageURL?, createdAt}]
    const [favs, setFavs] = useState([]); // [{id, productId, title?, imageURL?, createdAt}]

    // Avatar upload
    const { upload, progress, error: uploadErr } = useStorageUpload(`avatars/${user?.uid}`);

    // auth guard
    useEffect(() => {
        if (!loading && !user) navigate("/auth", { replace: true });
    }, [user, loading, navigate]);

    // load user doc once + subscribe to cart and favorites
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
                setAddress((a) => ({ ...a, ...(u.address || {}) }));
            } else {
                await setDoc(
                    uref,
                    { email: user.email, name: user.displayName || "", createdAt: serverTimestamp() },
                    { merge: true }
                );
            }
        })();

        const cartQ = query(collection(db, "users", user.uid, "cart"), orderBy("createdAt", "desc"));
        const unsubCart = onSnapshot(cartQ, (snap) =>
            setCart(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        );

        const favQ = query(collection(db, "users", user.uid, "favorites"), orderBy("createdAt", "desc"));
        const unsubFav = onSnapshot(favQ, (snap) =>
            setFavs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        );

        return () => { unsubCart(); unsubFav(); };
    }, [user]);

    // save profile
    const saveProfile = async () => {
        if (!user) return;
        setSavingProfile(true);
        await setDoc(
            doc(db, "users", user.uid),
            {
                name: profile.name.trim(),
                email: profile.email.trim(),
                phone: profile.phone.trim(),
                photoURL: profile.photoURL || "",
                updatedAt: serverTimestamp(),
            },
            { merge: true }
        );
        setSavingProfile(false);
    };

    // save address
    const saveAddress = async () => {
        if (!user) return;
        setSavingAddress(true);
        await setDoc(
            doc(db, "users", user.uid),
            { address: { ...address }, updatedAt: serverTimestamp() },
            { merge: true }
        );
        setSavingAddress(false);
    };

    // avatar upload
    const onAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const { downloadURL } = await upload(file);
        setProfile((p) => ({ ...p, photoURL: downloadURL }));
    };

    // ===== CART & FAVORITES (using productId + join to productMap) =====
    const addToCart = async (product) => {
        if (!user) return;
        const existing = cart.find((c) => c.productId === product.id);
        if (existing) {
            await updateDoc(doc(db, "users", user.uid, "cart", existing.id), { qty: (existing.qty || 1) + 1 });
        } else {
            await addDoc(collection(db, "users", user.uid, "cart"), {
                productId: product.id,
                // cached fields (fallback if product not loaded)
                title: product.title,
                price: Number(product.price) || 0,
                imageURL: product.imageURL || "",
                qty: 1,
                createdAt: serverTimestamp(),
            });
        }
    };

    const updateQty = async (id, qty) => {
        if (!user) return;
        await updateDoc(doc(db, "users", user.uid, "cart", id), { qty: Math.max(1, qty) });
    };

    const removeCartItem = async (id) => {
        if (!user) return;
        await deleteDoc(doc(db, "users", user.uid, "cart", id));
    };

    const toggleFav = async (product) => {
        if (!user) return;
        const existing = favs.find((f) => f.productId === product.id);
        if (existing) {
            await deleteDoc(doc(db, "users", user.uid, "favorites", existing.id));
        } else {
            await addDoc(collection(db, "users", user.uid, "favorites"), {
                productId: product.id,
                title: product.title,
                price: Number(product.price) || 0,
                imageURL: product.imageURL || "",
                createdAt: serverTimestamp(),
            });
        }
    };

    // const cartTotal = useMemo(
    //     () =>
    //         cart.reduce((sum, i) => {
    //             const prod = productMap.get(i.productId);
    //             const price = prod?.price ?? i.price ?? 0;
    //             return sum + price * (i.qty || 1);
    //         }, 0),
    //     [cart, productMap]
    // );

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Profile Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-slate-400">{user.email}</div>
                        <button onClick={logout} className="rounded-lg bg-slate-800 px-3 py-1.5 hover:bg-slate-700">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-900 p-1 rounded-xl">
                    {[
                        { id: "profile", label: "Profile" },
                        { id: "address", label: "Address" },
                        { id: "cart", label: "Cart & Favorites" },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`py-2 rounded-lg text-sm font-medium ${tab === t.id ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Profile */}
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
                                    <span className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 hover:bg-slate-700">
                                        Upload avatar
                                    </span>
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
                                <input
                                    value={profile.name}
                                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-300">Email</label>
                                <input
                                    value={profile.email}
                                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                                    type="email"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-300">Phone</label>
                                <input
                                    value={profile.phone}
                                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={saveProfile}
                                    disabled={savingProfile}
                                    className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500 disabled:opacity-60"
                                >
                                    {savingProfile ? "Saving…" : "Save profile"}
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Address */}
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
                            <button
                                onClick={saveAddress}
                                disabled={savingAddress}
                                className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500 disabled:opacity-60"
                            >
                                {savingAddress ? "Saving…" : "Save address"}
                            </button>
                        </div>
                    </section>
                )}

                {/* Cart & Favorites */}
                {tab === "cart" && (
                    <section className="mt-6 grid gap-6 md:grid-cols-[1fr_360px]">
                        {/* Cart */}
                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-medium">Cart Items</h3>
                                {/* Link to products section instead of demo items */}
                                <a
                                    href="#products"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }}
                                    className="rounded-lg bg-slate-800 px-3 py-1.5 hover:bg-slate-700"
                                >
                                    Add products
                                </a>
                            </div>
                            <ul className="divide-y divide-slate-800">
                                {cart.length === 0 && <li className="py-6 text-slate-400">Your cart is empty.</li>}
                                {cart.map((item) => {
                                    const prod = productMap.get(item.productId);
                                    const title = prod?.title || item.title || item.productId;
                                    const img = prod?.imageURL || item.imageURL || "";
                                    const price = prod?.price ?? item.price ?? 0;
                                    return (
                                        <li key={item.id} className="py-4 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                {img ? (
                                                    <img src={img} alt="" className="h-12 w-12 rounded object-cover" />
                                                ) : (
                                                    <div className="h-12 w-12 rounded bg-slate-800 grid place-items-center">🛍️</div>
                                                )}
                                                <div>
                                                    <div className="font-medium">{title}</div>
                                                    <div className="text-sm text-slate-400">₹{price} · ID: {item.productId}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQty(item.id, Math.max(1, (item.qty || 1) - 1))}
                                                    className="h-8 w-8 grid place-items-center rounded bg-slate-800"
                                                >-</button>
                                                <input
                                                    value={item.qty || 1}
                                                    onChange={(e) => updateQty(item.id, Math.max(1, Number(e.target.value) || 1))}
                                                    className="w-12 text-center rounded bg-slate-900 border border-slate-800 py-1"
                                                />
                                                <button
                                                    onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                                                    className="h-8 w-8 grid place-items-center rounded bg-slate-800"
                                                >+</button>
                                                <button
                                                    onClick={() => removeCartItem(item.id)}
                                                    className="ml-2 rounded bg-rose-700 px-3 py-1.5"
                                                >Remove</button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Favorites */}
                        <aside className="bg-slate-900 rounded-xl p-4 border border-slate-800 grid gap-3 h-max">
                            <h3 className="text-lg font-medium">Favorites</h3>
                            <ul className="grid gap-5 w-full">
                                {favs.length === 0 && <li className="text-slate-400">No favorites yet.</li>}
                                {favs.map((f) => {
                                    const prod = productMap.get(f.productId);
                                    const title = prod?.title || f.title || f.productId;
                                    const img = prod?.imageURL || f.imageURL || "";
                                    return (
                                        <li key={f.id} className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-5 min-w-0 flex-1 ">
                                                {img ? (
                                                    <img src={img} alt="" className="h-8 w-8 rounded object-cover aspect-square flex-1" />
                                                ) : (
                                                    <div className="h-8 w-8 rounded bg-slate-800 grid place-items-center aspect-square flex-1">★</div>
                                                )}
                                                <span className="font-medium" title={title}>{title}</span>
                                            </div>
                                            <button
                                                onClick={() => toggleFav(prod || { id: f.productId, title, imageURL: img })}
                                                className="text-amber-400 hover:text-amber-300 ms-5"
                                            >
                                                <MaskImage hBg="red" url="https://api.iconify.design/ic:round-close.svg" />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>
                    </section>
                )}

                {/* PRODUCTS (with Add to cart + Favorite) */}
                <section id="products" className="mt-6 bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between mb-3 gap-3">
                        <h3 className="text-lg font-medium">All Products</h3>
                        <input
                            placeholder="Search title / sku / description"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="min-w-[220px] flex-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    {/* {prodError && <div className="text-rose-300 mb-2">{String(prodError)}</div>} */}
                    {prodLoading && <div className="text-slate-400">Loading products…</div>}
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-3">
                        {products.map((p) => {
                            const isFav = favs.some((f) => f.productId === p.id);
                            return (
                                <div key={p.id} className="rounded-xl border border-slate-800 p-3 flex items-center gap-3">
                                    {p.imageURL ? (
                                        <img src={p.imageURL} alt="" className="h-16 w-16 rounded object-cover" />
                                    ) : (
                                        <div className="h-16 w-16 rounded bg-slate-800 grid place-items-center">🛍️</div>
                                    )}
                                    <div className="flex-1 min-w-0 me-4">
                                        <div className="font-medium truncate" title={p.title}>{p.title}</div>
                                        <div className="text-sm text-slate-400">₹{p.price}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleFav(p)}>
                                            <MaskImage bg={isFav ? "yellow" : "white"} hBg="yellow" url={isFav ? "https://api.iconify.design/material-symbols:star-rounded.svg" : "https://api.iconify.design/material-symbols:star-outline-rounded.svg"} />
                                        </button>
                                        <button onClick={() => addToCart(p)} className="rounded-lg px-3 py-1.5">
                                            <MaskImage hBg="lightgreen" url="https://api.iconify.design/material-symbols:add-shopping-cart-outline-rounded.svg" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {!prodLoading && products.length === 0 && (
                            <div className="text-slate-400">No products available.</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
