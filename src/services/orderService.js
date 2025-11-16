import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// Create a new order
export const createOrder = async (userId, products, totalPrice) => {
  await addDoc(collection(db, "orders"), {
    userId,
    products,
    totalPrice,
    createdAt: new Date(),
  });
};

// Fetch orders for a specific user
export const getUserOrders = async (userId) => {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch single order by ID
export const getOrderById = async (orderId) => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Order not found");
  }
};
