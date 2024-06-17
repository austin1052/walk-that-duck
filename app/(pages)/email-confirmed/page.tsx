"use client";
import Link from "next/link";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  // justify-content: center;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  margin-bottom: var(--gap-1);
  // color: var(--accent);
`;

// TODO
// button to move to /team-selection
//

export default function emailConfirmed() {
  return (
    <Container>
      <Header>Thank you for joining Walk That Duck</Header>
      <p>your email has been confirmed vhjbhjbhjbhjb</p>
      <p>build your team</p>
    </Container>
  );
}
