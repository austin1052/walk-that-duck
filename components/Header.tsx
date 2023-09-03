"use client";

import { useState, useEffect } from "react";
import { logo } from "../app/assets/index";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Header.module.css";

export default function Header() {
  const [darkMode, setDarkMode] = useState<boolean>(
    window !== undefined
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDark.addEventListener("change", (e) =>
      e.matches ? setDarkMode(true) : setDarkMode(false)
    );
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={darkMode ? logo.light : logo.dark}
            alt="walk that duck logo"
          />
        </Link>
      </div>
    </header>
  );
}
