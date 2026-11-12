import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gym, heroSlides } from "@/config/gym";
import { useTheme } from "@/lib/theme";
import { nextGalleryIndex } from "@/lib/demo-rules";

const Sculpture = lazy(() => import("./Dumbbell3D"));
const AUTOPLAY_MS = gym.heroAutoplayMs;

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef(0);
  const touchX = useRef<number | null>(null);
  const [colors, setColors] = useState({ metal: "", dark: "", accent: "" });
  const { theme } = useTheme();
  const slide = heroSlides[index] ?? heroSlides[0]!;

  const go = useCallback(
    (d: number) => setIndex((i) => nextGalleryIndex(i, d, heroSlides.length)),
    [],
  );

  // Environment: reduced motion, WebGL support, viewport visibility, scroll parallax.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const canvas = document.createElement("canvas");
    try {
      const context = canvas.getContext("webgl2");
      setWebgl(!!context && window.matchMedia("(min-width: 768px)").matches);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setWebgl(false);
    }
    const el = ref.current;
    let visible = true;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      sync();
    });
    if (el) observer.observe(el);
    const scroll = () => {
      if (!el) return;
      const progress = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / el.offsetHeight));
      el.style.setProperty("--hero-scroll", `${media.matches ? 0 : progress * 35}px`);
      el.style.setProperty("--hero-p", `${media.matches ? 0 : progress}`);
      scrollRef.current = media.matches ? 0 : progress;
    };
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  // Theme-aware 3D material colors.
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const probe = document.createElement("span");
    probe.style.color = "var(--primary)";
    document.body.append(probe);
    const color = getComputedStyle(probe).color;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
    }
    const pixel = ctx?.getImageData(0, 0, 1, 1).data;
    const accent = pixel
      ? `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
      : css.getPropertyValue("--metal-a").trim();
    probe.remove();
    setColors({
      metal: css.getPropertyValue("--metal-a").trim(),
      dark: css.getPropertyValue("--metal-b").trim(),
      accent,
    });
  }, [theme]);

  // Intelligent autoplay: pauses on interaction, hidden tab, reduced motion.
  useEffect(() => {
    if (reduced || paused || !active) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, active, go]);

  const pointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--hero-x", `${((e.clientX - r.left) / r.width - 0.5) * 12}px`);
    ref.current.style.setProperty("--hero-y", `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <section
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="MEGA GYM highlights"
      tabIndex={0}
      className="home-hero mega-hero relative flex items-end overflow-hidden"
      onPointerMove={pointer}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        ref.current?.style.setProperty("--hero-x", "0px");
        ref.current?.style.setProperty("--hero-y", "0px");
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKey}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const x = e.changedTouches[0]?.clientX;
        if (touchX.current !== null && x !== undefined && Math.abs(x - touchX.current) > 50)
          go(x < touchX.current ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Layered slide backgrounds — crossfade + slow scale settle, no hard cuts */}
      {heroSlides.map((s, i) => (
        <img
          key={s.id}
          src={s.image}
          alt={i === index ? s.alt : ""}
          aria-hidden={i !== index}
          width={1920}
          height={1088}
          fetchPriority={i === 0 ? "high" : "auto"}
          loading={i === 0 ? "eager" : "lazy"}
          className={`hero-photo absolute inset-0 h-full w-full object-cover object-[65%_center] ${i === index ? "is-active" : ""}`}
        />
      ))}
      <div className="hero-scrim absolute inset-0" />

      <div className="hero-copy section-shell relative z-10 w-full !pb-9 !pt-36 on-image">
        <div key={slide.id} aria-live="polite">
          <p className="hero-enter mb-5 flex items-center gap-3 font-mono text-xs uppercase">
            <span className="h-px w-8 bg-primary" />
            {slide.kicker} · Fitness website demo / MAGAF Technologies
          </p>
          <h1 className="hero-title hero-enter">
            {gym.name}
            <span className="block text-primary">
              {slide.title}
              <br />
              {slide.accent}
            </span>
          </h1>
          <p className="hero-enter mt-6 max-w-md text-sm leading-relaxed opacity-85">
            {slide.copy}
          </p>
          <div className="hero-enter mt-7 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to={slide.to as "/programs"}>
                {slide.cta}
                <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/memberships">
                Discover Memberships
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-9 flex items-center justify-between gap-4 border-t border-border pt-5">
          <div className="flex items-center gap-4">
            <Button variant="glass" size="icon" aria-label="Previous slide" onClick={() => go(-1)}>
              <ArrowLeft />
            </Button>
            <Button variant="glass" size="icon" aria-label="Next slide" onClick={() => go(1)}>
              <ArrowRight />
            </Button>
            <p className="whitespace-nowrap font-mono text-[10px] uppercase" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </p>
            <div className="hero-progress" aria-hidden>
              {heroSlides.map((s, i) => (
                <span key={s.id} className={i === index ? "is-active" : ""}>
                  {i === index && !reduced && !paused && active && (
                    <i key={`${index}-bar`} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}: ${s.kicker}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={`hero-dot ${i === index ? "is-active" : ""}`}
              />
            ))}
            <a
              href="#training"
              className="flex size-11 items-center justify-center"
              aria-label="Explore training below"
            >
              <ArrowDown className="size-5" />
            </a>
          </div>
        </div>
      </div>

      {webgl && colors.metal && (
        <div className="hero-sculpture" data-scene-ready={ready || undefined}>
          <SceneBoundary>
            <ClientOnly>
              <Suspense fallback={null}>
                <Sculpture
                  active={active}
                  reduced={reduced}
                  rotation={rotation}
                  scroll={scrollRef}
                  colors={colors}
                  onReady={() => setReady(true)}
                />
              </Suspense>
            </ClientOnly>
          </SceneBoundary>
          {ready && (
            <p className="hero-drag-hint font-mono text-[10px] uppercase on-image">
              Drag to rotate · 3D
            </p>
          )}
          {ready && (
            <Button
              variant="glass"
              size="icon"
              className="absolute bottom-2 right-2"
              aria-label="Rotate dumbbell"
              title="Rotate dumbbell"
              onClick={() => setRotation((r) => r + Math.PI / 2)}
            >
              <RotateCw />
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
