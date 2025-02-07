import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type AchievementCardProps = {
  title: string;
  description: string;
  metrics: string;
  techs: string[];
};

export const AchievementCard = ({ title, description, metrics, techs }: AchievementCardProps) => {
  return (
    <Card className="min-h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Key Metrics</h4>
          <p className="text-sm text-muted-foreground">{metrics}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech, techIndex) => (
            <Badge key={techIndex} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
