import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Orders() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/signin");
    },
  });

  return <div>Orders</div>;
}

export default Orders;
