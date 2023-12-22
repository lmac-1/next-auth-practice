import { GooglePopupLoginButton } from "@/app/components/GooglePopupLoginButton";

export default function GooglePopupPage() {
  return (
    <div className="min-h-full flex justify-center items-center flex-col">
      <div className="space-y-5 max-w-md leading-8 px-4">
        <h1 className="font-bold text-4xl text-center">Google login (popup)</h1>
        <p>
          On this page, the Google login process will open in a popup, rather
          than redirecting to Google from this page.{" "}
        </p>
        <p>
          Once logged in, the popup will close. Error handling could still be
          improved.
        </p>
        <p>This is great if you need to trigger login from within a modal. </p>
        <GooglePopupLoginButton />
      </div>
    </div>
  );
}
