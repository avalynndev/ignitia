"use server";

import { db } from "@/db";
import { idea as ideaSchema, user as userSchema } from "@/schema";
import { eq, desc } from "drizzle-orm";
import { InferModel } from "drizzle-orm";

// Types
export type UserModel = InferModel<typeof userSchema>;
export type IdeaModel = InferModel<typeof ideaSchema>;

export type IdeaWithAuthor = {
  id: number;
  title: string;
  description: string;
  category?: string;
  image?: string;
  website?: string;
  tags: string[];
  stars: number;
  upvotes: number;
  userId: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    username: string | null;
    displayUsername: string | null;
    image: string | null;
  } | null;
};

// Helper to map idea + user relation
function mapIdea(i: IdeaModel & { user?: UserModel | null }): IdeaWithAuthor {
  return {
    id: i.id,
    title: i.title,
    description: i.description,
    category: i.category ?? undefined,
    image: i.image ?? undefined,
    website: i.website ?? undefined,
    tags: (i.tags as string[]) ?? [],
    stars: i.stars,
    upvotes: i.upvotes,
    userId: i.userId,
    isFeatured: i.isFeatured,
    createdAt: i.createdAt,
    updatedAt: i.updatedAt,
    author: i.user
      ? {
          username: i.user.username ?? null,
          displayUsername: i.user.displayUsername ?? null,
          image: i.user.image ?? null,
        }
      : null,
  };
}

// Fetch all ideas
export async function fetchAllIdeas(): Promise<IdeaWithAuthor[]> {
  try {
    const result = await db.query.idea.findMany({
      orderBy: [desc(ideaSchema.stars)],
    });

    return result.map(mapIdea);
  } catch (error) {
    console.error("Error fetching all ideas:", error);
    return [];
  }
}

// Fetch featured/trending ideas
export async function fetchFeaturedIdeas(): Promise<IdeaWithAuthor[]> {
  try {
    const result = await db.query.idea.findMany({
      where: eq(ideaSchema.isFeatured, true),
      orderBy: [desc(ideaSchema.stars)],
    });

    return result.map(mapIdea);
  } catch (error) {
    console.error("Error fetching featured ideas:", error);
    return [];
  }
}

// Fetch ideas by user
export async function fetchUserIdeas(
  userId: string
): Promise<IdeaWithAuthor[]> {
  try {
    const result = await db.query.idea.findMany({
      where: eq(ideaSchema.userId, userId),
      orderBy: [desc(ideaSchema.createdAt)],
    });

    return result.map(mapIdea);
  } catch (error) {
    console.error("Error fetching user ideas:", error);
    return [];
  }
}

export async function submitIdea(
  userId: string | null, // allow null
  data: {
    title: string;
    description: string;
    category?: string;
    image?: string;
    website?: string;
    tags?: string[];
  }
): Promise<IdeaWithAuthor | null> {
  try {
    const newIdea = await db
      .insert(ideaSchema)
      .values({
        userId: userId ?? "anonymous", // use ghost user
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image,
        website: data.website,
        tags: data.tags ?? [],
      })
      .returning();

    const inserted = newIdea[0];

    return mapIdea({ ...inserted, user: userId ? null : undefined });
  } catch (error) {
    console.error("Error submitting idea:", error);
    return null;
  }
}

