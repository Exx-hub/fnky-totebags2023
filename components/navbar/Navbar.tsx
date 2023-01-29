import styles from "./Navbar.module.css";
import Link from "next/link";
import CartBadge from "../cartBadge";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ContextProvider";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const { cartQuantity } = useContext(ShoppingCartContext);

  const authenticated = status === "authenticated";

  const navLinks = authenticated ? (
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
    <>
      <header className={styles.headerContainer}>
        <section className={styles.logo} onClick={() => router.push("/")}>
          <h1>FNKY</h1>
          <h4>Printed Tote Bags</h4>
        </section>

        <section className={styles.headerRight}>
          <div
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          <nav className={styles.nav}>{navLinks}</nav>

          {authenticated && (
            <section
              className={styles.actionButtons}
              onClick={() => router.push("/cart")}
            >
              <FaUserCircle />
              <CartBadge cartItemsQty={cartQuantity} />
            </section>
          )}
        </section>

        {menuOpen && (
          <section
            className={styles.mobileNav}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {navLinks}
            {authenticated && (
              <>
                <hr />
                <Link href="/cart">Cart</Link>
              </>
            )}
          </section>
        )}
      </header>
    </>
  );
}

export default Navbar;
