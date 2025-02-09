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
        "group relative min-h-[300px] flex flex-col transition-all duration-300 hover:shadow-lg",
        "border-l-4 border-l-transparent hover:border-l-blue-500",
        className
      )}
    >
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <CardTitle
            className={cn(
              "flex items-center justify-between group-hover:text-blue-500 transition-colors",
              link && link.length > 0 && "cursor-pointer"
            )}
            onClick={() => {
              window.open(link?.[0], "_blank");
            }}
          >
            {title}
            {link && link.length > 0 && (
              <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between space-y-4">
        {metrics && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <BarChart className="w-4 h-4" />
              <h4>Key Metrics</h4>
            </div>
            <p className="text-sm text-muted-foreground pl-6">{metrics}</p>
          </div>
        )}

        <div className="space-y-3">
          {link ? (
            <div className="flex flex-wrap gap-3">
              {link.map((url, index) => (
                <a
                  key={index}
                  className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-700 transition-colors"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Link className="w-4 h-4" />
                  {`Link ${index === 0 ? "" : index + 1}`}
                </a>
              ))}
              {linkAdditionalText && (
                <span className="text-sm text-gray-500">{linkAdditionalText}</span>
              )}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">{disclaimer}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
