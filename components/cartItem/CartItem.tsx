import Image from "next/image";
import { IProduct, PopulatedCartItem } from "../../types/interfaces";
import styles from "./CartItem.module.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

function CartItem({ item }: { item: PopulatedCartItem }) {
  const { bagImage, name, price } = item.productId;
  const [quantity, setQuantity] = useState(item.quantity);
  return (
    <section className={styles.cartItemContainer}>
      <div>
        <Image src={bagImage} alt="" height={150} width={150} />
      </div>
      <div className={styles.itemName}>
        <h4>{name}</h4>
        <p>₱{Number(price) * quantity}</p>
        <h5>Qty.</h5>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
        />
      </div>

      <div className={styles.closeIcon}>
        <FaTimes />
      </div>
    </section>
  );
}

export default CartItem;
