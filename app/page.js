import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "./components/User";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <section className="space-y-5 mx-auto max-w-md py-10">
      <h1 className="text-5xl font-bold mb-10">Home</h1>
      <h2 className="font-semibold text-xl">Server Side Rendered Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2 className="font-semibold text-xl">Client Side Rendered Session</h2>
      <User />
      {!session && (
        <div className="flex flex-col gap-5 items-start">
          <div className="flex gap-10 flex-wrap">
            <Link
              href="/login"
              className="py-2 px-4 rounded-lg bg-gray-500 text-white hover:bg-gray-600 shadow-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 rounded-lg bg-gray-500 text-white hover:bg-gray-600 shadow-md"
            >
              Register
            </Link>
          </div>
          <Link
            href="/login-google"
            className="py-2 px-4 rounded-lg bg-gray-500 text-white hover:bg-gray-600 shadow-md"
          >
            Login with Google popup
          </Link>
        </div>
      )}
    </section>
  );
}
