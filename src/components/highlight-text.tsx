import { cn } from "@/lib/utils";

type Props = {
  text: string;
  weight?: "medium" | "semibold" | "bold";
  tag?: "span" | "h3";
  size?: "regular" | "lg" | "xl";
};

// Highlighter-marker emphasis on the paper canvas — amber wash, ink text.
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
        "box-decoration-clone rounded-[3px] bg-amber-soft px-1 text-ink",
        weight === "bold" && "font-bold",
        weight === "semibold" && "font-semibold",
        weight === "medium" && "font-medium",
        size === "lg" && "text-lg",
        size === "xl" && "text-xl"
      )}
    >
      {text}
    </Tag>
  );
}
