import Image from "next/image";
import { IProduct } from "../../types/interfaces";
import { FaRegHeart } from "react-icons/fa";
import styles from "./ShopItemDetail.module.css";
import { MouseEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface ShopItemDetailProps {
  product: IProduct;
}

function ShopItemDetail({ product }: ShopItemDetailProps) {
  const { name, price, bagImage, sku, _id } = product;
  const [quantity, setQuantity] = useState(1);

  const { data, status } = useSession();
  const router = useRouter();

  const addToBag = async (isBuyNow: boolean) => {
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
        quantity,
      }),
    });

    const apiData = await result.json();

    console.log(apiData);

    if (isBuyNow) {
      router.push("/cart");
    } else {
      router.push("/");
    }
  };

  const addToWishList = async () => {
    if (status !== "authenticated") {
      router.replace("/auth/signin");
    }

    const result = await fetch(`/api/wishlist`, {
      method: "POST",
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
          <button className={styles.addToCart} onClick={() => addToBag(false)}>
            Add to Bag
          </button>
          <button className={styles.addToWishlist} onClick={addToWishList}>
            <FaRegHeart />
          </button>
        </div>
        <button className={styles.buyNow} onClick={() => addToBag(true)}>
          Buy Now
        </button>
      </section>
    </section>
  );
}

export default ShopItemDetail;
