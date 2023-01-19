import Image from "next/image";
import { IProduct } from "../../types/interfaces";
import { FaRegHeart } from "react-icons/fa";
import styles from "./ShopItemDetail.module.css";
import { useState } from "react";

interface ShopItemDetailProps {
  product: IProduct;
}

function ShopItemDetail({ product }: ShopItemDetailProps) {
  const { name, price, bagImage, sku } = product;
  const [quantity, setQuantity] = useState(1);

  return (
    <section className={styles.shopItemDetailContainer}>
      <section className={styles.shopItemDetailImage}>
        <Image src={bagImage} alt="" height={450} width={450} />
      </section>
      <section className={styles.shopItemDetailDeets}>
        <h2>{name}</h2>
        <p>SKU: {sku}</p>
        <h4>₱{price}</h4>
        <label htmlFor="quantity">Quantity</label>
        <input
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          name="quantity"
          type="number"
        />
        <div className={styles.shopItemDetailAddButtons}>
          <button className={styles.addToCart}>Add to Bag</button>
          <button className={styles.addToWishlist}>
            <FaRegHeart />
          </button>
        </div>
        <button className={styles.buyNow}>Buy Now</button>
      </section>
    </section>
  );
}

export default ShopItemDetail;
