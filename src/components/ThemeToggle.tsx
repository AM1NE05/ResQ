import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const { theme, toggleTheme } = useTheme();
  const cls =
    variant === "dark"
      ? "text-navy-foreground hover:bg-white/10"
      : "text-foreground hover:bg-accent";

  return (
    <button
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className={`inline-flex items-center justify-center rounded-full p-1.5 transition ${cls}`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
