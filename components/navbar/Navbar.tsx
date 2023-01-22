import styles from "./Navbar.module.css";
import Link from "next/link";
import CartBadge from "../cartBadge";
import { FaUserCircle } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ContextProvider";

function Navbar() {
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
      </header>
    </>
  );
}

export default Navbar;

// if logged in circle with initials for the circle
