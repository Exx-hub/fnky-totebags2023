import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ContextProvider";
import { PopulatedItem } from "../../types/interfaces";
import CartItem from "../cartItem/CartItem";
import styles from "./CartItemList.module.css";

interface CartItemListProps {
  cartItems: PopulatedItem[];
}

function CartItemList({ cartItems }: CartItemListProps) {
  const [shippingAddress, setShippingAddress] = useState("");
  const { data, status } = useSession();

  const { fetchCartItems } = useContext(ShoppingCartContext);
  const router = useRouter();

  const total = cartItems.reduce((acc: number, item: PopulatedItem) => {
    return acc + Number(item.productId.price) * Number(item.quantity);
  }, 0);

  const confirmCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data?.user?.email,
      }),
    });

    const apiData = await result.json();

    console.log(apiData);

    fetchCartItems();
    router.push("/orders");
  };

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
          <div>
            <h4>Payment</h4>
            <h4>Cash on Delivery</h4>
          </div>
          <hr />
          <div>
            <h3>Total</h3>
            <h3>₱{total.toFixed(2)}</h3>
          </div>
          <form onSubmit={confirmCheckout}>
            <label htmlFor="address">Shipping Address</label>
            <textarea
              name="address"
              rows={2}
              maxLength={200}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            ></textarea>
            <button type="submit">Confirm Checkout</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CartItemList;
