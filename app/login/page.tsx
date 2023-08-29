"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "../../styles/form.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [incorrectPassword, setIncorrectPasword] = useState(false);

  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setVerifyPassword("");
      setIncorrectPasword(true);
      return;
    }
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    console.log(res);
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(result);
    router.push("/");
    router.refresh();
  };

  return (
    <div className={`${styles.container} ${styles.authForm}`}>
      {view === "check-email" ? (
        <p>
          Check <span>{email}</span> to continue signing up
        </p>
      ) : (
        <form
          className={styles.form}
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <label htmlFor="email">Email</label>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === "sign-in" && (
            <>
              <button className={styles.loginButton}>Sign In</button>
              <p className={styles.footer}>
                Don't have an account?
                <button
                  className={styles.signUpButton}
                  onClick={() => setView("sign-up")}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          )}
          {view === "sign-up" && (
            <>
              <label htmlFor="verifyPassword">Confirm Password</label>
              <input
                type="password"
                name="verifyPassword"
                onChange={(e) => setVerifyPassword(e.target.value)}
                value={verifyPassword}
                placeholder="••••••••"
              />
              {incorrectPassword && (
                <div className={styles.passwordAlert}>
                  Passwords do not match
                </div>
              )}
              <button className={styles.loginButton}>Sign Up</button>
              <p className={styles.footer}>
                Already have an account?
                <button onClick={() => setView("sign-in")}>Sign In Now</button>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  );
}
