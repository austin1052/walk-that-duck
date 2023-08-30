"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./styles/index.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [className, setClassName] = useState(`${styles.inputContainer}`);
  const [labelClassName, setLabelClassName] = useState("");

  const [buttonClassName, setButtonClassName] = useState(
    `${styles.loginButton}`
  );
  const [view, setView] = useState("sign-in");

  const animationRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSetView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    view === "sign-in" ? setView("sign-up") : setView("sign-in");
    const isVisible = !showSignUp;
    if (isVisible) {
      setShowSignUp(isVisible);
    }
    setClassName(
      showSignUp
        ? `${styles.inputContainer} ${styles.slideUp}`
        : `${styles.inputContainer} ${styles.slideDown}`
    );
    setLabelClassName(showSignUp ? "" : `${styles.labelSlideUp}`);
    setButtonClassName(
      showSignUp
        ? `${styles.loginButton} ${styles.buttonSlideUp}`
        : `${styles.loginButton} ${styles.buttonSlideDown}`
    );
  };

  useEffect(() => {
    animationRef.current?.addEventListener(
      "animationend",
      () => {
        className === `${styles.inputContainer} ${styles.slideDown}`
          ? setShowSignUp(true)
          : setShowSignUp(false);
      },
      { once: true }
    );
  }, [className, setShowSignUp]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div className={styles.container}>
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

          {showSignUp ? (
            <>
              <div className={className} ref={animationRef}>
                <label htmlFor="name" className={labelClassName}>
                  Your Name
                </label>
                <input
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Sasha Colby"
                />
              </div>
              <button className={buttonClassName}>
                <span>{view === "sign-up" ? "Sign Up" : "Sign In"}</span>
              </button>
            </>
          ) : (
            <>
              <button className={styles.loginButton}>
                <span>{view === "sign-up" ? "Sign Up" : "Sign In"}</span>
              </button>
            </>
          )}

          <p className={styles.footer}>
            {view === "sign-up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <button onClick={(e) => handleSetView(e)}>
              {view === "sign-up" ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
