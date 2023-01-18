import ShopItem from "../shopItem";
import styles from "./Shop.module.css";

const items = [
  {
    name: "Lemon One",
    bagImage: "/images/lemonBag.jpg",
    patternImage: "/images/lemon.jpg",
    price: "399",
    description: "lorem ipsum dolor",
    sku: "0011",
    id: 1,
  },
  {
    name: "Orange Zebra",
    bagImage: "/images/orangeBag.jpg",
    patternImage: "/images/orange.jpg",
    price: "399",
    description: "lorem ipsum dolor",
    sku: "0012",
    id: 2,
  },
  {
    name: "Green hippie",
    bagImage: "/images/greenhandBag.jpg",
    patternImage: "/images/greenhand.jpg",
    price: "399",
    description: "lorem ipsum dolor",
    sku: "0010",
    id: 3,
  },
  {
    name: "White Blue",
    bagImage: "/images/whiteBlueBag.jpg",
    patternImage: "/images/whiteBlue.jpg",
    price: "399",
    description: "lorem ipsum dolor",
    sku: "0010",
    id: 4,
  },
];

function Shop() {
  return (
    <section className={styles.shopContainer}>
      {items.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </section>
  );
}

export default Shop;
