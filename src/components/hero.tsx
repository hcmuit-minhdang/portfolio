import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="grid flex-1 content-end gap-10 px-6 pt-20 pb-16 md:px-16">
      <h1 className="font-display text-[clamp(4rem,14vw,11rem)] leading-[1.05] font-bold">
        Đặng Lê
        <span className="block text-highlight">Thanh Minh</span>
      </h1>

      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="grid max-w-xl gap-3">
          <p className="text-xl font-medium md:text-2xl">
            Sinh viên Công nghệ thông tin Việt – Nhật tại Trường Đại học Công
            nghệ Thông tin (UIT).
          </p>
          <p className="text-lg text-pretty text-ink-2">
            Mình quan tâm đến backend, data và AI.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#du-an"
            className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink hover:underline hover:underline-offset-4"
          >
            Xem dự án
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-highlight px-6 py-3 font-medium hover:bg-surface"
          >
            GitHub
            <span className="sr-only"> (mở tab mới)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
