import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../services/orderService";
import { auth } from "../firebaseConfig";

function Orders() {
  const userId = auth.currentUser.uid;

  const { data: orders, isLoading } = useQuery(["orders", userId], () =>
    getUserOrders(userId)
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="card">
          <p>Order ID: {order.id}</p>
          <p>Date: {order.createdAt.toDate().toLocaleString()}</p>
          <p>Total: ${order.total}</p>
          <a href={`/orders/${order.id}`}>View Details</a>
        </div>
      ))}
    </div>
  );
}

export default Orders;
