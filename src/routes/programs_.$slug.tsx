import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft } from "lucide-react";
import { programs, trainers } from "@/config/gym";
import { pageHead } from "@/lib/page-head";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/site/Enquiry";
export const Route = createFileRoute("/programs_/$slug")({
  loader: ({ params }) => {
    const program = programs.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return program;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData?.name ?? "Program unavailable",
      loaderData?.short ?? "Explore MEGA GYM training programs.",
    ),
  component: ProgramDetail,
});
function ProgramDetail() {
  const p = Route.useLoaderData();
  const { open } = useEnquiry();
  return (
    <section className="section-shell page-intro">
      <Button asChild variant="link" className="mb-8 !px-0">
        <Link to="/programs">
          <ArrowLeft />
          All programs
        </Link>
      </Button>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-5">
            Sample program / {p.tag} / {p.level}
          </p>
          <h1 className="display-lg">{p.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.short}</p>
          <p className="mt-6 font-mono text-sm text-primary">{p.format}</p>
          <h2 className="display-md mt-10">Who it's for</h2>
          <p className="mt-4 text-muted-foreground">{p.audience}</p>
          <h2 className="display-md mt-10">What you'll work on</h2>
          <ul className="mt-5 grid gap-4">
            {p.objectives.map((o) => (
              <li key={o} className="flex gap-3">
                <Check className="size-5 text-primary" />
                {o}
              </li>
            ))}
          </ul>
          <Button
            variant="hero"
            size="xl"
            className="mt-10"
            onClick={() => open({ program: p.slug, context: p.name })}
          >
            Try this program
          </Button>
        </div>
        <img src={p.image} alt={p.name} className="aspect-[4/5] w-full object-cover" />
      </div>
      <div className="mt-14 border-t border-border pt-8">
        <h2 className="display-md">Your coaches</h2>
        <div className="mt-6 flex flex-wrap gap-6">
          {trainers
            .filter((t) => p.trainers.includes(t.slug))
            .map((t) => (
              <Link
                key={t.slug}
                to="/trainers/$slug"
                params={{ slug: t.slug }}
                className="flex items-center gap-4"
              >
                <img src={t.image} alt={t.name} className="size-16 object-cover" />
                <div>
                  <p>{t.name}</p>
                  <p className="text-xs text-primary">{t.role}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
