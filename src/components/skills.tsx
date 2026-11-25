import { Reveal } from "@/components/reveal";
import { languages, processSteps, skillGroups } from "@/lib/skills";

export function Skills() {
  return (
    <section
      id="ky-nang"
      aria-labelledby="ky-nang-tieu-de"
      className="border-t border-line"
    >
      <div className="shell py-16 md:py-24">
        <h2
          id="ky-nang-tieu-de"
          className="font-display text-2xl leading-none font-bold text-highlight"
        >
          Kỹ năng
        </h2>

        <Reveal>
          <p className="mt-6 text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.22] font-medium tracking-tight text-balance">
            Ưu tiên sự rõ ràng, từ{" "}
            <span className="text-highlight">cách nghĩ đến dòng code.</span>
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08} className="grid h-full">
              <div className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
                <h3 className="font-display text-2xl leading-snug font-bold">
                  {group.title}
                </h3>
                {group.description && (
                  <p className="mt-2 text-pretty text-ink-2">
                    {group.description}
                  </p>
                )}
                <ul className="mt-6 flex flex-wrap gap-3">
                  {group.items.map(({ name, note }) => (
                    <li
                      key={name}
                      className="inline-flex items-baseline gap-2 rounded-full border border-line bg-bg px-4 py-2 font-medium"
                    >
                      <span>{name}</span>
                      {note && (
                        <span className="text-sm font-normal text-ink-2">
                          {note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={skillGroups.length * 0.08} className="grid h-full">
            <div className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
              <h3 className="font-display text-2xl leading-snug font-bold">
                Ngoại ngữ
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {languages.map(({ name, note }) => (
                  <li
                    key={name}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-4 first:pt-2 last:pb-0"
                  >
                    <span className="text-lg font-medium">{name}</span>
                    {note && <span className="text-ink-2">{note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16">
          <h3 className="font-display text-2xl leading-none font-bold text-highlight">
            Cách làm việc
          </h3>

          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.1} className="grid h-full">
                  <div className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
                    <h4 className="font-display text-2xl leading-snug font-bold">
                      {step.title}
                    </h4>
                    <p className="mt-3 text-pretty text-ink-2">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
