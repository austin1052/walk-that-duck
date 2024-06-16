"use client";

import { useContext } from "react";
import { NavContext } from "@/app/_context/NavContext";
import Logo from "@/app/_components/Logo";
import styles from "@/app/_styles/Hero.module.css";
import animation from "@/app/_styles/Nav.module.css";
// import styled, { keyframes, css } from "styled-components";

export default function Hero() {
  const { menuVisible } = useContext(NavContext);

  let animationStyle;
  switch (menuVisible) {
    case null:
      animationStyle = `${styles.logoContainer}`;
      break;
    case true:
      animationStyle = `${styles.logoContainer} ${animation.hide}`;
      break;
    case false:
      animationStyle = `${styles.logoContainer} ${animation.show}`;
      break;
  }

  return (
    <>
      <div className={animation.perspective}>
        <div className={animationStyle}>
          <Logo width="40%" />
        </div>
      </div>
      <h1 className={`${styles.title} page-title`}>
        <div>
          <span className="title-text">a </span>
          <span className="">drag race </span>
        </div>
        <div>
          <span className="title-text">fantasy game</span>
        </div>
      </h1>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
    </>
  );
}

// const hideAnimation = keyframes`
// from { opacity: 1; }
// to { opacity: 0; }
// `;

// const showAnimation = keyframes`
// from { opacity: 0; }
// to { opacity: 1; }
// `;

// const PerspectiveContainer = styled.div`
//   /* Add styles for perspective container */
// `;

// const LogoContainer = styled.div<{ $menuVisible: boolean | null }>`
//   display: flex;
//   justify-content: center;
//   margin-top: 2rem;
//   ${({ $menuVisible }) =>
//     $menuVisible === true &&
//     css`
//       animation: ${hideAnimation} 0.3s ease forwards;
//     `}
//   ${({ $menuVisible }) =>
//     $menuVisible === false &&
//     css`
//       animation: ${showAnimation} 0.3s ease forwards;
//     `}
// `;

// const Title = styled.h1`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 2.5rem 0 4rem;

//   &:after {
//     width: 120%;
//     transform: translateY(-30px) skewX(-15deg);
//   }
// `;

// const TitleText = styled.span`
//   /* Add styles for title text */
// `;

// export default function Hero() {
//   const { menuVisible } = useContext(NavContext);

//   return (
//     <>
//       <PerspectiveContainer>
//         <LogoContainer $menuVisible={menuVisible}>
//           <Logo width="40%" />
//         </LogoContainer>
//       </PerspectiveContainer>
//       <Title className="page-title">
//         <div>
//           <TitleText>a </TitleText>
//           <span className="">drag race </span>
//         </div>
//         <div>
//           <TitleText>fantasy game</TitleText>
//         </div>
//       </Title>
//     </>
//   );
// }
