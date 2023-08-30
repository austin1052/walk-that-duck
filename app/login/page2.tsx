"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./styles/index.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [className, setClassName] = useState("");
  // const [incorrectPassword, setIncorrectPasword] = useState(false);
  const [view, setView] = useState("sign-up");

  const nameInputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSetView = (e) => {
    e.preventDefault();
    // setShowName(!showName);
    const isVisible = !showName;
    console.log({ isVisible });
    if (isVisible) {
      console.log("set show name");
      setShowName(isVisible);
    }
    setClassName(showName ? "slideUp" : "slideDown");
  };

  useEffect(() => {
    console.log(view);
    nameInputRef.current?.addEventListener(
      "animationend",
      () => {
        view === "sign-in" ? setView("sign-up") : setView("sign-in");
      },
      { once: true }
    );
  }, [className]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (password !== verifyPassword) {
    //   setVerifyPassword("");
    //   setIncorrectPasword(true);
    //   return;
    // }
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
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
            />
          </div>
          {view === "sign-in" && (
            <>
              <button className={styles.loginButton}>
                <span>Sign In</span>
              </button>
              <p className={styles.footer}>
                Don't have an account?
                <button
                  className={styles.signUpButton}
                  onClick={(e) => handleSetView(e)}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          )}
          {view === "sign-up" && (
            <>
              <div
                className={`${styles.inputContainer} ${className}`}
                ref={nameInputRef}
              >
                <label htmlFor="name">Your Name</label>
                <input
                  // type="password"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Sasha Colby"
                />
              </div>
              {/* {incorrectPassword && (
                <div className={styles.passwordAlert}>
                  Passwords do not match
                </div>
              )} */}
              <button className={styles.loginButton}>
                <span>Sign Up</span>
              </button>
              <p className={styles.footer}>
                Already have an account?
                <button onClick={(e) => handleSetView(e)}>Sign In</button>
                {/* onClick={() => setView("sign-in")} */}
              </p>
            </>
          )}
        </form>
      )}
    </div>
  );
}
