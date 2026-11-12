import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { gym } from "@/config/gym";

const waNumber = gym.contact.demoWhatsapp.replace(/[^0-9]/g, "");
const telNumber = gym.contact.demoPhone.replace(/[^0-9+]/g, "");

/** Expandable floating Phone + WhatsApp contact using clearly fictional demo numbers. */
export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [open]);
  return (
    <div ref={ref} className="floating-contact">
      <div className={`floating-actions ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <a
          href={`tel:${telNumber}`}
          tabIndex={open ? 0 : -1}
          className="floating-action"
          onClick={() => setOpen(false)}
        >
          <Phone className="size-4" aria-hidden />
          <span>
            Call<small>Demo number</small>
          </span>
        </a>
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
          className="floating-action"
          onClick={() => setOpen(false)}
        >
          <MessageCircle className="size-4" aria-hidden />
          <span>
            WhatsApp<small>Demo number</small>
          </span>
        </a>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={
          open ? "Close contact options" : "Contact options: call or WhatsApp (demo numbers)"
        }
        onClick={() => setOpen((o) => !o)}
        className="floating-toggle"
      >
        <span className={`floating-toggle-icon ${open ? "is-open" : ""}`}>
          {open ? <X className="size-5" /> : <Phone className="size-5" />}
        </span>
        <span className="floating-toggle-label">{open ? "Close" : "Contact"}</span>
      </button>
    </div>
  );
}
