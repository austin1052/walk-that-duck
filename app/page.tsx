import { getSession } from "@/supabase/utils";
import LogoutButton from "@/components/LogoutButton";
import Logo from "@/components/Logo";
import Nav from "@/components/Nav";
import styles from "@/styles/LandingPage.module.css";
import animation from "@/styles/Nav.module.css";
import "../styles/globals.css";
import Hero from "@/components/Hero";

export default async function Index() {
  const session = await getSession();

  return (
    <>
      <Hero />
    </>
  );
}
