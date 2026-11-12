import { Link } from "@tanstack/react-router";
import { gym, nav, programs } from "@/config/gym";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <p className="display-xl text-outline select-none opacity-40" aria-hidden>
          {gym.short}
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">{gym.description}</p>
          </div>
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="grid gap-2 text-sm">
              {[
                ...nav.slice(1),
                { to: "/our-story", label: "Our Story" },
                { to: "/community", label: "Community" },
              ].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-muted-foreground transition hover:text-primary">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Programs</p>
            <ul className="grid gap-2 text-sm">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/programs/$slug"
                    params={{ slug: p.slug }}
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <p className="eyebrow mb-4">Visit</p>
            <p className="text-muted-foreground">{gym.contact.address}</p>
            <p className="mt-3 text-muted-foreground">{gym.contact.phone}</p>
            <p className="text-muted-foreground">{gym.contact.email}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              FITNESS WEBSITE DEMO · Not an operating gym
            </p>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {gym.name} — fictional demo brand. Website concept by MAGAF
            Technologies.
          </p>
          <p className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
