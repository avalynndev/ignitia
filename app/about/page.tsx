"use client";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pt-20">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">About Us</h1>
        <p className="text-muted-foreground">
          Learn more about our mission, values, and the community we’re building
          together.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground">
          We believe in empowering students to share, refine, and grow their
          ideas. Our platform is designed to help young innovators express
          creativity, collaborate, and turn sparks of imagination into impactful
          projects.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why We Exist</h2>
        <p className="text-muted-foreground">
          Every student has ideas worth sharing. But many don’t have the right
          space to showcase them. That’s why we created this hub — a safe,
          inspiring place where ideas can flourish, feedback can fuel growth,
          and collaboration can turn dreams into reality.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-3">
          <div className="bg-foreground/5 p-2 rounded">
            <h3 className="font-medium">
              Do I need to pay to use the platform?
            </h3>
            <p className="text-muted-foreground">
              No, our core platform is completely free for students to use.
            </p>
          </div>
          <div className="bg-foreground/5 p-2 rounded">
            <h3 className="font-medium">Who can share ideas?</h3>
            <p className="text-muted-foreground">
              Any student with a passion for creativity and innovation.
            </p>
          </div>
          <div className="bg-foreground/5 p-2 rounded">
            <h3 className="font-medium">Is my data safe?</h3>
            <p className="text-muted-foreground">
              Yes, we prioritize privacy and ensure your ideas remain secure.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="text-muted-foreground">
          We respect your privacy. Your personal data will never be sold or
          misused. Information is collected only to improve your experience and
          keep the platform safe.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
        <p className="text-muted-foreground">
          By using this platform, you agree to share respectful, original
          content and follow community guidelines. Misuse of the platform may
          result in account restrictions.
        </p>
      </section>
    </div>
  );
}
