import React, { useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const Icon = useMemo(() => {
    return theme === "light" ? (
      <Moon className="h-6 w-6 scale-90 text-muted-foreground transition-all duration-300 group-hover:scale-100 group-hover:text-foreground" />
    ) : (
      <Sun className="h-6 w-6 scale-90 text-muted-foreground transition-all duration-300 group-hover:scale-100 group-hover:text-foreground" />
    );
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="group z-50"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {Icon}
    </Button>
  );
};

export default ThemeToggle;
