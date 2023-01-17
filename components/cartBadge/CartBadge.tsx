import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import styles from "./CartBadge.module.css";

function CartBadge() {
  let cartItems = ["1", 1];
  return (
    <div className={styles.cartBadgeContainer}>
      <FaShoppingBag className={styles.cartIcon} />

      {cartItems.length > 0 && (
        <div className={styles.cartQuantity}>
          <h4>{cartItems.length}</h4>
        </div>
      )}
    </div>
  );
}

export default CartBadge;
