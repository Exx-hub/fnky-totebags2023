import styles from "./Navbar.module.css";
import Link from "next/link";
import CartBadge from "../cartBadge";
import ProfileMenu from "../profileMenu";
import { useState } from "react";

function Navbar() {
  const [subNavOpen, setSubNavOpen] = useState(false);
  console.log(subNavOpen);
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
          <Link href="/">About</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Contact</Link>
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
            <Link href="/">My Wishlist</Link>
            <Link href="/">My Account</Link>
            <hr />
            <Link href="/">Logout</Link>
          </nav>
        )}
      </section>
    </header>
  );
}

export default Navbar;
