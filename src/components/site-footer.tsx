import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-wrap justify-between gap-x-8 gap-y-2 py-8 text-sm text-ink-2">
        <p>© 2026 {site.name}</p>
        <a
          href="#top"
          className="decoration-accent decoration-2 underline-offset-4 hover:underline"
        >
          Về đầu trang
        </a>
      </div>
    </footer>
  );
}
