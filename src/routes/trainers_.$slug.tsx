import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { trainers } from "@/config/gym";
import { pageHead } from "@/lib/page-head";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/site/Enquiry";
import { ArrowLeft } from "lucide-react";
export const Route = createFileRoute("/trainers_/$slug")({
  loader: ({ params }) => {
    const trainer = trainers.find((t) => t.slug === params.slug);
    if (!trainer) throw notFound();
    return trainer;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData?.name ?? "Coach unavailable",
      loaderData?.intro ?? "Meet the MEGA GYM coaching team.",
    ),
  component: TrainerDetail,
});
function TrainerDetail() {
  const t = Route.useLoaderData();
  const { open } = useEnquiry();
  return (
    <section className="section-shell page-intro">
      <Button asChild variant="link" className="mb-8 !px-0">
        <Link to="/trainers">
          <ArrowLeft />
          All coaches
        </Link>
      </Button>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <img src={t.image} alt={t.name} className="aspect-[4/5] w-full object-cover" />
        <div>
          <p className="eyebrow mb-5">Illustrative coach / {t.years} sample years</p>
          <h1 className="display-lg">{t.name}</h1>
          <p className="mt-6 text-lg text-primary">{t.intro}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t.bio}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Fictional profile and sample credentials. Imagery illustrates a concept, not a verified
            employee.
          </p>
          <h2 className="display-md mt-8">Specialties</h2>
          <ul className="mt-4 grid gap-2 text-muted-foreground">
            {t.specialties.map((s) => (
              <li key={s}>— {s}</li>
            ))}
          </ul>
          <h2 className="display-md mt-8">Qualifications</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {t.qualifications.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <h2 className="display-md mt-8">Coaching philosophy</h2>
          <blockquote className="mt-4 border-l-2 border-primary pl-5 text-lg">
            “{t.philosophy}”
          </blockquote>
          <Button
            variant="hero"
            size="xl"
            className="mt-8"
            onClick={() => open({ context: `Coaching with ${t.name}` })}
          >
            Train with {t.name.split(" ")[0]}
          </Button>
        </div>
      </div>
    </section>
  );
}
