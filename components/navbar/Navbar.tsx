import styles from "./Navbar.module.css";
import Link from "next/link";
import CartBadge from "../cartBadge";
import { FaUserCircle } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  const navLinks = session ? (
    <>
      <Link href="/">Shop</Link>
      <Link href="/orders">My Orders</Link>
      <Link href="/wishlist">Wishlist</Link>
      <Link href="/auth/signin" onClick={() => signOut({ redirect: false })}>
        Sign Out
      </Link>
    </>
  ) : (
    <>
      <Link href="/">Shop</Link>
      <Link href="/auth/signup">Sign Up</Link>
      <Link href="/auth/signin">Sign In</Link>
    </>
  );

  return (
    <header className={styles.headerContainer}>
      <section className={styles.logo}>
        <h1>FNKY</h1>
        <h4>Printed Tote Bags</h4>
      </section>

      <section className={styles.headerRight}>
        <nav className={styles.nav}>{navLinks}</nav>
        <section className={styles.actionButtons}>
          <FaUserCircle />
          <CartBadge />
        </section>
      </section>
    </header>
  );
}

export default Navbar;

// if logged in circle with initials for the circle
