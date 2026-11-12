import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, TrainerGrid, TrialBand } from "@/components/site/Sections";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/trainers")({
  head: () =>
    pageHead(
      "Coaches",
      "Meet the strength, personal training and conditioning coaches behind MEGA GYM.",
    ),
  component: Trainers,
});
function Trainers() {
  return (
    <>
      <PageIntro
        number="02"
        title="People who raise your bar."
        description="Good equipment matters. Great coaching changes everything. Meet the people in your corner."
      />
      <section className="section-shell !pt-4">
        <TrainerGrid />
      </section>
      <TrialBand />
    </>
  );
}
