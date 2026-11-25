import type { Localized } from "@/lib/i18n";

// Màu đèn: done xanh, active vàng, paused đỏ (xem .status-dot trong motion.css).
export type ProjectStatus = "done" | "active" | "paused";

type Base = {
  status: ProjectStatus;
  name: string;
  kind: Localized;
};

// Dự án chưa công bố: cố ý không có chỗ cho mô tả, công nghệ hay link.
type PrivateProject = Base & { visibility: "private" };

type PublicProject = Base & {
  visibility: "public";
  summary: Localized;
  tech: string[];
  url: string;
};

export type Project = PrivateProject | PublicProject;

export const projects: Project[] = [
  {
    name: "OFMIS",
    kind: {
      en: "Scientific research",
      vi: "Nghiên cứu khoa học",
    },
    status: "active",
    visibility: "private",
  },
];
