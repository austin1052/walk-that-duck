"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { NavContext } from "@/app/context/NavContext";
import { usePathname } from "next/navigation";
import Button from "./Button";
import LogoutButton from "./LogoutButton";
import styles from "@/styles/Nav.module.css";
import lineStyles from "@/styles/Line.module.css";
import { Session } from "@supabase/supabase-js";

export default function Nav({ session }: { session: Session | null }) {
  // const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navBarStyle, setNavBarStyle] = useState(`${styles.nav}`);
  const [navAnimation, setNavAnimation] = useState(
    `${styles.navMenuContainer}`
  );
  // const [menuVisible, setMenuVisible] = useState(false);
  const { menuVisible, setMenuVisible, showNavMenu, setShowNavMenu } =
    useContext(NavContext);

  const navMenuRef = useRef<HTMLDivElement>(null);

  const path = usePathname();

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      // need to check if windowScrollY is > 0 for phones that may have a bounce animation when scrolling to the top of the page
      if (window.scrollY > 0 && window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setNavBarStyle(`${styles.nav} ${styles.hidden}`);
      } else if (window.scrollY + 5 < lastScrollY) {
        // if scroll up show the navbar
        setNavBarStyle(`${styles.nav}`);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    console.log("add listener");
    navMenuRef.current?.addEventListener(
      "animationend",
      () => {
        if (menuVisible === false || menuVisible === null) {
          setShowNavMenu(false);
        }
      },
      { once: true }
    );
  }, [navAnimation]);

  const handleDisplayNavMenu = () => {
    console.log(menuVisible);
    if (menuVisible === false || menuVisible === null) {
      console.log("set true");
      setMenuVisible(true);
    } else {
      console.log("set false");
      setMenuVisible(false);
    }

    if (!showNavMenu) {
      setShowNavMenu(!showNavMenu);
    }

    const animation = menuVisible
      ? `${styles.navMenuContainer} ${styles.fadeOut}`
      : `${styles.navMenuContainer} ${styles.fadeIn}`;

    setNavAnimation(animation);
  };

  return (
    <>
      {path !== "/login" && (
        <>
          <nav className={navBarStyle}>
            <div className={styles.menuButton}>
              <Button
                onClick={handleDisplayNavMenu}
                text={menuVisible ? "close" : "menu"}
                style="underline"
              />
            </div>
            {session ? (
              <LogoutButton />
            ) : (
              <div className={styles.loginButton}>
                <Button href={"/login"} text={"log in"} style="underline" />
              </div>
            )}
          </nav>
          {showNavMenu && (
            <>
              <div className={navAnimation}>
                <div ref={navMenuRef}>
                  <ul>
                    <li>home</li>
                    <li>profile</li>
                    <li></li>
                  </ul>
                </div>
                <div
                  className={lineStyles.middleLine}
                  style={{ zIndex: "90" }}
                ></div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
