import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./SignupForm.module.css";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobile, password, confirmPass }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { success } = data;
        console.log(data);

        if (success) {
          router.push("/auth/signin");
        }
      });
  };
  return (
    <section className={styles.signUpContainer}>
      <h1>Sign Up</h1>
      <p>
        Already have an account? <Link href="/auth/signin">Log in</Link>
      </p>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}

export default SignupForm;
