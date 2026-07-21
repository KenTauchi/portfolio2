import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

// Light/dark toggle. The initial theme is set before paint by the inline
// script in _document.tsx (reading localStorage → system preference), so this
// only mirrors and updates the <html data-theme> attribute.
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("pf-theme", next);
    } catch {
      /* localStorage unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-colors hover:border-brand/60 hover:text-brand",
        className
      )}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
