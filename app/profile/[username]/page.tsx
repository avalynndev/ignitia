import { db } from "@/db";
import { user, idea, comment } from "@/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, UserRoundIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ProfilePage({ params }: any) {
  const { username } = await params;

  const [userInfo] = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  if (!userInfo) {
    notFound();
  }

  const userIdeas = await db
    .select()
    .from(idea)
    .where(eq(idea.username, username))
    .orderBy(idea.createdAt);

  const ideasWithComments = await Promise.all(
    userIdeas.map(async (idea) => {
      const comments = await db
        .select()
        .from(comment)
        .where(eq(comment.ideaId, idea.id));
      return { ...idea, comments };
    }),
  );

  return (
    <main className="mx-auto max-w-3xl p-6 py-24">
      <Avatar>
        <AvatarImage alt="User profile" src={userInfo.image || ""} />
        <AvatarFallback className={"text-foreground uppercase"}>
          {firstTwoCharacters(userInfo.username || "") || (
            <UserRoundIcon className={"size-[50%]"} />
          )}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-3xl font-bold mb-2">@{userInfo.username}</h1>
      {userInfo.displayUsername && (
        <p className="text-muted-foreground mb-4">
          Display name: {userInfo.displayUsername}
        </p>
      )}
      <hr className="my-6" />
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      {ideasWithComments.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {ideasWithComments.map((idea) => (
            <Link key={idea.id} href={`/idea/${idea.id}`}>
              <div className="group relative w-full cursor-pointer rounded-2xl border bg-card p-6 transition hover:shadow-lg hover:border-primary">
                <div className="mb-2 flex items-center text-xs text-muted-foreground">
                  {formatDate(idea.createdAt)}
                  <div className="ml-auto">
                    {idea.category && (
                      <Badge
                        variant="secondary"
                        className="rounded-full text-xs"
                      >
                        {idea.category}
                      </Badge>
                    )}
                  </div>
                </div>

                <h3 className="line-clamp-1 text-xl font-semibold tracking-tight group-hover:text-primary">
                  {idea.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {idea.shortDescription}
                </p>

                {idea.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {idea.tags.map((tag: any) => (
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
                </div>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </main>
  );
}

function firstTwoCharacters(name: string) {
  return name.slice(0, 2);
}
