// --- Firebase Configuration ---
// Configured by User
const firebaseConfig = {
    apiKey: "AIzaSyA7vIrojfHZhz52gplHCaKbE_xEQ5yGSk4",
    authDomain: "omniframes-d7612.firebaseapp.com",
    projectId: "omniframes-d7612",
    storageBucket: "omniframes-d7612.firebasestorage.app",
    messagingSenderId: "964170903282",
    appId: "1:964170903282:web:dec31a5d6681c62eb6ea6b",
    measurementId: "G-91R21WQY7V"
};

// Initialize Firebase (Compat version for HTML script tags)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const analytics = firebase.analytics();
