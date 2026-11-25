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

export type ProcessStepId = "understand" | "structure" | "verify";

export type ProcessStep = {
  id: ProcessStepId;
  tab: Localized;
  title: Localized;
  description: Localized;
  tags: Localized<string[]>;
};

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    tab: { en: "Understand", vi: "Hiểu bài toán" },
    title: {
      en: "Understand the problem first.",
      vi: "Hiểu kỹ bài toán trước.",
    },
    description: {
      en: "Break the problem down and clarify inputs, constraints, and expected outputs before writing the first line of code.",
      vi: "Tách nhỏ vấn đề và chốt rõ đầu vào, ràng buộc cùng đầu ra mong muốn trước khi bắt tay vào viết code.",
    },
    tags: {
      en: ["Problem scope", "Inputs & outputs", "Edge cases"],
      vi: ["Phạm vi bài toán", "Đầu vào & đầu ra", "Trường hợp biên"],
    },
  },
  {
    id: "structure",
    tab: { en: "Structure", vi: "Cấu trúc" },
    title: {
      en: "Keep the structure clean.",
      vi: "Giữ cấu trúc gọn gàng.",
    },
    description: {
      en: "Prefer clear modules and simple, readable logic so every piece is easy to reason about and maintain.",
      vi: "Chọn giải pháp đơn giản, chia nhỏ rõ ràng để từng phần đều dễ đọc, dễ hiểu và dễ sửa về sau.",
    },
    tags: {
      en: ["Clean modules", "Readable logic", "Maintainable"],
      vi: ["Chia lớp rõ ràng", "Logic dễ đọc", "Dễ bảo trì"],
    },
  },
  {
    id: "verify",
    tab: { en: "Verify", vi: "Kiểm thử" },
    title: {
      en: "Build. Test. Refine.",
      vi: "Xây. Kiểm thử. Mở rộng.",
    },
    description: {
      en: "Ship working pieces incrementally, verify them against real cases, and refine based on actual results.",
      vi: "Xây từng phần chạy được, tự kiểm thử kỹ trên tình huống thực tế rồi mới tinh chỉnh và mở rộng tiếp.",
    },
    tags: {
      en: ["Working build", "Real-world test", "Iterate"],
      vi: ["Chạy thực tế", "Tự kiểm thử", "Cải tiến dần"],
    },
  },
];
