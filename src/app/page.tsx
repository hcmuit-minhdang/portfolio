import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="grid flex-1 grid-rows-[auto_1fr] px-6 py-6 md:px-16">
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
      <div className="grid content-end gap-8 pb-10">
        <h1 className="font-display text-7xl leading-[1.05] font-bold text-balance md:text-9xl">
          Sắp ra mắt
          <span className="block text-highlight">từng bước một</span>
        </h1>
        <div className="h-1.5 w-32 bg-accent" />
        <p className="max-w-md text-lg text-ink-2">
          Portfolio đang được xây dựng. Mỗi phần sẽ xuất hiện khi hoàn thiện.
        </p>
      </div>
    </main>
  );
}
