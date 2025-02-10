import { Code2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const TechCard = ({ skillGroup }: { skillGroup: { category: string; items: string[] } }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 border border-purple-900/50 bg-black/40 backdrop-blur-lg hover:bg-black/60 hover:shadow-lg hover:shadow-purple-500/10 min-h-[180px]">
      {/* Top gradient line animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-pink-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="pb-3 relative">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
            {skillGroup.category}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className="flex flex-wrap gap-2">
          {skillGroup.items.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-purple-900/30 text-gray-300 hover:bg-purple-900/50 border border-purple-500/30 transition-colors duration-200 px-3 py-1 font-semibold"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
