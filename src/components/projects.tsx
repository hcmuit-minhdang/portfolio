import { Reveal } from "@/components/reveal";
import { projects, type Project } from "@/lib/projects";

export function Projects() {
  return (
    <section
      id="du-an"
      aria-labelledby="du-an-tieu-de"
      className="border-t border-line"
    >
      <div className="shell py-16 md:py-24">
        <h2
          id="du-an-tieu-de"
          className="font-display text-2xl leading-none font-bold text-highlight"
        >
          Dự án
        </h2>

        <Reveal>
          <p className="mt-6 text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.22] font-medium tracking-tight text-balance">
            Hiện mình đang tập trung vào{" "}
            <span className="text-highlight">một dự án nghiên cứu.</span>
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-6 md:mt-12">
          {projects.map((project) => (
            <li key={project.name}>
              <Reveal>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isPrivate = project.visibility === "private";

  return (
    <article
      className={`project grid overflow-hidden rounded-3xl border border-line bg-surface ${
        isPrivate ? "lg:grid-cols-[1.25fr_1fr]" : ""
      }`}
    >
      {isPrivate && <SealedVisual />}

      <div className="flex flex-col p-6 md:p-10">
        <p className="text-ink-2">{project.kind}</p>
        <h3 className="mt-2 font-display text-6xl leading-none font-bold xl:text-8xl">
          {project.name}
        </h3>

        {project.visibility === "private" ? (
          <>
            <p className="mt-6 max-w-[40ch] text-lg text-pretty">
              Nội dung chưa được công bố. Mình sẽ chia sẻ khi nghiên cứu hoàn
              thành.
            </p>
            <p className="mt-8 flex items-center gap-3 font-medium lg:mt-auto lg:pt-8">
              <span aria-hidden="true" className="status-dot" />
              Đang phát triển
            </p>
          </>
        ) : (
          <>
            <p className="mt-6 max-w-[60ch] text-lg text-pretty">
              {project.summary}
            </p>
            <p className="mt-4 text-ink-2">{project.tech.join(", ")}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 btn self-start bg-accent text-accent-ink"
            >
              Xem {project.name}
              <span className="sr-only"> (mở tab mới)</span>
            </a>
          </>
        )}
      </div>
    </article>
  );
}

// Độ dài các vạch che, theo phần trăm. Chỉ để trang trí.
const redactedLines = [
  [34, 22, 30],
  [18, 44, 20],
  [52, 28],
  [26, 16, 40],
  [40, 34],
  [22, 30, 26],
];

// Trang tài liệu bị che kín với ổ khóa ở giữa.
function SealedVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative grid min-h-64 place-items-center overflow-hidden bg-accent md:min-h-96"
    >
      <div className="sealed-lines absolute inset-0 grid content-center gap-4 p-8 md:gap-6 md:p-12">
        {redactedLines.map((line, row) => (
          <div key={row} className="flex gap-3">
            {line.map((width, index) => (
              <span
                key={index}
                className="h-4 rounded-full bg-accent-ink/15 md:h-5"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="lock relative grid size-28 place-items-center rounded-full bg-accent-ink text-accent md:size-36">
        <svg
          viewBox="0 0 24 24"
          className="size-12 fill-none stroke-current stroke-2 md:size-16"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
    </div>
  );
}
