import { IProduct } from "../../types/interfaces";
import ShopItem from "../shopItem";
import styles from "./Shop.module.css";

interface ShopProps {
  products: IProduct[];
}

function Shop({ products }: ShopProps) {
  return (
    <section className={styles.shopContainer}>
      {products.map((item) => (
        <ShopItem key={item._id} item={item} />
      ))}
    </section>
  );
}

export default Shop;
