import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { gallery } from "@/config/gym";
import { nextGalleryIndex } from "@/lib/demo-rules";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const items = gallery.filter((g) => category === "All" || g.cat === category);
  const move = (direction: number) =>
    setSelected((i) => (i === null ? null : nextGalleryIndex(i, direction, items.length)));
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        move(e.key === "ArrowRight" ? 1 : -1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, items.length]);
  const image = selected === null ? undefined : items[selected];
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" aria-label="Photo categories">
        {["All", ...new Set(gallery.map((g) => g.cat))].map((c) => (
          <Button
            key={c}
            variant={category === c ? "default" : "line"}
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setSelected(null);
            }}
          >
            {c}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g, i) => (
          <Reveal key={g.src} delay={(i % 3) * 60}>
            <Button
              variant="ghost"
              className="group relative h-auto w-full overflow-hidden p-0"
              aria-label={`View ${g.cat} photo ${i + 1}`}
              onClick={() => setSelected(i)}
            >
              <img
                src={g.src}
                alt={`Illustrative ${g.cat.toLowerCase()} scene`}
                width={800}
                height={600}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Expand className="absolute bottom-4 right-4 size-5 on-image" />
            </Button>
          </Reveal>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="lightbox-content w-[calc(100%-1rem)] sm:max-w-5xl">
          <DialogTitle>{image?.cat} / MEGA GYM</DialogTitle>
          <DialogDescription>
            Illustrative concept photography, not an operating gym.
          </DialogDescription>
          {image && (
            <img
              src={image.src}
              alt={`Illustrative ${image.cat.toLowerCase()} scene`}
              className="max-h-[65svh] w-full object-contain"
            />
          )}
          <div className="flex items-center justify-between">
            <Button variant="line" size="icon" aria-label="Previous photo" onClick={() => move(-1)}>
              <ArrowLeft />
            </Button>
            <p className="eyebrow" aria-live="polite">
              {(selected ?? 0) + 1} / {items.length}
            </p>
            <Button variant="line" size="icon" aria-label="Next photo" onClick={() => move(1)}>
              <ArrowRight />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
