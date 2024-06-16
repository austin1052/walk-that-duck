import Link from "next/link";
import styles from "@/app/_styles/Button.module.css";
import styled, { css } from "styled-components";

interface ButtonProps {
  text: string;
  style?: "underline" | "solid";
  href?: string;
  onClick?: (e: any) => void;
}

export default function Button({
  text,
  style = "solid",
  href,
  onClick,
}: ButtonProps) {
  let buttonStyle = `${styles.button}`;

  switch (style) {
    case "underline":
      buttonStyle += ` ${styles.underline}`;
      break;
    case "solid":
      buttonStyle += ` ${styles.solid}`;
      break;
  }

  return (
    <>
      {href ? (
        <Link href={href} className={buttonStyle}>
          <span>{text}</span>
        </Link>
      ) : (
        <button onClick={onClick} className={buttonStyle}>
          <span>{text}</span>
        </button>
      )}
    </>
  );
}

// TODO: Convert to styled component

const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  // border: none;
  width: fit-content;
  transition: 300ms;

  &: * {
    transition: 300ms;
    font-weight: 800;
    text-decoration: none;
    font-size: var(--button-font-size);
  }
`;

const underlineStyles = css`
  background: none;
  text-decoration: none;
  padding: 0 4px;
  border-bottom: 2px solid var(--accent);

  &:hover {
    transform: scale(1.025);
  }
`;

const solidStyles = css`
  padding: 0.5rem 1rem;
  font-weight: 800;
  text-decoration: none;
  border-radius: var(--br);
  background: linear-gradient(0deg, var(--dark) 0%, var(--mid) 100%);
  cursor: pointer;
  /* box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  &: * {
    color: var(--light);
  }
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledLink = styled(Link)`
  ${buttonStyles}
`;
