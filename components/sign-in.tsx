"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  return (
    <main className="flex items-center justify-center animate-appear delay-100">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                onClick={async () => {
                  startTransition(async () => {
                    await signIn.email(
                      { email, password },
                      {
                        onSuccess() {
                          router.refresh();
                        },
                      }
                    );
                  });
                }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-center w-full border-t pt-4">
              <p className="text-center text-xs text-neutral-500">
                built by{" "}
                <Link
                  href="https://github.com/avalynndev"
                  className="underline"
                  target="_blank"
                >
                  <span className="dark:text-white/70 cursor-pointer">
                    avalynndev
                  </span>
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
