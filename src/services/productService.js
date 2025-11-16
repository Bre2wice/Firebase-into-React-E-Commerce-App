// src/services/productService.js
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Fetch all products
export const getAllProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch a single product by ID
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Product not found");
  }
};

// Create a product
export const createProduct = async (product) =>
  await addDoc(collection(db, "products"), product);

// Update a product
export const updateProduct = async (id, updatedFields) =>
  await updateDoc(doc(db, "products", id), updatedFields);

// Delete a product
export const deleteProduct = async (id) =>
  await deleteDoc(doc(db, "products", id));

// Fetch unique product categories
export const getCategories = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  const allProducts = snapshot.docs.map((doc) => doc.data());
  const categories = [...new Set(allProducts.map((p) => p.category))];
  return categories;
};
