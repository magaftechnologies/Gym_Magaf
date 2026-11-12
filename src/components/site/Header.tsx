import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Palette, X, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { gym, nav } from "@/config/gym";
import { themes, useTheme } from "@/lib/theme";
import { useEnquiry } from "./Enquiry";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={`${gym.name} home`}
    >
      <span className="grid size-9 place-items-center bg-primary text-primary-foreground transition-transform duration-500 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] group-hover:rotate-[60deg]">
        <span className="font-display text-sm font-black">MG</span>
      </span>
      <span className="font-display text-xl font-extrabold uppercase tracking-wide">
        {gym.short}
      </span>
    </Link>
  );
}

function ThemePicker() {
  const { theme, setTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full border border-border hover:border-primary hover:text-primary"
          aria-label="Choose theme"
        >
          <Palette className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 border-border bg-popover p-2">
        <p className="eyebrow px-2 py-2">Demo themes</p>
        {themes.map((t) => (
          <Button
            variant="ghost"
            key={t.id}
            onClick={() => setTheme(t.id)}
            aria-pressed={theme === t.id}
            className={cn(
              "flex h-auto w-full items-center gap-3 whitespace-normal rounded-[var(--radius)] p-2 text-left hover:bg-muted",
              theme === t.id && "bg-muted",
            )}
          >
            <span
              className="relative size-9 shrink-0 overflow-hidden rounded-full border border-border"
              style={{ background: t.swatch[0] }}
            >
              <span
                className="absolute bottom-0 right-0 size-4 rounded-tl-full"
                style={{ background: t.swatch[1] }}
              />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">{t.name}</span>
              <span className="block text-xs text-muted-foreground">{t.desc}</span>
            </span>
            {theme === t.id && <Check className="size-4 text-primary" />}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: enquire } = useEnquiry();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && open) {
        const nodes = menuRef.current?.querySelectorAll<HTMLElement>("a, button");
        const first = nodes?.[0];
        const last = nodes?.[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
      if (open) triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <div className="relative z-50 overflow-hidden bg-primary px-3 py-2 text-primary-foreground">
        <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.2em]">
          {gym.announcement}
        </p>
      </div>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-8 z-40 transition-all duration-500",
          scrolled && "is-scrolled top-0 border-b border-border bg-background/80 backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8 transition-all",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground data-[status=active]:text-foreground [&[data-status=active]>span]:scale-x-100"
              >
                {n.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemePicker />
            <Button
              variant="hero"
              size="lg"
              className="hidden sm:inline-flex"
              onClick={() => enquire()}
            >
              Demo trial
            </Button>
            <Button
              ref={triggerRef}
              variant="ghost"
              size="icon"
              className="size-11 rounded-full border border-border lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        className={cn(
          "mobile-drawer fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-background transition-all duration-300 lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-5">
          <Logo className="[&>span:last-child]:text-base" />
          <Button
            variant="ghost"
            size="icon"
            className="size-10 rounded-full border border-border"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>
        <p className="eyebrow px-5 pt-2">Menu</p>
        <nav className="flex flex-col px-5 pt-3 pb-8" aria-label="Mobile">
          {[
            ...nav,
            { to: "/our-story", label: "Our Story" },
            { to: "/community", label: "Community" },
          ].map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex min-h-11 items-center justify-between border-b border-border py-2.5 font-display text-[1.125rem] font-bold uppercase leading-tight transition data-[status=active]:text-primary",
                open && "rise",
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {n.label}
            </Link>
          ))}
          <Button
            variant="hero"
            size="lg"
            className="mt-6 text-[0.8rem]"
            onClick={() => {
              setOpen(false);
              enquire();
            }}
          >
            Explore a demo trial
          </Button>
        </nav>
      </div>
    </>
  );
}
