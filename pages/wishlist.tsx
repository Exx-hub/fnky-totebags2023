import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import Empty from "../components/empty";
import WishlistComponent from "../components/wishlistComponent";
import User from "../models/User";
import { PopulatedItem } from "../types/interfaces";
import connectDb from "../utils/connectDb";

interface WishlistProps {
  wishlist: PopulatedItem[];
  session: Session;
}

function Wishlist({ session, wishlist }: WishlistProps) {
  const router = useRouter();

  console.log("i re-rendered");

  if (!session) {
    router.replace("/auth/signin");
  }

  if (wishlist.length < 1) {
    return <Empty text="No items on your list." />;
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return <WishlistComponent wishlist={wishlist} refreshData={refreshData} />;
}

export default Wishlist;

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
    "wishlist.items.productId"
  );

  if (!foundUser) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const wishlist = foundUser.wishlist.items;

  return {
    props: {
      session,
      wishlist: JSON.parse(JSON.stringify(wishlist)),
    },
  };
};
