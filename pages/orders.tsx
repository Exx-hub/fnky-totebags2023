import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import OrdersList from "../components/ordersList";
import Order from "../models/Order";

import connectDb from "../utils/connectDb";

import { IOrderItem } from "../types/interfaces";
import Empty from "../components/empty";

interface OrdersProps {
  session: Session;
  orders: IOrderItem[];
}

function Orders({ session, orders }: OrdersProps) {
  const router = useRouter();

  if (!session) {
    router.replace("/auth/signin");
  }

  if (orders.length < 1) {
    return <Empty text="You haven't placed any orders yet." />;
  }

  return <OrdersList orders={orders} />;
}

export default Orders;

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

  const ordersFound = await Order.find({ "user.email": email });

  return {
    props: {
      session,
      orders: JSON.parse(JSON.stringify(ordersFound)),
    },
  };
};
