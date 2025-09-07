import { formatDate } from "@/lib/utils";
import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

import { Link } from "next-view-transitions";

export function IdeaCard(idea: Idea) {
  return (
    <Link href={`/idea/${idea.id}`}>
      <div className="group relative w-full cursor-pointer rounded-2xl border bg-card p-6 transition hover:shadow-lg hover:border-primary">
        <div className="mb-2 flex items-center text-xs text-muted-foreground">
          {formatDate(idea.createdAt)}
          <div className="ml-auto">
            {idea.category && (
              <Badge variant="secondary" className="rounded-full text-xs">
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
  );
}
