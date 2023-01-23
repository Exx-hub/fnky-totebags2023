import Image from "next/image";
import { PopulatedItem } from "../../types/interfaces";
import styles from "./WishlistItem.module.css";
import { FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

function WishlistItem({ item }: { item: PopulatedItem }) {
  const { data, status } = useSession();
  console.log(item);
  const { bagImage, description, price, name, _id } = item.productId;

  const removeWishlistItem = async () => {
    const result = await fetch(`/api/wishlist`, {
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
  };
  return (
    <section className={styles.wishlistItemContainer}>
      <Image src={bagImage} alt={description} height={250} width={250} />
      <h3>{name}</h3>
      <p>₱{price}</p>
      <button>Add to Bag</button>

      <div className={styles.closeIcon} onClick={removeWishlistItem}>
        <FaTimes />
      </div>
    </section>
  );
}

export default WishlistItem;
