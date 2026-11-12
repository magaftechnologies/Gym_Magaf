import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PlanGrid, FAQSection, TrialBand } from "@/components/site/Sections";
import { plans } from "@/config/gym";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/memberships")({
  head: () =>
    pageHead(
      "Memberships",
      "Compare Essential, Performance and Elite gym memberships, starting at ₹2,499 per month.",
    ),
  component: Memberships,
});
function Memberships() {
  return (
    <>
      <PageIntro
        number="04"
        title="Invest in your stronger self."
        description="From independent training to fully coached progress. Choose the level of support that fits your goals."
      />
      <section className="section-shell !pt-4">
        <PlanGrid />
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <caption className="mb-6 text-left font-display text-2xl uppercase">
              At a glance
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th className="py-4">Your access</th>
                {plans.map((p) => (
                  <th key={p.id} className="py-4 text-primary">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Gym floor", "Off-peak weekdays", "All hours", "All hours"],
                ["Group classes", "Not included", "Unlimited", "Unlimited"],
                ["Personal training", "Not included", "Not included", "8 sessions / month"],
                ["Minimum term", "3 months", "None", "None"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-border">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={cell} className="py-5 font-medium">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="py-5 text-muted-foreground">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Fictional demo pricing. Membership enquiries are not purchases or payment commitments.
        </p>
      </section>
      <FAQSection />
      <TrialBand />
    </>
  );
}
