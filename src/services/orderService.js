// src/services/orderService.js
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

// Create a new order in Firestore
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: Timestamp.fromDate(new Date(orderData.createdAt)),
    });
    return docRef.id;
  } catch (err) {
    console.error("Error creating order:", err);
    throw new Error("Failed to create order in Firestore");
  }
};

// Fetch orders for a specific user
export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching user orders:", err);
    throw new Error("Failed to fetch user orders");
  }
};

// Fetch single order by ID
export const getOrderById = async (orderId) => {
  try {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Order not found");
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (err) {
    console.error("Error fetching order by ID:", err);
    throw new Error("Failed to fetch order");
  }
};
