export default function Home() {
  return (
    <main className="grid flex-1 content-end gap-8 px-6 pb-16 md:px-16">
      <h1 className="font-display text-7xl leading-[1.05] font-bold text-balance md:text-9xl">
        Sắp ra mắt
        <span className="block text-accent">từng bước một</span>
      </h1>
      <div className="h-1.5 w-32 bg-sand" />
      <p className="max-w-md text-lg text-ink-2">
        Portfolio đang được xây dựng. Mỗi phần sẽ xuất hiện khi hoàn thiện.
      </p>
    </main>
  );
}
