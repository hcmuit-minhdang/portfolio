// Danh sách kỹ năng, ngoại ngữ và cách làm việc.
// Khi muốn bổ sung ngôn ngữ / framework / công cụ cụ thể, thêm mục vào skillGroups.

export type SkillItem = {
  name: string;
  note?: string;
};

export type SkillGroup = {
  title: string;
  description?: string;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Hướng tập trung",
    description:
      "Các mảng mình dành nhiều thời gian học và làm thực tế.",
    items: [{ name: "Backend" }, { name: "Data" }, { name: "AI" }],
  },
  // Khi chốt danh sách công cụ cụ thể, bỏ comment và điền vào đây:
  // {
  //   title: "Dùng thường xuyên",
  //   items: [{ name: "..." }],
  // },
  // {
  //   title: "Đang học",
  //   items: [{ name: "..." }],
  // },
];

export const languages: SkillItem[] = [
  { name: "Tiếng Nhật", note: "JLPT N3 (dự kiến)" },
  { name: "Tiếng Anh", note: "Chứng chỉ tiếng Anh (dự kiến)" },
];

export type ProcessStep = {
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Hiểu kỹ bài toán trước",
    description:
      "Tách nhỏ vấn đề và chốt rõ đầu vào, đầu ra trước khi bắt tay vào làm.",
  },
  {
    title: "Giữ cấu trúc gọn gàng",
    description:
      "Chọn giải pháp đơn giản, dễ đọc và dễ sửa thay vì phức tạp hóa.",
  },
  {
    title: "Kiểm tra trên thực tế",
    description:
      "Xây từng phần chạy được, tự kiểm thử kỹ rồi mới mở rộng tiếp.",
  },
];
