import { useEffect, useState } from "react";
import { firestore as db } from "../firebase/config";
import {
    collection, onSnapshot, query, orderBy, limit,
    addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
    where
} from "firebase/firestore";

export function useProducts({ onlyActive = true, pageSize = 30, sort = "createdAt", dir = "desc", category, search } = {}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const parts = [collection(db, "products")];
        if (onlyActive) parts.push(where("active", "==", true));
        if (category) parts.push(where("category", "==", category));
        parts.push(orderBy(sort, dir));
        parts.push(limit(pageSize));

        const q = query(...parts);
        const unsub = onSnapshot(
            q,
            (snap) => {
                let rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                if (search) {
                    const s = search.toLowerCase();
                    rows = rows.filter((r) => `${r.title} ${r.description} ${r.sku || ""}`.toLowerCase().includes(s));
                }
                setProducts(rows);
                setLoading(false);
            },
            (e) => { setError(e); setLoading(false); }
        );
        return () => unsub();
    }, [onlyActive, pageSize, sort, dir, category, search]);

    return { products, loading, error };
}

export async function createProduct(data) {
    const ref = await addDoc(collection(db, "products"), {
        title: data.title || "",
        price: Number(data.price) || 0,
        sku: data.sku || "",
        stock: Number(data.stock) || 0,
        category: data.category || "",
        description: data.description || "",
        imageURL: data.imageURL || "",
        active: data.active ?? true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateProduct(id, data) {
    const ref = doc(db, "products", id);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProduct(id) {
    await deleteDoc(doc(db, "products", id));
}