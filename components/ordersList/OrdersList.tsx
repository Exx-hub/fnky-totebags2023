import { IOrderItem } from "../../types/interfaces";
import OrderItem from "../orderItem";
import styles from "./OrdersList.module.css";

interface OrdersListProps {
  orders: IOrderItem[];
}

function OrdersList({ orders }: OrdersListProps) {
  //   console.log(orders);
  return (
    <section className={styles.ordersListContainer}>
      <h2>My Orders</h2>
      <p>View orders and track order status.</p>
      <hr />
      <section className={styles.ordersListGrid}>
        {orders.map((item: IOrderItem) => (
          <OrderItem key={item._id} item={item} />
        ))}
      </section>
    </section>
  );
}

export default OrdersList;
