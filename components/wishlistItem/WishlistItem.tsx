import Image from "next/image";
import { PopulatedItem } from "../../types/interfaces";
import styles from "./WishlistItem.module.css";
import { FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ShoppingCartContext } from "../../context/ContextProvider";
import { useContext } from "react";

interface WishlistItemProps {
  item: PopulatedItem;
  refreshData: () => void;
}

function WishlistItem({ item, refreshData }: WishlistItemProps) {
  const { data, status } = useSession();

  const { fetchCartItems } = useContext(ShoppingCartContext);

  const router = useRouter();

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

    refreshData();

    console.log(apiData);
  };

  const addWishListItemToBag = async () => {
    if (status !== "authenticated") {
      router.replace("/auth/signin");
    }

    const result = await fetch(`/api/cartItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data?.user?.email,
        prodId: _id,
        quantity: 1,
      }),
    });

    const apiData = await result.json();

    console.log(apiData);

    fetchCartItems();

    router.push("/cart");
  };

  return (
    <section className={styles.wishlistItemContainer}>
      <Image src={bagImage} alt={description} height={250} width={250} />
      <h3>{name}</h3>
      <p>₱{price}</p>
      <button onClick={addWishListItemToBag}>Add to Bag</button>

      <div className={styles.closeIcon} onClick={removeWishlistItem}>
        <FaTimes />
      </div>
    </section>
  );
}

export default WishlistItem;
