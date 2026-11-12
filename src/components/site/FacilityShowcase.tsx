import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { facilities } from "@/config/gym";
import { Button } from "@/components/ui/button";
import { nextGalleryIndex } from "@/lib/demo-rules";

export function FacilityShowcase() {
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const f = facilities[index];
  if (!f) return null;
  const move = (d: number) => setIndex((i) => nextGalleryIndex(i, d, facilities.length));
  return (
    <div>
      <div
        className="relative aspect-[16/9] overflow-hidden max-sm:aspect-auto max-sm:min-h-64"
        onTouchStart={(e) => setStartX(e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          const x = e.changedTouches[0]?.clientX;
          if (startX !== null && x !== undefined && Math.abs(x - startX) > 60)
            move(x < startX ? 1 : -1);
          setStartX(null);
        }}
      >
        {facilities.map((item, i) => (
          <img
            key={item.name}
            src={item.image}
            alt={i === index ? `Illustrative ${item.name}` : ""}
            aria-hidden={i !== index}
            width={1600}
            height={900}
            loading="lazy"
            className={`facility-image absolute inset-0 h-full w-full object-cover ${i === index ? "is-active" : ""}`}
          />
        ))}
        <span className="absolute left-5 top-5 bg-background/90 px-3 py-2 font-mono text-xs">
          ILLUSTRATIVE SPACE / 0{index + 1}
        </span>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
        <div aria-live="polite" key={f.name} className="facility-copy">
          <h2 className="display-md">{f.name}</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">{f.detail}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="line"
            size="icon"
            aria-label="Previous facility"
            onClick={() => move(-1)}
          >
            <ArrowLeft />
          </Button>
          <span className="font-mono text-xs">
            {index + 1} / {facilities.length}
          </span>
          <Button variant="line" size="icon" aria-label="Next facility" onClick={() => move(1)}>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {facilities.map((item, i) => (
          <Button
            key={item.name}
            variant="ghost"
            aria-label={`Show ${item.name}`}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
            className={`h-auto overflow-hidden border-2 p-0 ${index === i ? "border-primary" : "border-transparent opacity-60"}`}
          >
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
