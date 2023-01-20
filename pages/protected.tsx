import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Protected: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/signin");
    },
  });
  console.log(session);
  return <div>This page is protected</div>;
};

export default Protected;
