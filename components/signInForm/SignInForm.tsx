import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useLoginValidate from "../../hooks/useLoginValidate";
import { LoginValidateValues } from "../../types/interfaces";
import styles from "./SignInForm.module.css";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({} as LoginValidateValues);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = await useLoginValidate({ email, password });
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      const { error, ok, status } = loginResult as {
        error: string;
        ok: boolean;
        status: number;
      };

      if (!error && ok) {
        router.push("/");
      }
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
        {errors.email && <small>{errors.email}</small>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.email && <small>{errors.password}</small>}
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}

export default SignInForm;
