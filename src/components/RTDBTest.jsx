import { useEffect } from "react";
import { useRTDB, rtdbSet } from "../hooks/useRealtimeDatabase";

export default function RTDBTest() {
  const { value, loading, error } = useRTDB("/public/popularProducts/0");

  useEffect(() => {
    if (!loading && value == null) rtdbSet("/public/popularProducts/0", 0);
  }, [loading, value]);

  const inc = async () => {
    // const next = (value ?? 0) + 1;
    await rtdbSet("/public/popularProducts/0", "hello");
  };

  return (
    <Card title="Realtime DB Test">
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
      {loading ? <p>Loading…</p> : (
        <>
          <p className="mb-2">Counter: <b>{value ?? 0}</b></p>
          <button className="btn" onClick={inc}>+1</button>
        </>
      )}
    </Card>
  );
}

function Card({ title, children }) {
  return <div className="rounded-2xl border p-4 shadow-sm bg-green-500">
    <h3 className="font-semibold mb-3">{title}</h3>{children}
  </div>;
}