import { db } from "@/db";
import { user, idea, comment } from "@/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { UserRoundIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IdeaCard } from "@/components/card";

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
            <IdeaCard {...idea} key={idea.id} />
          ))}
        </ul>
      )}
    </main>
  );
}

function firstTwoCharacters(name: string) {
  return name.slice(0, 2);
}
