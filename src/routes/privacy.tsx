import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/Sections";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead("Privacy", "How this MEGA GYM demonstration website handles enquiry information."),
  component: Privacy,
});
function Privacy() {
  return (
    <>
      <PageIntro
        number="Legal"
        title="Privacy notice."
        description="This website represents a fictional gym. Please use sample information when exploring its enquiry forms."
      />
      <section className="section-shell !pt-4 max-w-4xl space-y-8">
        <div>
          <h2 className="display-md">Information you provide</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Enquiry forms validate sample details locally in your browser. They do not transmit or
            store your name, contact details, date or message. We do not process payments or create
            member accounts.
          </p>
        </div>
        <div>
          <h2 className="display-md">Purpose and choices</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Information only demonstrates the enquiry workflow in the current page session. No real
            gym receives it and no email or WhatsApp notification is sent. Please use sample
            information, never sensitive health or financial details.
          </p>
        </div>
        <div>
          <h2 className="display-md">Website preferences</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Your chosen visual theme is saved in your browser. No external directions or social
            accounts are connected. This demo notice must be reviewed and replaced with the
            business's own policy before real-world use.
          </p>
        </div>
      </section>
    </>
  );
}
