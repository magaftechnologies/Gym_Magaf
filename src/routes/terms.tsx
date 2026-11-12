import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/Sections";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead("Terms", "Terms for using the fictional MEGA GYM gym website and enquiry forms."),
  component: Terms,
});
function Terms() {
  return (
    <>
      <PageIntro
        number="Legal"
        title="Website terms."
        description="MEGA GYM is a fictional demonstration brand, not an operating gym."
      />
      <section className="section-shell !pt-4 max-w-4xl space-y-8">
        <div>
          <h2 className="display-md">Demo information</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Prices, facilities, credentials, member stories, availability and contact details are
            sample content. No membership is sold through this website and no payment is taken.
          </p>
        </div>
        <div>
          <h2 className="display-md">Requests, not reservations</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Completing an enquiry is a local simulation only; nothing is recorded or sent. It does
            not reserve a class place, guarantee a trial date, create a contract or activate a
            membership. The schedule shows a sample weekly timetable.
          </p>
        </div>
        <div>
          <h2 className="display-md">Responsible use</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Use the website lawfully and avoid submitting sensitive or other people's personal
            information. Training descriptions are general information, not personalised medical
            advice. A real business must review and replace these terms before accepting customers.
          </p>
        </div>
      </section>
    </>
  );
}
