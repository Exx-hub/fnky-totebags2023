import Link from "next/link";
import styles from "./Empty.module.css";

function Empty({ text }: { text: string }) {
  return (
    <section className={styles.emptyContainer}>
      <div>
        <h2>{text}</h2>
        <Link href="/">Continue Shopping</Link>
      </div>
    </section>
  );
}

export default Empty;
