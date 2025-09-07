import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="px-6 border-t bg-muted/10">
      <div className="mx-auto max-w-6xl py-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Logo + Status */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <Image height={40} width={40} src="/logo.png" alt="Logo" />
            <h2 className="text-2xl font-bold">ignitia</h2>
          </div>
          <Badge variant="outline" className="w-fit">
            <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
            Status: Operational
          </Badge>
          <p className="text-sm text-muted-foreground">
            Created with {`<3`} by{" "}
            <span className="font-medium">avalynndev</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-foreground/80">
            Quick Links
          </h3>
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Terms of Service
          </Link>
        </div>

        {/* Social */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-foreground/80">Connect</h3>
          <a
            href="https://github.com/avalynndev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="https://x.com/avalynndev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            X
          </a>
          <a
            href="mailto:avalynndev@gmail.com"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Email
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ignitia. All rights reserved.
      </div>
    </footer>
  );
};
