"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// Script chống nháy màu chỉ cần chạy trong HTML từ server. Trên client, đổi type
// để React 19 không cảnh báo về thẻ script không được thực thi.
const scriptProps =
  typeof window === "undefined" ? undefined : { type: "application/json" };

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
