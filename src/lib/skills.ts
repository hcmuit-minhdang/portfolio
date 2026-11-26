import type { Localized } from "@/lib/i18n";

export type SkillIcon = "code" | "database" | "server";

export type SkillItem = {
  name: Localized | string;
  core?: boolean;
  note?: Localized;
};

export type SkillGroup = {
  icon: SkillIcon;
  title: Localized;
  description: Localized;
  items: SkillItem[];
};

// Tech Stack theo 3 trụ cột chính (Python là ngôn ngữ cốt lõi).
export const techStackGroups: SkillGroup[] = [
  {
    icon: "code",
    title: {
      en: "Programming Languages",
      vi: "Ngôn ngữ lập trình",
    },
    description: {
      en: "Python as my core language for backend logic and data work, alongside TypeScript, JavaScript, and SQL.",
      vi: "Lấy Python làm ngôn ngữ cốt lõi cho logic backend và xử lý dữ liệu, kết hợp TypeScript, JavaScript và SQL.",
    },
    items: [
      {
        name: "Python",
        core: true,
        note: { en: "Core", vi: "Chính" },
      },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "SQL" },
    ],
  },
  {
    icon: "database",
    title: {
      en: "Backend & Databases",
      vi: "Backend & Cơ sở dữ liệu",
    },
    description: {
      en: "Building server-side services with Node.js and modeling structured relational data on PostgreSQL and MySQL.",
      vi: "Xây dựng dịch vụ phía máy chủ với Node.js và thiết kế, quản lý dữ liệu quan hệ trên PostgreSQL và MySQL.",
    },
    items: [{ name: "Node.js" }, { name: "PostgreSQL" }, { name: "MySQL" }],
  },
  {
    icon: "server",
    title: {
      en: "Systems, DevOps & Networking",
      vi: "Hệ thống, DevOps & Mạng",
    },
    description: {
      en: "Containerizing services with Docker, working in Linux, managing code with Git, and computer networking fundamentals.",
      vi: "Đóng gói dịch vụ với Docker, làm việc trên môi trường Linux, quản lý mã nguồn bằng Git và nền tảng mạng máy tính.",
    },
    items: [
      { name: "Docker" },
      { name: "Linux" },
      { name: "Git" },
      { name: { en: "Computer Networking", vi: "Mạng máy tính" } },
    ],
  },
];
