import styles from "./Navbar.module.css";
import Link from "next/link";
import CartBadge from "../cartBadge";
import ProfileMenu from "../profileMenu";
import { useState } from "react";

function Navbar() {
  const [subNavOpen, setSubNavOpen] = useState(false);

  const toggleSubNav = () => {
    setSubNavOpen(!subNavOpen);
  };
  return (
    <header className={styles.headerContainer}>
      <section className={styles.logo}>
        <h1>FNKY</h1>
        <h4>Printed Tote Bags</h4>
      </section>

      <section className={styles.headerRight}>
        <nav className={styles.nav}>
          <Link href="/">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <section className={styles.actionButtons}>
          <ProfileMenu toggleSubNav={toggleSubNav} />
          <CartBadge />
        </section>

        {subNavOpen && (
          <nav
            className={styles.profileMenu}
            onClick={() => setSubNavOpen(false)}
          >
            <Link href="/orders">My Orders</Link>
            <Link href="/wishlist">My Wishlist</Link>
            <Link href="/account">My Account</Link>
            <hr />
            <Link href="/login">Logout</Link>
          </nav>
        )}
      </section>
    </header>
  );
}

export default Navbar;
