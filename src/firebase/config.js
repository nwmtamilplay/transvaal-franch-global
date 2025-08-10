// src/firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsSupported } from "firebase/analytics";
import {
    getDatabase,
    ref as rtdbRef,
    set as rtdbSet,
    update as rtdbUpdate,
    push as rtdbPush
} from "firebase/database";
import {
    getFirestore,
    doc as fsDoc,
    setDoc as fsSetDoc,
    updateDoc as fsUpdateDoc,
    addDoc as fsAddDoc,
    collection as fsCollection
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
    getStorage,
    ref as storageRef,
    uploadBytes as storageUploadBytes,
    uploadBytesResumable as storageUploadBytesResumable,
    getDownloadURL as storageGetDownloadURL
} from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize once (avoid re-init in dev/hot reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Optional analytics — only if supported
let analytics = null;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    analyticsSupported().then((ok) => {
        if (ok) analytics = getAnalytics(app);
    });
}

// Service instances
const rtdb = getDatabase(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// RTDB helpers
const dbRef = (path) => rtdbRef(rtdb, path);
const dbSet = (path, val) => rtdbSet(rtdbRef(rtdb, path), val);
const dbUpdate = (path, val) => rtdbUpdate(rtdbRef(rtdb, path), val);
const dbPush = (path, val) => rtdbPush(rtdbRef(rtdb, path), val);

// Firestore helpers
const fsRef = (path) => fsDoc(firestore, path);
const fsCol = (path) => fsCollection(firestore, path);
const fsSet = (path, data, opts) => fsSetDoc(fsDoc(firestore, path), data, opts);
const fsUpdate = (path, data) => fsUpdateDoc(fsDoc(firestore, path), data);
const fsAdd = (colPath, data) => fsAddDoc(fsCollection(firestore, colPath), data);

// Storage helpers
const stRef = (path) => storageRef(storage, path);
const stUpload = (path, file) => storageUploadBytes(storageRef(storage, path), file);
const stUploadResumable = (path, file) =>
    storageUploadBytesResumable(storageRef(storage, path), file);
const stGetURL = (path) => storageGetDownloadURL(storageRef(storage, path));

export {
    app,
    analytics,
    rtdb,
    firestore,
    auth,
    storage,
    functions,
    // RTDB
    dbRef,
    dbSet,
    dbUpdate,
    dbPush,
    // Firestore
    fsRef,
    fsCol,
    fsSet,
    fsUpdate,
    fsAdd,
    // Storage
    stRef,
    stUpload,
    stUploadResumable,
    stGetURL
};
