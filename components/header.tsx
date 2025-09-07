"use client";

import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "@daveyplate/better-auth-ui";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

const HEADER_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "explore", href: "/explore" },
  { key: "submit", href: "/submit" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const changeBackground = () => setIsScrolled(window.scrollY > 100);
    document.addEventListener("scroll", changeBackground);
    return () => document.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-2xl px-6 shadow transition-colors backdrop-blur-md ${
        isScrolled ? "bg-background/70" : "bg-background/30"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Skip Nav */}
      <Link
        href="#main"
        className="fixed left-4 top-4 -translate-y-20 rounded bg-foreground px-2 py-1 text-sm font-medium shadow transition-transform focus:translate-y-0"
      >
        Skip to content
      </Link>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image height="40" width="40" src="/logo.png" alt="Logo"/>
        <span>ignitia</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex gap-4">
          {HEADER_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded px-3 py-2 text-sm font-medium transition-colors",
                    {
                      "text-muted-foreground hover:text-foreground": !isActive,
                      "text-foreground font-semibold": isActive,
                    }
                  )}
                >
                  {link.key}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Star Button */}
        <Button variant="ghost" size="icon" asChild>
          <Link href="/stars" aria-label="Your starred ideas">
            <Star className="h-5 w-5" />
          </Link>
        </Button>

        <UserButton size="icon" className="p-1" />

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle menu"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden rounded-lg"
        >
          ☰
        </Button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="absolute right-4 top-16 w-40 rounded-lg bg-background border p-4 md:hidden shadow-lg">
          <ul className="flex flex-col gap-2">
            {HEADER_LINKS.map((link) => {
              const isActive = link.href === pathname;
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                      {
                        "text-muted-foreground hover:text-foreground":
                          !isActive,
                        "text-foreground": isActive,
                      }
                    )}
                  >
                    {link.key}
                  </Link>
                </li>
              );
            })}
            {/* Star button in mobile nav too */}
            <li>
              <Link
                href="/stars"
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                  {
                    "text-muted-foreground hover:text-foreground":
                      pathname !== "/stars",
                    "text-foreground": pathname === "/stars",
                  }
                )}
              >
                ⭐ Stars
              </Link>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
};