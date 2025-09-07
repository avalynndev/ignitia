"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  CornerBottomLeftIcon,
  ChatBubbleIcon,
  HeartIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { db } from "@/db";
import { idea, comment } from "@/schema";
import { desc } from "drizzle-orm";
import { Search } from "lucide-react";

type Comment = {
  id: number;
  ideaId: number;
  body: string;
  createdAt: Date;
  username: string | null;
};

type Idea = {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  stars: number;
  featured: boolean;
  image: string | null;
  category: string | null;
  createdAt: Date;
  username: string | null;
  comments: Comment[];
};

export function IdeasExplore() {
  const router = useRouter();

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
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl pb-24">
      {/* Search bar */}
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
          visibleIdeas.map((idea) => (
            <div
              key={idea.id}
              onClick={() => router.push(`/idea/${idea.id}`)}
              className="group relative w-full cursor-pointer rounded-2xl border bg-card p-6 transition hover:shadow-lg hover:border-primary"
            >
              {/* Header row: date + admin badge */}
              <div className="mb-2 flex items-center text-xs text-muted-foreground">
                {formatDate(idea.createdAt)}
                <div className="ml-auto">
                  {idea.username === "avalynndev" && (
                    <Badge variant="secondary">ADMIN</Badge>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="line-clamp-1 text-xl font-semibold tracking-tight group-hover:text-primary">
                {idea.title}
              </h3>

              {/* Short description */}
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {idea.shortDescription}
              </p>

              {/* Tags */}
              {idea.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-full px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Footer: comments + rating */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ChatBubbleIcon className="h-4 w-4" />
                    {idea.comments.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartIcon className="h-4 w-4" />
                    {idea.stars}
                  </div>
                </div>
                {idea.category && (
                  <Badge variant="secondary" className="rounded-full text-xs">
                    {idea.category}
                  </Badge>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
