"use client";

import { useEffect, useState } from "react";
import { db } from "@/db";
import { idea, ideaStars, comment } from "@/schema";
import { eq } from "drizzle-orm";
import { useSession } from "@/lib/auth-client";
import { Star } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IdeaCard } from "@/components/card";

function CustomSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ReloadIcon className="h-8 w-8 animate-spin" />
    </div>
  );
}

export default function StarredIdeasPage() {
  const session = useSession();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStarred = async () => {
    if (!session.data?.user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const starred = await db
      .select({
        id: idea.id,
        title: idea.title,
        shortDescription: idea.shortDescription,
        description: idea.description,
        tags: idea.tags,
        stars: idea.stars,
        featured: idea.featured,
        image: idea.image,
        category: idea.category,
        createdAt: idea.createdAt,
        username: idea.username,
      })
      .from(ideaStars)
      .innerJoin(idea, eq(ideaStars.ideaId, idea.id))
      .where(eq(ideaStars.userId, session.data.user.id));

    const ideasWithComments = await Promise.all(
      starred.map(async (idea) => {
        const comments = await db
          .select()
          .from(comment)
          .where(eq(comment.ideaId, idea.id));
        return { ...idea, comments };
      }),
    );

    setIdeas(ideasWithComments);

    setLoading(false);
  };

  useEffect(() => {
    fetchStarred(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data?.user]);

  if (loading) return <CustomSpinner />;

  if (!session.data?.user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground text-lg">
          Please log in to view your starred ideas ⭐
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 pt-12 min-h-screen">
      <h1 className="tracking-tight pointer-events-none mt-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text py-8 text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        ⭐ Starred Ideas
      </h1>
      <p className="pointer-events-none mt-4 whitespace-pre-wrap bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 bg-clip-text text-center text-lg leading-relaxed max-w-2xl mx-auto text-transparent">
        Your favorite ideas, highlighted for inspiration.
      </p>
      {ideas.length === 0 ? (
        <div className="text-center mt-20 py-8 border border-dashed border-gray-300 rounded-lg">
          <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">
            You haven’t starred any ideas yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 mt-20">
          {ideas.map((idea) => (
            <IdeaCard {...idea} key={idea.id} />
          ))}
        </div>
      )}
    </div>
  );
}
