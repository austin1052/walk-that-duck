import { getSession } from "@/supabase/utils";
import LogoutButton from "@/components/LogoutButton";
import Header from "@/components/Header";
import Button from "@/components/Button";
import styles from "@/styles/LandingPage.module.css";
import "../styles/globals.css";

export default async function Index() {
  const session = await getSession();
  return (
    <>
      {session ? (
        <div>
          Hey, {session.user.email}!
          <LogoutButton />
        </div>
      ) : (
        <div className={styles.loginButton}>
          <Button href={"/login"} text={"log in"} style="underline" />
        </div>
      )}
      <Header />
      <h1 className={`${styles.title} page-title`}>
        <div>
          <span className="title-text">a </span>
          <span className="">drag race </span>
        </div>
        <div>
          <span className="title-text">fantasy league</span>
        </div>
      </h1>
    </>
  );
}
