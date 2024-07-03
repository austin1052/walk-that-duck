"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import styles from "./styles/SignIn.module.css";
// import "@/app/_styles/globals.css";

type View = "sign-in" | "sign-up" | "check-email";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [view, setView] = useState<View>("sign-in");
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // dont need this state. set additional classes with classNames package using view booleans
  const [classNames, setClassNames] = useState({
    name: `${styles.inputContainer}`,
    label: `${styles.label}`,
    input: `${styles.inputContainer}`,
    button: `${styles.signInButton}`,
  });

  const animationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClientComponentClient();

  // const signInButtonStyles = classNames(`${styles.signInButton}`, {
  //   [styles.buttonSlide]: showSignUp,
  // });

  const handleSetView = (e: React.MouseEvent<HTMLButtonElement>) => {
    // when showSignUp === false and sign-up components are hidden
    // showSignUp needs to be set to true so slide down animations can start

    // when when showSignUp === true and sign-up components are visible
    // slide up animation needs to run first before showSignUp is set to false
    // class names are changed inside this function and will trigger animations
    // view is changed in this function and will trigger useEffect to set showSignUp false

    e.preventDefault();

    view === "sign-in" ? setView("sign-up") : setView("sign-in");

    // if showSignUp === false, set it to true
    if (!showSignUp) {
      setShowSignUp(!showSignUp);
    }

    const name = showSignUp
      ? `${styles.inputContainer} ${styles.slideUp}`
      : `${styles.signUpInput} ${styles.inputContainer} ${styles.slideDown}`;

    // view === "sign-up"
    // classNames(`${styles.inputContainer}`, {`${}`});

    const label = showSignUp
      ? `${styles.label} ${styles.labelSlideUp}`
      : `${styles.label} ${styles.labelSlideDown}`;

    const input = showSignUp
      ? `${styles.inputContainer}`
      : `${styles.signUpInput} ${styles.inputContainer}`;

    const button = showSignUp
      ? `${styles.signInButton}`
      : `${styles.signInButton} ${styles.buttonSlide}`;

    // const signInButtonStyles = classNames(`${styles.signInButton}`, { [styles.buttonSlide]: showSignUp });

    setClassNames({ name, label, input, button });
  };

  // useEffect(() => {
  //   animationRef.current?.addEventListener(
  //     "animationend",
  //     () => {
  //       if (view === "sign-in") {
  //         setShowSignUp(false);
  //       }
  //       // inputRef?.current?.focus();
  //     },
  //     { once: true }
  //   );
  // }, [view]);

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

    console.log(res);

    if (res.error) {
      setError(true);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleSwitchView = (e: any) => {
    setError(false);
    handleSetView(e);
  };

  type FormInputs = "email" | "password";

  // React.ChangeEvent<HTMLInputElement>,
  const setValidityMessage = (e: any, type?: FormInputs) => {
    console.log("input");
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

  // TODO: move into seperate components
  return (
    <div className={styles.container}>
      {view === "check-email" ? (
        <p data-testid="check-email">
          Check <span>{email}</span> to continue signing up
        </p>
      ) : (
        <form
          className={styles.form}
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <div className={classNames.input}>
            <input
              required
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
              onInvalid={(e) => setValidityMessage(e, "email")}
              onInput={(e) => setValidityMessage(e)}
              ref={inputRef}
            />
            <div className={styles.label}>
              <label htmlFor="email">Email</label>
              <div
                className={styles.invalidMessage}
                data-testid="invalid-email-error"
              >
                Enter a valid email
              </div>
            </div>
          </div>

          <div className={classNames.input}>
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
            <div className={styles.label}>
              <label htmlFor="password">Password</label>
              <div
                className={styles.invalidMessage}
                data-testid="invalid-password-error"
              >
                Password must be 8 characters
              </div>
              {error && (
                <div
                  data-testid="incorrect-password-error"
                  className={`${styles.invalidMessage} ${styles.error}`}
                >
                  Password is incorrect
                </div>
              )}
            </div>
          </div>

          {/* using transition instead of animation */}
          {/* TODO: change class names based on view === "sign-up" */}
          {view === "sign-up" ? (
            <>
              <div className={classNames.name} ref={animationRef}>
                <input
                  required
                  name="name"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  placeholder="Sasha Colby"
                />
                <label htmlFor="name" className={classNames.label}>
                  Your Name
                </label>
              </div>
              <div
                data-testid="log-in-button"
                className={
                  isLoading
                    ? `${classNames.button} ${styles.loading}`
                    : `${classNames.button}`
                }
              >
                <Button
                  text={view === "sign-up" ? "sign Up" : "sign In"}
                  style="solid"
                />
              </div>
            </>
          ) : (
            // TODO: remove duplicated button
            <>
              <div
                data-testid="log-in-button"
                className={
                  isLoading
                    ? `${styles.signInButton} ${styles.loading}`
                    : `${styles.signInButton}`
                }
              >
                <Button
                  // text={view === "sign-up" ? "sign Up" : "sign in"}
                  text="sign up"
                  style="solid"
                />
              </div>
            </>
          )}

          <div className={styles.footer}>
            {view === "sign-up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <div
              className={styles.switchViewButton}
              data-testid="switch-view-button"
            >
              <Button
                text={view === "sign-up" ? "Sign In" : "Sign Up"}
                onClick={handleSwitchView}
                style="underline"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

function SignInButton() {}
