import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { CTA } from "@/components/sections/cta";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 overflow-x-hidden md:overflow-visible">
        <div className="min-h-screen overflow-hidden relative">
          <ShootingStars />
          <StarsBackground />
          <div className="relative z-10">
            <div className="animate-fade-in-up mx-auto">
              <Hero />
            </div>
            <Features />
            <div className="animate-fade-in-up delay-700">
              <TestimonialsSection />
            </div>
            <CTA />
          </div>
        </div>
      </main>
    </>
  );
}
