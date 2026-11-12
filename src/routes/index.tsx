import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, MoveUpRight } from "lucide-react";
import { gym, images, owner } from "@/config/gym";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/site/Enquiry";
import {
  SectionHeading,
  ProgramGrid,
  TrainerGrid,
  PlanGrid,
  FAQSection,
  StorySlider,
} from "@/components/site/Sections";
import { Hero } from "@/components/site/Hero";
import { CountUp, Reveal } from "@/components/site/Reveal";
import { FacilityShowcase } from "@/components/site/FacilityShowcase";
import { Manifesto, FinalScene } from "@/components/site/Scroll";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Home",
      "Explore MEGA GYM, a fictional cinematic fitness concept by MAGAF Technologies with illustrative training, coaches and memberships.",
    ),
  component: Index,
});
function Index() {
  const { open } = useEnquiry();
  return (
    <>
      <Hero />
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-8 md:grid-cols-4">
          {gym.stats.map((s) => (
            <div
              key={s.label}
              className="border-border py-4 text-center md:border-r md:last:border-0"
            >
              <p className="font-display text-4xl font-extrabold">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="eyebrow mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Manifesto
        eyebrow="02 / Built by discipline"
        text="Strength is not given. It is built rep by rep, day by day, by people who keep showing up."
      />
      <section id="training" className="section-shell">
        <SectionHeading
          eyebrow="03 / Strength in motion · Find your discipline"
          title="One goal. Your way."
        >
          <Button asChild variant="line">
            <Link to="/programs">
              All programs
              <ArrowUpRight />
            </Link>
          </Button>
        </SectionHeading>
        <ProgramGrid limit={3} />
      </section>
      <section className="border-y border-border bg-surface">
        <div className="section-shell grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <img
              src={images.floor}
              alt="Spacious gym equipment and strength racks"
              loading="lazy"
              className="aspect-[5/4] w-full object-cover"
            />
            <span className="absolute bottom-5 left-5 bg-primary px-4 py-2 font-mono text-xs text-primary-foreground">
              ILLUSTRATIVE TRAINING SPACE.
            </span>
          </div>
          <div>
            <p className="eyebrow mb-5">Not just another gym</p>
            <h2 className="display-lg">
              A training ground.
              <br />
              <span className="text-primary">For your next level.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              A vision of purposeful training. Strength spaces, expert-led sessions and recovery,
              brought together in one fictional fitness concept.
            </p>
            <Button asChild variant="line" className="mt-8">
              <Link to="/facilities">
                Explore the spaces
                <MoveUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="section-shell">
        <SectionHeading eyebrow="04 / People behind the progress" title="Coached. Not left alone.">
          <Button asChild variant="line">
            <Link to="/trainers">
              Meet the team
              <ArrowUpRight />
            </Link>
          </Button>
        </SectionHeading>
        <TrainerGrid />
      </section>
      <section className="border-y border-border bg-surface">
        <div className="section-shell">
          <SectionHeading
            eyebrow="06 / Choose your level · Invest in yourself"
            title="Your commitment. Your plan."
          />
          <PlanGrid />
        </div>
      </section>
      <section className="section-shell grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
        <img
          src={owner.image}
          alt={owner.name}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <div>
          <p className="eyebrow mb-5">An illustrative coaching philosophy</p>
          <blockquote className="font-display text-3xl font-semibold leading-tight md:text-4xl">
            “{owner.philosophy}”
          </blockquote>
          <p className="mt-6 text-primary">
            {owner.name} <span className="text-muted-foreground">/ {owner.role}</span>
          </p>
          <Button asChild variant="line" className="mt-8">
            <Link to="/our-story">
              Our story
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="bg-surface">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Illustrative stories. Consistent work."
            title="Stronger together."
          />
          <StorySlider />
        </div>
      </section>
      <section className="section-shell">
        <SectionHeading eyebrow="05 / Space to progress" title="The floor is yours." />
        <FacilityShowcase />
      </section>
      <FAQSection />
      <FinalScene onEnquire={() => open()} />
    </>
  );
}
