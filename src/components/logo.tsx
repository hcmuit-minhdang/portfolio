// Dấu nhắc terminal ">_". Hiệu ứng nằm ở .logo trong globals.css.
export function Logo() {
  return (
    <span className="logo grid size-11 place-items-center rounded-xl border border-line bg-surface">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-6 fill-none stroke-current stroke-[2.5]"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 7l5 5-5 5" className="logo-prompt" />
        <path d="M13 17h6" className="logo-caret" />
      </svg>
    </span>
  );
}
