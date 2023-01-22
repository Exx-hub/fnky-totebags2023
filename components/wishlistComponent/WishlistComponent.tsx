import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { PopulatedItem } from "../../types/interfaces";
import WishlistItem from "../wishlistItem";
import styles from "./WishlistComponent.module.css";

interface WishlistComponentProps {
  wishlist: PopulatedItem[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

function WishlistComponent({
  wishlist,
  loading,
  setLoading,
}: WishlistComponentProps) {
  // productId holds product info because of populate.
  return (
    <section className={styles.wishlistComponentContainer}>
      <h2>My Wishlist</h2>
      <p>View favorite products you’ve saved to your wishlist.</p>
      <hr />
      <section className={styles.wishlistComponentGrid}>
        {wishlist.map((item: PopulatedItem) => (
          <WishlistItem
            key={item._id}
            item={item}
            loading={loading}
            setLoading={setLoading}
          />
        ))}
      </section>
    </section>
  );
}

export default WishlistComponent;
