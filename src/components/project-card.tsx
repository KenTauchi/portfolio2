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
  techStack: string[];
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
    techStack,
    className,
  } = props;

  const hasLink = link && link.length > 0;
  return (
    <Card
      className={cn(
        "group relative min-h-[300px] flex flex-col transition-all duration-300 h-full",
        "border border-purple-900/50 bg-black/40 backdrop-blur-lg hover:bg-black/60",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600/5 before:to-pink-600/5 before:opacity-0 before:transition-opacity",
        "hover:before:opacity-100 hover:shadow-lg hover:shadow-purple-500/10",
        className
      )}
    >
      <CardHeader className="space-y-4 relative">
        <div className="space-y-4">
          <CardTitle
            className={cn(
              "flex items-center justify-between text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400",
              "group-hover:from-purple-300 group-hover:to-pink-300 transition-all",
              hasLink && "cursor-pointer"
            )}
            onClick={() => {
              window.open(link?.[0], "_blank");
            }}
          >
            {title}
            {hasLink && (
              <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
            )}
          </CardTitle>

          {hasLink && (
            <p className="text-xs text-gray-400 block md:hidden">Tap to see recorded demo</p>
          )}

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
      <CardContent className="flex flex-row justify-start gap-3 relative flex-wrap">
        {techStack.map((tech, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-purple-900/30 text-gray-300 hover:bg-purple-900/50 border border-purple-500/30 transition-colors duration-200 px-3 py-1 font-semibold "
          >
            {tech}
          </Badge>
        ))}
      </CardContent>

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
          {link && link.length > 0 ? (
            <div className="flex flex-wrap gap-3">
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
