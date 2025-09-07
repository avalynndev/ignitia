"use client";

import { AuthView } from "@daveyplate/better-auth-ui";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthView view="SIGN_IN" />
      </div>
    </main>
  );
}
