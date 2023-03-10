import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useContext, useState } from "react";
import { IProduct } from "../../types/interfaces";
import styles from "./ShopItem.module.css";

import { ShoppingCartContext } from "../../context/ContextProvider";

import { toast } from "react-toastify";

interface ShopItemProps {
  item: IProduct;
}

function ShopItem({ item }: ShopItemProps) {
  const { name, bagImage, patternImage, price, sku, _id } = item;
  const { data, status } = useSession();

  const { fetchCartItems } = useContext(ShoppingCartContext);

  const [show, setShow] = useState(false);

  const onHover = () => {
    setShow(true);
  };

  const onLeave = () => {
    setShow(false);
  };

  const addToBag = async () => {
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

    toast.success(apiData.message);

    fetchCartItems();

    console.log(apiData);
  };
  return (
    <section
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={styles.shopItemContainer}
    >
      <section className={styles.shopItemImg}>
        <Image
          src={!show ? bagImage : patternImage}
          alt=""
          width={500}
          height={500}
          priority={name === "Girl Tiger"}
        />
        {show && (
          <Link href={`/product/${sku}`} className={styles.quickView}>
            View Item
          </Link>
        )}
      </section>
      <section className={styles.shopItemDetails}>
        <h2>{name}</h2>
        <p>-----</p>
        <p>P{price}</p>
        {status === "authenticated" && (
          <button
            onClick={addToBag}
            style={{ visibility: show ? "visible" : "hidden" }}
          >
            Add to Bag
          </button>
        )}
      </section>
    </section>
  );
}

export default ShopItem;
