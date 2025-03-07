import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  text: string;
  weight?: "semibold" | "bold";
  tag?: "span" | "h3";
  size: "regular" | "lg" | "xl";
};
export default function HighlightText({
  text,
  weight = "semibold",
  tag = "span",
  size = "regular",
}: Props) {
  const Tag = tag;
  return (
    <Tag
      className={cn(
        "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400",
        `font-${weight}`,
        {
          "text-lg": size === "lg",
          "text-xl": size === "xl",
        }
      )}
    >
      {text}
    </Tag>
  );
}
