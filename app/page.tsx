"use client";

import "./_styles/globals.css";
import Hero from "@/app/_components/Hero";
import Button from "./_components/Button";
import styled from "styled-components";

export default function Index() {
  return (
    <>
      <Hero />
      {/* <Form>
        <InviteInput placeholder="enter invite code" />
        <Button text="go" style="solid" />
      </Form> */}
    </>
  );
}

const Form = styled.form`
  --color: var(--mid);
  display: flex;
  // flex-direction: column;
  // align-items: center;
`;

const InviteInput = styled.input`
  position: relative;
  z-index: 20;
  font-size: 1rem;
  margin-right: 1rem;
  padding: 0.5rem 0.5rem;
  background: none;
  border: none;
  border-top: 3px solid rgba(0, 0, 0, 0);
  border-bottom: 3px solid var(--accent);
  outline: none;
  // text-align: center;
  -webkit-appearance: none;
  -webkit-border-radius: 0;

  &:focus {
    placeholder: none;
  }
`;
