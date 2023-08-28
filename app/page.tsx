import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <div>
      <nav>
        <div>
          <div />
          <div>
            {user ? (
              <div>
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
