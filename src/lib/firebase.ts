import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure CORS for Firebase Storage
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Auth functions
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Article functions
interface ArticleData {
  title: string;
  content: string;
  status: "draft" | "published";
  authorId: string;
  authorName: string;
}

export const uploadImage = async (
  file: File
): Promise<{ url: string | null; error: string | null }> => {
  try {
    // Create a unique filename using timestamp
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `article-images/${filename}`);

    // Set metadata with CORS headers
    const metadata = {
      contentType: file.type,
      customMetadata: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    // Upload the file with metadata
    await uploadBytes(storageRef, file, metadata);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return { url: downloadURL, error: null };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { url: null, error: error.message };
  }
};

export const createArticle = async (
  articleData: ArticleData,
  imageFile: File | null
): Promise<{ id: string | null; error: string | null }> => {
  try {
    let imageUrl = null;

    // Upload image if provided
    if (imageFile) {
      const { url, error } = await uploadImage(imageFile);
      if (error) {
        return { id: null, error };
      }
      imageUrl = url;
    }

    // Create article document
    const docRef = await addDoc(collection(db, "articles"), {
      ...articleData,
      bannerImage: imageUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getPublishedArticles = async () => {
  try {
    const q = query(
      collection(db, "articles"),
      where("status", "==", "published")
    );
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { articles, error: null };
  } catch (error: any) {
    return { articles: [], error: error.message };
  }
};

export const getAllArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { articles, error: null };
  } catch (error: any) {
    return { articles: [], error: error.message };
  }
};
