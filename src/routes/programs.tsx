import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ProgramGrid, TrialBand } from "@/components/site/Sections";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/programs")({
  head: () =>
    pageHead(
      "Programs",
      "Find strength training, personal coaching, HIIT, functional fitness and recovery at MEGA GYM.",
    ),
  component: Programs,
});
function Programs() {
  return (
    <>
      <PageIntro
        number="01"
        title="Find your discipline."
        description="Different starting points. The same commitment to progress. Six ways to train, with coaching at the heart of every one."
      />
      <section className="section-shell !pt-4">
        <ProgramGrid />
      </section>
      <TrialBand />
    </>
  );
}
