import { useState } from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { classes, days } from "@/config/gym";
import { Button } from "@/components/ui/button";
import { PageIntro } from "./Sections";
import { useEnquiry } from "./Enquiry";

export function SchedulePage() {
  const [day, setDay] = useState("Mon");
  const [type, setType] = useState("All classes");
  const { open } = useEnquiry();
  const filtered = classes.filter(
    (c) => c.day === day && (type === "All classes" || c.type === type),
  );
  return (
    <>
      <PageIntro
        number="03"
        title="Make time. Make progress."
        description="A week built around strength, conditioning and recovery. Find your session and explore a local demo enquiry."
      />
      <section className="section-shell !pt-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6">
          <div className="flex flex-wrap gap-1" role="group" aria-label="Class day">
            {days.map((d) => (
              <Button
                key={d}
                aria-pressed={day === d}
                variant={day === d ? "default" : "ghost"}
                className="px-3 sm:px-5"
                onClick={() => setDay(d)}
              >
                {d}
              </Button>
            ))}
          </div>
          <label className="text-sm">
            Class type{" "}
            <select
              aria-label="Class type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="ml-3 rounded-sm border border-input bg-background p-3"
            >
              {["All classes", "Strength", "Conditioning", "Recovery", "Functional"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mb-5 text-xs text-muted-foreground">
          Sample weekly timetable · local demo enquiries never reserve places.
        </p>
        <div className="grid gap-4">
          {filtered.map((c) => (
            <article
              key={c.id}
              className="grid items-center gap-6 rounded-sm border border-border bg-card p-6 sm:grid-cols-[100px_1fr_auto]"
            >
              <div>
                <p className="font-display text-3xl font-bold">{c.time}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {c.duration} min
                </p>
              </div>
              <div>
                <p className="eyebrow text-primary">{c.type}</p>
                <h2 className="display-md mt-2">{c.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  With {c.trainer} ·{" "}
                  {c.capacity - c.booked === 0
                    ? "Full — waiting list available"
                    : `${c.capacity - c.booked} sample spots available`}
                </p>
              </div>
              <Button
                variant={c.booked === c.capacity ? "line" : "hero"}
                onClick={() =>
                  open({
                    context: `${c.name} · ${c.day} ${c.time}${c.booked === c.capacity ? " · waitlist" : ""}`,
                  })
                }
              >
                {c.booked === c.capacity ? "Request waitlist" : "Request a place"}
                <ArrowUpRight />
              </Button>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <p className="py-12 text-muted-foreground">No sessions for this selection.</p>
        )}
      </section>
    </>
  );
}
