import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/Gallery";
import { gallery, stories, achievements } from "@/config/gym";
import { PageIntro, SectionHeading, TrialBand } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/community")({
  head: () =>
    pageHead(
      "Community",
      "Meet the MEGA GYM community, explore member stories and see life on the training floor.",
    ),
  component: Community,
});
function Community() {
  return (
    <>
      <PageIntro
        number="08"
        title="More than a membership."
        description="Illustrative member stories, shared sessions and imagined milestones. The community a gym can create."
      />
      <section className="section-shell !pt-4">
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((s) => (
            <blockquote key={s.name} className="border-t-2 border-primary pt-6">
              <p className="text-lg leading-relaxed">“{s.quote}”</p>
              <p className="mt-6 text-primary">{s.name}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.meta} · Illustrative story</p>
            </blockquote>
          ))}
        </div>
      </section>
      <section className="bg-surface">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Inside MEGA GYM / Concept photography"
            title="The work. The people."
          />
          <Gallery />
        </div>
      </section>
      <section className="section-shell">
        <SectionHeading
          eyebrow="Illustrative milestones, not verified achievements"
          title="Imagine the progress."
        />
        {achievements.map((a) => (
          <div
            key={a.title}
            className="flex flex-wrap items-center gap-6 border-b border-border py-6"
          >
            <span className="font-display text-3xl text-primary">{a.year}</span>
            <h3 className="min-w-0 flex-1 text-lg">{a.title}</h3>
            <span className="eyebrow">{a.kind}</span>
          </div>
        ))}
      </section>
      <TrialBand />
    </>
  );
}
