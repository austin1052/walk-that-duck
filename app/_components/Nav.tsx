"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavContext } from "@/app/_context/NavContext";
import { usePathname } from "next/navigation";
import Button from "./Button";
import LogoutButton from "./LogoutButton";
import styles from "@/app/_styles/Nav.module.css";
import lineStyles from "@/app/_styles/Line.module.css";
import { Session } from "@supabase/supabase-js";
import Duck from "./Duck";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Selection",
    path: "/team-selection",
  },
  {
    title: "Email",
    path: "/email-confirmed",
  },
];

export default function Nav({ session }: { session: Session | null }) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navBarStyle, setNavBarStyle] = useState(`${styles.nav} ${styles.top}`);
  const [navMenuStyle, setNavMenuStyle] = useState(
    `${styles.navMenu} ${styles.navMenuHidden}`
  );
  const { menuVisible, setMenuVisible } = useContext(NavContext);

  const navMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const path = usePathname();

  const controlNavbar = () => {
    // Hides menu when user scrolls down
    if (typeof window !== "undefined") {
      // need to check if windowScrollY is > 0 for phones that may have a bounce animation when scrolling to the top of the page
      // if (window.scrollY > 0 && window.scrollY > lastScrollY) {
      //   // if scroll down hide the navbar
      //   setNavBarStyle(`${styles.nav} ${styles.hidden}`);
      // } else if (window.scrollY + 5 < lastScrollY) {
      //   // if scroll up show the navbar
      //   setNavBarStyle(`${styles.nav}`);
      // } else if (window.scrollY <= 0) {
      //   setNavBarStyle(`${styles.nav} ${styles.top}`);
      // }

      // Changes nav background opacity to 0 when it user is at top of window
      if (window.scrollY <= 0) {
        setNavBarStyle(`${styles.nav} ${styles.top}`);
      } else {
        setNavBarStyle(`${styles.nav}`);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && menuVisible !== true) {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY, menuVisible]);

  useEffect(() => {
    const menuStyle = menuVisible
      ? `${styles.navMenu}`
      : `${styles.navMenu} ${styles.navMenuHidden}`;

    setNavMenuStyle(menuStyle);
  }, [menuVisible]);

  const handleDisplayNavMenu = () => {
    console.log(menuVisible);
    if (menuVisible === false || menuVisible === null) {
      console.log("set true");
      setMenuVisible(true);
    } else {
      console.log("set false");
      setMenuVisible(false);
    }
  };

  // TODO: This return is not serving... hard to read. needs to be cleaned up a bit.
  // TODO: style desktop nav
  return (
    <>
      <nav className={navBarStyle}>
        <>
          {session ? (
            // Display Duck component if the session exists and the path is not "/"
            path !== "/" && (
              <div className={styles.duck}>
                <Duck />
              </div>
            )
          ) : // Display login button if there is no session
          path !== "/login" && !menuVisible ? (
            <>
              <div className={styles.loginButton}>
                <Button href={"/login"} text={"log in"} style="underline" />
              </div>
              <NavDuck />
            </>
          ) : (
            // Display Duck component if the path is "/login"
            <NavDuck />
          )}
        </>

        {path !== "/login" && (
          <div className={styles.menuButton}>
            <Button
              onClick={handleDisplayNavMenu}
              text={menuVisible ? "close" : "menu"}
              style="underline"
            />
          </div>
        )}
      </nav>

      {/* Nav Menu */}
      <div className={navMenuStyle} ref={navMenuRef}>
        {menuVisible && (
          <ul className={styles.perspective}>
            {navLinks.map(({ title, path }, i) => {
              const delay = i * 40;
              return (
                <li
                  style={{ animationDelay: `${delay}ms` }}
                  onClick={() => setMenuVisible(false)}
                >
                  <Link href={path}>{title}</Link>
                </li>
              );
            })}
            <div className={styles.logOutButton}>
              <LogoutButton style="solid" />
            </div>
          </ul>
        )}

        <div className={lineStyles.middleLine} style={{ zIndex: "80" }}></div>
      </div>
    </>
  );
}

function NavDuck() {
  return (
    <Link href="/">
      <div className={styles.duck}>
        <Duck />
      </div>
    </Link>
  );
}
