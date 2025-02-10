import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BarChart, Link } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  description: string;
  metrics: string | null;
  link: string[] | null;
  disclaimer: string | null;
  linkAdditionalText?: string;
  tags?: string[];
  className?: string;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const {
    title,
    description,
    metrics,
    link,
    disclaimer,
    linkAdditionalText,
    tags = [],
    className,
  } = props;

  return (
    <Card
      className={cn(
        "group relative min-h-[300px] flex flex-col transition-all duration-300",
        "border border-purple-900/50 bg-black/40 backdrop-blur-lg hover:bg-black/60",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600/5 before:to-pink-600/5 before:opacity-0 before:transition-opacity",
        "hover:before:opacity-100 hover:shadow-lg hover:shadow-purple-500/10",
        className
      )}
    >
      <CardHeader className="space-y-4 relative">
        <div className="space-y-2">
          <CardTitle
            className={cn(
              "flex items-center justify-between text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400",
              "group-hover:from-purple-300 group-hover:to-pink-300 transition-all",
              link && link.length > 0 && "cursor-pointer"
            )}
            onClick={() => {
              window.open(link?.[0], "_blank");
            }}
          >
            {title}
            {link && link.length > 0 && (
              <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
            )}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-gray-300">
            {description}
          </CardDescription>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-900/30 text-purple-300 hover:bg-purple-900/50 border border-purple-500/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between space-y-4 relative">
        {metrics && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-purple-300">
              <BarChart className="w-4 h-4" />
              <h4>Key Metrics</h4>
            </div>
            <p className="text-sm text-gray-400 pl-6">{metrics}</p>
          </div>
        )}

        <div className="space-y-3">
          {link ? (
            <div className="flex flex-wrap gap-3">
              {link.map((url, index) => (
                <a
                  key={index}
                  className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Link className="w-4 h-4" />
                  {`Link ${index === 0 ? "" : index + 1}`}
                </a>
              ))}
              {linkAdditionalText && (
                <span className="text-sm text-gray-400">{linkAdditionalText}</span>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">{disclaimer}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
