"use client";

import { Sparkles, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ComicText } from "@/components/magicui/comic-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useIsMobile } from "@/hooks/use-mobile";

export function CTA() {
  const isMobile = useIsMobile();

  return (
    <section className="relative pb-4">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 rounded-3xl p-1 backdrop-blur-lg border">
        <div className="text-center">
          {/* Headline */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            className="mb-10"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
              <AuroraText className="text-xl md:text-3xl">
                Showcase Your
              </AuroraText>
              <br />
              <ComicText fontSize={isMobile ? 5 : 8}>Startup Idea</ComicText>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Inspire the World. Get noticed. Make an impact.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 relative"
          >
            <Link href="/submit">
              {" "}
              <RainbowButton className="w-full sm:w-auto group relative">
                {" "}
                <Lightbulb className="h-5 w-5 group-hover:animate-pulse" />{" "}
                Submit Your Idea{" "}
                <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1/5 transition-transform" />{" "}
              </RainbowButton>{" "}
            </Link>{" "}
            <Link href="/explore">
              {" "}
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto relative"
              >
                {" "}
                <Sparkles className="h-5 w-5 mr-2" /> Explore Ideas{" "}
              </Button>{" "}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
