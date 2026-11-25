"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const options = [
  {
    value: "light",
    label: "Sáng",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
  {
    value: "system",
    label: "Theo hệ thống",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    value: "dark",
    label: "Tối",
    icon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  },
];

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Server không biết lựa chọn đã lưu, nên chỉ đánh dấu nút sau khi hydrate.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  return (
    <div
      role="group"
      aria-label="Chế độ giao diện"
      className="flex gap-0.5 rounded-full border border-line-strong bg-surface p-1"
    >
      {options.map(({ value, label, icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={hydrated && theme === value}
          title={label}
          onClick={() => setTheme(value)}
          className="grid size-9 cursor-pointer place-items-center rounded-full text-muted hover:text-ink aria-pressed:bg-accent aria-pressed:text-accent-ink"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icon}
          </svg>
        </button>
      ))}
    </div>
  );
}
