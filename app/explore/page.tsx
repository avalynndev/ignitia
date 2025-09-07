import { IdeasExplore } from "@/components/ideas";

export default async function Home() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center pt-4">
      <span className="tracking-tight pointer-events-none mt-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text py-8 text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Explore Startup Ideas 🚀
      </span>
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text px-6 pb-6 text-center text-lg leading-relaxed max-w-2xl">
        Discover unique projects, bold concepts, and creative sparks from the
        community.
      </span>
      <IdeasExplore />
    </div>
  );
}
