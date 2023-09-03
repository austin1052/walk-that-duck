import Link from "next/link";
import styles from "@/styles/Button.module.css";

interface ButtonProps {
  text: string;
  style: "underline" | "solid";
  href?: string;
  onClick?: (e: any) => void;
}

// type ButtonProps = LinkButton | ActionButton;

export default function Button({ text, style, href, onClick }: ButtonProps) {
  const className =
    style === "underline"
      ? `${styles.underline} ${styles.button}`
      : `${styles.solid} ${styles.button}`;
  return (
    <>
      {href ? (
        <Link href={href} className={className}>
          <span>{text}</span>
        </Link>
      ) : (
        <button onClick={onClick} className={className}>
          <span>{text}</span>
        </button>
      )}
    </>
  );
}
