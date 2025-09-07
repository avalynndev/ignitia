"use client";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import { db } from "@/db";
import { idea, comment } from "@/schema";
import { desc } from "drizzle-orm";
import { Search } from "lucide-react";
import { IdeaCard } from "./card";

export function IdeasExplore() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const allIdeas = await db
        .select()
        .from(idea)
        .orderBy(desc(idea.createdAt));

      const allComments = await db.select().from(comment);

      const ideaWithComments: Idea[] = allIdeas.map((i) => ({
        ...i,
        comments: allComments.filter((c) => c.ideaId === i.id),
      }));

      setIdeas(ideaWithComments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const visibleIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full max-w-4xl pb-24">
      <div className="sticky top-0 z-10 px-4 py-2">
        <div className="relative w-full ">
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ideas..."
            className="w-full rounded-xl text-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4">
        {loading ? (
          <div className="relative flex h-[40vh] items-center justify-center">
            <ReloadIcon className="h-8 w-8 animate-spin" />
          </div>
        ) : visibleIdeas.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            No ideas found.
          </div>
        ) : (
          visibleIdeas.map((idea) => <IdeaCard {...idea} key={idea.id} />)
        )}
      </div>
    </div>
  );
}
