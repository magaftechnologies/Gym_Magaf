import { createFileRoute } from "@tanstack/react-router";
import { owner, images } from "@/config/gym";
import { PageIntro, TrialBand } from "@/components/site/Sections";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/our-story")({
  head: () =>
    pageHead(
      "Our story",
      "The story and coaching philosophy behind MEGA GYM, imagined by MAGAF Technologies.",
    ),
  component: Story,
});
function Story() {
  return (
    <>
      <PageIntro
        number="07"
        title="Built on the basics."
        description="A serious training hall. A shared belief in consistent work. A community that gets stronger together."
      />
      <section className="section-shell !pt-4 grid items-center gap-12 md:grid-cols-2">
        <img src={owner.image} alt={owner.name} className="aspect-[4/5] w-full object-cover" />
        <div>
          <p className="eyebrow mb-5">A concept by MAGAF Technologies</p>
          <h2 className="display-lg">The room we wanted to train in.</h2>
          <p className="mt-7 leading-relaxed text-muted-foreground">{owner.story}</p>
          <blockquote className="mt-8 border-l-2 border-primary pl-6 text-xl leading-relaxed">
            “{owner.message}”
          </blockquote>
          <p className="mt-6 text-primary">
            {owner.name} / {owner.role}
          </p>
        </div>
      </section>
      <section className="bg-surface">
        <div className="section-shell">
          <h2 className="display-lg">Strength. Discipline. Evolution.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              [
                "Strength",
                "Master the foundations. Build capacity that carries beyond the training floor.",
              ],
              [
                "Discipline",
                "Keep showing up. We provide the structure, coaching and accountability.",
              ],
              [
                "Evolution",
                "Measure what matters. Adapt your plan as your goals and confidence grow.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-primary pt-6">
                <h3 className="display-md">{t}</h3>
                <p className="mt-5 leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <img
            src={images.floor}
            alt="MEGA GYM training space"
            loading="lazy"
            className="mt-12 aspect-[3/1] w-full object-cover"
          />
        </div>
      </section>
      <TrialBand />
    </>
  );
}
