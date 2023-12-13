import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "./components/User";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <section className="space-y-5">
      <h1 className="text-3xl">Home</h1>
      <h2 className="font-semibold text-xl">Server Side Rendered</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2 className="font-semibold text-xl">Client Side Rendered</h2>
      <User />
    </section>
  );
}
