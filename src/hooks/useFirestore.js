// src/hooks/useFirestore.js
import { useEffect, useState } from "react";
import { firestore as db } from "../firebase/config";
import {
  onSnapshot, doc, collection, query as fsQuery,
} from "firebase/firestore";

export function useDoc(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(path));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;
    const ref = doc(db, path);
    const unsub = onSnapshot(
      ref,
      (snap) => { setData(snap.exists() ? { id: snap.id, ...snap.data() } : null); setLoading(false); },
      (e) => { setError(e); setLoading(false); }
    );
    return unsub;
  }, [path]);

  return { data, loading, error };
}

export function useCollection(queryObj) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(queryObj));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!queryObj) return;
    const unsub = onSnapshot(
      queryObj,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (e) => { setError(e); setLoading(false); }
    );
    return unsub;
  }, [queryObj]);

  return { data, loading, error };
}

export { collection, fsQuery as query };