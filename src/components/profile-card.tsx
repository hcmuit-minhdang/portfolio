import Image from "next/image";
import { Clock } from "@/components/clock";
import { Tilt } from "@/components/tilt";
import { site } from "@/lib/site";

const details = [
  { term: "Nơi ở", detail: "TP HCM" },
  { term: "Giờ", detail: <Clock /> },
  { term: "Handle", detail: "@minhdanguit" },
];

export function ProfileCard() {
  return (
    <Tilt>
      <div className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="grid h-11 grid-cols-[1fr_auto_1fr] items-center bg-accent px-5 text-sm font-medium text-accent-ink">
          <span>UIT 2026</span>
          {/* Lỗ xỏ dây đeo */}
          <span className="h-3 w-14 rounded-full bg-bg" />
          <span className="justify-self-end">Năm 3</span>
        </div>

        <div className="p-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg">
            {site.photo ? (
              <Image
                src={site.photo}
                alt={`Ảnh của ${site.name}`}
                fill
                sizes="(min-width: 23rem) 21rem, 90vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="grid size-full place-items-center font-display text-9xl font-bold text-accent select-none"
              >
                TM
              </div>
            )}
          </div>

          <p className="mt-4 font-display text-2xl leading-tight font-bold">
            {site.name}
          </p>
          <p className="text-xs font-medium text-ink-2">
            IT @ UIT - SOFTWARE - DATA - AI
          </p>

          <dl className="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-3 border-t border-dashed border-highlight pt-3">
            {details.map(({ term, detail }) => (
              <div key={term}>
                <dt className="text-xs text-ink-2">{term}</dt>
                <dd className="text-sm font-medium">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Tilt>
  );
}
