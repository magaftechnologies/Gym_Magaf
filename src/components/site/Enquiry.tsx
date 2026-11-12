import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { programs } from "@/config/gym";
import { cn } from "@/lib/utils";
import { enquirySchema } from "@/lib/enquiry-schema";

type Prefill = { program?: string; context?: string };
const Ctx = createContext<{ open: (p?: Prefill) => void }>({ open: () => {} });
export const useEnquiry = () => useContext(Ctx);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; prefill: Prefill }>({
    open: false,
    prefill: {},
  });
  return (
    <Ctx.Provider value={{ open: (prefill = {}) => setState({ open: true, prefill }) }}>
      {children}
      <Dialog open={state.open} onOpenChange={(o) => setState((s) => ({ ...s, open: o }))}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="display-md">Explore a demo trial</DialogTitle>
            <DialogDescription>
              {state.prefill.context ? `Regarding: ${state.prefill.context}. ` : ""}Use sample
              details. This demo completes locally; nothing is sent or saved.
            </DialogDescription>
          </DialogHeader>
          <EnquiryForm
            key={String(state.open)}
            defaultProgram={state.prefill.program}
            context={state.prefill.context}
          />
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

type Errors = Partial<Record<"name" | "contact" | "consent", string>>;
const fieldCls =
  "w-full rounded-[var(--radius)] border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary";

export function validateEnquiry(v: { name: string; contact: string; consent: boolean }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  const c = v.contact.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
  const isPhone = /^\+?[\d\s-]{10,15}$/.test(c);
  if (!c) e.contact = "Add a phone number or email.";
  else if (!isEmail && !isPhone) e.contact = "Enter a valid email or 10-digit phone number.";
  if (!v.consent) e.consent = "Please acknowledge this is a local demo.";
  return e;
}

export function EnquiryForm({
  defaultProgram,
  context,
}: {
  defaultProgram?: string | undefined;
  context?: string | undefined;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [name, setName] = useState("");
  const [failure, setFailure] = useState("");
  const [reference, setReference] = useState("");

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(ev.currentTarget);
    const e = validateEnquiry({
      name: String(fd.get("name")),
      contact: String(fd.get("contact")),
      consent: fd.get("consent") === "on",
    });
    setErrors(e);
    setFailure("");
    if (Object.keys(e).length) return;
    const result = enquirySchema.safeParse({
      reference: crypto.randomUUID(),
      name: String(fd.get("name") ?? ""),
      contact: String(fd.get("contact") ?? ""),
      program: String(fd.get("program") ?? ""),
      context: context ?? "",
      preferred_date: fd.get("date") ? String(fd.get("date")) : null,
      method: String(fd.get("method")),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
    });
    if (!result.success) {
      setFailure("Please check your details and shorten any message to 2,000 characters.");
      return;
    }
    setName(String(fd.get("name")).split(" ")[0] ?? "there");
    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      setReference(result.data.reference);
      setStatus("done");
    } catch {
      setFailure("The demo could not complete. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "done")
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center" role="status">
        <CheckCircle2 className="size-12 text-primary" />
        <p className="display-md">Thanks, {name}.</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Demo enquiry completed locally. No information has been sent to a gym or stored. No
          booking or membership is confirmed.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Reference: {reference.slice(0, 8).toUpperCase()}
        </p>
        <Button variant="line" onClick={() => setStatus("idle")}>
          Try another enquiry
        </Button>
      </div>
    );

  const err = (k: keyof Errors) =>
    errors[k] && (
      <p id={`error-${k}`} role="alert" className="mt-1.5 text-xs text-destructive">
        {errors[k]}
      </p>
    );
  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      {context && <input type="hidden" name="context" value={context} />}
      <div>
        <label htmlFor="f-name" className="eyebrow mb-2 block">
          Full name *
        </label>
        <input
          id="f-name"
          name="name"
          maxLength={100}
          autoComplete="name"
          className={cn(fieldCls, errors.name && "border-destructive")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : undefined}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor="f-contact" className="eyebrow mb-2 block">
          Phone or email *
        </label>
        <input
          id="f-contact"
          name="contact"
          maxLength={255}
          autoComplete="off"
          className={cn(fieldCls, errors.contact && "border-destructive")}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "error-contact" : undefined}
        />
        {err("contact")}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="f-program" className="eyebrow mb-2 block">
            Program
          </label>
          <select
            id="f-program"
            name="program"
            defaultValue={defaultProgram ?? ""}
            className={fieldCls}
          >
            <option value="">Not sure yet</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-date" className="eyebrow mb-2 block">
            Preferred date
          </label>
          <input id="f-date" name="date" type="date" className={fieldCls} />
        </div>
      </div>
      <fieldset>
        <legend className="eyebrow mb-2">Contact me via</legend>
        <div className="flex gap-2">
          {["WhatsApp", "Call", "Email"].map((m, i) => (
            <label key={m} className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="method"
                value={m}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="block rounded-[var(--radius)] border border-input py-2.5 text-center text-sm transition peer-checked:border-primary peer-checked:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                {m}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="f-msg" className="eyebrow mb-2 block">
          Message (optional)
        </label>
        <textarea id="f-msg" name="message" rows={3} maxLength={2000} className={fieldCls} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" name="consent" className="mt-1 accent-[var(--primary)]" />I
          understand this is a local demo, not a real enquiry.
        </label>
        {err("consent")}
      </div>
      {failure && (
        <p role="alert" className="text-sm text-destructive">
          {failure}
        </p>
      )}
      <Button type="submit" variant="hero" size="xl" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" /> Completing…
          </>
        ) : (
          "Complete demo enquiry"
        )}
      </Button>
    </form>
  );
}
