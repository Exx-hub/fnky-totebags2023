import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IProduct } from "../../types/interfaces";
import styles from "./ShopItem.module.css";

interface ShopItemProps {
  item: IProduct;
}

function ShopItem({ item }: ShopItemProps) {
  const { name, bagImage, patternImage, price, sku } = item;

  const [show, setShow] = useState(false);

  const onHover = () => {
    setShow(true);
  };

  const onLeave = () => {
    setShow(false);
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
        <button style={{ visibility: show ? "visible" : "hidden" }}>
          Add to Bag
        </button>
      </section>
    </section>
  );
}

export default ShopItem;
