import { getSession } from "@/supabase/utils";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import styles from "../styles/Header.module.css";
import Header from "@/components/Header";
import BackgroundLines from "@/components/BackgroundLines";

export default async function Index() {
  const session = await getSession();
  return (
    <>
      <Header />
      {session ? (
        <div>
          Hey, {session.user.email}!
          <LogoutButton />
        </div>
      ) : (
        <div className={`${styles.loginButton}`}>
          <Link href="/login" className="button">
            <span>Login</span>
          </Link>
        </div>
      )}
    </>
  );
}
