import { FaShoppingBag } from "react-icons/fa";
import styles from "./CartBadge.module.css";

function CartBadge({ cartItemsQty }: { cartItemsQty: number }) {
  return (
    <div className={styles.cartBadgeContainer}>
      <FaShoppingBag className={styles.cartIcon} />

      {cartItemsQty > 0 && (
        <div className={styles.cartQuantity}>
          <h4>{cartItemsQty}</h4>
        </div>
      )}
    </div>
  );
}

export default CartBadge;
