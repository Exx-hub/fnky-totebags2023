import { PopulatedItem } from "../../types/interfaces";
import CartItem from "../cartItem/CartItem";
import styles from "./CartItemList.module.css";

function CartItemList({ cartItems }: { cartItems: PopulatedItem[] }) {
  const total = cartItems.reduce((acc: number, item: PopulatedItem) => {
    return acc + Number(item.productId.price) * Number(item.quantity);
  }, 0);

  return (
    <section className={styles.cartItemListContainer}>
      <div className={styles.cartItemListGrid}>
        <div className={styles.myCart}>
          <h2>My cart</h2>
          <hr />
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <hr />
          <div>
            <h4>Subtotal</h4>
            <h4>₱{total.toFixed(2)}</h4>
          </div>
          <div>
            <h4>Shipping</h4>
            <h4>Free</h4>
          </div>
          <hr />
          <div>
            <h3>Total</h3>
            <h3>₱{total.toFixed(2)}</h3>
          </div>
          <button>Checkout</button>
        </div>
      </div>
    </section>
  );
}

export default CartItemList;
