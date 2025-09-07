"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/db";
import { idea, comment, ideaStars } from "@/schema";
import { eq, and } from "drizzle-orm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { Link } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, UserCircle } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function IdeaDetailPage() {
  const { id } = useParams();
  const session = useSession();
  const username = session.data?.user?.username ?? undefined;

  const [ideaData, setIdeaData] = useState<any | null>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [starred, setStarred] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [starLoading, setStarLoading] = useState(true);

  const fetchIdea = async () => {
    setLoading(true);

    const data = await db
      .select()
      .from(idea)
      .where(eq(idea.id, Number(id)));
    const commentData = await db
      .select()
      .from(comment)
      .where(eq(comment.ideaId, Number(id)));

    setIdeaData(data[0]);
    setComments(commentData);

    if (session.data?.user) {
      const userStar = await db
        .select()
        .from(ideaStars)
        .where(
          and(
            eq(ideaStars.ideaId, Number(id)),
            eq(ideaStars.userId, session.data.user.id),
          ),
        );
      setStarred(userStar.length > 0);
    }

    setLoading(false);
    setStarLoading(false);
  };

  const handleComment = async () => {
    if (!newComment.trim() || !session.data?.user) return;

    setCommentLoading(true);

    try {
      const inserted = await db
        .insert(comment)
        .values({
          body: newComment,
          ideaId: Number(id),
          username,
        })
        .returning();

      setComments((prev) => [inserted[0], ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setCommentLoading(false);
    }
  };

  const toggleStar = async () => {
    if (!session.data?.user || starLoading) return;
    setStarLoading(true);

    try {
      if (starred) {
        await db
          .delete(ideaStars)
          .where(
            and(
              eq(ideaStars.ideaId, Number(id)),
              eq(ideaStars.userId, session.data.user.id),
            ),
          );

        await db
          .update(idea)
          .set({ stars: (ideaData.stars ?? 1) - 1 })
          .where(eq(idea.id, Number(id)));

        setIdeaData((prev: any) => ({ ...prev, stars: prev.stars - 1 }));
        setStarred(false);
      } else {
        await db.insert(ideaStars).values({
          userId: session.data.user.id,
          ideaId: Number(id),
        });

        await db
          .update(idea)
          .set({ stars: (ideaData.stars ?? 0) + 1 })
          .where(eq(idea.id, Number(id)));

        setIdeaData((prev: any) => ({ ...prev, stars: prev.stars + 1 }));
        setStarred(true);
      }
    } catch (err) {
      console.error("Star toggle failed:", err);
    } finally {
      setStarLoading(false);
    }
  };

  useEffect(() => {
    fetchIdea(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session.data?.user]);

  if (loading || !ideaData)
    return (
      <div className="relative flex h-[60vh] items-center justify-center">
        <ReloadIcon className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20 min-h-screen">
      <div className="rounded-2xl border bg-card shadow-md hover:shadow-lg transition-shadow p-8 relative">
        <div className="flex items-start justify-between">
          <h1 className="text-4xl font-bold tracking-tight leading-snug">
            {ideaData.title}
          </h1>

          <Button
            onClick={toggleStar}
            variant="outline"
            size="sm"
            disabled={starLoading || !session.data?.user}
            className="flex items-center gap-1"
          >
            {starLoading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-yellow-500 rounded-full animate-spin" />
            ) : (
              <Star
                className={`h-5 w-5 transition-colors ${
                  starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                }`}
              />
            )}
            <span>{ideaData.stars ?? 0}</span>
          </Button>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mt-3 mb-6">
          <UserCircle className="w-4 h-4 mr-1" />
          {ideaData.username ? (
            <Link
              href={`/profile/${ideaData.username}`}
              className="underline hover:text-primary transition-colors"
            >
              {ideaData.username}
            </Link>
          ) : (
            "Anonymous"
          )}
          <span className="mx-2">•</span>
          {formatDate(ideaData.createdAt)}
        </div>

        <div className="space-y-4">
          <p className="text-base leading-relaxed text-foreground">
            {ideaData.description}
          </p>

          <div className="bg-muted/40 p-4 rounded-lg text-sm text-muted-foreground">
            <span className="font-medium text-foreground text-xl">
              Solves Problem:
            </span>
            <div className="pt-2">{ideaData.solves}</div>
          </div>
        </div>

        {ideaData.tags && ideaData.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {ideaData.tags.map((tag: string, idx: number) => (
              <Badge
                key={idx}
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="flex items-center text-lg font-semibold mb-4">
          <MessageSquare className="w-5 h-5 mr-2" />
          Comments ({comments.length})
        </h2>

        <div className="space-y-4 mb-6">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div
                key={c.id}
                className="border rounded-lg p-3 text-sm bg-muted/30"
              >
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <UserCircle className="w-3 h-3 mr-1" />
                  {c.username || "Anonymous"}
                  <span className="mx-2">•</span>
                  {formatDate(c.createdAt)}
                </div>
                <p className="text-muted-foreground">{c.body}</p>
              </div>
            ))
          ) : (
            <div className="text-sm italic text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>

        {session.data?.user ? (
          <div className="space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="min-h-[80px]"
            />
            <Button
              onClick={handleComment}
              disabled={!newComment.trim() || commentLoading}
            >
              {commentLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                  Posting...
                </div>
              ) : (
                "Post Comment"
              )}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Please log in to leave a comment.
          </p>
        )}
      </div>
    </div>
  );
}
