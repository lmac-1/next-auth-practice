"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const [newName, setNewName] = useState("");

  return (
    <div className="max-w-2xl mx-auto my-8 space-y-5 px-4">
      <h1 className="text-4xl">Dashboard</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <>
          <p>Hi {session.user.name}</p>
          <label htmlFor="name">Update Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          ></input>
          {/* for some reason this won't work if it's within a form */}
          <button onClick={() => update({ name: newName })}>Update</button>
          <button
            className="flex justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
}
