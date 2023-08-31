"use client";

import { useState, useRef, useEffect } from "react";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./styles/index.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [view, setView] = useState("sign-in");
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [classNames, setClassNames] = useState({
    name: `${styles.inputContainer}`,
    label: "",
    input: `${styles.inputContainer}`,
    button: `${styles.loginButton}`,
  });

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

    const name = showSignUp
      ? `${styles.inputContainer} ${styles.slideUp}`
      : `${styles.signUpInput} ${styles.inputContainer} ${styles.slideDown}`;

    const label = showSignUp ? "" : `${styles.labelSlideUp}`;

    const input = showSignUp
      ? `${styles.inputContainer}`
      : `${styles.signUpInput} ${styles.inputContainer}`;

    const button = showSignUp
      ? `${styles.loginButton} ${styles.buttonSlideUp}`
      : `${styles.loginButton} ${styles.buttonSlideDown}`;

    setClassNames({ name, label, input, button });
  };

  useEffect(() => {
    animationRef.current?.addEventListener(
      "animationend",
      () => {
        view === "sign-up" ? setShowSignUp(true) : setShowSignUp(false);
      },
      { once: true }
    );
  }, [classNames, setShowSignUp]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      setError(true);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const setValidityMessage = (e: any, type?: "email" | "password") => {
    const input = e.target;
    if (input.value === "") return;
    if (type === "password" && view === "sign-in") return;
    let message;
    switch (type) {
      case "email":
        message = "Girly... enter a valid email";
        break;
      case "password":
        message = "Password must be 8 characters";
        break;
      default:
        message = "";
        break;
    }
    (input as HTMLInputElement).setCustomValidity(message);
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
          <div className={classNames.input}>
            <div className={styles.label}>
              <label htmlFor="email">Email</label>
              <div className={styles.errorMessage}>Enter a valid email</div>
            </div>
            <input
              required
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
              onInvalid={(e) => setValidityMessage(e, "email")}
              onInput={(e) => setValidityMessage(e)}
            />
          </div>

          <div className={classNames.input}>
            <div className={styles.label}>
              <label htmlFor="password">Password</label>
              <div className={styles.errorMessage}>
                Password must be 8 characters
              </div>
              {error && (
                <div
                  className={styles.errorMessage}
                  style={{ display: "block" }}
                >
                  Password is incorrect
                </div>
              )}
            </div>
            <input
              required
              name="password"
              type="password"
              pattern=".{8,}"
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="••••••••"
              onInvalid={(e) => setValidityMessage(e, "password")}
              onInput={(e) => setValidityMessage(e)}
            />
          </div>

          {showSignUp ? (
            <>
              <div className={classNames.name} ref={animationRef}>
                <label htmlFor="name" className={classNames.label}>
                  Your Name
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  placeholder="Sasha Colby"
                />
              </div>
              <button
                className={
                  isLoading
                    ? `${styles.loginButton} ${styles.loading}`
                    : `${styles.loginButton}`
                }
              >
                <span>{view === "sign-up" ? "Sign Up" : "Sign In"}</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={
                  isLoading
                    ? `${styles.loginButton} ${styles.loading}`
                    : `${styles.loginButton}`
                }
              >
                <span>{view === "sign-up" ? "Sign Up" : "Sign In"}</span>
              </button>

              {/* {isLoading ? (
                <div className={styles.duck}>🦆</div>
              ) : (
                <button className={styles.loginButton}>
                  {isLoading ? (
                    <span>LOADING</span>
                  ) : (
                    <span>{view === "sign-up" ? "Sign Up" : "Sign In"}</span>
                  )}
                  <span>{view === "sign-up" ? "Sign Up" : "Sign In"}</span>
                </button>
              )} */}
            </>
          )}

          <p className={styles.footer}>
            {view === "sign-up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              onClick={(e) => {
                setError(false);
                handleSetView(e);
              }}
            >
              {view === "sign-up" ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
