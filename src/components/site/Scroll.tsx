import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/config/gym";

/** Writes element scroll progress (0 entering bottom → 1 leaving top) to the --p CSS variable. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0.5");
      el.dataset["static"] = "";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

/** Scene 02 — word-by-word manifesto lit by scroll progress, with layered depth images. */
export function Manifesto({ text, eyebrow }: { text: string; eyebrow: string }) {
  const ref = useScrollProgress<HTMLElement>();
  const words = text.split(" ");
  return (
    <section ref={ref} className="manifesto relative overflow-hidden border-y border-border">
      <img
        src={images.floor}
        alt=""
        aria-hidden
        loading="lazy"
        className="manifesto-layer manifesto-back absolute object-cover"
      />
      <img
        src={images.hero}
        alt=""
        aria-hidden
        loading="lazy"
        className="manifesto-layer manifesto-front absolute object-cover"
      />
      <div className="section-shell relative z-10">
        <p className="eyebrow mb-8">{eyebrow}</p>
        <p className="manifesto-text font-display font-extrabold uppercase" aria-label={text}>
          {words.map((w, i) => (
            <span
              key={i}
              aria-hidden
              className="manifesto-word"
              style={{ "--i": i / words.length } as React.CSSProperties}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/** Scene 07 — closing CTA with a scroll-zoomed image. */
export function FinalScene({ onEnquire }: { onEnquire: () => void }) {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section
      ref={ref}
      className="final-scene relative flex min-h-[80vh] items-center overflow-hidden"
    >
      <img
        src={images.hero}
        alt=""
        aria-hidden
        loading="lazy"
        className="final-img absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-scrim absolute inset-0" />
      <div className="section-shell relative z-10 w-full on-image">
        <p className="eyebrow mb-5 !text-primary">07 / Your next level</p>
        <h2 className="final-title display-xl max-w-3xl">
          Your next level
          <br />
          <span className="text-primary">starts here.</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onEnquire}
            className="inline-flex h-14 items-center gap-2 bg-primary px-8 font-semibold uppercase text-primary-foreground"
          >
            Start a demo trial
            <ArrowUpRight className="size-4" />
          </button>
          <Link
            to="/memberships"
            className="inline-flex h-14 items-center gap-2 border border-current px-8 font-semibold uppercase"
          >
            Compare plans
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase opacity-70">
          Simulated enquiry · no data is sent
        </p>
      </div>
    </section>
  );
}

/** Desktop-only cursor ring that grows over interactive targets. */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const el = ref.current;
    if (!el) return;
    let x = -100,
      y = -100,
      cx = x,
      cy = y,
      raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      const t = (e.target as Element | null)?.closest?.("a, button, [data-cursor]");
      el.dataset["mode"] = t ? (t.getAttribute("data-cursor") ?? "link") : "";
    };
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className="cursor-ring" aria-hidden>
      <span>Drag</span>
    </div>
  );
}
