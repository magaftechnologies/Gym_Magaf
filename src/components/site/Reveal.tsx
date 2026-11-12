import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (setIn(true), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any;
  return (
    <T ref={ref} style={style} className={cn("reveal", inView && "is-in", className)}>
      {children}
    </T>
  );
}

/** Card that tilts toward the cursor for subtle 3D depth (desktop pointers only). */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (
      e.pointerType !== "mouse" ||
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "transition-transform duration-300 ease-out [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1000);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref}>
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn("mb-12 grid gap-6 md:grid-cols-[1fr_minmax(0,28rem)] md:items-end", className)}
    >
      <div>
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <h2 className="display-lg">{title}</h2>
      </div>
      {intro && <p className="text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
}) {
  return (
    <section className="relative grain overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
      <img
        src={image}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 hero-scrim" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 on-image">
        <p className="eyebrow rise mb-5 flex items-center gap-3 !text-[oklch(0.85_0_0)]">
          <span className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <h1 className="display-xl rise max-w-4xl" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        <p className="rise mt-6 max-w-xl text-lg opacity-85" style={{ animationDelay: "160ms" }}>
          {intro}
        </p>
      </div>
    </section>
  );
}
