import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { gym } from "@/config/gym";
import { PageIntro } from "@/components/site/Sections";
import { EnquiryForm } from "@/components/site/Enquiry";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Demo trial enquiry",
      "Explore MEGA GYM's local-only trial enquiry. No information is sent, saved or booked.",
    ),
  component: Contact,
});
function Contact() {
  return (
    <>
      <PageIntro
        number="06"
        title="Your next chapter."
        description="Explore a trial-enquiry experience using sample information. Nothing is sent, stored or booked."
      />
      <section className="section-shell !pt-4 grid gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-5">FITNESS WEBSITE DEMO</p>
          <h2 className="display-lg">
            A concept.
            <br />
            Real possibilities.
          </h2>
          <p className="mt-7 leading-relaxed text-muted-foreground">
            MEGA GYM is a fictional fitness website imagined by MAGAF Technologies. The spaces,
            coaches and memberships demonstrate what a future gym website could offer.
          </p>
          <div className="mt-9 grid gap-4 border-t border-border pt-7 text-sm text-muted-foreground">
            <p>{gym.contact.address}</p>
            <p>{gym.contact.phone}</p>
            <p>{gym.contact.email}</p>
          </div>
          <h2 className="display-md mb-5 mt-12">Sample opening hours</h2>
          {gym.hours.map((h) => (
            <div key={h.days} className="flex justify-between border-b border-border py-4 text-sm">
              <span>{h.days}</span>
              <span className="font-mono text-primary">{h.time}</span>
            </div>
          ))}
        </div>
        <div>
          <h2 className="display-md mb-3">Explore a demo trial</h2>
          <p className="mb-7 text-sm text-muted-foreground">
            Use sample details. No payment, real booking or external contact.
          </p>
          <EnquiryForm context="Contact page demo enquiry" />
        </div>
      </section>
    </>
  );
}
