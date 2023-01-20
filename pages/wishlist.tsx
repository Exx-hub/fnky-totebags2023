import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Wishlist() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/signin");
    },
  });
  return <div>Wishlist</div>;
}

export default Wishlist;
