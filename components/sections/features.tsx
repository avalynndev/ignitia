"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { Pointer } from "../magicui/pointer";

const FEATURES = [
  {
    icon: Lightbulb,
    title: "Share Your Ideas",
    desc: "Put your startup concepts out into the world with a simple form.",
  },
  {
    icon: Users,
    title: "Connect & Inspire",
    desc: "Discover creative ideas from fellow students across the globe.",
  },
  {
    icon: Rocket,
    title: "Turn Dreams Into Action",
    desc: "Get inspired to build, improve, and launch your projects.",
  },
];

export function Features() {
  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto 6">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Why Use This Platform?
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            A hub for students to share, learn, and get motivated.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const COLORS = ["bg-pink-800", "bg-indigo-800", "bg-blue-900"];
            const bgColor = COLORS[i % COLORS.length];

            return (
              <motion.div
                key={f.title}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <Card
                  className={`overflow-hidden h-full relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${bgColor}`}
                >
                  <div className="absolute inset-0 h-full w-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

                  <div
                    className="absolute inset-0 w-full h-full scale-[1.2] opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
                    style={{
                      backgroundImage: `url("/noise.webp")`,
                      backgroundSize: "30%",
                    }}
                  />

                  <CardHeader className="relative z-10">
                    <f.icon className="h-10 w-10 mb-3 text-primary" />
                    <CardTitle className="text-white">{f.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-neutral-200">{f.desc}</p>
                  </CardContent>

                  <Pointer>
                    <f.icon className="absolute text-primary" />
                  </Pointer>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
