import { getSession } from "@/supabase/utils";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";

export default async function Index() {
  const session = await getSession();
  console.log(session);

  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log(user);

  return (
    <div>
      <nav>
        <div>
          <div />
          <div>
            {session ? (
              <div>
                Hey, {session.user.email}!
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
