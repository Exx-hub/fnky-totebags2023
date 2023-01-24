import Image from "next/image";
import { PopulatedItem } from "../../types/interfaces";
import styles from "./CartItem.module.css";
import { FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { ShoppingCartContext } from "../../context/ContextProvider";

interface CartItemProps {
  item: PopulatedItem;
  refreshData: () => void;
}

function CartItem({ item, refreshData }: CartItemProps) {
  const { data, status } = useSession();
  const { fetchCartItems } = useContext(ShoppingCartContext);

  const { bagImage, name, price, _id } = item.productId;
  const { quantity } = item;

  const removeFromCart = async () => {
    const result = await fetch(`/api/cartItems`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data?.user?.email,
        prodId: _id,
      }),
    });

    const apiData = await result.json();

    console.log(apiData);

    fetchCartItems();
    refreshData();
  };

  return (
    <section className={styles.cartItemContainer}>
      <div>
        <Image src={bagImage} alt="" height={150} width={150} />
      </div>
      <div className={styles.itemName}>
        <h4>{name}</h4>
        <p>₱{Number(price) * (quantity || 0)}</p>
        <h5>Qty. {quantity}</h5>
      </div>

      <div className={styles.closeIcon} onClick={removeFromCart}>
        <FaTimes />
      </div>
    </section>
  );
}

export default CartItem;
