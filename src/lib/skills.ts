import type { Localized } from "@/lib/i18n";

// Danh sách kỹ năng, ngoại ngữ và cách làm việc.
// Khi muốn bổ sung ngôn ngữ / framework / công cụ cụ thể, thêm mục vào skillGroups.

export type SkillItem = {
  name: Localized | string;
  note?: Localized;
};

export type SkillGroup = {
  title: Localized;
  description?: Localized;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: {
      en: "Focus areas",
      vi: "Hướng tập trung",
    },
    description: {
      en: "Areas I spend most of my time learning and building in.",
      vi: "Các mảng mình dành nhiều thời gian học và làm thực tế.",
    },
    items: [{ name: "Backend" }, { name: "Data" }, { name: "AI" }],
  },
  // Khi chốt danh sách công cụ cụ thể, bỏ comment và điền vào đây:
  // {
  //   title: { en: "Daily tools", vi: "Dùng thường xuyên" },
  //   items: [{ name: "..." }],
  // },
  // {
  //   title: { en: "Currently learning", vi: "Đang học" },
  //   items: [{ name: "..." }],
  // },
];

export const languages: SkillItem[] = [
  {
    name: { en: "Japanese", vi: "Tiếng Nhật" },
    note: { en: "JLPT N3 (planned)", vi: "JLPT N3 (dự kiến)" },
  },
  {
    name: { en: "English", vi: "Tiếng Anh" },
    note: {
      en: "English certificate (planned)",
      vi: "Chứng chỉ tiếng Anh (dự kiến)",
    },
  },
];

export type ProcessStep = {
  title: Localized;
  description: Localized;
};

export const processSteps: ProcessStep[] = [
  {
    title: {
      en: "Understand the problem first",
      vi: "Hiểu kỹ bài toán trước",
    },
    description: {
      en: "Break the problem down and clarify inputs and outputs before writing code.",
      vi: "Tách nhỏ vấn đề và chốt rõ đầu vào, đầu ra trước khi bắt tay vào làm.",
    },
  },
  {
    title: {
      en: "Keep the structure clean",
      vi: "Giữ cấu trúc gọn gàng",
    },
    description: {
      en: "Prefer simple, readable, and maintainable solutions over unnecessary complexity.",
      vi: "Chọn giải pháp đơn giản, dễ đọc và dễ sửa thay vì phức tạp hóa.",
    },
  },
  {
    title: {
      en: "Verify in practice",
      vi: "Kiểm tra trên thực tế",
    },
    description: {
      en: "Build working pieces incrementally, test them thoroughly, then expand.",
      vi: "Xây từng phần chạy được, tự kiểm thử kỹ rồi mới mở rộng tiếp.",
    },
  },
];
