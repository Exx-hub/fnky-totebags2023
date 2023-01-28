import Image from "next/image";
import { IOrderItem } from "../../types/interfaces";
import styles from "./OrderItem.module.css";

function OrderItem({ item }: { item: IOrderItem }) {
  const getDeliveryDate = () => {
    const formattedDate = new Date(item.createdOn);
    formattedDate.setDate(formattedDate.getDate() + 7 * 1);

    return formattedDate.toLocaleDateString();
  };

  return (
    <section className={styles.orderItemContainer}>
      <div>
        <h3>ORDER#: {item._id}</h3>
        <h3>Email: {item.user.email}</h3>
        <h3>Status: In-transit</h3>
        <h3>ETD: {getDeliveryDate()}</h3>
        <h3>Shipped to: {item.shippingAddress}</h3>
      </div>
      <section className={styles.orderItemGrid}>
        {item.products.map((i) => (
          <div key={i._id} className={styles.gridItem}>
            <Image
              src={i.product.bagImage}
              alt={i.product.description}
              height={100}
              width={100}
            />
            <h4>{i.product.name}</h4>
            <p>Qty. {i.quantity}</p>
          </div>
        ))}
      </section>
    </section>
  );
}

export default OrderItem;
