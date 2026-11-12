import { createFileRoute } from "@tanstack/react-router";
import { FacilityShowcase } from "@/components/site/FacilityShowcase";
import { PageIntro, TrialBand } from "@/components/site/Sections";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/facilities")({
  head: () =>
    pageHead(
      "Facilities",
      "Explore the training floor, strength zone, conditioning turf and recovery spaces at MEGA GYM.",
    ),
  component: Facilities,
});
function Facilities() {
  return (
    <>
      <PageIntro
        number="05"
        title="Room to become stronger."
        description="An illustrative tour of strength spaces, conditioning zones and recovery. A vision for your future gym."
      />
      <section className="section-shell !pt-4">
        <FacilityShowcase />
      </section>
      <TrialBand />
    </>
  );
}
