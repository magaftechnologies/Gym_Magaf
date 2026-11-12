import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { gym, type ThemeId } from "@/config/gym";

export const themes: { id: ThemeId; name: string; desc: string; swatch: [string, string] }[] = [
  {
    id: "obsidian",
    name: "Obsidian Performance",
    desc: "Charcoal, lime, cinematic",
    swatch: ["#111315", "#B8FF3B"],
  },
  {
    id: "platinum",
    name: "Platinum Luxury",
    desc: "Ivory, graphite, bronze",
    swatch: ["#F6F2EA", "#A8834F"],
  },
  {
    id: "volt",
    name: "Volt Athletics",
    desc: "Navy, electric blue",
    swatch: ["#0E1730", "#3AA0FF"],
  },
  {
    id: "earth",
    name: "Earth & Wellness",
    desc: "Stone, forest green",
    swatch: ["#EFE8DC", "#2F6B47"],
  },
];

const Ctx = createContext<{ theme: ThemeId; setTheme: (t: ThemeId) => void }>({
  theme: gym.defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(gym.defaultTheme);
  useEffect(() => {
    const saved = localStorage.getItem("gym-theme") as ThemeId | null;
    if (saved && themes.some((t) => t.id === saved)) setThemeState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
  }, [theme]);
  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    localStorage.setItem("gym-theme", t);
  };
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
