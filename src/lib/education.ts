import type { Localized } from "@/lib/i18n";

export type CredentialStatus = "done" | "active";

export type SchoolEntry = {
  school: Localized;
  program: Localized;
  location: Localized;
  status: CredentialStatus;
  statusText: Localized;
  gpa10?: string;
  gpa4?: string;
  credits?: {
    earned: number;
    total: number;
  };
};

export type CredentialEntry = {
  name: Localized;
  issuer: Localized;
  status: CredentialStatus;
  statusText: Localized;
};

export const schools: SchoolEntry[] = [
  {
    school: {
      en: "University of Information Technology (UIT)",
      vi: "Trường Đại học Công nghệ Thông tin (UIT)",
    },
    program: {
      en: "Vietnam–Japan Information Technology",
      vi: "Công nghệ thông tin Việt – Nhật",
    },
    location: {
      en: "Ho Chi Minh City",
      vi: "TP Hồ Chí Minh",
    },
    status: "active",
    statusText: {
      en: "Year 3 · In progress",
      vi: "Năm 3 · Đang theo học",
    },
    gpa10: "7.28",
    // Quy đổi tỉ lệ từ thang 10 (7.28 / 10 * 4 ≈ 2.91); cập nhật theo bảng điểm thang 4 nếu khác.
    gpa4: "2.91",
    credits: {
      earned: 76,
      total: 132,
    },
  },
];

// Khi nhận thêm bằng cấp hoặc chứng chỉ mới (IELTS, TOEIC, JLPT, khóa học...),
// chỉ cần thêm mục vào danh sách này và đổi status sang "done".
export const credentials: CredentialEntry[] = [
  {
    name: {
      en: "Bachelor of Information Technology",
      vi: "Cử nhân Công nghệ thông tin",
    },
    issuer: {
      en: "UIT – VNUHCM",
      vi: "UIT – ĐHQG TP.HCM",
    },
    status: "active",
    statusText: {
      en: "In progress",
      vi: "Đang theo học",
    },
  },
  {
    name: {
      en: "JLPT N3",
      vi: "JLPT N3",
    },
    issuer: {
      en: "Japanese Language Proficiency",
      vi: "Chứng chỉ tiếng Nhật",
    },
    status: "active",
    statusText: {
      en: "Planned",
      vi: "Dự kiến",
    },
  },
  {
    name: {
      en: "TOEIC",
      vi: "TOEIC",
    },
    issuer: {
      en: "English Language Proficiency",
      vi: "Chứng chỉ tiếng Anh",
    },
    status: "active",
    statusText: {
      en: "Planned",
      vi: "Dự kiến",
    },
  },
];
