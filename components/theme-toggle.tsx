"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun01Icon, Moon01Icon } from "@hugeicons/core-free-icons";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`size-9 text-gray-700 dark:text-gray-300 ${className ?? ""}`}
        aria-label="Toggle theme"
      >
        <span className="size-5" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`size-9 text-gray-700 dark:text-gray-300 hover:text-blue-950 dark:hover:text-white transition-colors cursor-pointer ${className ?? ""}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme (Hotkey: D)" : "Switch to dark theme (Hotkey: D)"}
    >
      {isDark ? (
        <HugeiconsIcon icon={Sun01Icon} className="size-5 text-amber-400" />
      ) : (
        <HugeiconsIcon icon={Moon01Icon} className="size-5 text-gray-700" />
      )}
    </Button>
  );
}
