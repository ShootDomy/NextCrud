"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

export function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Cambiar modo"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white dark:bg-gray-800 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={toggleTheme}
    >
      <SunIcon
        className={`h-5 w-5 text-yellow-500 transition-all ${
          theme === "dark" ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      />
      <MoonIcon
        className={`absolute h-5 w-5 text-gray-700 dark:text-gray-200 transition-all ${
          theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      />
      <span className="sr-only">Cambiar modo</span>
    </button>
  );
}
