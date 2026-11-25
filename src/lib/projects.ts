// Màu đèn: done xanh, active vàng, paused đỏ (xem .status-dot trong motion.css).
export const statusLabels = {
  done: "Hoàn thành",
  active: "Đang phát triển",
  paused: "Tạm dừng",
};

type Base = {
  status: keyof typeof statusLabels;
  name: string;
  kind: string;
};

// Dự án chưa công bố: cố ý không có chỗ cho mô tả, công nghệ hay link.
type PrivateProject = Base & { visibility: "private" };

type PublicProject = Base & {
  visibility: "public";
  summary: string;
  tech: string[];
  url: string;
};

export type Project = PrivateProject | PublicProject;

export const projects: Project[] = [
  {
    name: "OFMIS",
    kind: "Nghiên cứu khoa học",
    status: "active",
    visibility: "private",
  },
];
