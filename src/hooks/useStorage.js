// src/hooks/useStore.js
import { useCallback, useState } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function useStorageUpload(pathPrefix = "uploads") {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const upload = useCallback((file) => {
    setProgress(0); setUrl(null); setError(null);
    const filename = `${Date.now()}-${file.name}`;
    const fileRef = ref(storage, `${pathPrefix}/${filename}`);

    return new Promise((resolve, reject) => {
      const task = uploadBytesResumable(fileRef, file);
      task.on(
        "state_changed",
        (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        (e) => { setError(e); reject(e); },
        async () => {
          const downloadURL = await getDownloadURL(fileRef);
          setUrl(downloadURL);
          resolve({ downloadURL, path: fileRef.fullPath });
        }
      );
    });
  }, [pathPrefix]);

  const reset = () => { setProgress(0); setUrl(null); setError(null); };

  return { upload, progress, url, error, reset };
}