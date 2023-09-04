import App from "./App";
import Background from "@/components/Background";
import { getSession } from "@/supabase/utils";

export const metadata = {
  title: "Walk that Duck",
  description: "A drag race fantasy league",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <App session={session}>{children}</App>
        <Background />
      </body>
    </html>
  );
}
