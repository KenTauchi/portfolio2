import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  description: string;
  metrics: string;
  //   techs: string[];
  link: string[] | null;
  disclaimer: string | null;
  linkadditionalText?: string;
  className?: string;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { title, description, metrics, link, disclaimer, linkadditionalText, className } = props;
  return (
    <Card className={cn("min-h-[300px] flex flex-col cursor-pointer", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-row gap-2">
          {link ? (
            link.map((link, index) => (
              <a
                key={index}
                className="text-sm text-blue-500"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                Link {index === 0 ? "" : index + 1}
              </a>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">
              {disclaimer} {linkadditionalText && linkadditionalText}
            </p>
          )}
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Key Metrics</h4>
          <p className="text-sm text-muted-foreground">{metrics}</p>
        </div>
      </CardContent>
    </Card>
  );
};
