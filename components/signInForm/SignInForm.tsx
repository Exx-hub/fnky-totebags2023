import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./SignInForm.module.css";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("loginResult:", loginResult);
    const { error, ok, status } = loginResult as {
      error: string;
      ok: boolean;
      status: number;
    };

    if (!error && ok) {
      router.push("/");
    }
  };
  return (
    <section className={styles.signInContainer}>
      <h1>Sign In</h1>
      <p>
        Not yet Signed up? <Link href="/auth/signup">Sign up</Link>
      </p>
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}

export default SignInForm;
