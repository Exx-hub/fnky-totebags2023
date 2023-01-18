import Image from "next/image";
import { useState } from "react";
import styles from "./ShopItem.module.css";

interface ShopItem {
  name: string;
  sku: string;
  bagImage: string;
  patternImage: string;
  price: string;
  description: string;
}

interface ShopItemProps {
  item: ShopItem;
}

function ShopItem({ item }: ShopItemProps) {
  const { name, bagImage, patternImage, price } = item;

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
          width={350}
          height={350}
          priority
        />
        {show && <div className={styles.quickView}>Quick View</div>}
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
