import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import CartItemList from "../components/cartItemList";
import Empty from "../components/empty";
import User from "../models/User";
import { PopulatedItem } from "../types/interfaces";
import connectDb from "../utils/connectDb";

interface CartProps {
  cartItems: PopulatedItem[];
  session: Session;
}

function Cart({ cartItems, session }: CartProps) {
  const router = useRouter();

  if (!session) {
    router.replace("/auth/signin");
  }

  if (cartItems.length < 1) {
    return <Empty text="Bag is Empty." />;
  }

  return <CartItemList cartItems={cartItems} />;
}

export default Cart;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const email = session?.user?.email;

  await connectDb();

  const foundUser = await User.findOne({ email }).populate(
    "cart.items.productId"
  );

  if (!foundUser) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const cartItems = foundUser.cart.items;

  console.log(cartItems);

  return {
    props: {
      session,
      cartItems: JSON.parse(JSON.stringify(cartItems)),
    },
  };
};
