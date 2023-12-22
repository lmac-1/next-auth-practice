"use client";

import { signOut, useSession } from "next-auth/react";

export const GooglePopupLoginButton = () => {
  const { data: session, status } = useSession();
  const popupCenter = (url, title) => {
    // works out position of current open screen
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );
    newWindow?.focus();
  };

  if (status === "authenticated") {
    return (
      <div>
        <h2>Welcome {session.user.email}</h2>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else if (status === "unauthenticated") {
    return (
      <button
        className="mx-auto block px-4 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600"
        onClick={() =>
          popupCenter("/login-google/popup", "Sign in with Google")
        }
      >
        Sign in with Google
      </button>
    );
  }
  return <div>Loading...</div>;
};
