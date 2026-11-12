import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowRight, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programs, trainers, plans, inr, faqs, stories } from "@/config/gym";
import { useEnquiry } from "./Enquiry";
import { useState, type ReactNode } from "react";
import { Reveal, Tilt } from "./Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { nextGalleryIndex } from "@/lib/demo-rules";

export function PageIntro({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <header className="section-shell page-intro route-enter">
      <p className="eyebrow mb-5">MEGA GYM / {number} · Illustrative demo</p>
      <h1 className="display-lg">{title}</h1>
      <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{description}</p>
    </header>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="display-lg">{title}</h2>
      </div>
      {children}
    </Reveal>
  );
}
export function ProgramGrid({ limit }: { limit?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {programs.slice(0, limit).map((p, i) => (
        <Reveal key={p.slug} delay={i * 60}>
          <Tilt max={3}>
            <Link
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="group block h-full overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-background/90 px-3 py-1 font-mono text-xs">
                  0{i + 1} / {p.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display-md">{p.name}</h3>
                  <ArrowUpRight className="size-6 shrink-0 text-primary" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                <p className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
                  {p.level} · {p.format}
                </p>
              </div>
            </Link>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}
export function TrainerGrid() {
  const crop = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${((e.clientX - r.left) / r.width - 0.5) * 14}px`);
    el.style.setProperty("--cy", `${((e.clientY - r.top) / r.height - 0.5) * 10}px`);
  };
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {trainers.map((t, i) => (
        <Reveal key={t.slug} delay={i * 80}>
          <Tilt max={3}>
            <Link to="/trainers/$slug" params={{ slug: t.slug }} className="group block">
              <div
                className="trainer-frame relative aspect-[4/5] overflow-hidden"
                onPointerMove={crop}
                onPointerLeave={(e) => {
                  e.currentTarget.style.setProperty("--cx", "0px");
                  e.currentTarget.style.setProperty("--cy", "0px");
                }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="trainer-photo h-full w-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-primary px-3 py-2 font-mono text-xs text-primary-foreground">
                  Demo trainer · {t.years} yrs
                </span>
              </div>
              <div className="mt-5 flex justify-between">
                <div>
                  <h3 className="display-md transition-colors group-hover:text-primary">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm text-primary">{t.role}</p>
                </div>
                <ArrowUpRight className="size-6" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.intro}</p>
              <p className="eyebrow mt-4">Illustrative coach / View profile ↗</p>
            </Link>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}

/** Fictional member stories — slider with active emphasis, controls and progress. */
export function StorySlider() {
  const [index, setIndex] = useState(0);
  const move = (d: number) => setIndex((i) => nextGalleryIndex(i, d, stories.length));
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Illustrative member stories"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        }
      }}
    >
      <div className="grid gap-8 md:grid-cols-3">
        {stories.map((s, i) => (
          <blockquote
            key={s.name}
            aria-hidden={i !== index}
            onClick={() => setIndex(i)}
            className={`story-card border-t-2 pt-6 transition-all duration-500 ${i === index ? "border-primary opacity-100 md:-translate-y-2" : "cursor-pointer border-border opacity-45 hover:opacity-75"}`}
          >
            <p className="text-primary" aria-label="5 out of 5 stars">
              ★★★★★
            </p>
            <p className="mt-5 leading-relaxed">“{s.quote}”</p>
            <footer className="mt-6 text-sm">
              {s.name}
              <span className="mt-1 block text-xs text-muted-foreground">
                {s.meta} · Illustrative member story
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <Button variant="line" size="icon" aria-label="Previous story" onClick={() => move(-1)}>
          <ArrowLeft />
        </Button>
        <p className="font-mono text-xs" aria-live="polite">
          {index + 1} / {stories.length}
        </p>
        <Button variant="line" size="icon" aria-label="Next story" onClick={() => move(1)}>
          <ArrowRight />
        </Button>
        <div className="hero-progress" aria-hidden>
          {stories.map((s, i) => (
            <span key={s.name} className={i === index ? "is-active" : ""} />
          ))}
        </div>
      </div>
    </div>
  );
}
export function PlanGrid() {
  const { open } = useEnquiry();
  const [selected, setSelected] = useState("performance");
  return (
    <>
      <p className="eyebrow mb-7">Illustrative pricing / No purchases or payments</p>
      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.id}
            className={`plan-card relative flex min-w-0 flex-col rounded-sm border p-6 ${selected === p.id ? "border-primary bg-elevated" : "border-border bg-card"}`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="display-md">{p.name}</h3>
              <Button
                variant={selected === p.id ? "default" : "line"}
                size="icon"
                aria-label={`Select ${p.name}`}
                aria-pressed={selected === p.id}
                onClick={() => setSelected(p.id)}
              >
                <Check className={selected === p.id ? "opacity-100" : "opacity-25"} />
              </Button>
            </div>
            <p className="mt-6 font-display text-5xl font-bold">
              {inr(p.price)}
              <span className="block font-sans text-xs font-normal text-muted-foreground">
                sample price / month
              </span>
            </p>
            <p className="mt-4 min-h-12 text-sm text-muted-foreground">{p.tagline}</p>
            <ul className="my-7 grid gap-4 border-t border-border pt-7">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="size-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <details className="mb-6 text-xs text-muted-foreground">
              <summary className="cursor-pointer py-2">Sample conditions & exclusions</summary>
              <p className="mt-3 leading-relaxed">{p.conditions}</p>
              {p.excluded.length > 0 && (
                <p className="mt-3">Not included: {p.excluded.join(", ")}</p>
              )}
            </details>
            <Button
              variant={selected === p.id ? "hero" : "line"}
              size="xl"
              className="mt-auto whitespace-normal"
              onClick={() => {
                setSelected(p.id);
                open({ context: `${p.name} membership — ${inr(p.price)}/month (demo)` });
              }}
            >
              Explore {p.name}
              <ArrowUpRight />
            </Button>
          </article>
        ))}
      </div>
      <div className="mt-7 border-l-2 border-primary pl-5" aria-live="polite">
        <p className="font-semibold">{plans.find((p) => p.id === selected)?.name} selected</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {plans.find((p) => p.id === selected)?.features.join(" · ")}
        </p>
      </div>
    </>
  );
}
export function FAQSection() {
  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Before you explore" title="Good questions." />
      <Accordion type="single" collapsible className="max-w-4xl">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={String(i)}>
            <AccordionTrigger className="py-6 text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="max-w-3xl leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
export function TrialBand() {
  const { open } = useEnquiry();
  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="section-shell flex flex-wrap items-center justify-between gap-8">
        <div>
          <p className="mb-4 font-mono text-xs uppercase">Your next chapter starts here</p>
          <h2 className="display-lg">Show up. Get stronger.</h2>
          <p className="mt-4">
            Explore the possibilities. A concept experience by MAGAF Technologies.
          </p>
        </div>
        <Button
          variant="line"
          size="xl"
          className="border-primary-foreground text-primary-foreground hover:border-primary-foreground hover:text-primary-foreground"
          onClick={() => open()}
        >
          Explore a demo trial
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
